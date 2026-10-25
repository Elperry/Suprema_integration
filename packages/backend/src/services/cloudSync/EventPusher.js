/**
 * EventPusher
 *
 * Copies swipe events from this gate PC into the shared cloud `events` table.
 *
 *   - Only local events with `cloudSyncedAt IS NULL` and a timestamp on or
 *     after `since` are considered. History before `since` is never pushed:
 *     re-sending it could change attendance the cloud already reports.
 *   - An event is identified across PCs by (cloud device id, supremaEventId),
 *     the cloud's unique key. Missing ones are INSERTed without `id`.
 *   - `deviceId` and `userId` are translated to cloud ids. An event whose
 *     device, or whose known local user, has no cloud row yet stays pending.
 *     A device user that is not a local user at all (a visitor, a user
 *     enrolled directly on the terminal) is pushed with userId NULL.
 *   - A local event is stamped only once the cloud is seen to hold it.
 *   - A cloud copy that disagrees (other user or time) is reported, never
 *     updated: cloud attendance is immutable.
 */
const EVENT_COLUMNS = [
    'deviceId', 'supremaEventId', 'eventCode', 'eventType', 'subType', 'userId',
    'doorId', 'description', 'authResult', 'timestamp', 'syncedAt', 'rawData',
];

export class EventPusher {
    /**
     * @param {object}   o
     * @param {object}   o.cloud   CloudStore
     * @param {object}   o.local   { pendingEvents({since, limit}), markEventsSynced(ids, at) }
     * @param {object}   o.ctx     { cloudDeviceId(id), isLocalUser(userId), cloudUserIdForDeviceUser(userId) }
     * @param {Date}     o.since   first event time this PC may push
     */
    constructor({ cloud, local, ctx, logger, since, batchSize = 1000 }) {
        if (!(since instanceof Date) || Number.isNaN(since.getTime())) {
            throw new Error('EventPusher needs a valid `since` date (CLOUD_SYNC_EVENTS_SINCE); refusing to push all history');
        }
        this.cloud = cloud;
        this.local = local;
        this.ctx = ctx;
        this.logger = logger;
        this.since = since;
        this.batchSize = batchSize;
    }

    async push() {
        const stats = { inserted: 0, alreadyInCloud: 0, pending: 0, mismatches: [] };
        const events = await this.local.pendingEvents({ since: this.since, limit: this.batchSize });
        if (events.length === 0) return stats;

        const byDevice = new Map();
        for (const event of events) {
            const row = this._toCloud(event);
            if (!row) {
                stats.pending++;
                continue;
            }
            if (!byDevice.has(row.deviceId)) byDevice.set(row.deviceId, []);
            byDevice.get(row.deviceId).push({ local: event, row });
        }

        const syncedIds = [];
        for (const [deviceId, items] of byDevice) {
            const result = await this._pushDevice(deviceId, items);
            stats.inserted += result.inserted;
            stats.alreadyInCloud += result.alreadyInCloud;
            stats.mismatches.push(...result.mismatches);
            syncedIds.push(...result.syncedIds);
        }
        if (syncedIds.length > 0) {
            await this.local.markEventsSynced(syncedIds, new Date());
        }
        this._log(stats);
        return stats;
    }

    async _pushDevice(deviceId, items) {
        const result = { inserted: 0, alreadyInCloud: 0, mismatches: [], syncedIds: [] };
        const keys = items.map(item => String(item.row.supremaEventId));
        const before = await this._cloudByEventId(deviceId, keys);

        const missing = [];
        for (const item of items) {
            const existing = before.get(String(item.row.supremaEventId));
            if (!existing) {
                missing.push(item);
                continue;
            }
            result.alreadyInCloud++;
            if (!sameEvent(existing, item.row)) {
                result.mismatches.push({
                    deviceId, supremaEventId: String(item.row.supremaEventId),
                    cloud: { userId: existing.userId, timestamp: existing.timestamp },
                    local: { userId: item.row.userId, timestamp: item.row.timestamp },
                });
            }
            result.syncedIds.push(item.local.id);
        }

        if (missing.length > 0) {
            await this.cloud.insertMany('events', missing.map(item => item.row));
            const after = await this._cloudByEventId(deviceId, missing.map(item => String(item.row.supremaEventId)));
            for (const item of missing) {
                if (after.has(String(item.row.supremaEventId))) {
                    result.inserted++;
                    result.syncedIds.push(item.local.id);
                }
            }
        }
        return result;
    }

    async _cloudByEventId(deviceId, supremaEventIds) {
        const rows = await this.cloud.findInScoped(
            'events', 'deviceId', deviceId, 'supremaEventId', supremaEventIds,
            ['id', 'deviceId', 'supremaEventId', 'userId', 'timestamp'],
        );
        return new Map(rows.map(row => [String(row.supremaEventId), row]));
    }

    /** Cloud-shaped event, or null when it must stay pending. */
    _toCloud(event) {
        const deviceId = this.ctx.cloudDeviceId(event.deviceId);
        if (deviceId === null || deviceId === undefined) return null;

        let userId = null;
        const deviceUser = event.userId === null || event.userId === undefined ? '' : String(event.userId).trim();
        if (deviceUser !== '' && this.ctx.isLocalUser(deviceUser)) {
            const cloudUser = this.ctx.cloudUserIdForDeviceUser(deviceUser);
            if (cloudUser === null || cloudUser === undefined) return null;
            userId = String(cloudUser);
        }

        const row = {};
        for (const column of EVENT_COLUMNS) row[column] = event[column] ?? null;
        row.deviceId = deviceId;
        row.userId = userId;
        row.supremaEventId = typeof event.supremaEventId === 'bigint'
            ? event.supremaEventId.toString() : event.supremaEventId;
        return row;
    }

    _log(stats) {
        this.logger.info(
            `[CloudSync:events] inserted=${stats.inserted}, alreadyInCloud=${stats.alreadyInCloud}, ` +
            `pending=${stats.pending}, mismatches=${stats.mismatches.length}`
        );
        if (stats.mismatches.length > 0) {
            this.logger.warn(`[CloudSync:events] cloud copies differ (left untouched): ${JSON.stringify(stats.mismatches.slice(0, 5))}`);
        }
    }
}

function sameEvent(cloudRow, localRow) {
    const time = value => (value instanceof Date ? value.toISOString() : new Date(value).toISOString());
    return String(cloudRow.userId ?? '') === String(localRow.userId ?? '')
        && time(cloudRow.timestamp) === time(localRow.timestamp);
}
