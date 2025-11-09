// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var login_pb = require('./login_pb.js');

function serialize_gsdk_login_LoginAdminRequest(arg) {
  if (!(arg instanceof login_pb.LoginAdminRequest)) {
    throw new Error('Expected argument of type gsdk.login.LoginAdminRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_login_LoginAdminRequest(buffer_arg) {
  return login_pb.LoginAdminRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_login_LoginAdminResponse(arg) {
  if (!(arg instanceof login_pb.LoginAdminResponse)) {
    throw new Error('Expected argument of type gsdk.login.LoginAdminResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_login_LoginAdminResponse(buffer_arg) {
  return login_pb.LoginAdminResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_login_LoginRequest(arg) {
  if (!(arg instanceof login_pb.LoginRequest)) {
    throw new Error('Expected argument of type gsdk.login.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_login_LoginRequest(buffer_arg) {
  return login_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_login_LoginResponse(arg) {
  if (!(arg instanceof login_pb.LoginResponse)) {
    throw new Error('Expected argument of type gsdk.login.LoginResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_login_LoginResponse(buffer_arg) {
  return login_pb.LoginResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_login_LogoutRequest(arg) {
  if (!(arg instanceof login_pb.LogoutRequest)) {
    throw new Error('Expected argument of type gsdk.login.LogoutRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_login_LogoutRequest(buffer_arg) {
  return login_pb.LogoutRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_login_LogoutResponse(arg) {
  if (!(arg instanceof login_pb.LogoutResponse)) {
    throw new Error('Expected argument of type gsdk.login.LogoutResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_login_LogoutResponse(buffer_arg) {
  return login_pb.LogoutResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var LoginService = exports.LoginService = {
  login: {
    path: '/gsdk.login.Login/Login',
    requestStream: false,
    responseStream: false,
    requestType: login_pb.LoginRequest,
    responseType: login_pb.LoginResponse,
    requestSerialize: serialize_gsdk_login_LoginRequest,
    requestDeserialize: deserialize_gsdk_login_LoginRequest,
    responseSerialize: serialize_gsdk_login_LoginResponse,
    responseDeserialize: deserialize_gsdk_login_LoginResponse,
  },
  loginAdmin: {
    path: '/gsdk.login.Login/LoginAdmin',
    requestStream: false,
    responseStream: false,
    requestType: login_pb.LoginAdminRequest,
    responseType: login_pb.LoginAdminResponse,
    requestSerialize: serialize_gsdk_login_LoginAdminRequest,
    requestDeserialize: deserialize_gsdk_login_LoginAdminRequest,
    responseSerialize: serialize_gsdk_login_LoginAdminResponse,
    responseDeserialize: deserialize_gsdk_login_LoginAdminResponse,
  },
  logout: {
    path: '/gsdk.login.Login/Logout',
    requestStream: false,
    responseStream: false,
    requestType: login_pb.LogoutRequest,
    responseType: login_pb.LogoutResponse,
    requestSerialize: serialize_gsdk_login_LogoutRequest,
    requestDeserialize: deserialize_gsdk_login_LogoutRequest,
    responseSerialize: serialize_gsdk_login_LogoutResponse,
    responseDeserialize: deserialize_gsdk_login_LogoutResponse,
  },
};

exports.LoginClient = grpc.makeGenericClientConstructor(LoginService, 'Login');
