import test from 'node:test';
import assert from 'node:assert/strict';
import { KeyedPusher } from './KeyedPusher.js';
import { MemoryCloudStore } from './testing/MemoryCloudStore.js';
import { userSpec, deviceSpec, cardSpec, enrollmentSpec } from './CloudPushSpecs.js';

const silent = { info() {}, warn() {}, error() {}, debug() {} };
const plainSame = (a, b) => String(a) === String(b);

test('user: matched by employee_id, so two PCs share one cloud row per employee', async () => {
    const cloud = new MemoryCloudStore({ user: [{ id: 900, code: 'E1', name: 'A', full_name: 'A A', employee_id: 1001 }] });
    const pusher = new KeyedPusher(userSpec(), cloud, silent);
    // This PC knows employee 1001 under local id 3 and has a new employee 1002.
    const stats = await pusher.push([
        { id: 3, code: 'E1', name: 'A', full_name: 'A A', employee_id: 1001 },
        { id: 4, code: 'E2', name: 'B', full_name: 'B B', employee_id: 1002 },
    ]);
    assert.equal(stats.unchanged, 1);
    assert.equal(stats.inserted, 1);
    assert.equal(pusher.cloudIdFor({ employee_id: 1001 }), 900);
    assert.equal(cloud.tables.user.length, 2);
});

test('user: name/code changes update, employee_id is never rewritten', async () => {
    const cloud = new MemoryCloudStore({ user: [{ id: 900, code: 'E1', name: 'A', full_name: 'A A', employee_id: 1001 }] });
    const pusher = new KeyedPusher(userSpec(), cloud, silent);
    await pusher.push([{ id: 3, code: 'E9', name: 'A', full_name: 'A Renamed', employee_id: 1001 }]);
    const [update] = cloud.ops('updateById');
    assert.deepEqual(update.changes, { code: 'E9', full_name: 'A Renamed' });
});

test('device: keyed by Suprema serial; password and local cursors never leave the PC', async () => {
    const cloud = new MemoryCloudStore({ device: [] }, { device: 40 });
    const pusher = new KeyedPusher(deviceSpec(), cloud, silent);
    await pusher.push([{
        id: 2, name: 'Gate 2.1 out', ip: '10.10.2.113', port: 51211, isActive: true, direction: 'out',
        deviceType: null, serialNumber: '546084682', password: 'secret', username: 'admin',
        last_replicated_event_id: 77, locationId: 5, status: 'connected',
    }]);
    const [insert] = cloud.ops('insertMany');
    const row = insert.rows[0];
    for (const forbidden of ['password', 'username', 'last_replicated_event_id', 'locationId', 'status', 'id']) {
        assert.equal(forbidden in row, false, `${forbidden} must not be sent`);
    }
    assert.equal(pusher.cloudIdFor({ serialNumber: '546084682' }), 40);
});

test('device: no serial number means no insert (it could never be matched again)', async () => {
    const cloud = new MemoryCloudStore({ device: [] });
    const pusher = new KeyedPusher(deviceSpec(), cloud, silent);
    const stats = await pusher.push([{ id: 2, name: 'x', ip: '10.0.0.1', serialNumber: null }]);
    assert.equal(stats.skipped, 1);
    assert.equal(cloud.ops('insertMany').length, 0);
});

test('card: user translated to the cloud user; a card held by another person is a conflict', async () => {
    const cloud = new MemoryCloudStore({ card_assignments: [
        { id: 70, user_id: 900, card_data: 'AA', card_csn: '1', status: 'active', assignedAt: null, revokedAt: null, notes: null },
    ] });
    const ctx = { cloudUserId: localId => ({ 3: 900, 4: 901 })[localId] ?? null, sameCloudUser: plainSame };
    const pusher = new KeyedPusher(cardSpec(ctx), cloud, silent);
    const stats = await pusher.push([
        { id: 11, user_id: 4, card_data: 'AA', card_csn: '1', status: 'active', assignedAt: null, revokedAt: null, notes: null },
        { id: 12, user_id: 3, card_data: 'BB', card_csn: '2', status: 'active', assignedAt: null, revokedAt: null, notes: null },
        { id: 13, user_id: 99, card_data: 'CC', card_csn: '3', status: 'active', assignedAt: null, revokedAt: null, notes: null },
    ]);
    assert.equal(stats.conflicts.length, 1, 'AA belongs to cloud user 900, local says 901');
    assert.equal(cloud.tables.card_assignments[0].user_id, 900);
    assert.equal(stats.inserted, 1);
    assert.equal(cloud.tables.card_assignments[1].user_id, 900, 'BB inserted for the translated user');
    assert.equal(stats.skipped, 1, 'CC has no cloud user yet');
});

