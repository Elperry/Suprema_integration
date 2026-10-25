import test from 'node:test';
import assert from 'node:assert/strict';
import { EventPusher } from './EventPusher.js';
import { MemoryCloudStore } from './testing/MemoryCloudStore.js';

const silent = { info() {}, warn() {}, error() {}, debug() {} };
const T = iso => new Date(iso);

/** Local side: pending events in, synced ids out. */
function fakeLocal(events, localUserIds = ['3', '4', '5']) {
    const local = {
        events: events.map(e => ({ cloudSyncedAt: null, ...e })),
        asked: [],
        async pendingEvents({ since, limit, afterId = 0 }) {
            local.asked.push({ since, limit, afterId });
            return local.events
                .filter(e => e.cloudSyncedAt === null && e.timestamp >= since && e.id > afterId)
                .slice(0, limit);
        },
        async existingUserIds(ids) {
            return ids.filter(id => localUserIds.includes(String(id)));
        },
        async markEventsSynced(ids, at) {
            for (const e of local.events) if (ids.includes(e.id)) e.cloudSyncedAt = at;
        },
    };
    return local;
}

// Local device 2 is cloud device 40; local users 3 and 4 are cloud users 900 and 901;
// local user 5 exists but has no cloud row yet.
const ctx = {
    cloudDeviceId: id => ({ 2: 40 })[id] ?? null,
    isLocalUser: userId => ['3', '4', '5'].includes(String(userId)),
    cloudUserIdForDeviceUser: userId => ({ 3: 900, 4: 901 })[userId] ?? null,
};

function ev(id, extra = {}) {
    return {
        id, deviceId: 2, supremaEventId: 1000 + id, eventCode: 4867, eventType: 'attendance', subType: null,
        userId: '3', doorId: null, description: null, authResult: 'success',
        timestamp: T('2026-10-26T06:00:00Z'), syncedAt: T('2026-10-26T06:00:05Z'), rawData: { a: 1 }, ...extra,
    };
}

const since = T('2026-10-25T00:00:00Z');

test('pending events are inserted with cloud device and user ids, no local id, then stamped', async () => {
    const cloud = new MemoryCloudStore({ events: [] }, { events: 60000 });
    const local = fakeLocal([ev(1), ev(2, { userId: '4' })]);
    const stats = await new EventPusher({ cloud, local, ctx, logger: silent, since }).push();
    assert.equal(stats.inserted, 2);
    const rows = cloud.ops('insertMany')[0].rows;
    assert.equal('id' in rows[0], false);
    assert.deepEqual(rows.map(r => [r.deviceId, r.userId]), [[40, '900'], [40, '901']]);
    assert.ok(local.events.every(e => e.cloudSyncedAt instanceof Date));
    assert.equal(cloud.tables.events[0].id, 60000);
});

test('an event the cloud already holds is stamped, not inserted again', async () => {
    const cloud = new MemoryCloudStore({ events: [
        { id: 5, deviceId: 40, supremaEventId: 1001, userId: '900', timestamp: T('2026-10-26T06:00:00Z') },
    ] });
    const local = fakeLocal([ev(1)]);
    const stats = await new EventPusher({ cloud, local, ctx, logger: silent, since }).push();
    assert.equal(stats.inserted, 0);
    assert.equal(stats.alreadyInCloud, 1);
    assert.ok(local.events[0].cloudSyncedAt instanceof Date);
});

test('a cloud copy that disagrees is reported and never updated', async () => {
    const cloud = new MemoryCloudStore({ events: [
        { id: 5, deviceId: 40, supremaEventId: 1001, userId: '777', timestamp: T('2026-10-26T06:00:00Z') },
    ] });
    const local = fakeLocal([ev(1)]);
    const stats = await new EventPusher({ cloud, local, ctx, logger: silent, since }).push();
    assert.equal(stats.mismatches.length, 1);
    assert.equal(cloud.ops('updateById').length, 0);
    assert.equal(cloud.tables.events[0].userId, '777');
});

