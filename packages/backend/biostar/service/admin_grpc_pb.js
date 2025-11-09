// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var admin_pb = require('./admin_pb.js');

function serialize_gsdk_admin_GetInfoRequest(arg) {
  if (!(arg instanceof admin_pb.GetInfoRequest)) {
    throw new Error('Expected argument of type gsdk.admin.GetInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_admin_GetInfoRequest(buffer_arg) {
  return admin_pb.GetInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_admin_GetInfoResponse(arg) {
  if (!(arg instanceof admin_pb.GetInfoResponse)) {
    throw new Error('Expected argument of type gsdk.admin.GetInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_admin_GetInfoResponse(buffer_arg) {
  return admin_pb.GetInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AdminService = exports.AdminService = {
  getInfo: {
    path: '/gsdk.admin.Admin/GetInfo',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.GetInfoRequest,
    responseType: admin_pb.GetInfoResponse,
    requestSerialize: serialize_gsdk_admin_GetInfoRequest,
    requestDeserialize: deserialize_gsdk_admin_GetInfoRequest,
    responseSerialize: serialize_gsdk_admin_GetInfoResponse,
    responseDeserialize: deserialize_gsdk_admin_GetInfoResponse,
  },
};

exports.AdminClient = grpc.makeGenericClientConstructor(AdminService, 'Admin');
