const face = require('../face');
const fs = require('fs');

const IMAGE_FILENAME = './face.bmp';

async function test(devID) {
  try {
    const config = await face.getConfig(devID);
    console.log('Face config: ', config.toObject());

    console.log('>>> Scan a face...');

    const faceData = await face.scan(devID, config.getEnrollthreshold());
    console.log('Face data: ', faceData.toObject());

    fs.writeFileSync(IMAGE_FILENAME, faceData.getImagedata_asU8());
  }
  catch(err) {
    console.error('Cannot finish the face test: ', err);
    throw err;
  }
}

module.exports.test = test;