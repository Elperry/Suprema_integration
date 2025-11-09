// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var wiegand_pb = require('./wiegand_pb.js');
var device_pb = require('./device_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_wiegand_GetConfigRequest(arg) {
  if (!(arg instanceof wiegand_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.wiegand.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_GetConfigRequest(buffer_arg) {
  return wiegand_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_GetConfigResponse(arg) {
  if (!(arg instanceof wiegand_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.wiegand.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_GetConfigResponse(buffer_arg) {
  return wiegand_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_GetDeviceRequest(arg) {
  if (!(arg instanceof wiegand_pb.GetDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.wiegand.GetDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_GetDeviceRequest(buffer_arg) {
  return wiegand_pb.GetDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_GetDeviceResponse(arg) {
  if (!(arg instanceof wiegand_pb.GetDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.wiegand.GetDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_GetDeviceResponse(buffer_arg) {
  return wiegand_pb.GetDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_SearchDeviceRequest(arg) {
  if (!(arg instanceof wiegand_pb.SearchDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.wiegand.SearchDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_SearchDeviceRequest(buffer_arg) {
  return wiegand_pb.SearchDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_SearchDeviceResponse(arg) {
  if (!(arg instanceof wiegand_pb.SearchDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.wiegand.SearchDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_SearchDeviceResponse(buffer_arg) {
  return wiegand_pb.SearchDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_SetConfigMultiRequest(arg) {
  if (!(arg instanceof wiegand_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.wiegand.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_SetConfigMultiRequest(buffer_arg) {
  return wiegand_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_SetConfigMultiResponse(arg) {
  if (!(arg instanceof wiegand_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.wiegand.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_SetConfigMultiResponse(buffer_arg) {
  return wiegand_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_SetConfigRequest(arg) {
  if (!(arg instanceof wiegand_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.wiegand.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_SetConfigRequest(buffer_arg) {
  return wiegand_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_SetConfigResponse(arg) {
  if (!(arg instanceof wiegand_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.wiegand.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_SetConfigResponse(buffer_arg) {
  return wiegand_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_SetDeviceRequest(arg) {
  if (!(arg instanceof wiegand_pb.SetDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.wiegand.SetDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_SetDeviceRequest(buffer_arg) {
  return wiegand_pb.SetDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_wiegand_SetDeviceResponse(arg) {
  if (!(arg instanceof wiegand_pb.SetDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.wiegand.SetDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_wiegand_SetDeviceResponse(buffer_arg) {
  return wiegand_pb.SetDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var WiegandService = exports.WiegandService = {
  getConfig: {
    path: '/gsdk.wiegand.Wiegand/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: wiegand_pb.GetConfigRequest,
    responseType: wiegand_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_wiegand_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_wiegand_GetConfigRequest,
    responseSerialize: serialize_gsdk_wiegand_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_wiegand_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.wiegand.Wiegand/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: wiegand_pb.SetConfigRequest,
    responseType: wiegand_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_wiegand_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_wiegand_SetConfigRequest,
    responseSerialize: serialize_gsdk_wiegand_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_wiegand_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.wiegand.Wiegand/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: wiegand_pb.SetConfigMultiRequest,
    responseType: wiegand_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_wiegand_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_wiegand_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_wiegand_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_wiegand_SetConfigMultiResponse,
  },
  searchDevice: {
    path: '/gsdk.wiegand.Wiegand/SearchDevice',
    requestStream: false,
    responseStream: false,
    requestType: wiegand_pb.SearchDeviceRequest,
    responseType: wiegand_pb.SearchDeviceResponse,
    requestSerialize: serialize_gsdk_wiegand_SearchDeviceRequest,
    requestDeserialize: deserialize_gsdk_wiegand_SearchDeviceRequest,
    responseSerialize: serialize_gsdk_wiegand_SearchDeviceResponse,
    responseDeserialize: deserialize_gsdk_wiegand_SearchDeviceResponse,
  },
  setDevice: {
    path: '/gsdk.wiegand.Wiegand/SetDevice',
    requestStream: false,
    responseStream: false,
    requestType: wiegand_pb.SetDeviceRequest,
    responseType: wiegand_pb.SetDeviceResponse,
    requestSerialize: serialize_gsdk_wiegand_SetDeviceRequest,
    requestDeserialize: deserialize_gsdk_wiegand_SetDeviceRequest,
    responseSerialize: serialize_gsdk_wiegand_SetDeviceResponse,
    responseDeserialize: deserialize_gsdk_wiegand_SetDeviceResponse,
  },
  getDevice: {
    path: '/gsdk.wiegand.Wiegand/GetDevice',
    requestStream: false,
    responseStream: false,
    requestType: wiegand_pb.GetDeviceRequest,
    responseType: wiegand_pb.GetDeviceResponse,
    requestSerialize: serialize_gsdk_wiegand_GetDeviceRequest,
    requestDeserialize: deserialize_gsdk_wiegand_GetDeviceRequest,
    responseSerialize: serialize_gsdk_wiegand_GetDeviceResponse,
    responseDeserialize: deserialize_gsdk_wiegand_GetDeviceResponse,
  },
};

exports.WiegandClient = grpc.makeGenericClientConstructor(WiegandService, 'Wiegand');
