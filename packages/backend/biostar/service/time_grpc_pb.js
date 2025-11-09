// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var time_pb = require('./time_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_time_GetConfigRequest(arg) {
  if (!(arg instanceof time_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.time.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_GetConfigRequest(buffer_arg) {
  return time_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_GetConfigResponse(arg) {
  if (!(arg instanceof time_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.time.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_GetConfigResponse(buffer_arg) {
  return time_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_GetDSTConfigRequest(arg) {
  if (!(arg instanceof time_pb.GetDSTConfigRequest)) {
    throw new Error('Expected argument of type gsdk.time.GetDSTConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_GetDSTConfigRequest(buffer_arg) {
  return time_pb.GetDSTConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_GetDSTConfigResponse(arg) {
  if (!(arg instanceof time_pb.GetDSTConfigResponse)) {
    throw new Error('Expected argument of type gsdk.time.GetDSTConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_GetDSTConfigResponse(buffer_arg) {
  return time_pb.GetDSTConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_GetRequest(arg) {
  if (!(arg instanceof time_pb.GetRequest)) {
    throw new Error('Expected argument of type gsdk.time.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_GetRequest(buffer_arg) {
  return time_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_GetResponse(arg) {
  if (!(arg instanceof time_pb.GetResponse)) {
    throw new Error('Expected argument of type gsdk.time.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_GetResponse(buffer_arg) {
  return time_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetConfigMultiRequest(arg) {
  if (!(arg instanceof time_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.time.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetConfigMultiRequest(buffer_arg) {
  return time_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetConfigMultiResponse(arg) {
  if (!(arg instanceof time_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.time.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetConfigMultiResponse(buffer_arg) {
  return time_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetConfigRequest(arg) {
  if (!(arg instanceof time_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.time.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetConfigRequest(buffer_arg) {
  return time_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetConfigResponse(arg) {
  if (!(arg instanceof time_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.time.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetConfigResponse(buffer_arg) {
  return time_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetDSTConfigMultiRequest(arg) {
  if (!(arg instanceof time_pb.SetDSTConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.time.SetDSTConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetDSTConfigMultiRequest(buffer_arg) {
  return time_pb.SetDSTConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetDSTConfigMultiResponse(arg) {
  if (!(arg instanceof time_pb.SetDSTConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.time.SetDSTConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetDSTConfigMultiResponse(buffer_arg) {
  return time_pb.SetDSTConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetDSTConfigRequest(arg) {
  if (!(arg instanceof time_pb.SetDSTConfigRequest)) {
    throw new Error('Expected argument of type gsdk.time.SetDSTConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetDSTConfigRequest(buffer_arg) {
  return time_pb.SetDSTConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetDSTConfigResponse(arg) {
  if (!(arg instanceof time_pb.SetDSTConfigResponse)) {
    throw new Error('Expected argument of type gsdk.time.SetDSTConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetDSTConfigResponse(buffer_arg) {
  return time_pb.SetDSTConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetMultiRequest(arg) {
  if (!(arg instanceof time_pb.SetMultiRequest)) {
    throw new Error('Expected argument of type gsdk.time.SetMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetMultiRequest(buffer_arg) {
  return time_pb.SetMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetMultiResponse(arg) {
  if (!(arg instanceof time_pb.SetMultiResponse)) {
    throw new Error('Expected argument of type gsdk.time.SetMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetMultiResponse(buffer_arg) {
  return time_pb.SetMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetRequest(arg) {
  if (!(arg instanceof time_pb.SetRequest)) {
    throw new Error('Expected argument of type gsdk.time.SetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetRequest(buffer_arg) {
  return time_pb.SetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_time_SetResponse(arg) {
  if (!(arg instanceof time_pb.SetResponse)) {
    throw new Error('Expected argument of type gsdk.time.SetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_time_SetResponse(buffer_arg) {
  return time_pb.SetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TimeService = exports.TimeService = {
  get: {
    path: '/gsdk.time.Time/Get',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.GetRequest,
    responseType: time_pb.GetResponse,
    requestSerialize: serialize_gsdk_time_GetRequest,
    requestDeserialize: deserialize_gsdk_time_GetRequest,
    responseSerialize: serialize_gsdk_time_GetResponse,
    responseDeserialize: deserialize_gsdk_time_GetResponse,
  },
  set: {
    path: '/gsdk.time.Time/Set',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetRequest,
    responseType: time_pb.SetResponse,
    requestSerialize: serialize_gsdk_time_SetRequest,
    requestDeserialize: deserialize_gsdk_time_SetRequest,
    responseSerialize: serialize_gsdk_time_SetResponse,
    responseDeserialize: deserialize_gsdk_time_SetResponse,
  },
  setMulti: {
    path: '/gsdk.time.Time/SetMulti',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetMultiRequest,
    responseType: time_pb.SetMultiResponse,
    requestSerialize: serialize_gsdk_time_SetMultiRequest,
    requestDeserialize: deserialize_gsdk_time_SetMultiRequest,
    responseSerialize: serialize_gsdk_time_SetMultiResponse,
    responseDeserialize: deserialize_gsdk_time_SetMultiResponse,
  },
  getConfig: {
    path: '/gsdk.time.Time/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.GetConfigRequest,
    responseType: time_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_time_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_time_GetConfigRequest,
    responseSerialize: serialize_gsdk_time_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_time_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.time.Time/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetConfigRequest,
    responseType: time_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_time_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_time_SetConfigRequest,
    responseSerialize: serialize_gsdk_time_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_time_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.time.Time/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetConfigMultiRequest,
    responseType: time_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_time_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_time_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_time_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_time_SetConfigMultiResponse,
  },
  getDSTConfig: {
    path: '/gsdk.time.Time/GetDSTConfig',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.GetDSTConfigRequest,
    responseType: time_pb.GetDSTConfigResponse,
    requestSerialize: serialize_gsdk_time_GetDSTConfigRequest,
    requestDeserialize: deserialize_gsdk_time_GetDSTConfigRequest,
    responseSerialize: serialize_gsdk_time_GetDSTConfigResponse,
    responseDeserialize: deserialize_gsdk_time_GetDSTConfigResponse,
  },
  setDSTConfig: {
    path: '/gsdk.time.Time/SetDSTConfig',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetDSTConfigRequest,
    responseType: time_pb.SetDSTConfigResponse,
    requestSerialize: serialize_gsdk_time_SetDSTConfigRequest,
    requestDeserialize: deserialize_gsdk_time_SetDSTConfigRequest,
    responseSerialize: serialize_gsdk_time_SetDSTConfigResponse,
    responseDeserialize: deserialize_gsdk_time_SetDSTConfigResponse,
  },
  setDSTConfigMulti: {
    path: '/gsdk.time.Time/SetDSTConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetDSTConfigMultiRequest,
    responseType: time_pb.SetDSTConfigMultiResponse,
    requestSerialize: serialize_gsdk_time_SetDSTConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_time_SetDSTConfigMultiRequest,
    responseSerialize: serialize_gsdk_time_SetDSTConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_time_SetDSTConfigMultiResponse,
  },
};

exports.TimeClient = grpc.makeGenericClientConstructor(TimeService, 'Time');
