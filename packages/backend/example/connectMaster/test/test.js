const grpc = require('grpc');
const fs = require('fs');
const cli = require('./cli');
const connectMaster = require('../connectMaster');
const connect = require('../../connect');
const login = require('../../login');
const tenant = require('../../tenant');
const tenantMessage = require('../../../biostar/service/tenant_pb');

const MASTER_CA_FILE = '../../../../cert/master/192.168.28.21/master_ca.crt';
const MASTER_IP = '192.168.28.21';
const MASTER_PORT = 4010;
const TENANT_CERT_FILE = '../../../../cert/master/tenant1.crt';
const TENANT_KEY_FILE = '../../../../cert/master/tenant1_key.pem';
const ADMIN_CERT_FILE = '../../../../cert/master/admin.crt';
const ADMIN_KEY_FILE = '../../../../cert/master/admin_key.pem';

const TENANT_ID = "tenant1";
const GATEWAY_ID = "gateway1";

const QUEUE_SIZE = 16;

function main() {
  var args = process.argv.slice(2);

  for (arg of args) {
    if(arg == '-i') {
      initMasterGateway();
      return;
    }
  }

  var rootCa = fs.readFileSync(MASTER_CA_FILE);
  var tenantCert = fs.readFileSync(TENANT_CERT_FILE);
  var tenantKey = fs.readFileSync(TENANT_KEY_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa, tenantKey, tenantCert); 

  var addr = `${MASTER_IP}:${MASTER_PORT}`;

  login.initClient(addr, sslCreds);
  
  login.login(tenantCert.toString())
  .then((jwtToken) => {
    var callCreds = grpc.credentials.createFromMetadataGenerator((args, callback) => {
      const metadata = new grpc.Metadata();
      metadata.set('token', jwtToken);
      callback(null, metadata);
    });
  
    return grpc.credentials.combineChannelCredentials(sslCreds, callCreds);
  })
  .then((creds) => {
    channelCreds = creds;
    connectMaster.initClient(addr, channelCreds);

    cli.showMainMenu();
    cli.setGatewayID(GATEWAY_ID);

    var sub = connectMaster.subscribe(QUEUE_SIZE);
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
  })
  .catch((err) => {
    console.error(err);
  });    
}


function initMasterGateway() {
  var rootCa = fs.readFileSync(MASTER_CA_FILE);
  var adminCert = fs.readFileSync(ADMIN_CERT_FILE);
  var adminKey = fs.readFileSync(ADMIN_KEY_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa, adminKey, adminCert); 

  var addr = `${MASTER_IP}:${MASTER_PORT}`;

  login.initClient(addr, sslCreds);
  
  login.loginAdmin(adminCert.toString())
  .then((jwtToken) => 
  {
    var callCreds = grpc.credentials.createFromMetadataGenerator((args, callback) => {
      const metadata = new grpc.Metadata();
      metadata.set('token', jwtToken);
      callback(null, metadata);
    });
  
    return grpc.credentials.combineChannelCredentials(sslCreds, callCreds);
  })
  .then((creds) => {
    tenant.initClient(addr, creds);

    var tenantIDs = [];
    tenantIDs.push(TENANT_ID);

    return tenant.get(tenantIDs)
    .then((tenantInfos) => {
      console.log(`${TENANT_ID} is already registered`)
    })
    .catch((err) => {
      console.log(`${TENANT_ID} is not registered. Trying to add the tenant...`);
      var tenantInfo = new tenantMessage.TenantInfo();
      tenantInfo.setTenantid(TENANT_ID);
      var gatewayIDs = [];
      gatewayIDs.push(GATEWAY_ID);
      tenantInfo.setGatewayidsList(gatewayIDs);
      var tenantInfos = [];
      tenantInfos.push(tenantInfo);

      return tenant.add(tenantInfos)
      .then(() => {
        console.log(`${TENANT_ID} is registered successfully`);
      })
    })
  })
  .catch((err) => {
    console.error(err);
  });    
}


main();