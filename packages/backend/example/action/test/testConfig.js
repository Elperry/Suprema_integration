const action = require('../action');
const menu = require('../../cli/menu');

const BS2_EVENT_VERIFY_FAIL = 0x1100;
const BS2_EVENT_IDENTIFY_FAIL = 0x1400;

const BS2_SUB_EVENT_CREDENTIAL_CARD = 0x02;
const BS2_SUB_EVENT_CREDENTIAL_FINGER = 0x04;

async function test(devID) {
  try {
    // Backup the original configuration
    const origConfig = await action.getConfig(devID);
    console.log('Original Config: ', JSON.stringify(origConfig.toObject()));    

    console.log('\n', '===== Test TriggerAction Config =====', '\n');
    await testEventTrigger(devID);

    // Restore the original configuration   
    await action.setConfig(devID, origConfig);
  }
  catch(err) {
    console.error('Cannot finish the action test: ', err);
    throw err;
  }
}

async function testEventTrigger(devID) {
  const cardFailEventTrigger = new action.actionMessage.EventTrigger();
  cardFailEventTrigger.setEventcode(BS2_EVENT_VERIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_CARD);

  const cardFailTrigger = new action.actionMessage.Trigger();
  cardFailTrigger.setDeviceid(devID);
  cardFailTrigger.setType(action.actionMessage.TriggerType.TRIGGER_EVENT);
  cardFailTrigger.setEvent(cardFailEventTrigger);

  const fingerFailEventTrigger = new action.actionMessage.EventTrigger();
  fingerFailEventTrigger.setEventcode(BS2_EVENT_IDENTIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_FINGER);

  const fingerFailTrigger = new action.actionMessage.Trigger();
  fingerFailTrigger.setDeviceid(devID);
  fingerFailTrigger.setType(action.actionMessage.TriggerType.TRIGGER_EVENT);
  fingerFailTrigger.setEvent(fingerFailEventTrigger);

  const relaySignal = new action.actionMessage.Signal();
  relaySignal.setCount(3);
  relaySignal.setOnduration(500);
  relaySignal.setOffduration(500);

  const relayAction = new action.actionMessage.RelayAction();
  relayAction.setRelayindex(0); // 1st relay
  relayAction.setSignal(relaySignal);

  const failAction = new action.actionMessage.Action();
  failAction.setDeviceid(devID);
  failAction.setType(action.actionMessage.ActionType.ACTION_RELAY);
  failAction.setRelay(relayAction);

  const cardTriggerAction = new action.actionMessage.TriggerActionConfig.TriggerAction();
  cardTriggerAction.setTrigger(cardFailTrigger);
  cardTriggerAction.setAction(failAction);

  const fingerTriggerAction = new action.actionMessage.TriggerActionConfig.TriggerAction();
  fingerTriggerAction.setTrigger(fingerFailTrigger);
  fingerTriggerAction.setAction(failAction);

  const config = new action.actionMessage.TriggerActionConfig();
  config.addTriggeractions(cardTriggerAction);
  config.addTriggeractions(fingerTriggerAction);

  await action.setConfig(devID, config);

  const newConfig = await action.getConfig(devID);
  console.log('Test Config: ', JSON.stringify(newConfig.toObject()), '\n');  

  console.log('>> Try to authenticate a unregistered card or finger. It should trigger a relay signal.');
  await menu.pressEnter('>> Press ENTER for the next test.\n');
}



module.exports.test = test;