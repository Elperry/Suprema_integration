import userMessage from '../../biostar/service/user_pb.js';
import userService from '../../biostar/service/user_grpc_pb.js';

var userClient = null;

function initClient(addr, credential) {
  userClient = new userService.UserClient(addr, credential);

  return userClient
}

function getClient() {
  return userClient;
}

function getList(devID) {
  var req = new userMessage.GetListRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    userClient.getList(req, (err, response) => {
      if(err) {
        console.error('Cannot get the user list: ', err);
        reject(err);
        return;
      }

      resolve(response.getHdrsList());
    })
  })
}

function getUser(devID, userIDs) {
  var req = new userMessage.GetRequest();
  req.setDeviceid(devID);
  req.setUseridsList(userIDs);

  return new Promise((resolve, reject) => {
    userClient.get(req, (err, response) => {
      if(err) {
        console.error('Cannot get the user info: ', err);
        reject(err);
        return;
      }

      resolve(response.getUsersList());
    })
  })
}


function enroll(devID, userInfos) {
  var req = new userMessage.EnrollRequest();
  req.setDeviceid(devID);
  req.setUsersList(userInfos);
  req.setOverwrite(true);

  return new Promise((resolve, reject) => {
    userClient.enroll(req, (err, response) => {
      if(err) {
        console.error('Cannot enroll the users: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function enrollMulti(devIDs, userInfos) {
  var req = new userMessage.EnrollMultiRequest();
  req.setDeviceidsList(devIDs);
  req.setUsersList(userInfos);

  return new Promise((resolve, reject) => {
    userClient.enrollMulti(req, (err, response) => {
      if(err) {
        console.error('Cannot enroll the users to multi devices: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function update(devID, userInfos) {
  var req = new userMessage.UpdateRequest();
  req.setDeviceid(devID);
  req.setUsersList(userInfos);

  return new Promise((resolve, reject) => {
    userClient.update(req, (err, response) => {
      if(err) {
        console.error('Cannot update the users: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function updateMulti(devIDs, userInfos) {
  var req = new userMessage.UpdateMultiRequest();
  req.setDeviceidsList(devIDs);
  req.setUsersList(userInfos);

  return new Promise((resolve, reject) => {
    userClient.updateMulti(req, (err, response) => {
      if(err) {
        console.error('Cannot update the users to multi devices: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function deleteUser(devID, userIDs) {
  var req = new userMessage.DeleteRequest();
  req.setDeviceid(devID);
  req.setUseridsList(userIDs);

  return new Promise((resolve, reject) => {
    userClient.delete(req, (err, response) => {
      if(err) {
        console.error('Cannot delete the users: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}

function deleteUserMulti(devIDs, userIDs) {
  var req = new userMessage.DeleteMultiRequest();
  req.setDeviceidsList(devIDs);
  req.setUseridsList(userIDs);

  return new Promise((resolve, reject) => {
    userClient.deleteMulti(req, (err, response) => {
      if(err) {
        console.error('Cannot delete the users from multi devices: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}

function setCard(devID, userCardInfos) {
  var req = new userMessage.SetCardRequest();
  req.setDeviceid(devID);
  req.setUsercardsList(userCardInfos);

  return new Promise((resolve, reject) => {
    userClient.setCard(req, (err, response) => {
      if(err) {
        console.error('Cannot set user cards: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function setFace(devID, userFaceInfos) {
  var req = new userMessage.SetFaceRequest();
  req.setDeviceid(devID);
  req.setUserfacesList(userFaceInfos);

  return new Promise((resolve, reject) => {
    userClient.setFace(req, (err, response) => {
      if(err) {
        console.error('Cannot set user faces: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function setFinger(devID, userFingerInfos) {
  var req = new userMessage.SetFingerRequest();
  req.setDeviceid(devID);
  req.setUserfingersList(userFingerInfos);

  return new Promise((resolve, reject) => {
    userClient.setFinger(req, (err, response) => {
      if(err) {
        console.error('Cannot set user fingers: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function setAccessGroup(devID, userAccessGroups) {
  var req = new userMessage.SetAccessGroupRequest();
  req.setDeviceid(devID);
  req.setUseraccessgroupsList(userAccessGroups);

  return new Promise((resolve, reject) => {
    userClient.setAccessGroup(req, (err, response) => {
      if(err) {
        console.error('Cannot set user access groups: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}

function getAccessGroup(devID, userIDs) {
  var req = new userMessage.GetAccessGroupRequest();
  req.setDeviceid(devID);
  req.setUseridsList(userIDs);

  return new Promise((resolve, reject) => {
    userClient.getAccessGroup(req, (err, response) => {
      if(err) {
        console.error('Cannot get user access groups: ', err);
        reject(err);
        return;
      }

      resolve(response.getUseraccessgroupsList());
    })
  })
}



module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getList = getList;
module.exports.getUser = getUser;
module.exports.enroll = enroll;
module.exports.deleteUser = deleteUser;
module.exports.enrollMulti = enrollMulti;
module.exports.deleteUserMulti = deleteUserMulti;
module.exports.setCard = setCard;
module.exports.setFinger = setFinger;
module.exports.setFace = setFace;
module.exports.setAccessGroup = setAccessGroup;
module.exports.getAccessGroup = getAccessGroup;
module.exports.userMessage = userMessage;
