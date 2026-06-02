const connectMessage = require('../../biostar/service/connect_pb');
const connectMasterMessage = require('../../biostar/service/connect_master_pb');
const connectMaster = require('./connectMaster');

function connectToDevice(gatewayID, addr, port, useSSL) {
  var connInfo = new connectMessage.ConnectInfo();
  connInfo.setIpaddr(addr);
  connInfo.setPort(port);
  connInfo.setUsessl(useSSL);

  var req = new connectMasterMessage.ConnectRequest();
  req.setGatewayid(gatewayID);
  req.setConnectinfo(connInfo);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().connect(req, (err, response) => {
      if(err) {
        console.error('Cannot connectMaster to the device: ', err)
        reject(err);
        return;
      }

      resolve(response.getDeviceid());
    });
  });
}

function disconnect(deviceIDs) {
  var req = new connectMasterMessage.DisconnectRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().disconnect(req, (err, response) => {
      if(err) {
        console.error('Cannot disconnect: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


function disconnectAll(gatewayID) {
  var req = new connectMasterMessage.DisconnectAllRequest();
  req.setGatewayid(gatewayID);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().disconnectAll(req, (err, response) => {
      if(err) {
        console.error('Cannot disconnect all: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


module.exports.connectToDevice = connectToDevice;
module.exports.disconnect = disconnect;
module.exports.disconnectAll = disconnectAll;