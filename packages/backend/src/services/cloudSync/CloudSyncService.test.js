import test from 'node:test';
import assert from 'node:assert/strict';
import CloudSyncService from '../cloudSyncService.js';
import { MemoryCloudStore } from './testing/MemoryCloudStore.js';

const silent = { info() {}, warn() {}, error() {}, debug() {} };
const since = new Date('2026-10-26T00:00:00Z');

/** One gate PC's local database, in memory, behind the LocalSource interface. */
function gatePc({ users, devices, cards, enrollments, events }) {
    const data = { users, devices, cards, enrollments };
    const pc = {
        employees: new Map(),
        events: events.map(e => ({ cloudSyncedAt: null, ...e })),
        async users() { return data.users; },
        async devices() { return data.devices; },
        async cards() { return data.cards; },
        async enrollments() { return data.enrollments; },
        async pendingEvents({ since: s, limit }) {
            return pc.events.filter(e => e.cloudSyncedAt === null && e.timestamp >= s).slice(0, limit);
        },
        async markEventsSynced(ids, at) { for (const e of pc.events) if (ids.includes(e.id)) e.cloudSyncedAt = at; },
        async upsertEmployees(rows) { for (const r of rows) pc.employees.set(r.id, r); },
        async countEmployees() { return pc.employees.size; },
        async deleteEmployeesNotIn() {},
        async employeesWithoutUser() { return []; },
        async createUsers() {},
        async refreshUsersFromEmployees() { return 0; },
        async provisionedIds() { return []; },
        async recordProvisioned() {},
    };
    return pc;
}

const ev = (id, deviceId, userId, sup) => ({
    id, deviceId, supremaEventId: sup, eventCode: 4867, eventType: 'attendance', subType: null, userId,
    doorId: null, description: null, authResult: 'success', timestamp: new Date('2026-10-26T06:00:00Z'),
    syncedAt: new Date(), rawData: null,
});

function scenario() {
    // The cloud already knows employee 1001 (user 900), gate 546084682 (device 40) and card AA.
    const cloud = new MemoryCloudStore({
        employee: [{ id: 1001, fullname: 'Mona' }, { id: 1002, fullname: 'Omar' }],
        user: [{ id: 900, code: 'C1', name: 'Mona', full_name: 'Mona', employee_id: 1001 }],
        device: [{ id: 40, name: 'Gate 1', ip: '10.10.2.113', port: 51211, isActive: 1, direction: 'in', deviceType: null, serialNumber: '546084682' }],
        card_assignments: [{ id: 70, user_id: 900, card_data: 'AA', card_csn: '1', status: 'active', assignedAt: null, revokedAt: null, notes: null }],
        device_enrollments: [],
        events: [{ id: 500, deviceId: 40, supremaEventId: 1, userId: '900', timestamp: new Date('2026-10-20T06:00:00Z') }],
        tempaccess: [],
    }, { user: 31828, events: 60000 });

    // PC 1: Mona is local user 3 (same as ever); Omar is new (local user 4).
    const pc1 = gatePc({
        users: [{ id: 3, code: 'C1', name: 'Mona', full_name: 'Mona', employee_id: 1001 },
            { id: 4, code: 'C2', name: 'Omar', full_name: 'Omar', employee_id: 1002 }],
        devices: [{ id: 2, name: 'Gate 1', ip: '10.10.2.113', port: 51211, isActive: true, direction: 'in', deviceType: null, serialNumber: '546084682' }],
        cards: [{ id: 11, user_id: 3, card_data: 'AA', card_csn: '1', status: 'active', assignedAt: null, revokedAt: null, notes: null },
            { id: 12, user_id: 4, card_data: 'BB', card_csn: '2', status: 'active', assignedAt: null, revokedAt: null, notes: null }],
        enrollments: [{ id: 1, deviceId: 2, cardAssignmentId: 11, deviceUserId: '3', enrolledAt: null, status: 'active' },
            { id: 2, deviceId: 2, cardAssignmentId: 12, deviceUserId: '4', enrolledAt: null, status: 'active' }],
        events: [ev(1, 2, '3', 1001), ev(2, 2, '4', 1002)],
    });

    // PC 2 (other campus): same employees under DIFFERENT local ids, its own gate, same local ids 1..n.
    const pc2 = gatePc({
        users: [{ id: 1, code: 'C1', name: 'Mona', full_name: 'Mona', employee_id: 1001 },
            { id: 2, code: 'C2', name: 'Omar', full_name: 'Omar', employee_id: 1002 }],
        devices: [{ id: 2, name: 'Campus B gate', ip: '10.20.0.5', port: 51211, isActive: true, direction: 'in', deviceType: null, serialNumber: '777000111' }],
        cards: [{ id: 11, user_id: 2, card_data: 'BB', card_csn: '2', status: 'active', assignedAt: null, revokedAt: null, notes: null }],
        enrollments: [{ id: 1, deviceId: 2, cardAssignmentId: 11, deviceUserId: '2', enrolledAt: null, status: 'active' }],
        events: [ev(1, 2, '2', 1001)],
    });
    return { cloud, pc1, pc2 };
}

