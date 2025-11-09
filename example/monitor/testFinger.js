const finger = require('../finger');
const fs = require('fs');

const IMAGE_FILENAME = './finger.bmp';

async function test(devID) {
  try {
    const config = await finger.getConfig(devID);
    console.log('Finger config: ', config.toObject());

    console.log('>>> Scan a finger...');

    const templateData = await finger.scan(devID, config.getTemplateformat(), 50);
    console.log('Template: %d bytes', templateData.length);

    const bmpImage = await finger.getImage(devID);
    fs.writeFileSync(IMAGE_FILENAME, bmpImage);
  }
  catch(err) {
    console.error('Cannot finish the finger test: ', err);
    throw err;
  }
}

module.exports.test = test;