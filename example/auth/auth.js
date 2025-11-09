const authMessage = require('../../biostar/service/auth_pb');
const authService = require('../../biostar/service/auth_grpc_pb');

var authClient = null;

function initClient(addr, credential) {
  authClient = new authService.AuthClient(addr, credential);

  return authClient
}

function getClient() {
  return authClient;
}

function getConfig(devID) {
  var req = new authMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    authClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the auth config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}

function setConfig(devID, config) {
  var req = new authMessage.SetConfigRequest();
  req.setDeviceid(devID);
  req.setConfig(config);

  return new Promise((resolve, reject) => {
    authClient.setConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot set the auth config: ', err)
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
module.exports.authMessage = authMessage;
