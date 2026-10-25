import test from 'node:test';
import assert from 'node:assert/strict';
import { TempAccessPuller } from './TempAccessPuller.js';
import { MemoryCloudStore } from './testing/MemoryCloudStore.js';

const silent = { info() {}, warn() {}, error() {}, debug() {} };

function fakeLocal(rows = []) {
    const local = {
        rows: new Map(rows.map(r => [r.id, { ...r }])),
        async provisionedIds(ids) {
            return ids.filter(id => local.rows.get(id)?.done === true);
        },
        async recordProvisioned(row) {
            local.rows.set(row.id, { ...row, done: true });
        },
    };
    return local;
}

function fakeProvisioner(failFor = []) {
    const p = {
        calls: [],
        async provision(visitor) {
            p.calls.push(visitor);
            return !failFor.includes(visitor.qrcode);
        },
    };
    return p;
}

const today = '2026-11-02';
const cloudRows = () => ({ tempaccess: [
    { id: 10, person_name: 'Old', date: '2026-11-01 10:00', qrcode: 400110, email: 'o@x', done: 0 },
    { id: 11, person_name: 'Guest A', date: '2026-11-02 10:00', qrcode: 400111, email: 'a@x', done: 0 },
    { id: 12, person_name: 'Guest B', date: '2026-11-03', qrcode: 400112, email: 'b@x', done: 1 },
] });

test('visits from today on are provisioned once, recorded locally under the cloud id, and acked', async () => {
    const cloud = new MemoryCloudStore(cloudRows());
    const local = fakeLocal();
    const provisioner = fakeProvisioner();
    const stats = await new TempAccessPuller({ cloud, local, provisioner, logger: silent, today: () => today }).run();
    assert.deepEqual(provisioner.calls.map(v => v.qrcode), ['400111', '400112'],
        'another PC having set done=1 does not stop this PC provisioning its own devices');
    assert.deepEqual(provisioner.calls[0], { cloudId: 11, qrcode: '400111', name: 'Guest A', visitDay: '2026-11-02' });
    assert.equal(stats.provisioned, 2);
    assert.equal(local.rows.get(11).done, true);
    assert.equal(cloud.tables.tempaccess.find(r => r.id === 11).done, 1);
    assert.equal(cloud.ops('insertMany').length, 0, 'nothing is ever written into cloud tempaccess but done');
});

test('a visitor already provisioned on this PC is not provisioned again', async () => {
    const cloud = new MemoryCloudStore(cloudRows());
    const local = fakeLocal([{ id: 11, done: true }, { id: 12, done: true }]);
    const provisioner = fakeProvisioner();
    await new TempAccessPuller({ cloud, local, provisioner, logger: silent, today: () => today }).run();
    assert.equal(provisioner.calls.length, 0);
});

test('a failed provisioning is neither recorded nor acked, so the next run retries it', async () => {
    const cloud = new MemoryCloudStore(cloudRows());
    const local = fakeLocal();
    const provisioner = fakeProvisioner(['400111']);
    const stats = await new TempAccessPuller({ cloud, local, provisioner, logger: silent, today: () => today }).run();
    assert.equal(stats.failed, 1);
    assert.equal(local.rows.has(11), false);
    assert.equal(cloud.tables.tempaccess.find(r => r.id === 11).done, 0);
});

test('without a provisioner nothing is pulled or acked', async () => {
    const cloud = new MemoryCloudStore(cloudRows());
    const stats = await new TempAccessPuller({ cloud, local: fakeLocal(), provisioner: null, logger: silent, today: () => today }).run();
    assert.equal(stats.provisioned, 0);
    assert.equal(cloud.calls.length, 0);
});

test('a visit whose QR code is not written yet is skipped and left pending, never provisioned as "0"', async () => {
    const cloud = new MemoryCloudStore({ tempaccess: [
        { id: 11, person_name: 'A', date: '2026-10-26 10:00:00', qrcode: null, email: 'a@x', done: 0 },
        { id: 12, person_name: 'B', date: '2026-10-26 10:00:00', qrcode: 0, email: 'b@x', done: 0 },
        { id: 13, person_name: 'C', date: '2026-10-26 10:00:00', qrcode: '', email: 'c@x', done: 0 },
    ] });
    const provisioner = fakeProvisioner();
    const local = fakeLocal();
    const stats = await new TempAccessPuller({ cloud, local, provisioner, logger: silent, today: () => '2026-10-26' }).run();
    assert.deepEqual(provisioner.calls, []);
    assert.equal(cloud.ops('updateById').length, 0, 'not acked: the next run picks it up once the code exists');
    assert.equal(local.rows.size, 0);
    assert.equal(stats.skipped, 3);
});
