// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var master_pb = require('./master_pb.js');
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
var event_pb = require('./event_pb.js');
var err_pb = require('./err_pb.js');
var connect_pb = require('./connect_pb.js');

function serialize_gsdk_master_CommandRequest(arg) {
  if (!(arg instanceof master_pb.CommandRequest)) {
    throw new Error('Expected argument of type gsdk.master.CommandRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_master_CommandRequest(buffer_arg) {
  return master_pb.CommandRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_master_CommandResponse(arg) {
  if (!(arg instanceof master_pb.CommandResponse)) {
    throw new Error('Expected argument of type gsdk.master.CommandResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_master_CommandResponse(buffer_arg) {
  return master_pb.CommandResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_master_DeviceStatus(arg) {
  if (!(arg instanceof master_pb.DeviceStatus)) {
    throw new Error('Expected argument of type gsdk.master.DeviceStatus');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_master_DeviceStatus(buffer_arg) {
  return master_pb.DeviceStatus.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_master_InitDeviceStatusChanResponse(arg) {
  if (!(arg instanceof master_pb.InitDeviceStatusChanResponse)) {
    throw new Error('Expected argument of type gsdk.master.InitDeviceStatusChanResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_master_InitDeviceStatusChanResponse(buffer_arg) {
  return master_pb.InitDeviceStatusChanResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_master_InitLogChanResponse(arg) {
  if (!(arg instanceof master_pb.InitLogChanResponse)) {
    throw new Error('Expected argument of type gsdk.master.InitLogChanResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_master_InitLogChanResponse(buffer_arg) {
  return master_pb.InitLogChanResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_master_RealtimeEvent(arg) {
  if (!(arg instanceof master_pb.RealtimeEvent)) {
    throw new Error('Expected argument of type gsdk.master.RealtimeEvent');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_master_RealtimeEvent(buffer_arg) {
  return master_pb.RealtimeEvent.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_master_SubscribeRequest(arg) {
  if (!(arg instanceof master_pb.SubscribeRequest)) {
    throw new Error('Expected argument of type gsdk.master.SubscribeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_master_SubscribeRequest(buffer_arg) {
  return master_pb.SubscribeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_master_SubscribeResponse(arg) {
  if (!(arg instanceof master_pb.SubscribeResponse)) {
    throw new Error('Expected argument of type gsdk.master.SubscribeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_master_SubscribeResponse(buffer_arg) {
  return master_pb.SubscribeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_master_UpdateDeviceListRequest(arg) {
  if (!(arg instanceof master_pb.UpdateDeviceListRequest)) {
    throw new Error('Expected argument of type gsdk.master.UpdateDeviceListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_master_UpdateDeviceListRequest(buffer_arg) {
  return master_pb.UpdateDeviceListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_master_UpdateDeviceListResponse(arg) {
  if (!(arg instanceof master_pb.UpdateDeviceListResponse)) {
    throw new Error('Expected argument of type gsdk.master.UpdateDeviceListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_master_UpdateDeviceListResponse(buffer_arg) {
  return master_pb.UpdateDeviceListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var MasterService = exports.MasterService = {
  subscribe: {
    path: '/gsdk.master.Master/Subscribe',
    requestStream: false,
    responseStream: false,
    requestType: master_pb.SubscribeRequest,
    responseType: master_pb.SubscribeResponse,
    requestSerialize: serialize_gsdk_master_SubscribeRequest,
    requestDeserialize: deserialize_gsdk_master_SubscribeRequest,
    responseSerialize: serialize_gsdk_master_SubscribeResponse,
    responseDeserialize: deserialize_gsdk_master_SubscribeResponse,
  },
  updateDeviceList: {
    path: '/gsdk.master.Master/UpdateDeviceList',
    requestStream: false,
    responseStream: false,
    requestType: master_pb.UpdateDeviceListRequest,
    responseType: master_pb.UpdateDeviceListResponse,
    requestSerialize: serialize_gsdk_master_UpdateDeviceListRequest,
    requestDeserialize: deserialize_gsdk_master_UpdateDeviceListRequest,
    responseSerialize: serialize_gsdk_master_UpdateDeviceListResponse,
    responseDeserialize: deserialize_gsdk_master_UpdateDeviceListResponse,
  },
  initCommandChan: {
    path: '/gsdk.master.Master/InitCommandChan',
    requestStream: true,
    responseStream: true,
    requestType: master_pb.CommandResponse,
    responseType: master_pb.CommandRequest,
    requestSerialize: serialize_gsdk_master_CommandResponse,
    requestDeserialize: deserialize_gsdk_master_CommandResponse,
    responseSerialize: serialize_gsdk_master_CommandRequest,
    responseDeserialize: deserialize_gsdk_master_CommandRequest,
  },
  initLogChan: {
    path: '/gsdk.master.Master/InitLogChan',
    requestStream: true,
    responseStream: false,
    requestType: master_pb.RealtimeEvent,
    responseType: master_pb.InitLogChanResponse,
    requestSerialize: serialize_gsdk_master_RealtimeEvent,
    requestDeserialize: deserialize_gsdk_master_RealtimeEvent,
    responseSerialize: serialize_gsdk_master_InitLogChanResponse,
    responseDeserialize: deserialize_gsdk_master_InitLogChanResponse,
  },
  initDeviceStatusChan: {
    path: '/gsdk.master.Master/InitDeviceStatusChan',
    requestStream: true,
    responseStream: false,
    requestType: master_pb.DeviceStatus,
    responseType: master_pb.InitDeviceStatusChanResponse,
    requestSerialize: serialize_gsdk_master_DeviceStatus,
    requestDeserialize: deserialize_gsdk_master_DeviceStatus,
    responseSerialize: serialize_gsdk_master_InitDeviceStatusChanResponse,
    responseDeserialize: deserialize_gsdk_master_InitDeviceStatusChanResponse,
  },
};

exports.MasterClient = grpc.makeGenericClientConstructor(MasterService, 'Master');
