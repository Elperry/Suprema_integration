const wiegand = require('../wiegand');
const menu = require('../../cli/menu');

async function test(devID) {
  try {
    // Backup the original configuration
    const origConfig = await wiegand.getConfig(devID);
    wiegand.printConfig('>>> Original Wiegand Config', origConfig);    

    console.log('\n', '===== Wiegand Config Test =====', '\n');

    await test26bit(devID);
    await test37bit(devID);

    await menu.pressEnter('>> Press ENTER to finish the test.\n');    

    // Restore the original configuration   
    await wiegand.setConfig(devID, origConfig);
  }
  catch(err) {
    console.error('Cannot finish the wiegand test: ', err);
    throw err;
  }
}

// 26 bit standard
// FC: 01 1111 1110 0000 0000 0000 0000 : 0x01fe0000
// ID: 00 0000 0001 1111 1111 1111 1110 : 0x0001fffe
// EP: 01 1111 1111 1110 0000 0000 0000 : 0x01ffe000, Pos 0, Type: Even
// OP: 00 0000 0000 0001 1111 1111 1110 : 0x00001ffe, Pos 25, Type: Odd 

async function test26bit(devID) {
  try {
    var default26bit = new wiegand.wiegandMessage.WiegandFormat();
    default26bit.setLength(26);
    default26bit.addIdfields(Buffer.from([0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0])); // Facility Code
    default26bit.addIdfields(Buffer.from([0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0])); // ID
    
    var evenParity = new wiegand.wiegandMessage.ParityField();
    evenParity.setParitypos(0);
    evenParity.setParitytype(wiegand.wiegandMessage.WiegandParity.WIEGAND_PARITY_EVEN);
    evenParity.setData(Buffer.from([0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0])); 

    var oddParity = new wiegand.wiegandMessage.ParityField();
    oddParity.setParitypos(25);
    oddParity.setParitytype(wiegand.wiegandMessage.WiegandParity.WIEGAND_PARITY_ODD);
    oddParity.setData(Buffer.from([0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0])); 

    default26bit.addParityfields(evenParity);
    default26bit.addParityfields(oddParity);

    var wiegandConfig = new wiegand.wiegandMessage.WiegandConfig();
    wiegandConfig.setMode(wiegand.wiegandMessage.WiegandMode.WIEGAND_IN_ONLY);
    wiegandConfig.setOutpulsewidth(40);
    wiegandConfig.setOutpulseinterval(10000);
    wiegandConfig.addFormats(default26bit);
    wiegandConfig.setUsewieganduserid(wiegand.wiegandMessage.WiegandOutType.WIEGAND_OUT_USER_ID);

    await wiegand.setConfig(devID, wiegandConfig);

    const newConfig = await wiegand.getConfig(devID);
    wiegand.printConfig('>>> Wiegand Config with Standard 26bit Format', newConfig);   
  } 
  catch(err) {
    console.error('Cannot set the 26bit standard format: ', err);
    throw err;
  }
}

// 37 bit HID
// FC: 0 1111 1111 1111 1111 0000 0000 0000 0000 0000 : 0x0ffff00000
// ID: 0 0000 0000 0000 0000 1111 1111 1111 1111 1110 : 0x00000ffffe
// EP: 0 1111 1111 1111 1111 1100 0000 0000 0000 0000 : 0x0ffffc0000, Pos 0, Type: Even
// OP: 0 0000 0000 0000 0000 0111 1111 1111 1111 1110 : 0x000007fffe, Pos 36, Type: Odd 

async function test37bit(devID) {
  try {
    var hid37bitFormat = new wiegand.wiegandMessage.WiegandFormat();
    hid37bitFormat.setLength(37);
    hid37bitFormat.addIdfields(Buffer.from([0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0])); // Facility Code
    hid37bitFormat.addIdfields(Buffer.from([0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0])); // ID
    
    var evenParity = new wiegand.wiegandMessage.ParityField();
    evenParity.setParitypos(0);
    evenParity.setParitytype(wiegand.wiegandMessage.WiegandParity.WIEGAND_PARITY_EVEN);
    evenParity.setData(Buffer.from([0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0])); 

    var oddParity = new wiegand.wiegandMessage.ParityField();
    oddParity.setParitypos(36);
    oddParity.setParitytype(wiegand.wiegandMessage.WiegandParity.WIEGAND_PARITY_ODD);
    oddParity.setData(Buffer.from([0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0])); 

    hid37bitFormat.addParityfields(evenParity);
    hid37bitFormat.addParityfields(oddParity);

    var wiegandConfig = new wiegand.wiegandMessage.WiegandConfig();
    wiegandConfig.setMode(wiegand.wiegandMessage.WiegandMode.WIEGAND_IN_ONLY);
    wiegandConfig.setOutpulsewidth(40);
    wiegandConfig.setOutpulseinterval(10000);
    wiegandConfig.addFormats(hid37bitFormat);
    wiegandConfig.setUsewieganduserid(wiegand.wiegandMessage.WiegandOutType.WIEGAND_OUT_USER_ID);

    await wiegand.setConfig(devID, wiegandConfig);

    const newConfig = await wiegand.getConfig(devID);
    wiegand.printConfig('>>> Wiegand Config with HID 37bit Format', newConfig);   
  } 
  catch(err) {
    console.error('Cannot set the HID 37bit format: ', err);
    throw err;
  }
}


module.exports.test = test;