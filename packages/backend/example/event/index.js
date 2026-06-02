const event = require('./event');

module.exports.initClient = event.initClient;
module.exports.getLog = event.getLog;
module.exports.getLogWithFilter = event.getLogWithFilter;
module.exports.getImageLog = event.getImageLog;
module.exports.enableMonitoring = event.enableMonitoring;
module.exports.disableMonitoring = event.disableMonitoring;
module.exports.enableMonitoringMulti = event.enableMonitoringMulti;
module.exports.disableMonitoringMulti = event.disableMonitoringMulti;
module.exports.subscribe = event.subscribe;
module.exports.initCodeMap = event.initCodeMap;
module.exports.getEventString = event.getEventString;
module.exports.eventMessage = event.eventMessage;
