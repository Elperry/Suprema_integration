import test from 'node:test';
import assert from 'node:assert/strict';
import { cairoDayRange, parseTnaKeyMap, tnaAction } from './tnaRules.js';

test('a school day is midnight to midnight in Cairo, DST included', () => {
    const summer = cairoDayRange('2026-07-01');
    assert.equal(summer.start.toISOString(), '2026-06-30T21:00:00.000Z');
    assert.equal(summer.end.toISOString(), '2026-07-01T20:59:59.999Z');
    const winter = cairoDayRange('2026-11-01');
    assert.equal(winter.start.toISOString(), '2026-10-31T22:00:00.000Z');
    assert.equal(winter.end.toISOString(), '2026-11-01T21:59:59.999Z');
});

test('the DST change day is 25 hours long', () => {
    const { start, end } = cairoDayRange('2026-10-29');
    assert.equal(start.toISOString(), '2026-10-28T21:00:00.000Z');
    assert.equal(end.toISOString(), '2026-10-29T21:59:59.999Z');
});

test('TNA keys map to actions from config; unknown keys stay unknown', () => {
    const map = parseTnaKeyMap('1=clock_in, 2=clock_out,3=break_start,4=break_end,9=nonsense');
    assert.equal(tnaAction('tna_key_1', map), 'clock_in');
    assert.equal(tnaAction('tna_key_2', map), 'clock_out');
    assert.equal(tnaAction('tna_key_9', map), null, 'only known actions are accepted');
    assert.equal(tnaAction('tna_key_7', map), null);
    assert.equal(tnaAction('clock_in', map), 'clock_in', 'explicit actions pass through');
});

test('the default map is In/Out on keys 1 and 2', () => {
    const map = parseTnaKeyMap(undefined);
    assert.equal(tnaAction('tna_key_1', map), 'clock_in');
    assert.equal(tnaAction('tna_key_2', map), 'clock_out');
});
