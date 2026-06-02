const apbZoneMessage = require('../../biostar/service/apb_zone_pb');
const apbZoneService = require('../../biostar/service/apb_zone_grpc_pb');

var apbZoneClient = null;

function initClient(addr, credential) {
  apbZoneClient = new apbZoneService.APBZoneClient(addr, credential);

  return apbZoneClient
}

function getClient() {
  return apbZoneClient;
}

function get(devID) {
  var req = new apbZoneMessage.GetRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    apbZoneClient.get(req, (err, response) => {
      if(err) {
        console.error('Cannot get the apb zones: ', err);
        reject(err);
        return;
      }

      resolve(response.getZonesList());
    })
  })
}

function getStatus(devID) {
  var req = new apbZoneMessage.GetStatusRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    apbZoneClient.getStatus(req, (err, response) => {
      if(err) {
        console.error('Cannot get the zone status: ', err);
        reject(err);
        return;
      }

      resolve(response.getStatusList());
    })
  })
}


function add(devID, zones) {
  var req = new apbZoneMessage.AddRequest();
  req.setDeviceid(devID);
  req.setZonesList(zones);

  return new Promise((resolve, reject) => {
    apbZoneClient.add(req, (err, response) => {
      if(err) {
        console.error('Cannot add the apb zones: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function deleteAll(devID) {
  var req = new apbZoneMessage.DeleteAllRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    apbZoneClient.deleteAll(req, (err, response) => {
      if(err) {
        console.error('Cannot delete all the zones: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}

function clearAll(devID, zoneID) {
  var req = new apbZoneMessage.ClearAllRequest();
  req.setDeviceid(devID);
  req.setZoneid(zoneID);

  return new Promise((resolve, reject) => {
    apbZoneClient.clearAll(req, (err, response) => {
      if(err) {
        console.error('Cannot clear all APB records: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.get = get;
module.exports.getStatus = getStatus;
module.exports.add = add;
module.exports.deleteAll = deleteAll;
module.exports.clearAll = clearAll;
module.exports.apbZoneMessage = apbZoneMessage;
