// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var operator_pb = require('./operator_pb.js');
var err_pb = require('./err_pb.js');
var auth_pb = require('./auth_pb.js');

function serialize_gsdk_operator_AddMultiRequest(arg) {
  if (!(arg instanceof operator_pb.AddMultiRequest)) {
    throw new Error('Expected argument of type gsdk.operator.AddMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_AddMultiRequest(buffer_arg) {
  return operator_pb.AddMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_AddMultiResponse(arg) {
  if (!(arg instanceof operator_pb.AddMultiResponse)) {
    throw new Error('Expected argument of type gsdk.operator.AddMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_AddMultiResponse(buffer_arg) {
  return operator_pb.AddMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_AddRequest(arg) {
  if (!(arg instanceof operator_pb.AddRequest)) {
    throw new Error('Expected argument of type gsdk.operator.AddRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_AddRequest(buffer_arg) {
  return operator_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_AddResponse(arg) {
  if (!(arg instanceof operator_pb.AddResponse)) {
    throw new Error('Expected argument of type gsdk.operator.AddResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_AddResponse(buffer_arg) {
  return operator_pb.AddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_DeleteAllMultiRequest(arg) {
  if (!(arg instanceof operator_pb.DeleteAllMultiRequest)) {
    throw new Error('Expected argument of type gsdk.operator.DeleteAllMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_DeleteAllMultiRequest(buffer_arg) {
  return operator_pb.DeleteAllMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_DeleteAllMultiResponse(arg) {
  if (!(arg instanceof operator_pb.DeleteAllMultiResponse)) {
    throw new Error('Expected argument of type gsdk.operator.DeleteAllMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_DeleteAllMultiResponse(buffer_arg) {
  return operator_pb.DeleteAllMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_DeleteAllRequest(arg) {
  if (!(arg instanceof operator_pb.DeleteAllRequest)) {
    throw new Error('Expected argument of type gsdk.operator.DeleteAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_DeleteAllRequest(buffer_arg) {
  return operator_pb.DeleteAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_DeleteAllResponse(arg) {
  if (!(arg instanceof operator_pb.DeleteAllResponse)) {
    throw new Error('Expected argument of type gsdk.operator.DeleteAllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_DeleteAllResponse(buffer_arg) {
  return operator_pb.DeleteAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_DeleteMultiRequest(arg) {
  if (!(arg instanceof operator_pb.DeleteMultiRequest)) {
    throw new Error('Expected argument of type gsdk.operator.DeleteMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_DeleteMultiRequest(buffer_arg) {
  return operator_pb.DeleteMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_DeleteMultiResponse(arg) {
  if (!(arg instanceof operator_pb.DeleteMultiResponse)) {
    throw new Error('Expected argument of type gsdk.operator.DeleteMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_DeleteMultiResponse(buffer_arg) {
  return operator_pb.DeleteMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_DeleteRequest(arg) {
  if (!(arg instanceof operator_pb.DeleteRequest)) {
    throw new Error('Expected argument of type gsdk.operator.DeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_DeleteRequest(buffer_arg) {
  return operator_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_DeleteResponse(arg) {
  if (!(arg instanceof operator_pb.DeleteResponse)) {
    throw new Error('Expected argument of type gsdk.operator.DeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_DeleteResponse(buffer_arg) {
  return operator_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_GetListRequest(arg) {
  if (!(arg instanceof operator_pb.GetListRequest)) {
    throw new Error('Expected argument of type gsdk.operator.GetListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_GetListRequest(buffer_arg) {
  return operator_pb.GetListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_operator_GetListResponse(arg) {
  if (!(arg instanceof operator_pb.GetListResponse)) {
    throw new Error('Expected argument of type gsdk.operator.GetListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_operator_GetListResponse(buffer_arg) {
  return operator_pb.GetListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var OperatorService = exports.OperatorService = {
  getList: {
    path: '/gsdk.operator.Operator/GetList',
    requestStream: false,
    responseStream: false,
    requestType: operator_pb.GetListRequest,
    responseType: operator_pb.GetListResponse,
    requestSerialize: serialize_gsdk_operator_GetListRequest,
    requestDeserialize: deserialize_gsdk_operator_GetListRequest,
    responseSerialize: serialize_gsdk_operator_GetListResponse,
    responseDeserialize: deserialize_gsdk_operator_GetListResponse,
  },
  add: {
    path: '/gsdk.operator.Operator/Add',
    requestStream: false,
    responseStream: false,
    requestType: operator_pb.AddRequest,
    responseType: operator_pb.AddResponse,
    requestSerialize: serialize_gsdk_operator_AddRequest,
    requestDeserialize: deserialize_gsdk_operator_AddRequest,
    responseSerialize: serialize_gsdk_operator_AddResponse,
    responseDeserialize: deserialize_gsdk_operator_AddResponse,
  },
  addMulti: {
    path: '/gsdk.operator.Operator/AddMulti',
    requestStream: false,
    responseStream: false,
    requestType: operator_pb.AddMultiRequest,
    responseType: operator_pb.AddMultiResponse,
    requestSerialize: serialize_gsdk_operator_AddMultiRequest,
    requestDeserialize: deserialize_gsdk_operator_AddMultiRequest,
    responseSerialize: serialize_gsdk_operator_AddMultiResponse,
    responseDeserialize: deserialize_gsdk_operator_AddMultiResponse,
  },
  delete: {
    path: '/gsdk.operator.Operator/Delete',
    requestStream: false,
    responseStream: false,
    requestType: operator_pb.DeleteRequest,
    responseType: operator_pb.DeleteResponse,
    requestSerialize: serialize_gsdk_operator_DeleteRequest,
    requestDeserialize: deserialize_gsdk_operator_DeleteRequest,
    responseSerialize: serialize_gsdk_operator_DeleteResponse,
    responseDeserialize: deserialize_gsdk_operator_DeleteResponse,
  },
  deleteMulti: {
    path: '/gsdk.operator.Operator/DeleteMulti',
    requestStream: false,
    responseStream: false,
    requestType: operator_pb.DeleteMultiRequest,
    responseType: operator_pb.DeleteMultiResponse,
    requestSerialize: serialize_gsdk_operator_DeleteMultiRequest,
    requestDeserialize: deserialize_gsdk_operator_DeleteMultiRequest,
    responseSerialize: serialize_gsdk_operator_DeleteMultiResponse,
    responseDeserialize: deserialize_gsdk_operator_DeleteMultiResponse,
  },
  deleteAll: {
    path: '/gsdk.operator.Operator/DeleteAll',
    requestStream: false,
    responseStream: false,
    requestType: operator_pb.DeleteAllRequest,
    responseType: operator_pb.DeleteAllResponse,
    requestSerialize: serialize_gsdk_operator_DeleteAllRequest,
    requestDeserialize: deserialize_gsdk_operator_DeleteAllRequest,
    responseSerialize: serialize_gsdk_operator_DeleteAllResponse,
    responseDeserialize: deserialize_gsdk_operator_DeleteAllResponse,
  },
  deleteAllMulti: {
    path: '/gsdk.operator.Operator/DeleteAllMulti',
    requestStream: false,
    responseStream: false,
    requestType: operator_pb.DeleteAllMultiRequest,
    responseType: operator_pb.DeleteAllMultiResponse,
    requestSerialize: serialize_gsdk_operator_DeleteAllMultiRequest,
    requestDeserialize: deserialize_gsdk_operator_DeleteAllMultiRequest,
    responseSerialize: serialize_gsdk_operator_DeleteAllMultiResponse,
    responseDeserialize: deserialize_gsdk_operator_DeleteAllMultiResponse,
  },
};

exports.OperatorClient = grpc.makeGenericClientConstructor(OperatorService, 'Operator');
