const event = require('../../event');

const EVENT_QUEUE_SIZE = 16;

var sub = null;

async function startMonitoring(devID) {
  try {
    await event.enableMonitoring(devID);
    console.log('Enable Monitoring');

    sub = await event.subscribe(EVENT_QUEUE_SIZE);

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


function printEvent(logEvent) {
  var userID = parseInt(logEvent.userid);

  if(isNaN(userID) || userID == 0xffffffff) {
    console.log(`${new Date(logEvent.timestamp * 1000)}: Device ${logEvent.deviceid}, ${event.getEventString(logEvent.eventcode, logEvent.subcode)}`);
  } else {
    console.log(`${new Date(logEvent.timestamp * 1000)}: Device ${logEvent.deviceid}, User ${logEvent.userid}, ${event.getEventString(logEvent.eventcode, logEvent.subcode)}`);
  }
}

module.exports.startMonitoring = startMonitoring;
module.exports.stopMonitoring = stopMonitoring;