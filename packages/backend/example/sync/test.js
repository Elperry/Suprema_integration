const grpc = require('grpc');
const fs = require('fs');
const config = require('./config');
const deviceMgr = require('./device');
const eventMgr = require('./event');
const userMgr = require('./user');
const menu = require('./menu');
const cli = require('../cli');
const connect = require('../connect');
const card = require('../card');
const user = require('../user');
const event = require('../event');

const GATEWAY_CA_FILE = '../../../cert/gateway/192.168.28.111/ca.crt';
const GATEWAY_IP = '192.168.28.111';
const GATEWAY_PORT = 4000;

const CODE_MAP_FILE = '../event/event_code.json';
const CONFIG_FILE = './sync_config.json';

async function main() {
  try {
    config.readConfig(CONFIG_FILE);
    console.log(config.getConfigData());

    var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
    var sslCreds = grpc.credentials.createSsl(rootCa);
    var addr = `${GATEWAY_IP}:${GATEWAY_PORT}`;

    connect.initClient(addr, sslCreds);
    card.initClient(addr, sslCreds);
    user.initClient(addr, sslCreds);
    event.initClient(addr, sslCreds); 
    event.initCodeMap(CODE_MAP_FILE);   

    console.log("Trying to connect to the devices...");

    deviceMgr.handleConnection(eventMgr.connectionCallback);
    await deviceMgr.connectToDevice();
    eventMgr.handleEvent(userMgr.eventCallback);

    await cli.pressEnter('>>> Press ENTER to show the test menu\n');
    menu.showMenu(async () => {
      await deviceMgr.deleteConnection();
      eventMgr.stopHandleEvent();
    });
  }
  catch(err) {
    console.error(err);
    await deviceMgr.deleteConnection();
    eventMgr.stopHandleEvent();
  }
}

main();