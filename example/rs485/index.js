const rs485 = require('./rs485');

module.exports.initClient = rs485.initClient;
module.exports.getClient = rs485.getClient;
module.exports.getConfig = rs485.getConfig;
module.exports.setConfig = rs485.setConfig;
module.exports.searchSlave = rs485.searchSlave;
module.exports.setSlave = rs485.setSlave;
module.exports.getSlave = rs485.getSlave;
module.exports.rs485Message = rs485.rs485Message;
