const display = require('../display');

async function test(devID) {
  try {
    const config = await display.getConfig(devID);
    console.log('Display config: ', config.toObject());
  }
  catch(err) {
    console.error('Cannot finish the display test: ', err);
    throw err;
  }
}

module.exports.test = test;