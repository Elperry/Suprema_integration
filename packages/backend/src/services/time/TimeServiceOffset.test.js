import test from 'node:test';
import assert from 'node:assert/strict';
import SupremaTimeService from '../timeService.js';

test('the default device offset is the school offset at call time, not at process start', () => {
    delete process.env.DEVICE_TIMEZONE_OFFSET;
    const service = new SupremaTimeService(null, null);
    service.now = () => new Date('2026-10-26T08:00:00Z');      // summer time: UTC+3
    assert.equal(service.defaultTimezoneOffset, 3 * 3600);
    service.now = () => new Date('2026-11-02T08:00:00Z');      // after 29 Oct: UTC+2
    assert.equal(service.defaultTimezoneOffset, 2 * 3600, 'a manual sync after the change must not push UTC+3');
});

test('DEVICE_TIMEZONE_OFFSET still pins the offset', () => {
    process.env.DEVICE_TIMEZONE_OFFSET = '7200';
    try {
        const service = new SupremaTimeService(null, null);
        service.now = () => new Date('2026-07-01T08:00:00Z');
        assert.equal(service.defaultTimezoneOffset, 7200);
    } finally {
        delete process.env.DEVICE_TIMEZONE_OFFSET;
    }
});
