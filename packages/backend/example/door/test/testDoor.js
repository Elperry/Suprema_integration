const door = require('../door');
const device = require('../../device');
const menu = require('../../cli/menu');
const util = require('../../util');
const access = require('../../access');
const user = require('../../user');
const testEvent = require('./testEvent');

const TEST_DOOR_ID = 1;
const TEST_ACCESS_LEVEL_ID = 1;
const TEST_ACCESS_GROUP_ID = 1;
const ALWAYS_SCHEDULE_ID = 1; // ID 1 is reserved for 'always' 

async function test(devID) {
  try {
    // Backup the original doors
    const origDoors = await door.getList(devID);
    console.log('Original Doors: ', util.toObjectArray(origDoors));    

    await testDoor(devID);
    await testAccessGroup(devID);

    // Restore the original doors
    await door.deleteAll(devID);
    if(origDoors.length > 0) {
      await door.add(devID, origDoors);
    } 
  }
  catch(err) {
    console.error('Cannot finish the door test: ', err);
    throw err;
  }
}

async function testDoor(devID) {
  const relay = new door.doorMessage.Relay();
  relay.setDeviceid(devID);
  relay.setPort(0); // 1st relay

  const sensor = new door.doorMessage.Sensor();
  sensor.setDeviceid(devID);
  sensor.setPort(0); // 1st input port
  sensor.setType(device.deviceMessage.SwitchType.NORMALLY_OPEN);

  const button = new door.doorMessage.ExitButton();
  sensor.setDeviceid(devID);
  sensor.setPort(1); // 2nd input port
  sensor.setType(device.deviceMessage.SwitchType.NORMALLY_OPEN);

  const doorInfo = new door.doorMessage.DoorInfo();
  doorInfo.setDoorid(TEST_DOOR_ID);
  doorInfo.setName('Test Door');
  doorInfo.setEntrydeviceid(devID);
  doorInfo.setRelay(relay);
  doorInfo.setSensor(sensor);
  doorInfo.setButton(button);
  doorInfo.setAutolocktimeout(3); // locked after 3 seconds
  doorInfo.setHeldopentimeout(10); // held open alarm after 10 seconds

  await door.deleteAll(devID);
  await door.add(devID, [doorInfo]);

  console.log('\n', '===== Door Test =====', '\n');
  const testDoors = await door.getList(devID);
  console.log('Test Doors: ', util.toObjectArray(testDoors));    

  console.log('>> Try to authenticate a registered credential. It should fail since you can access a door only with a proper access group.');
  await menu.pressEnter('>> Press ENTER for the next test.\n');
}


async function testAccessGroup(devID) {
  const userID = await testEvent.getUserID(devID);
  if(userID == null) {
    console.log('!! Cannot find ACCESS_DENIED event. You should have tried to authenticate a registered credentail for the test.');
    return;
  }

  // Backup access groups
  const origGroups = await access.getList(devID);
  const origLevels = await access.getLevelList(devID);
  const origUserAccessGroups = await user.getAccessGroup(devID, [userID]);

  console.log('Original Access Groups: ', util.toObjectArray(origGroups));   
  console.log('Original Access Levels: ', util.toObjectArray(origLevels));   
  console.log('Original User Access Groups: ', util.toObjectArray(origUserAccessGroups));   

  await access.deleteAll(devID);
  await access.deleteAllLevel(devID);

  // Make an access group and assign it to the user
  const doorSchedule = new access.accessMessage.DoorSchedule(); // can access the test door all the time
  doorSchedule.setDoorid(TEST_DOOR_ID);
  doorSchedule.setScheduleid(ALWAYS_SCHEDULE_ID);

  const accessLevel = new access.accessMessage.AccessLevel();
  accessLevel.setId(TEST_ACCESS_LEVEL_ID);
  accessLevel.setName('Test Access Level');
  accessLevel.addDoorschedules(doorSchedule); 

  await access.addLevel(devID, [accessLevel]);

  const accessGroup = new access.accessMessage.AccessGroup();
  accessGroup.setId(TEST_ACCESS_GROUP_ID);
  accessLevel.setName('Test Access Group');
  accessGroup.addLevelids(TEST_ACCESS_LEVEL_ID);

  await access.add(devID, [accessGroup]);

  const userAccessGroup = new user.userMessage.UserAccessGroup();
  userAccessGroup.setUserid(userID);
  userAccessGroup.addAccessgroupids(TEST_ACCESS_GROUP_ID);

  await user.setAccessGroup(devID, [userAccessGroup]);

  const newGroups = await access.getList(devID);
  const newLevels = await access.getLevelList(devID);
  const newUserAccessGroups = await user.getAccessGroup(devID, [userID]);

  console.log('Test Access Groups: ', util.toObjectArray(newGroups));   
  console.log('Test Access Levels: ', util.toObjectArray(newLevels));   
  console.log('Test User Access Groups: ', util.toObjectArray(newUserAccessGroups));     

  console.log('>> Try to authenticate the same registered credential. It should succeed since the access group is added.');
  await menu.pressEnter('>> Press ENTER for the next test.\n');

  await testLock(devID);

  // Restore access groups
  await user.setAccessGroup(devID, origUserAccessGroups);
  await access.deleteAll(devID);
  if(origGroups.length > 0) {
    await access.add(devID, origGroups);
  }
  await access.deleteAllLevel(devID);
  if(origLevels.length > 0) {
    await access.addLevel(devID, origLevels);
  }
}


async function testLock(devID) {
  await menu.pressEnter('>> Press ENTER to unlock the door.\n');
  await door.unlock(devID, [TEST_DOOR_ID], door.doorMessage.DoorFlag.OPERATOR);

  doorStatus = await door.getStatus(devID);
  console.log('Status after unlocking the door: ', util.toObjectArray(doorStatus));  

  await menu.pressEnter('>> Press ENTER to lock the door.\n');
  await door.lock(devID, [TEST_DOOR_ID], door.doorMessage.DoorFlag.OPERATOR);

  var doorStatus = await door.getStatus(devID);
  console.log('Status after locking the door: ', util.toObjectArray(doorStatus));  

  console.log('>> Try to authenticate the same registered credential. The relay should not work since the door is locked by the operator with the higher priority.');
  await menu.pressEnter('>> Press ENTER to release the door flag.\n');

  await door.release(devID, [TEST_DOOR_ID], door.doorMessage.DoorFlag.OPERATOR);

  doorStatus = await door.getStatus(devID);
  console.log('Status after releasing the door flag: ', util.toObjectArray(doorStatus));  

  console.log('>> Try to authenticate the same registered credential. The relay should work since the door flag is cleared.');

  await menu.pressEnter('>> Press ENTER for the next test.\n');
}


module.exports.test = test;