const scheduleMessage = require('../../biostar/service/schedule_pb');
const scheduleService = require('../../biostar/service/schedule_grpc_pb');

var scheduleClient = null;

function initClient(addr, credential) {
  scheduleClient = new scheduleService.ScheduleClient(addr, credential);

  return scheduleClient
}

function getClient() {
  return scheduleClient;
}

function getList(devID) {
  var req = new scheduleMessage.GetListRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    scheduleClient.getList(req, (err, response) => {
      if(err) {
        console.error('Cannot get the schedule list: ', err);
        reject(err);
        return;
      }

      resolve(response.getSchedulesList());
    })
  })
}

function add(devID, schedules) {
  var req = new scheduleMessage.AddRequest();
  req.setDeviceid(devID);
  req.setSchedulesList(schedules);

  return new Promise((resolve, reject) => {
    scheduleClient.add(req, (err, response) => {
      if(err) {
        console.error('Cannot add the schedules: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function deleteAll(devID) {
  var req = new scheduleMessage.DeleteAllRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    scheduleClient.deleteAll(req, (err, response) => {
      if(err) {
        console.error('Cannot delete all the schedules: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function getHolidayList(devID) {
  var req = new scheduleMessage.GetHolidayListRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    scheduleClient.getHolidayList(req, (err, response) => {
      if(err) {
        console.error('Cannot get the holiday list: ', err);
        reject(err);
        return;
      }

      resolve(response.getGroupsList());
    })
  })
}

function addHoliday(devID, groups) {
  var req = new scheduleMessage.AddHolidayRequest();
  req.setDeviceid(devID);
  req.setGroupsList(groups);

  return new Promise((resolve, reject) => {
    scheduleClient.addHoliday(req, (err, response) => {
      if(err) {
        console.error('Cannot add the holiday groups: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function deleteAllHoliday(devID) {
  var req = new scheduleMessage.DeleteAllHolidayRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    scheduleClient.deleteAllHoliday(req, (err, response) => {
      if(err) {
        console.error('Cannot delete all the holiday groups: ', err);
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
module.exports.getHolidayList = getHolidayList;
module.exports.addHoliday = addHoliday;
module.exports.deleteAllHoliday = deleteAllHoliday;
module.exports.scheduleMessage = scheduleMessage;
