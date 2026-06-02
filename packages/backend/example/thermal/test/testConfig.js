const thermal = require('../thermal');
const menu = require('../../cli/menu');

async function test(devID, config) {
  try {
    // Backup the original configuration
    const origConfig = config.cloneMessage();

    console.log('\n', '===== Test for ThermalConfig =====', '\n');

    // Set options for the test
    config.setAudittemperature(true); // write temperature logs
    config.setCheckmode(thermal.thermalMessage.CheckMode.HARD); // disalllow access when temperature is too high

    // (1) Set check order to AFTER_AUTH
    config.setCheckorder(thermal.thermalMessage.CheckOrder.AFTER_AUTH);
    await thermal.setConfig(devID, config);

    console.log('(1) The Check Order is set to AFTER_AUTH. The device will measure the temperature only after successful authentication. Try to authenticate faces.', '\n');
    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');

    // (2) Set check order to BEFORE_AUTH
    config.setCheckorder(thermal.thermalMessage.CheckOrder.BEFORE_AUTH);
    await thermal.setConfig(devID, config);

    console.log('(2) The Check Order is set to BEFORE_AUTH. The device will try to authenticate a user only when the user\'s temperature is within the threshold. Try to authenticate faces.', '\n');
    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');

    // (3) Set check order to WITHOUT_AUTH
    config.setCheckorder(thermal.thermalMessage.CheckOrder.WITHOUT_AUTH);
    await thermal.setConfig(devID, config);

    console.log('(3) The Check Order is set to WITHOUT_AUTH. Any user whose temperature is within the threshold will be allowed to access. Try to authenticate faces.', '\n');
    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');

    // (4) Set check order to AFTER_AUTH with too low threshold
    config.setCheckorder(thermal.thermalMessage.CheckOrder.AFTER_AUTH);
    config.setTemperaturethresholdhigh(3500); // Too low threshold. Most temperature check will fail
    config.setTemperaturethresholdlow(3000);
    await thermal.setConfig(devID, config);

    console.log('(4) To reproduce the case of high temperature, the Check Order is set to AFTER_AUTH with the threshold of 35 degree Celsius. Most temperature check will fail, now. Try to authenticate faces.', '\n');
    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n'); 
    
    // Restore the original configuration
    await thermal.setConfig(devID, origConfig);
  }
  catch(err) {
    console.error('Cannot finish the thermal test: ', err);
    throw err;
  }
}

module.exports.test = test;