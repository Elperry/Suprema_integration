/**
 * CloudSyncService
 *
 * Keeps this gate PC and the school's shared cloud schema in step. Several
 * gate PCs write into one cloud schema, so the cloud is the hub:
 *
 *   1. employees     cloud -> local cache (+ a local user per employee)
 *   2. users         local -> cloud, matched by employee_id
 *   3. devices       local -> cloud, matched by Suprema serial (this PC's own)
 *   4. cards         local -> cloud, matched by card_data, user translated
 *   5. enrollments   local -> cloud, device and card translated
 *   6. events        local -> cloud, from CLOUD_SYNC_EVENTS_SINCE, by natural key
 *   7. visitors      cloud tempaccess -> this PC's devices
 *
 * Nothing is ever deleted from the cloud and no attendance row is ever
 * rewritten (see cloudSync/KeyedPusher.js and cloudSync/EventPusher.js).
 * Triggering (disabled | startup | interval | both) is decided outside.
 */
import { CircuitBreaker, CircuitOpenError, isConnectivityError } from '../core/utils/circuitBreaker.js';
import { CloudStore } from './cloudSync/CloudStore.js';
import { LocalSource } from './cloudSync/LocalSource.js';
import { KeyedPusher } from './cloudSync/KeyedPusher.js';
import { userSpec, deviceSpec, cardSpec, enrollmentSpec } from './cloudSync/CloudPushSpecs.js';
import { CloudIdentityMap } from './cloudSync/CloudIdentityMap.js';
import { EventPusher } from './cloudSync/EventPusher.js';
import { EmployeePuller } from './cloudSync/EmployeePuller.js';
import { TempAccessPuller } from './cloudSync/TempAccessPuller.js';
import { schoolToday } from './tna/tnaRules.js';

const CIRCUIT_FAILURE_THRESHOLD = Math.max(1, Number(process.env.CLOUD_SYNC_CIRCUIT_FAILURE_THRESHOLD ?? 3));
const CIRCUIT_OPEN_MS = Math.max(0, Number(process.env.CLOUD_SYNC_CIRCUIT_OPEN_MS ?? 60_000));
const CIRCUIT_PROBE_TIMEOUT_MS = Math.max(1_000, Number(process.env.CLOUD_SYNC_PROBE_TIMEOUT_MS ?? 5_000));
const EVENT_BATCHES_PER_CYCLE = Math.max(1, Number(process.env.CLOUD_SYNC_EVENT_BATCHES ?? 20));

class CloudSyncService {
    /**
     * @param {object} o
     * @param {object} [o.localPrisma]   local Prisma client (or pass localSource)
     * @param {object} [o.cloudPrisma]   cloud Prisma client (or pass cloudStore); null = sync off
     * @param {object} [o.cloudStore]    CloudStore-shaped adapter (tests)
     * @param {object} [o.localSource]   LocalSource-shaped adapter (tests)
     * @param {Date|string|null} [o.eventsSince]  first event time this PC may push
     * @param {object|null} [o.visitorProvisioner]  provisions a visitor QR on this PC's devices
     * @param {Function} [o.today]       () -> 'YYYY-MM-DD' in school time
     */
    constructor({
        localPrisma, cloudPrisma, cloudStore, localSource, logger,
        intervalMs = 5 * 60 * 1000, trigger = 'both',
        eventsSince = process.env.CLOUD_SYNC_EVENTS_SINCE || null,
        visitorProvisioner = null,
        today = () => schoolToday(),
        employeeMinPrunePct = Number(process.env.CLOUD_SYNC_EMPLOYEE_MIN_PRUNE_PCT ?? 50),
    }) {
        this.cloudPrisma = cloudPrisma ?? null;
        this.cloud = cloudStore ?? (cloudPrisma ? new CloudStore(cloudPrisma) : null);
        this.local = localSource ?? (localPrisma ? new LocalSource(localPrisma) : null);
        this.logger = logger;
        this.intervalMs = intervalMs;
        this.trigger = normalizeTrigger(trigger);
        this._timer = null;
        this._running = false;
        this._breaker = new CircuitBreaker({
            name: 'cloud-sync', failureThreshold: CIRCUIT_FAILURE_THRESHOLD, openMs: CIRCUIT_OPEN_MS,
            logger, isFailure: isConnectivityError,
        });
        if (this.cloud && this.local) this._wire({ eventsSince, visitorProvisioner, today, employeeMinPrunePct });
    }

    _wire({ eventsSince, visitorProvisioner, today, employeeMinPrunePct }) {
        const { cloud, local, logger } = this;
        this.identity = null;
        const ctx = {
            cloudUserId: id => this.identity?.cloudUserId(id) ?? null,
            isLocalUser: id => this.identity?.isLocalUser(id) ?? false,
            cloudUserIdForDeviceUser: id => this.identity?.cloudUserIdForDeviceUser(id) ?? null,
            cloudDeviceId: id => this.identity?.cloudDeviceId(id) ?? null,
            cloudCardId: id => this.identity?.cloudCardId(id) ?? null,
        };
        this.pushers = {
            users: new KeyedPusher(userSpec(), cloud, logger),
            devices: new KeyedPusher(deviceSpec(), cloud, logger),
            cards: new KeyedPusher(cardSpec(ctx), cloud, logger),
            enrollments: new KeyedPusher(enrollmentSpec(ctx), cloud, logger),
        };
        this.employees = new EmployeePuller({ cloud, local, logger, minPrunePct: employeeMinPrunePct });
        this.visitors = new TempAccessPuller({ cloud, local, provisioner: visitorProvisioner, logger, today });

        const since = eventsSince ? new Date(eventsSince) : null;
        if (since && !Number.isNaN(since.getTime())) {
            this.eventPusher = new EventPusher({ cloud, local, ctx, logger, since });
        } else {
            this.eventPusher = null;
            logger.warn('CloudSync: CLOUD_SYNC_EVENTS_SINCE is not set - events are NOT pushed to the cloud');
        }
    }

