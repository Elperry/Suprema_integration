// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var cert_pb = require('./cert_pb.js');

function serialize_gsdk_cert_CreateServerCertificateRequest(arg) {
  if (!(arg instanceof cert_pb.CreateServerCertificateRequest)) {
    throw new Error('Expected argument of type gsdk.cert.CreateServerCertificateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_cert_CreateServerCertificateRequest(buffer_arg) {
  return cert_pb.CreateServerCertificateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_cert_CreateServerCertificateResponse(arg) {
  if (!(arg instanceof cert_pb.CreateServerCertificateResponse)) {
    throw new Error('Expected argument of type gsdk.cert.CreateServerCertificateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_cert_CreateServerCertificateResponse(buffer_arg) {
  return cert_pb.CreateServerCertificateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_cert_SetGatewayCertificateRequest(arg) {
  if (!(arg instanceof cert_pb.SetGatewayCertificateRequest)) {
    throw new Error('Expected argument of type gsdk.cert.SetGatewayCertificateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_cert_SetGatewayCertificateRequest(buffer_arg) {
  return cert_pb.SetGatewayCertificateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_cert_SetGatewayCertificateResponse(arg) {
  if (!(arg instanceof cert_pb.SetGatewayCertificateResponse)) {
    throw new Error('Expected argument of type gsdk.cert.SetGatewayCertificateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_cert_SetGatewayCertificateResponse(buffer_arg) {
  return cert_pb.SetGatewayCertificateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_cert_SetServerCertificateRequest(arg) {
  if (!(arg instanceof cert_pb.SetServerCertificateRequest)) {
    throw new Error('Expected argument of type gsdk.cert.SetServerCertificateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_cert_SetServerCertificateRequest(buffer_arg) {
  return cert_pb.SetServerCertificateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_cert_SetServerCertificateResponse(arg) {
  if (!(arg instanceof cert_pb.SetServerCertificateResponse)) {
    throw new Error('Expected argument of type gsdk.cert.SetServerCertificateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_cert_SetServerCertificateResponse(buffer_arg) {
  return cert_pb.SetServerCertificateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CertService = exports.CertService = {
  // Server Certificate
createServerCertificate: {
    path: '/gsdk.cert.Cert/CreateServerCertificate',
    requestStream: false,
    responseStream: false,
    requestType: cert_pb.CreateServerCertificateRequest,
    responseType: cert_pb.CreateServerCertificateResponse,
    requestSerialize: serialize_gsdk_cert_CreateServerCertificateRequest,
    requestDeserialize: deserialize_gsdk_cert_CreateServerCertificateRequest,
    responseSerialize: serialize_gsdk_cert_CreateServerCertificateResponse,
    responseDeserialize: deserialize_gsdk_cert_CreateServerCertificateResponse,
  },
  setServerCertificate: {
    path: '/gsdk.cert.Cert/SetServerCertificate',
    requestStream: false,
    responseStream: false,
    requestType: cert_pb.SetServerCertificateRequest,
    responseType: cert_pb.SetServerCertificateResponse,
    requestSerialize: serialize_gsdk_cert_SetServerCertificateRequest,
    requestDeserialize: deserialize_gsdk_cert_SetServerCertificateRequest,
    responseSerialize: serialize_gsdk_cert_SetServerCertificateResponse,
    responseDeserialize: deserialize_gsdk_cert_SetServerCertificateResponse,
  },
  // Set Gatweay Certificate: for Device Gateway only
setGatewayCertificate: {
    path: '/gsdk.cert.Cert/SetGatewayCertificate',
    requestStream: false,
    responseStream: false,
    requestType: cert_pb.SetGatewayCertificateRequest,
    responseType: cert_pb.SetGatewayCertificateResponse,
    requestSerialize: serialize_gsdk_cert_SetGatewayCertificateRequest,
    requestDeserialize: deserialize_gsdk_cert_SetGatewayCertificateRequest,
    responseSerialize: serialize_gsdk_cert_SetGatewayCertificateResponse,
    responseDeserialize: deserialize_gsdk_cert_SetGatewayCertificateResponse,
  },
};

exports.CertClient = grpc.makeGenericClientConstructor(CertService, 'Cert');
