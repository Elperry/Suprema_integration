const connectMasterMessage = require('../../biostar/service/connect_master_pb');
const connectMaster = require('./connectMaster');

function addAsyncConnection(gatewayID, connInfos) {
  var req = new connectMasterMessage.AddAsyncConnectionRequest();
  req.setGatewayid(gatewayID);
  req.setConnectinfosList(connInfos);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().addAsyncConnection(req, (err, response) => {
      if(err) {
        console.error('Cannot add async connection: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

function deleteAsyncConnection(gatewayID, deviceIDs) {
  var req = new connectMasterMessage.DeleteAsyncConnectionRequest();
  req.setGatewayid(gatewayID);
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().deleteAsyncConnection(req, (err, response) => {
      if(err) {
        console.error('Cannot delete async connection: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

module.exports.addAsyncConnection = addAsyncConnection;
module.exports.deleteAsyncConnection = deleteAsyncConnection;
