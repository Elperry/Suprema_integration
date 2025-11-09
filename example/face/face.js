const faceMessage = require('../../biostar/service/face_pb');
const faceService = require('../../biostar/service/face_grpc_pb');

var faceClient = null;

function initClient(addr, credential) {
  faceClient = new faceService.FaceClient(addr, credential);

  return faceClient
}

function getClient() {
  return faceClient;
}

function scan(devID, threshold) {
  var req = new faceMessage.ScanRequest();
  req.setDeviceid(devID);
  req.setEnrollthreshold(threshold);

  return new Promise((resolve, reject) => {
    faceClient.scan(req, (err, response) => {
      if(err) {
        console.error('Cannot scan a face: ', err)
        reject(err);
        return;
      }

      resolve(response.getFacedata());
    });
  });
}


function getConfig(devID) {
  var req = new faceMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    faceClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the face config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}


module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.scan = scan;
module.exports.getConfig = getConfig;
module.exports.faceMessage = faceMessage;
