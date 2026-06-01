const SYNC_SETTINGS_KEY = 'sync';

const CLOUD_TRIGGERS = new Set(['disabled', 'startup', 'interval', 'both']);

function parseInteger(value, fallback) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function parseBoolean(value, fallback = false) {
    if (value === undefined || value === null || value === '') return fallback;
    return ['true', '1', 'yes', 'on'].includes(String(value).trim().toLowerCase());
}

function clampInteger(value, fallback, min, max) {
    const parsed = parseInteger(value, fallback);
    return Math.min(max, Math.max(min, parsed));
}

function mergeDeep(base, patch) {
    if (!patch || typeof patch !== 'object' || Array.isArray(patch)) return base;

    const merged = { ...base };
    for (const [key, value] of Object.entries(patch)) {
        if (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            base[key] &&
            typeof base[key] === 'object' &&
            !Array.isArray(base[key])
        ) {
            merged[key] = mergeDeep(base[key], value);
        } else {
            merged[key] = value;
        }
    }
    return merged;
}

export class SyncSettingsService {
    constructor(prisma, logger = console) {
        this.prisma = prisma;
        this.logger = logger;
    }

    getDefaultSyncSettings() {
        const deviceImportIntervalMs = parseInteger(process.env.DEVICE_SYNC_INTERVAL_MS, 0);
        const dbToDeviceIntervalMs = parseInteger(process.env.AUTO_SYNC_INTERVAL, 0);
        const cloudTrigger = String(process.env.CLOUD_SYNC_TRIGGER || 'disabled').trim().toLowerCase();

        return {
            version: 1,
            deviceImport: {
                enabled: deviceImportIntervalMs > 0,
                intervalMs: deviceImportIntervalMs > 0 ? deviceImportIntervalMs : 30_000,
            },
            dbToDevice: {
                enabled: dbToDeviceIntervalMs > 0,
                intervalMs: dbToDeviceIntervalMs > 0 ? dbToDeviceIntervalMs : 300_000,
            },
            eventReplication: {
                enabled: parseBoolean(process.env.EVENT_REPLICATION_ENABLED, true),
                intervalMs: parseInteger(process.env.EVENT_SYNC_INTERVAL_MS, 60_000),
                batchSize: parseInteger(process.env.EVENT_SYNC_BATCH_SIZE, 1000),
                maxBatches: parseInteger(process.env.EVENT_SYNC_MAX_BATCHES, 50),
                enableRealtime: parseBoolean(process.env.ENABLE_REALTIME_EVENTS, false),
                realtimeQueueSize: parseInteger(process.env.EVENT_REALTIME_QUEUE_SIZE, 100),
            },
            cloudSync: {
                enabled: CLOUD_TRIGGERS.has(cloudTrigger) && cloudTrigger !== 'disabled',
                trigger: CLOUD_TRIGGERS.has(cloudTrigger) ? cloudTrigger : 'disabled',
                intervalMs: parseInteger(process.env.CLOUD_SYNC_INTERVAL_MS, 300_000),
            },
            deviceTime: {
                enabled: process.env.ENABLE_DEVICE_TIME_SYNC !== 'false',
                useSystemTimezone: parseBoolean(process.env.USE_SYSTEM_TIMEZONE, false),
                timezoneOffsetSeconds: parseInteger(process.env.DEVICE_TIMEZONE_OFFSET, 0),
            },
        };
    }

