import test from 'node:test';
import assert from 'node:assert/strict';
import { LocalSource } from './LocalSource.js';

/** A Prisma-shaped fake: every model method records its argument. */
function fakePrisma(answers = {}) {
    const calls = [];
    const model = name => new Proxy({}, {
        get: (_, method) => async arg => {
            calls.push({ model: name, method, arg });
            return answers[`${name}.${method}`] ?? (method === 'count' ? 0 : []);
        },
    });
    const prisma = {
        calls,
        event: model('event'), user: model('user'), device: model('device'),
        cardAssignment: model('cardAssignment'), deviceEnrollment: model('deviceEnrollment'),
        employee: model('employee'), tempAccess: model('tempAccess'),
        async $transaction(ops) { return Promise.all(ops); },
        async $executeRawUnsafe(sql, ...params) { calls.push({ raw: sql, params }); return 3; },
    };
    return prisma;
}

test('pending events: unsynced, not before `since`, after the cursor, oldest first, limited', async () => {
    const prisma = fakePrisma();
    const since = new Date('2026-10-26T00:00:00Z');
    await new LocalSource(prisma).pendingEvents({ since, limit: 500, afterId: 42 });
    assert.deepEqual(prisma.calls[0], {
        model: 'event', method: 'findMany',
        arg: { where: { cloudSyncedAt: null, timestamp: { gte: since }, id: { gt: 42 } }, orderBy: { id: 'asc' }, take: 500 },
    });
});

test('existing user ids: a fresh read of the local user table, answered as strings', async () => {
    const prisma = fakePrisma({ 'user.findMany': [{ id: 6 }] });
    const found = await new LocalSource(prisma).existingUserIds(['6', '7']);
    assert.deepEqual(prisma.calls[0].arg, { where: { id: { in: [6, 7] } }, select: { id: true } });
    assert.deepEqual(found, ['6']);
});

test('synced events are stamped by id', async () => {
    const prisma = fakePrisma();
    const at = new Date();
    await new LocalSource(prisma).markEventsSynced([1, 2], at);
    assert.deepEqual(prisma.calls[0].arg, { where: { id: { in: [1, 2] } }, data: { cloudSyncedAt: at } });
});

test('enrollment snapshot leaves out lastSyncAt', async () => {
    const prisma = fakePrisma();
    await new LocalSource(prisma).enrollments();
    assert.equal('lastSyncAt' in prisma.calls[0].arg.select, false);
});

test('a provisioned visitor is cached under the cloud id', async () => {
    const prisma = fakePrisma();
    await new LocalSource(prisma).recordProvisioned({ id: 11, person_name: 'A', date: '2026-11-02', qrcode: 400111, email: 'a@x' });
    const { method, arg } = prisma.calls[0];
    assert.equal(method, 'upsert');
    assert.deepEqual(arg.where, { id: 11 });
    assert.equal(arg.create.id, 11);
    assert.equal(arg.create.done, true);
    assert.deepEqual(arg.update, { done: true });
});

test('employees without a user: only those whose id no user references', async () => {
    const prisma = fakePrisma({
        'employee.findMany': [{ id: 1 }, { id: 2 }],
        'user.findMany': [{ employee_id: 1 }],
    });
    const missing = await new LocalSource(prisma).employeesWithoutUser();
    assert.deepEqual(missing.map(e => e.id), [2]);
});

test('user code and names follow the employee cache; ids are never touched', async () => {
    const prisma = fakePrisma();
    const changed = await new LocalSource(prisma).refreshUsersFromEmployees();
    assert.equal(changed, 3);
    const { raw } = prisma.calls[0];
    assert.match(raw, /UPDATE `user` u JOIN `employee` e ON e\.id = u\.employee_id/);
    assert.doesNotMatch(raw, /u\.id\s*=|employee_id\s*=\s*[^u]/, 'never sets id or employee_id');
});

test('events since (backlog check): every event from `since`, synced or not, after the cursor', async () => {
    const prisma = fakePrisma();
    const since = new Date('2026-10-12T00:00:00Z');
    await new LocalSource(prisma).eventsSince({ since, afterId: 7, limit: 1000 });
    assert.deepEqual(prisma.calls[0].arg, {
        where: { timestamp: { gte: since }, id: { gt: 7 } },
        orderBy: { id: 'asc' }, take: 1000,
        select: { id: true, deviceId: true, supremaEventId: true, timestamp: true },
    });
});
