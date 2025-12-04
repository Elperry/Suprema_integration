const config = require('./config');
const user = require('../user');
const card = require('../card');
const event = require('../event');
const errSvc = require('../err');
const deviceMgr = require('./device');

const BS2_EVENT_USER_ENROLL_SUCCESS			= 0x2000;
const BS2_EVENT_USER_UPDATE_SUCCESS			= 0x2200;
const BS2_EVENT_USER_DELETE_SUCCESS			= 0x2400;
const BS2_EVENT_USER_DELETE_ALL_SUCCESS	= 0x2600;

var enrolledIDs = [];

async function enrollUser(userID) {
  const devID = config.getConfigData().enroll_device.device_id;

  console.log(`>>> Place a unregistered CSN card on the device ${devID}`);
  var cardInfo = await card.scan(devID);

  var userInfo = new user.userMessage.UserInfo();
  var userHdr = new user.userMessage.UserHdr();
  userHdr.setId(userID);
  userHdr.setUserflag(userHdr.USER_FLAG_CREATED);
  userHdr.setNumofcard(1);
  userInfo.setHdr(userHdr);
  userInfo.addCards(cardInfo.getCsncarddata(), 0);

  await user.enroll(devID, [userInfo]);
}

async function deleteUser(userID) {
  const devID = config.getConfigData().enroll_device.device_id;
  await user.deleteUser(devID, [userID]);
}

async function getNewUser(deviceID) {
  if(enrolledIDs.length == 0) {
    console.log('No new user');
    return null;
  }

  return await user.getUser(deviceID, enrolledIDs);
}

async function eventCallback(eventLog) {
  printEvent(eventLog);
  await syncUser(eventLog);
}

async function syncUser(eventLog) {
  const enrollDeviceID = config.getConfigData().enroll_device.device_id;

	// Handle only the events of the enrollment device
	if(eventLog.deviceid != enrollDeviceID) {
		return;
	}

  var connectedIDs = await deviceMgr.getConnectedDevices(false);
  var targetDeviceIDs = config.getTargetDeviceIDs(connectedIDs);

  if(eventLog.eventcode == BS2_EVENT_USER_ENROLL_SUCCESS || eventLog.eventcode == BS2_EVENT_USER_UPDATE_SUCCESS) {
    console.log(`Trying to synchronize the enrolled user ${eventLog.userid}...`);

    var userInfos = await user.getUser(eventLog.deviceid, [eventLog.userid]);

    await user.enrollMulti(targetDeviceIDs, userInfos);

    var index = enrolledIDs.indexOf(eventLog.userid);
    if(index < 0) {
      enrolledIDs.push(eventLog.userid);
    }

		// Generate a MultiErrorResponse 
		// It should fail since the users are duplicated.
    /* try {
      await user.enrollMulti(targetDeviceIDs, userInfos);
    } catch(err) {
      const multiErr = errSvc.getMultiError(err);

      if(multiErr) {
        console.log('Enroll Multi Error: ', multiErr);
      }
    } */
  } else if(eventLog.eventcode == BS2_EVENT_USER_DELETE_SUCCESS) {
    console.log(`Trying to synchronize the deleted user ${eventLog.userid}...`);

    await user.deleteUserMulti(targetDeviceIDs, [eventLog.userid]);

    var index = enrolledIDs.indexOf(eventLog.userid);
    if(index >= 0) {
      enrolledIDs.splice(index, 1);
    }
  }
}

function printEvent(eventLog) {
  var userID = parseInt(eventLog.userid);

  if(isNaN(userID) || userID == 0xffffffff) {
    console.log(`[EVENT] ${new Date(eventLog.timestamp * 1000)}: Device ${eventLog.deviceid}, ${event.getEventString(eventLog.eventcode, eventLog.subcode)}`);
  } else {
    console.log(`[EVENT] ${new Date(eventLog.timestamp * 1000)}: Device ${eventLog.deviceid}, User ${eventLog.userid}, ${event.getEventString(eventLog.eventcode, eventLog.subcode)}`);
  }
}

module.exports.enrollUser = enrollUser;
module.exports.deleteUser = deleteUser;
module.exports.eventCallback = eventCallback;
module.exports.printEvent = printEvent;
module.exports.getNewUser = getNewUser;