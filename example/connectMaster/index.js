import connectMaster from './connectMaster.js';
import sync from './sync.js';
import async from './async.js';
import accept from './accept.js';
import mode from './mode.js';
import ssl from './ssl.js';

module.exports.initClient = connectMaster.initClient;
module.exports.getDeviceList = connectMaster.getDeviceList;
module.exports.searchDevice = connectMaster.searchDevice;
module.exports.subscribe = connectMaster.subscribe;
module.exports.connectMessage = connectMaster.connectMessage;

module.exports.connectToDevice = sync.connectToDevice;
module.exports.disconnect = sync.disconnect;
module.exports.disconnectAll = sync.disconnectAll;

module.exports.addAsyncConnection = async.addAsyncConnection;
module.exports.deleteAsyncConnection = async.deleteAsyncConnection;

module.exports.getPendingList = accept.getPendingList;
module.exports.getAcceptFilter = accept.getAcceptFilter;
module.exports.setAcceptFilter = accept.setAcceptFilter;

module.exports.setConnectionMode = mode.setConnectionMode;

module.exports.enableSSL = ssl.enableSSL;
module.exports.disableSSL = ssl.disableSSL;

