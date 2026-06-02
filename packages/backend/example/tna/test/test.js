const grpc = require('grpc');
const fs = require('fs');
const util = require('util');
const connect = require('../../connect');
const tna = require('../tna');
const event = require('../../event');
const device = require('../../device');
const testConfig = require('./testConfig');
const testEvent = require('./testEvent');

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
    if (!capability.getDisplaysupported()) {
      throw new Error(util.format('T&A service is not supported by the device %d', deviceID));
    }

    event.initCodeMap(CODE_MAP_FILE);
    await testEvent.startMonitoring(deviceID);

    const origConfig = await testConfig.test(deviceID);
    await testEvent.test(deviceID);

    await testEvent.stopMonitoring(deviceID);
    await tna.setConfig(deviceID, origConfig);

    await connect.disconnect([deviceID]);    
  }
  catch(err) {
    console.error('Cannot finish the tna test: ', err);

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
  device.initClient(addr, sslCreds);
  tna.initClient(addr, sslCreds);
  event.initClient(addr, sslCreds);

  test();
}

main();