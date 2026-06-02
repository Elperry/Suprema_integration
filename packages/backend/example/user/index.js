const user = require('./user');

module.exports.initClient = user.initClient;
module.exports.getList = user.getList;
module.exports.getUser = user.getUser;
module.exports.enroll = user.enroll;
module.exports.deleteUser = user.deleteUser;
module.exports.enrollMulti = user.enrollMulti;
module.exports.deleteUserMulti = user.deleteUserMulti;
module.exports.setFinger = user.setFinger;
module.exports.setCard = user.setCard;
module.exports.setFace = user.setFace;
module.exports.getAccessGroup = user.getAccessGroup;
module.exports.setAccessGroup = user.setAccessGroup;
module.exports.userMessage = user.userMessage;
