const thermalMessage = require('../../biostar/service/thermal_pb');
const thermalService = require('../../biostar/service/thermal_grpc_pb');

var thermalClient = null;

function initClient(addr, credential) {
  thermalClient = new thermalService.ThermalClient(addr, credential);

  return thermalClient
}

function getClient() {
  return thermalClient;
}

function getConfig(devID) {
  var req = new thermalMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    thermalClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the thermal config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}

function setConfig(devID, config) {
  var req = new thermalMessage.SetConfigRequest();
  req.setDeviceid(devID);
  req.setConfig(config);

  return new Promise((resolve, reject) => {
    thermalClient.setConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot set the thermal config: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


function getTemperatureLog(devID, startEventID, maxNumOfLog) {
  var req = new thermalMessage.GetTemperatureLogRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);

  return new Promise((resolve, reject) => {
    thermalClient.getTemperatureLog(req, (err, response) => {
      if(err) {
        console.error('Cannot get the log: ', err)
        reject(err);
        return;
      }

      resolve(response.getTemperatureeventsList());
    })
  })
}

module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getConfig = getConfig;
module.exports.setConfig = setConfig;
module.exports.thermalMessage = thermalMessage;
module.exports.getTemperatureLog = getTemperatureLog;
