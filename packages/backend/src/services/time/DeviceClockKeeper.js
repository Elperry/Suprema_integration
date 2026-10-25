/**
 * DeviceClockKeeper
 *
 * Keeps the terminals' time zone equal to the school's (Africa/Cairo by
 * default, DEVICE_TIMEZONE overrides), daylight saving included. The offset
 * used to be a fixed DEVICE_TIMEZONE_OFFSET applied once at startup, so a
 * DST change left every terminal an hour off until someone restarted the PC.
 *
 *   - check(): writes the zone to all devices when Cairo's offset differs
 *     from what was last applied (startup, and the two DST nights a year);
 *   - a device that reconnects gets the zone and the time again.
 *
 * Swipe records are UTC either way; this only affects what the terminal
 * screen shows and its local schedules.
 */
import { offsetMinutes, SCHOOL_TIMEZONE } from '../tna/tnaRules.js';

export class DeviceClockKeeper {
    constructor({ timeService, connectionService, logger, timeZone = process.env.DEVICE_TIMEZONE || SCHOOL_TIMEZONE, now = () => new Date() }) {
        this.timeService = timeService;
        this.connection = connectionService;
        this.logger = logger;
        this.timeZone = timeZone;
        this.now = now;
        this.lastApplied = null;
        this._timer = null;
        this._onConnected = ({ deviceId }) => {
            this._applyToDevice(deviceId).catch(err =>
                this.logger.warn(`Clock: could not set zone/time on device ${deviceId}: ${err.message}`));
        };
    }

    offsetSeconds() {
        return offsetMinutes(this.now(), this.timeZone) * 60;
    }

    async check() {
        const offset = this.offsetSeconds();
        if (offset === this.lastApplied) return false;
        const result = await this.timeService.syncAllDevices(offset);
        if (result?.success !== false) {
            this.logger.info(`Clock: devices set to ${this.timeZone} (UTC${offset >= 0 ? '+' : ''}${offset / 3600})`);
            this.lastApplied = offset;
        }
        return true;
    }

    /** @param {{checkEveryMs?: number}} o  0 = no periodic check (tests) */
    start({ checkEveryMs = 15 * 60 * 1000 } = {}) {
        this.connection.on('device:connected', this._onConnected);
        if (checkEveryMs > 0 && !this._timer) {
            this._timer = setInterval(() => this.check().catch(err =>
                this.logger.error(`Clock: periodic zone check failed: ${err.message}`)), checkEveryMs);
            this._timer.unref?.();
        }
        return this.check();
    }

    stop() {
        this.connection.off('device:connected', this._onConnected);
        if (this._timer) clearInterval(this._timer);
        this._timer = null;
    }

    async _applyToDevice(deviceId) {
        await this.timeService.setTimeConfig(deviceId, this.offsetSeconds(), true);
        await this.timeService.setDeviceTime(deviceId);
    }
}
