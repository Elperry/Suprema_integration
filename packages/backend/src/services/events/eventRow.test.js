import test from 'node:test';
import assert from 'node:assert/strict';
import { mapEventToRow } from './eventRow.js';

const base = { id: 42, eventcode: 0x1000, eventType: 'attendance', userid: '3', timestamp: '2026-10-26T06:00:00.000Z' };

test('a device event becomes a row with the device time', () => {
    const row = mapEventToRow(base, 2);
    assert.equal(row.deviceId, 2);
    assert.equal(row.supremaEventId, 42n);
    assert.equal(row.userId, '3');
    assert.equal(row.authResult, 'success');
    assert.equal(row.timestamp.toISOString(), '2026-10-26T06:00:00.000Z');
});

test('an event without a device time is dropped, never stamped with "now"', () => {
    assert.equal(mapEventToRow({ ...base, timestamp: undefined }, 2), null);
    assert.equal(mapEventToRow({ ...base, timestamp: 'not a date' }, 2), null);
});

test('an event without an id is dropped', () => {
    assert.equal(mapEventToRow({ ...base, id: undefined }, 2), null);
});

test('a failed authentication code is marked fail', () => {
    assert.equal(mapEventToRow({ ...base, eventcode: 0x1001, eventType: 'authentication' }, 2).authResult, 'fail');
});
