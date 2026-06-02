const card = require('../card');
const util = require('../util');

const NUM_OF_NEW_BLACKLIST = 2;
const	FIRST_BLACKLISTED_CARD_ID = 100000;
const ISSUE_COUNT = 3;

function makeCardInfos() {
  var cardInfos = [];

  for(i = 0; i < NUM_OF_NEW_BLACKLIST; i++) {
    let item = new card.cardMessage.BlacklistItem();
    item.setCardid(Buffer.from(`${FIRST_BLACKLISTED_CARD_ID + i}`, 'utf-8'));
    item.setIssuecount(ISSUE_COUNT);

    cardInfos.push(item);
  }

  return cardInfos;
}

async function test(devID, capabilityInfo) {
	console.log('>>> Scan a card...');

  try {
    const cardData = await card.scan(devID);
    console.log('Card: ', cardData.toObject());

    var blacklist = await card.getBlacklist(devID);
    printBlacklist('Initial blacklist: ', blacklist);

    await card.addBlacklist(devID, makeCardInfos());

    blacklist = await card.getBlacklist(devID);
    printBlacklist('Blacklist after adding new items: ', blacklist);

    await card.deleteBlacklist(devID, makeCardInfos());

    blacklist = await card.getBlacklist(devID);
    printBlacklist('Blacklist after deleting new items: ', blacklist);

    const config = await card.getConfig(devID);
    console.log('Card config: ', config.toObject());

    if (capabilityInfo.getQrsupported()) {
      const qrConfig = await card.getQRConfig(devID);
      console.log('QR config: ', qrConfig.toObject());
    }
  }
  catch (err) {
    console.error('Cannot finish the card test: ', err);
    throw err;
  }
}

function printBlacklist(title, blacklist) {
  console.log(title);
  console.log(util.toObjectArray(blacklist));
}

module.exports.test = test;