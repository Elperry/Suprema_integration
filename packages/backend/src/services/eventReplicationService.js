/**
 * Event Replication Service
 *
 * Background service that continuously replicates device events into the
 * database. It combines three mechanisms:
 *
 * 1. Periodic polling for connected devices using event IDs as the replay cursor
 * 2. Immediate catch-up when a device reconnects
 * 3. Optional realtime persistence using eventService's event stream
 *
 * The service is designed to be fire-and-forget: start() returns immediately,
 * errors are logged but never bubble up to crash the process.
 */

class EventReplicationService {
    /**
     * @param {Object} deps
     * @param {Object} deps.connectionService - SupremaConnectionService (EventEmitter)
     * @param {Object} deps.eventService - SupremaEventService (gRPC calls)
     * @param {Object} deps.eventRepository - EventRepository (Prisma)
     * @param {Object} deps.database - DatabaseManager (device queries)
     * @param {Object} deps.logger - Logger
     * @param {Object} [opts]
     * @param {number} [opts.intervalMs=60000]
     * @param {number} [opts.batchSize=1000]
     * @param {number} [opts.maxBatches=50]
     * @param {boolean} [opts.enableRealtime=false]
     * @param {number} [opts.realtimeQueueSize=100]
     */
    constructor(deps, opts = {}) {
        this.connectionService = deps.connectionService;
        this.eventService = deps.eventService;
        this.eventRepository = deps.eventRepository;
        this.database = deps.database;
        this.logger = deps.logger;

        this.intervalMs = opts.intervalMs ?? 60_000;
        this.batchSize = opts.batchSize ?? 1000;
        this.maxBatches = opts.maxBatches ?? 50;
        this.enableRealtime = opts.enableRealtime ?? false;
        this.realtimeQueueSize = opts.realtimeQueueSize ?? 100;

        this._interval = null;
        this._realtimeSubscription = null;
        this._onDeviceConnected = null;
        this._onRealtimeEvent = null;
        this._syncing = new Set();
        this._monitoredDevices = new Set();
        this._deviceStatus = new Map();
        this._stats = {
            startedAt: null,
            lastPeriodicRunAt: null,
            lastPeriodicSuccessAt: null,
            lastRealtimeEventAt: null,
            lastError: null,
            totalPersisted: 0,
            totalPeriodicPersisted: 0,
            totalReconnectPersisted: 0,
            totalRealtimePersisted: 0,
            totalSyncFailures: 0,
            totalRealtimeFailures: 0,
        };
    }

    start() {
        if (this._interval) return;

        this._stats.startedAt = new Date();
        this.logger.info('[EventReplication] Starting event replication service', {
            intervalMs: this.intervalMs,
            batchSize: this.batchSize,
            maxBatches: this.maxBatches,
            enableRealtime: this.enableRealtime,
            realtimeQueueSize: this.realtimeQueueSize,
        });

        this._onRealtimeEvent = (event) => {
            this._handleRealtimeEvent(event).catch(() => {});
        };
        this.eventService.on('event:received', this._onRealtimeEvent);

        this._onDeviceConnected = ({ deviceId, config }) => {
            if (this.enableRealtime) {
                this._ensureRealtimeMonitoring(deviceId).catch((error) => {
                    this.logger.warn('[EventReplication] Failed to enable realtime monitoring for connected device', {
                        deviceId,
                        error: error.message,
                    });
                });
            }

            this._syncConnectedDevice(deviceId, config).catch(() => {});
        };
        this.connectionService.on('device:connected', this._onDeviceConnected);

        if (this.enableRealtime) {
            this._startRealtimeSubscription().catch((error) => {
                this.logger.warn('[EventReplication] Failed to start realtime subscription', {
                    error: error.message,
                });
            });

            this._enableRealtimeForCurrentConnections().catch((error) => {
                this.logger.warn('[EventReplication] Failed to enable realtime monitoring for current devices', {
                    error: error.message,
                });
            });
        }

        this._interval = setInterval(() => {
            this._syncAllDevices('periodic').catch(() => {});
        }, this.intervalMs);

        this._syncAllDevices('periodic').catch(() => {});
    }

    async stop() {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }

        if (this._onDeviceConnected) {
            this.connectionService.removeListener('device:connected', this._onDeviceConnected);
            this._onDeviceConnected = null;
        }

        if (this._onRealtimeEvent) {
            this.eventService.removeListener('event:received', this._onRealtimeEvent);
            this._onRealtimeEvent = null;
        }

        if (this._realtimeSubscription && typeof this._realtimeSubscription.cancel === 'function') {
            this._realtimeSubscription.cancel();
            this._realtimeSubscription = null;
        }

