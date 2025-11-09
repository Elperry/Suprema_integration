import displayMessage from '../../biostar/service/display_pb.js';
import displayService from '../../biostar/service/display_grpc_pb.js';

var displayClient = null;

function initClient(addr, credential) {
  displayClient = new displayService.DisplayClient(addr, credential);

  return displayClient
}

function getClient() {
  return displayClient;
}

function getConfig(devID) {
  var req = new displayMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    displayClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the display config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}

module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getConfig = getConfig;
module.exports.displayMessage = displayMessage;
