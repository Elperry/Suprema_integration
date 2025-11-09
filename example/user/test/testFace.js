const face = require('../../face');
const user = require('../user');
const menu = require('../../cli/menu');

async function test(devID, userID) {
  try {
    console.log('\n', '===== Face Test =====', '\n');

    console.log('>> Enroll a face on the device...');
    var faceData = await face.scan(devID, face.faceMessage.FaceEnrollThreshold.BS2_FACE_ENROLL_THRESHOLD_DEFAULT);

    var userFace = new user.userMessage.UserFace();
    userFace.setUserid(userID);
    userFace.addFaces(faceData, 0);

    await user.setFace(devID, [userFace]);
    await menu.pressEnter('>> Try to authenticate the enrolled face. And, press ENTER to end the test.\n');
  }
  catch(err) {
    console.error('Cannot complete the face test: ', err);
    throw err;
  }
}

module.exports.test = test;

