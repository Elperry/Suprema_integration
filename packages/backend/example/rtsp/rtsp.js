const rtspMessage = require('../../biostar/service/rtsp_pb');
const rtspService = require('../../biostar/service/rtsp_grpc_pb');

var rtspClient = null;

function initClient(addr, credential) {
  rtspClient = new rtspService.RTSPClient(addr, credential);

  return rtspClient
}

function getClient() {
  return rtspClient;
}

function getConfig(devID) {
  var req = new rtspMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    rtspClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the rtsp config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}

function setConfig(devID, config) {
  var req = new rtspMessage.SetConfigRequest();
  req.setDeviceid(devID);
  req.setConfig(config);

  return new Promise((resolve, reject) => {
    rtspClient.setConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot set the rtsp config: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


function getTemperatureLog(devID, startEventID, maxNumOfLog) {
  var req = new rtspMessage.GetTemperatureLogRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);

  return new Promise((resolve, reject) => {
    rtspClient.getTemperatureLog(req, (err, response) => {
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
module.exports.rtspMessage = rtspMessage;
module.exports.getTemperatureLog = getTemperatureLog;
