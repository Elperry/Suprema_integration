const wiegandMessage = require('../../biostar/service/wiegand_pb');
const wiegandService = require('../../biostar/service/wiegand_grpc_pb');

var wiegandClient = null;

function initClient(addr, credential) {
  wiegandClient = new wiegandService.WiegandClient(addr, credential);

  return wiegandClient
}

function getClient() {
  return wiegandClient;
}

function getConfig(devID) {
  var req = new wiegandMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    wiegandClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the wiegand config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}

function setConfig(devID, config) {
  var req = new wiegandMessage.SetConfigRequest();
  req.setDeviceid(devID);
  req.setConfig(config);

  return new Promise((resolve, reject) => {
    wiegandClient.setConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot set the wiegand config: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

function printConfig(title, config) {
  console.log(title + ': ', config.toObject());   

  const configObj = config.toObject();

  for(format of configObj.formatsList) {
    printFormat(`Format ${format.formatid}`, format);
  }

  for(format of configObj.slaveformatsList) {
    printFormat(`Slave Format ${format.formatid}`, format);
  }

  console.log('\n');
}

function printFormat(title, format) {
  console.log(title + ': ');
  console.log(`length: ${format.length}`);

  for(field of format.idfieldsList) {
    console.log(`ID Field: `, Buffer.from(field, 'base64'));
  }

  for(field of format.parityfieldsList) {
    console.log(`Parity Field: `);
    console.log(`  Pos: ${field.paritypos}`);
    console.log(`  Type: ${field.paritytype}`);
    console.log(`  Bit Mask:`, Buffer.from(field.data, 'base64'));
  }
}

module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getConfig = getConfig;
module.exports.setConfig = setConfig;
module.exports.printConfig = printConfig;
module.exports.wiegandMessage = wiegandMessage;
