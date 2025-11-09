// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var tenant_pb = require('./tenant_pb.js');
var cert_pb = require('./cert_pb.js');

function serialize_gsdk_tenant_AddCertificateBlacklistRequest(arg) {
  if (!(arg instanceof tenant_pb.AddCertificateBlacklistRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.AddCertificateBlacklistRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_AddCertificateBlacklistRequest(buffer_arg) {
  return tenant_pb.AddCertificateBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_AddCertificateBlacklistResponse(arg) {
  if (!(arg instanceof tenant_pb.AddCertificateBlacklistResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.AddCertificateBlacklistResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_AddCertificateBlacklistResponse(buffer_arg) {
  return tenant_pb.AddCertificateBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_AddGatewayRequest(arg) {
  if (!(arg instanceof tenant_pb.AddGatewayRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.AddGatewayRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_AddGatewayRequest(buffer_arg) {
  return tenant_pb.AddGatewayRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_AddGatewayResponse(arg) {
  if (!(arg instanceof tenant_pb.AddGatewayResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.AddGatewayResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_AddGatewayResponse(buffer_arg) {
  return tenant_pb.AddGatewayResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_AddRequest(arg) {
  if (!(arg instanceof tenant_pb.AddRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.AddRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_AddRequest(buffer_arg) {
  return tenant_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_AddResponse(arg) {
  if (!(arg instanceof tenant_pb.AddResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.AddResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_AddResponse(buffer_arg) {
  return tenant_pb.AddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_CreateCertificateRequest(arg) {
  if (!(arg instanceof tenant_pb.CreateCertificateRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.CreateCertificateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_CreateCertificateRequest(buffer_arg) {
  return tenant_pb.CreateCertificateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_CreateCertificateResponse(arg) {
  if (!(arg instanceof tenant_pb.CreateCertificateResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.CreateCertificateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_CreateCertificateResponse(buffer_arg) {
  return tenant_pb.CreateCertificateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_DeleteCertificateBlacklistRequest(arg) {
  if (!(arg instanceof tenant_pb.DeleteCertificateBlacklistRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.DeleteCertificateBlacklistRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_DeleteCertificateBlacklistRequest(buffer_arg) {
  return tenant_pb.DeleteCertificateBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_DeleteCertificateBlacklistResponse(arg) {
  if (!(arg instanceof tenant_pb.DeleteCertificateBlacklistResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.DeleteCertificateBlacklistResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_DeleteCertificateBlacklistResponse(buffer_arg) {
  return tenant_pb.DeleteCertificateBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_DeleteGatewayRequest(arg) {
  if (!(arg instanceof tenant_pb.DeleteGatewayRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.DeleteGatewayRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_DeleteGatewayRequest(buffer_arg) {
  return tenant_pb.DeleteGatewayRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_DeleteGatewayResponse(arg) {
  if (!(arg instanceof tenant_pb.DeleteGatewayResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.DeleteGatewayResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_DeleteGatewayResponse(buffer_arg) {
  return tenant_pb.DeleteGatewayResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_DeleteRequest(arg) {
  if (!(arg instanceof tenant_pb.DeleteRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.DeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_DeleteRequest(buffer_arg) {
  return tenant_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_DeleteResponse(arg) {
  if (!(arg instanceof tenant_pb.DeleteResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.DeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_DeleteResponse(buffer_arg) {
  return tenant_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_GetCertificateBlacklistRequest(arg) {
  if (!(arg instanceof tenant_pb.GetCertificateBlacklistRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.GetCertificateBlacklistRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_GetCertificateBlacklistRequest(buffer_arg) {
  return tenant_pb.GetCertificateBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_GetCertificateBlacklistResponse(arg) {
  if (!(arg instanceof tenant_pb.GetCertificateBlacklistResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.GetCertificateBlacklistResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_GetCertificateBlacklistResponse(buffer_arg) {
  return tenant_pb.GetCertificateBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_GetIssuanceHistoryRequest(arg) {
  if (!(arg instanceof tenant_pb.GetIssuanceHistoryRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.GetIssuanceHistoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_GetIssuanceHistoryRequest(buffer_arg) {
  return tenant_pb.GetIssuanceHistoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_GetIssuanceHistoryResponse(arg) {
  if (!(arg instanceof tenant_pb.GetIssuanceHistoryResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.GetIssuanceHistoryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_GetIssuanceHistoryResponse(buffer_arg) {
  return tenant_pb.GetIssuanceHistoryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_GetListRequest(arg) {
  if (!(arg instanceof tenant_pb.GetListRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.GetListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_GetListRequest(buffer_arg) {
  return tenant_pb.GetListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_GetListResponse(arg) {
  if (!(arg instanceof tenant_pb.GetListResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.GetListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_GetListResponse(buffer_arg) {
  return tenant_pb.GetListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_GetRequest(arg) {
  if (!(arg instanceof tenant_pb.GetRequest)) {
    throw new Error('Expected argument of type gsdk.tenant.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_GetRequest(buffer_arg) {
  return tenant_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tenant_GetResponse(arg) {
  if (!(arg instanceof tenant_pb.GetResponse)) {
    throw new Error('Expected argument of type gsdk.tenant.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tenant_GetResponse(buffer_arg) {
  return tenant_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TenantService = exports.TenantService = {
  getList: {
    path: '/gsdk.tenant.Tenant/GetList',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.GetListRequest,
    responseType: tenant_pb.GetListResponse,
    requestSerialize: serialize_gsdk_tenant_GetListRequest,
    requestDeserialize: deserialize_gsdk_tenant_GetListRequest,
    responseSerialize: serialize_gsdk_tenant_GetListResponse,
    responseDeserialize: deserialize_gsdk_tenant_GetListResponse,
  },
  get: {
    path: '/gsdk.tenant.Tenant/Get',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.GetRequest,
    responseType: tenant_pb.GetResponse,
    requestSerialize: serialize_gsdk_tenant_GetRequest,
    requestDeserialize: deserialize_gsdk_tenant_GetRequest,
    responseSerialize: serialize_gsdk_tenant_GetResponse,
    responseDeserialize: deserialize_gsdk_tenant_GetResponse,
  },
  add: {
    path: '/gsdk.tenant.Tenant/Add',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.AddRequest,
    responseType: tenant_pb.AddResponse,
    requestSerialize: serialize_gsdk_tenant_AddRequest,
    requestDeserialize: deserialize_gsdk_tenant_AddRequest,
    responseSerialize: serialize_gsdk_tenant_AddResponse,
    responseDeserialize: deserialize_gsdk_tenant_AddResponse,
  },
  delete: {
    path: '/gsdk.tenant.Tenant/Delete',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.DeleteRequest,
    responseType: tenant_pb.DeleteResponse,
    requestSerialize: serialize_gsdk_tenant_DeleteRequest,
    requestDeserialize: deserialize_gsdk_tenant_DeleteRequest,
    responseSerialize: serialize_gsdk_tenant_DeleteResponse,
    responseDeserialize: deserialize_gsdk_tenant_DeleteResponse,
  },
  addGateway: {
    path: '/gsdk.tenant.Tenant/AddGateway',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.AddGatewayRequest,
    responseType: tenant_pb.AddGatewayResponse,
    requestSerialize: serialize_gsdk_tenant_AddGatewayRequest,
    requestDeserialize: deserialize_gsdk_tenant_AddGatewayRequest,
    responseSerialize: serialize_gsdk_tenant_AddGatewayResponse,
    responseDeserialize: deserialize_gsdk_tenant_AddGatewayResponse,
  },
  deleteGateway: {
    path: '/gsdk.tenant.Tenant/DeleteGateway',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.DeleteGatewayRequest,
    responseType: tenant_pb.DeleteGatewayResponse,
    requestSerialize: serialize_gsdk_tenant_DeleteGatewayRequest,
    requestDeserialize: deserialize_gsdk_tenant_DeleteGatewayRequest,
    responseSerialize: serialize_gsdk_tenant_DeleteGatewayResponse,
    responseDeserialize: deserialize_gsdk_tenant_DeleteGatewayResponse,
  },
  createCertificate: {
    path: '/gsdk.tenant.Tenant/CreateCertificate',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.CreateCertificateRequest,
    responseType: tenant_pb.CreateCertificateResponse,
    requestSerialize: serialize_gsdk_tenant_CreateCertificateRequest,
    requestDeserialize: deserialize_gsdk_tenant_CreateCertificateRequest,
    responseSerialize: serialize_gsdk_tenant_CreateCertificateResponse,
    responseDeserialize: deserialize_gsdk_tenant_CreateCertificateResponse,
  },
  getIssuanceHistory: {
    path: '/gsdk.tenant.Tenant/GetIssuanceHistory',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.GetIssuanceHistoryRequest,
    responseType: tenant_pb.GetIssuanceHistoryResponse,
    requestSerialize: serialize_gsdk_tenant_GetIssuanceHistoryRequest,
    requestDeserialize: deserialize_gsdk_tenant_GetIssuanceHistoryRequest,
    responseSerialize: serialize_gsdk_tenant_GetIssuanceHistoryResponse,
    responseDeserialize: deserialize_gsdk_tenant_GetIssuanceHistoryResponse,
  },
  getCertificateBlacklist: {
    path: '/gsdk.tenant.Tenant/GetCertificateBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.GetCertificateBlacklistRequest,
    responseType: tenant_pb.GetCertificateBlacklistResponse,
    requestSerialize: serialize_gsdk_tenant_GetCertificateBlacklistRequest,
    requestDeserialize: deserialize_gsdk_tenant_GetCertificateBlacklistRequest,
    responseSerialize: serialize_gsdk_tenant_GetCertificateBlacklistResponse,
    responseDeserialize: deserialize_gsdk_tenant_GetCertificateBlacklistResponse,
  },
  addCertificateBlacklist: {
    path: '/gsdk.tenant.Tenant/AddCertificateBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.AddCertificateBlacklistRequest,
    responseType: tenant_pb.AddCertificateBlacklistResponse,
    requestSerialize: serialize_gsdk_tenant_AddCertificateBlacklistRequest,
    requestDeserialize: deserialize_gsdk_tenant_AddCertificateBlacklistRequest,
    responseSerialize: serialize_gsdk_tenant_AddCertificateBlacklistResponse,
    responseDeserialize: deserialize_gsdk_tenant_AddCertificateBlacklistResponse,
  },
  deleteCertificateBlacklist: {
    path: '/gsdk.tenant.Tenant/DeleteCertificateBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: tenant_pb.DeleteCertificateBlacklistRequest,
    responseType: tenant_pb.DeleteCertificateBlacklistResponse,
    requestSerialize: serialize_gsdk_tenant_DeleteCertificateBlacklistRequest,
    requestDeserialize: deserialize_gsdk_tenant_DeleteCertificateBlacklistRequest,
    responseSerialize: serialize_gsdk_tenant_DeleteCertificateBlacklistResponse,
    responseDeserialize: deserialize_gsdk_tenant_DeleteCertificateBlacklistResponse,
  },
};

exports.TenantClient = grpc.makeGenericClientConstructor(TenantService, 'Tenant');
