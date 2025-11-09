// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var lift_pb = require('./lift_pb.js');
var device_pb = require('./device_pb.js');
var action_pb = require('./action_pb.js');

function serialize_gsdk_lift_ActivateRequest(arg) {
  if (!(arg instanceof lift_pb.ActivateRequest)) {
    throw new Error('Expected argument of type gsdk.lift.ActivateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_ActivateRequest(buffer_arg) {
  return lift_pb.ActivateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_ActivateResponse(arg) {
  if (!(arg instanceof lift_pb.ActivateResponse)) {
    throw new Error('Expected argument of type gsdk.lift.ActivateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_ActivateResponse(buffer_arg) {
  return lift_pb.ActivateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_AddRequest(arg) {
  if (!(arg instanceof lift_pb.AddRequest)) {
    throw new Error('Expected argument of type gsdk.lift.AddRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_AddRequest(buffer_arg) {
  return lift_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_AddResponse(arg) {
  if (!(arg instanceof lift_pb.AddResponse)) {
    throw new Error('Expected argument of type gsdk.lift.AddResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_AddResponse(buffer_arg) {
  return lift_pb.AddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_DeactivateRequest(arg) {
  if (!(arg instanceof lift_pb.DeactivateRequest)) {
    throw new Error('Expected argument of type gsdk.lift.DeactivateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_DeactivateRequest(buffer_arg) {
  return lift_pb.DeactivateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_DeactivateResponse(arg) {
  if (!(arg instanceof lift_pb.DeactivateResponse)) {
    throw new Error('Expected argument of type gsdk.lift.DeactivateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_DeactivateResponse(buffer_arg) {
  return lift_pb.DeactivateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_DeleteAllRequest(arg) {
  if (!(arg instanceof lift_pb.DeleteAllRequest)) {
    throw new Error('Expected argument of type gsdk.lift.DeleteAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_DeleteAllRequest(buffer_arg) {
  return lift_pb.DeleteAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_DeleteAllResponse(arg) {
  if (!(arg instanceof lift_pb.DeleteAllResponse)) {
    throw new Error('Expected argument of type gsdk.lift.DeleteAllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_DeleteAllResponse(buffer_arg) {
  return lift_pb.DeleteAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_DeleteRequest(arg) {
  if (!(arg instanceof lift_pb.DeleteRequest)) {
    throw new Error('Expected argument of type gsdk.lift.DeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_DeleteRequest(buffer_arg) {
  return lift_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_DeleteResponse(arg) {
  if (!(arg instanceof lift_pb.DeleteResponse)) {
    throw new Error('Expected argument of type gsdk.lift.DeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_DeleteResponse(buffer_arg) {
  return lift_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_GetListRequest(arg) {
  if (!(arg instanceof lift_pb.GetListRequest)) {
    throw new Error('Expected argument of type gsdk.lift.GetListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_GetListRequest(buffer_arg) {
  return lift_pb.GetListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_GetListResponse(arg) {
  if (!(arg instanceof lift_pb.GetListResponse)) {
    throw new Error('Expected argument of type gsdk.lift.GetListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_GetListResponse(buffer_arg) {
  return lift_pb.GetListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_GetStatusRequest(arg) {
  if (!(arg instanceof lift_pb.GetStatusRequest)) {
    throw new Error('Expected argument of type gsdk.lift.GetStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_GetStatusRequest(buffer_arg) {
  return lift_pb.GetStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_GetStatusResponse(arg) {
  if (!(arg instanceof lift_pb.GetStatusResponse)) {
    throw new Error('Expected argument of type gsdk.lift.GetStatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_GetStatusResponse(buffer_arg) {
  return lift_pb.GetStatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_ReleaseRequest(arg) {
  if (!(arg instanceof lift_pb.ReleaseRequest)) {
    throw new Error('Expected argument of type gsdk.lift.ReleaseRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_ReleaseRequest(buffer_arg) {
  return lift_pb.ReleaseRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_ReleaseResponse(arg) {
  if (!(arg instanceof lift_pb.ReleaseResponse)) {
    throw new Error('Expected argument of type gsdk.lift.ReleaseResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_ReleaseResponse(buffer_arg) {
  return lift_pb.ReleaseResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_SetAlarmRequest(arg) {
  if (!(arg instanceof lift_pb.SetAlarmRequest)) {
    throw new Error('Expected argument of type gsdk.lift.SetAlarmRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_SetAlarmRequest(buffer_arg) {
  return lift_pb.SetAlarmRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_lift_SetAlarmResponse(arg) {
  if (!(arg instanceof lift_pb.SetAlarmResponse)) {
    throw new Error('Expected argument of type gsdk.lift.SetAlarmResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_lift_SetAlarmResponse(buffer_arg) {
  return lift_pb.SetAlarmResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var LiftService = exports.LiftService = {
  getList: {
    path: '/gsdk.lift.Lift/GetList',
    requestStream: false,
    responseStream: false,
    requestType: lift_pb.GetListRequest,
    responseType: lift_pb.GetListResponse,
    requestSerialize: serialize_gsdk_lift_GetListRequest,
    requestDeserialize: deserialize_gsdk_lift_GetListRequest,
    responseSerialize: serialize_gsdk_lift_GetListResponse,
    responseDeserialize: deserialize_gsdk_lift_GetListResponse,
  },
  getStatus: {
    path: '/gsdk.lift.Lift/GetStatus',
    requestStream: false,
    responseStream: false,
    requestType: lift_pb.GetStatusRequest,
    responseType: lift_pb.GetStatusResponse,
    requestSerialize: serialize_gsdk_lift_GetStatusRequest,
    requestDeserialize: deserialize_gsdk_lift_GetStatusRequest,
    responseSerialize: serialize_gsdk_lift_GetStatusResponse,
    responseDeserialize: deserialize_gsdk_lift_GetStatusResponse,
  },
  add: {
    path: '/gsdk.lift.Lift/Add',
    requestStream: false,
    responseStream: false,
    requestType: lift_pb.AddRequest,
    responseType: lift_pb.AddResponse,
    requestSerialize: serialize_gsdk_lift_AddRequest,
    requestDeserialize: deserialize_gsdk_lift_AddRequest,
    responseSerialize: serialize_gsdk_lift_AddResponse,
    responseDeserialize: deserialize_gsdk_lift_AddResponse,
  },
  delete: {
    path: '/gsdk.lift.Lift/Delete',
    requestStream: false,
    responseStream: false,
    requestType: lift_pb.DeleteRequest,
    responseType: lift_pb.DeleteResponse,
    requestSerialize: serialize_gsdk_lift_DeleteRequest,
    requestDeserialize: deserialize_gsdk_lift_DeleteRequest,
    responseSerialize: serialize_gsdk_lift_DeleteResponse,
    responseDeserialize: deserialize_gsdk_lift_DeleteResponse,
  },
  deleteAll: {
    path: '/gsdk.lift.Lift/DeleteAll',
    requestStream: false,
    responseStream: false,
    requestType: lift_pb.DeleteAllRequest,
    responseType: lift_pb.DeleteAllResponse,
    requestSerialize: serialize_gsdk_lift_DeleteAllRequest,
    requestDeserialize: deserialize_gsdk_lift_DeleteAllRequest,
    responseSerialize: serialize_gsdk_lift_DeleteAllResponse,
    responseDeserialize: deserialize_gsdk_lift_DeleteAllResponse,
  },
  activate: {
    path: '/gsdk.lift.Lift/Activate',
    requestStream: false,
    responseStream: false,
    requestType: lift_pb.ActivateRequest,
    responseType: lift_pb.ActivateResponse,
    requestSerialize: serialize_gsdk_lift_ActivateRequest,
    requestDeserialize: deserialize_gsdk_lift_ActivateRequest,
    responseSerialize: serialize_gsdk_lift_ActivateResponse,
    responseDeserialize: deserialize_gsdk_lift_ActivateResponse,
  },
  deactivate: {
    path: '/gsdk.lift.Lift/Deactivate',
    requestStream: false,
    responseStream: false,
    requestType: lift_pb.DeactivateRequest,
    responseType: lift_pb.DeactivateResponse,
    requestSerialize: serialize_gsdk_lift_DeactivateRequest,
    requestDeserialize: deserialize_gsdk_lift_DeactivateRequest,
    responseSerialize: serialize_gsdk_lift_DeactivateResponse,
    responseDeserialize: deserialize_gsdk_lift_DeactivateResponse,
  },
  release: {
    path: '/gsdk.lift.Lift/Release',
    requestStream: false,
    responseStream: false,
    requestType: lift_pb.ReleaseRequest,
    responseType: lift_pb.ReleaseResponse,
    requestSerialize: serialize_gsdk_lift_ReleaseRequest,
    requestDeserialize: deserialize_gsdk_lift_ReleaseRequest,
    responseSerialize: serialize_gsdk_lift_ReleaseResponse,
    responseDeserialize: deserialize_gsdk_lift_ReleaseResponse,
  },
  setAlarm: {
    path: '/gsdk.lift.Lift/SetAlarm',
    requestStream: false,
    responseStream: false,
    requestType: lift_pb.SetAlarmRequest,
    responseType: lift_pb.SetAlarmResponse,
    requestSerialize: serialize_gsdk_lift_SetAlarmRequest,
    requestDeserialize: deserialize_gsdk_lift_SetAlarmRequest,
    responseSerialize: serialize_gsdk_lift_SetAlarmResponse,
    responseDeserialize: deserialize_gsdk_lift_SetAlarmResponse,
  },
};

exports.LiftClient = grpc.makeGenericClientConstructor(LiftService, 'Lift');
