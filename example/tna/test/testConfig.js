const tna = require('../tna');
const menu = require('../../cli/menu');

async function test(devID) {
  try {
    // Backup the original configuration
    const origConfig = await tna.getConfig(devID);
    console.log('Original T&A Config: ', origConfig.toObject());    

    console.log('\n', '===== Test for TNAConfig =====', '\n');

    // (1) BY_USER
    var config = new tna.tnaMessage.TNAConfig();
    config.setMode(tna.tnaMessage.Mode.BY_USER);
    config.setLabelsList(['In', 'Out', 'Scheduled In', 'Fixed Out']);

    await tna.setConfig(devID, config);

    console.log('(1) The T&A mode is set to BY_USER(optional). You can select a T&A key before authentication. Try to authenticate after selecting a T&A key.', '\n');
    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');
    
    // (2) IsRequired
    config.setIsrequired(true);

    await tna.setConfig(devID, config);

    console.log('(2) The T&A mode is set to BY_USER(mandatory). Try to authenticate without selecting a T&A key.', '\n');
    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');

    // (3) LAST_CHOICE
    config.setMode(tna.tnaMessage.Mode.LAST_CHOICE);

    await tna.setConfig(devID, config);

    console.log('(3) The T&A mode is set to LAST_CHOICE. The T&A key selected by the previous user will be used. Try to authenticate multiple users.', '\n');
    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');    

    // (4) BY_SCHEDULE
    config.setMode(tna.tnaMessage.Mode.BY_SCHEDULE);
    config.setSchedulesList([0, 0, 1]); // Always for KEY_3 (Scheduled In)

    await tna.setConfig(devID, config);

    console.log('(4) The T&A mode is set to BY_SCHEDULE. The T&A key will be determined automatically by schedule. Try to authenticate without selecting a T&A key.', '\n');
    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');    
    
    // (5) FIXED    
    config.setMode(tna.tnaMessage.Mode.FIXED);
    config.setKey(tna.tnaMessage.Key.KEY_4);

    await tna.setConfig(devID, config);

    console.log('(5) The T&A mode is set to FIXED(KEY_4). Try to authenticate without selecting a T&A key.', '\n');
    await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');

    return origConfig;
  }
  catch(err) {
    console.error('Cannot finish the tna test: ', err);
    throw err;
  }
}

module.exports.test = test;