const rs485Message = require('../../biostar/service/rs485_pb');
const rs485Service = require('../../biostar/service/rs485_grpc_pb');

var rs485Client = null;

function initClient(addr, credential) {
  rs485Client = new rs485Service.RS485Client(addr, credential);

  return rs485Client
}

function getClient() {
  return rs485Client;
}

function getConfig(devID) {
  var req = new rs485Message.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    rs485Client.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the rs485 config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}

function setConfig(devID, config) {
  var req = new rs485Message.SetConfigRequest();
  req.setDeviceid(devID);
  req.setConfig(config);

  return new Promise((resolve, reject) => {
    rs485Client.setConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot set the rs485 config: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

function searchSlave(devID) {
  var req = new rs485Message.SearchDeviceRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    rs485Client.searchDevice(req, (err, response) => {
      if(err) {
        console.error('Cannot search slave devices: ', err)
        reject(err);
        return;
      }

      resolve(response.getSlaveinfosList());
    });
  });
}

function getSlave(devID) {
  var req = new rs485Message.GetDeviceRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    rs485Client.getDevice(req, (err, response) => {
      if(err) {
        console.error('Cannot get slave devices: ', err)
        reject(err);
        return;
      }

      resolve(response.getSlaveinfosList());
    });
  });
}

function setSlave(devID, slaveInfos) {
  var req = new rs485Message.SetDeviceRequest();
  req.setDeviceid(devID);
  req.setSlaveinfosList(slaveInfos);

  return new Promise((resolve, reject) => {
    rs485Client.setDevice(req, (err, response) => {
      if(err) {
        console.error('Cannot set slave devices: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getConfig = getConfig;
module.exports.setConfig = setConfig;
module.exports.searchSlave = searchSlave;
module.exports.setSlave = setSlave;
module.exports.getSlave = getSlave;
module.exports.rs485Message = rs485Message;
