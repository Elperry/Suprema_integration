const connect = require('../connect');
const connectMaster = require('../connectMaster');
const util = require('../util');

async function test(deviceIP, devicePort, useSSL) {
  try {
    const devID = await connect.connectToDevice(deviceIP, devicePort, useSSL);
    const devList = await connect.getDeviceList();
    console.log('Device list: ');
    console.log(util.toObjectArray(devList));
    return devID;
  }
  catch(err) {
    console.error('Cannot finish the connect test: ', err);
    throw err;
  }
}

async function testMaster(gatewayID, deviceIP, devicePort, useSSL) {
  try {
    const deviceID = await connectMaster.connectToDevice(gatewayID, deviceIP, devicePort, useSSL);
    const devList = await connectMaster.getDeviceList(gatewayID);
    console.log('Device list: ');
    console.log(util.toObjectArray(devList));
    return deviceID;
  }
  catch(err) {
    console.error('Cannot finish the connect test: ', err);
    throw err;
  }
}


module.exports.test = test;
module.exports.testMaster = testMaster;