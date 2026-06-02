const actionMessage = require('../../biostar/service/action_pb');
const actionService = require('../../biostar/service/action_grpc_pb');

var actionClient = null;

function initClient(addr, credential) {
  actionClient = new actionService.TriggerActionClient(addr, credential);

  return actionClient
}

function getClient() {
  return actionClient;
}

function getConfig(devID) {
  var req = new actionMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    actionClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the action config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}

function setConfig(devID, config) {
  var req = new actionMessage.SetConfigRequest();
  req.setDeviceid(devID);
  req.setConfig(config);

  return new Promise((resolve, reject) => {
    actionClient.setConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot set the action config: ', err)
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
module.exports.actionMessage = actionMessage;
