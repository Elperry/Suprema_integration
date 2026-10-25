import test from 'node:test';
import assert from 'node:assert/strict';
import { CloudPasswordRotation, GateDbProbe, withPassword } from './GateDb.js';

const OLD_URL = 'mysql://suprema_hr:p%40ss%23old@db.example:3306/ice_hikv?connection_limit=5';
const NEW_PW = 'b'.repeat(48);

/** Fake Prisma-like clients: records SQL per URL; `fail` maps a URL or SQL fragment to an error. */
function fakeConnect({ fail = {}, rows = {} } = {}) {
    const log = [];
    const connect = url => ({
        async $executeRawUnsafe(sql) {
            log.push({ url, sql });
            if (fail[url] || fail[sql]) throw new Error('boom');
            return 0;
        },
        async $queryRawUnsafe(sql) {
            log.push({ url, sql });
            if (fail[url]) throw new Error('boom');
            const hit = Object.keys(rows).find(fragment => sql.includes(fragment));
            if (hit && rows[hit] instanceof Error) throw rows[hit];
            return hit ? rows[hit] : [{ ok: 1 }];
        },
        async $disconnect() {},
    });
    return { connect, log };
}

test('withPassword swaps only the password and keeps user, host, schema and parameters', () => {
    const next = new URL(withPassword(OLD_URL, NEW_PW));
    assert.equal(next.password, NEW_PW);
    assert.equal(next.username, 'suprema_hr');
    assert.equal(next.host, 'db.example:3306');
    assert.equal(next.pathname, '/ice_hikv');
    assert.equal(next.search, '?connection_limit=5');
});

test('rotation changes the password on the current connection, then proves the new one', async () => {
    const { connect, log } = fakeConnect();
    const result = await new CloudPasswordRotation({ connect, randomHex: () => NEW_PW }).rotate(OLD_URL);
    assert.equal(result.verified, true);
    assert.equal(new URL(result.url).password, NEW_PW);
    assert.equal(log[0].url, OLD_URL);
    assert.equal(log[0].sql, `ALTER USER USER() IDENTIFIED BY '${NEW_PW}'`);
    assert.equal(log[1].url, result.url);
});

test('a failed ALTER leaves the old password in place and throws', async () => {
    const { connect } = fakeConnect({ fail: { [`ALTER USER USER() IDENTIFIED BY '${NEW_PW}'`]: true } });
    await assert.rejects(new CloudPasswordRotation({ connect, randomHex: () => NEW_PW }).rotate(OLD_URL), /password was not changed/);
});

test('a failed check after the change still returns the new URL, marked unverified', async () => {
    const newUrl = withPassword(OLD_URL, NEW_PW);
    const { connect } = fakeConnect({ fail: { [newUrl]: true } });
    const result = await new CloudPasswordRotation({ connect, randomHex: () => NEW_PW }).rotate(OLD_URL);
    assert.equal(result.verified, false);
    assert.equal(result.url, newUrl);
});

test('rotation refuses a generated password that is not plain hex', async () => {
    const { connect, log } = fakeConnect();
    await assert.rejects(new CloudPasswordRotation({ connect, randomHex: () => "x'; DROP" }).rotate(OLD_URL), /hex/);
    assert.equal(log.length, 0);
});

test('the local probe reports counts as numbers and keeps going past a missing table', async () => {
    const { connect } = fakeConnect({
        rows: {
            'FROM events WHERE cloudSyncedAt IS NULL': new Error("Unknown column 'cloudSyncedAt'"),
            'COUNT(*) AS n FROM events': [{ n: 1234n, newest: new Date('2026-10-25T20:00:59Z') }],
            "`key` = 'sync'": [{ v: 'false' }],
        },
    });
    const report = await new GateDbProbe({ connect }).local('mysql://u:p@localhost:3306/suprema_integration');
    assert.equal(report.ok, true);
    assert.equal(report.events.n, 1234);
    assert.match(report.unsyncedEvents.error, /cloudSyncedAt/);
    assert.equal(report.eventReplicationEnabled, false);
    assert.doesNotThrow(() => JSON.stringify(report));
});

test('a probe whose connection fails reports ok=false without the password', async () => {
    const url = 'mysql://u:s3cretpw@db.example:3306/ice_hikv';
    const { connect } = fakeConnect({ fail: { [url]: true } });
    const report = await new GateDbProbe({ connect }).cloud(url);
    assert.equal(report.ok, false);
    assert.doesNotMatch(JSON.stringify(report), /s3cretpw/);
});
