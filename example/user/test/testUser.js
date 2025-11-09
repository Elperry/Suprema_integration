const user = require('../user');
const device = require('../../device');
const auth = require('../../auth');
const util = require('../../util');
const util_ = require('util');

async function enrollUser(devID, extendedAuthSupported) {
  try {
    const userHdrs = util.toObjectArray(await user.getList(devID));
    console.log('Existing User List: ', userHdrs, '\n')

    const newUserID = util_.format('%d', Date.now());
    
    var newUserHdr = new user.userMessage.UserHdr();
    newUserHdr.setId(newUserID);
    newUserHdr.setUserflag(newUserHdr.USER_FLAG_CREATED);
    
    var newUser = new user.userMessage.UserInfo();
    newUser.setHdr(newUserHdr);

    var newUserSetting = new user.userMessage.UserSetting();

    if (extendedAuthSupported) {
      newUserSetting.setCardauthextmode(auth.authMessage.AuthMode.AUTH_EXT_MODE_CARD_ONLY);
      newUserSetting.setFingerauthextmode(auth.authMessage.AuthMode.AUTH_EXT_MODE_FINGERPRINT_ONLY);
      newUserSetting.setFaceauthextmode(auth.authMessage.AuthMode.AUTH_EXT_MODE_FACE_ONLY);
    } else {
      newUserSetting.setCardauthmode(auth.authMessage.AuthMode.AUTH_MODE_CARD_ONLY);
      newUserSetting.setBiometricauthmode(auth.authMessage.AuthMode.AUTH_MODE_BIOMETRIC_ONLY);
    }

    newUser.setSetting(newUserSetting);

    await user.enroll(devID, [newUser]);

    const userInfos = await user.getUser(devID, [newUserID]);
    console.log('Test User: ', userInfos[0]);

    return newUserID;
  }
  catch(err) {
    console.error('Cannot enroll the test user: ', err);
    throw err;
  }
}


module.exports.enrollUser = enrollUser;
