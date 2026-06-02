const connectMasterMessage = require('../../biostar/service/connect_master_pb');
const connectMasterService = require('../../biostar/service/connect_master_grpc_pb');

var connMasterClient = null;

function initClient(addr, credential) {
  connMasterClient = new connectMasterService.ConnectMasterClient(addr, credential);
}

function getClient() {
  return connMasterClient;
}

function getDeviceList(gatewayID) {
  var req = new connectMasterMessage.GetDeviceListRequest();
  req.setGatewayid(gatewayID);

  return new Promise((resolve, reject) => {
    connMasterClient.getDeviceList(req, (err, response) => {
      if(err) {
        console.error('Cannot get device list: ', err)
        reject(err);
        return;
      }

      resolve(response.getDeviceinfosList());
    });
  });
}


function searchDevice(gatewayID, timeout) {
  var req = new connectMasterMessage.SearchDeviceRequest();
  req.setGatewayid(gatewayID);
  req.setTimeout(timeout);

  return new Promise((resolve, reject) => {
    connMasterClient.searchDevice(req, (err, response) => {
      if(err) {
        console.error('Cannot search device: ', err)
        reject(err);
        return;
      }

      resolve(response.getDeviceinfosList());
    });
  });
}

function subscribe(queueSize) {
  var req = new connectMasterMessage.SubscribeStatusRequest();
  req.setQueuesize(queueSize);

  return connMasterClient.subscribeStatus(req);
}

module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getDeviceList = getDeviceList;
module.exports.searchDevice = searchDevice;
module.exports.subscribe = subscribe;
module.exports.connectMasterMessage = connectMasterMessage;
