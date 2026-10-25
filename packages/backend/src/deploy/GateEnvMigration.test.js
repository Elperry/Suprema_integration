import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { GateEnvMigration } from './GateEnvMigration.js';

const OLD_BACKEND = '/home/gate/Desktop/suprema/packages/backend';
const OLD_ROOT = '/home/gate/Desktop/suprema';
const TOKEN = 'a'.repeat(64);
const CLOUD = 'mysql://suprema_hr:n3w@db.example:3306/ice_hikv';

function migration(values, existing = []) {
    const present = new Set(existing.map(p => path.resolve(p)));
    return new GateEnvMigration({
        values,
        searchDirs: [OLD_BACKEND, OLD_ROOT],
        exists: p => present.has(path.resolve(p)),
    });
}

const OLD = {
    DATABASE_URL: 'mysql://debian-sys-maint:l0cal@localhost:3306/suprema_integration',
    CLOUD_DATABASE_URL: 'mysql://suprema_hr:old@db.example:3306/ice_hikv',
    NODE_ENV: 'development', HOST: '', PORT: '3000', CORS_ORIGIN: '*', JWT_SECRET: 'x',
    GATEWAY_IP: '127.0.0.1', GATEWAY_SSL: 'true', GATEWAY_CA_FILE: '../../cert/ca.crt',
    CLOUD_SYNC_TRIGGER: 'both', LOG_LEVEL: 'debug', SEED_INITIAL_DEVICES: 'true',
};

function build(values = OLD, existing = [`${OLD_ROOT}/cert/ca.crt`]) {
    return migration(values, existing).build({ apiToken: TOKEN, eventsSince: '2026-10-25T22:30:00.000Z', cloudDatabaseUrl: CLOUD });
}

test('keeps the site settings the old backend ran with', () => {
    const { values } = build();
    assert.equal(values.DATABASE_URL, OLD.DATABASE_URL);
    assert.equal(values.GATEWAY_IP, '127.0.0.1');
    assert.equal(values.GATEWAY_SSL, 'true');
    assert.equal(values.CLOUD_SYNC_TRIGGER, 'both');
    assert.equal(values.PORT, '3000');
});

test('sets the cut-over values: token, events start, new cloud URL, local-only production', () => {
    const { values } = build();
    assert.equal(values.API_TOKEN, TOKEN);
    assert.equal(values.CLOUD_SYNC_EVENTS_SINCE, '2026-10-25T22:30:00.000Z');
    assert.equal(values.CLOUD_DATABASE_URL, CLOUD);
    assert.equal(values.NODE_ENV, 'production');
    assert.equal(values.HOST, '127.0.0.1');
    assert.equal(values.AUTO_SCHEMA_SYNC, 'false');
    assert.equal(values.SEED_INITIAL_DEVICES, 'false');
    assert.equal(values.LOG_LEVEL, 'info');
    assert.equal(values.VISITOR_QR_PROVISIONING, 'false');
    assert.equal(values.DEVICE_TIMEZONE, 'Africa/Cairo');
});

test('drops the keys the new backend must not inherit', () => {
    const { values } = build();
    assert.equal('CORS_ORIGIN' in values, false);
    assert.equal('JWT_SECRET' in values, false);
});

test('a relative gateway CA path becomes the absolute file the old install used', () => {
    const { values, warnings } = build();
    assert.equal(values.GATEWAY_CA_FILE, path.resolve(OLD_ROOT, 'cert/ca.crt'));
    assert.deepEqual(warnings, []);
});

test('a relative CA path that resolves nowhere is kept and reported', () => {
    const { values, warnings } = build(OLD, []);
    assert.equal(values.GATEWAY_CA_FILE, '../../cert/ca.crt');
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /GATEWAY_CA_FILE/);
});

test('an explicit DEVICE_TIMEZONE on the site is kept', () => {
    const { values } = build({ ...OLD, DEVICE_TIMEZONE: 'fixed', DEVICE_TIMEZONE_OFFSET: '10800' });
    assert.equal(values.DEVICE_TIMEZONE, 'fixed');
    assert.equal(values.DEVICE_TIMEZONE_OFFSET, '10800');
});

test('refuses a bad token, a bad start time or a missing local database', () => {
    const m = migration(OLD, []);
    assert.throws(() => m.build({ apiToken: 'short', eventsSince: '2026-10-25T22:30:00Z', cloudDatabaseUrl: CLOUD }), /API_TOKEN/);
    assert.throws(() => m.build({ apiToken: TOKEN, eventsSince: 'yesterday', cloudDatabaseUrl: CLOUD }), /CLOUD_SYNC_EVENTS_SINCE/);
    assert.throws(() => m.build({ apiToken: TOKEN, eventsSince: '2026-10-25T22:30:00Z', cloudDatabaseUrl: '' }), /CLOUD_DATABASE_URL/);
    const noLocal = migration({ ...OLD, DATABASE_URL: '' }, []);
    assert.throws(() => noLocal.build({ apiToken: TOKEN, eventsSince: '2026-10-25T22:30:00Z', cloudDatabaseUrl: CLOUD }), /DATABASE_URL/);
});

test('renders single-quoted lines that systemd and sh both read literally', () => {
    const text = GateEnvMigration.render({ A: 'p@ss$word#1', B: '' });
    assert.match(text, /^A='p@ss\$word#1'$/m);
    assert.match(text, /^B=''$/m);
});

test('refuses a value it cannot quote, naming the key but never the value', () => {
    assert.throws(() => GateEnvMigration.render({ SECRET_KEY: "it's-secret" }), err => {
        assert.match(err.message, /SECRET_KEY/);
        assert.doesNotMatch(err.message, /it's-secret/);
        return true;
    });
    assert.throws(() => GateEnvMigration.render({ K: 'a\nb' }), /K/);
});

test('refuses a key name that is not a plain identifier', () => {
    assert.throws(() => GateEnvMigration.render({ 'BAD KEY': 'x' }), /BAD KEY/);
});
