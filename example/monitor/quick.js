const grpc = require('grpc');
const fs = require('fs');
const connect = require('../connect');
const connectMaster = require('../connectMaster');
const login = require('../login');
const tenant = require('../tenant');
const tenantMessage = require('../../biostar/service/tenant_pb');
const testConnect = require('./testConnect');
const device = require('../device');
const testDevice = require('./testDevice');
const finger = require('../finger');
const testFinger = require('./testFinger');
const card = require('../card');
const testCard = require('./testCard');
const user = require('../user');
const testUser = require('./testUser');
const event = require('../event');
const testEvent = require('./testEvent');
const util = require('../util');

const GATEWAY_CA_FILE = '../../../cert/gateway/192.168.28.111/ca.crt';
const GATEWAY_IP = '192.168.28.111';
const GATEWAY_PORT = 4000;

const DEVICE_IP_1 = '192.168.28.150';
const DEVICE_IP_2 = '192.168.28.23';
const DEVICE_PORT = 51211;
const USE_SSL = false;

const MASTER_CA_FILE = '../../../cert/master/ca.crt';
const MASTER_IP = '192.168.0.2';
const MASTER_PORT = 4010;
const TENANT_CERT_FILE = '../../../cert/master/tenant1.crt';
const TENANT_KEY_FILE = '../../../cert/master/tenant1_key.pem';
const ADMIN_CERT_FILE = '../../../cert/master/admin.crt';
const ADMIN_KEY_FILE = '../../../cert/master/admin_key.pem';

const TENANT_ID = "tenant1";
const GATEWAY_ID = "gateway1";

async function testGateway() {
  var deviceID1 = 0;
  var deviceID2 = 0;
  var deviceIDs = [];

  try {
    var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
    var sslCreds = grpc.credentials.createSsl(rootCa);
    var addr = `${GATEWAY_IP}:${GATEWAY_PORT}`;

    connect.initClient(addr, sslCreds);

    deviceID1 = await testConnect.test(DEVICE_IP_1, DEVICE_PORT, USE_SSL);
    deviceID2 = await testConnect.test(DEVICE_IP_2, DEVICE_PORT, USE_SSL);

    deviceIDs.push(deviceID1)
    deviceIDs.push(deviceID2);
    await testService(addr, sslCreds, deviceIDs);

    await connect.disconnect([deviceIDs]);
  }
  catch (err) {
    console.error(err);

    for (i = 0; i < deviceIDs.length; i++) {
      if (deviceIDs[i] != 0) {
        connect.disconnect([deviceIDs[i]]);
      }
    }
  }
}


async function testMasterGateway() {
  var deviceID = 0;

  try {
    var rootCa = fs.readFileSync(MASTER_CA_FILE);
    var tenantCert = fs.readFileSync(TENANT_CERT_FILE);
    var tenantKey = fs.readFileSync(TENANT_KEY_FILE);
    var sslCreds = grpc.credentials.createSsl(rootCa, tenantKey, tenantCert);

    var addr = `${MASTER_IP}:${MASTER_PORT}`;

    var channelCreds = sslCreds;

    login.initClient(addr, sslCreds);

    const jwtToken = await login.login(tenantCert.toString());
    var callCreds = grpc.credentials.createFromMetadataGenerator((args, callback) => {
      const metadata = new grpc.Metadata();
      metadata.set('token', jwtToken);
      callback(null, metadata);
    });

    const creds = await grpc.credentials.combineChannelCredentials(sslCreds, callCreds);
    channelCreds = creds;
    connectMaster.initClient(addr, channelCreds);

    deviceID = await testConnect.testMaster(GATEWAY_ID, DEVICE_IP, DEVICE_PORT, USE_SSL);
    await testService(addr, channelCreds, deviceID);

    await connectMaster.disconnect([deviceID]);

    const devList = await connectMaster.getDeviceList(GATEWAY_ID);
    console.log('Device list: ');
    console.log(util.toObjectArray(devList));
  }
  catch (err) {
    console.error(err);

    if (deviceID != 0) {
      connectMaster.disconnect([deviceID]);
    }
  }
}


async function initMasterGateway() {
  try {
    var rootCa = fs.readFileSync(MASTER_CA_FILE);
    var adminCert = fs.readFileSync(ADMIN_CERT_FILE);
    var adminKey = fs.readFileSync(ADMIN_KEY_FILE);
    var sslCreds = grpc.credentials.createSsl(rootCa, adminKey, adminCert);

    var addr = `${MASTER_IP}:${MASTER_PORT}`;

    login.initClient(addr, sslCreds);

    const jwtToken = await login.loginAdmin(adminCert.toString());
    var callCreds = grpc.credentials.createFromMetadataGenerator((args, callback) => {
      const metadata = new grpc.Metadata();
      metadata.set('token', jwtToken);
      callback(null, metadata);
    });

    const creds = await grpc.credentials.combineChannelCredentials(sslCreds, callCreds);
    tenant.initClient(addr, creds);

    var tenantIDs = [];
    tenantIDs.push(TENANT_ID);

    try {
      const tenantInfos = await tenant.get(tenantIDs);
      console.log(`${TENANT_ID} is already registered`)
    }
    catch (err) {
      console.log(`${TENANT_ID} is not registered. Trying to add the tenant...`);
      var tenantInfo = new tenantMessage.TenantInfo();
      tenantInfo.setTenantid(TENANT_ID);
      var gatewayIDs = [];
      gatewayIDs.push(GATEWAY_ID);
      tenantInfo.setGatewayidsList(gatewayIDs);
      var tenantInfos = [];
      tenantInfos.push(tenantInfo);

      await tenant.add(tenantInfos);
      console.log(`${TENANT_ID} is registered successfully`);
    }
  }
  catch (err) {
    console.error(err);
  }
}


async function testService(addr, creds, devIDs) {
  try {
    device.initClient(addr, creds);
    event.initClient(addr, creds);

    for (let i = 0; i < devIDs.length; i++) {
      let devID = devIDs[i];
      var capInfo = await testDevice.test(devID);
    }

    await testEvent.test(devIDs);
  }
  catch (err) {
    throw err;
  }
}

// To enable gRPC debugging
// $ export GRPC_VERBOSITY=DEBUG && GRPC_TRACE=all node quick.js

function main() {
  var masterMode = false;

  var args = process.argv.slice(2);

  for (arg of args) {
    if (arg == '-mi') {
      initMasterGateway();
      return;
    }

    if (arg == '-m') {
      masterMode = true;
      break;
    }
  }

  if (masterMode) {
    console.log('Test the master gateway');
    testMasterGateway();
  } else {
    console.log('Test the device gateway');
    testGateway();
  }
}

main();