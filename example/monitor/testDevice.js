const device = require('../device');

async function test(devID) {
  try {
    const info = await device.getInfo(devID);
    console.log('Device: ', info.toObject());

    const capability = await device.getCapability(devID);
    console.log('Capability: ', capability.toObject());

    return capability;
  }
  catch(err) {
    console.error('Cannot finish the device test: ', err);
    throw err;
  }
}

module.exports.test = test;