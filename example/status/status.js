const statusMessage = require('../../biostar/service/status_pb');
const statusService = require('../../biostar/service/status_grpc_pb');

var statusClient = null;

function initClient(addr, credential) {
  statusClient = new statusService.StatusClient(addr, credential);

  return statusClient
}

function getClient() {
  return statusClient;
}

function getConfig(devID) {
  var req = new statusMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    statusClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the status config: ', err)
        reject(err);
        return;
      }

      resolve(response.getConfig());
    });
  });
}

function setConfig(devID, config) {
  var req = new statusMessage.SetConfigRequest();
  req.setDeviceid(devID);
  req.setConfig(config);

  return new Promise((resolve, reject) => {
    statusClient.setConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot set the status config: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

function printConfig(title, config) {
  console.log(title + ': ');   

  const configObj = config.toObject();

  console.log('LED Status');   
  for(ledStatus of configObj.ledstateList) {
    console.log(`  Device Status ${ledStatus.devicestatus}: Count ${ledStatus.count}`);
    for(signal of ledStatus.signalsList) {
      console.log('\t', signal);
    }
  }

  console.log('Buzzer Status');   
  for(buzzerStatus of configObj.buzzerstateList) {
    console.log(`  Device Status ${buzzerStatus.devicestatus}: Count ${buzzerStatus.count}`);
    for(signal of buzzerStatus.signalsList) {
      console.log('\t', signal);
    }
  }

  console.log('\n');
}

module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getConfig = getConfig;
module.exports.setConfig = setConfig;
module.exports.printConfig = printConfig;
module.exports.statusMessage = statusMessage;
