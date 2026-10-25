import test from 'node:test';
import assert from 'node:assert/strict';
import { CloudStore } from './CloudStore.js';

function fakePrisma(answer = []) {
    const p = {
        queries: [],
        executes: [],
        async $queryRawUnsafe(sql, ...params) { p.queries.push({ sql, params }); return answer; },
        async $executeRawUnsafe(sql, ...params) { p.executes.push({ sql, params }); return 1; },
    };
    return p;
}

test('reads name columns in backticks and bind every value', async () => {
    const prisma = fakePrisma();
    const store = new CloudStore(prisma);
    await store.findIn('card_assignments', 'card_data', ['AA', 'BB'], ['id', 'card_data']);
    assert.equal(prisma.queries[0].sql,
        'SELECT `id`, `card_data` FROM `card_assignments` WHERE `card_data` IN (?, ?)');
    assert.deepEqual(prisma.queries[0].params, ['AA', 'BB']);
});

test('scoped lookup uses the composite key order (deviceId first)', async () => {
    const prisma = fakePrisma();
    await new CloudStore(prisma).findInScoped('events', 'deviceId', 40, 'supremaEventId', ['1', '2'], ['id']);
    assert.equal(prisma.queries[0].sql, 'SELECT `id` FROM `events` WHERE `deviceId` = ? AND `supremaEventId` IN (?, ?)');
    assert.deepEqual(prisma.queries[0].params, [40, '1', '2']);
});

test('an empty IN list costs no query', async () => {
    const prisma = fakePrisma();
    assert.deepEqual(await new CloudStore(prisma).findIn('user', 'employee_id', [], ['id']), []);
    assert.equal(prisma.queries.length, 0);
});

test('insertMany writes one multi-row INSERT with no id and no ON DUPLICATE KEY', async () => {
    const prisma = fakePrisma();
    const at = new Date('2026-10-26T06:00:00Z');
    await new CloudStore(prisma).insertMany('events', [
        { deviceId: 40, supremaEventId: '1', rawData: { a: 1 }, timestamp: at },
        { deviceId: 40, supremaEventId: '2', rawData: null, timestamp: at },
    ]);
    const { sql, params } = prisma.executes[0];
    assert.equal(sql, 'INSERT INTO `events` (`deviceId`, `supremaEventId`, `rawData`, `timestamp`) VALUES (?, ?, ?, ?), (?, ?, ?, ?)');
    assert.deepEqual(params, [40, '1', '{"a":1}', at, 40, '2', null, at]);
});

test('updateById changes only the given columns of one row', async () => {
    const prisma = fakePrisma();
    await new CloudStore(prisma).updateById('card_assignments', 70, { status: 'revoked', notes: 'lost' });
    assert.equal(prisma.executes[0].sql, 'UPDATE `card_assignments` SET `status` = ?, `notes` = ? WHERE `id` = ?');
    assert.deepEqual(prisma.executes[0].params, ['revoked', 'lost', 70]);
});

test('identifiers that are not plain names are refused', async () => {
    const store = new CloudStore(fakePrisma());
    await assert.rejects(() => store.findAll('user`; DROP TABLE x; --', ['id']), /identifier/);
    await assert.rejects(() => store.updateById('user', 1, { 'name`=1': 'x' }), /identifier/);
});

test('the store has no way to delete', () => {
    const store = new CloudStore(fakePrisma());
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(store));
    assert.equal(methods.some(m => /delete|remove|truncate|drop/i.test(m)), false);
});

test('bigint values from MySQL come back as strings or numbers, never bigint', async () => {
    const prisma = fakePrisma([{ id: 5n, supremaEventId: 9007199254740993n }]);
    const [row] = await new CloudStore(prisma).findAll('events', ['id', 'supremaEventId']);
    assert.equal(row.id, 5);
    assert.equal(row.supremaEventId, '9007199254740993');
});
