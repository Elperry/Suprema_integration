const connectMasterMessage = require('../../biostar/service/connect_master_pb');
const connectMaster = require('./connectMaster');

function setConnectionMode(deviceIDs, mode) {
  var req = new connectMasterMessage.SetConnectionModeMultiRequest();
  req.setDeviceidsList(deviceIDs);
  req.setConnectionmode(mode);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().setConnectionModeMulti(req, (err, response) => {
      if(err) {
        console.error('Cannot set the connectMasterion mode: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

module.exports.setConnectionMode = setConnectionMode;