test('an event from a device the cloud does not know yet stays pending', async () => {
    const cloud = new MemoryCloudStore({ events: [] });
    const local = fakeLocal([ev(1, { deviceId: 9 })]);
    const stats = await new EventPusher({ cloud, local, ctx, logger: silent, since }).push();
    assert.equal(stats.pending, 1);
    assert.equal(local.events[0].cloudSyncedAt, null);
    assert.equal(cloud.ops('insertMany').length, 0);
});

test('a known local user without a cloud row yet keeps the event pending', async () => {
    const cloud = new MemoryCloudStore({ events: [] });
    const local = fakeLocal([ev(1, { userId: '5' })]);
    const stats = await new EventPusher({ cloud, local, ctx, logger: silent, since }).push();
    assert.equal(stats.pending, 1);
    assert.equal(local.events[0].cloudSyncedAt, null);
});

test('a device user that is not a local user is pushed unattributed (userId NULL)', async () => {
    const cloud = new MemoryCloudStore({ events: [] });
    const local = fakeLocal([ev(1, { userId: '4001234' }), ev(2, { userId: null })]);
    const stats = await new EventPusher({ cloud, local, ctx, logger: silent, since }).push();
    assert.equal(stats.inserted, 2);
    assert.deepEqual(cloud.tables.events.map(r => r.userId), [null, null]);
});

test('history before the configured start is never asked for, and the batch limit is honoured', async () => {
    const cloud = new MemoryCloudStore({ events: [] });
    const local = fakeLocal([ev(1, { timestamp: T('2026-01-01T00:00:00Z') }), ev(2), ev(3), ev(4)]);
    const stats = await new EventPusher({ cloud, local, ctx, logger: silent, since, batchSize: 2 }).push();
    assert.deepEqual(local.asked[0], { since, limit: 2, afterId: 0 });
    assert.equal(stats.inserted, 2);
    assert.equal(local.events[0].cloudSyncedAt, null, 'pre-start history untouched');
});

test('without a start date nothing is pushed (refuses to re-push all history)', async () => {
    const cloud = new MemoryCloudStore({ events: [] });
    const local = fakeLocal([ev(1)]);
    assert.throws(() => new EventPusher({ cloud, local, ctx, logger: silent, since: null }), /since/i);
});

test('a device user created locally after the identity snapshot stays pending, never NULL', async () => {
    // ctx (the snapshot) does not know user 6; the local database does.
    const cloud = new MemoryCloudStore({ events: [] });
    const local = fakeLocal([ev(1, { userId: '6' })], ['3', '4', '5', '6']);
    const stats = await new EventPusher({ cloud, local, ctx, logger: silent, since }).push();
    assert.equal(stats.pending, 1);
    assert.equal(cloud.tables.events.length, 0, 'not frozen in the cloud as unattributed');
    assert.equal(local.events[0].cloudSyncedAt, null);
});

test('events that can never be translated do not block the ones behind them', async () => {
    const cloud = new MemoryCloudStore({ events: [] });
    const stuck = [1, 2, 3].map(id => ev(id, { deviceId: 9 }));   // device 9: deleted locally
    const local = fakeLocal([...stuck, ev(4), ev(5)]);
    const pusher = new EventPusher({ cloud, local, ctx, logger: silent, since, batchSize: 2 });
    for (let i = 0; i < 5; i++) {
        const stats = await pusher.push();
        if (stats.scanned === 0) break;
    }
    assert.deepEqual(cloud.tables.events.map(e => e.supremaEventId).sort(), [1004, 1005]);
    assert.ok(local.events.slice(3).every(e => e.cloudSyncedAt instanceof Date));
    assert.ok(local.events.slice(0, 3).every(e => e.cloudSyncedAt === null), 'stuck rows stay pending');
});

test('after a full pass the scan starts again from the oldest pending event', async () => {
    const cloud = new MemoryCloudStore({ events: [] });
    const local = fakeLocal([ev(1, { deviceId: 9 })]);
    const pusher = new EventPusher({ cloud, local, ctx, logger: silent, since });
    await pusher.push();
    const end = await pusher.push();
    assert.equal(end.scanned, 0);
    await pusher.push();
    assert.deepEqual(local.asked.map(a => a.afterId), [0, 1, 0]);
});
