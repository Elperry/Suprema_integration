/**
 * EventBacklog
 *
 * Read-only check, run once per gate PC at cut-over: which local swipes
 * since a given time does the shared cloud NOT hold? It matches exactly as
 * EventPusher does - local device -> Suprema serial -> cloud device, then
 * (cloud device id, supremaEventId) - so its `earliestMissing` is the value
 * to give CLOUD_SYNC_EVENTS_SINCE: nothing the old sync left behind, and no
 * swipe made while the backend was down, is skipped.
 *
 * A device the cloud does not know by serial reports cloudId null: all its
 * swipes count as missing. If the old sync stored them under another device
 * id, pushing them would duplicate them - that is the owner's call (P-3).
 */
export class EventBacklog {
    /**
     * @param {object} o
     * @param {object} o.cloud  CloudStore (only findIn / findInScoped are used)
     * @param {object} o.local  { devices(), eventsSince({since, afterId, limit}) }
     */
    constructor({ cloud, local, pageSize = 1000 }) {
        this.cloud = cloud;
        this.local = local;
        this.pageSize = pageSize;
    }

    async report({ since }) {
        const devices = await this.local.devices();
        const cloudIds = await this._cloudDeviceIds(devices);
        const perDevice = new Map(devices.map(d => [Number(d.id), {
            localId: Number(d.id), serialNumber: d.serialNumber ?? null,
            cloudId: d.serialNumber ? cloudIds.get(String(d.serialNumber)) ?? null : null, missing: 0,
        }]));
        const report = { since, scanned: 0, missing: 0, earliestMissing: null, devices: [] };

        let afterId = 0;
        for (;;) {
            const page = await this.local.eventsSince({ since, afterId, limit: this.pageSize });
            if (page.length === 0) break;
            afterId = page.reduce((max, e) => Math.max(max, Number(e.id)), afterId);
            report.scanned += page.length;
            for (const event of await this._missing(page, perDevice)) {
                report.missing++;
                perDevice.get(Number(event.deviceId)).missing++;
                if (!report.earliestMissing || event.timestamp < report.earliestMissing) report.earliestMissing = event.timestamp;
            }
        }
        report.devices = [...perDevice.values()];
        return report;
    }

    /** serial -> cloud device id; the lowest id wins, as in KeyedPusher. */
    async _cloudDeviceIds(devices) {
        const serials = devices.filter(d => d.serialNumber).map(d => String(d.serialNumber));
        const rows = serials.length ? await this.cloud.findIn('device', 'serialNumber', serials, ['id', 'serialNumber']) : [];
        const bySerial = new Map();
        for (const row of rows) {
            const key = String(row.serialNumber);
            if (!bySerial.has(key) || Number(row.id) < bySerial.get(key)) bySerial.set(key, Number(row.id));
        }
        return bySerial;
    }

    async _missing(page, perDevice) {
        const missing = [];
        const byDevice = new Map();
        for (const event of page) {
            const device = perDevice.get(Number(event.deviceId));
            if (!device) {
                perDevice.set(Number(event.deviceId), { localId: Number(event.deviceId), serialNumber: null, cloudId: null, missing: 0 });
            }
            const cloudId = perDevice.get(Number(event.deviceId)).cloudId;
            if (cloudId === null) {
                missing.push(event);
                continue;
            }
            if (!byDevice.has(cloudId)) byDevice.set(cloudId, []);
            byDevice.get(cloudId).push(event);
        }
        for (const [cloudId, events] of byDevice) {
            const ids = events.map(e => String(e.supremaEventId));
            const found = await this.cloud.findInScoped('events', 'deviceId', cloudId, 'supremaEventId', ids, ['supremaEventId']);
            const have = new Set(found.map(row => String(row.supremaEventId)));
            missing.push(...events.filter(e => !have.has(String(e.supremaEventId))));
        }
        return missing;
    }
}
