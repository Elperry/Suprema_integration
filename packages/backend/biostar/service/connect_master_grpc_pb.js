// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var connect_master_pb = require('./connect_master_pb.js');
var connect_pb = require('./connect_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_connect_StatusChange(arg) {
  if (!(arg instanceof connect_pb.StatusChange)) {
    throw new Error('Expected argument of type gsdk.connect.StatusChange');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_StatusChange(buffer_arg) {
  return connect_pb.StatusChange.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_AddAsyncConnectionDBRequest(arg) {
  if (!(arg instanceof connect_master_pb.AddAsyncConnectionDBRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.AddAsyncConnectionDBRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_AddAsyncConnectionDBRequest(buffer_arg) {
  return connect_master_pb.AddAsyncConnectionDBRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_AddAsyncConnectionDBResponse(arg) {
  if (!(arg instanceof connect_master_pb.AddAsyncConnectionDBResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.AddAsyncConnectionDBResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_AddAsyncConnectionDBResponse(buffer_arg) {
  return connect_master_pb.AddAsyncConnectionDBResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_AddAsyncConnectionRequest(arg) {
  if (!(arg instanceof connect_master_pb.AddAsyncConnectionRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.AddAsyncConnectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_AddAsyncConnectionRequest(buffer_arg) {
  return connect_master_pb.AddAsyncConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_AddAsyncConnectionResponse(arg) {
  if (!(arg instanceof connect_master_pb.AddAsyncConnectionResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.AddAsyncConnectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_AddAsyncConnectionResponse(buffer_arg) {
  return connect_master_pb.AddAsyncConnectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_AddSlaveDeviceDBRequest(arg) {
  if (!(arg instanceof connect_master_pb.AddSlaveDeviceDBRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.AddSlaveDeviceDBRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_AddSlaveDeviceDBRequest(buffer_arg) {
  return connect_master_pb.AddSlaveDeviceDBRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_AddSlaveDeviceDBResponse(arg) {
  if (!(arg instanceof connect_master_pb.AddSlaveDeviceDBResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.AddSlaveDeviceDBResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_AddSlaveDeviceDBResponse(buffer_arg) {
  return connect_master_pb.AddSlaveDeviceDBResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_ConnectRequest(arg) {
  if (!(arg instanceof connect_master_pb.ConnectRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.ConnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_ConnectRequest(buffer_arg) {
  return connect_master_pb.ConnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_ConnectResponse(arg) {
  if (!(arg instanceof connect_master_pb.ConnectResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.ConnectResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_ConnectResponse(buffer_arg) {
  return connect_master_pb.ConnectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DeleteAsyncConnectionDBRequest(arg) {
  if (!(arg instanceof connect_master_pb.DeleteAsyncConnectionDBRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.DeleteAsyncConnectionDBRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DeleteAsyncConnectionDBRequest(buffer_arg) {
  return connect_master_pb.DeleteAsyncConnectionDBRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DeleteAsyncConnectionDBResponse(arg) {
  if (!(arg instanceof connect_master_pb.DeleteAsyncConnectionDBResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.DeleteAsyncConnectionDBResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DeleteAsyncConnectionDBResponse(buffer_arg) {
  return connect_master_pb.DeleteAsyncConnectionDBResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DeleteAsyncConnectionRequest(arg) {
  if (!(arg instanceof connect_master_pb.DeleteAsyncConnectionRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.DeleteAsyncConnectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DeleteAsyncConnectionRequest(buffer_arg) {
  return connect_master_pb.DeleteAsyncConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DeleteAsyncConnectionResponse(arg) {
  if (!(arg instanceof connect_master_pb.DeleteAsyncConnectionResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.DeleteAsyncConnectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DeleteAsyncConnectionResponse(buffer_arg) {
  return connect_master_pb.DeleteAsyncConnectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DeleteSlaveDeviceDBRequest(arg) {
  if (!(arg instanceof connect_master_pb.DeleteSlaveDeviceDBRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.DeleteSlaveDeviceDBRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DeleteSlaveDeviceDBRequest(buffer_arg) {
  return connect_master_pb.DeleteSlaveDeviceDBRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DeleteSlaveDeviceDBResponse(arg) {
  if (!(arg instanceof connect_master_pb.DeleteSlaveDeviceDBResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.DeleteSlaveDeviceDBResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DeleteSlaveDeviceDBResponse(buffer_arg) {
  return connect_master_pb.DeleteSlaveDeviceDBResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DisableSSLMultiRequest(arg) {
  if (!(arg instanceof connect_master_pb.DisableSSLMultiRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.DisableSSLMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DisableSSLMultiRequest(buffer_arg) {
  return connect_master_pb.DisableSSLMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DisableSSLMultiResponse(arg) {
  if (!(arg instanceof connect_master_pb.DisableSSLMultiResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.DisableSSLMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DisableSSLMultiResponse(buffer_arg) {
  return connect_master_pb.DisableSSLMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DisableSSLRequest(arg) {
  if (!(arg instanceof connect_master_pb.DisableSSLRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.DisableSSLRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DisableSSLRequest(buffer_arg) {
  return connect_master_pb.DisableSSLRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DisableSSLResponse(arg) {
  if (!(arg instanceof connect_master_pb.DisableSSLResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.DisableSSLResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DisableSSLResponse(buffer_arg) {
  return connect_master_pb.DisableSSLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DisconnectAllRequest(arg) {
  if (!(arg instanceof connect_master_pb.DisconnectAllRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.DisconnectAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DisconnectAllRequest(buffer_arg) {
  return connect_master_pb.DisconnectAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DisconnectAllResponse(arg) {
  if (!(arg instanceof connect_master_pb.DisconnectAllResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.DisconnectAllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DisconnectAllResponse(buffer_arg) {
  return connect_master_pb.DisconnectAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DisconnectRequest(arg) {
  if (!(arg instanceof connect_master_pb.DisconnectRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.DisconnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DisconnectRequest(buffer_arg) {
  return connect_master_pb.DisconnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_DisconnectResponse(arg) {
  if (!(arg instanceof connect_master_pb.DisconnectResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.DisconnectResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_DisconnectResponse(buffer_arg) {
  return connect_master_pb.DisconnectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_EnableSSLMultiRequest(arg) {
  if (!(arg instanceof connect_master_pb.EnableSSLMultiRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.EnableSSLMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_EnableSSLMultiRequest(buffer_arg) {
  return connect_master_pb.EnableSSLMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_EnableSSLMultiResponse(arg) {
  if (!(arg instanceof connect_master_pb.EnableSSLMultiResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.EnableSSLMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_EnableSSLMultiResponse(buffer_arg) {
  return connect_master_pb.EnableSSLMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_EnableSSLRequest(arg) {
  if (!(arg instanceof connect_master_pb.EnableSSLRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.EnableSSLRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_EnableSSLRequest(buffer_arg) {
  return connect_master_pb.EnableSSLRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_EnableSSLResponse(arg) {
  if (!(arg instanceof connect_master_pb.EnableSSLResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.EnableSSLResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_EnableSSLResponse(buffer_arg) {
  return connect_master_pb.EnableSSLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetAcceptFilterDBRequest(arg) {
  if (!(arg instanceof connect_master_pb.GetAcceptFilterDBRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetAcceptFilterDBRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetAcceptFilterDBRequest(buffer_arg) {
  return connect_master_pb.GetAcceptFilterDBRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetAcceptFilterDBResponse(arg) {
  if (!(arg instanceof connect_master_pb.GetAcceptFilterDBResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetAcceptFilterDBResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetAcceptFilterDBResponse(buffer_arg) {
  return connect_master_pb.GetAcceptFilterDBResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetAcceptFilterRequest(arg) {
  if (!(arg instanceof connect_master_pb.GetAcceptFilterRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetAcceptFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetAcceptFilterRequest(buffer_arg) {
  return connect_master_pb.GetAcceptFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetAcceptFilterResponse(arg) {
  if (!(arg instanceof connect_master_pb.GetAcceptFilterResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetAcceptFilterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetAcceptFilterResponse(buffer_arg) {
  return connect_master_pb.GetAcceptFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetAsyncConnectionDBRequest(arg) {
  if (!(arg instanceof connect_master_pb.GetAsyncConnectionDBRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetAsyncConnectionDBRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetAsyncConnectionDBRequest(buffer_arg) {
  return connect_master_pb.GetAsyncConnectionDBRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetAsyncConnectionDBResponse(arg) {
  if (!(arg instanceof connect_master_pb.GetAsyncConnectionDBResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetAsyncConnectionDBResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetAsyncConnectionDBResponse(buffer_arg) {
  return connect_master_pb.GetAsyncConnectionDBResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetDeviceListRequest(arg) {
  if (!(arg instanceof connect_master_pb.GetDeviceListRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetDeviceListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetDeviceListRequest(buffer_arg) {
  return connect_master_pb.GetDeviceListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetDeviceListResponse(arg) {
  if (!(arg instanceof connect_master_pb.GetDeviceListResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetDeviceListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetDeviceListResponse(buffer_arg) {
  return connect_master_pb.GetDeviceListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetPendingListRequest(arg) {
  if (!(arg instanceof connect_master_pb.GetPendingListRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetPendingListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetPendingListRequest(buffer_arg) {
  return connect_master_pb.GetPendingListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetPendingListResponse(arg) {
  if (!(arg instanceof connect_master_pb.GetPendingListResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetPendingListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetPendingListResponse(buffer_arg) {
  return connect_master_pb.GetPendingListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetSlaveDeviceDBRequest(arg) {
  if (!(arg instanceof connect_master_pb.GetSlaveDeviceDBRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetSlaveDeviceDBRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetSlaveDeviceDBRequest(buffer_arg) {
  return connect_master_pb.GetSlaveDeviceDBRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetSlaveDeviceDBResponse(arg) {
  if (!(arg instanceof connect_master_pb.GetSlaveDeviceDBResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetSlaveDeviceDBResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetSlaveDeviceDBResponse(buffer_arg) {
  return connect_master_pb.GetSlaveDeviceDBResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetSlaveDeviceRequest(arg) {
  if (!(arg instanceof connect_master_pb.GetSlaveDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetSlaveDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetSlaveDeviceRequest(buffer_arg) {
  return connect_master_pb.GetSlaveDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_GetSlaveDeviceResponse(arg) {
  if (!(arg instanceof connect_master_pb.GetSlaveDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.GetSlaveDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_GetSlaveDeviceResponse(buffer_arg) {
  return connect_master_pb.GetSlaveDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SearchDeviceRequest(arg) {
  if (!(arg instanceof connect_master_pb.SearchDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.SearchDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SearchDeviceRequest(buffer_arg) {
  return connect_master_pb.SearchDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SearchDeviceResponse(arg) {
  if (!(arg instanceof connect_master_pb.SearchDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.SearchDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SearchDeviceResponse(buffer_arg) {
  return connect_master_pb.SearchDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SetAcceptFilterDBRequest(arg) {
  if (!(arg instanceof connect_master_pb.SetAcceptFilterDBRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.SetAcceptFilterDBRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SetAcceptFilterDBRequest(buffer_arg) {
  return connect_master_pb.SetAcceptFilterDBRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SetAcceptFilterDBResponse(arg) {
  if (!(arg instanceof connect_master_pb.SetAcceptFilterDBResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.SetAcceptFilterDBResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SetAcceptFilterDBResponse(buffer_arg) {
  return connect_master_pb.SetAcceptFilterDBResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SetAcceptFilterRequest(arg) {
  if (!(arg instanceof connect_master_pb.SetAcceptFilterRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.SetAcceptFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SetAcceptFilterRequest(buffer_arg) {
  return connect_master_pb.SetAcceptFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SetAcceptFilterResponse(arg) {
  if (!(arg instanceof connect_master_pb.SetAcceptFilterResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.SetAcceptFilterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SetAcceptFilterResponse(buffer_arg) {
  return connect_master_pb.SetAcceptFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SetConnectionModeMultiRequest(arg) {
  if (!(arg instanceof connect_master_pb.SetConnectionModeMultiRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.SetConnectionModeMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SetConnectionModeMultiRequest(buffer_arg) {
  return connect_master_pb.SetConnectionModeMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SetConnectionModeMultiResponse(arg) {
  if (!(arg instanceof connect_master_pb.SetConnectionModeMultiResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.SetConnectionModeMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SetConnectionModeMultiResponse(buffer_arg) {
  return connect_master_pb.SetConnectionModeMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SetConnectionModeRequest(arg) {
  if (!(arg instanceof connect_master_pb.SetConnectionModeRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.SetConnectionModeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SetConnectionModeRequest(buffer_arg) {
  return connect_master_pb.SetConnectionModeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SetConnectionModeResponse(arg) {
  if (!(arg instanceof connect_master_pb.SetConnectionModeResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.SetConnectionModeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SetConnectionModeResponse(buffer_arg) {
  return connect_master_pb.SetConnectionModeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SetSlaveDeviceRequest(arg) {
  if (!(arg instanceof connect_master_pb.SetSlaveDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.SetSlaveDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SetSlaveDeviceRequest(buffer_arg) {
  return connect_master_pb.SetSlaveDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SetSlaveDeviceResponse(arg) {
  if (!(arg instanceof connect_master_pb.SetSlaveDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.connect_master.SetSlaveDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SetSlaveDeviceResponse(buffer_arg) {
  return connect_master_pb.SetSlaveDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_master_SubscribeStatusRequest(arg) {
  if (!(arg instanceof connect_master_pb.SubscribeStatusRequest)) {
    throw new Error('Expected argument of type gsdk.connect_master.SubscribeStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_master_SubscribeStatusRequest(buffer_arg) {
  return connect_master_pb.SubscribeStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ConnectMasterService = exports.ConnectMasterService = {
  connect: {
    path: '/gsdk.connect_master.ConnectMaster/Connect',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.ConnectRequest,
    responseType: connect_master_pb.ConnectResponse,
    requestSerialize: serialize_gsdk_connect_master_ConnectRequest,
    requestDeserialize: deserialize_gsdk_connect_master_ConnectRequest,
    responseSerialize: serialize_gsdk_connect_master_ConnectResponse,
    responseDeserialize: deserialize_gsdk_connect_master_ConnectResponse,
  },
  addAsyncConnection: {
    path: '/gsdk.connect_master.ConnectMaster/AddAsyncConnection',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.AddAsyncConnectionRequest,
    responseType: connect_master_pb.AddAsyncConnectionResponse,
    requestSerialize: serialize_gsdk_connect_master_AddAsyncConnectionRequest,
    requestDeserialize: deserialize_gsdk_connect_master_AddAsyncConnectionRequest,
    responseSerialize: serialize_gsdk_connect_master_AddAsyncConnectionResponse,
    responseDeserialize: deserialize_gsdk_connect_master_AddAsyncConnectionResponse,
  },
  deleteAsyncConnection: {
    path: '/gsdk.connect_master.ConnectMaster/DeleteAsyncConnection',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.DeleteAsyncConnectionRequest,
    responseType: connect_master_pb.DeleteAsyncConnectionResponse,
    requestSerialize: serialize_gsdk_connect_master_DeleteAsyncConnectionRequest,
    requestDeserialize: deserialize_gsdk_connect_master_DeleteAsyncConnectionRequest,
    responseSerialize: serialize_gsdk_connect_master_DeleteAsyncConnectionResponse,
    responseDeserialize: deserialize_gsdk_connect_master_DeleteAsyncConnectionResponse,
  },
  addAsyncConnectionDB: {
    path: '/gsdk.connect_master.ConnectMaster/AddAsyncConnectionDB',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.AddAsyncConnectionDBRequest,
    responseType: connect_master_pb.AddAsyncConnectionDBResponse,
    requestSerialize: serialize_gsdk_connect_master_AddAsyncConnectionDBRequest,
    requestDeserialize: deserialize_gsdk_connect_master_AddAsyncConnectionDBRequest,
    responseSerialize: serialize_gsdk_connect_master_AddAsyncConnectionDBResponse,
    responseDeserialize: deserialize_gsdk_connect_master_AddAsyncConnectionDBResponse,
  },
  deleteAsyncConnectionDB: {
    path: '/gsdk.connect_master.ConnectMaster/DeleteAsyncConnectionDB',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.DeleteAsyncConnectionDBRequest,
    responseType: connect_master_pb.DeleteAsyncConnectionDBResponse,
    requestSerialize: serialize_gsdk_connect_master_DeleteAsyncConnectionDBRequest,
    requestDeserialize: deserialize_gsdk_connect_master_DeleteAsyncConnectionDBRequest,
    responseSerialize: serialize_gsdk_connect_master_DeleteAsyncConnectionDBResponse,
    responseDeserialize: deserialize_gsdk_connect_master_DeleteAsyncConnectionDBResponse,
  },
  getAsyncConnectionDB: {
    path: '/gsdk.connect_master.ConnectMaster/GetAsyncConnectionDB',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.GetAsyncConnectionDBRequest,
    responseType: connect_master_pb.GetAsyncConnectionDBResponse,
    requestSerialize: serialize_gsdk_connect_master_GetAsyncConnectionDBRequest,
    requestDeserialize: deserialize_gsdk_connect_master_GetAsyncConnectionDBRequest,
    responseSerialize: serialize_gsdk_connect_master_GetAsyncConnectionDBResponse,
    responseDeserialize: deserialize_gsdk_connect_master_GetAsyncConnectionDBResponse,
  },
  setAcceptFilter: {
    path: '/gsdk.connect_master.ConnectMaster/SetAcceptFilter',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.SetAcceptFilterRequest,
    responseType: connect_master_pb.SetAcceptFilterResponse,
    requestSerialize: serialize_gsdk_connect_master_SetAcceptFilterRequest,
    requestDeserialize: deserialize_gsdk_connect_master_SetAcceptFilterRequest,
    responseSerialize: serialize_gsdk_connect_master_SetAcceptFilterResponse,
    responseDeserialize: deserialize_gsdk_connect_master_SetAcceptFilterResponse,
  },
  getAcceptFilter: {
    path: '/gsdk.connect_master.ConnectMaster/GetAcceptFilter',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.GetAcceptFilterRequest,
    responseType: connect_master_pb.GetAcceptFilterResponse,
    requestSerialize: serialize_gsdk_connect_master_GetAcceptFilterRequest,
    requestDeserialize: deserialize_gsdk_connect_master_GetAcceptFilterRequest,
    responseSerialize: serialize_gsdk_connect_master_GetAcceptFilterResponse,
    responseDeserialize: deserialize_gsdk_connect_master_GetAcceptFilterResponse,
  },
  setAcceptFilterDB: {
    path: '/gsdk.connect_master.ConnectMaster/SetAcceptFilterDB',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.SetAcceptFilterDBRequest,
    responseType: connect_master_pb.SetAcceptFilterDBResponse,
    requestSerialize: serialize_gsdk_connect_master_SetAcceptFilterDBRequest,
    requestDeserialize: deserialize_gsdk_connect_master_SetAcceptFilterDBRequest,
    responseSerialize: serialize_gsdk_connect_master_SetAcceptFilterDBResponse,
    responseDeserialize: deserialize_gsdk_connect_master_SetAcceptFilterDBResponse,
  },
  getAcceptFilterDB: {
    path: '/gsdk.connect_master.ConnectMaster/GetAcceptFilterDB',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.GetAcceptFilterDBRequest,
    responseType: connect_master_pb.GetAcceptFilterDBResponse,
    requestSerialize: serialize_gsdk_connect_master_GetAcceptFilterDBRequest,
    requestDeserialize: deserialize_gsdk_connect_master_GetAcceptFilterDBRequest,
    responseSerialize: serialize_gsdk_connect_master_GetAcceptFilterDBResponse,
    responseDeserialize: deserialize_gsdk_connect_master_GetAcceptFilterDBResponse,
  },
  getPendingList: {
    path: '/gsdk.connect_master.ConnectMaster/GetPendingList',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.GetPendingListRequest,
    responseType: connect_master_pb.GetPendingListResponse,
    requestSerialize: serialize_gsdk_connect_master_GetPendingListRequest,
    requestDeserialize: deserialize_gsdk_connect_master_GetPendingListRequest,
    responseSerialize: serialize_gsdk_connect_master_GetPendingListResponse,
    responseDeserialize: deserialize_gsdk_connect_master_GetPendingListResponse,
  },
  getDeviceList: {
    path: '/gsdk.connect_master.ConnectMaster/GetDeviceList',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.GetDeviceListRequest,
    responseType: connect_master_pb.GetDeviceListResponse,
    requestSerialize: serialize_gsdk_connect_master_GetDeviceListRequest,
    requestDeserialize: deserialize_gsdk_connect_master_GetDeviceListRequest,
    responseSerialize: serialize_gsdk_connect_master_GetDeviceListResponse,
    responseDeserialize: deserialize_gsdk_connect_master_GetDeviceListResponse,
  },
  disconnect: {
    path: '/gsdk.connect_master.ConnectMaster/Disconnect',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.DisconnectRequest,
    responseType: connect_master_pb.DisconnectResponse,
    requestSerialize: serialize_gsdk_connect_master_DisconnectRequest,
    requestDeserialize: deserialize_gsdk_connect_master_DisconnectRequest,
    responseSerialize: serialize_gsdk_connect_master_DisconnectResponse,
    responseDeserialize: deserialize_gsdk_connect_master_DisconnectResponse,
  },
  disconnectAll: {
    path: '/gsdk.connect_master.ConnectMaster/DisconnectAll',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.DisconnectAllRequest,
    responseType: connect_master_pb.DisconnectAllResponse,
    requestSerialize: serialize_gsdk_connect_master_DisconnectAllRequest,
    requestDeserialize: deserialize_gsdk_connect_master_DisconnectAllRequest,
    responseSerialize: serialize_gsdk_connect_master_DisconnectAllResponse,
    responseDeserialize: deserialize_gsdk_connect_master_DisconnectAllResponse,
  },
  searchDevice: {
    path: '/gsdk.connect_master.ConnectMaster/SearchDevice',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.SearchDeviceRequest,
    responseType: connect_master_pb.SearchDeviceResponse,
    requestSerialize: serialize_gsdk_connect_master_SearchDeviceRequest,
    requestDeserialize: deserialize_gsdk_connect_master_SearchDeviceRequest,
    responseSerialize: serialize_gsdk_connect_master_SearchDeviceResponse,
    responseDeserialize: deserialize_gsdk_connect_master_SearchDeviceResponse,
  },
  getSlaveDevice: {
    path: '/gsdk.connect_master.ConnectMaster/GetSlaveDevice',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.GetSlaveDeviceRequest,
    responseType: connect_master_pb.GetSlaveDeviceResponse,
    requestSerialize: serialize_gsdk_connect_master_GetSlaveDeviceRequest,
    requestDeserialize: deserialize_gsdk_connect_master_GetSlaveDeviceRequest,
    responseSerialize: serialize_gsdk_connect_master_GetSlaveDeviceResponse,
    responseDeserialize: deserialize_gsdk_connect_master_GetSlaveDeviceResponse,
  },
  setSlaveDevice: {
    path: '/gsdk.connect_master.ConnectMaster/SetSlaveDevice',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.SetSlaveDeviceRequest,
    responseType: connect_master_pb.SetSlaveDeviceResponse,
    requestSerialize: serialize_gsdk_connect_master_SetSlaveDeviceRequest,
    requestDeserialize: deserialize_gsdk_connect_master_SetSlaveDeviceRequest,
    responseSerialize: serialize_gsdk_connect_master_SetSlaveDeviceResponse,
    responseDeserialize: deserialize_gsdk_connect_master_SetSlaveDeviceResponse,
  },
  addSlaveDeviceDB: {
    path: '/gsdk.connect_master.ConnectMaster/AddSlaveDeviceDB',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.AddSlaveDeviceDBRequest,
    responseType: connect_master_pb.AddSlaveDeviceDBResponse,
    requestSerialize: serialize_gsdk_connect_master_AddSlaveDeviceDBRequest,
    requestDeserialize: deserialize_gsdk_connect_master_AddSlaveDeviceDBRequest,
    responseSerialize: serialize_gsdk_connect_master_AddSlaveDeviceDBResponse,
    responseDeserialize: deserialize_gsdk_connect_master_AddSlaveDeviceDBResponse,
  },
  deleteSlaveDeviceDB: {
    path: '/gsdk.connect_master.ConnectMaster/DeleteSlaveDeviceDB',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.DeleteSlaveDeviceDBRequest,
    responseType: connect_master_pb.DeleteSlaveDeviceDBResponse,
    requestSerialize: serialize_gsdk_connect_master_DeleteSlaveDeviceDBRequest,
    requestDeserialize: deserialize_gsdk_connect_master_DeleteSlaveDeviceDBRequest,
    responseSerialize: serialize_gsdk_connect_master_DeleteSlaveDeviceDBResponse,
    responseDeserialize: deserialize_gsdk_connect_master_DeleteSlaveDeviceDBResponse,
  },
  getSlaveDeviceDB: {
    path: '/gsdk.connect_master.ConnectMaster/GetSlaveDeviceDB',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.GetSlaveDeviceDBRequest,
    responseType: connect_master_pb.GetSlaveDeviceDBResponse,
    requestSerialize: serialize_gsdk_connect_master_GetSlaveDeviceDBRequest,
    requestDeserialize: deserialize_gsdk_connect_master_GetSlaveDeviceDBRequest,
    responseSerialize: serialize_gsdk_connect_master_GetSlaveDeviceDBResponse,
    responseDeserialize: deserialize_gsdk_connect_master_GetSlaveDeviceDBResponse,
  },
  setConnectionMode: {
    path: '/gsdk.connect_master.ConnectMaster/SetConnectionMode',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.SetConnectionModeRequest,
    responseType: connect_master_pb.SetConnectionModeResponse,
    requestSerialize: serialize_gsdk_connect_master_SetConnectionModeRequest,
    requestDeserialize: deserialize_gsdk_connect_master_SetConnectionModeRequest,
    responseSerialize: serialize_gsdk_connect_master_SetConnectionModeResponse,
    responseDeserialize: deserialize_gsdk_connect_master_SetConnectionModeResponse,
  },
  setConnectionModeMulti: {
    path: '/gsdk.connect_master.ConnectMaster/SetConnectionModeMulti',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.SetConnectionModeMultiRequest,
    responseType: connect_master_pb.SetConnectionModeMultiResponse,
    requestSerialize: serialize_gsdk_connect_master_SetConnectionModeMultiRequest,
    requestDeserialize: deserialize_gsdk_connect_master_SetConnectionModeMultiRequest,
    responseSerialize: serialize_gsdk_connect_master_SetConnectionModeMultiResponse,
    responseDeserialize: deserialize_gsdk_connect_master_SetConnectionModeMultiResponse,
  },
  enableSSL: {
    path: '/gsdk.connect_master.ConnectMaster/EnableSSL',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.EnableSSLRequest,
    responseType: connect_master_pb.EnableSSLResponse,
    requestSerialize: serialize_gsdk_connect_master_EnableSSLRequest,
    requestDeserialize: deserialize_gsdk_connect_master_EnableSSLRequest,
    responseSerialize: serialize_gsdk_connect_master_EnableSSLResponse,
    responseDeserialize: deserialize_gsdk_connect_master_EnableSSLResponse,
  },
  enableSSLMulti: {
    path: '/gsdk.connect_master.ConnectMaster/EnableSSLMulti',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.EnableSSLMultiRequest,
    responseType: connect_master_pb.EnableSSLMultiResponse,
    requestSerialize: serialize_gsdk_connect_master_EnableSSLMultiRequest,
    requestDeserialize: deserialize_gsdk_connect_master_EnableSSLMultiRequest,
    responseSerialize: serialize_gsdk_connect_master_EnableSSLMultiResponse,
    responseDeserialize: deserialize_gsdk_connect_master_EnableSSLMultiResponse,
  },
  disableSSL: {
    path: '/gsdk.connect_master.ConnectMaster/DisableSSL',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.DisableSSLRequest,
    responseType: connect_master_pb.DisableSSLResponse,
    requestSerialize: serialize_gsdk_connect_master_DisableSSLRequest,
    requestDeserialize: deserialize_gsdk_connect_master_DisableSSLRequest,
    responseSerialize: serialize_gsdk_connect_master_DisableSSLResponse,
    responseDeserialize: deserialize_gsdk_connect_master_DisableSSLResponse,
  },
  disableSSLMulti: {
    path: '/gsdk.connect_master.ConnectMaster/DisableSSLMulti',
    requestStream: false,
    responseStream: false,
    requestType: connect_master_pb.DisableSSLMultiRequest,
    responseType: connect_master_pb.DisableSSLMultiResponse,
    requestSerialize: serialize_gsdk_connect_master_DisableSSLMultiRequest,
    requestDeserialize: deserialize_gsdk_connect_master_DisableSSLMultiRequest,
    responseSerialize: serialize_gsdk_connect_master_DisableSSLMultiResponse,
    responseDeserialize: deserialize_gsdk_connect_master_DisableSSLMultiResponse,
  },
  subscribeStatus: {
    path: '/gsdk.connect_master.ConnectMaster/SubscribeStatus',
    requestStream: false,
    responseStream: true,
    requestType: connect_master_pb.SubscribeStatusRequest,
    responseType: connect_pb.StatusChange,
    requestSerialize: serialize_gsdk_connect_master_SubscribeStatusRequest,
    requestDeserialize: deserialize_gsdk_connect_master_SubscribeStatusRequest,
    responseSerialize: serialize_gsdk_connect_StatusChange,
    responseDeserialize: deserialize_gsdk_connect_StatusChange,
  },
};

exports.ConnectMasterClient = grpc.makeGenericClientConstructor(ConnectMasterService, 'ConnectMaster');
