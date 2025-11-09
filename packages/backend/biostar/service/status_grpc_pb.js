// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var status_pb = require('./status_pb.js');
var action_pb = require('./action_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_status_GetConfigRequest(arg) {
  if (!(arg instanceof status_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.status.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_status_GetConfigRequest(buffer_arg) {
  return status_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_status_GetConfigResponse(arg) {
  if (!(arg instanceof status_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.status.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_status_GetConfigResponse(buffer_arg) {
  return status_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_status_SetConfigMultiRequest(arg) {
  if (!(arg instanceof status_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.status.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_status_SetConfigMultiRequest(buffer_arg) {
  return status_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_status_SetConfigMultiResponse(arg) {
  if (!(arg instanceof status_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.status.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_status_SetConfigMultiResponse(buffer_arg) {
  return status_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_status_SetConfigRequest(arg) {
  if (!(arg instanceof status_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.status.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_status_SetConfigRequest(buffer_arg) {
  return status_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_status_SetConfigResponse(arg) {
  if (!(arg instanceof status_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.status.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_status_SetConfigResponse(buffer_arg) {
  return status_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var StatusService = exports.StatusService = {
  getConfig: {
    path: '/gsdk.status.Status/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: status_pb.GetConfigRequest,
    responseType: status_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_status_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_status_GetConfigRequest,
    responseSerialize: serialize_gsdk_status_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_status_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.status.Status/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: status_pb.SetConfigRequest,
    responseType: status_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_status_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_status_SetConfigRequest,
    responseSerialize: serialize_gsdk_status_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_status_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.status.Status/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: status_pb.SetConfigMultiRequest,
    responseType: status_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_status_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_status_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_status_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_status_SetConfigMultiResponse,
  },
};

exports.StatusClient = grpc.makeGenericClientConstructor(StatusService, 'Status');
