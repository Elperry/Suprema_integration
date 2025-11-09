const event = require('../../event');

const EVENT_QUEUE_SIZE = 16;

const FIRST_APB_EVENT = 0x6000; // BS2_EVENT_ZONE_APB_VIOLATION
const LAST_APB_EVENT = 0x6200; // BS2_EVENT_ZONE_APB_ALARM_CLEAR

var sub = null;

async function startMonitoring(devID) {
  try {
    await event.enableMonitoring(devID);
    console.log('Enable Monitoring');

    sub = event.subscribe(EVENT_QUEUE_SIZE);

    sub.on('data', (event) => {
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
  var userID = parseInt(eventLog.userid);

  if(eventLog.eventcode >= FIRST_APB_EVENT && eventLog.eventcode <= LAST_APB_EVENT) {
    if(isNaN(userID) || userID == 0xffffffff) {
      console.log(`${new Date(eventLog.timestamp * 1000)}: APB Zone ${eventLog.entityid}, ${event.getEventString(eventLog.eventcode, eventLog.subcode)}`);
    } else {
      console.log(`${new Date(eventLog.timestamp * 1000)}: APB Zone ${eventLog.entityid}, User ${eventLog.userid}, ${event.getEventString(eventLog.eventcode, eventLog.subcode)}`);
    }
  } else {
    if(isNaN(userID) || userID == 0xffffffff) {
      console.log(`${new Date(eventLog.timestamp * 1000)}: Device ${eventLog.deviceid}, ${event.getEventString(eventLog.eventcode, eventLog.subcode)}`);
    } else {
      console.log(`${new Date(eventLog.timestamp * 1000)}: Device ${eventLog.deviceid}, User ${eventLog.userid}, ${event.getEventString(eventLog.eventcode, eventLog.subcode)}`);
    }
  }
}

module.exports.startMonitoring = startMonitoring;
module.exports.stopMonitoring = stopMonitoring;
