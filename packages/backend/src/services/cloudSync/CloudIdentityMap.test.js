import test from 'node:test';
import assert from 'node:assert/strict';
import { CloudIdentityMap } from './CloudIdentityMap.js';

/** A pusher whose cloud memory is a plain key -> row map. */
const pusherWith = (rows, byId = {}) => ({ cloudRowForKey: key => rows[key] ?? null, cloudRowById: id => byId[id] ?? null });

const map = new CloudIdentityMap({
    localUsers: [{ id: 3, employee_id: 1001 }, { id: 4, employee_id: 1002 }, { id: 5, employee_id: 1003 }],
    localDevices: [{ id: 2, serialNumber: '546084682' }, { id: 6, serialNumber: null }],
    localCards: [{ id: 11, user_id: 3, card_data: 'AA' }, { id: 12, user_id: 4, card_data: 'BB' }, { id: 13, user_id: 4, card_data: 'CC' }],
    users: pusherWith({ 'emp:1001': { id: 900 }, 'emp:1002': { id: 901 } }, {
        900: { id: 900, employee_id: 1001 }, 901: { id: 901, employee_id: 1002 }, 905: { id: 905, employee_id: 1002 },
    }),
    devices: pusherWith({ 'sn:546084682': { id: 40 } }),
    cards: pusherWith({ 'card:AA': { id: 70, user_id: 900 }, 'card:BB': { id: 71, user_id: 999 }, 'card:CC': { id: 72, user_id: 905 } }),
});

test('local user -> employee -> cloud user', () => {
    assert.equal(map.cloudUserId(3), 900);
    assert.equal(map.cloudUserId(5), null, 'employee 1003 has no cloud user yet');
    assert.equal(map.cloudUserId(77), null);
});

test('device user ids on the terminals are local user ids', () => {
    assert.equal(map.isLocalUser('4'), true);
    assert.equal(map.isLocalUser('4001234'), false);
    assert.equal(map.cloudUserIdForDeviceUser('4'), 901);
});

test('local device -> Suprema serial -> cloud device', () => {
    assert.equal(map.cloudDeviceId(2), 40);
    assert.equal(map.cloudDeviceId(6), null);
});

test('a cloud card is only used when it belongs to the same person', () => {
    assert.equal(map.cloudCardId(11), 70);
    assert.equal(map.cloudCardId(12), null, 'BB is held by cloud user 999, not 901');
});

test('a card held by a duplicate cloud user row of the same employee is the same person', () => {
    assert.equal(map.cloudCardId(13), 72, 'cloud user 905 is employee 1002 too');
    assert.equal(map.sameCloudUser(901, 905), true);
    assert.equal(map.sameCloudUser(900, 905), false);
    assert.equal(map.sameCloudUser(901, 999), false, 'an unknown row is not assumed equal');
});
