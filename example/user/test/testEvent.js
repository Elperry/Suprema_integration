const event = require('../../event');
const util = require('../../util');

const EVENT_QUEUE_SIZE = 16;

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

      console.log('Event: ', event.toObject());
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


async function test(devID, userID) {
  try {
    console.log('\n', '===== Log Events of Test User =====', '\n');

    var eventFilter = new event.eventMessage.EventFilter();
    eventFilter.setUserid(userID);

    var events = util.toObjectArray(await event.getLogWithFilter(devID, firstEventID, 0, eventFilter));

    for(i = 0; i < events.length; i++) {
      printEvent(events[i]);
    } 
    
    console.log('\n', '===== Verify Success Events of Test User =====', '\n');
    
    eventFilter.setEventcode(0x1000); // BS2_EVENT_VERIFY_SUCCESS

    events = util.toObjectArray(await event.getLogWithFilter(devID, firstEventID, 0, eventFilter));

    for(i = 0; i < events.length; i++) {
      printEvent(events[i]);
    }     
  }
  catch(err) {
    console.error('Cannot get user logs: ', err);
    throw err;
  }
}

function printEvent(logEvent) {
  console.log(`${new Date(logEvent.timestamp * 1000)}: Device ${logEvent.deviceid}, User ${logEvent.userid}, ${event.getEventString(logEvent.eventcode, logEvent.subcode)}`);
}

module.exports.test = test;
module.exports.startMonitoring = startMonitoring;
module.exports.stopMonitoring = stopMonitoring;