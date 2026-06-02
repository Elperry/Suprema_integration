const event = require('../event');
const util = require('../util');
const fs = require('fs');

const MAX_NUM_OF_LOG = 16;
const MAX_NUM_OF_IMAGE_LOG = 2;
const LOG_IMAGE_NAME = "./image_log.jpg";
const EVENT_QUEUE_SIZE = 16;


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testRealtime(devID) {
  try {
    await event.enableMonitoring(devID);

    const sub = event.subscribe(EVENT_QUEUE_SIZE);

    sub.on('data', (event) => {
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

    console.log('>>> Generate events for 10 seconds');  
    await wait(10000);

    sub.cancel();
    await event.disableMonitoring(devID);
  }
  catch(err) {
    console.error('Cannot finish the realtime event test: ', err);
    throw err;
  }
}


async function test(devID) {
  try {
    const events = util.toObjectArray(await event.getLog(devID, 0, MAX_NUM_OF_LOG));
    console.log('Events: ', events);

    const imageEvents = await event.getImageLog(devID, 0, MAX_NUM_OF_IMAGE_LOG);
    if(imageEvents.length > 0) {
      let buf = Buffer.from(imageEvents[0].toObject().jpgimage, 'base64');

      fs.writeFileSync(LOG_IMAGE_NAME, buf);
    }   

    await testRealtime(devID)
  }
  catch(err) {
    console.error('Cannot finish the event test: ', err);
    throw err;
  }
}

module.exports.test = test;