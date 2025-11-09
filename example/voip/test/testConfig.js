const voip = require('../voip');
const menu = require('../../cli/menu');

async function test(devID, config) {
  try {
    // Backup the original configuration
    const origConfig = config.cloneMessage();

    console.log('\n', '===== Test for VoipConfig =====', '\n');

    config.setServerurl("voip.server.com");
    config.setServerport(554);
    config.setUserid("VOIP User ID");
    config.setUserpw("2378129307");
    config.setEnabled(true);

    await voip.setConfig(devID, config);

    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n'); 
    
    // Restore the original configuration
    await voip.setConfig(devID, origConfig);
  }
  catch(err) {
    console.error('Cannot finish the voip test: ', err);
    throw err;
  }
}

module.exports.test = test;