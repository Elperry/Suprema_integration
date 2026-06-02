const connectMasterMessage = require('../../biostar/service/connect_master_pb');
const connectMaster = require('./connectMaster');

function enableSSL(deviceIDs) {
  var req = new connectMasterMessage.EnableSSLMultiRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().enableSSLMulti(req, (err, response) => {
      if(err) {
        console.error('Cannot enable SSL: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


function disableSSL(deviceIDs) {
  var req = new connectMasterMessage.DisableSSLMultiRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().disableSSLMulti(req, (err, response) => {
      if(err) {
        console.error('Cannot disable SSL: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


module.exports.enableSSL = enableSSL;
module.exports.disableSSL = disableSSL;
