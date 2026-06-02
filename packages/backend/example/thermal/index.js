const thermal = require('./thermal');

module.exports.initClient = thermal.initClient;
module.exports.getConfig = thermal.getConfig;
module.exports.setConfig = thermal.setConfig;
module.exports.getTemperatureLog = thermal.getTemperatureLog;
module.exports.thermalMessage = thermal.thermalMessage;
