import mainMenu from './mainMenu.js';
import deviceMenu from './deviceMenu.js';
import asyncMenu from './asyncMenu.js';
import acceptMenu from './acceptMenu.js';

module.exports.showMainMenu = mainMenu.showMenu;
module.exports.setGatewayID = mainMenu.setGatewayID;
module.exports.setSubChannel = mainMenu.setSubChannel;
module.exports.showDeviceMenu = deviceMenu.showMenu;
module.exports.showAsyncMenu = asyncMenu.showMenu;
module.exports.showAcceptMenu = acceptMenu.showMenu;