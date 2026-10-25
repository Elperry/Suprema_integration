import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { DeviceClockKeeper } from './DeviceClockKeeper.js';

const silent = { info() {}, warn() {}, error() {}, debug() {} };

function fakes() {
    const calls = [];
    const timeService = {
        async syncAllDevices(offset) { calls.push(['all', offset]); return { success: true, devicesCount: 2 }; },
        async setTimeConfig(deviceId, offset) { calls.push(['config', deviceId, offset]); return { success: true }; },
        async setDeviceTime(deviceId) { calls.push(['time', deviceId]); return { success: true }; },
    };
    return { calls, timeService, connection: new EventEmitter() };
}

test('the offset applied is Cairo\'s at that moment: +3h in summer, +2h after 29 Oct', async () => {
    const { calls, timeService, connection } = fakes();
    let now = new Date('2026-10-29T20:00:00Z');
    const keeper = new DeviceClockKeeper({ timeService, connectionService: connection, logger: silent, now: () => now });
    await keeper.check();
    now = new Date('2026-10-29T22:00:00Z');
    await keeper.check();
    assert.deepEqual(calls, [['all', 10800], ['all', 7200]]);
});

test('no change in offset means no device writes', async () => {
    const { calls, timeService, connection } = fakes();
    const keeper = new DeviceClockKeeper({ timeService, connectionService: connection, logger: silent, now: () => new Date('2026-11-05T08:00:00Z') });
    await keeper.check();
    await keeper.check();
    assert.equal(calls.length, 1);
});

test('a device that reconnects gets the current zone and time again', async () => {
    const { calls, timeService, connection } = fakes();
    const keeper = new DeviceClockKeeper({ timeService, connectionService: connection, logger: silent, now: () => new Date('2026-11-05T08:00:00Z') });
    keeper.start({ checkEveryMs: 0 });
    connection.emit('device:connected', { deviceId: 546084682 });
    await new Promise(resolve => setImmediate(resolve));
    assert.deepEqual(calls.filter(c => c[0] !== 'all'), [['config', 546084682, 7200], ['time', 546084682]]);
    keeper.stop();
    assert.equal(connection.listenerCount('device:connected'), 0);
});
