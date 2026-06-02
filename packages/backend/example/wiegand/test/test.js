const grpc = require('grpc');
const fs = require('fs');
const connect = require('../../connect');
const wiegand = require('../wiegand');
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

    await testConfig.test(deviceID);

    await connect.disconnect([deviceID]);    
  }
  catch(err) {
    console.error('Cannot finish the wiegand test: ', err);

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
  wiegand.initClient(addr, sslCreds);

  test();
}

main();