const menu = require('../cli/menu');
const config = require('./config');
const deviceMgr = require('./device');
const userMgr = require('./user');
const eventMgr = require('./event');
const util = require('../util');

const DEFAULT_USER_ID = '1234';
const MAX_NEW_LOG = 16;

async function showMenu(done) {
  var menuItems = [];
  
  menuItems.push(new menu.MenuItem('1', 'Show test devices', showDevice, false));
  menuItems.push(new menu.MenuItem('2', 'Show new events', showEvent, false));
  menuItems.push(new menu.MenuItem('3', 'Show new users', showUser, false));
  menuItems.push(new menu.MenuItem('4', 'Enroll a user', enrollUser, false));
  menuItems.push(new menu.MenuItem('5', 'Delete a user', deleteUser, false));
  menuItems.push(new menu.MenuItem('q', 'Quit', done, true));

  menu.showMenu('Test Menu', menuItems)  
}

async function showDevice() {
	console.log('***** Test Configuration: ', config.getConfigData());
  console.log('***** Connected Devices: ', await deviceMgr.getConnectedDevices(true));
}

async function showEvent() {
  var devIDs = await deviceMgr.getConnectedDevices(false);

  for(devID of devIDs) {
    var devInfo = config.getDeviceInfo(devID);
    if(devInfo == null) {
      console.log(`Device ${devID} is not in the configuration file`);
      continue;
    }

    console.log(`Read new event logs from device ${devID}...`);
    var eventLogs = await eventMgr.readNewLog(devInfo, eventMgr.MAX_NUM_OF_LOG);
    console.log(`Read ${eventLogs.length} event logs`);

    var numOfLog = eventLogs.length;
    if(numOfLog > MAX_NEW_LOG) {
      numOfLog = MAX_NEW_LOG;
    }

    if(numOfLog > 0) {
      console.log(`Show the last ${numOfLog} events...`);
      for(let i = 0; i < numOfLog; i++) {
        userMgr.printEvent(eventLogs[numOfLog - i - 1].toObject());
      }
    }
  }
}

async function showUser() {
  var devIDs = await deviceMgr.getConnectedDevices(false);

  for(devID of devIDs) {
    console.log(`Read new users from device ${devID}...`);

    var userInfos = await userMgr.getNewUser(devID);

    if(userInfos != null && userInfos.length > 0) {
      console.log('New User: ', util.toObjectArray(userInfos));
    }
  }
}

async function enrollUser() {
  await userMgr.enrollUser(getUserID());
}

async function deleteUser() {
  await userMgr.deleteUser(getUserID());
}

function getUserID() {
  var userInputs = [];
  userInputs.push(new menu.UserInput('Enter the user ID', DEFAULT_USER_ID));
  var inputs = menu.getUserInput(userInputs);
 
  return inputs[0];
}


module.exports.showMenu = showMenu;