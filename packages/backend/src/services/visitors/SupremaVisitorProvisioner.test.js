import test from 'node:test';
import assert from 'node:assert/strict';
import { SupremaVisitorProvisioner } from './SupremaVisitorProvisioner.js';

const silent = { info() {}, warn() {}, error() {}, debug() {} };

function fakes({ devices = [546084682, 546084700], failOn = null } = {}) {
    const calls = [];
    const userService = {
        async enrollUsers(deviceId, users) {
            calls.push(['enroll', deviceId, users]);
            if (failOn === `enroll:${deviceId}`) throw new Error('device busy');
            return true;
        },
        async setUserCards(deviceId, cards, options) { calls.push(['cards', deviceId, cards, options]); return true; },
    };
    const biometricService = {
        async setQRConfig(deviceId, config) {
            calls.push(['qr', deviceId, config]);
            if (failOn === `qr:${deviceId}`) throw new Error('not supported');
            return { success: true };
        },
    };
    const connectionService = { connectedDevices: new Map(devices.map(id => [id, {}])) };
    return { calls, userService, biometricService, connectionService };
}

const visitor = { cloudId: 11, qrcode: '400111', name: 'Guest A', visitDay: '2026-11-02' };

test('a visitor becomes a time-limited QR user on every connected terminal', async () => {
    const f = fakes();
    const ok = await new SupremaVisitorProvisioner({ ...f, logger: silent }).provision(visitor);
    assert.equal(ok, true);
    const enrolls = f.calls.filter(c => c[0] === 'enroll');
    assert.deepEqual(enrolls.map(c => c[1]), [546084682, 546084700]);
    const user = enrolls[0][2][0];
    assert.equal(user.id, '400111');
    assert.equal(user.name, 'Guest A');
    // 06:00 to 23:59:59 Cairo on 2 Nov 2026 (UTC+2)
    assert.equal(new Date(user.settings.startTime * 1000).toISOString(), '2026-11-02T04:00:00.000Z');
    assert.equal(new Date(user.settings.endTime * 1000).toISOString(), '2026-11-02T21:59:59.000Z');
    const [, , cards, options] = f.calls.find(c => c[0] === 'cards');
    assert.deepEqual(cards, [{ userId: '400111', cardData: Buffer.from('400111', 'ascii').toString('hex'), cardType: 0x06 }]);
    assert.equal(options.skipDuplicateCheck, true);
});

test('QR reading is switched on once per terminal', async () => {
    const f = fakes();
    const provisioner = new SupremaVisitorProvisioner({ ...f, logger: silent });
    await provisioner.provision(visitor);
    await provisioner.provision({ ...visitor, qrcode: '400112' });
    assert.equal(f.calls.filter(c => c[0] === 'qr').length, 2);
    assert.equal(f.calls.find(c => c[0] === 'qr')[2].useQRCode, true);
});

test('no connected terminal means not provisioned (retried later)', async () => {
    const f = fakes({ devices: [] });
    assert.equal(await new SupremaVisitorProvisioner({ ...f, logger: silent }).provision(visitor), false);
});

test('a failure on any terminal means not provisioned, so the whole visit is retried', async () => {
    const f = fakes({ failOn: 'enroll:546084700' });
    assert.equal(await new SupremaVisitorProvisioner({ ...f, logger: silent }).provision(visitor), false);
    const g = fakes({ failOn: 'qr:546084682' });
    assert.equal(await new SupremaVisitorProvisioner({ ...g, logger: silent }).provision(visitor), false);
});

test('a malformed visit day is refused', async () => {
    const f = fakes();
    assert.equal(await new SupremaVisitorProvisioner({ ...f, logger: silent }).provision({ ...visitor, visitDay: '' }), false);
    assert.equal(f.calls.length, 0);
});
