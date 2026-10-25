import test from 'node:test';
import assert from 'node:assert/strict';
import { KeyedPusher } from './KeyedPusher.js';
import { MemoryCloudStore } from './testing/MemoryCloudStore.js';

const silent = { info() {}, warn() {}, error() {}, debug() {} };

// A minimal spec: rows keyed by `code`, `label` updatable, `owner` immutable.
const spec = {
    table: 'things',
    columns: ['id', 'code', 'label', 'owner'],
    keysOf: row => (row.code ? [`code:${row.code}`] : []),
    toCloud: row => ({ code: row.code, label: row.label, owner: row.owner }),
    updatable: ['label'],
    immutable: ['owner'],
    lookup: { column: 'code' },
};

const duplicateKey = () => Object.assign(new Error("Duplicate entry 'A' for key 'code'"), { code: 'P2010', meta: { code: '1062' } });

test('inserts rows the cloud lacks, without sending the local id', async () => {
    const cloud = new MemoryCloudStore({ things: [] }, { things: 500 });
    const pusher = new KeyedPusher(spec, cloud, silent);
    const stats = await pusher.push([{ id: 7, code: 'A', label: 'one', owner: 1 }]);
    assert.equal(stats.inserted, 1);
    const [insert] = cloud.ops('insertMany');
    assert.equal('id' in insert.rows[0], false);
    assert.equal(cloud.tables.things[0].id, 500, 'cloud assigned its own id');
    assert.equal(pusher.cloudIdFor({ code: 'A' }), 500);
});

test('updates only the updatable columns of a matched row', async () => {
    const cloud = new MemoryCloudStore({ things: [{ id: 3, code: 'A', label: 'old', owner: 1 }] });
    const pusher = new KeyedPusher(spec, cloud, silent);
    const stats = await pusher.push([{ id: 99, code: 'A', label: 'new', owner: 1 }]);
    assert.equal(stats.updated, 1);
    assert.deepEqual(cloud.ops('updateById')[0].changes, { label: 'new' });
    assert.equal(pusher.cloudIdFor({ code: 'A' }), 3);
});

test('an unchanged row costs no write', async () => {
    const cloud = new MemoryCloudStore({ things: [{ id: 3, code: 'A', label: 'same', owner: 1 }] });
    const pusher = new KeyedPusher(spec, cloud, silent);
    const stats = await pusher.push([{ id: 3, code: 'A', label: 'same', owner: 1 }]);
    assert.equal(stats.unchanged, 1);
    assert.equal(cloud.ops('updateById').length + cloud.ops('insertMany').length, 0);
});

test('a row whose immutable column differs in the cloud is a conflict, never rewritten', async () => {
    const cloud = new MemoryCloudStore({ things: [{ id: 3, code: 'A', label: 'x', owner: 1 }] });
    const pusher = new KeyedPusher(spec, cloud, silent);
    const stats = await pusher.push([{ id: 3, code: 'A', label: 'y', owner: 2 }]);
    assert.equal(stats.conflicts.length, 1);
    assert.equal(cloud.ops('updateById').length, 0);
    assert.equal(cloud.tables.things[0].owner, 1);
});

test('cloud rows missing locally are never deleted', async () => {
    const cloud = new MemoryCloudStore({ things: [
        { id: 1, code: 'GONE', label: 'x', owner: 1 },
        { id: 2, code: 'A', label: 'x', owner: 1 },
    ] });
    const pusher = new KeyedPusher(spec, cloud, silent);
    await pusher.push([{ id: 2, code: 'A', label: 'x', owner: 1 }]);
    assert.equal(cloud.tables.things.length, 2);
    assert.equal(cloud.calls.some(call => /delete/i.test(call.op)), false);
});

test('a row toCloud() cannot translate is skipped and reported', async () => {
    const cloud = new MemoryCloudStore({ things: [] });
    const untranslatable = { ...spec, toCloud: () => null };
    const pusher = new KeyedPusher(untranslatable, cloud, silent);
    const stats = await pusher.push([{ id: 1, code: 'A', label: 'x', owner: 1 }]);
    assert.equal(stats.skipped, 1);
    assert.equal(cloud.ops('insertMany').length, 0);
});

