const grpc = require('grpc');
const fs = require('fs');
const cli = require('./cli');
const connect = require('../connect');

const GATEWAY_CA_FILE = '../../../../cert/gateway/192.168.28.111/ca.crt';
const GATEWAY_IP = '192.168.28.150';
const GATEWAY_PORT = 4000;

const QUEUE_SIZE = 16;

function main() {
  var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa);

  connect.initClient(`${GATEWAY_IP}:${GATEWAY_PORT}`, sslCreds);

  cli.showMainMenu();

  var sub = connect.subscribe(QUEUE_SIZE);
  cli.setSubChannel(sub);

  sub.on('data', (status) => {
    var devStatus = status.getStatus();

    switch(devStatus) {
      case connect.connectMessage.Status.DISCONNECTED:
        console.log('\n[Disconnected]: ', status.toObject());
        break;

      case connect.connectMessage.Status.TCP_CONNECTED:
        console.log('\n[TCP Connected]: ', status.toObject());
        break;

      case connect.connectMessage.Status.TLS_CONNECTED:
        console.log('\n[TLS Connected]: ', status.toObject());
        break;
    }
  });

  sub.on('end', () => {
    console.log('Subscription is finished');
  });

  sub.on('error', (err) => {
    if(err.details === 'Cancelled') {
      console.log("Subscription is cancelled");
    } else {
      console.log('Subscription error: ', err);
    }
  })
}

main();