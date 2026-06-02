const event = require('../../event');
const util = require('../../util');

const EVENT_QUEUE_SIZE = 16;
const MAX_NUM_OF_LOG = 32;

const FIRST_DOOR_EVENT = 0x5000; // BS2_EVENT_DOOR_UNLOCKED
const LAST_DOOR_EVENT = 0x5E00; // BS2_EVENT_DOOR_UNLOCK

var firstEventID = 0;
var sub = null;

async function startMonitoring(devID) {
  try {
    await event.enableMonitoring(devID);
    console.log('Enable Monitoring');

    sub = event.subscribe(EVENT_QUEUE_SIZE);

    sub.on('data', (event) => {
      if(firstEventID == 0) {
        firstEventID = event.getId();
      }

      printEvent(event.toObject());
    });

    sub.on('end', () => {
      console.log('Subscription is finished');
    });

    sub.on('error', (err) => {
      if(err.details === 'Cancelled') {
        console.log("Subscription is cancelled");
      } else {
        console.log('Subscription error: ', err);
      }
    })
  }
  catch(err) {
    console.error('Cannot start monitoring: ', err);
    throw err;
  }
}


async function stopMonitoring(devID) {
  try {
    await event.disableMonitoring(devID);
    if(sub) {
      sub.cancel();
    }
  }
  catch(err) {
    console.error('Cannot stop monitoring: ', err);
    throw err;
  }
}


function printEvent(eventLog) {
  if(eventLog.eventcode >= FIRST_DOOR_EVENT && eventLog.eventcode <= LAST_DOOR_EVENT) {
    console.log(`${new Date(eventLog.timestamp * 1000)}: Door ${eventLog.entityid}, ${event.getEventString(eventLog.eventcode, eventLog.subcode)}`);
  } else {
    var userID = parseInt(eventLog.userid);

    if(isNaN(userID) || userID == 0xffffffff) {
      console.log(`${new Date(eventLog.timestamp * 1000)}: Device ${eventLog.deviceid}, ${event.getEventString(eventLog.eventcode, eventLog.subcode)}`);
    } else {
      console.log(`${new Date(eventLog.timestamp * 1000)}: Device ${eventLog.deviceid}, User ${eventLog.userid}, ${event.getEventString(eventLog.eventcode, eventLog.subcode)}`);
    }
  }
}


async function getUserID(devID) {
  const events = util.toObjectArray(await event.getLog(devID, firstEventID, MAX_NUM_OF_LOG));

  for(let i = 0; i < events.length; i++) {
    if(events[i].eventcode == 0x1900) { // BS2_EVENT_ACCESS_DENIED
      return events[i].userid;
    }
  }

  return null;
}

module.exports.startMonitoring = startMonitoring;
module.exports.stopMonitoring = stopMonitoring;
module.exports.getUserID = getUserID;