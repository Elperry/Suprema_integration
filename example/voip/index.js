const voip = require('./voip');

module.exports.initClient = voip.initClient;
module.exports.getConfig = voip.getConfig;
module.exports.setConfig = voip.setConfig;
module.exports.voipMessage = voip.voipMessage;
