// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var voip_pb = require('./voip_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_voip_GetConfigRequest(arg) {
  if (!(arg instanceof voip_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.voip.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_voip_GetConfigRequest(buffer_arg) {
  return voip_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_voip_GetConfigResponse(arg) {
  if (!(arg instanceof voip_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.voip.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_voip_GetConfigResponse(buffer_arg) {
  return voip_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_voip_SetConfigMultiRequest(arg) {
  if (!(arg instanceof voip_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.voip.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_voip_SetConfigMultiRequest(buffer_arg) {
  return voip_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_voip_SetConfigMultiResponse(arg) {
  if (!(arg instanceof voip_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.voip.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_voip_SetConfigMultiResponse(buffer_arg) {
  return voip_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_voip_SetConfigRequest(arg) {
  if (!(arg instanceof voip_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.voip.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_voip_SetConfigRequest(buffer_arg) {
  return voip_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_voip_SetConfigResponse(arg) {
  if (!(arg instanceof voip_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.voip.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_voip_SetConfigResponse(buffer_arg) {
  return voip_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var VOIPService = exports.VOIPService = {
  getConfig: {
    path: '/gsdk.voip.VOIP/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: voip_pb.GetConfigRequest,
    responseType: voip_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_voip_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_voip_GetConfigRequest,
    responseSerialize: serialize_gsdk_voip_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_voip_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.voip.VOIP/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: voip_pb.SetConfigRequest,
    responseType: voip_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_voip_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_voip_SetConfigRequest,
    responseSerialize: serialize_gsdk_voip_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_voip_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.voip.VOIP/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: voip_pb.SetConfigMultiRequest,
    responseType: voip_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_voip_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_voip_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_voip_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_voip_SetConfigMultiResponse,
  },
};

exports.VOIPClient = grpc.makeGenericClientConstructor(VOIPService, 'VOIP');
