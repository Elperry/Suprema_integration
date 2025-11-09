// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var rs485_pb = require('./rs485_pb.js');
var device_pb = require('./device_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_rs485_GetConfigRequest(arg) {
  if (!(arg instanceof rs485_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.rs485.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_GetConfigRequest(buffer_arg) {
  return rs485_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_GetConfigResponse(arg) {
  if (!(arg instanceof rs485_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.rs485.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_GetConfigResponse(buffer_arg) {
  return rs485_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_GetDeviceRequest(arg) {
  if (!(arg instanceof rs485_pb.GetDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.rs485.GetDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_GetDeviceRequest(buffer_arg) {
  return rs485_pb.GetDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_GetDeviceResponse(arg) {
  if (!(arg instanceof rs485_pb.GetDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.rs485.GetDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_GetDeviceResponse(buffer_arg) {
  return rs485_pb.GetDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_SearchDeviceRequest(arg) {
  if (!(arg instanceof rs485_pb.SearchDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.rs485.SearchDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_SearchDeviceRequest(buffer_arg) {
  return rs485_pb.SearchDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_SearchDeviceResponse(arg) {
  if (!(arg instanceof rs485_pb.SearchDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.rs485.SearchDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_SearchDeviceResponse(buffer_arg) {
  return rs485_pb.SearchDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_SetConfigMultiRequest(arg) {
  if (!(arg instanceof rs485_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.rs485.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_SetConfigMultiRequest(buffer_arg) {
  return rs485_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_SetConfigMultiResponse(arg) {
  if (!(arg instanceof rs485_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.rs485.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_SetConfigMultiResponse(buffer_arg) {
  return rs485_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_SetConfigRequest(arg) {
  if (!(arg instanceof rs485_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.rs485.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_SetConfigRequest(buffer_arg) {
  return rs485_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_SetConfigResponse(arg) {
  if (!(arg instanceof rs485_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.rs485.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_SetConfigResponse(buffer_arg) {
  return rs485_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_SetDeviceRequest(arg) {
  if (!(arg instanceof rs485_pb.SetDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.rs485.SetDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_SetDeviceRequest(buffer_arg) {
  return rs485_pb.SetDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rs485_SetDeviceResponse(arg) {
  if (!(arg instanceof rs485_pb.SetDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.rs485.SetDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rs485_SetDeviceResponse(buffer_arg) {
  return rs485_pb.SetDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RS485Service = exports.RS485Service = {
  searchDevice: {
    path: '/gsdk.rs485.RS485/SearchDevice',
    requestStream: false,
    responseStream: false,
    requestType: rs485_pb.SearchDeviceRequest,
    responseType: rs485_pb.SearchDeviceResponse,
    requestSerialize: serialize_gsdk_rs485_SearchDeviceRequest,
    requestDeserialize: deserialize_gsdk_rs485_SearchDeviceRequest,
    responseSerialize: serialize_gsdk_rs485_SearchDeviceResponse,
    responseDeserialize: deserialize_gsdk_rs485_SearchDeviceResponse,
  },
  getDevice: {
    path: '/gsdk.rs485.RS485/GetDevice',
    requestStream: false,
    responseStream: false,
    requestType: rs485_pb.GetDeviceRequest,
    responseType: rs485_pb.GetDeviceResponse,
    requestSerialize: serialize_gsdk_rs485_GetDeviceRequest,
    requestDeserialize: deserialize_gsdk_rs485_GetDeviceRequest,
    responseSerialize: serialize_gsdk_rs485_GetDeviceResponse,
    responseDeserialize: deserialize_gsdk_rs485_GetDeviceResponse,
  },
  setDevice: {
    path: '/gsdk.rs485.RS485/SetDevice',
    requestStream: false,
    responseStream: false,
    requestType: rs485_pb.SetDeviceRequest,
    responseType: rs485_pb.SetDeviceResponse,
    requestSerialize: serialize_gsdk_rs485_SetDeviceRequest,
    requestDeserialize: deserialize_gsdk_rs485_SetDeviceRequest,
    responseSerialize: serialize_gsdk_rs485_SetDeviceResponse,
    responseDeserialize: deserialize_gsdk_rs485_SetDeviceResponse,
  },
  getConfig: {
    path: '/gsdk.rs485.RS485/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: rs485_pb.GetConfigRequest,
    responseType: rs485_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_rs485_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_rs485_GetConfigRequest,
    responseSerialize: serialize_gsdk_rs485_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_rs485_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.rs485.RS485/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: rs485_pb.SetConfigRequest,
    responseType: rs485_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_rs485_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_rs485_SetConfigRequest,
    responseSerialize: serialize_gsdk_rs485_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_rs485_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.rs485.RS485/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: rs485_pb.SetConfigMultiRequest,
    responseType: rs485_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_rs485_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_rs485_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_rs485_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_rs485_SetConfigMultiResponse,
  },
};

exports.RS485Client = grpc.makeGenericClientConstructor(RS485Service, 'RS485');
