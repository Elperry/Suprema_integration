import test from 'node:test';
import assert from 'node:assert/strict';
import { EventBacklog } from './EventBacklog.js';
import { MemoryCloudStore } from './testing/MemoryCloudStore.js';

const T = iso => new Date(iso);
const since = T('2026-10-20T00:00:00Z');

function fakeLocal(devices, events) {
    return {
        async devices() { return devices; },
        async eventsSince({ since: s, afterId, limit }) {
            return events.filter(e => e.timestamp >= s && e.id > afterId).slice(0, limit);
        },
    };
}

const ev = (id, deviceId, sup, iso) => ({ id, deviceId, supremaEventId: sup, timestamp: T(iso) });

test('counts local swipes the cloud lacks by natural key and reports the earliest one', async () => {
    const cloud = new MemoryCloudStore({
        device: [{ id: 40, serialNumber: '546084682' }],
        events: [{ id: 1, deviceId: 40, supremaEventId: 101, userId: '900', timestamp: T('2026-10-21T06:00:00Z') }],
    });
    const local = fakeLocal([{ id: 2, serialNumber: '546084682' }], [
        ev(1, 2, 101, '2026-10-21T06:00:00Z'),       // in the cloud
        ev(2, 2, 102, '2026-10-22T06:00:00Z'),       // missing
        ev(3, 2, 103, '2026-10-23T06:00:00Z'),       // missing
        ev(4, 2, 99, '2026-10-01T06:00:00Z'),        // before `since`: not looked at
    ]);
    const report = await new EventBacklog({ cloud, local, pageSize: 2 }).report({ since });
    assert.equal(report.scanned, 3);
    assert.equal(report.missing, 2);
    assert.equal(report.earliestMissing.toISOString(), '2026-10-22T06:00:00.000Z');
    assert.deepEqual(report.devices, [{ localId: 2, serialNumber: '546084682', cloudId: 40, missing: 2 }]);
});

test('a device the cloud does not know by serial is reported, its swipes all missing', async () => {
    const cloud = new MemoryCloudStore({ device: [], events: [] });
    const local = fakeLocal([{ id: 7, serialNumber: '777000111' }, { id: 8, serialNumber: null }],
        [ev(1, 7, 1, '2026-10-21T06:00:00Z'), ev(2, 8, 2, '2026-10-21T07:00:00Z')]);
    const report = await new EventBacklog({ cloud, local }).report({ since });
    assert.equal(report.missing, 2);
    assert.deepEqual(report.devices.map(d => [d.localId, d.cloudId, d.missing]), [[7, null, 1], [8, null, 1]]);
});

test('the backlog check only reads: no insert, update or delete', async () => {
    const cloud = new MemoryCloudStore({ device: [{ id: 40, serialNumber: 'S' }], events: [] });
    const local = fakeLocal([{ id: 2, serialNumber: 'S' }], [ev(1, 2, 5, '2026-10-21T06:00:00Z')]);
    await new EventBacklog({ cloud, local }).report({ since });
    assert.deepEqual([...new Set(cloud.calls.map(c => c.op))].sort(), ['findIn', 'findInScoped']);
});
