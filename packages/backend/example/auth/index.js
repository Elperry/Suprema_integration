const auth = require('./auth');

module.exports.initClient = auth.initClient;
module.exports.getClient = auth.getClient;
module.exports.getConfig = auth.getConfig;
module.exports.setConfig = auth.setConfig;
module.exports.authMessage = auth.authMessage;

