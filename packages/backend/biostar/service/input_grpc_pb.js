// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var input_pb = require('./input_pb.js');
var device_pb = require('./device_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_input_GetConfigRequest(arg) {
  if (!(arg instanceof input_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.input.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_input_GetConfigRequest(buffer_arg) {
  return input_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_input_GetConfigResponse(arg) {
  if (!(arg instanceof input_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.input.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_input_GetConfigResponse(buffer_arg) {
  return input_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_input_SetConfigMultiRequest(arg) {
  if (!(arg instanceof input_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.input.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_input_SetConfigMultiRequest(buffer_arg) {
  return input_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_input_SetConfigMultiResponse(arg) {
  if (!(arg instanceof input_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.input.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_input_SetConfigMultiResponse(buffer_arg) {
  return input_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_input_SetConfigRequest(arg) {
  if (!(arg instanceof input_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.input.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_input_SetConfigRequest(buffer_arg) {
  return input_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_input_SetConfigResponse(arg) {
  if (!(arg instanceof input_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.input.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_input_SetConfigResponse(buffer_arg) {
  return input_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var InputService = exports.InputService = {
  getConfig: {
    path: '/gsdk.input.Input/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: input_pb.GetConfigRequest,
    responseType: input_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_input_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_input_GetConfigRequest,
    responseSerialize: serialize_gsdk_input_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_input_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.input.Input/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: input_pb.SetConfigRequest,
    responseType: input_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_input_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_input_SetConfigRequest,
    responseSerialize: serialize_gsdk_input_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_input_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.input.Input/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: input_pb.SetConfigMultiRequest,
    responseType: input_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_input_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_input_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_input_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_input_SetConfigMultiResponse,
  },
};

exports.InputClient = grpc.makeGenericClientConstructor(InputService, 'Input');
