import grpc from '@grpc/grpc-js';
import fs from 'fs';
import config from './config.js';
import deviceMgr from './device.js';
import eventMgr from './event.js';
import userMgr from './user.js';
import menu from './menu.js';
import cli from '../cli.js';
import connect from '../connect.js';
import card from '../card.js';
import user from '../user.js';
import event from '../event.js';

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