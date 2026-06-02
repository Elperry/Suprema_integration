const fs = require('fs');
const util = require('util');
const eventMessage = require('../../biostar/service/event_pb');
const eventService = require('../../biostar/service/event_grpc_pb');
const { resolve } = require('dns');

var eventClient = null;
var codeMap = null;

function initClient(addr, credential) {
  eventClient = new eventService.EventClient(addr, credential);

  return eventClient
}

function getClient() {
  return eventClient;
}


function getLog(devID, startEventID, maxNumOfLog) {
  var req = new eventMessage.GetLogRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);

  return new Promise((resolve, reject) => {
    eventClient.getLog(req, (err, response) => {
      if(err) {
        console.error('Cannot get the log: ', err)
        reject(err);
        return;
      }

      resolve(response.getEventsList());
    })
  })
}

function getLogWithFilter(devID, startEventID, maxNumOfLog, filter) {
  var req = new eventMessage.GetLogWithFilterRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);
  req.addFilters(filter, 0);

  return new Promise((resolve, reject) => {
    eventClient.getLogWithFilter(req, (err, response) => {
      if(err) {
        console.error('Cannot get the log with filter: ', err)
        reject(err);
        return;
      }

      resolve(response.getEventsList());
    })
  })
}

function getImageLog(devID, startEventID, maxNumOfLog) {
  var req = new eventMessage.GetImageLogRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);

  return new Promise((resolve, reject) => {
    eventClient.getImageLog(req, (err, response) => {
      if(err) {
        console.error('Cannot get the image log: ', err)
        reject(err);
        return;
      }

      resolve(response.getImageeventsList());
    })
  })
}

function enableMonitoring(devID) {
  var req = new eventMessage.EnableMonitoringRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    eventClient.enableMonitoring(req, (err, response) => {
      if(err) {
        console.error('Cannot enable monitoring: ', err)
        reject(err);
        return;
      }

      resolve(response);
    })
  })  
}

function enableMonitoringMulti(devIDs) {
  var req = new eventMessage.EnableMonitoringMultiRequest();
  req.setDeviceidsList(devIDs);

  return new Promise((resolve, reject) => {
    eventClient.enableMonitoringMulti(req, (err, response) => {
      if(err) {
        console.error('Cannot enable monitoring: ', err)
        reject(err);
        return;
      }

      resolve(response);
    })
  })  
}

function subscribe(queueSize) {
  var req = new eventMessage.SubscribeRealtimeLogRequest();
  req.setQueuesize(queueSize);

  return eventClient.subscribeRealtimeLog(req);
}

function disableMonitoring(devID) {
  var req = new eventMessage.DisableMonitoringRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    eventClient.disableMonitoring(req, (err, response) => {
      if(err) {
        console.error('Cannot enable monitoring: ', err)
        reject(err);
        return;
      }

      resolve(response);
    })
  })  
}

function disableMonitoringMulti(devIDs) {
  var req = new eventMessage.DisableMonitoringMultiRequest();
  req.setDeviceidsList(devIDs);

  return new Promise((resolve, reject) => {
    eventClient.disableMonitoringMulti(req, (err, response) => {
      if (err) {
        console.error('Cannot disable monitoring: ', err)
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}

function initCodeMap(filename) {
  var jsonData = fs.readFileSync(filename);
  codeMap = JSON.parse(jsonData);
}

function getEventString(eventCode, subCode) {
  if(codeMap == null) {
    return util.format('No code map(0x%s)', (eventCode | subCode).toString(16));
  }

  for(entry of codeMap.entries) {
    if(eventCode == entry.event_code && subCode == entry.sub_code) {
      return entry.desc;
    }
  }

  return util.format('Unknown event(0x%s)', (eventCode | subCode).toString(16));
}

module.exports.initClient = initClient;
module.exports.getLog = getLog;
module.exports.getLogWithFilter = getLogWithFilter;
module.exports.getImageLog = getImageLog;
module.exports.enableMonitoring = enableMonitoring;
module.exports.disableMonitoring = disableMonitoring;
module.exports.enableMonitoringMulti = enableMonitoringMulti;
module.exports.disableMonitoringMulti = disableMonitoringMulti;
module.exports.subscribe = subscribe;
module.exports.initCodeMap = initCodeMap;
module.exports.getEventString = getEventString;
module.exports.eventMessage = eventMessage;