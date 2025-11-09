const util = require('../../util');
const rs485 = require('../../rs485');

var slaves = [];
var registeredSlaves = [];

function getSlaves() {
  return slaves;
}

async function checkSlaves(devID) {
  try {
    const config = await rs485.getConfig(devID);

    let hasMasterChannel = false;

    for(let i = 0; i < config.getChannelsList().length; i++) {
      if(config.getChannelsList()[i].getMode() == rs485.rs485Message.Mode.MASTER) {
        hasMasterChannel = true;
        break;
      }
    }

    if(!hasMasterChannel) {
      console.error('!! Only a master device can have slave devices. Skip the test.');
      return false;
    }

    slaves = await rs485.searchSlave(devID);
    if(slaves.length == 0) {
      console.error('!! No slave device is configured. Configure and wire the slave devices first.');
      return false;
    }

    console.log('Found Slaves: ', util.toObjectArray(slaves));

    registeredSlaves = await rs485.getSlave(devID);

    console.log('Registered Slaves: ', util.toObjectArray(registeredSlaves));

    if(registeredSlaves.length == 0) {
      await rs485.setSlave(devID, slaves);
    }

    for(let i = 0; i < 10; i++) {
      let newSlaves = await rs485.searchSlave(devID);
      if(newSlaves[0].getConnected()) {
        break;
      }

      console.log(`Waiting for the slave to be connected ${i}...`);
      await sleepNow(2000);
    }

    return true;
  }
  catch(err) {
    console.error('Cannot check the slave devices: ', err);
    throw err;
  }
}

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function restoreSlaves(devID) {
  try {
    await rs485.setSlave(devID, registeredSlaves);
  }
  catch(err) {
    console.error('Cannot restore the slave devices: ', err);
    throw err;
  }
}


module.exports.getSlaves = getSlaves;
module.exports.checkSlaves = checkSlaves;
module.exports.restoreSlaves = restoreSlaves;