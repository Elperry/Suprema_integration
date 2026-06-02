const card = require('../../card');
const user = require('../user');
const menu = require('../../cli/menu');

async function test(devID, userID) {
  try {
    console.log('\n', '===== Card Test =====', '\n');
    console.log('>> Place a unregistered card on the device...');

    const cardData = await card.scan(devID);

    if(cardData.getCsncarddata() == null) {
      console.error('!! The card is a smart card. For this test, you have to use a CSN card. Skip the card test.');
      return;
    } 

    var userCard = new user.userMessage.UserCard();
    userCard.setUserid(userID);
    userCard.addCards(cardData.getCsncarddata(), 0);

    await user.setCard(devID, [userCard]);
    await menu.pressEnter('>> Try to authenticate the enrolled card. And, press ENTER to end the test.\n');
  }
  catch(err) {
    console.error('Cannot complete the card test: ', err);
    throw err;
  }
}

module.exports.test = test;

