// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var connect_pb = require('./connect_pb.js');
var device_pb = require('./device_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_connect_AddAsyncConnectionRequest(arg) {
  if (!(arg instanceof connect_pb.AddAsyncConnectionRequest)) {
    throw new Error('Expected argument of type gsdk.connect.AddAsyncConnectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_AddAsyncConnectionRequest(buffer_arg) {
  return connect_pb.AddAsyncConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_AddAsyncConnectionResponse(arg) {
  if (!(arg instanceof connect_pb.AddAsyncConnectionResponse)) {
    throw new Error('Expected argument of type gsdk.connect.AddAsyncConnectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_AddAsyncConnectionResponse(buffer_arg) {
  return connect_pb.AddAsyncConnectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_ConnectRequest(arg) {
  if (!(arg instanceof connect_pb.ConnectRequest)) {
    throw new Error('Expected argument of type gsdk.connect.ConnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_ConnectRequest(buffer_arg) {
  return connect_pb.ConnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_ConnectResponse(arg) {
  if (!(arg instanceof connect_pb.ConnectResponse)) {
    throw new Error('Expected argument of type gsdk.connect.ConnectResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_ConnectResponse(buffer_arg) {
  return connect_pb.ConnectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_DeleteAsyncConnectionRequest(arg) {
  if (!(arg instanceof connect_pb.DeleteAsyncConnectionRequest)) {
    throw new Error('Expected argument of type gsdk.connect.DeleteAsyncConnectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_DeleteAsyncConnectionRequest(buffer_arg) {
  return connect_pb.DeleteAsyncConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_DeleteAsyncConnectionResponse(arg) {
  if (!(arg instanceof connect_pb.DeleteAsyncConnectionResponse)) {
    throw new Error('Expected argument of type gsdk.connect.DeleteAsyncConnectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_DeleteAsyncConnectionResponse(buffer_arg) {
  return connect_pb.DeleteAsyncConnectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_DisableSSLMultiRequest(arg) {
  if (!(arg instanceof connect_pb.DisableSSLMultiRequest)) {
    throw new Error('Expected argument of type gsdk.connect.DisableSSLMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_DisableSSLMultiRequest(buffer_arg) {
  return connect_pb.DisableSSLMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_DisableSSLMultiResponse(arg) {
  if (!(arg instanceof connect_pb.DisableSSLMultiResponse)) {
    throw new Error('Expected argument of type gsdk.connect.DisableSSLMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_DisableSSLMultiResponse(buffer_arg) {
  return connect_pb.DisableSSLMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_DisableSSLRequest(arg) {
  if (!(arg instanceof connect_pb.DisableSSLRequest)) {
    throw new Error('Expected argument of type gsdk.connect.DisableSSLRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_DisableSSLRequest(buffer_arg) {
  return connect_pb.DisableSSLRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_DisableSSLResponse(arg) {
  if (!(arg instanceof connect_pb.DisableSSLResponse)) {
    throw new Error('Expected argument of type gsdk.connect.DisableSSLResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_DisableSSLResponse(buffer_arg) {
  return connect_pb.DisableSSLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_DisconnectAllRequest(arg) {
  if (!(arg instanceof connect_pb.DisconnectAllRequest)) {
    throw new Error('Expected argument of type gsdk.connect.DisconnectAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_DisconnectAllRequest(buffer_arg) {
  return connect_pb.DisconnectAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_DisconnectAllResponse(arg) {
  if (!(arg instanceof connect_pb.DisconnectAllResponse)) {
    throw new Error('Expected argument of type gsdk.connect.DisconnectAllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_DisconnectAllResponse(buffer_arg) {
  return connect_pb.DisconnectAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_DisconnectRequest(arg) {
  if (!(arg instanceof connect_pb.DisconnectRequest)) {
    throw new Error('Expected argument of type gsdk.connect.DisconnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_DisconnectRequest(buffer_arg) {
  return connect_pb.DisconnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_DisconnectResponse(arg) {
  if (!(arg instanceof connect_pb.DisconnectResponse)) {
    throw new Error('Expected argument of type gsdk.connect.DisconnectResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_DisconnectResponse(buffer_arg) {
  return connect_pb.DisconnectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_EnableSSLMultiRequest(arg) {
  if (!(arg instanceof connect_pb.EnableSSLMultiRequest)) {
    throw new Error('Expected argument of type gsdk.connect.EnableSSLMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_EnableSSLMultiRequest(buffer_arg) {
  return connect_pb.EnableSSLMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_EnableSSLMultiResponse(arg) {
  if (!(arg instanceof connect_pb.EnableSSLMultiResponse)) {
    throw new Error('Expected argument of type gsdk.connect.EnableSSLMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_EnableSSLMultiResponse(buffer_arg) {
  return connect_pb.EnableSSLMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_EnableSSLRequest(arg) {
  if (!(arg instanceof connect_pb.EnableSSLRequest)) {
    throw new Error('Expected argument of type gsdk.connect.EnableSSLRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_EnableSSLRequest(buffer_arg) {
  return connect_pb.EnableSSLRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_EnableSSLResponse(arg) {
  if (!(arg instanceof connect_pb.EnableSSLResponse)) {
    throw new Error('Expected argument of type gsdk.connect.EnableSSLResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_EnableSSLResponse(buffer_arg) {
  return connect_pb.EnableSSLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_GetAcceptFilterRequest(arg) {
  if (!(arg instanceof connect_pb.GetAcceptFilterRequest)) {
    throw new Error('Expected argument of type gsdk.connect.GetAcceptFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_GetAcceptFilterRequest(buffer_arg) {
  return connect_pb.GetAcceptFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_GetAcceptFilterResponse(arg) {
  if (!(arg instanceof connect_pb.GetAcceptFilterResponse)) {
    throw new Error('Expected argument of type gsdk.connect.GetAcceptFilterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_GetAcceptFilterResponse(buffer_arg) {
  return connect_pb.GetAcceptFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_GetDeviceListRequest(arg) {
  if (!(arg instanceof connect_pb.GetDeviceListRequest)) {
    throw new Error('Expected argument of type gsdk.connect.GetDeviceListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_GetDeviceListRequest(buffer_arg) {
  return connect_pb.GetDeviceListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_GetDeviceListResponse(arg) {
  if (!(arg instanceof connect_pb.GetDeviceListResponse)) {
    throw new Error('Expected argument of type gsdk.connect.GetDeviceListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_GetDeviceListResponse(buffer_arg) {
  return connect_pb.GetDeviceListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_GetPendingListRequest(arg) {
  if (!(arg instanceof connect_pb.GetPendingListRequest)) {
    throw new Error('Expected argument of type gsdk.connect.GetPendingListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_GetPendingListRequest(buffer_arg) {
  return connect_pb.GetPendingListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_GetPendingListResponse(arg) {
  if (!(arg instanceof connect_pb.GetPendingListResponse)) {
    throw new Error('Expected argument of type gsdk.connect.GetPendingListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_GetPendingListResponse(buffer_arg) {
  return connect_pb.GetPendingListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_GetSlaveDeviceRequest(arg) {
  if (!(arg instanceof connect_pb.GetSlaveDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.connect.GetSlaveDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_GetSlaveDeviceRequest(buffer_arg) {
  return connect_pb.GetSlaveDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_GetSlaveDeviceResponse(arg) {
  if (!(arg instanceof connect_pb.GetSlaveDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.connect.GetSlaveDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_GetSlaveDeviceResponse(buffer_arg) {
  return connect_pb.GetSlaveDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SearchDeviceRequest(arg) {
  if (!(arg instanceof connect_pb.SearchDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.connect.SearchDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SearchDeviceRequest(buffer_arg) {
  return connect_pb.SearchDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SearchDeviceResponse(arg) {
  if (!(arg instanceof connect_pb.SearchDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.connect.SearchDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SearchDeviceResponse(buffer_arg) {
  return connect_pb.SearchDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SetAcceptFilterRequest(arg) {
  if (!(arg instanceof connect_pb.SetAcceptFilterRequest)) {
    throw new Error('Expected argument of type gsdk.connect.SetAcceptFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SetAcceptFilterRequest(buffer_arg) {
  return connect_pb.SetAcceptFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SetAcceptFilterResponse(arg) {
  if (!(arg instanceof connect_pb.SetAcceptFilterResponse)) {
    throw new Error('Expected argument of type gsdk.connect.SetAcceptFilterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SetAcceptFilterResponse(buffer_arg) {
  return connect_pb.SetAcceptFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SetConnectionModeMultiRequest(arg) {
  if (!(arg instanceof connect_pb.SetConnectionModeMultiRequest)) {
    throw new Error('Expected argument of type gsdk.connect.SetConnectionModeMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SetConnectionModeMultiRequest(buffer_arg) {
  return connect_pb.SetConnectionModeMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SetConnectionModeMultiResponse(arg) {
  if (!(arg instanceof connect_pb.SetConnectionModeMultiResponse)) {
    throw new Error('Expected argument of type gsdk.connect.SetConnectionModeMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SetConnectionModeMultiResponse(buffer_arg) {
  return connect_pb.SetConnectionModeMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SetConnectionModeRequest(arg) {
  if (!(arg instanceof connect_pb.SetConnectionModeRequest)) {
    throw new Error('Expected argument of type gsdk.connect.SetConnectionModeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SetConnectionModeRequest(buffer_arg) {
  return connect_pb.SetConnectionModeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SetConnectionModeResponse(arg) {
  if (!(arg instanceof connect_pb.SetConnectionModeResponse)) {
    throw new Error('Expected argument of type gsdk.connect.SetConnectionModeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SetConnectionModeResponse(buffer_arg) {
  return connect_pb.SetConnectionModeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SetSlaveDeviceRequest(arg) {
  if (!(arg instanceof connect_pb.SetSlaveDeviceRequest)) {
    throw new Error('Expected argument of type gsdk.connect.SetSlaveDeviceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SetSlaveDeviceRequest(buffer_arg) {
  return connect_pb.SetSlaveDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SetSlaveDeviceResponse(arg) {
  if (!(arg instanceof connect_pb.SetSlaveDeviceResponse)) {
    throw new Error('Expected argument of type gsdk.connect.SetSlaveDeviceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SetSlaveDeviceResponse(buffer_arg) {
  return connect_pb.SetSlaveDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_StatusChange(arg) {
  if (!(arg instanceof connect_pb.StatusChange)) {
    throw new Error('Expected argument of type gsdk.connect.StatusChange');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_StatusChange(buffer_arg) {
  return connect_pb.StatusChange.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_connect_SubscribeStatusRequest(arg) {
  if (!(arg instanceof connect_pb.SubscribeStatusRequest)) {
    throw new Error('Expected argument of type gsdk.connect.SubscribeStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_connect_SubscribeStatusRequest(buffer_arg) {
  return connect_pb.SubscribeStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ConnectService = exports.ConnectService = {
  connect: {
    path: '/gsdk.connect.Connect/Connect',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.ConnectRequest,
    responseType: connect_pb.ConnectResponse,
    requestSerialize: serialize_gsdk_connect_ConnectRequest,
    requestDeserialize: deserialize_gsdk_connect_ConnectRequest,
    responseSerialize: serialize_gsdk_connect_ConnectResponse,
    responseDeserialize: deserialize_gsdk_connect_ConnectResponse,
  },
  addAsyncConnection: {
    path: '/gsdk.connect.Connect/AddAsyncConnection',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.AddAsyncConnectionRequest,
    responseType: connect_pb.AddAsyncConnectionResponse,
    requestSerialize: serialize_gsdk_connect_AddAsyncConnectionRequest,
    requestDeserialize: deserialize_gsdk_connect_AddAsyncConnectionRequest,
    responseSerialize: serialize_gsdk_connect_AddAsyncConnectionResponse,
    responseDeserialize: deserialize_gsdk_connect_AddAsyncConnectionResponse,
  },
  deleteAsyncConnection: {
    path: '/gsdk.connect.Connect/DeleteAsyncConnection',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.DeleteAsyncConnectionRequest,
    responseType: connect_pb.DeleteAsyncConnectionResponse,
    requestSerialize: serialize_gsdk_connect_DeleteAsyncConnectionRequest,
    requestDeserialize: deserialize_gsdk_connect_DeleteAsyncConnectionRequest,
    responseSerialize: serialize_gsdk_connect_DeleteAsyncConnectionResponse,
    responseDeserialize: deserialize_gsdk_connect_DeleteAsyncConnectionResponse,
  },
  setAcceptFilter: {
    path: '/gsdk.connect.Connect/SetAcceptFilter',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.SetAcceptFilterRequest,
    responseType: connect_pb.SetAcceptFilterResponse,
    requestSerialize: serialize_gsdk_connect_SetAcceptFilterRequest,
    requestDeserialize: deserialize_gsdk_connect_SetAcceptFilterRequest,
    responseSerialize: serialize_gsdk_connect_SetAcceptFilterResponse,
    responseDeserialize: deserialize_gsdk_connect_SetAcceptFilterResponse,
  },
  getAcceptFilter: {
    path: '/gsdk.connect.Connect/GetAcceptFilter',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.GetAcceptFilterRequest,
    responseType: connect_pb.GetAcceptFilterResponse,
    requestSerialize: serialize_gsdk_connect_GetAcceptFilterRequest,
    requestDeserialize: deserialize_gsdk_connect_GetAcceptFilterRequest,
    responseSerialize: serialize_gsdk_connect_GetAcceptFilterResponse,
    responseDeserialize: deserialize_gsdk_connect_GetAcceptFilterResponse,
  },
  getPendingList: {
    path: '/gsdk.connect.Connect/GetPendingList',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.GetPendingListRequest,
    responseType: connect_pb.GetPendingListResponse,
    requestSerialize: serialize_gsdk_connect_GetPendingListRequest,
    requestDeserialize: deserialize_gsdk_connect_GetPendingListRequest,
    responseSerialize: serialize_gsdk_connect_GetPendingListResponse,
    responseDeserialize: deserialize_gsdk_connect_GetPendingListResponse,
  },
  getDeviceList: {
    path: '/gsdk.connect.Connect/GetDeviceList',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.GetDeviceListRequest,
    responseType: connect_pb.GetDeviceListResponse,
    requestSerialize: serialize_gsdk_connect_GetDeviceListRequest,
    requestDeserialize: deserialize_gsdk_connect_GetDeviceListRequest,
    responseSerialize: serialize_gsdk_connect_GetDeviceListResponse,
    responseDeserialize: deserialize_gsdk_connect_GetDeviceListResponse,
  },
  disconnect: {
    path: '/gsdk.connect.Connect/Disconnect',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.DisconnectRequest,
    responseType: connect_pb.DisconnectResponse,
    requestSerialize: serialize_gsdk_connect_DisconnectRequest,
    requestDeserialize: deserialize_gsdk_connect_DisconnectRequest,
    responseSerialize: serialize_gsdk_connect_DisconnectResponse,
    responseDeserialize: deserialize_gsdk_connect_DisconnectResponse,
  },
  disconnectAll: {
    path: '/gsdk.connect.Connect/DisconnectAll',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.DisconnectAllRequest,
    responseType: connect_pb.DisconnectAllResponse,
    requestSerialize: serialize_gsdk_connect_DisconnectAllRequest,
    requestDeserialize: deserialize_gsdk_connect_DisconnectAllRequest,
    responseSerialize: serialize_gsdk_connect_DisconnectAllResponse,
    responseDeserialize: deserialize_gsdk_connect_DisconnectAllResponse,
  },
  searchDevice: {
    path: '/gsdk.connect.Connect/SearchDevice',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.SearchDeviceRequest,
    responseType: connect_pb.SearchDeviceResponse,
    requestSerialize: serialize_gsdk_connect_SearchDeviceRequest,
    requestDeserialize: deserialize_gsdk_connect_SearchDeviceRequest,
    responseSerialize: serialize_gsdk_connect_SearchDeviceResponse,
    responseDeserialize: deserialize_gsdk_connect_SearchDeviceResponse,
  },
  getSlaveDevice: {
    path: '/gsdk.connect.Connect/GetSlaveDevice',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.GetSlaveDeviceRequest,
    responseType: connect_pb.GetSlaveDeviceResponse,
    requestSerialize: serialize_gsdk_connect_GetSlaveDeviceRequest,
    requestDeserialize: deserialize_gsdk_connect_GetSlaveDeviceRequest,
    responseSerialize: serialize_gsdk_connect_GetSlaveDeviceResponse,
    responseDeserialize: deserialize_gsdk_connect_GetSlaveDeviceResponse,
  },
  setSlaveDevice: {
    path: '/gsdk.connect.Connect/SetSlaveDevice',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.SetSlaveDeviceRequest,
    responseType: connect_pb.SetSlaveDeviceResponse,
    requestSerialize: serialize_gsdk_connect_SetSlaveDeviceRequest,
    requestDeserialize: deserialize_gsdk_connect_SetSlaveDeviceRequest,
    responseSerialize: serialize_gsdk_connect_SetSlaveDeviceResponse,
    responseDeserialize: deserialize_gsdk_connect_SetSlaveDeviceResponse,
  },
  setConnectionMode: {
    path: '/gsdk.connect.Connect/SetConnectionMode',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.SetConnectionModeRequest,
    responseType: connect_pb.SetConnectionModeResponse,
    requestSerialize: serialize_gsdk_connect_SetConnectionModeRequest,
    requestDeserialize: deserialize_gsdk_connect_SetConnectionModeRequest,
    responseSerialize: serialize_gsdk_connect_SetConnectionModeResponse,
    responseDeserialize: deserialize_gsdk_connect_SetConnectionModeResponse,
  },
  setConnectionModeMulti: {
    path: '/gsdk.connect.Connect/SetConnectionModeMulti',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.SetConnectionModeMultiRequest,
    responseType: connect_pb.SetConnectionModeMultiResponse,
    requestSerialize: serialize_gsdk_connect_SetConnectionModeMultiRequest,
    requestDeserialize: deserialize_gsdk_connect_SetConnectionModeMultiRequest,
    responseSerialize: serialize_gsdk_connect_SetConnectionModeMultiResponse,
    responseDeserialize: deserialize_gsdk_connect_SetConnectionModeMultiResponse,
  },
  enableSSL: {
    path: '/gsdk.connect.Connect/EnableSSL',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.EnableSSLRequest,
    responseType: connect_pb.EnableSSLResponse,
    requestSerialize: serialize_gsdk_connect_EnableSSLRequest,
    requestDeserialize: deserialize_gsdk_connect_EnableSSLRequest,
    responseSerialize: serialize_gsdk_connect_EnableSSLResponse,
    responseDeserialize: deserialize_gsdk_connect_EnableSSLResponse,
  },
  enableSSLMulti: {
    path: '/gsdk.connect.Connect/EnableSSLMulti',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.EnableSSLMultiRequest,
    responseType: connect_pb.EnableSSLMultiResponse,
    requestSerialize: serialize_gsdk_connect_EnableSSLMultiRequest,
    requestDeserialize: deserialize_gsdk_connect_EnableSSLMultiRequest,
    responseSerialize: serialize_gsdk_connect_EnableSSLMultiResponse,
    responseDeserialize: deserialize_gsdk_connect_EnableSSLMultiResponse,
  },
  disableSSL: {
    path: '/gsdk.connect.Connect/DisableSSL',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.DisableSSLRequest,
    responseType: connect_pb.DisableSSLResponse,
    requestSerialize: serialize_gsdk_connect_DisableSSLRequest,
    requestDeserialize: deserialize_gsdk_connect_DisableSSLRequest,
    responseSerialize: serialize_gsdk_connect_DisableSSLResponse,
    responseDeserialize: deserialize_gsdk_connect_DisableSSLResponse,
  },
  disableSSLMulti: {
    path: '/gsdk.connect.Connect/DisableSSLMulti',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.DisableSSLMultiRequest,
    responseType: connect_pb.DisableSSLMultiResponse,
    requestSerialize: serialize_gsdk_connect_DisableSSLMultiRequest,
    requestDeserialize: deserialize_gsdk_connect_DisableSSLMultiRequest,
    responseSerialize: serialize_gsdk_connect_DisableSSLMultiResponse,
    responseDeserialize: deserialize_gsdk_connect_DisableSSLMultiResponse,
  },
  subscribeStatus: {
    path: '/gsdk.connect.Connect/SubscribeStatus',
    requestStream: false,
    responseStream: true,
    requestType: connect_pb.SubscribeStatusRequest,
    responseType: connect_pb.StatusChange,
    requestSerialize: serialize_gsdk_connect_SubscribeStatusRequest,
    requestDeserialize: deserialize_gsdk_connect_SubscribeStatusRequest,
    responseSerialize: serialize_gsdk_connect_StatusChange,
    responseDeserialize: deserialize_gsdk_connect_StatusChange,
  },
};

exports.ConnectClient = grpc.makeGenericClientConstructor(ConnectService, 'Connect');
