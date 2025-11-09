const device = require('../device');

async function test(devID) {
  try {
    const info = await device.getInfo(devID);
    console.log('Device info: ', info.toObject());

    const capabilityInfo = await device.getCapabilityInfo(devID);
    console.log('Capability info: ', capabilityInfo.toObject());

    return capabilityInfo;
  }
  catch(err) {
    console.error('Cannot finish the device test: ', err);
    throw err;
  }
}

module.exports.test = test;