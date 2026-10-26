import test from 'node:test';
import assert from 'node:assert/strict';
import { securityHeaders } from './securityHeaders.js';

function headersFor(middleware) {
    const headers = {};
    const res = {
        setHeader(name, value) { headers[name.toLowerCase()] = String(value); },
        getHeader(name) { return headers[name.toLowerCase()]; },
        removeHeader(name) { delete headers[name.toLowerCase()]; },
    };
    middleware({ headers: {} }, res, () => {});
    return headers;
}

test('the gate PC serves plain HTTP, so the policy never asks the browser to upgrade to HTTPS', () => {
    const csp = headersFor(securityHeaders())['content-security-policy'];
    assert.ok(csp, 'a content security policy is still sent');
    assert.doesNotMatch(csp, /upgrade-insecure-requests/);
});

test('the operator UI may only talk to the backend that served it', () => {
    const csp = headersFor(securityHeaders())['content-security-policy'];
    assert.match(csp, /default-src 'self'/);
    assert.doesNotMatch(csp, /connect-src[^;]*\*/);
});