    getCloudHealth() {
        return {
            state: this._breaker.state,
            consecutiveFailures: this._breaker.consecutiveFailures,
            msUntilRetry: this._breaker.msUntilRetry(),
            lastError: this._breaker.lastError?.message || null,
        };
    }

    isEnabled() { return !!this.cloud && this.trigger !== 'disabled'; }
    shouldRunInitialSync() { return this.isEnabled() && (this.trigger === 'startup' || this.trigger === 'both'); }
    shouldRunIntervalSync() {
        return this.isEnabled() && (this.trigger === 'interval' || this.trigger === 'both') && this.intervalMs > 0;
    }

    start() {
        if (!this.shouldRunIntervalSync()) {
            this.logger.info(`CloudSync interval start skipped (trigger=${this.trigger}, intervalMs=${this.intervalMs})`);
            return;
        }
        if (this._timer) return;
        this.logger.info(`CloudSyncService started (interval: ${this.intervalMs / 1000}s)`);
        this._timer = setInterval(() => {
            this._cycle().catch(err => this.logger.error('CloudSync cycle error:', err.message));
        }, this.intervalMs);
    }

    async runInitialSync() {
        if (!this.shouldRunInitialSync()) {
            this.logger.info(`CloudSync initial sync skipped (trigger=${this.trigger})`);
            return;
        }
        const started = Date.now();
        try {
            await this._cycle();
            this.logger.info(`CloudSync initial sync complete (${Date.now() - started}ms)`);
        } catch (err) {
            this.logger.error('CloudSync initial sync failed:', err.message);
        }
    }

    stop() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
        this.logger.info('CloudSyncService stopped');
    }

    configure(options = {}) {
        if (options.intervalMs !== undefined) this.intervalMs = options.intervalMs;
        if (options.trigger !== undefined) this.trigger = normalizeTrigger(options.trigger);
    }

    getRuntimeStatus() {
        return {
            configured: !!this.cloud, enabled: this.isEnabled(), running: !!this._timer,
            trigger: this.trigger, intervalMs: this.intervalMs, runningCycle: this._running,
            eventsPushed: !!this.eventPusher, breaker: this.getCloudHealth(),
        };
    }

    async _cycle() {
        if (!this.cloud || !this.local || this._running) return;
        if (!this._breaker.canExecute()) {
            this.logger.warn(`CloudSync cycle skipped - circuit open (retry in ${Math.ceil(this._breaker.msUntilRetry() / 1000)}s)`);
            return;
        }
        try {
            await this._breaker.exec(() => this._probe());
        } catch (error) {
            if (!(error instanceof CircuitOpenError)) this.logger.warn(`CloudSync cycle skipped - cloud probe failed: ${error.message}`);
            return;
        }

        this._running = true;
        try {
            await this._step('employees', () => this.employees.run());
            await this._step('push', () => this._pushRegistries());
            if (this.eventPusher) await this._step('events', () => this._pushEvents());
            await this._step('visitors', () => this.visitors.run());
        } finally {
            this._running = false;
        }
    }

    async _pushRegistries() {
        const [users, devices, cards, enrollments] = await Promise.all([
            this.local.users(), this.local.devices(), this.local.cards(), this.local.enrollments(),
        ]);
        await this.pushers.users.push(users);
        await this.pushers.devices.push(devices);
        this.identity = new CloudIdentityMap({
            localUsers: users, localDevices: devices, localCards: cards,
            users: this.pushers.users, devices: this.pushers.devices, cards: this.pushers.cards,
        });
        await this.pushers.cards.push(cards);
        await this.pushers.enrollments.push(enrollments);
    }

    async _pushEvents() {
        for (let batch = 0; batch < EVENT_BATCHES_PER_CYCLE; batch++) {
            const stats = await this.eventPusher.push();
            if (stats.inserted + stats.alreadyInCloud === 0) break;
        }
    }

    async _step(name, work) {
        try {
            await work();
        } catch (error) {
            if (isConnectivityError(error)) {
                this._breaker.recordFailure(error);
                Object.values(this.pushers).forEach(p => p.reset());
            }
            this.logger.error(`CloudSync ${name} failed: ${error?.message || error?.code || String(error)}`, { stack: error?.stack });
        }
    }

    async _probe() {
        let timer;
        const timeout = new Promise((_, reject) => {
            timer = setTimeout(() => {
                const err = new Error(`cloud DB probe timed out after ${CIRCUIT_PROBE_TIMEOUT_MS}ms`);
                err.isConnectivityError = true;
                reject(err);
            }, CIRCUIT_PROBE_TIMEOUT_MS);
        });
        try {
            await Promise.race([this.cloud.ping(), timeout]);
        } finally {
            clearTimeout(timer);
        }
    }
}

function normalizeTrigger(trigger) {
    const value = String(trigger || 'both').trim().toLowerCase();
    return ['disabled', 'startup', 'interval', 'both'].includes(value) ? value : 'both';
}

export default CloudSyncService;
