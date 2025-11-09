const status = require('../status');
const action = require('../../action');
const device = require('../../device');
const menu = require('../../cli/menu');

async function test(devID) {
  try {
    // Backup the original configuration
    const origConfig = await status.getConfig(devID);
    status.printConfig('Original Config', origConfig);    

    const testConfig = origConfig.cloneMessage();
    await testLED(devID, testConfig);
    await testBuzzer(devID, testConfig);

    // Restore the original configuration   
    await status.setConfig(devID, origConfig);
  }
  catch(err) {
    console.error('Cannot finish the status test: ', err);
    throw err;
  }
}

async function testLED(devID, config) {
  console.log('\n', '===== LED Status Test =====', '\n');

  // Change the LED color of the normal status to yellow
  const ledStateList = config.getLedstateList();

  for(let i = 0; i < ledStateList.length; i++) {
    if(ledStateList[i].getDevicestatus() == status.statusMessage.DeviceStatus.DEVICE_STATUS_NORMAL) {
      ledStateList[i].clearSignalsList();
      ledStateList[i].setCount(0);

      const ledSignal = new action.actionMessage.LEDSignal();
      ledSignal.setColor(device.deviceMessage.LEDColor.LED_COLOR_YELLOW);
      ledSignal.setDuration(2000);
      ledSignal.setDelay(0);

      ledStateList[i].addSignals(ledSignal);

      break;
    }
  }

  config.setLedstateList(ledStateList);

  await status.setConfig(devID, config);

  const newConfig = await status.getConfig(devID);
  status.printConfig('New Config', newConfig); 

  console.log('>> The LED color of the normal status is changed to yellow.');
  await menu.pressEnter('>> Press ENTER for the next test.\n');
}


async function testBuzzer(devID, config) {
  console.log('\n', '===== Buzzer Status Test =====', '\n');

  // Change the buzzer signal for FAIL
  const buzzerStateList = config.getBuzzerstateList();

  for(let i = 0; i < buzzerStateList.length; i++) {
    if(buzzerStateList[i].getDevicestatus() == status.statusMessage.DeviceStatus.DEVICE_STATUS_FAIL) {
      buzzerStateList[i].clearSignalsList();
      buzzerStateList[i].setCount(1);

      const buzzerSignal = new action.actionMessage.BuzzerSignal(); // 2 x 500ms beeps
      buzzerSignal.setTone(device.deviceMessage.BuzzerTone.BUZZER_TONE_HIGH);
      buzzerSignal.setDuration(500);
      buzzerSignal.setDelay(2);

      buzzerStateList[i].addSignals(buzzerSignal);
      buzzerStateList[i].addSignals(buzzerSignal);

      break;
    }
  }

  config.setBuzzerstateList(buzzerStateList);

  await status.setConfig(devID, config);

  const newConfig = await status.getConfig(devID);
  status.printConfig('New Config', newConfig); 

  console.log('>> The buzzer for the FAIL status is changed to two 500ms beeps. Try to authenticate unregistered credentials for the test.');
  await menu.pressEnter('>> Press ENTER for the next test.\n');
}

module.exports.test = test;