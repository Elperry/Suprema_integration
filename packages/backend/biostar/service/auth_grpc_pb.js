// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var auth_pb = require('./auth_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_auth_GetConfigRequest(arg) {
  if (!(arg instanceof auth_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.auth.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_auth_GetConfigRequest(buffer_arg) {
  return auth_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_auth_GetConfigResponse(arg) {
  if (!(arg instanceof auth_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.auth.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_auth_GetConfigResponse(buffer_arg) {
  return auth_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_auth_SetConfigMultiRequest(arg) {
  if (!(arg instanceof auth_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.auth.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_auth_SetConfigMultiRequest(buffer_arg) {
  return auth_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_auth_SetConfigMultiResponse(arg) {
  if (!(arg instanceof auth_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.auth.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_auth_SetConfigMultiResponse(buffer_arg) {
  return auth_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_auth_SetConfigRequest(arg) {
  if (!(arg instanceof auth_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.auth.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_auth_SetConfigRequest(buffer_arg) {
  return auth_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_auth_SetConfigResponse(arg) {
  if (!(arg instanceof auth_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.auth.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_auth_SetConfigResponse(buffer_arg) {
  return auth_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthService = exports.AuthService = {
  getConfig: {
    path: '/gsdk.auth.Auth/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.GetConfigRequest,
    responseType: auth_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_auth_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_auth_GetConfigRequest,
    responseSerialize: serialize_gsdk_auth_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_auth_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.auth.Auth/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.SetConfigRequest,
    responseType: auth_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_auth_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_auth_SetConfigRequest,
    responseSerialize: serialize_gsdk_auth_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_auth_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.auth.Auth/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.SetConfigMultiRequest,
    responseType: auth_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_auth_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_auth_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_auth_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_auth_SetConfigMultiResponse,
  },
};

exports.AuthClient = grpc.makeGenericClientConstructor(AuthService, 'Auth');
