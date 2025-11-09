// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var network_pb = require('./network_pb.js');
var err_pb = require('./err_pb.js');
var connect_pb = require('./connect_pb.js');

function serialize_gsdk_network_GetIPConfigRequest(arg) {
  if (!(arg instanceof network_pb.GetIPConfigRequest)) {
    throw new Error('Expected argument of type gsdk.network.GetIPConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_GetIPConfigRequest(buffer_arg) {
  return network_pb.GetIPConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_GetIPConfigResponse(arg) {
  if (!(arg instanceof network_pb.GetIPConfigResponse)) {
    throw new Error('Expected argument of type gsdk.network.GetIPConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_GetIPConfigResponse(buffer_arg) {
  return network_pb.GetIPConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_GetWLANConfigRequest(arg) {
  if (!(arg instanceof network_pb.GetWLANConfigRequest)) {
    throw new Error('Expected argument of type gsdk.network.GetWLANConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_GetWLANConfigRequest(buffer_arg) {
  return network_pb.GetWLANConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_GetWLANConfigResponse(arg) {
  if (!(arg instanceof network_pb.GetWLANConfigResponse)) {
    throw new Error('Expected argument of type gsdk.network.GetWLANConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_GetWLANConfigResponse(buffer_arg) {
  return network_pb.GetWLANConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_SetIPConfigMultiRequest(arg) {
  if (!(arg instanceof network_pb.SetIPConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.network.SetIPConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_SetIPConfigMultiRequest(buffer_arg) {
  return network_pb.SetIPConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_SetIPConfigMultiResponse(arg) {
  if (!(arg instanceof network_pb.SetIPConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.network.SetIPConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_SetIPConfigMultiResponse(buffer_arg) {
  return network_pb.SetIPConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_SetIPConfigRequest(arg) {
  if (!(arg instanceof network_pb.SetIPConfigRequest)) {
    throw new Error('Expected argument of type gsdk.network.SetIPConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_SetIPConfigRequest(buffer_arg) {
  return network_pb.SetIPConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_SetIPConfigResponse(arg) {
  if (!(arg instanceof network_pb.SetIPConfigResponse)) {
    throw new Error('Expected argument of type gsdk.network.SetIPConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_SetIPConfigResponse(buffer_arg) {
  return network_pb.SetIPConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_SetWLANConfigMultiRequest(arg) {
  if (!(arg instanceof network_pb.SetWLANConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.network.SetWLANConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_SetWLANConfigMultiRequest(buffer_arg) {
  return network_pb.SetWLANConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_SetWLANConfigMultiResponse(arg) {
  if (!(arg instanceof network_pb.SetWLANConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.network.SetWLANConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_SetWLANConfigMultiResponse(buffer_arg) {
  return network_pb.SetWLANConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_SetWLANConfigRequest(arg) {
  if (!(arg instanceof network_pb.SetWLANConfigRequest)) {
    throw new Error('Expected argument of type gsdk.network.SetWLANConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_SetWLANConfigRequest(buffer_arg) {
  return network_pb.SetWLANConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_network_SetWLANConfigResponse(arg) {
  if (!(arg instanceof network_pb.SetWLANConfigResponse)) {
    throw new Error('Expected argument of type gsdk.network.SetWLANConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_network_SetWLANConfigResponse(buffer_arg) {
  return network_pb.SetWLANConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var NetworkService = exports.NetworkService = {
  getIPConfig: {
    path: '/gsdk.network.Network/GetIPConfig',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.GetIPConfigRequest,
    responseType: network_pb.GetIPConfigResponse,
    requestSerialize: serialize_gsdk_network_GetIPConfigRequest,
    requestDeserialize: deserialize_gsdk_network_GetIPConfigRequest,
    responseSerialize: serialize_gsdk_network_GetIPConfigResponse,
    responseDeserialize: deserialize_gsdk_network_GetIPConfigResponse,
  },
  setIPConfig: {
    path: '/gsdk.network.Network/SetIPConfig',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.SetIPConfigRequest,
    responseType: network_pb.SetIPConfigResponse,
    requestSerialize: serialize_gsdk_network_SetIPConfigRequest,
    requestDeserialize: deserialize_gsdk_network_SetIPConfigRequest,
    responseSerialize: serialize_gsdk_network_SetIPConfigResponse,
    responseDeserialize: deserialize_gsdk_network_SetIPConfigResponse,
  },
  setIPConfigMulti: {
    path: '/gsdk.network.Network/SetIPConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.SetIPConfigMultiRequest,
    responseType: network_pb.SetIPConfigMultiResponse,
    requestSerialize: serialize_gsdk_network_SetIPConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_network_SetIPConfigMultiRequest,
    responseSerialize: serialize_gsdk_network_SetIPConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_network_SetIPConfigMultiResponse,
  },
  getWLANConfig: {
    path: '/gsdk.network.Network/GetWLANConfig',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.GetWLANConfigRequest,
    responseType: network_pb.GetWLANConfigResponse,
    requestSerialize: serialize_gsdk_network_GetWLANConfigRequest,
    requestDeserialize: deserialize_gsdk_network_GetWLANConfigRequest,
    responseSerialize: serialize_gsdk_network_GetWLANConfigResponse,
    responseDeserialize: deserialize_gsdk_network_GetWLANConfigResponse,
  },
  setWLANConfig: {
    path: '/gsdk.network.Network/SetWLANConfig',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.SetWLANConfigRequest,
    responseType: network_pb.SetWLANConfigResponse,
    requestSerialize: serialize_gsdk_network_SetWLANConfigRequest,
    requestDeserialize: deserialize_gsdk_network_SetWLANConfigRequest,
    responseSerialize: serialize_gsdk_network_SetWLANConfigResponse,
    responseDeserialize: deserialize_gsdk_network_SetWLANConfigResponse,
  },
  setWLANConfigMulti: {
    path: '/gsdk.network.Network/SetWLANConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.SetWLANConfigMultiRequest,
    responseType: network_pb.SetWLANConfigMultiResponse,
    requestSerialize: serialize_gsdk_network_SetWLANConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_network_SetWLANConfigMultiRequest,
    responseSerialize: serialize_gsdk_network_SetWLANConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_network_SetWLANConfigMultiResponse,
  },
};

exports.NetworkClient = grpc.makeGenericClientConstructor(NetworkService, 'Network');
