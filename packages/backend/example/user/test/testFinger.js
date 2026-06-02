const finger = require('../../finger');
const user = require('../user');
const menu = require('../../cli/menu');

async function test(devID, userID) {
  try {
    console.log('\n', '===== Finger Test =====', '\n');

    var fingerData = new finger.fingerMessage.FingerData();

    console.log('>> Scan a finger on the device...');
    var templateData = await finger.scan(devID);
    fingerData.addTemplates(templateData, 0);

    console.log('>> Scan the same finger again on the device...');
    templateData = await finger.scan(devID);
    fingerData.addTemplates(templateData, 1);

    var userFinger = new user.userMessage.UserFinger();
    userFinger.setUserid(userID);
    userFinger.addFingers(fingerData, 0);

    await user.setFinger(devID, [userFinger]);
    await menu.pressEnter('>> Try to authenticate the enrolled finger. And, press ENTER to end the test.\n');
  }
  catch(err) {
    console.error('Cannot complete the finger test: ', err);
    throw err;
  }
}

module.exports.test = test;

