const auth = require('../../auth');
const device = require('../../device');
const menu = require('../../cli/menu');

async function prepareAuthConfig(devID) {
  try {
    const origConfig = await auth.getConfig(devID);
    console.log('Original Auth Config: ', origConfig.toObject());      

    // Enable private authentication for test
    var testConfig = origConfig.cloneMessage();
    testConfig.setUseprivateauth(true);

    await auth.setConfig(devID, testConfig);

    return origConfig;
  }
  catch(err) {
    console.error('Cannot get the auth config: ', err);
    throw err;
  }
}

async function test(devID, extendedAuthSupported) {
  try {
    console.log('\n', '===== Auth Mode Test =====', '\n');

    const config = new auth.authMessage.AuthConfig();
    config.setMatchtimeout(10);
    config.setAuthtimeout(15);
    config.setUseprivateauth(false);

    if (extendedAuthSupported) {
      let authSched = new auth.authMessage.AuthSchedule();
      authSched.setMode(auth.authMessage.AuthMode.AUTH_EXT_MODE_CARD_ONLY); // Card Only
      authSched.setScheduleid(1); // Always
      config.addAuthschedules(authSched, 0);

      authSched = new auth.authMessage.AuthSchedule();
      authSched.setMode(auth.authMessage.AuthMode.AUTH_EXT_MODE_FACE_ONLY); // Face Only
      authSched.setScheduleid(1); // Always
      config.addAuthschedules(authSched, 1);

      authSched = new auth.authMessage.AuthSchedule();
      authSched.setMode(auth.authMessage.AuthMode.AUTH_EXT_MODE_FINGERPRINT_ONLY); // Fingerprint Only
      authSched.setScheduleid(1); // Always
      config.addAuthschedules(authSched, 2);
    } else {
      let authSched = new auth.authMessage.AuthSchedule();
      authSched.setMode(auth.authMessage.AuthMode.AUTH_MODE_CARD_ONLY); // Card Only
      authSched.setScheduleid(1); // Always
      config.addAuthschedules(authSched, 0);

      authSched = new auth.authMessage.AuthSchedule();
      authSched.setMode(auth.authMessage.AuthMode.AUTH_MODE_BIOMETRIC_ONLY); // Biometric Only
      authSched.setScheduleid(1); // Always
      config.addAuthschedules(authSched, 1);
    }

    await auth.setConfig(devID, config);

    await menu.pressEnter('>> Try to authenticate card or fingerprint or face. And, press ENTER for the next test.\n');

    config.clearAuthschedulesList();

    if (extendedAuthSupported) {
      let authSched = new auth.authMessage.AuthSchedule();
      authSched.setMode(auth.authMessage.AuthMode.AUTH_EXT_MODE_CARD_FACE); // Card + Face
      authSched.setScheduleid(1); // Always
      config.addAuthschedules(authSched, 0);

      authSched = new auth.authMessage.AuthSchedule();
      authSched.setMode(auth.authMessage.AuthMode.AUTH_EXT_MODE_CARD_FINGERPRINT); // Card + Fingerprint
      authSched.setScheduleid(1); // Always
      config.addAuthschedules(authSched, 1);
    } else {
      let authSched = new auth.authMessage.AuthSchedule();
      authSched.setMode(auth.authMessage.AuthMode.AUTH_MODE_CARD_BIOMETRIC); // Card + Biometric
      authSched.setScheduleid(1); // Always
      config.addAuthschedules(authSched, 0);
    }

    await auth.setConfig(devID, config);

    await menu.pressEnter('>> Try to authenticate (card + fingerprint) or (card + face). And, press ENTER to end the test.\n');
  }
  catch(err) {
    console.error('Cannot finish the auth mode test: ', err);
    throw err;
  }
}


module.exports.prepareAuthConfig = prepareAuthConfig;
module.exports.test = test;