test('card: a revocation updates status columns only', async () => {
    const cloud = new MemoryCloudStore({ card_assignments: [
        { id: 70, user_id: 900, card_data: 'AA', card_csn: '1', status: 'active', assignedAt: null, revokedAt: null, notes: null },
    ] });
    const revokedAt = new Date('2026-10-26T08:00:00Z');
    const pusher = new KeyedPusher(cardSpec({ cloudUserId: () => 900, sameCloudUser: plainSame }), cloud, silent);
    await pusher.push([{ id: 11, user_id: 3, card_data: 'AA', card_csn: '9', status: 'revoked', assignedAt: null, revokedAt, notes: 'lost' }]);
    assert.deepEqual(cloud.ops('updateById')[0].changes, { status: 'revoked', revokedAt, notes: 'lost' });
});

test('enrollment: device and card translated; only status may change', async () => {
    const cloud = new MemoryCloudStore({ device_enrollments: [
        { id: 5, deviceId: 40, cardAssignmentId: 70, deviceUserId: '3', enrolledAt: null, status: 'active' },
    ] });
    const ctx = {
        cloudDeviceId: localId => ({ 2: 40 })[localId] ?? null,
        cloudCardId: localId => ({ 11: 70, 12: 71 })[localId] ?? null,
    };
    const pusher = new KeyedPusher(enrollmentSpec(ctx), cloud, silent);
    const stats = await pusher.push([
        { id: 1, deviceId: 2, cardAssignmentId: 11, deviceUserId: '3', enrolledAt: null, status: 'removed', lastSyncAt: new Date() },
        { id: 2, deviceId: 2, cardAssignmentId: 12, deviceUserId: '3', enrolledAt: null, status: 'active', lastSyncAt: new Date() },
        { id: 3, deviceId: 9, cardAssignmentId: 12, deviceUserId: '3', enrolledAt: null, status: 'active' },
    ]);
    assert.deepEqual(cloud.ops('updateById')[0].changes, { status: 'removed' });
    assert.equal(stats.inserted, 1);
    assert.equal('lastSyncAt' in cloud.ops('insertMany')[0].rows[0], false);
    assert.equal(stats.skipped, 1, 'device 9 has no cloud device');
});

test('card: a card held by another cloud row of the same employee is not a conflict', async () => {
    const cloud = new MemoryCloudStore({ card_assignments: [
        { id: 70, user_id: 905, card_data: 'AA', card_csn: '1', status: 'active', assignedAt: null, revokedAt: null, notes: null },
    ] });
    // Cloud users 901 and 905 are both employee 1002 (an old duplicate).
    const ctx = { cloudUserId: () => 901, sameCloudUser: (a, b) => [901, 905].includes(Number(a)) && [901, 905].includes(Number(b)) };
    const stats = await new KeyedPusher(cardSpec(ctx), cloud, silent).push([
        { id: 11, user_id: 4, card_data: 'AA', card_csn: '1', status: 'revoked', assignedAt: null, revokedAt: null, notes: null },
    ]);
    assert.equal(stats.conflicts.length, 0);
    assert.deepEqual(cloud.ops('updateById')[0].changes, { status: 'revoked' });
    assert.equal(cloud.tables.card_assignments[0].user_id, 905, 'owner never rewritten');
});

test('every table is looked up by its natural key before an insert (another PC may have added it)', async () => {
    const cases = [
        [userSpec(), 'user',
            { employee_id: 1001, code: 'E1', name: 'A', full_name: 'A' },
            { id: 3, code: 'E1', name: 'A', full_name: 'A', employee_id: 1001 }],
        [deviceSpec(), 'device',
            { name: 'G', ip: '1', port: 1, isActive: 1, direction: 'in', deviceType: null, serialNumber: 'S1' },
            { id: 2, name: 'G', ip: '1', port: 1, isActive: true, direction: 'in', deviceType: null, serialNumber: 'S1' }],
        [cardSpec({ cloudUserId: () => 900, sameCloudUser: plainSame }), 'card_assignments',
            { user_id: 900, card_data: 'AA', card_csn: '1', status: 'active', assignedAt: null, revokedAt: null, notes: null },
            { id: 11, user_id: 3, card_data: 'AA', card_csn: '1', status: 'active', assignedAt: null, revokedAt: null, notes: null }],
        [enrollmentSpec({ cloudDeviceId: () => 40, cloudCardId: () => 70 }), 'device_enrollments',
            { deviceId: 40, cardAssignmentId: 70, deviceUserId: '3', enrolledAt: null, status: 'active' },
            { id: 1, deviceId: 2, cardAssignmentId: 11, deviceUserId: '3', enrolledAt: null, status: 'active' }],
    ];
    for (const [spec, table, otherPcRow, localRow] of cases) {
        const cloud = new MemoryCloudStore({ [table]: [] }, { [table]: 500 });
        const pusher = new KeyedPusher(spec, cloud, silent);
        await pusher.push([]);
        await cloud.insertMany(table, [otherPcRow]);
        await pusher.push([localRow]);
        assert.equal(cloud.tables[table].length, 1, `${table}: no second row`);
        assert.equal(pusher.cloudIdFor(spec.toCloud(localRow)), 500, `${table}: the other PC's row is used`);
    }
});
