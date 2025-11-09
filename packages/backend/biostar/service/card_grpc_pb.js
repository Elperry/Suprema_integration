// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var card_pb = require('./card_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_card_AddBlacklistMultiRequest(arg) {
  if (!(arg instanceof card_pb.AddBlacklistMultiRequest)) {
    throw new Error('Expected argument of type gsdk.card.AddBlacklistMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_AddBlacklistMultiRequest(buffer_arg) {
  return card_pb.AddBlacklistMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_AddBlacklistMultiResponse(arg) {
  if (!(arg instanceof card_pb.AddBlacklistMultiResponse)) {
    throw new Error('Expected argument of type gsdk.card.AddBlacklistMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_AddBlacklistMultiResponse(buffer_arg) {
  return card_pb.AddBlacklistMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_AddBlacklistRequest(arg) {
  if (!(arg instanceof card_pb.AddBlacklistRequest)) {
    throw new Error('Expected argument of type gsdk.card.AddBlacklistRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_AddBlacklistRequest(buffer_arg) {
  return card_pb.AddBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_AddBlacklistResponse(arg) {
  if (!(arg instanceof card_pb.AddBlacklistResponse)) {
    throw new Error('Expected argument of type gsdk.card.AddBlacklistResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_AddBlacklistResponse(buffer_arg) {
  return card_pb.AddBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_DeleteAllBlacklistMultiRequest(arg) {
  if (!(arg instanceof card_pb.DeleteAllBlacklistMultiRequest)) {
    throw new Error('Expected argument of type gsdk.card.DeleteAllBlacklistMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_DeleteAllBlacklistMultiRequest(buffer_arg) {
  return card_pb.DeleteAllBlacklistMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_DeleteAllBlacklistMultiResponse(arg) {
  if (!(arg instanceof card_pb.DeleteAllBlacklistMultiResponse)) {
    throw new Error('Expected argument of type gsdk.card.DeleteAllBlacklistMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_DeleteAllBlacklistMultiResponse(buffer_arg) {
  return card_pb.DeleteAllBlacklistMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_DeleteAllBlacklistRequest(arg) {
  if (!(arg instanceof card_pb.DeleteAllBlacklistRequest)) {
    throw new Error('Expected argument of type gsdk.card.DeleteAllBlacklistRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_DeleteAllBlacklistRequest(buffer_arg) {
  return card_pb.DeleteAllBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_DeleteAllBlacklistResponse(arg) {
  if (!(arg instanceof card_pb.DeleteAllBlacklistResponse)) {
    throw new Error('Expected argument of type gsdk.card.DeleteAllBlacklistResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_DeleteAllBlacklistResponse(buffer_arg) {
  return card_pb.DeleteAllBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_DeleteBlacklistMultiRequest(arg) {
  if (!(arg instanceof card_pb.DeleteBlacklistMultiRequest)) {
    throw new Error('Expected argument of type gsdk.card.DeleteBlacklistMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_DeleteBlacklistMultiRequest(buffer_arg) {
  return card_pb.DeleteBlacklistMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_DeleteBlacklistMultiResponse(arg) {
  if (!(arg instanceof card_pb.DeleteBlacklistMultiResponse)) {
    throw new Error('Expected argument of type gsdk.card.DeleteBlacklistMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_DeleteBlacklistMultiResponse(buffer_arg) {
  return card_pb.DeleteBlacklistMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_DeleteBlacklistRequest(arg) {
  if (!(arg instanceof card_pb.DeleteBlacklistRequest)) {
    throw new Error('Expected argument of type gsdk.card.DeleteBlacklistRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_DeleteBlacklistRequest(buffer_arg) {
  return card_pb.DeleteBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_DeleteBlacklistResponse(arg) {
  if (!(arg instanceof card_pb.DeleteBlacklistResponse)) {
    throw new Error('Expected argument of type gsdk.card.DeleteBlacklistResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_DeleteBlacklistResponse(buffer_arg) {
  return card_pb.DeleteBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_EraseRequest(arg) {
  if (!(arg instanceof card_pb.EraseRequest)) {
    throw new Error('Expected argument of type gsdk.card.EraseRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_EraseRequest(buffer_arg) {
  return card_pb.EraseRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_EraseResponse(arg) {
  if (!(arg instanceof card_pb.EraseResponse)) {
    throw new Error('Expected argument of type gsdk.card.EraseResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_EraseResponse(buffer_arg) {
  return card_pb.EraseResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_Get1XConfigRequest(arg) {
  if (!(arg instanceof card_pb.Get1XConfigRequest)) {
    throw new Error('Expected argument of type gsdk.card.Get1XConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_Get1XConfigRequest(buffer_arg) {
  return card_pb.Get1XConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_Get1XConfigResponse(arg) {
  if (!(arg instanceof card_pb.Get1XConfigResponse)) {
    throw new Error('Expected argument of type gsdk.card.Get1XConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_Get1XConfigResponse(buffer_arg) {
  return card_pb.Get1XConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_GetBlacklistRequest(arg) {
  if (!(arg instanceof card_pb.GetBlacklistRequest)) {
    throw new Error('Expected argument of type gsdk.card.GetBlacklistRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_GetBlacklistRequest(buffer_arg) {
  return card_pb.GetBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_GetBlacklistResponse(arg) {
  if (!(arg instanceof card_pb.GetBlacklistResponse)) {
    throw new Error('Expected argument of type gsdk.card.GetBlacklistResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_GetBlacklistResponse(buffer_arg) {
  return card_pb.GetBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_GetConfigRequest(arg) {
  if (!(arg instanceof card_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.card.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_GetConfigRequest(buffer_arg) {
  return card_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_GetConfigResponse(arg) {
  if (!(arg instanceof card_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.card.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_GetConfigResponse(buffer_arg) {
  return card_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_GetCustomConfigRequest(arg) {
  if (!(arg instanceof card_pb.GetCustomConfigRequest)) {
    throw new Error('Expected argument of type gsdk.card.GetCustomConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_GetCustomConfigRequest(buffer_arg) {
  return card_pb.GetCustomConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_GetCustomConfigResponse(arg) {
  if (!(arg instanceof card_pb.GetCustomConfigResponse)) {
    throw new Error('Expected argument of type gsdk.card.GetCustomConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_GetCustomConfigResponse(buffer_arg) {
  return card_pb.GetCustomConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_GetFacilityCodeConfigRequest(arg) {
  if (!(arg instanceof card_pb.GetFacilityCodeConfigRequest)) {
    throw new Error('Expected argument of type gsdk.card.GetFacilityCodeConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_GetFacilityCodeConfigRequest(buffer_arg) {
  return card_pb.GetFacilityCodeConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_GetFacilityCodeConfigResponse(arg) {
  if (!(arg instanceof card_pb.GetFacilityCodeConfigResponse)) {
    throw new Error('Expected argument of type gsdk.card.GetFacilityCodeConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_GetFacilityCodeConfigResponse(buffer_arg) {
  return card_pb.GetFacilityCodeConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_GetQRConfigRequest(arg) {
  if (!(arg instanceof card_pb.GetQRConfigRequest)) {
    throw new Error('Expected argument of type gsdk.card.GetQRConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_GetQRConfigRequest(buffer_arg) {
  return card_pb.GetQRConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_GetQRConfigResponse(arg) {
  if (!(arg instanceof card_pb.GetQRConfigResponse)) {
    throw new Error('Expected argument of type gsdk.card.GetQRConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_GetQRConfigResponse(buffer_arg) {
  return card_pb.GetQRConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_ScanRequest(arg) {
  if (!(arg instanceof card_pb.ScanRequest)) {
    throw new Error('Expected argument of type gsdk.card.ScanRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_ScanRequest(buffer_arg) {
  return card_pb.ScanRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_ScanResponse(arg) {
  if (!(arg instanceof card_pb.ScanResponse)) {
    throw new Error('Expected argument of type gsdk.card.ScanResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_ScanResponse(buffer_arg) {
  return card_pb.ScanResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_Set1XConfigMultiRequest(arg) {
  if (!(arg instanceof card_pb.Set1XConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.card.Set1XConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_Set1XConfigMultiRequest(buffer_arg) {
  return card_pb.Set1XConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_Set1XConfigMultiResponse(arg) {
  if (!(arg instanceof card_pb.Set1XConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.card.Set1XConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_Set1XConfigMultiResponse(buffer_arg) {
  return card_pb.Set1XConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_Set1XConfigRequest(arg) {
  if (!(arg instanceof card_pb.Set1XConfigRequest)) {
    throw new Error('Expected argument of type gsdk.card.Set1XConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_Set1XConfigRequest(buffer_arg) {
  return card_pb.Set1XConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_Set1XConfigResponse(arg) {
  if (!(arg instanceof card_pb.Set1XConfigResponse)) {
    throw new Error('Expected argument of type gsdk.card.Set1XConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_Set1XConfigResponse(buffer_arg) {
  return card_pb.Set1XConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetConfigMultiRequest(arg) {
  if (!(arg instanceof card_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.card.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetConfigMultiRequest(buffer_arg) {
  return card_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetConfigMultiResponse(arg) {
  if (!(arg instanceof card_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.card.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetConfigMultiResponse(buffer_arg) {
  return card_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetConfigRequest(arg) {
  if (!(arg instanceof card_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.card.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetConfigRequest(buffer_arg) {
  return card_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetConfigResponse(arg) {
  if (!(arg instanceof card_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.card.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetConfigResponse(buffer_arg) {
  return card_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetCustomConfigMultiRequest(arg) {
  if (!(arg instanceof card_pb.SetCustomConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.card.SetCustomConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetCustomConfigMultiRequest(buffer_arg) {
  return card_pb.SetCustomConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetCustomConfigMultiResponse(arg) {
  if (!(arg instanceof card_pb.SetCustomConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.card.SetCustomConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetCustomConfigMultiResponse(buffer_arg) {
  return card_pb.SetCustomConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetCustomConfigRequest(arg) {
  if (!(arg instanceof card_pb.SetCustomConfigRequest)) {
    throw new Error('Expected argument of type gsdk.card.SetCustomConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetCustomConfigRequest(buffer_arg) {
  return card_pb.SetCustomConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetCustomConfigResponse(arg) {
  if (!(arg instanceof card_pb.SetCustomConfigResponse)) {
    throw new Error('Expected argument of type gsdk.card.SetCustomConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetCustomConfigResponse(buffer_arg) {
  return card_pb.SetCustomConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetFacilityCodeConfigMultiRequest(arg) {
  if (!(arg instanceof card_pb.SetFacilityCodeConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.card.SetFacilityCodeConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetFacilityCodeConfigMultiRequest(buffer_arg) {
  return card_pb.SetFacilityCodeConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetFacilityCodeConfigMultiResponse(arg) {
  if (!(arg instanceof card_pb.SetFacilityCodeConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.card.SetFacilityCodeConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetFacilityCodeConfigMultiResponse(buffer_arg) {
  return card_pb.SetFacilityCodeConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetFacilityCodeConfigRequest(arg) {
  if (!(arg instanceof card_pb.SetFacilityCodeConfigRequest)) {
    throw new Error('Expected argument of type gsdk.card.SetFacilityCodeConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetFacilityCodeConfigRequest(buffer_arg) {
  return card_pb.SetFacilityCodeConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetFacilityCodeConfigResponse(arg) {
  if (!(arg instanceof card_pb.SetFacilityCodeConfigResponse)) {
    throw new Error('Expected argument of type gsdk.card.SetFacilityCodeConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetFacilityCodeConfigResponse(buffer_arg) {
  return card_pb.SetFacilityCodeConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetQRConfigMultiRequest(arg) {
  if (!(arg instanceof card_pb.SetQRConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.card.SetQRConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetQRConfigMultiRequest(buffer_arg) {
  return card_pb.SetQRConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetQRConfigMultiResponse(arg) {
  if (!(arg instanceof card_pb.SetQRConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.card.SetQRConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetQRConfigMultiResponse(buffer_arg) {
  return card_pb.SetQRConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetQRConfigRequest(arg) {
  if (!(arg instanceof card_pb.SetQRConfigRequest)) {
    throw new Error('Expected argument of type gsdk.card.SetQRConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetQRConfigRequest(buffer_arg) {
  return card_pb.SetQRConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_SetQRConfigResponse(arg) {
  if (!(arg instanceof card_pb.SetQRConfigResponse)) {
    throw new Error('Expected argument of type gsdk.card.SetQRConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_SetQRConfigResponse(buffer_arg) {
  return card_pb.SetQRConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_WriteQRCodeRequest(arg) {
  if (!(arg instanceof card_pb.WriteQRCodeRequest)) {
    throw new Error('Expected argument of type gsdk.card.WriteQRCodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_WriteQRCodeRequest(buffer_arg) {
  return card_pb.WriteQRCodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_WriteQRCodeResponse(arg) {
  if (!(arg instanceof card_pb.WriteQRCodeResponse)) {
    throw new Error('Expected argument of type gsdk.card.WriteQRCodeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_WriteQRCodeResponse(buffer_arg) {
  return card_pb.WriteQRCodeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_WriteRequest(arg) {
  if (!(arg instanceof card_pb.WriteRequest)) {
    throw new Error('Expected argument of type gsdk.card.WriteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_WriteRequest(buffer_arg) {
  return card_pb.WriteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_card_WriteResponse(arg) {
  if (!(arg instanceof card_pb.WriteResponse)) {
    throw new Error('Expected argument of type gsdk.card.WriteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_card_WriteResponse(buffer_arg) {
  return card_pb.WriteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CardService = exports.CardService = {
  scan: {
    path: '/gsdk.card.Card/Scan',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.ScanRequest,
    responseType: card_pb.ScanResponse,
    requestSerialize: serialize_gsdk_card_ScanRequest,
    requestDeserialize: deserialize_gsdk_card_ScanRequest,
    responseSerialize: serialize_gsdk_card_ScanResponse,
    responseDeserialize: deserialize_gsdk_card_ScanResponse,
  },
  erase: {
    path: '/gsdk.card.Card/Erase',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.EraseRequest,
    responseType: card_pb.EraseResponse,
    requestSerialize: serialize_gsdk_card_EraseRequest,
    requestDeserialize: deserialize_gsdk_card_EraseRequest,
    responseSerialize: serialize_gsdk_card_EraseResponse,
    responseDeserialize: deserialize_gsdk_card_EraseResponse,
  },
  write: {
    path: '/gsdk.card.Card/Write',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.WriteRequest,
    responseType: card_pb.WriteResponse,
    requestSerialize: serialize_gsdk_card_WriteRequest,
    requestDeserialize: deserialize_gsdk_card_WriteRequest,
    responseSerialize: serialize_gsdk_card_WriteResponse,
    responseDeserialize: deserialize_gsdk_card_WriteResponse,
  },
  getConfig: {
    path: '/gsdk.card.Card/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.GetConfigRequest,
    responseType: card_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_card_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_card_GetConfigRequest,
    responseSerialize: serialize_gsdk_card_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_card_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.card.Card/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.SetConfigRequest,
    responseType: card_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_card_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_card_SetConfigRequest,
    responseSerialize: serialize_gsdk_card_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_card_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.card.Card/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.SetConfigMultiRequest,
    responseType: card_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_card_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_card_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_card_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_card_SetConfigMultiResponse,
  },
  getBlacklist: {
    path: '/gsdk.card.Card/GetBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.GetBlacklistRequest,
    responseType: card_pb.GetBlacklistResponse,
    requestSerialize: serialize_gsdk_card_GetBlacklistRequest,
    requestDeserialize: deserialize_gsdk_card_GetBlacklistRequest,
    responseSerialize: serialize_gsdk_card_GetBlacklistResponse,
    responseDeserialize: deserialize_gsdk_card_GetBlacklistResponse,
  },
  addBlacklist: {
    path: '/gsdk.card.Card/AddBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.AddBlacklistRequest,
    responseType: card_pb.AddBlacklistResponse,
    requestSerialize: serialize_gsdk_card_AddBlacklistRequest,
    requestDeserialize: deserialize_gsdk_card_AddBlacklistRequest,
    responseSerialize: serialize_gsdk_card_AddBlacklistResponse,
    responseDeserialize: deserialize_gsdk_card_AddBlacklistResponse,
  },
  addBlacklistMulti: {
    path: '/gsdk.card.Card/AddBlacklistMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.AddBlacklistMultiRequest,
    responseType: card_pb.AddBlacklistMultiResponse,
    requestSerialize: serialize_gsdk_card_AddBlacklistMultiRequest,
    requestDeserialize: deserialize_gsdk_card_AddBlacklistMultiRequest,
    responseSerialize: serialize_gsdk_card_AddBlacklistMultiResponse,
    responseDeserialize: deserialize_gsdk_card_AddBlacklistMultiResponse,
  },
  deleteBlacklist: {
    path: '/gsdk.card.Card/DeleteBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.DeleteBlacklistRequest,
    responseType: card_pb.DeleteBlacklistResponse,
    requestSerialize: serialize_gsdk_card_DeleteBlacklistRequest,
    requestDeserialize: deserialize_gsdk_card_DeleteBlacklistRequest,
    responseSerialize: serialize_gsdk_card_DeleteBlacklistResponse,
    responseDeserialize: deserialize_gsdk_card_DeleteBlacklistResponse,
  },
  deleteBlacklistMulti: {
    path: '/gsdk.card.Card/DeleteBlacklistMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.DeleteBlacklistMultiRequest,
    responseType: card_pb.DeleteBlacklistMultiResponse,
    requestSerialize: serialize_gsdk_card_DeleteBlacklistMultiRequest,
    requestDeserialize: deserialize_gsdk_card_DeleteBlacklistMultiRequest,
    responseSerialize: serialize_gsdk_card_DeleteBlacklistMultiResponse,
    responseDeserialize: deserialize_gsdk_card_DeleteBlacklistMultiResponse,
  },
  deleteAllBlacklist: {
    path: '/gsdk.card.Card/DeleteAllBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.DeleteAllBlacklistRequest,
    responseType: card_pb.DeleteAllBlacklistResponse,
    requestSerialize: serialize_gsdk_card_DeleteAllBlacklistRequest,
    requestDeserialize: deserialize_gsdk_card_DeleteAllBlacklistRequest,
    responseSerialize: serialize_gsdk_card_DeleteAllBlacklistResponse,
    responseDeserialize: deserialize_gsdk_card_DeleteAllBlacklistResponse,
  },
  deleteAllBlacklistMulti: {
    path: '/gsdk.card.Card/DeleteAllBlacklistMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.DeleteAllBlacklistMultiRequest,
    responseType: card_pb.DeleteAllBlacklistMultiResponse,
    requestSerialize: serialize_gsdk_card_DeleteAllBlacklistMultiRequest,
    requestDeserialize: deserialize_gsdk_card_DeleteAllBlacklistMultiRequest,
    responseSerialize: serialize_gsdk_card_DeleteAllBlacklistMultiResponse,
    responseDeserialize: deserialize_gsdk_card_DeleteAllBlacklistMultiResponse,
  },
  get1XConfig: {
    path: '/gsdk.card.Card/Get1XConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.Get1XConfigRequest,
    responseType: card_pb.Get1XConfigResponse,
    requestSerialize: serialize_gsdk_card_Get1XConfigRequest,
    requestDeserialize: deserialize_gsdk_card_Get1XConfigRequest,
    responseSerialize: serialize_gsdk_card_Get1XConfigResponse,
    responseDeserialize: deserialize_gsdk_card_Get1XConfigResponse,
  },
  set1XConfig: {
    path: '/gsdk.card.Card/Set1XConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.Set1XConfigRequest,
    responseType: card_pb.Set1XConfigResponse,
    requestSerialize: serialize_gsdk_card_Set1XConfigRequest,
    requestDeserialize: deserialize_gsdk_card_Set1XConfigRequest,
    responseSerialize: serialize_gsdk_card_Set1XConfigResponse,
    responseDeserialize: deserialize_gsdk_card_Set1XConfigResponse,
  },
  set1XConfigMulti: {
    path: '/gsdk.card.Card/Set1XConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.Set1XConfigMultiRequest,
    responseType: card_pb.Set1XConfigMultiResponse,
    requestSerialize: serialize_gsdk_card_Set1XConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_card_Set1XConfigMultiRequest,
    responseSerialize: serialize_gsdk_card_Set1XConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_card_Set1XConfigMultiResponse,
  },
  writeQRCode: {
    path: '/gsdk.card.Card/WriteQRCode',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.WriteQRCodeRequest,
    responseType: card_pb.WriteQRCodeResponse,
    requestSerialize: serialize_gsdk_card_WriteQRCodeRequest,
    requestDeserialize: deserialize_gsdk_card_WriteQRCodeRequest,
    responseSerialize: serialize_gsdk_card_WriteQRCodeResponse,
    responseDeserialize: deserialize_gsdk_card_WriteQRCodeResponse,
  },
  getQRConfig: {
    path: '/gsdk.card.Card/GetQRConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.GetQRConfigRequest,
    responseType: card_pb.GetQRConfigResponse,
    requestSerialize: serialize_gsdk_card_GetQRConfigRequest,
    requestDeserialize: deserialize_gsdk_card_GetQRConfigRequest,
    responseSerialize: serialize_gsdk_card_GetQRConfigResponse,
    responseDeserialize: deserialize_gsdk_card_GetQRConfigResponse,
  },
  setQRConfig: {
    path: '/gsdk.card.Card/SetQRConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.SetQRConfigRequest,
    responseType: card_pb.SetQRConfigResponse,
    requestSerialize: serialize_gsdk_card_SetQRConfigRequest,
    requestDeserialize: deserialize_gsdk_card_SetQRConfigRequest,
    responseSerialize: serialize_gsdk_card_SetQRConfigResponse,
    responseDeserialize: deserialize_gsdk_card_SetQRConfigResponse,
  },
  setQRConfigMulti: {
    path: '/gsdk.card.Card/SetQRConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.SetQRConfigMultiRequest,
    responseType: card_pb.SetQRConfigMultiResponse,
    requestSerialize: serialize_gsdk_card_SetQRConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_card_SetQRConfigMultiRequest,
    responseSerialize: serialize_gsdk_card_SetQRConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_card_SetQRConfigMultiResponse,
  },
  getCustomConfig: {
    path: '/gsdk.card.Card/GetCustomConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.GetCustomConfigRequest,
    responseType: card_pb.GetCustomConfigResponse,
    requestSerialize: serialize_gsdk_card_GetCustomConfigRequest,
    requestDeserialize: deserialize_gsdk_card_GetCustomConfigRequest,
    responseSerialize: serialize_gsdk_card_GetCustomConfigResponse,
    responseDeserialize: deserialize_gsdk_card_GetCustomConfigResponse,
  },
  setCustomConfig: {
    path: '/gsdk.card.Card/SetCustomConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.SetCustomConfigRequest,
    responseType: card_pb.SetCustomConfigResponse,
    requestSerialize: serialize_gsdk_card_SetCustomConfigRequest,
    requestDeserialize: deserialize_gsdk_card_SetCustomConfigRequest,
    responseSerialize: serialize_gsdk_card_SetCustomConfigResponse,
    responseDeserialize: deserialize_gsdk_card_SetCustomConfigResponse,
  },
  setCustomConfigMulti: {
    path: '/gsdk.card.Card/SetCustomConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.SetCustomConfigMultiRequest,
    responseType: card_pb.SetCustomConfigMultiResponse,
    requestSerialize: serialize_gsdk_card_SetCustomConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_card_SetCustomConfigMultiRequest,
    responseSerialize: serialize_gsdk_card_SetCustomConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_card_SetCustomConfigMultiResponse,
  },
  getFacilityCodeConfig: {
    path: '/gsdk.card.Card/GetFacilityCodeConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.GetFacilityCodeConfigRequest,
    responseType: card_pb.GetFacilityCodeConfigResponse,
    requestSerialize: serialize_gsdk_card_GetFacilityCodeConfigRequest,
    requestDeserialize: deserialize_gsdk_card_GetFacilityCodeConfigRequest,
    responseSerialize: serialize_gsdk_card_GetFacilityCodeConfigResponse,
    responseDeserialize: deserialize_gsdk_card_GetFacilityCodeConfigResponse,
  },
  setFacilityCodeConfig: {
    path: '/gsdk.card.Card/SetFacilityCodeConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.SetFacilityCodeConfigRequest,
    responseType: card_pb.SetFacilityCodeConfigResponse,
    requestSerialize: serialize_gsdk_card_SetFacilityCodeConfigRequest,
    requestDeserialize: deserialize_gsdk_card_SetFacilityCodeConfigRequest,
    responseSerialize: serialize_gsdk_card_SetFacilityCodeConfigResponse,
    responseDeserialize: deserialize_gsdk_card_SetFacilityCodeConfigResponse,
  },
  setFacilityCodeConfigMulti: {
    path: '/gsdk.card.Card/SetFacilityCodeConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.SetFacilityCodeConfigMultiRequest,
    responseType: card_pb.SetFacilityCodeConfigMultiResponse,
    requestSerialize: serialize_gsdk_card_SetFacilityCodeConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_card_SetFacilityCodeConfigMultiRequest,
    responseSerialize: serialize_gsdk_card_SetFacilityCodeConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_card_SetFacilityCodeConfigMultiResponse,
  },
};

exports.CardClient = grpc.makeGenericClientConstructor(CardService, 'Card');
