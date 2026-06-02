const connectMasterMessage = require('../../biostar/service/connect_master_pb');
const connectMaster = require('./connectMaster');

function getPendingList(gatewayID) {
  var req = new connectMasterMessage.GetPendingListRequest();
  req.setGatewayid(gatewayID);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().getPendingList(req, (err, response) => {
      if(err) {
        console.error('Cannot get the pending list: ', err)
        reject(err);
        return;
      }

      resolve(response.getDeviceinfosList());
    });
  });
}

function getAcceptFilter(gatewayID) {
  var req = new connectMasterMessage.GetAcceptFilterRequest();
  req.setGatewayid(gatewayID);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().getAcceptFilter(req, (err, response) => {
      if(err) {
        console.error('Cannot get the accept filter: ', err)
        reject(err);
        return;
      }

      resolve(response.getFilter());
    })
  })
}

function setAcceptFilter(gatewayID, filter) {
  var req = new connectMasterMessage.SetAcceptFilterRequest();
  req.setGatewayid(gatewayID);
  req.setFilter(filter);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().setAcceptFilter(req, (err, response) => {
      if(err) {
        console.error('Cannot set the accept filter: ', err)
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}

module.exports.getPendingList = getPendingList;
module.exports.getAcceptFilter = getAcceptFilter;
module.exports.setAcceptFilter = setAcceptFilter;
