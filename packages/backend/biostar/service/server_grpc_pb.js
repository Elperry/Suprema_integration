// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var server_pb = require('./server_pb.js');
var card_pb = require('./card_pb.js');
var finger_pb = require('./finger_pb.js');
var user_pb = require('./user_pb.js');

function serialize_gsdk_server_HandleGlobalAPBRequest(arg) {
  if (!(arg instanceof server_pb.HandleGlobalAPBRequest)) {
    throw new Error('Expected argument of type gsdk.server.HandleGlobalAPBRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_HandleGlobalAPBRequest(buffer_arg) {
  return server_pb.HandleGlobalAPBRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_HandleGlobalAPBResponse(arg) {
  if (!(arg instanceof server_pb.HandleGlobalAPBResponse)) {
    throw new Error('Expected argument of type gsdk.server.HandleGlobalAPBResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_HandleGlobalAPBResponse(buffer_arg) {
  return server_pb.HandleGlobalAPBResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_HandleIdentifyRequest(arg) {
  if (!(arg instanceof server_pb.HandleIdentifyRequest)) {
    throw new Error('Expected argument of type gsdk.server.HandleIdentifyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_HandleIdentifyRequest(buffer_arg) {
  return server_pb.HandleIdentifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_HandleIdentifyResponse(arg) {
  if (!(arg instanceof server_pb.HandleIdentifyResponse)) {
    throw new Error('Expected argument of type gsdk.server.HandleIdentifyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_HandleIdentifyResponse(buffer_arg) {
  return server_pb.HandleIdentifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_HandleUserPhraseRequest(arg) {
  if (!(arg instanceof server_pb.HandleUserPhraseRequest)) {
    throw new Error('Expected argument of type gsdk.server.HandleUserPhraseRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_HandleUserPhraseRequest(buffer_arg) {
  return server_pb.HandleUserPhraseRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_HandleUserPhraseResponse(arg) {
  if (!(arg instanceof server_pb.HandleUserPhraseResponse)) {
    throw new Error('Expected argument of type gsdk.server.HandleUserPhraseResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_HandleUserPhraseResponse(buffer_arg) {
  return server_pb.HandleUserPhraseResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_HandleVerifyRequest(arg) {
  if (!(arg instanceof server_pb.HandleVerifyRequest)) {
    throw new Error('Expected argument of type gsdk.server.HandleVerifyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_HandleVerifyRequest(buffer_arg) {
  return server_pb.HandleVerifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_HandleVerifyResponse(arg) {
  if (!(arg instanceof server_pb.HandleVerifyResponse)) {
    throw new Error('Expected argument of type gsdk.server.HandleVerifyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_HandleVerifyResponse(buffer_arg) {
  return server_pb.HandleVerifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_ServerRequest(arg) {
  if (!(arg instanceof server_pb.ServerRequest)) {
    throw new Error('Expected argument of type gsdk.server.ServerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_ServerRequest(buffer_arg) {
  return server_pb.ServerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_SubscribeRequest(arg) {
  if (!(arg instanceof server_pb.SubscribeRequest)) {
    throw new Error('Expected argument of type gsdk.server.SubscribeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_SubscribeRequest(buffer_arg) {
  return server_pb.SubscribeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_UnsubscribeRequest(arg) {
  if (!(arg instanceof server_pb.UnsubscribeRequest)) {
    throw new Error('Expected argument of type gsdk.server.UnsubscribeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_UnsubscribeRequest(buffer_arg) {
  return server_pb.UnsubscribeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_server_UnsubscribeResponse(arg) {
  if (!(arg instanceof server_pb.UnsubscribeResponse)) {
    throw new Error('Expected argument of type gsdk.server.UnsubscribeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_server_UnsubscribeResponse(buffer_arg) {
  return server_pb.UnsubscribeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServerService = exports.ServerService = {
  subscribe: {
    path: '/gsdk.server.Server/Subscribe',
    requestStream: false,
    responseStream: true,
    requestType: server_pb.SubscribeRequest,
    responseType: server_pb.ServerRequest,
    requestSerialize: serialize_gsdk_server_SubscribeRequest,
    requestDeserialize: deserialize_gsdk_server_SubscribeRequest,
    responseSerialize: serialize_gsdk_server_ServerRequest,
    responseDeserialize: deserialize_gsdk_server_ServerRequest,
  },
  unsubscribe: {
    path: '/gsdk.server.Server/Unsubscribe',
    requestStream: false,
    responseStream: false,
    requestType: server_pb.UnsubscribeRequest,
    responseType: server_pb.UnsubscribeResponse,
    requestSerialize: serialize_gsdk_server_UnsubscribeRequest,
    requestDeserialize: deserialize_gsdk_server_UnsubscribeRequest,
    responseSerialize: serialize_gsdk_server_UnsubscribeResponse,
    responseDeserialize: deserialize_gsdk_server_UnsubscribeResponse,
  },
  handleVerify: {
    path: '/gsdk.server.Server/HandleVerify',
    requestStream: false,
    responseStream: false,
    requestType: server_pb.HandleVerifyRequest,
    responseType: server_pb.HandleVerifyResponse,
    requestSerialize: serialize_gsdk_server_HandleVerifyRequest,
    requestDeserialize: deserialize_gsdk_server_HandleVerifyRequest,
    responseSerialize: serialize_gsdk_server_HandleVerifyResponse,
    responseDeserialize: deserialize_gsdk_server_HandleVerifyResponse,
  },
  handleIdentify: {
    path: '/gsdk.server.Server/HandleIdentify',
    requestStream: false,
    responseStream: false,
    requestType: server_pb.HandleIdentifyRequest,
    responseType: server_pb.HandleIdentifyResponse,
    requestSerialize: serialize_gsdk_server_HandleIdentifyRequest,
    requestDeserialize: deserialize_gsdk_server_HandleIdentifyRequest,
    responseSerialize: serialize_gsdk_server_HandleIdentifyResponse,
    responseDeserialize: deserialize_gsdk_server_HandleIdentifyResponse,
  },
  handleGlobalAPB: {
    path: '/gsdk.server.Server/HandleGlobalAPB',
    requestStream: false,
    responseStream: false,
    requestType: server_pb.HandleGlobalAPBRequest,
    responseType: server_pb.HandleGlobalAPBResponse,
    requestSerialize: serialize_gsdk_server_HandleGlobalAPBRequest,
    requestDeserialize: deserialize_gsdk_server_HandleGlobalAPBRequest,
    responseSerialize: serialize_gsdk_server_HandleGlobalAPBResponse,
    responseDeserialize: deserialize_gsdk_server_HandleGlobalAPBResponse,
  },
  handleUserPhrase: {
    path: '/gsdk.server.Server/HandleUserPhrase',
    requestStream: false,
    responseStream: false,
    requestType: server_pb.HandleUserPhraseRequest,
    responseType: server_pb.HandleUserPhraseResponse,
    requestSerialize: serialize_gsdk_server_HandleUserPhraseRequest,
    requestDeserialize: deserialize_gsdk_server_HandleUserPhraseRequest,
    responseSerialize: serialize_gsdk_server_HandleUserPhraseResponse,
    responseDeserialize: deserialize_gsdk_server_HandleUserPhraseResponse,
  },
};

exports.ServerClient = grpc.makeGenericClientConstructor(ServerService, 'Server');
