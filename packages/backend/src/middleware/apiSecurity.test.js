import test from 'node:test';
import assert from 'node:assert/strict';
import { createApiAuth, withoutSecrets, parseOrigins } from './apiSecurity.js';

const silent = { info() {}, warn() {}, error() {}, debug() {} };

function run(middleware, headers = {}) {
    const res = {
        statusCode: 200, body: null,
        status(code) { this.statusCode = code; return this; },
        json(body) { this.body = body; return this; },
    };
    let nextCalled = false;
    middleware({ headers, method: 'GET', originalUrl: '/api/devices', ip: '127.0.0.1' }, res, () => { nextCalled = true; });
    return { res, nextCalled };
}

test('a request with the right bearer token passes', () => {
    const { nextCalled } = run(createApiAuth({ token: 's3cret-token', logger: silent }), { authorization: 'Bearer s3cret-token' });
    assert.equal(nextCalled, true);
});

test('a missing or wrong token is refused with 401', () => {
    const auth = createApiAuth({ token: 's3cret-token', logger: silent });
    for (const headers of [{}, { authorization: 'Bearer nope' }, { authorization: 's3cret-token' }]) {
        const { res, nextCalled } = run(auth, headers);
        assert.equal(nextCalled, false);
        assert.equal(res.statusCode, 401);
    }
});

test('with no API_TOKEN configured every API call is refused (fail closed)', () => {
    const { res, nextCalled } = run(createApiAuth({ token: '', logger: silent }), { authorization: 'Bearer ' });
    assert.equal(nextCalled, false);
    assert.equal(res.statusCode, 503);
});

test('secrets are removed from any response body, at any depth', () => {
    const body = { success: true, data: [{ id: 1, name: 'Gate', username: 'admin', password: 'x', nested: { userpassword: 'y', token: 'z' } }] };
    const clean = withoutSecrets(body);
    assert.deepEqual(clean, { success: true, data: [{ id: 1, name: 'Gate', username: 'admin', nested: {} }] });
    assert.equal(body.data[0].password, 'x', 'the original object is untouched');
});

test('dates, buffers and bigints survive redaction', () => {
    const at = new Date('2026-10-26T06:00:00Z');
    const clean = withoutSecrets({ at, n: 5n });
    assert.equal(clean.at, at);
    assert.equal(clean.n, 5n);
});

test('CORS origins: comma list, trimmed; default is the local UI only', () => {
    assert.deepEqual(parseOrigins(' http://a:1 , http://b:2 '), ['http://a:1', 'http://b:2']);
    assert.deepEqual(parseOrigins(undefined), ['http://localhost:3000', 'http://127.0.0.1:3000']);
    assert.equal(parseOrigins('*').includes('*'), false, 'a wildcard is never allowed with credentials');
});

test('the token may also come from the gate_api_token cookie (EventSource and downloads cannot set headers)', () => {
    const auth = createApiAuth({ token: 's3cret-token', logger: silent });
    assert.equal(run(auth, { cookie: 'theme=dark; gate_api_token=s3cret-token' }).nextCalled, true);
    assert.equal(run(auth, { cookie: 'gate_api_token=wrong' }).nextCalled, false);
});
