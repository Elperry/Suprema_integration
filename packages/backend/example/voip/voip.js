const voipMessage = require('../../biostar/service/voip_pb');
const voipService = require('../../biostar/service/voip_grpc_pb');

var voipClient = null;

function initClient(addr, credential) {
  voipClient = new voipService.VOIPClient(addr, credential);

  return voipClient
}

function getClient() {
  return voipClient;
}

function getConfig(devID) {
  var req = new voipMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    voipClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the voip config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}

function setConfig(devID, config) {
  var req = new voipMessage.SetConfigRequest();
  req.setDeviceid(devID);
  req.setConfig(config);

  return new Promise((resolve, reject) => {
    voipClient.setConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot set the voip config: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


function getTemperatureLog(devID, startEventID, maxNumOfLog) {
  var req = new voipMessage.GetTemperatureLogRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);

  return new Promise((resolve, reject) => {
    voipClient.getTemperatureLog(req, (err, response) => {
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
module.exports.voipMessage = voipMessage;
module.exports.getTemperatureLog = getTemperatureLog;
