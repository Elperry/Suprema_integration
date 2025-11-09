const config = require('./config');
const connect = require('../connect');

const QUEUE_SIZE = 16;

var connectedIDs = [];
var sub = null;

async function connectToDevice() {
  var connInfos = config.getAsyncConnectInfo();

  await connect.addAsyncConnection(connInfos);
}

async function getConnectedDevices(refreshList) {
  if(!refreshList) {
    return connectedIDs.slice();
  }

  var devInfos = await connect.getDeviceList();
  var devIDs = [];

  for(info of devInfos) {
    var dev = info.toObject();

    if(dev.status == connect.connectMessage.Status.TCP_CONNECTED || dev.status == connect.connectMessage.Status.TLS_CONNECTED) {
      devIDs.push(dev.deviceid);
    }
  }

  connectedIDs = devIDs.slice();
  return devIDs;
}

async function deleteConnection() {
  if(connectedIDs.length > 0) {
    await connect.deleteAsyncConnection(connectedIDs);
  }

  if(sub != null) {
    sub.cancel();
  }
}

function handleConnection(connCallback) {
  sub = connect.subscribe(QUEUE_SIZE);

  sub.on('data', (status) => {
    var devStatus = status.getStatus();

    switch(devStatus) {
      case connect.connectMessage.Status.DISCONNECTED:
        console.log('\n[Disconnected]: ', status.toObject());
        var index = connectedIDs.indexOf(status.getDeviceid());
        if(index >= 0) {
          connectedIDs.splice(index, 1);
        }        
        break;

      case connect.connectMessage.Status.TCP_CONNECTED:
        console.log('\n[TCP Connected]: ', status.toObject());
        connectedIDs.push(status.getDeviceid());

        if(connCallback) {
          connCallback(status.getDeviceid());
        }
        break;

      case connect.connectMessage.Status.TLS_CONNECTED:
        console.log('\n[TLS Connected]: ', status.toObject());
        connectedIDs.push(status.getDeviceid());

        if(connCallback) {
          connCallback(status.getDeviceid());
        }
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
  });
}

module.exports.connectToDevice = connectToDevice;
module.exports.getConnectedDevices = getConnectedDevices;
module.exports.deleteConnection = deleteConnection;
module.exports.handleConnection = handleConnection;