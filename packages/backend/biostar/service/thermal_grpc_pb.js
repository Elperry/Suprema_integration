// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var thermal_pb = require('./thermal_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_thermal_GetConfigRequest(arg) {
  if (!(arg instanceof thermal_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.thermal.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_thermal_GetConfigRequest(buffer_arg) {
  return thermal_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_thermal_GetConfigResponse(arg) {
  if (!(arg instanceof thermal_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.thermal.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_thermal_GetConfigResponse(buffer_arg) {
  return thermal_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_thermal_GetTemperatureLogRequest(arg) {
  if (!(arg instanceof thermal_pb.GetTemperatureLogRequest)) {
    throw new Error('Expected argument of type gsdk.thermal.GetTemperatureLogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_thermal_GetTemperatureLogRequest(buffer_arg) {
  return thermal_pb.GetTemperatureLogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_thermal_GetTemperatureLogResponse(arg) {
  if (!(arg instanceof thermal_pb.GetTemperatureLogResponse)) {
    throw new Error('Expected argument of type gsdk.thermal.GetTemperatureLogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_thermal_GetTemperatureLogResponse(buffer_arg) {
  return thermal_pb.GetTemperatureLogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_thermal_SetConfigMultiRequest(arg) {
  if (!(arg instanceof thermal_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.thermal.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_thermal_SetConfigMultiRequest(buffer_arg) {
  return thermal_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_thermal_SetConfigMultiResponse(arg) {
  if (!(arg instanceof thermal_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.thermal.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_thermal_SetConfigMultiResponse(buffer_arg) {
  return thermal_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_thermal_SetConfigRequest(arg) {
  if (!(arg instanceof thermal_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.thermal.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_thermal_SetConfigRequest(buffer_arg) {
  return thermal_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_thermal_SetConfigResponse(arg) {
  if (!(arg instanceof thermal_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.thermal.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_thermal_SetConfigResponse(buffer_arg) {
  return thermal_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ThermalService = exports.ThermalService = {
  getConfig: {
    path: '/gsdk.thermal.Thermal/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: thermal_pb.GetConfigRequest,
    responseType: thermal_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_thermal_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_thermal_GetConfigRequest,
    responseSerialize: serialize_gsdk_thermal_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_thermal_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.thermal.Thermal/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: thermal_pb.SetConfigRequest,
    responseType: thermal_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_thermal_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_thermal_SetConfigRequest,
    responseSerialize: serialize_gsdk_thermal_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_thermal_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.thermal.Thermal/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: thermal_pb.SetConfigMultiRequest,
    responseType: thermal_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_thermal_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_thermal_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_thermal_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_thermal_SetConfigMultiResponse,
  },
  getTemperatureLog: {
    path: '/gsdk.thermal.Thermal/GetTemperatureLog',
    requestStream: false,
    responseStream: false,
    requestType: thermal_pb.GetTemperatureLogRequest,
    responseType: thermal_pb.GetTemperatureLogResponse,
    requestSerialize: serialize_gsdk_thermal_GetTemperatureLogRequest,
    requestDeserialize: deserialize_gsdk_thermal_GetTemperatureLogRequest,
    responseSerialize: serialize_gsdk_thermal_GetTemperatureLogResponse,
    responseDeserialize: deserialize_gsdk_thermal_GetTemperatureLogResponse,
  },
};

exports.ThermalClient = grpc.makeGenericClientConstructor(ThermalService, 'Thermal');