    normalizeSyncSettings(value = {}) {
        const merged = mergeDeep(this.getDefaultSyncSettings(), value);
        const cloudTrigger = CLOUD_TRIGGERS.has(String(merged.cloudSync?.trigger).toLowerCase())
            ? String(merged.cloudSync.trigger).toLowerCase()
            : 'disabled';

        return {
            version: 1,
            deviceImport: {
                enabled: !!merged.deviceImport?.enabled,
                intervalMs: clampInteger(merged.deviceImport?.intervalMs, 30_000, 5_000, 86_400_000),
            },
            dbToDevice: {
                enabled: !!merged.dbToDevice?.enabled,
                intervalMs: clampInteger(merged.dbToDevice?.intervalMs, 300_000, 5_000, 86_400_000),
            },
            eventReplication: {
                enabled: !!merged.eventReplication?.enabled,
                intervalMs: clampInteger(merged.eventReplication?.intervalMs, 60_000, 5_000, 86_400_000),
                batchSize: clampInteger(merged.eventReplication?.batchSize, 1000, 1, 10_000),
                maxBatches: clampInteger(merged.eventReplication?.maxBatches, 50, 1, 1000),
                enableRealtime: !!merged.eventReplication?.enableRealtime,
                realtimeQueueSize: clampInteger(merged.eventReplication?.realtimeQueueSize, 100, 1, 10_000),
            },
            cloudSync: {
                enabled: !!merged.cloudSync?.enabled && cloudTrigger !== 'disabled',
                trigger: cloudTrigger,
                intervalMs: clampInteger(merged.cloudSync?.intervalMs, 300_000, 5_000, 86_400_000),
            },
            deviceTime: {
                enabled: !!merged.deviceTime?.enabled,
                useSystemTimezone: !!merged.deviceTime?.useSystemTimezone,
                timezoneOffsetSeconds: clampInteger(merged.deviceTime?.timezoneOffsetSeconds, 0, -43_200, 50_400),
            },
        };
    }

    async getSyncSettings({ initialize = false } = {}) {
        const row = await this.prisma.systemSetting.findUnique({
            where: { key: SYNC_SETTINGS_KEY },
        });

        if (row) {
            return this.normalizeSyncSettings(row.value);
        }

        const defaults = this.normalizeSyncSettings();
        if (!initialize) return defaults;

        await this.prisma.systemSetting.upsert({
            where: { key: SYNC_SETTINGS_KEY },
            create: { key: SYNC_SETTINGS_KEY, value: defaults },
            update: { value: defaults },
        });

        return defaults;
    }

    async updateSyncSettings(patch) {
        const current = await this.getSyncSettings({ initialize: true });
        const next = this.normalizeSyncSettings(mergeDeep(current, patch));

        await this.prisma.systemSetting.upsert({
            where: { key: SYNC_SETTINGS_KEY },
            create: { key: SYNC_SETTINGS_KEY, value: next },
            update: { value: next },
        });

        return next;
    }

    async resetSyncSettings() {
        const defaults = this.normalizeSyncSettings();
        await this.prisma.systemSetting.upsert({
            where: { key: SYNC_SETTINGS_KEY },
            create: { key: SYNC_SETTINGS_KEY, value: defaults },
            update: { value: defaults },
        });
        return defaults;
    }

    async applyToRuntime(settings, services = {}) {
        const applied = {};

        if (services.userSync) {
            if (settings.deviceImport.enabled) {
                services.userSync.startAutoImportFromDevices(settings.deviceImport.intervalMs);
            } else {
                services.userSync.stopAutoImportFromDevices();
            }
            applied.deviceImport = services.userSync.getAutoImportStatus();

            if (settings.dbToDevice.enabled) {
                services.userSync.startAutoSync(settings.dbToDevice.intervalMs);
            } else {
                services.userSync.stopAutoSync();
            }
            applied.dbToDevice = services.userSync.getAutoSyncStatus();
        }

        if (services.eventReplication) {
            await services.eventReplication.stop();
            services.eventReplication.configure(settings.eventReplication);
            if (settings.eventReplication.enabled) {
                services.eventReplication.start();
            }
            applied.eventReplication = services.eventReplication.getRuntimeStatus();
        }

        if (services.cloudSync) {
            services.cloudSync.stop();
            services.cloudSync.configure({
                intervalMs: settings.cloudSync.intervalMs,
                trigger: settings.cloudSync.enabled ? settings.cloudSync.trigger : 'disabled',
            });
            if (services.cloudSync.shouldRunIntervalSync()) {
                services.cloudSync.start();
            }
            applied.cloudSync = services.cloudSync.getRuntimeStatus();
        }

        return applied;
    }

    getRuntimeStatus(services = {}) {
        return {
            deviceImport: services.userSync?.getAutoImportStatus?.() ?? null,
            dbToDevice: services.userSync?.getAutoSyncStatus?.() ?? null,
            eventReplication: services.eventReplication?.getRuntimeStatus?.() ?? null,
            cloudSync: services.cloudSync?.getRuntimeStatus?.() ?? null,
        };
    }
}

export default SyncSettingsService;
