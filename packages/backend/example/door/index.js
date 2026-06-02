const door = require('./door');

module.exports.initClient = door.initClient;
module.exports.getClient = door.getClient;
module.exports.getList = door.getList;
module.exports.getStatus = door.getStatus;
module.exports.add = door.add;
module.exports.deleteAll = door.deleteAll;
module.exports.lock = door.lock;
module.exports.unlock = door.unlock;
module.exports.release = door.release;
module.exports.doorMessage = door.doorMessage;
