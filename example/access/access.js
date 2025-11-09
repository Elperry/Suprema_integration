const accessMessage = require('../../biostar/service/access_pb');
const accessService = require('../../biostar/service/access_grpc_pb');

var accessClient = null;

function initClient(addr, credential) {
  accessClient = new accessService.AccessClient(addr, credential);

  return accessClient
}

function getClient() {
  return accessClient;
}

function getList(devID) {
  var req = new accessMessage.GetListRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    accessClient.getList(req, (err, response) => {
      if(err) {
        console.error('Cannot get the access group list: ', err);
        reject(err);
        return;
      }

      resolve(response.getGroupsList());
    })
  })
}

function add(devID, groups) {
  var req = new accessMessage.AddRequest();
  req.setDeviceid(devID);
  req.setGroupsList(groups);

  return new Promise((resolve, reject) => {
    accessClient.add(req, (err, response) => {
      if(err) {
        console.error('Cannot add the access groups: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function deleteAll(devID) {
  var req = new accessMessage.DeleteAllRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    accessClient.deleteAll(req, (err, response) => {
      if(err) {
        console.error('Cannot delete all the access groups: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function getLevelList(devID) {
  var req = new accessMessage.GetLevelListRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    accessClient.getLevelList(req, (err, response) => {
      if(err) {
        console.error('Cannot get the access level list: ', err);
        reject(err);
        return;
      }

      resolve(response.getLevelsList());
    })
  })
}

function addLevel(devID, levels) {
  var req = new accessMessage.AddLevelRequest();
  req.setDeviceid(devID);
  req.setLevelsList(levels);

  return new Promise((resolve, reject) => {
    accessClient.addLevel(req, (err, response) => {
      if(err) {
        console.error('Cannot add the access levels: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function deleteAllLevel(devID) {
  var req = new accessMessage.DeleteAllLevelRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    accessClient.deleteAllLevel(req, (err, response) => {
      if(err) {
        console.error('Cannot delete all the access levels: ', err);
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
module.exports.add = add;
module.exports.deleteAll = deleteAll;
module.exports.getLevelList = getLevelList;
module.exports.addLevel = addLevel;
module.exports.deleteAllLevel = deleteAllLevel;
module.exports.accessMessage = accessMessage;
