// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var rtsp_pb = require('./rtsp_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_rtsp_GetConfigRequest(arg) {
  if (!(arg instanceof rtsp_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.rtsp.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rtsp_GetConfigRequest(buffer_arg) {
  return rtsp_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rtsp_GetConfigResponse(arg) {
  if (!(arg instanceof rtsp_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.rtsp.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rtsp_GetConfigResponse(buffer_arg) {
  return rtsp_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rtsp_SetConfigMultiRequest(arg) {
  if (!(arg instanceof rtsp_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.rtsp.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rtsp_SetConfigMultiRequest(buffer_arg) {
  return rtsp_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rtsp_SetConfigMultiResponse(arg) {
  if (!(arg instanceof rtsp_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.rtsp.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rtsp_SetConfigMultiResponse(buffer_arg) {
  return rtsp_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rtsp_SetConfigRequest(arg) {
  if (!(arg instanceof rtsp_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.rtsp.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rtsp_SetConfigRequest(buffer_arg) {
  return rtsp_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_rtsp_SetConfigResponse(arg) {
  if (!(arg instanceof rtsp_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.rtsp.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_rtsp_SetConfigResponse(buffer_arg) {
  return rtsp_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RTSPService = exports.RTSPService = {
  getConfig: {
    path: '/gsdk.rtsp.RTSP/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: rtsp_pb.GetConfigRequest,
    responseType: rtsp_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_rtsp_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_rtsp_GetConfigRequest,
    responseSerialize: serialize_gsdk_rtsp_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_rtsp_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.rtsp.RTSP/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: rtsp_pb.SetConfigRequest,
    responseType: rtsp_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_rtsp_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_rtsp_SetConfigRequest,
    responseSerialize: serialize_gsdk_rtsp_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_rtsp_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.rtsp.RTSP/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: rtsp_pb.SetConfigMultiRequest,
    responseType: rtsp_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_rtsp_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_rtsp_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_rtsp_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_rtsp_SetConfigMultiResponse,
  },
};

exports.RTSPClient = grpc.makeGenericClientConstructor(RTSPService, 'RTSP');
