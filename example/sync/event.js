const config = require('./config');
const event = require('../event');

const QUEUE_SIZE = 16;
const MAX_NUM_OF_LOG = 16384;

var sub = null;

function handleEvent(eventCallback) {
  sub = event.subscribe(QUEUE_SIZE);

  sub.on('data', (event) => {
    if(eventCallback != null) {
      eventCallback(event.toObject());
    } else {
      console.log('Event: ', event.toObject());
    }
  });

  sub.on('end', () => {
    console.log('Monitoring is finished');
  });

  sub.on('error', (err) => {
    if(err.details === 'Cancelled') {
      console.log("Monitoring is cancelled");
    } else {
      console.log('Monitoring error: ', err);
    }
  })
}

function stopHandleEvent() {
  if(sub != null) {
    sub.cancel();
  }
}

async function readNewLog(devInfo, maxNumOfLog) {
  var eventLogs = await event.getLog(devInfo.device_id, devInfo.last_event_id + 1, maxNumOfLog);

  if(eventLogs.length > 0) {
    config.updateLastEventID(devInfo.device_id, eventLogs[eventLogs.length - 1].getId());
  }

  return eventLogs;
}

async function connectionCallback(devID) {
  console.log(`***** Device ${devID} is connected`);

  var dev = config.getDeviceInfo(devID);
  if(dev == null) {
    console.log(`!!! Device ${devID} is not in the configuration file`);
    return;
  }

  // read new logs
  var eventLogs = [];

  while(true) {
    console.log(`[${devID}] Reading log records starting from ${dev.last_event_id}`);

    var newLogs = await readNewLog(dev, MAX_NUM_OF_LOG);

    console.log(`[${devID}] Read ${newLogs.length} events`);

    eventLogs.push(...newLogs);

    if(newLogs.length < MAX_NUM_OF_LOG) {// read the last log
      break;
    }
  }

	// do something with the event logs
	// ...
	console.log(`[${devID}] The total number of new events: ${eventLogs.length}`);

	// enable real-time monitoring  
  await event.enableMonitoring(devID);
}

module.exports.handleEvent = handleEvent;
module.exports.stopHandleEvent = stopHandleEvent;
module.exports.connectionCallback = connectionCallback;
module.exports.readNewLog = readNewLog;
module.exports.MAX_NUM_OF_LOG = MAX_NUM_OF_LOG;