const doorMessage = require('../../biostar/service/door_pb');
const doorService = require('../../biostar/service/door_grpc_pb');

var doorClient = null;

function initClient(addr, credential) {
  doorClient = new doorService.DoorClient(addr, credential);

  return doorClient
}

function getClient() {
  return doorClient;
}

function getList(devID) {
  var req = new doorMessage.GetListRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    doorClient.getList(req, (err, response) => {
      if(err) {
        console.error('Cannot get the door list: ', err);
        reject(err);
        return;
      }

      resolve(response.getDoorsList());
    })
  })
}

function getStatus(devID) {
  var req = new doorMessage.GetStatusRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    doorClient.getStatus(req, (err, response) => {
      if(err) {
        console.error('Cannot get the door status: ', err);
        reject(err);
        return;
      }

      resolve(response.getStatusList());
    })
  })
}


function add(devID, doors) {
  var req = new doorMessage.AddRequest();
  req.setDeviceid(devID);
  req.setDoorsList(doors);

  return new Promise((resolve, reject) => {
    doorClient.add(req, (err, response) => {
      if(err) {
        console.error('Cannot add the doors: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function deleteAll(devID) {
  var req = new doorMessage.DeleteAllRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    doorClient.deleteAll(req, (err, response) => {
      if(err) {
        console.error('Cannot delete all the doors: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function lock(devID, doorIDs, doorFlag) {
  var req = new doorMessage.LockRequest();
  req.setDeviceid(devID);
  req.setDooridsList(doorIDs);
  req.setDoorflag(doorFlag);

  return new Promise((resolve, reject) => {
    doorClient.lock(req, (err, response) => {
      if(err) {
        console.error('Cannot lock the doors: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}

function unlock(devID, doorIDs, doorFlag) {
  var req = new doorMessage.UnlockRequest();
  req.setDeviceid(devID);
  req.setDooridsList(doorIDs);
  req.setDoorflag(doorFlag);

  return new Promise((resolve, reject) => {
    doorClient.unlock(req, (err, response) => {
      if(err) {
        console.error('Cannot unlock the doors: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function release(devID, doorIDs, doorFlag) {
  var req = new doorMessage.ReleaseRequest();
  req.setDeviceid(devID);
  req.setDooridsList(doorIDs);
  req.setDoorflag(doorFlag);

  return new Promise((resolve, reject) => {
    doorClient.release(req, (err, response) => {
      if(err) {
        console.error('Cannot release the doors: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}



module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getList = getList;
module.exports.getStatus = getStatus;
module.exports.add = add;
module.exports.deleteAll = deleteAll;
module.exports.lock = lock;
module.exports.unlock = unlock;
module.exports.release = release;
module.exports.doorMessage = doorMessage;
