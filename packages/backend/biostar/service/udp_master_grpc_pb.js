// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var udp_master_pb = require('./udp_master_pb.js');
var network_pb = require('./network_pb.js');
var udp_pb = require('./udp_pb.js');

function serialize_gsdk_udp_master_GetIPConfigRequest(arg) {
  if (!(arg instanceof udp_master_pb.GetIPConfigRequest)) {
    throw new Error('Expected argument of type gsdk.udp_master.GetIPConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_udp_master_GetIPConfigRequest(buffer_arg) {
  return udp_master_pb.GetIPConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_udp_master_GetIPConfigResponse(arg) {
  if (!(arg instanceof udp_master_pb.GetIPConfigResponse)) {
    throw new Error('Expected argument of type gsdk.udp_master.GetIPConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_udp_master_GetIPConfigResponse(buffer_arg) {
  return udp_master_pb.GetIPConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_udp_master_SetIPConfigRequest(arg) {
  if (!(arg instanceof udp_master_pb.SetIPConfigRequest)) {
    throw new Error('Expected argument of type gsdk.udp_master.SetIPConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_udp_master_SetIPConfigRequest(buffer_arg) {
  return udp_master_pb.SetIPConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_udp_master_SetIPConfigResponse(arg) {
  if (!(arg instanceof udp_master_pb.SetIPConfigResponse)) {
    throw new Error('Expected argument of type gsdk.udp_master.SetIPConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_udp_master_SetIPConfigResponse(buffer_arg) {
  return udp_master_pb.SetIPConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UDPMasterService = exports.UDPMasterService = {
  getIPConfig: {
    path: '/gsdk.udp_master.UDPMaster/GetIPConfig',
    requestStream: false,
    responseStream: false,
    requestType: udp_master_pb.GetIPConfigRequest,
    responseType: udp_master_pb.GetIPConfigResponse,
    requestSerialize: serialize_gsdk_udp_master_GetIPConfigRequest,
    requestDeserialize: deserialize_gsdk_udp_master_GetIPConfigRequest,
    responseSerialize: serialize_gsdk_udp_master_GetIPConfigResponse,
    responseDeserialize: deserialize_gsdk_udp_master_GetIPConfigResponse,
  },
  setIPConfig: {
    path: '/gsdk.udp_master.UDPMaster/SetIPConfig',
    requestStream: false,
    responseStream: false,
    requestType: udp_master_pb.SetIPConfigRequest,
    responseType: udp_master_pb.SetIPConfigResponse,
    requestSerialize: serialize_gsdk_udp_master_SetIPConfigRequest,
    requestDeserialize: deserialize_gsdk_udp_master_SetIPConfigRequest,
    responseSerialize: serialize_gsdk_udp_master_SetIPConfigResponse,
    responseDeserialize: deserialize_gsdk_udp_master_SetIPConfigResponse,
  },
};

exports.UDPMasterClient = grpc.makeGenericClientConstructor(UDPMasterService, 'UDPMaster');
