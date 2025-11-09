// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var config_pb = require('./config_pb.js');
var err_pb = require('./err_pb.js');
var system_pb = require('./system_pb.js');

function serialize_gsdk_config_GetSystemRequest(arg) {
  if (!(arg instanceof config_pb.GetSystemRequest)) {
    throw new Error('Expected argument of type gsdk.config.GetSystemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_config_GetSystemRequest(buffer_arg) {
  return config_pb.GetSystemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_config_GetSystemResponse(arg) {
  if (!(arg instanceof config_pb.GetSystemResponse)) {
    throw new Error('Expected argument of type gsdk.config.GetSystemResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_config_GetSystemResponse(buffer_arg) {
  return config_pb.GetSystemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_config_SetSystemMultiRequest(arg) {
  if (!(arg instanceof config_pb.SetSystemMultiRequest)) {
    throw new Error('Expected argument of type gsdk.config.SetSystemMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_config_SetSystemMultiRequest(buffer_arg) {
  return config_pb.SetSystemMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_config_SetSystemMultiResponse(arg) {
  if (!(arg instanceof config_pb.SetSystemMultiResponse)) {
    throw new Error('Expected argument of type gsdk.config.SetSystemMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_config_SetSystemMultiResponse(buffer_arg) {
  return config_pb.SetSystemMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_config_SetSystemRequest(arg) {
  if (!(arg instanceof config_pb.SetSystemRequest)) {
    throw new Error('Expected argument of type gsdk.config.SetSystemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_config_SetSystemRequest(buffer_arg) {
  return config_pb.SetSystemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_config_SetSystemResponse(arg) {
  if (!(arg instanceof config_pb.SetSystemResponse)) {
    throw new Error('Expected argument of type gsdk.config.SetSystemResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_config_SetSystemResponse(buffer_arg) {
  return config_pb.SetSystemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ConfigService = exports.ConfigService = {
  getSystem: {
    path: '/gsdk.config.Config/GetSystem',
    requestStream: false,
    responseStream: false,
    requestType: config_pb.GetSystemRequest,
    responseType: config_pb.GetSystemResponse,
    requestSerialize: serialize_gsdk_config_GetSystemRequest,
    requestDeserialize: deserialize_gsdk_config_GetSystemRequest,
    responseSerialize: serialize_gsdk_config_GetSystemResponse,
    responseDeserialize: deserialize_gsdk_config_GetSystemResponse,
  },
  setSystem: {
    path: '/gsdk.config.Config/SetSystem',
    requestStream: false,
    responseStream: false,
    requestType: config_pb.SetSystemRequest,
    responseType: config_pb.SetSystemResponse,
    requestSerialize: serialize_gsdk_config_SetSystemRequest,
    requestDeserialize: deserialize_gsdk_config_SetSystemRequest,
    responseSerialize: serialize_gsdk_config_SetSystemResponse,
    responseDeserialize: deserialize_gsdk_config_SetSystemResponse,
  },
  setSystemMulti: {
    path: '/gsdk.config.Config/SetSystemMulti',
    requestStream: false,
    responseStream: false,
    requestType: config_pb.SetSystemMultiRequest,
    responseType: config_pb.SetSystemMultiResponse,
    requestSerialize: serialize_gsdk_config_SetSystemMultiRequest,
    requestDeserialize: deserialize_gsdk_config_SetSystemMultiRequest,
    responseSerialize: serialize_gsdk_config_SetSystemMultiResponse,
    responseDeserialize: deserialize_gsdk_config_SetSystemMultiResponse,
  },
};

exports.ConfigClient = grpc.makeGenericClientConstructor(ConfigService);