test('the cloud is read once; later cycles work from the remembered state', async () => {
    const cloud = new MemoryCloudStore({ things: [{ id: 3, code: 'A', label: 'x', owner: 1 }] });
    const pusher = new KeyedPusher(spec, cloud, silent);
    await pusher.push([{ id: 3, code: 'A', label: 'x', owner: 1 }]);
    await pusher.push([{ id: 3, code: 'A', label: 'x', owner: 1 }, { id: 4, code: 'B', label: 'y', owner: 1 }]);
    assert.equal(cloud.ops('findAll').length, 1);
    assert.equal(pusher.cloudIdFor({ code: 'B' }), 4);
});

test('reset() forces a fresh cloud read on the next push', async () => {
    const cloud = new MemoryCloudStore({ things: [] });
    const pusher = new KeyedPusher(spec, cloud, silent);
    await pusher.push([]);
    pusher.reset();
    await pusher.push([]);
    assert.equal(cloud.ops('findAll').length, 2);
});

test('a row another PC inserted after our first read is found by its key, not inserted twice', async () => {
    const cloud = new MemoryCloudStore({ things: [] }, { things: 100 });
    const pusher = new KeyedPusher(spec, cloud, silent);
    await pusher.push([]);                                            // cache loaded: empty
    await cloud.insertMany('things', [{ code: 'A', label: 'x', owner: 1 }]);   // the other PC, id 100
    const stats = await pusher.push([{ id: 7, code: 'A', label: 'x', owner: 1 }]);
    assert.equal(cloud.tables.things.length, 1, 'no second row for A');
    assert.equal(stats.inserted, 0);
    assert.equal(pusher.cloudIdFor({ code: 'A' }), 100);
});

test('a duplicate-key refusal is absorbed: the row is learned and the rest of the batch still goes in', async () => {
    const cloud = new MemoryCloudStore({ things: [{ id: 100, code: 'A', label: 'x', owner: 1 }] });
    const pusher = new KeyedPusher(spec, cloud, silent);
    pusher.byKey = new Map();            // a stale cache that has never seen A
    const realFindIn = cloud.findIn.bind(cloud);
    let lookups = 0;
    cloud.findIn = async (...args) => (lookups++ === 0 ? [] : realFindIn(...args));   // A lands between lookup and insert
    const realInsert = cloud.insertMany.bind(cloud);
    cloud.insertMany = async (table, rows) => {
        if (rows.some(row => cloud.tables.things.some(t => t.code === row.code))) throw duplicateKey();
        return realInsert(table, rows);
    };
    const stats = await pusher.push([{ id: 7, code: 'A', label: 'x', owner: 1 }, { id: 8, code: 'B', label: 'y', owner: 1 }]);
    assert.deepEqual(cloud.tables.things.map(t => t.code).sort(), ['A', 'B']);
    assert.equal(stats.inserted, 1);
    assert.equal(pusher.cloudIdFor({ code: 'A' }), 100);
    assert.ok(pusher.cloudIdFor({ code: 'B' }));
});

test('any other insert error still fails the push', async () => {
    const cloud = new MemoryCloudStore({ things: [] });
    cloud.insertMany = async () => { throw new Error('INSERT command denied'); };
    await assert.rejects(new KeyedPusher(spec, cloud, silent).push([{ id: 1, code: 'A', label: 'x', owner: 1 }]), /denied/);
});

test('when one key has several cloud rows the lowest id wins, so every PC picks the same one', async () => {
    const cloud = new MemoryCloudStore({ things: [
        { id: 4, code: 'A', label: 'x', owner: 1 },
        { id: 9, code: 'A', label: 'x', owner: 1 },
    ] });
    const pusher = new KeyedPusher(spec, cloud, silent);
    await pusher.push([]);
    assert.equal(pusher.cloudIdFor({ code: 'A' }), 4);
    assert.equal(pusher.cloudRowById(9).code, 'A', 'every cloud row stays reachable by id');
});

test('an immutable column can be compared by the spec (e.g. two rows of one person)', async () => {
    const cloud = new MemoryCloudStore({ things: [{ id: 3, code: 'A', label: 'x', owner: 1 }] });
    const lenient = { ...spec, equal: { owner: (cloudValue, wanted) => [1, 2].includes(cloudValue) && [1, 2].includes(wanted) } };
    const stats = await new KeyedPusher(lenient, cloud, silent).push([{ id: 3, code: 'A', label: 'y', owner: 2 }]);
    assert.equal(stats.conflicts.length, 0);
    assert.deepEqual(cloud.ops('updateById')[0].changes, { label: 'y' });
});
