// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var gateway_pb = require('./gateway_pb.js');
var cert_pb = require('./cert_pb.js');

function serialize_gsdk_gateway_AddCertificateBlacklistRequest(arg) {
  if (!(arg instanceof gateway_pb.AddCertificateBlacklistRequest)) {
    throw new Error('Expected argument of type gsdk.gateway.AddCertificateBlacklistRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_AddCertificateBlacklistRequest(buffer_arg) {
  return gateway_pb.AddCertificateBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_AddCertificateBlacklistResponse(arg) {
  if (!(arg instanceof gateway_pb.AddCertificateBlacklistResponse)) {
    throw new Error('Expected argument of type gsdk.gateway.AddCertificateBlacklistResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_AddCertificateBlacklistResponse(buffer_arg) {
  return gateway_pb.AddCertificateBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_AddRequest(arg) {
  if (!(arg instanceof gateway_pb.AddRequest)) {
    throw new Error('Expected argument of type gsdk.gateway.AddRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_AddRequest(buffer_arg) {
  return gateway_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_AddResponse(arg) {
  if (!(arg instanceof gateway_pb.AddResponse)) {
    throw new Error('Expected argument of type gsdk.gateway.AddResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_AddResponse(buffer_arg) {
  return gateway_pb.AddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_CreateCertificateRequest(arg) {
  if (!(arg instanceof gateway_pb.CreateCertificateRequest)) {
    throw new Error('Expected argument of type gsdk.gateway.CreateCertificateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_CreateCertificateRequest(buffer_arg) {
  return gateway_pb.CreateCertificateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_CreateCertificateResponse(arg) {
  if (!(arg instanceof gateway_pb.CreateCertificateResponse)) {
    throw new Error('Expected argument of type gsdk.gateway.CreateCertificateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_CreateCertificateResponse(buffer_arg) {
  return gateway_pb.CreateCertificateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_DeleteCertificateBlacklistRequest(arg) {
  if (!(arg instanceof gateway_pb.DeleteCertificateBlacklistRequest)) {
    throw new Error('Expected argument of type gsdk.gateway.DeleteCertificateBlacklistRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_DeleteCertificateBlacklistRequest(buffer_arg) {
  return gateway_pb.DeleteCertificateBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_DeleteCertificateBlacklistResponse(arg) {
  if (!(arg instanceof gateway_pb.DeleteCertificateBlacklistResponse)) {
    throw new Error('Expected argument of type gsdk.gateway.DeleteCertificateBlacklistResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_DeleteCertificateBlacklistResponse(buffer_arg) {
  return gateway_pb.DeleteCertificateBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_DeleteRequest(arg) {
  if (!(arg instanceof gateway_pb.DeleteRequest)) {
    throw new Error('Expected argument of type gsdk.gateway.DeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_DeleteRequest(buffer_arg) {
  return gateway_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_DeleteResponse(arg) {
  if (!(arg instanceof gateway_pb.DeleteResponse)) {
    throw new Error('Expected argument of type gsdk.gateway.DeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_DeleteResponse(buffer_arg) {
  return gateway_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_GetCertificateBlacklistRequest(arg) {
  if (!(arg instanceof gateway_pb.GetCertificateBlacklistRequest)) {
    throw new Error('Expected argument of type gsdk.gateway.GetCertificateBlacklistRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_GetCertificateBlacklistRequest(buffer_arg) {
  return gateway_pb.GetCertificateBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_GetCertificateBlacklistResponse(arg) {
  if (!(arg instanceof gateway_pb.GetCertificateBlacklistResponse)) {
    throw new Error('Expected argument of type gsdk.gateway.GetCertificateBlacklistResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_GetCertificateBlacklistResponse(buffer_arg) {
  return gateway_pb.GetCertificateBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_GetIssuanceHistoryRequest(arg) {
  if (!(arg instanceof gateway_pb.GetIssuanceHistoryRequest)) {
    throw new Error('Expected argument of type gsdk.gateway.GetIssuanceHistoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_GetIssuanceHistoryRequest(buffer_arg) {
  return gateway_pb.GetIssuanceHistoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_GetIssuanceHistoryResponse(arg) {
  if (!(arg instanceof gateway_pb.GetIssuanceHistoryResponse)) {
    throw new Error('Expected argument of type gsdk.gateway.GetIssuanceHistoryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_GetIssuanceHistoryResponse(buffer_arg) {
  return gateway_pb.GetIssuanceHistoryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_GetListRequest(arg) {
  if (!(arg instanceof gateway_pb.GetListRequest)) {
    throw new Error('Expected argument of type gsdk.gateway.GetListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_GetListRequest(buffer_arg) {
  return gateway_pb.GetListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_GetListResponse(arg) {
  if (!(arg instanceof gateway_pb.GetListResponse)) {
    throw new Error('Expected argument of type gsdk.gateway.GetListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_GetListResponse(buffer_arg) {
  return gateway_pb.GetListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_GetRequest(arg) {
  if (!(arg instanceof gateway_pb.GetRequest)) {
    throw new Error('Expected argument of type gsdk.gateway.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_GetRequest(buffer_arg) {
  return gateway_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_GetResponse(arg) {
  if (!(arg instanceof gateway_pb.GetResponse)) {
    throw new Error('Expected argument of type gsdk.gateway.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_GetResponse(buffer_arg) {
  return gateway_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_StatusChange(arg) {
  if (!(arg instanceof gateway_pb.StatusChange)) {
    throw new Error('Expected argument of type gsdk.gateway.StatusChange');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_StatusChange(buffer_arg) {
  return gateway_pb.StatusChange.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_gateway_SubscribeStatusRequest(arg) {
  if (!(arg instanceof gateway_pb.SubscribeStatusRequest)) {
    throw new Error('Expected argument of type gsdk.gateway.SubscribeStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_gateway_SubscribeStatusRequest(buffer_arg) {
  return gateway_pb.SubscribeStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var GatewayService = exports.GatewayService = {
  getList: {
    path: '/gsdk.gateway.Gateway/GetList',
    requestStream: false,
    responseStream: false,
    requestType: gateway_pb.GetListRequest,
    responseType: gateway_pb.GetListResponse,
    requestSerialize: serialize_gsdk_gateway_GetListRequest,
    requestDeserialize: deserialize_gsdk_gateway_GetListRequest,
    responseSerialize: serialize_gsdk_gateway_GetListResponse,
    responseDeserialize: deserialize_gsdk_gateway_GetListResponse,
  },
  get: {
    path: '/gsdk.gateway.Gateway/Get',
    requestStream: false,
    responseStream: false,
    requestType: gateway_pb.GetRequest,
    responseType: gateway_pb.GetResponse,
    requestSerialize: serialize_gsdk_gateway_GetRequest,
    requestDeserialize: deserialize_gsdk_gateway_GetRequest,
    responseSerialize: serialize_gsdk_gateway_GetResponse,
    responseDeserialize: deserialize_gsdk_gateway_GetResponse,
  },
  add: {
    path: '/gsdk.gateway.Gateway/Add',
    requestStream: false,
    responseStream: false,
    requestType: gateway_pb.AddRequest,
    responseType: gateway_pb.AddResponse,
    requestSerialize: serialize_gsdk_gateway_AddRequest,
    requestDeserialize: deserialize_gsdk_gateway_AddRequest,
    responseSerialize: serialize_gsdk_gateway_AddResponse,
    responseDeserialize: deserialize_gsdk_gateway_AddResponse,
  },
  delete: {
    path: '/gsdk.gateway.Gateway/Delete',
    requestStream: false,
    responseStream: false,
    requestType: gateway_pb.DeleteRequest,
    responseType: gateway_pb.DeleteResponse,
    requestSerialize: serialize_gsdk_gateway_DeleteRequest,
    requestDeserialize: deserialize_gsdk_gateway_DeleteRequest,
    responseSerialize: serialize_gsdk_gateway_DeleteResponse,
    responseDeserialize: deserialize_gsdk_gateway_DeleteResponse,
  },
  createCertificate: {
    path: '/gsdk.gateway.Gateway/CreateCertificate',
    requestStream: false,
    responseStream: false,
    requestType: gateway_pb.CreateCertificateRequest,
    responseType: gateway_pb.CreateCertificateResponse,
    requestSerialize: serialize_gsdk_gateway_CreateCertificateRequest,
    requestDeserialize: deserialize_gsdk_gateway_CreateCertificateRequest,
    responseSerialize: serialize_gsdk_gateway_CreateCertificateResponse,
    responseDeserialize: deserialize_gsdk_gateway_CreateCertificateResponse,
  },
  getIssuanceHistory: {
    path: '/gsdk.gateway.Gateway/GetIssuanceHistory',
    requestStream: false,
    responseStream: false,
    requestType: gateway_pb.GetIssuanceHistoryRequest,
    responseType: gateway_pb.GetIssuanceHistoryResponse,
    requestSerialize: serialize_gsdk_gateway_GetIssuanceHistoryRequest,
    requestDeserialize: deserialize_gsdk_gateway_GetIssuanceHistoryRequest,
    responseSerialize: serialize_gsdk_gateway_GetIssuanceHistoryResponse,
    responseDeserialize: deserialize_gsdk_gateway_GetIssuanceHistoryResponse,
  },
  getCertificateBlacklist: {
    path: '/gsdk.gateway.Gateway/GetCertificateBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: gateway_pb.GetCertificateBlacklistRequest,
    responseType: gateway_pb.GetCertificateBlacklistResponse,
    requestSerialize: serialize_gsdk_gateway_GetCertificateBlacklistRequest,
    requestDeserialize: deserialize_gsdk_gateway_GetCertificateBlacklistRequest,
    responseSerialize: serialize_gsdk_gateway_GetCertificateBlacklistResponse,
    responseDeserialize: deserialize_gsdk_gateway_GetCertificateBlacklistResponse,
  },
  addCertificateBlacklist: {
    path: '/gsdk.gateway.Gateway/AddCertificateBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: gateway_pb.AddCertificateBlacklistRequest,
    responseType: gateway_pb.AddCertificateBlacklistResponse,
    requestSerialize: serialize_gsdk_gateway_AddCertificateBlacklistRequest,
    requestDeserialize: deserialize_gsdk_gateway_AddCertificateBlacklistRequest,
    responseSerialize: serialize_gsdk_gateway_AddCertificateBlacklistResponse,
    responseDeserialize: deserialize_gsdk_gateway_AddCertificateBlacklistResponse,
  },
  deleteCertificateBlacklist: {
    path: '/gsdk.gateway.Gateway/DeleteCertificateBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: gateway_pb.DeleteCertificateBlacklistRequest,
    responseType: gateway_pb.DeleteCertificateBlacklistResponse,
    requestSerialize: serialize_gsdk_gateway_DeleteCertificateBlacklistRequest,
    requestDeserialize: deserialize_gsdk_gateway_DeleteCertificateBlacklistRequest,
    responseSerialize: serialize_gsdk_gateway_DeleteCertificateBlacklistResponse,
    responseDeserialize: deserialize_gsdk_gateway_DeleteCertificateBlacklistResponse,
  },
  subscribeStatus: {
    path: '/gsdk.gateway.Gateway/SubscribeStatus',
    requestStream: false,
    responseStream: true,
    requestType: gateway_pb.SubscribeStatusRequest,
    responseType: gateway_pb.StatusChange,
    requestSerialize: serialize_gsdk_gateway_SubscribeStatusRequest,
    requestDeserialize: deserialize_gsdk_gateway_SubscribeStatusRequest,
    responseSerialize: serialize_gsdk_gateway_StatusChange,
    responseDeserialize: deserialize_gsdk_gateway_StatusChange,
  },
};

exports.GatewayClient = grpc.makeGenericClientConstructor(GatewayService, 'Gateway');
