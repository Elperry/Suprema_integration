import test from 'node:test';
import assert from 'node:assert/strict';
import { schemaAction } from './schemaGuard.js';

test('a complete schema with a fresh client needs nothing', () => {
    assert.equal(schemaAction({ missing: false, clientStale: false }), 'none');
});

test('a stale generated client is regenerated (touches no data)', () => {
    assert.equal(schemaAction({ missing: false, clientStale: true }), 'generate');
});

test('missing tables refuse startup instead of db push --accept-data-loss', () => {
    assert.equal(schemaAction({ missing: true, clientStale: false }), 'refuse');
    assert.equal(schemaAction({ missing: true, clientStale: true }), 'refuse');
});
