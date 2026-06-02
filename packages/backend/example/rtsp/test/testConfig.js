const rtsp = require('../rtsp');
const menu = require('../../cli/menu');

async function test(devID, config) {
  try {
    // Backup the original configuration
    const origConfig = config.cloneMessage();

    console.log('\n', '===== Test for RtspConfig =====', '\n');

    config.setServerurl("rtsp.server.com");
    config.setServerport(554);
    config.setUserid("RTSP User ID");
    config.setUserpw("2378129307");
    config.setEnabled(true);

    await rtsp.setConfig(devID, config);

    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n'); 
    
    // Restore the original configuration
    await rtsp.setConfig(devID, origConfig);
  }
  catch(err) {
    console.error('Cannot finish the rtsp test: ', err);
    throw err;
  }
}

module.exports.test = test;