import grpc from '@grpc/grpc-js';
import fs from 'fs';
import connect from '../../connect.js';
import apb from '../../apb.js';
import event from '../../event.js';
import rs485 from '../../rs485.js';
import testAPBZone from './testAPBZone.js';
import testRS485 from './testRS485.js';
import testEvent from './testEvent.js';

const GATEWAY_CA_FILE = '../../../../cert/gateway/192.168.28.111/ca.crt';
const GATEWAY_IP = '192.168.28.111';
const GATEWAY_PORT = 4000;

const DEVICE_IP = '192.168.28.150';
const DEVICE_PORT = 51211;
const USE_SSL = false;

const CODE_MAP_FILE = '../../event/event_code.json';

async function test() {
  var deviceID = 0;
  var hasSlave = false;

  try {
    deviceID = await connect.connectToDevice(DEVICE_IP, DEVICE_PORT, USE_SSL);

    hasSlave = await testRS485.checkSlaves(deviceID);

    if(!hasSlave) {
      return;
    }

    event.initCodeMap(CODE_MAP_FILE);
    await testEvent.startMonitoring(deviceID);

    await testAPBZone.test(deviceID, testRS485.getSlaves());

    await testEvent.stopMonitoring(deviceID);
  }
  catch(err) {
    console.error('Cannot finish the apb test: ', err);
  }
  finally{
    if(deviceID != 0) {
      if(hasSlave) {
        await testRS485.restoreSlaves(deviceID);
      }

      await connect.disconnect([deviceID]);      
    }
  }
}


function main() {
  var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa);
  var addr = `${GATEWAY_IP}:${GATEWAY_PORT}`;

  connect.initClient(addr, sslCreds);
  apb.initClient(addr, sslCreds);
  event.initClient(addr, sslCreds);
  rs485.initClient(addr, sslCreds);

  test();
}

main();