        const monitoredDevices = Array.from(this._monitoredDevices);
        this._monitoredDevices.clear();

        await Promise.allSettled(
            monitoredDevices.map((deviceId) => this.eventService.disableMonitoring(deviceId))
        );

        this.logger.info('[EventReplication] Stopped');
    }

    async getHealthStatus(options = {}) {
        const { deviceId } = options;
        let devices = await this.database.getAllDevices();

        if (deviceId !== undefined && deviceId !== null && deviceId !== '') {
            devices = devices.filter((device) => String(device.id) === String(deviceId));
        }

        const deviceHealth = await Promise.all(devices.map(async (device) => {
            const lastEvent = await this.eventRepository.findLatestByDevice(device.id);
            const state = this._deviceStatus.get(String(device.id)) || {};
            const connectedSupremaId = this._resolveSupremaId(device);
            const lastEventTimestamp = lastEvent?.timestamp ? new Date(lastEvent.timestamp) : null;

            return {
                deviceId: device.id,
                deviceName: device.name,
                ip: device.ip,
                port: device.port,
                connected: !!connectedSupremaId,
                connectedSupremaId: connectedSupremaId ?? null,
                monitoringEnabled: connectedSupremaId !== null && connectedSupremaId !== undefined
                    ? this._monitoredDevices.has(connectedSupremaId)
                    : false,
                syncInProgress: this._syncing.has(String(device.id)),
                status: device.status,
                lastEventSync: device.last_event_sync,
                lastPersistedEventId: lastEvent ? lastEvent.supremaEventId.toString() : null,
                lastPersistedEventAt: lastEvent?.timestamp ?? null,
                replicationLagSeconds: lastEventTimestamp
                    ? Math.max(0, Math.floor((Date.now() - lastEventTimestamp.getTime()) / 1000))
                    : null,
                lastAttemptAt: state.lastAttemptAt ?? null,
                lastSuccessAt: state.lastSuccessAt ?? null,
                lastErrorAt: state.lastErrorAt ?? null,
                lastError: state.lastError ?? null,
                lastSource: state.lastSource ?? null,
                lastInsertedCount: state.lastInsertedCount ?? 0,
                failureCount: state.failureCount ?? 0,
                totalPersisted: state.totalPersisted ?? 0,
                lastRealtimePersistAt: state.lastRealtimePersistAt ?? null,
                lastBackfillPersistAt: state.lastBackfillPersistAt ?? null,
            };
        }));

        return {
            service: {
                running: !!this._interval,
                realtimeEnabled: this.enableRealtime,
                realtimeSubscribed: !!this._realtimeSubscription,
                monitoredDevices: Array.from(this._monitoredDevices),
                intervalMs: this.intervalMs,
                batchSize: this.batchSize,
                maxBatches: this.maxBatches,
                realtimeQueueSize: this.realtimeQueueSize,
                ...this._stats,
            },
            devices: deviceHealth,
        };
    }

    async _startRealtimeSubscription() {
        if (this._realtimeSubscription) return;
        if (this.eventService.getMonitoringStatus().isMonitoring) return;

        this._realtimeSubscription = this.eventService.subscribeToEvents(this.realtimeQueueSize);
        this.logger.info('[EventReplication] Realtime subscription started', {
            queueSize: this.realtimeQueueSize,
        });
    }

    async _enableRealtimeForCurrentConnections() {
        const currentDeviceIds = Array.from(this.connectionService.connectedDevices.keys());
        for (const deviceId of currentDeviceIds) {
            await this._ensureRealtimeMonitoring(deviceId);
        }
    }

    async _ensureRealtimeMonitoring(deviceId) {
        if (!this.enableRealtime || this._monitoredDevices.has(deviceId)) return;

        await this._startRealtimeSubscription();
        await this.eventService.enableMonitoring(deviceId);
        this._monitoredDevices.add(deviceId);

        this.logger.info('[EventReplication] Realtime monitoring enabled', { deviceId });
    }

    async _handleRealtimeEvent(event) {
        this._stats.lastRealtimeEventAt = new Date();

        const supremaId = event.deviceid ?? event.deviceId;
        if (supremaId == null) {
            this._stats.totalRealtimeFailures += 1;
            this._stats.lastError = 'Realtime event missing device ID';
            return;
        }

        const deviceRecord = await this._findDeviceRecordBySupremaId(supremaId);
        if (!deviceRecord) {
            const message = `Realtime event device could not be matched to database record: ${supremaId}`;
            this._stats.totalRealtimeFailures += 1;
            this._stats.lastError = message;
            this.logger.warn('[EventReplication] ' + message);
            return;
        }

        try {
            await this._persistEvents([event], deviceRecord, 'realtime');
        } catch (error) {
            this._stats.totalRealtimeFailures += 1;
            this._stats.lastError = error.message;
            this.logger.warn('[EventReplication] Failed to persist realtime event', {
                device: deviceRecord.name,
                error: error.message,
            });
        }
    }

    async _syncAllDevices(source = 'periodic') {
        this._stats.lastPeriodicRunAt = new Date();

        let devices;
        try {
            devices = await this.database.getActiveDevices();
        } catch (error) {
            this._stats.totalSyncFailures += 1;
            this._stats.lastError = error.message;
            this.logger.error('[EventReplication] Failed to load active devices', { error: error.message });
            return;
        }

        for (const device of devices) {
            const supremaId = this._resolveSupremaId(device);
            if (!supremaId) continue;

            await this._syncDevice(device.id, supremaId, device, source).catch(() => {});
        }

        this._stats.lastPeriodicSuccessAt = new Date();
    }

    async _syncConnectedDevice(supremaId, config = {}) {
        const deviceRecord = await this._findDeviceRecord(config);
        if (!deviceRecord) {
            this.logger.warn('[EventReplication] Connected device could not be matched to database record', {
                supremaId,
                ip: config.ip,
                port: config.port,
            });
            return;
        }

        await this._syncDevice(deviceRecord.id, supremaId, deviceRecord, 'reconnect');
    }

    async _syncDevice(dbDeviceId, supremaId, deviceRecord, source = 'periodic') {
        const lockKey = String(dbDeviceId);
        if (this._syncing.has(lockKey)) return;
        this._syncing.add(lockKey);

        try {
            if (!deviceRecord) {
                const devices = await this.database.getAllDevices();
                deviceRecord = devices.find((device) => String(device.id) === lockKey);
                if (!deviceRecord) return;
            }

            if (!supremaId) {
                supremaId = this._resolveSupremaId(deviceRecord);
                if (!supremaId) return;
            }

            this._recordAttempt(deviceRecord.id);

            const lastEvent = await this.eventRepository.findLatestByDevice(deviceRecord.id);
            const startEventId = lastEvent ? Number(lastEvent.supremaEventId) + 1 : 0;

            this.logger.info('[EventReplication] Syncing device', {
                device: deviceRecord.name,
                dbId: deviceRecord.id,
                source,
                startEventId,
            });

            let totalInserted = 0;
            let currentStartId = startEventId;

            for (let batch = 0; batch < this.maxBatches; batch++) {
                let events;

                try {
                    events = await this.eventService.getEventLogs(supremaId, currentStartId, this.batchSize);
                } catch (error) {
                    this._recordFailure(deviceRecord.id, error.message);
                    this._stats.totalSyncFailures += 1;
                    this._stats.lastError = error.message;
                    this.logger.warn('[EventReplication] gRPC getEventLogs failed', {
                        device: deviceRecord.name,
                        source,
                        error: error.message,
                    });
                    break;
                }

                if (!events || events.length === 0) break;

                const inserted = await this._persistEvents(events, deviceRecord, source);
                totalInserted += inserted;

                const lastId = this._maxEventId(events);
                if (lastId === null || lastId < currentStartId) break;

                currentStartId = lastId + 1;

                if (events.length < this.batchSize) break;
            }

            if (totalInserted === 0) {
                this._recordSuccess(deviceRecord.id, {
                    source,
                    inserted: 0,
                });
            }

            this.logger.info('[EventReplication] Sync complete', {
                device: deviceRecord.name,
                source,
                synced: totalInserted,
            });
        } catch (error) {
            this._recordFailure(dbDeviceId, error.message);
            this._stats.totalSyncFailures += 1;
            this._stats.lastError = error.message;
            this.logger.error('[EventReplication] Device sync error', {
                deviceId: dbDeviceId,
                source,
                error: error.message,
            });
        } finally {
            this._syncing.delete(lockKey);
        }
    }

    async _persistEvents(events, deviceRecord, source) {
        const rows = events
            .map((event) => this._mapEventToRow(event, deviceRecord.id))
            .filter(Boolean);

        if (rows.length === 0) {
            return 0;
        }

        const result = await this.eventRepository.bulkCreate(rows);
        const inserted = result?.count ?? rows.length;

        if (inserted > 0) {
            await this.database.updateDevice(deviceRecord.id, {
                last_event_sync: new Date(),
            });
        }

        const lastEventId = this._maxEventId(events);
        const lastEventTimestamp = this._maxEventTimestamp(events);
        this._recordSuccess(deviceRecord.id, {
            source,
            inserted,
            lastEventId,
            lastEventTimestamp,
        });

        this._stats.totalPersisted += inserted;
        if (source === 'periodic') this._stats.totalPeriodicPersisted += inserted;
        if (source === 'reconnect') this._stats.totalReconnectPersisted += inserted;
        if (source === 'realtime') this._stats.totalRealtimePersisted += inserted;

        return inserted;
    }

    _mapEventToRow(event, dbDeviceId) {
        try {
            const eventId = event.id ?? event.eventid ?? event.eventId;
            if (eventId == null) return null;

            let timestamp;
            if (event.timestamp) {
                timestamp = new Date(event.timestamp);
                if (isNaN(timestamp.getTime())) timestamp = new Date();
            } else {
                timestamp = new Date();
            }

            let authResult = null;
            if (event.eventType === 'authentication') {
                const code = event.eventcode ?? event.eventCode;
                const successCodes = [0x1000, 0x1100, 0x1200, 0x1300, 0x1400, 0x1500, 0x1600, 0x1700];
                authResult = successCodes.includes(code) ? 'success' : 'fail';
            }

            return {
                deviceId: dbDeviceId,
                supremaEventId: BigInt(eventId),
                eventCode: event.eventcode ?? event.eventCode ?? 0,
                eventType: event.eventType ?? 'other',
                subType: event.subcode != null ? String(event.subcode) : null,
                userId: event.userid ?? event.userId ?? null,
                doorId: event.doorid ?? event.doorId ?? null,
                description: event.description ?? null,
                authResult,
                timestamp,
                rawData: event,
            };
        } catch {
            return null;
        }
    }

    _maxEventId(events) {
        let max = null;
        for (const event of events) {
            const id = Number(event.id ?? event.eventid ?? event.eventId ?? 0);
            if (id > (max ?? -1)) max = id;
        }
        return max;
    }

    _maxEventTimestamp(events) {
        let max = null;
        for (const event of events) {
            if (!event.timestamp) continue;

            const timestamp = new Date(event.timestamp);
            if (isNaN(timestamp.getTime())) continue;
            if (!max || timestamp > max) max = timestamp;
        }
        return max;
    }

    _resolveSupremaId(deviceRecord) {
        for (const [supremaId, info] of this.connectionService.connectedDevices.entries()) {
            if (info.ip === deviceRecord.ip && info.port === deviceRecord.port) {
                return supremaId;
            }
        }
        return null;
    }

    async _findDeviceRecord(config = {}) {
        if (!config.ip) return null;

        const devices = await this.database.getAllDevices();
        return devices.find((device) => (
            device.ip === config.ip
            && Number(device.port ?? 51211) === Number(config.port ?? 51211)
        )) || null;
    }

    async _findDeviceRecordBySupremaId(supremaId) {
        const connectionInfo = this.connectionService.connectedDevices.get(supremaId);
        if (!connectionInfo) return null;

        return this._findDeviceRecord(connectionInfo);
    }

    _getDeviceStatus(deviceId) {
        const key = String(deviceId);
        if (!this._deviceStatus.has(key)) {
            this._deviceStatus.set(key, {
                failureCount: 0,
                totalPersisted: 0,
            });
        }
        return this._deviceStatus.get(key);
    }

    _recordAttempt(deviceId) {
        const status = this._getDeviceStatus(deviceId);
        status.lastAttemptAt = new Date();
    }

    _recordSuccess(deviceId, details = {}) {
        const status = this._getDeviceStatus(deviceId);
        status.lastSuccessAt = new Date();
        status.lastSource = details.source ?? status.lastSource ?? null;
        status.lastInsertedCount = details.inserted ?? 0;
        status.totalPersisted = (status.totalPersisted ?? 0) + (details.inserted ?? 0);

        if (details.lastEventId != null) {
            status.lastEventId = String(details.lastEventId);
        }
        if (details.lastEventTimestamp) {
            status.lastEventTimestamp = details.lastEventTimestamp;
        }
        if (details.source === 'realtime') {
            status.lastRealtimePersistAt = new Date();
        }
        if (details.source === 'periodic' || details.source === 'reconnect') {
            status.lastBackfillPersistAt = new Date();
        }
    }

    _recordFailure(deviceId, error) {
        const status = this._getDeviceStatus(deviceId);
        status.failureCount = (status.failureCount ?? 0) + 1;
        status.lastError = error;
        status.lastErrorAt = new Date();
    }
}

export default EventReplicationService;
