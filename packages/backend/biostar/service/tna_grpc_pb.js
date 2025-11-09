// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var tna_pb = require('./tna_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_tna_GetConfigRequest(arg) {
  if (!(arg instanceof tna_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.tna.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tna_GetConfigRequest(buffer_arg) {
  return tna_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tna_GetConfigResponse(arg) {
  if (!(arg instanceof tna_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.tna.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tna_GetConfigResponse(buffer_arg) {
  return tna_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tna_GetJobCodeLogRequest(arg) {
  if (!(arg instanceof tna_pb.GetJobCodeLogRequest)) {
    throw new Error('Expected argument of type gsdk.tna.GetJobCodeLogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tna_GetJobCodeLogRequest(buffer_arg) {
  return tna_pb.GetJobCodeLogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tna_GetJobCodeLogResponse(arg) {
  if (!(arg instanceof tna_pb.GetJobCodeLogResponse)) {
    throw new Error('Expected argument of type gsdk.tna.GetJobCodeLogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tna_GetJobCodeLogResponse(buffer_arg) {
  return tna_pb.GetJobCodeLogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tna_GetTNALogRequest(arg) {
  if (!(arg instanceof tna_pb.GetTNALogRequest)) {
    throw new Error('Expected argument of type gsdk.tna.GetTNALogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tna_GetTNALogRequest(buffer_arg) {
  return tna_pb.GetTNALogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tna_GetTNALogResponse(arg) {
  if (!(arg instanceof tna_pb.GetTNALogResponse)) {
    throw new Error('Expected argument of type gsdk.tna.GetTNALogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tna_GetTNALogResponse(buffer_arg) {
  return tna_pb.GetTNALogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tna_SetConfigMultiRequest(arg) {
  if (!(arg instanceof tna_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.tna.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tna_SetConfigMultiRequest(buffer_arg) {
  return tna_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tna_SetConfigMultiResponse(arg) {
  if (!(arg instanceof tna_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.tna.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tna_SetConfigMultiResponse(buffer_arg) {
  return tna_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tna_SetConfigRequest(arg) {
  if (!(arg instanceof tna_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.tna.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tna_SetConfigRequest(buffer_arg) {
  return tna_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_tna_SetConfigResponse(arg) {
  if (!(arg instanceof tna_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.tna.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_tna_SetConfigResponse(buffer_arg) {
  return tna_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TNAService = exports.TNAService = {
  getConfig: {
    path: '/gsdk.tna.TNA/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: tna_pb.GetConfigRequest,
    responseType: tna_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_tna_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_tna_GetConfigRequest,
    responseSerialize: serialize_gsdk_tna_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_tna_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.tna.TNA/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: tna_pb.SetConfigRequest,
    responseType: tna_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_tna_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_tna_SetConfigRequest,
    responseSerialize: serialize_gsdk_tna_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_tna_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.tna.TNA/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: tna_pb.SetConfigMultiRequest,
    responseType: tna_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_tna_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_tna_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_tna_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_tna_SetConfigMultiResponse,
  },
  getTNALog: {
    path: '/gsdk.tna.TNA/GetTNALog',
    requestStream: false,
    responseStream: false,
    requestType: tna_pb.GetTNALogRequest,
    responseType: tna_pb.GetTNALogResponse,
    requestSerialize: serialize_gsdk_tna_GetTNALogRequest,
    requestDeserialize: deserialize_gsdk_tna_GetTNALogRequest,
    responseSerialize: serialize_gsdk_tna_GetTNALogResponse,
    responseDeserialize: deserialize_gsdk_tna_GetTNALogResponse,
  },
  getJobCodeLog: {
    path: '/gsdk.tna.TNA/GetJobCodeLog',
    requestStream: false,
    responseStream: false,
    requestType: tna_pb.GetJobCodeLogRequest,
    responseType: tna_pb.GetJobCodeLogResponse,
    requestSerialize: serialize_gsdk_tna_GetJobCodeLogRequest,
    requestDeserialize: deserialize_gsdk_tna_GetJobCodeLogRequest,
    responseSerialize: serialize_gsdk_tna_GetJobCodeLogResponse,
    responseDeserialize: deserialize_gsdk_tna_GetJobCodeLogResponse,
  },
};

exports.TNAClient = grpc.makeGenericClientConstructor(TNAService, 'TNA');
