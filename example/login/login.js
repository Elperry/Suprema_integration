const loginMessage = require('../../biostar/service/login_pb');
const loginService = require('../../biostar/service/login_grpc_pb');

const ADMIN_TENANT_ID = "administrator";

var loginClient = null;

function initClient(addr, credential) {
  loginClient = new loginService.LoginClient(addr, credential);

  return loginClient
}

function getClient() {
  return loginClient;
}

function login(tenantCert) {
  var req = new loginMessage.LoginRequest();
  req.setTenantcert(tenantCert);

  return new Promise((resolve, reject) => {
    loginClient.login(req, (err, response) => {
      if(err) {
        console.error('Cannot login: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().jwttoken);
    });
  });
}


function loginAdmin(adminCert) {
  var req = new loginMessage.LoginAdminRequest();
  req.setAdmintenantcert(adminCert);
  req.setTenantid(ADMIN_TENANT_ID);

  return new Promise((resolve, reject) => {
    loginClient.loginAdmin(req, (err, response) => {
      if(err) {
        console.error('Cannot login as an administrator: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().jwttoken);
    });
  });
}


module.exports.initClient = initClient;
module.exports.login = login;
module.exports.loginAdmin = loginAdmin;
