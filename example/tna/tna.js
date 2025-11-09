const tnaMessage = require('../../biostar/service/tna_pb');
const tnaService = require('../../biostar/service/tna_grpc_pb');

var tnaClient = null;

function initClient(addr, credential) {
  tnaClient = new tnaService.TNAClient(addr, credential);

  return tnaClient
}

function getClient() {
  return tnaClient;
}

function getConfig(devID) {
  var req = new tnaMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    tnaClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the tna config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}

function setConfig(devID, config) {
  var req = new tnaMessage.SetConfigRequest();
  req.setDeviceid(devID);
  req.setConfig(config);

  return new Promise((resolve, reject) => {
    tnaClient.setConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot set the tna config: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


function getTNALog(devID, startEventID, maxNumOfLog) {
  var req = new tnaMessage.GetTNALogRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);

  return new Promise((resolve, reject) => {
    tnaClient.getTNALog(req, (err, response) => {
      if(err) {
        console.error('Cannot get the log: ', err)
        reject(err);
        return;
      }

      resolve(response.getTnaeventsList());
    })
  })
}

module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getConfig = getConfig;
module.exports.setConfig = setConfig;
module.exports.tnaMessage = tnaMessage;
module.exports.getTNALog = getTNALog;
