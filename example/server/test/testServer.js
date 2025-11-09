import server from '../server.js';
import auth from '../../auth.js';
import user from '../../user.js';
import card from '../../card.js';
import finger from '../../finger.js';
import menu from '../../cli/menu.js';

const QUEUE_SIZE =16;
const TEST_USER_ID = '1234';

async function test(devID) {
  try {
    // Backup the auth config
    const origAuthConfig = await auth.getConfig(devID);

    // Enable server matching for test
    const testAuthConfig = origAuthConfig.cloneMessage();
    testAuthConfig.setUseservermatching(true);

    await auth.setConfig(devID, testAuthConfig);

    await testVerify(devID);
    await testIdentify(devID);

    // Restore the auth config
    await auth.setConfig(devID, origAuthConfig);
  }
  catch(err) {
    console.error('Cannot finish the server test: ', err);
    throw err;
  }
}

async function testVerify(devID) {
  let returnError = true;

  const sub = await server.subscribe(QUEUE_SIZE);

  sub.on('data', (req) => {
    if(req.getReqtype() != server.serverMessage.RequestType.VERIFY_REQUEST) {
      console.log('!! Request type is not VERIFY_REQUEST. Just ignore it!');
      return;
    }

    if(returnError) {
      console.log('## Gateway returns VERIFY_FAIL.');
      server.handleVerify(req, server.serverMessage.ServerErrorCode.VERIFY_FAIL, null);
    } else {
      const userHdr = new user.userMessage.UserHdr();
      userHdr.setId(TEST_USER_ID);
      userHdr.setUserflag(userHdr.USER_FLAG_CREATED);
      userHdr.setNumofcard(1);

      const cardData = new card.cardMessage.CSNCardData();
      cardData.setData(req.getVerifyreq().getCarddata());
      
      const userInfo = new user.userMessage.UserInfo();
      userInfo.setHdr(userHdr);
      userInfo.addCards(cardData);
      
      server.handleVerify(req, server.serverMessage.ServerErrorCode.SUCCESS, userInfo);
    }
  });

  sub.on('end', () => {
    console.log('Server matching is finished');
  });

  sub.on('error', (err) => {
    if(err.details === 'Cancelled') {
      console.log("Server matching is cancelled");
    } else {
      console.log('Server matching error: ', err);
    }
  })

	console.log('===== Server Matching: Verify Test =====', '\n')	;
	console.log('>> Try to authenticate a card. It should fail since the device gateway will return an error code to the request.');
  await menu.pressEnter('>> Press ENTER for the next test.\n');

  returnError = false;
	console.log('>> Try to authenticate a card. The gateway will return SUCCESS with user information this time. The result will vary according to the authentication modes of the devices.');	
  await menu.pressEnter('>> Press ENTER for the next test.\n');

  sub.cancel();
  await server.unsubscribe();
}


async function testIdentify(devID) {
  let returnError = true;

  const sub = await server.subscribe(QUEUE_SIZE);

  sub.on('data', (req) => {
    if(req.getReqtype() != server.serverMessage.RequestType.IDENTIFY_REQUEST) {
      console.log('!! Request type is not IDENTIFY_REQUEST. Just ignore it.!');
      return;
    }

    if(returnError) {
      console.log('## Gateway returns IDENTIFY_FAIL.');
      server.handleIdentify(req, server.serverMessage.ServerErrorCode.IDENTIFY_FAIL, null);
    } else {
      const userHdr = new user.userMessage.UserHdr();
      userHdr.setId(TEST_USER_ID);
      userHdr.setNumoffinger(1);

      const fingerData = new finger.fingerMessage.FingerData();
      fingerData.addTemplates(req.getIdentifyreq().getTemplatedata());
      fingerData.addTemplates(req.getIdentifyreq().getTemplatedata());
      
      const userInfo = new user.userMessage.UserInfo();
      userInfo.setHdr(userHdr);
      userInfo.addFingers(fingerData);
      
      server.handleIdentify(req, server.serverMessage.ServerErrorCode.SUCCESS, userInfo);
    }
  });

  sub.on('end', () => {
    console.log('Server matching is finished');
  });

  sub.on('error', (err) => {
    if(err.details === 'Cancelled') {
      console.log("Server matching is cancelled");
    } else {
      console.log('Server matching error: ', err);
    }
  })

	console.log('===== Server Matching: Identify Test =====', '\n')	;
	console.log('>> Try to authenticate a fingerprint. It should fail since the device gateway will return an error code to the request.');
  await menu.pressEnter('>> Press ENTER for the next test.\n');

  returnError = false;
	console.log('>> Try to authenticate a fingerprint. The gateway will return SUCCESS with user information this time. The result will vary according to the authentication modes of the devices.');	
  await menu.pressEnter('>> Press ENTER for the next test.\n');

  sub.cancel();
  await server.unsubscribe();
}

module.exports.test = test;