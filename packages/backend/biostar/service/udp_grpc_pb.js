// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var udp_pb = require('./udp_pb.js');
var network_pb = require('./network_pb.js');

function serialize_gsdk_udp_GetIPConfigRequest(arg) {
  if (!(arg instanceof udp_pb.GetIPConfigRequest)) {
    throw new Error('Expected argument of type gsdk.udp.GetIPConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_udp_GetIPConfigRequest(buffer_arg) {
  return udp_pb.GetIPConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_udp_GetIPConfigResponse(arg) {
  if (!(arg instanceof udp_pb.GetIPConfigResponse)) {
    throw new Error('Expected argument of type gsdk.udp.GetIPConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_udp_GetIPConfigResponse(buffer_arg) {
  return udp_pb.GetIPConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_udp_SetIPConfigRequest(arg) {
  if (!(arg instanceof udp_pb.SetIPConfigRequest)) {
    throw new Error('Expected argument of type gsdk.udp.SetIPConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_udp_SetIPConfigRequest(buffer_arg) {
  return udp_pb.SetIPConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_udp_SetIPConfigResponse(arg) {
  if (!(arg instanceof udp_pb.SetIPConfigResponse)) {
    throw new Error('Expected argument of type gsdk.udp.SetIPConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_udp_SetIPConfigResponse(buffer_arg) {
  return udp_pb.SetIPConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UDPService = exports.UDPService = {
  getIPConfig: {
    path: '/gsdk.udp.UDP/GetIPConfig',
    requestStream: false,
    responseStream: false,
    requestType: udp_pb.GetIPConfigRequest,
    responseType: udp_pb.GetIPConfigResponse,
    requestSerialize: serialize_gsdk_udp_GetIPConfigRequest,
    requestDeserialize: deserialize_gsdk_udp_GetIPConfigRequest,
    responseSerialize: serialize_gsdk_udp_GetIPConfigResponse,
    responseDeserialize: deserialize_gsdk_udp_GetIPConfigResponse,
  },
  setIPConfig: {
    path: '/gsdk.udp.UDP/SetIPConfig',
    requestStream: false,
    responseStream: false,
    requestType: udp_pb.SetIPConfigRequest,
    responseType: udp_pb.SetIPConfigResponse,
    requestSerialize: serialize_gsdk_udp_SetIPConfigRequest,
    requestDeserialize: deserialize_gsdk_udp_SetIPConfigRequest,
    responseSerialize: serialize_gsdk_udp_SetIPConfigResponse,
    responseDeserialize: deserialize_gsdk_udp_SetIPConfigResponse,
  },
};

exports.UDPClient = grpc.makeGenericClientConstructor(UDPService, 'UDP');
