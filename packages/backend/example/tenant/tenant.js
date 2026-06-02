const tenantMessage = require('../../biostar/service/tenant_pb');
const tenantService = require('../../biostar/service/tenant_grpc_pb');

const ADMIN_TENANT_ID = "administrator";

var tenantClient = null;

function initClient(addr, credential) {
  tenantClient = new tenantService.TenantClient(addr, credential);

  return tenantClient
}

function getClient() {
  return tenantClient;
}

function get(tenantIDs) {
  var req = new tenantMessage.GetRequest();
  req.setTenantidsList(tenantIDs);

  return new Promise((resolve, reject) => {
    tenantClient.get(req, (err, response) => {
      if(err) {
        // console.error('Cannot get tenant infos: ', err)
        reject(err);
        return;
      }

      resolve(response.getTenantinfosList());
    });
  });
}


function add(tenantInfos) {
  var req = new tenantMessage.AddRequest();
  req.setTenantinfosList(tenantInfos);

  return new Promise((resolve, reject) => {
    tenantClient.add(req, (err, response) => {
      if(err) {
        console.error('Cannot add the tenant: ', err)
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.initClient = initClient;
module.exports.get = get;
module.exports.add = add;
