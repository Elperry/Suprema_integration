const grpc = require('grpc');
const fs = require('fs');
const connect = require('../../connect');
const user = require('../user');
const auth = require('../../auth');
const event = require('../../event');
const device = require('../../device');
const card = require('../../card');
const finger = require('../../finger');
const face = require('../../face');
const testAuth = require('./testAuth');
const testEvent = require('./testEvent');
const testUser = require('./testUser');
const testCard = require('./testCard');
const testFinger = require('./testFinger');
const testFace = require('./testFace');

const GATEWAY_CA_FILE = '../../../../cert/gateway/192.168.28.111/ca.crt';
const GATEWAY_IP = '192.168.28.111';
const GATEWAY_PORT = 4000;

const DEVICE_IP = '192.168.28.150';
const DEVICE_PORT = 51211;
const USE_SSL = false;

const CODE_MAP_FILE = '../../event/event_code.json';

async function test() {
  var deviceID = 0;

  try {
    deviceID = await connect.connectToDevice(DEVICE_IP, DEVICE_PORT, USE_SSL);

    const capability = await device.getCapability(deviceID);

    event.initCodeMap(CODE_MAP_FILE);
    await testEvent.startMonitoring(deviceID);

    const origAuthConfig = await testAuth.prepareAuthConfig(deviceID);

    const testUserID = await testUser.enrollUser(deviceID, capability.getExtendedauthsupported());

    if (capability.getCardinputsupported()) {
      await testCard.test(deviceID, testUserID);
    } else {
      console.error('!! The device %d does not support cards. Skip the card test.', deviceID, '\n');
    }

    if (capability.getFingerprintinputsupported()) {
      await testFinger.test(deviceID, testUserID);
    } else {
      console.error('!! The device %d does not support fingerprints. Skip the fingerprint test.', deviceID, '\n');
    }    

    if (capability.getFaceinputsupported()) {
      await testFace.test(deviceID, testUserID);
    } else {
      console.error('!! The device %d does not support faces. Skip the face test.', deviceID, '\n');
    }      

    await testAuth.test(deviceID, capability.getExtendedauthsupported());
    await testEvent.test(deviceID, testUserID);

    await auth.setConfig(deviceID, origAuthConfig);
    await user.deleteUser(deviceID, [testUserID]);
    await testEvent.stopMonitoring(deviceID);

    await connect.disconnect([deviceID]);    
  }
  catch(err) {
    console.error('Cannot finish the user test: ', err);

    if(deviceID != 0) {
      await connect.disconnect([deviceID]);      
    }
  }
}


function main() {
  var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa);
  var addr = `${GATEWAY_IP}:${GATEWAY_PORT}`;

  connect.initClient(addr, sslCreds);
  user.initClient(addr, sslCreds);
  device.initClient(addr, sslCreds);
  event.initClient(addr, sslCreds);
  auth.initClient(addr, sslCreds);
  card.initClient(addr, sslCreds);
  finger.initClient(addr, sslCreds);
  face.initClient(addr, sslCreds);

  test();
}

main();