// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var action_pb = require('./action_pb.js');
var device_pb = require('./device_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_action_GetConfigRequest(arg) {
  if (!(arg instanceof action_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.action.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_action_GetConfigRequest(buffer_arg) {
  return action_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_action_GetConfigResponse(arg) {
  if (!(arg instanceof action_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.action.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_action_GetConfigResponse(buffer_arg) {
  return action_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_action_RunActionRequest(arg) {
  if (!(arg instanceof action_pb.RunActionRequest)) {
    throw new Error('Expected argument of type gsdk.action.RunActionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_action_RunActionRequest(buffer_arg) {
  return action_pb.RunActionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_action_RunActionResponse(arg) {
  if (!(arg instanceof action_pb.RunActionResponse)) {
    throw new Error('Expected argument of type gsdk.action.RunActionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_action_RunActionResponse(buffer_arg) {
  return action_pb.RunActionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_action_SetConfigMultiRequest(arg) {
  if (!(arg instanceof action_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.action.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_action_SetConfigMultiRequest(buffer_arg) {
  return action_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_action_SetConfigMultiResponse(arg) {
  if (!(arg instanceof action_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.action.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_action_SetConfigMultiResponse(buffer_arg) {
  return action_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_action_SetConfigRequest(arg) {
  if (!(arg instanceof action_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.action.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_action_SetConfigRequest(buffer_arg) {
  return action_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_action_SetConfigResponse(arg) {
  if (!(arg instanceof action_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.action.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_action_SetConfigResponse(buffer_arg) {
  return action_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TriggerActionService = exports.TriggerActionService = {
  getConfig: {
    path: '/gsdk.action.TriggerAction/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: action_pb.GetConfigRequest,
    responseType: action_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_action_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_action_GetConfigRequest,
    responseSerialize: serialize_gsdk_action_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_action_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.action.TriggerAction/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: action_pb.SetConfigRequest,
    responseType: action_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_action_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_action_SetConfigRequest,
    responseSerialize: serialize_gsdk_action_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_action_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.action.TriggerAction/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: action_pb.SetConfigMultiRequest,
    responseType: action_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_action_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_action_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_action_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_action_SetConfigMultiResponse,
  },
  runAction: {
    path: '/gsdk.action.TriggerAction/RunAction',
    requestStream: false,
    responseStream: false,
    requestType: action_pb.RunActionRequest,
    responseType: action_pb.RunActionResponse,
    requestSerialize: serialize_gsdk_action_RunActionRequest,
    requestDeserialize: deserialize_gsdk_action_RunActionRequest,
    responseSerialize: serialize_gsdk_action_RunActionResponse,
    responseDeserialize: deserialize_gsdk_action_RunActionResponse,
  },
};

exports.TriggerActionClient = grpc.makeGenericClientConstructor(TriggerActionService, 'TriggerAction');