const service = (cloud, local) => new CloudSyncService({
    cloudStore: cloud, localSource: local, logger: silent, trigger: 'interval', eventsSince: since, today: () => '2026-10-26',
});

test('two gate PCs share one cloud: users per employee, own devices, every swipe once, nothing deleted', async () => {
    const { cloud, pc1, pc2 } = scenario();
    await service(cloud, pc1)._cycle();
    await service(cloud, pc2)._cycle();
    await service(cloud, pc1)._cycle();

    assert.equal(cloud.calls.some(c => /delete/i.test(c.op)), false, 'no delete was ever issued');
    assert.deepEqual(cloud.tables.user.map(u => u.employee_id).sort(), [1001, 1002], 'one cloud user per employee');
    const omar = cloud.tables.user.find(u => u.employee_id === 1002).id;
    assert.deepEqual(cloud.tables.device.map(d => d.serialNumber).sort(), ['546084682', '777000111']);
    const campusB = cloud.tables.device.find(d => d.serialNumber === '777000111').id;

    const pushed = cloud.tables.events.filter(e => e.id !== 500);
    assert.equal(pushed.length, 3, 'every new swipe exactly once');
    assert.deepEqual(
        pushed.map(e => [e.deviceId, e.userId]).sort(),
        [[40, '900'], [40, String(omar)], [campusB, String(omar)]].sort(),
        'PC2 local user 2 (Omar) lands on the shared cloud user for employee 1002',
    );
    assert.equal(cloud.tables.events[0].id, 500, 'history untouched');

    assert.equal(cloud.tables.card_assignments.length, 2, 'card BB stored once though both PCs hold it');
    assert.equal(cloud.tables.device_enrollments.length, 3);
    assert.ok(pc1.events.every(e => e.cloudSyncedAt) && pc2.events.every(e => e.cloudSyncedAt));
});

test('without CLOUD_SYNC_EVENTS_SINCE the rest syncs but events stay local', async () => {
    const { cloud, pc1 } = scenario();
    const svc = new CloudSyncService({ cloudStore: cloud, localSource: pc1, logger: silent, trigger: 'interval', eventsSince: null, today: () => '2026-10-26' });
    await svc._cycle();
    assert.equal(cloud.tables.events.length, 1);
    assert.equal(cloud.tables.user.length, 2);
});

test('a disabled trigger runs nothing on start', () => {
    const { cloud, pc1 } = scenario();
    const svc = new CloudSyncService({ cloudStore: cloud, localSource: pc1, logger: silent, trigger: 'disabled', eventsSince: since });
    assert.equal(svc.isEnabled(), false);
    svc.start();
    assert.equal(svc.getRuntimeStatus().running, false);
});
