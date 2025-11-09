// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var lift_zone_pb = require('./lift_zone_pb.js');
var zone_pb = require('./zone_pb.js');
var action_pb = require('./action_pb.js');

function serialize_gsdk_lift_zone_AddRequest(arg) {
  if (!(arg instanceof lift_zone_pb.AddRequest)) {
    throw new Error('Expected argument of type gsdk.lift_zone.AddRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_AddRequest(buffer_arg) {
  return lift_zone_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_AddResponse(arg) {
  if (!(arg instanceof lift_zone_pb.AddResponse)) {
    throw new Error('Expected argument of type gsdk.lift_zone.AddResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_AddResponse(buffer_arg) {
  return lift_zone_pb.AddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_DeleteAllRequest(arg) {
  if (!(arg instanceof lift_zone_pb.DeleteAllRequest)) {
    throw new Error('Expected argument of type gsdk.lift_zone.DeleteAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_DeleteAllRequest(buffer_arg) {
  return lift_zone_pb.DeleteAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_DeleteAllResponse(arg) {
  if (!(arg instanceof lift_zone_pb.DeleteAllResponse)) {
    throw new Error('Expected argument of type gsdk.lift_zone.DeleteAllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_DeleteAllResponse(buffer_arg) {
  return lift_zone_pb.DeleteAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_DeleteRequest(arg) {
  if (!(arg instanceof lift_zone_pb.DeleteRequest)) {
    throw new Error('Expected argument of type gsdk.lift_zone.DeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_DeleteRequest(buffer_arg) {
  return lift_zone_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_DeleteResponse(arg) {
  if (!(arg instanceof lift_zone_pb.DeleteResponse)) {
    throw new Error('Expected argument of type gsdk.lift_zone.DeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_DeleteResponse(buffer_arg) {
  return lift_zone_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_GetRequest(arg) {
  if (!(arg instanceof lift_zone_pb.GetRequest)) {
    throw new Error('Expected argument of type gsdk.lift_zone.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_GetRequest(buffer_arg) {
  return lift_zone_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_GetResponse(arg) {
  if (!(arg instanceof lift_zone_pb.GetResponse)) {
    throw new Error('Expected argument of type gsdk.lift_zone.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_GetResponse(buffer_arg) {
  return lift_zone_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_GetStatusRequest(arg) {
  if (!(arg instanceof lift_zone_pb.GetStatusRequest)) {
    throw new Error('Expected argument of type gsdk.lift_zone.GetStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_GetStatusRequest(buffer_arg) {
  return lift_zone_pb.GetStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_GetStatusResponse(arg) {
  if (!(arg instanceof lift_zone_pb.GetStatusResponse)) {
    throw new Error('Expected argument of type gsdk.lift_zone.GetStatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_GetStatusResponse(buffer_arg) {
  return lift_zone_pb.GetStatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_SetAlarmRequest(arg) {
  if (!(arg instanceof lift_zone_pb.SetAlarmRequest)) {
    throw new Error('Expected argument of type gsdk.lift_zone.SetAlarmRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_SetAlarmRequest(buffer_arg) {
  return lift_zone_pb.SetAlarmRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_zone_SetAlarmResponse(arg) {
  if (!(arg instanceof lift_zone_pb.SetAlarmResponse)) {
    throw new Error('Expected argument of type gsdk.lift_zone.SetAlarmResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_zone_SetAlarmResponse(buffer_arg) {
  return lift_zone_pb.SetAlarmResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var LiftZoneService = exports.LiftZoneService = {
  get: {
    path: '/gsdk.lift_zone.LiftZone/Get',
    requestStream: false,
    responseStream: false,
    requestType: lift_zone_pb.GetRequest,
    responseType: lift_zone_pb.GetResponse,
    requestSerialize: serialize_gsdk_lift_zone_GetRequest,
    requestDeserialize: deserialize_gsdk_lift_zone_GetRequest,
    responseSerialize: serialize_gsdk_lift_zone_GetResponse,
    responseDeserialize: deserialize_gsdk_lift_zone_GetResponse,
  },
  getStatus: {
    path: '/gsdk.lift_zone.LiftZone/GetStatus',
    requestStream: false,
    responseStream: false,
    requestType: lift_zone_pb.GetStatusRequest,
    responseType: lift_zone_pb.GetStatusResponse,
    requestSerialize: serialize_gsdk_lift_zone_GetStatusRequest,
    requestDeserialize: deserialize_gsdk_lift_zone_GetStatusRequest,
    responseSerialize: serialize_gsdk_lift_zone_GetStatusResponse,
    responseDeserialize: deserialize_gsdk_lift_zone_GetStatusResponse,
  },
  add: {
    path: '/gsdk.lift_zone.LiftZone/Add',
    requestStream: false,
    responseStream: false,
    requestType: lift_zone_pb.AddRequest,
    responseType: lift_zone_pb.AddResponse,
    requestSerialize: serialize_gsdk_lift_zone_AddRequest,
    requestDeserialize: deserialize_gsdk_lift_zone_AddRequest,
    responseSerialize: serialize_gsdk_lift_zone_AddResponse,
    responseDeserialize: deserialize_gsdk_lift_zone_AddResponse,
  },
  delete: {
    path: '/gsdk.lift_zone.LiftZone/Delete',
    requestStream: false,
    responseStream: false,
    requestType: lift_zone_pb.DeleteRequest,
    responseType: lift_zone_pb.DeleteResponse,
    requestSerialize: serialize_gsdk_lift_zone_DeleteRequest,
    requestDeserialize: deserialize_gsdk_lift_zone_DeleteRequest,
    responseSerialize: serialize_gsdk_lift_zone_DeleteResponse,
    responseDeserialize: deserialize_gsdk_lift_zone_DeleteResponse,
  },
  deleteAll: {
    path: '/gsdk.lift_zone.LiftZone/DeleteAll',
    requestStream: false,
    responseStream: false,
    requestType: lift_zone_pb.DeleteAllRequest,
    responseType: lift_zone_pb.DeleteAllResponse,
    requestSerialize: serialize_gsdk_lift_zone_DeleteAllRequest,
    requestDeserialize: deserialize_gsdk_lift_zone_DeleteAllRequest,
    responseSerialize: serialize_gsdk_lift_zone_DeleteAllResponse,
    responseDeserialize: deserialize_gsdk_lift_zone_DeleteAllResponse,
  },
  setAlarm: {
    path: '/gsdk.lift_zone.LiftZone/SetAlarm',
    requestStream: false,
    responseStream: false,
    requestType: lift_zone_pb.SetAlarmRequest,
    responseType: lift_zone_pb.SetAlarmResponse,
    requestSerialize: serialize_gsdk_lift_zone_SetAlarmRequest,
    requestDeserialize: deserialize_gsdk_lift_zone_SetAlarmRequest,
    responseSerialize: serialize_gsdk_lift_zone_SetAlarmResponse,
    responseDeserialize: deserialize_gsdk_lift_zone_SetAlarmResponse,
  },
};

exports.LiftZoneClient = grpc.makeGenericClientConstructor(LiftZoneService, 'LiftZone');
