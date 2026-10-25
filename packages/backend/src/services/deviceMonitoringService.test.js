import test from 'node:test';
import assert from 'node:assert/strict';
import DeviceMonitoringService from './deviceMonitoringService.js';

const silent = { info() {}, warn() {}, error() {}, debug() {} };

test('start() twice runs one set of timers, and stop() clears them all', (t) => {
    const created = [];
    const cleared = [];
    t.mock.method(globalThis, 'setInterval', (fn, ms) => { const h = { fn, ms }; created.push(h); return h; });
    t.mock.method(globalThis, 'clearInterval', h => { cleared.push(h); });

    const monitoring = new DeviceMonitoringService({ syncDeviceStatus() {}, autoReconnectDevices() {} }, silent);
    monitoring.start();
    monitoring.start();
    assert.equal(created.length, 2, 'one status timer and one reconnect timer');

    monitoring.stop();
    assert.deepEqual(new Set(cleared), new Set(created));
});
