const event = require('../../event');
const menu = require('../../cli/menu');
const util = require('../../util');

const EVENT_QUEUE_SIZE = 16;
const MAX_NUM_EVENT = 32;

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


async function test(devID) {
  try {
    console.log('\n', '===== Event Test =====', '\n');
    await menu.pressEnter('>> Try to authenticate credentials to check real-time monitoring. And, press ENTER to read the generated event logs.\n');

    if(firstEventID == 0) {
      console.log('\n', `>> There is no new event. Just read ${MAX_NUM_EVENT} event logs from the start.`);
    } else {
      console.log('\n', `>> Read new events starting from ${firstEventID}.`);
    }

    const events = util.toObjectArray(await event.getLog(devID, firstEventID, MAX_NUM_EVENT));

    for(i = 0; i < events.length; i++) {
      printEvent(events[i]);
    }
    
    if(events.length > 0 && firstEventID != 0) {
      var eventFilter = new event.eventMessage.EventFilter();
      eventFilter.setEventcode(events[0].eventcode);

      console.log('\n', `>> Filter with event code ${events[0].eventcode}.`);

      const filteredEvents = util.toObjectArray(await event.getLogWithFilter(devID, firstEventID, MAX_NUM_EVENT, eventFilter));
      for(i = 0; i < filteredEvents.length; i++) {
        printEvent(filteredEvents[i]);
      }
    }
  }
  catch(err) {
    console.error('Cannot get event logs: ', err);
    throw err;
  }
}

function printEvent(logEvent) {
  var userID = parseInt(logEvent.userid);

  if(isNaN(userID) || userID == 0xffffffff) {
    console.log(`${new Date(logEvent.timestamp * 1000)}: Device ${logEvent.deviceid}, ${event.getEventString(logEvent.eventcode, logEvent.subcode)}`);
  } else {
    console.log(`${new Date(logEvent.timestamp * 1000)}: Device ${logEvent.deviceid}, User ${logEvent.userid}, ${event.getEventString(logEvent.eventcode, logEvent.subcode)}`);
  }
}

module.exports.test = test;
module.exports.startMonitoring = startMonitoring;
module.exports.stopMonitoring = stopMonitoring;