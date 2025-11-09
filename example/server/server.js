const fs = require('fs');
const serverMessage = require('../../biostar/service/server_pb');
const serverService = require('../../biostar/service/server_grpc_pb');

var serverClient = null;

function initClient(addr, credential) {
  serverClient = new serverService.ServerClient(addr, credential);

  return serverClient
}

function getClient() {
  return serverClient;
}


function subscribe(queueSize) {
  var req = new serverMessage.SubscribeRequest();
  req.setQueuesize(queueSize);

  return serverClient.subscribe(req);
}


function unsubscribe() {
  var req = new serverMessage.UnsubscribeRequest();

  return new Promise((resolve, reject) => {
    serverClient.unsubscribe(req, (err, response) => {
      if(err) {
        console.error('Cannot unsubscribe: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

function handleVerify(serverReq, errCode, userInfo) {
  var req = new serverMessage.HandleVerifyRequest();
  req.setDeviceid(serverReq.getDeviceid());
  req.setSeqno(serverReq.getSeqno());
  req.setErrcode(errCode);
  req.setUser(userInfo);

  return new Promise((resolve, reject) => {
    serverClient.handleVerify(req, (err, response) => {
      if(err) {
        console.error('Cannot handle verify request: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

function handleIdentify(serverReq, errCode, userInfo) {
  var req = new serverMessage.HandleIdentifyRequest();
  req.setDeviceid(serverReq.getDeviceid());
  req.setSeqno(serverReq.getSeqno());
  req.setErrcode(errCode);
  req.setUser(userInfo);

  return new Promise((resolve, reject) => {
    serverClient.handleIdentify(req, (err, response) => {
      if(err) {
        console.error('Cannot handle identify request: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.subscribe = subscribe;
module.exports.unsubscribe = unsubscribe;
module.exports.handleVerify = handleVerify;
module.exports.handleIdentify = handleIdentify;
module.exports.serverMessage = serverMessage;