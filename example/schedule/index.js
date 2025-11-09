const schedule = require('./schedule');

module.exports.initClient = schedule.initClient;
module.exports.getClient = schedule.getClient;
module.exports.getList = schedule.getList;
module.exports.add = schedule.add;
module.exports.deleteAll = schedule.deleteAll;
module.exports.getHolidayList = schedule.getHolidayList;
module.exports.addHoliday = schedule.addHoliday;
module.exports.deleteAllHoliday = schedule.deleteAllHoliday;
module.exports.scheduleMessage = schedule.scheduleMessage;
