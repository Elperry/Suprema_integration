const user = require('../user');
const finger = require('../finger');
const face = require('../face');
const util = require('../util');

const NUM_OF_NEW_USER = 3;
const START_USER_ID = 10000000;
const TEMPLATE_FORMAT = finger.TEMPLATE_FORMAT_SUPREMA;

function getNewUserIDs() {
  var userIDs = [];

  for(i = 0; i < NUM_OF_NEW_USER; i++) {
    userIDs.push(`${START_USER_ID + i}`);
  }

  return userIDs;
}


function makeNewUser() {
  var userInfos = [];

  for(i = 0; i < NUM_OF_NEW_USER; i++) {
    let userInfo = new user.userMessage.UserInfo();
    let userHdr = new user.userMessage.UserHdr();
    userHdr.setId(`${START_USER_ID + i}`);
    userHdr.setUserflag(userHdr.USER_FLAG_CREATED);
    userInfo.setHdr(userHdr);

    userInfos.push(userInfo);
  }

  return userInfos;
}

async function testSetFinger(devID, userID) {
  try {
    var fingerData = new finger.fingerMessage.FingerData();

    var userIDs = []
    userIDs.push(userID);

    var userInfos = util.toObjectArray(await user.getUser(devID, userIDs));
    console.log('User without fingerprint: ', userInfos[0]);

    console.log('>>> Scan a finger');
    var templateData = await finger.scan(devID, TEMPLATE_FORMAT, 50);
    fingerData.addTemplates(templateData, 0);

    console.log('>>> Scan the same finger again');
    templateData = await finger.scan(devID, TEMPLATE_FORMAT, 50);
    fingerData.addTemplates(templateData, 1);
    
    var userFingers = [];
    var userFinger = new user.userMessage.UserFinger();
    userFinger.setUserid(userID);
    userFinger.addFingers(fingerData, 0);
    userFingers.push(userFinger);

    await user.setFinger(devID, userFingers);

    userInfos = await user.getUser(devID, userIDs);
    console.log('User with fingerprint: ', userInfos[0]);
  }
  catch(err) {
    console.error('Cannot finish the setFinger test: ', err);
    throw err;
  }
}

async function testSetFace(devID, userID) {
  try {
    var faceData = new face.faceMessage.FaceData();

    var userIDs = []
    userIDs.push(userID);

    var userInfos = util.toObjectArray(await user.getUser(devID, userIDs));
    console.log('User without face: ', userInfos[0]);

    console.log('>>> Scan a face');
    var faceData = await face.scan(devID, face.BS2_FACE_ENROLL_THRESHOLD_DEFAULT);
    
    var userFaces = [];
    var userFace = new user.userMessage.UserFace();
    userFace.setUserid(userID);
    userFace.addFaces(faceData, 0);
    userFaces.push(userFace);

    await user.setFace(devID, userFaces);

    userInfos = await user.getUser(devID, userIDs);
    console.log('User with face: ', userInfos[0]);
  }
  catch(err) {
    console.error('Cannot finish the setFace test: ', err);
    throw err;
  }
}

async function test(devID, capabilityInfo) {
  try {
    var hdrs = util.toObjectArray(await user.getList(devID));
    console.log('User list: ', hdrs);

    var userIDs = [];
    for(i = 0; i < hdrs.length; i++) {
      userIDs.push(hdrs[i].id);
    }
    
    const userInfos = util.toObjectArray(await user.getUser(devID, userIDs));
    for(i = 0; i < userInfos.length; i++) {
      console.log('User: ', userInfos[i]);
    }

    await user.enroll(devID, makeNewUser());  

    hdrs = util.toObjectArray(await user.getList(devID));
    console.log('User list after enrolling new users: ', hdrs);

    if (capabilityInfo.getFingersupported()) {
      await testSetFinger(devID, getNewUserIDs()[0]);
    }

    if (capabilityInfo.getFacesupported()) {
      await testSetFace(devID, getNewUserIDs()[0]);
    }

    await user.deleteUser(devID, getNewUserIDs());

    hdrs = util.toObjectArray(await user.getList(devID));
    console.log('User list after deleting new users: ', hdrs);  
  }
  catch(err) {
    console.error('Cannot finish the user test: ', err);
    throw err;
  }
}

module.exports.test = test;