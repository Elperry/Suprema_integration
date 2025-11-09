const grpc = require('grpc');
const fs = require('fs');
const connect = require('../../connect');
const status = require('../status');
const device = require('../../device');
const testConfig = require('./testConfig');

const GATEWAY_CA_FILE = '../../../../cert/gateway/192.168.28.111/ca.crt';
const GATEWAY_IP = '192.168.28.111';
const GATEWAY_PORT = 4000;

const DEVICE_IP = '192.168.28.150';
const DEVICE_PORT = 51211;
const USE_SSL = false;

async function test() {
  var deviceID = 0;

  try {
    deviceID = await connect.connectToDevice(DEVICE_IP, DEVICE_PORT, USE_SSL);

    const capability = await device.getCapability(deviceID);

    if (capability.getDisplaysupported()) {
      console.error('Status configuration is effective only for headless devices: ', capability.getDisplaysupported());
      connect.disconnect([deviceID]);
      return;
    }

    await testConfig.test(deviceID);

    await connect.disconnect([deviceID]);    
  }
  catch(err) {
    console.error('Cannot finish the status test: ', err);

    if(deviceID != 0) {
      await connect.disconnect([deviceID]);      
    }
  }
}

function isHeadless(devType) {
  switch(devType) {
    case device.deviceMessage.Type.BIOENTRY_P2:
    case device.deviceMessage.Type.BIOENTRY_R2:
    case device.deviceMessage.Type.BIOENTRY_W2:
    case device.deviceMessage.Type.XPASS2:
    case device.deviceMessage.Type.XPASS2_KEYPAD:
    case device.deviceMessage.Type.XPASS_D2:
    case device.deviceMessage.Type.XPASS_D2_KEYPAD:
    case device.deviceMessage.Type.XPASS_S2:
      return true;

    default:
      return false;
  }
}

function main() {
  var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa);
  var addr = `${GATEWAY_IP}:${GATEWAY_PORT}`;

  connect.initClient(addr, sslCreds);
  status.initClient(addr, sslCreds);
  device.initClient(addr, sslCreds);

  test();
}

main();