const fs = require('fs');
const connect = require('../connect');

var configData = null;
var configFile = null;

function getConfigData() {
  return configData;
}

function readConfig(filename) {
  configFile = filename;
  
  var jsonData = fs.readFileSync(filename);
  configData = JSON.parse(jsonData);
}

function writeConfig() {
  fs.writeFileSync(configFile, JSON.stringify(configData, null, '\t'));
}

function getAsyncConnectInfo() {
  var connInfos = [];

  var connInfo = new connect.connectMessage.AsyncConnectInfo();
  connInfo.setDeviceid(configData.enroll_device.device_id);
  connInfo.setIpaddr(configData.enroll_device.ip_addr);
  connInfo.setPort(configData.enroll_device.port);
  connInfo.setUsessl(configData.enroll_device.use_ssl);
  connInfos.push(connInfo);

  for(dev of configData.devices) {
    connInfo = new connect.connectMessage.AsyncConnectInfo();
    connInfo.setDeviceid(dev.device_id);
    connInfo.setIpaddr(dev.ip_addr);
    connInfo.setPort(dev.port);
    connInfo.setUsessl(dev.use_ssl);
    connInfos.push(connInfo);
  }

  return connInfos;
}

function getDeviceInfo(devID) {
  if(devID == configData.enroll_device.device_id) {
    return configData.enroll_device;
  }

  for(dev of configData.devices) {
    if(devID == dev.device_id) {
      return dev;
    }
  }

  return null;
}

function updateLastEventID(devID, lastEventID) {
  var updated = false;

  if(devID == configData.enroll_device.device_id) {
    configData.enroll_device.last_event_id =  lastEventID;
    updated = true;
  } else {
    for(dev of configData.devices) {
      if(devID == dev.device_id) {
        dev.last_event_id = lastEventID;
        updated = true;
        break;
      }
    }
  }

  if(updated) {
    writeConfig();
  }
}

function getTargetDeviceIDs(connectedIDs) {
  var devIDs = [];

  for(connID of connectedIDs) {
    for(dev of configData.devices) {
      if(connID == dev.device_id) {
        devIDs.push(dev.device_id);
        break;
      }
    }
  }

  return devIDs;
}


module.exports.getConfigData = getConfigData;
module.exports.readConfig = readConfig;
module.exports.getAsyncConnectInfo = getAsyncConnectInfo;
module.exports.getDeviceInfo = getDeviceInfo;
module.exports.updateLastEventID = updateLastEventID;
module.exports.getTargetDeviceIDs = getTargetDeviceIDs;