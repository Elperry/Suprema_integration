const apb = require('../apb');
const menu = require('../../cli/menu');
const util = require('../../util');
const action = require('../../action');

const TEST_ZONE_ID = 1;

async function test(devID, slaves) {
  try {
    // Backup the original zones
    const origZones = await apb.get(devID);
    console.log('Original APB Zones: ', util.toObjectArray(origZones));    
    await apb.deleteAll(devID);

    const testZone = makeZone(devID, slaves);
    apb.add(devID, [testZone]);

    console.log('===== Anti Passback Zone Test =====', '\n');
    console.log(`Test Zone: ${JSON.stringify(testZone.toObject())}`, '\n');

    console.log(`>> Authenticate a regsistered credential on the entry device(${devID}) and/or the exit device(${slaves[0].getDeviceid()}) to test if the APB zone works correctly`);
    await menu.pressEnter('>> Press ENTER for the next test.\n');

    await menu.pressEnter('>> Press ENTER after generating an APB violation.\n');

    await apb.clearAll(devID, TEST_ZONE_ID);

    console.log('>> The APB records are cleared. Try to authenticate the last credential which caused the APB violation. It should succeed since the APB records are cleared.');
    await menu.pressEnter('>> Press ENTER to finish the test.\n');

    // Restore the original zones
    await apb.deleteAll(devID);
    if(origZones.length > 0) {
      await apb.add(devID, origZones);
    } 
  }
  catch(err) {
    console.error('Cannot finish the apb zone test: ', err);
    throw err;
  }
}

function makeZone(devID, slaves) {
  const entryDevice = new apb.apbZoneMessage.Member();
  entryDevice.setDeviceid(devID);
  entryDevice.setReadertype(apb.apbZoneMessage.ReaderType.ENTRY);

  const exitDevice = new apb.apbZoneMessage.Member();
  exitDevice.setDeviceid(slaves[0].getDeviceid());
  exitDevice.setReadertype(apb.apbZoneMessage.ReaderType.EXIT);

  const relaySignal = new action.actionMessage.Signal();
  relaySignal.setCount(3);
  relaySignal.setOnduration(500);
  relaySignal.setOffduration(500);

  const relayAction = new action.actionMessage.RelayAction();
  relayAction.setRelayindex(0);
  relayAction.setSignal(relaySignal);

  const zoneAction = new action.actionMessage.Action();
  zoneAction.setDeviceid(devID);
  zoneAction.setType(action.actionMessage.ActionType.ACTION_RELAY);
  zoneAction.setRelay(relayAction);
  
  const zone = new apb.apbZoneMessage.ZoneInfo();
  zone.setZoneid(TEST_ZONE_ID);
  zone.setName("Test APB Zone");
  zone.setType(apb.apbZoneMessage.Type.HARD);
  zone.setResetduration(0); // indefinite
  zone.addMembers(entryDevice);
  zone.addMembers(exitDevice);
  zone.addActions(zoneAction);

  return zone;
}

module.exports.test = test;