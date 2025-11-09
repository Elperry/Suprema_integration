// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');
var card_pb = require('./card_pb.js');
var finger_pb = require('./finger_pb.js');
var face_pb = require('./face_pb.js');
var tna_pb = require('./tna_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_user_DeleteAllMultiRequest(arg) {
  if (!(arg instanceof user_pb.DeleteAllMultiRequest)) {
    throw new Error('Expected argument of type gsdk.user.DeleteAllMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_DeleteAllMultiRequest(buffer_arg) {
  return user_pb.DeleteAllMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_DeleteAllMultiResponse(arg) {
  if (!(arg instanceof user_pb.DeleteAllMultiResponse)) {
    throw new Error('Expected argument of type gsdk.user.DeleteAllMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_DeleteAllMultiResponse(buffer_arg) {
  return user_pb.DeleteAllMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_DeleteAllRequest(arg) {
  if (!(arg instanceof user_pb.DeleteAllRequest)) {
    throw new Error('Expected argument of type gsdk.user.DeleteAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_DeleteAllRequest(buffer_arg) {
  return user_pb.DeleteAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_DeleteAllResponse(arg) {
  if (!(arg instanceof user_pb.DeleteAllResponse)) {
    throw new Error('Expected argument of type gsdk.user.DeleteAllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_DeleteAllResponse(buffer_arg) {
  return user_pb.DeleteAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_DeleteMultiRequest(arg) {
  if (!(arg instanceof user_pb.DeleteMultiRequest)) {
    throw new Error('Expected argument of type gsdk.user.DeleteMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_DeleteMultiRequest(buffer_arg) {
  return user_pb.DeleteMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_DeleteMultiResponse(arg) {
  if (!(arg instanceof user_pb.DeleteMultiResponse)) {
    throw new Error('Expected argument of type gsdk.user.DeleteMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_DeleteMultiResponse(buffer_arg) {
  return user_pb.DeleteMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_DeleteRequest(arg) {
  if (!(arg instanceof user_pb.DeleteRequest)) {
    throw new Error('Expected argument of type gsdk.user.DeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_DeleteRequest(buffer_arg) {
  return user_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_DeleteResponse(arg) {
  if (!(arg instanceof user_pb.DeleteResponse)) {
    throw new Error('Expected argument of type gsdk.user.DeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_DeleteResponse(buffer_arg) {
  return user_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_EnrollMultiRequest(arg) {
  if (!(arg instanceof user_pb.EnrollMultiRequest)) {
    throw new Error('Expected argument of type gsdk.user.EnrollMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_EnrollMultiRequest(buffer_arg) {
  return user_pb.EnrollMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_EnrollMultiResponse(arg) {
  if (!(arg instanceof user_pb.EnrollMultiResponse)) {
    throw new Error('Expected argument of type gsdk.user.EnrollMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_EnrollMultiResponse(buffer_arg) {
  return user_pb.EnrollMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_EnrollRequest(arg) {
  if (!(arg instanceof user_pb.EnrollRequest)) {
    throw new Error('Expected argument of type gsdk.user.EnrollRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_EnrollRequest(buffer_arg) {
  return user_pb.EnrollRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_EnrollResponse(arg) {
  if (!(arg instanceof user_pb.EnrollResponse)) {
    throw new Error('Expected argument of type gsdk.user.EnrollResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_EnrollResponse(buffer_arg) {
  return user_pb.EnrollResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetAccessGroupRequest(arg) {
  if (!(arg instanceof user_pb.GetAccessGroupRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetAccessGroupRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetAccessGroupRequest(buffer_arg) {
  return user_pb.GetAccessGroupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetAccessGroupResponse(arg) {
  if (!(arg instanceof user_pb.GetAccessGroupResponse)) {
    throw new Error('Expected argument of type gsdk.user.GetAccessGroupResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetAccessGroupResponse(buffer_arg) {
  return user_pb.GetAccessGroupResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetCardRequest(arg) {
  if (!(arg instanceof user_pb.GetCardRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetCardRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetCardRequest(buffer_arg) {
  return user_pb.GetCardRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetCardResponse(arg) {
  if (!(arg instanceof user_pb.GetCardResponse)) {
    throw new Error('Expected argument of type gsdk.user.GetCardResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetCardResponse(buffer_arg) {
  return user_pb.GetCardResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetFaceRequest(arg) {
  if (!(arg instanceof user_pb.GetFaceRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetFaceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetFaceRequest(buffer_arg) {
  return user_pb.GetFaceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetFaceResponse(arg) {
  if (!(arg instanceof user_pb.GetFaceResponse)) {
    throw new Error('Expected argument of type gsdk.user.GetFaceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetFaceResponse(buffer_arg) {
  return user_pb.GetFaceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetFingerRequest(arg) {
  if (!(arg instanceof user_pb.GetFingerRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetFingerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetFingerRequest(buffer_arg) {
  return user_pb.GetFingerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetFingerResponse(arg) {
  if (!(arg instanceof user_pb.GetFingerResponse)) {
    throw new Error('Expected argument of type gsdk.user.GetFingerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetFingerResponse(buffer_arg) {
  return user_pb.GetFingerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetJobCodeRequest(arg) {
  if (!(arg instanceof user_pb.GetJobCodeRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetJobCodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetJobCodeRequest(buffer_arg) {
  return user_pb.GetJobCodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetJobCodeResponse(arg) {
  if (!(arg instanceof user_pb.GetJobCodeResponse)) {
    throw new Error('Expected argument of type gsdk.user.GetJobCodeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetJobCodeResponse(buffer_arg) {
  return user_pb.GetJobCodeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetListRequest(arg) {
  if (!(arg instanceof user_pb.GetListRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetListRequest(buffer_arg) {
  return user_pb.GetListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetListResponse(arg) {
  if (!(arg instanceof user_pb.GetListResponse)) {
    throw new Error('Expected argument of type gsdk.user.GetListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetListResponse(buffer_arg) {
  return user_pb.GetListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetPINHashRequest(arg) {
  if (!(arg instanceof user_pb.GetPINHashRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetPINHashRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetPINHashRequest(buffer_arg) {
  return user_pb.GetPINHashRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetPINHashResponse(arg) {
  if (!(arg instanceof user_pb.GetPINHashResponse)) {
    throw new Error('Expected argument of type gsdk.user.GetPINHashResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetPINHashResponse(buffer_arg) {
  return user_pb.GetPINHashResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetPINHashWithKeyRequest(arg) {
  if (!(arg instanceof user_pb.GetPINHashWithKeyRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetPINHashWithKeyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetPINHashWithKeyRequest(buffer_arg) {
  return user_pb.GetPINHashWithKeyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetPartialRequest(arg) {
  if (!(arg instanceof user_pb.GetPartialRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetPartialRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetPartialRequest(buffer_arg) {
  return user_pb.GetPartialRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetPartialResponse(arg) {
  if (!(arg instanceof user_pb.GetPartialResponse)) {
    throw new Error('Expected argument of type gsdk.user.GetPartialResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetPartialResponse(buffer_arg) {
  return user_pb.GetPartialResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetRequest(arg) {
  if (!(arg instanceof user_pb.GetRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetRequest(buffer_arg) {
  return user_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetResponse(arg) {
  if (!(arg instanceof user_pb.GetResponse)) {
    throw new Error('Expected argument of type gsdk.user.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetResponse(buffer_arg) {
  return user_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetStatisticRequest(arg) {
  if (!(arg instanceof user_pb.GetStatisticRequest)) {
    throw new Error('Expected argument of type gsdk.user.GetStatisticRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetStatisticRequest(buffer_arg) {
  return user_pb.GetStatisticRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_GetStatisticResponse(arg) {
  if (!(arg instanceof user_pb.GetStatisticResponse)) {
    throw new Error('Expected argument of type gsdk.user.GetStatisticResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_GetStatisticResponse(buffer_arg) {
  return user_pb.GetStatisticResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetAccessGroupMultiRequest(arg) {
  if (!(arg instanceof user_pb.SetAccessGroupMultiRequest)) {
    throw new Error('Expected argument of type gsdk.user.SetAccessGroupMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetAccessGroupMultiRequest(buffer_arg) {
  return user_pb.SetAccessGroupMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetAccessGroupMultiResponse(arg) {
  if (!(arg instanceof user_pb.SetAccessGroupMultiResponse)) {
    throw new Error('Expected argument of type gsdk.user.SetAccessGroupMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetAccessGroupMultiResponse(buffer_arg) {
  return user_pb.SetAccessGroupMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetAccessGroupRequest(arg) {
  if (!(arg instanceof user_pb.SetAccessGroupRequest)) {
    throw new Error('Expected argument of type gsdk.user.SetAccessGroupRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetAccessGroupRequest(buffer_arg) {
  return user_pb.SetAccessGroupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetAccessGroupResponse(arg) {
  if (!(arg instanceof user_pb.SetAccessGroupResponse)) {
    throw new Error('Expected argument of type gsdk.user.SetAccessGroupResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetAccessGroupResponse(buffer_arg) {
  return user_pb.SetAccessGroupResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetCardMultiRequest(arg) {
  if (!(arg instanceof user_pb.SetCardMultiRequest)) {
    throw new Error('Expected argument of type gsdk.user.SetCardMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetCardMultiRequest(buffer_arg) {
  return user_pb.SetCardMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetCardMultiResponse(arg) {
  if (!(arg instanceof user_pb.SetCardMultiResponse)) {
    throw new Error('Expected argument of type gsdk.user.SetCardMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetCardMultiResponse(buffer_arg) {
  return user_pb.SetCardMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetCardRequest(arg) {
  if (!(arg instanceof user_pb.SetCardRequest)) {
    throw new Error('Expected argument of type gsdk.user.SetCardRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetCardRequest(buffer_arg) {
  return user_pb.SetCardRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetCardResponse(arg) {
  if (!(arg instanceof user_pb.SetCardResponse)) {
    throw new Error('Expected argument of type gsdk.user.SetCardResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetCardResponse(buffer_arg) {
  return user_pb.SetCardResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetFaceMultiRequest(arg) {
  if (!(arg instanceof user_pb.SetFaceMultiRequest)) {
    throw new Error('Expected argument of type gsdk.user.SetFaceMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetFaceMultiRequest(buffer_arg) {
  return user_pb.SetFaceMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetFaceMultiResponse(arg) {
  if (!(arg instanceof user_pb.SetFaceMultiResponse)) {
    throw new Error('Expected argument of type gsdk.user.SetFaceMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetFaceMultiResponse(buffer_arg) {
  return user_pb.SetFaceMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetFaceRequest(arg) {
  if (!(arg instanceof user_pb.SetFaceRequest)) {
    throw new Error('Expected argument of type gsdk.user.SetFaceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetFaceRequest(buffer_arg) {
  return user_pb.SetFaceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetFaceResponse(arg) {
  if (!(arg instanceof user_pb.SetFaceResponse)) {
    throw new Error('Expected argument of type gsdk.user.SetFaceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetFaceResponse(buffer_arg) {
  return user_pb.SetFaceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetFingerMultiRequest(arg) {
  if (!(arg instanceof user_pb.SetFingerMultiRequest)) {
    throw new Error('Expected argument of type gsdk.user.SetFingerMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetFingerMultiRequest(buffer_arg) {
  return user_pb.SetFingerMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetFingerMultiResponse(arg) {
  if (!(arg instanceof user_pb.SetFingerMultiResponse)) {
    throw new Error('Expected argument of type gsdk.user.SetFingerMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetFingerMultiResponse(buffer_arg) {
  return user_pb.SetFingerMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetFingerRequest(arg) {
  if (!(arg instanceof user_pb.SetFingerRequest)) {
    throw new Error('Expected argument of type gsdk.user.SetFingerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetFingerRequest(buffer_arg) {
  return user_pb.SetFingerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetFingerResponse(arg) {
  if (!(arg instanceof user_pb.SetFingerResponse)) {
    throw new Error('Expected argument of type gsdk.user.SetFingerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetFingerResponse(buffer_arg) {
  return user_pb.SetFingerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetJobCodeMultiRequest(arg) {
  if (!(arg instanceof user_pb.SetJobCodeMultiRequest)) {
    throw new Error('Expected argument of type gsdk.user.SetJobCodeMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetJobCodeMultiRequest(buffer_arg) {
  return user_pb.SetJobCodeMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetJobCodeMultiResponse(arg) {
  if (!(arg instanceof user_pb.SetJobCodeMultiResponse)) {
    throw new Error('Expected argument of type gsdk.user.SetJobCodeMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetJobCodeMultiResponse(buffer_arg) {
  return user_pb.SetJobCodeMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetJobCodeRequest(arg) {
  if (!(arg instanceof user_pb.SetJobCodeRequest)) {
    throw new Error('Expected argument of type gsdk.user.SetJobCodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetJobCodeRequest(buffer_arg) {
  return user_pb.SetJobCodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_SetJobCodeResponse(arg) {
  if (!(arg instanceof user_pb.SetJobCodeResponse)) {
    throw new Error('Expected argument of type gsdk.user.SetJobCodeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_SetJobCodeResponse(buffer_arg) {
  return user_pb.SetJobCodeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_UpdateMultiRequest(arg) {
  if (!(arg instanceof user_pb.UpdateMultiRequest)) {
    throw new Error('Expected argument of type gsdk.user.UpdateMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_UpdateMultiRequest(buffer_arg) {
  return user_pb.UpdateMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_UpdateMultiResponse(arg) {
  if (!(arg instanceof user_pb.UpdateMultiResponse)) {
    throw new Error('Expected argument of type gsdk.user.UpdateMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_UpdateMultiResponse(buffer_arg) {
  return user_pb.UpdateMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_UpdateRequest(arg) {
  if (!(arg instanceof user_pb.UpdateRequest)) {
    throw new Error('Expected argument of type gsdk.user.UpdateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_UpdateRequest(buffer_arg) {
  return user_pb.UpdateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_user_UpdateResponse(arg) {
  if (!(arg instanceof user_pb.UpdateResponse)) {
    throw new Error('Expected argument of type gsdk.user.UpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_user_UpdateResponse(buffer_arg) {
  return user_pb.UpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserService = exports.UserService = {
  getList: {
    path: '/gsdk.user.User/GetList',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetListRequest,
    responseType: user_pb.GetListResponse,
    requestSerialize: serialize_gsdk_user_GetListRequest,
    requestDeserialize: deserialize_gsdk_user_GetListRequest,
    responseSerialize: serialize_gsdk_user_GetListResponse,
    responseDeserialize: deserialize_gsdk_user_GetListResponse,
  },
  get: {
    path: '/gsdk.user.User/Get',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetRequest,
    responseType: user_pb.GetResponse,
    requestSerialize: serialize_gsdk_user_GetRequest,
    requestDeserialize: deserialize_gsdk_user_GetRequest,
    responseSerialize: serialize_gsdk_user_GetResponse,
    responseDeserialize: deserialize_gsdk_user_GetResponse,
  },
  getPartial: {
    path: '/gsdk.user.User/GetPartial',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetPartialRequest,
    responseType: user_pb.GetPartialResponse,
    requestSerialize: serialize_gsdk_user_GetPartialRequest,
    requestDeserialize: deserialize_gsdk_user_GetPartialRequest,
    responseSerialize: serialize_gsdk_user_GetPartialResponse,
    responseDeserialize: deserialize_gsdk_user_GetPartialResponse,
  },
  enroll: {
    path: '/gsdk.user.User/Enroll',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.EnrollRequest,
    responseType: user_pb.EnrollResponse,
    requestSerialize: serialize_gsdk_user_EnrollRequest,
    requestDeserialize: deserialize_gsdk_user_EnrollRequest,
    responseSerialize: serialize_gsdk_user_EnrollResponse,
    responseDeserialize: deserialize_gsdk_user_EnrollResponse,
  },
  enrollMulti: {
    path: '/gsdk.user.User/EnrollMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.EnrollMultiRequest,
    responseType: user_pb.EnrollMultiResponse,
    requestSerialize: serialize_gsdk_user_EnrollMultiRequest,
    requestDeserialize: deserialize_gsdk_user_EnrollMultiRequest,
    responseSerialize: serialize_gsdk_user_EnrollMultiResponse,
    responseDeserialize: deserialize_gsdk_user_EnrollMultiResponse,
  },
  update: {
    path: '/gsdk.user.User/Update',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UpdateRequest,
    responseType: user_pb.UpdateResponse,
    requestSerialize: serialize_gsdk_user_UpdateRequest,
    requestDeserialize: deserialize_gsdk_user_UpdateRequest,
    responseSerialize: serialize_gsdk_user_UpdateResponse,
    responseDeserialize: deserialize_gsdk_user_UpdateResponse,
  },
  updateMulti: {
    path: '/gsdk.user.User/UpdateMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UpdateMultiRequest,
    responseType: user_pb.UpdateMultiResponse,
    requestSerialize: serialize_gsdk_user_UpdateMultiRequest,
    requestDeserialize: deserialize_gsdk_user_UpdateMultiRequest,
    responseSerialize: serialize_gsdk_user_UpdateMultiResponse,
    responseDeserialize: deserialize_gsdk_user_UpdateMultiResponse,
  },
  delete: {
    path: '/gsdk.user.User/Delete',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.DeleteRequest,
    responseType: user_pb.DeleteResponse,
    requestSerialize: serialize_gsdk_user_DeleteRequest,
    requestDeserialize: deserialize_gsdk_user_DeleteRequest,
    responseSerialize: serialize_gsdk_user_DeleteResponse,
    responseDeserialize: deserialize_gsdk_user_DeleteResponse,
  },
  deleteMulti: {
    path: '/gsdk.user.User/DeleteMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.DeleteMultiRequest,
    responseType: user_pb.DeleteMultiResponse,
    requestSerialize: serialize_gsdk_user_DeleteMultiRequest,
    requestDeserialize: deserialize_gsdk_user_DeleteMultiRequest,
    responseSerialize: serialize_gsdk_user_DeleteMultiResponse,
    responseDeserialize: deserialize_gsdk_user_DeleteMultiResponse,
  },
  deleteAll: {
    path: '/gsdk.user.User/DeleteAll',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.DeleteAllRequest,
    responseType: user_pb.DeleteAllResponse,
    requestSerialize: serialize_gsdk_user_DeleteAllRequest,
    requestDeserialize: deserialize_gsdk_user_DeleteAllRequest,
    responseSerialize: serialize_gsdk_user_DeleteAllResponse,
    responseDeserialize: deserialize_gsdk_user_DeleteAllResponse,
  },
  deleteAllMulti: {
    path: '/gsdk.user.User/DeleteAllMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.DeleteAllMultiRequest,
    responseType: user_pb.DeleteAllMultiResponse,
    requestSerialize: serialize_gsdk_user_DeleteAllMultiRequest,
    requestDeserialize: deserialize_gsdk_user_DeleteAllMultiRequest,
    responseSerialize: serialize_gsdk_user_DeleteAllMultiResponse,
    responseDeserialize: deserialize_gsdk_user_DeleteAllMultiResponse,
  },
  getCard: {
    path: '/gsdk.user.User/GetCard',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetCardRequest,
    responseType: user_pb.GetCardResponse,
    requestSerialize: serialize_gsdk_user_GetCardRequest,
    requestDeserialize: deserialize_gsdk_user_GetCardRequest,
    responseSerialize: serialize_gsdk_user_GetCardResponse,
    responseDeserialize: deserialize_gsdk_user_GetCardResponse,
  },
  setCard: {
    path: '/gsdk.user.User/SetCard',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetCardRequest,
    responseType: user_pb.SetCardResponse,
    requestSerialize: serialize_gsdk_user_SetCardRequest,
    requestDeserialize: deserialize_gsdk_user_SetCardRequest,
    responseSerialize: serialize_gsdk_user_SetCardResponse,
    responseDeserialize: deserialize_gsdk_user_SetCardResponse,
  },
  setCardMulti: {
    path: '/gsdk.user.User/SetCardMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetCardMultiRequest,
    responseType: user_pb.SetCardMultiResponse,
    requestSerialize: serialize_gsdk_user_SetCardMultiRequest,
    requestDeserialize: deserialize_gsdk_user_SetCardMultiRequest,
    responseSerialize: serialize_gsdk_user_SetCardMultiResponse,
    responseDeserialize: deserialize_gsdk_user_SetCardMultiResponse,
  },
  getFinger: {
    path: '/gsdk.user.User/GetFinger',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetFingerRequest,
    responseType: user_pb.GetFingerResponse,
    requestSerialize: serialize_gsdk_user_GetFingerRequest,
    requestDeserialize: deserialize_gsdk_user_GetFingerRequest,
    responseSerialize: serialize_gsdk_user_GetFingerResponse,
    responseDeserialize: deserialize_gsdk_user_GetFingerResponse,
  },
  setFinger: {
    path: '/gsdk.user.User/SetFinger',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetFingerRequest,
    responseType: user_pb.SetFingerResponse,
    requestSerialize: serialize_gsdk_user_SetFingerRequest,
    requestDeserialize: deserialize_gsdk_user_SetFingerRequest,
    responseSerialize: serialize_gsdk_user_SetFingerResponse,
    responseDeserialize: deserialize_gsdk_user_SetFingerResponse,
  },
  setFingerMulti: {
    path: '/gsdk.user.User/SetFingerMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetFingerMultiRequest,
    responseType: user_pb.SetFingerMultiResponse,
    requestSerialize: serialize_gsdk_user_SetFingerMultiRequest,
    requestDeserialize: deserialize_gsdk_user_SetFingerMultiRequest,
    responseSerialize: serialize_gsdk_user_SetFingerMultiResponse,
    responseDeserialize: deserialize_gsdk_user_SetFingerMultiResponse,
  },
  getFace: {
    path: '/gsdk.user.User/GetFace',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetFaceRequest,
    responseType: user_pb.GetFaceResponse,
    requestSerialize: serialize_gsdk_user_GetFaceRequest,
    requestDeserialize: deserialize_gsdk_user_GetFaceRequest,
    responseSerialize: serialize_gsdk_user_GetFaceResponse,
    responseDeserialize: deserialize_gsdk_user_GetFaceResponse,
  },
  setFace: {
    path: '/gsdk.user.User/SetFace',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetFaceRequest,
    responseType: user_pb.SetFaceResponse,
    requestSerialize: serialize_gsdk_user_SetFaceRequest,
    requestDeserialize: deserialize_gsdk_user_SetFaceRequest,
    responseSerialize: serialize_gsdk_user_SetFaceResponse,
    responseDeserialize: deserialize_gsdk_user_SetFaceResponse,
  },
  setFaceMulti: {
    path: '/gsdk.user.User/SetFaceMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetFaceMultiRequest,
    responseType: user_pb.SetFaceMultiResponse,
    requestSerialize: serialize_gsdk_user_SetFaceMultiRequest,
    requestDeserialize: deserialize_gsdk_user_SetFaceMultiRequest,
    responseSerialize: serialize_gsdk_user_SetFaceMultiResponse,
    responseDeserialize: deserialize_gsdk_user_SetFaceMultiResponse,
  },
  getAccessGroup: {
    path: '/gsdk.user.User/GetAccessGroup',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetAccessGroupRequest,
    responseType: user_pb.GetAccessGroupResponse,
    requestSerialize: serialize_gsdk_user_GetAccessGroupRequest,
    requestDeserialize: deserialize_gsdk_user_GetAccessGroupRequest,
    responseSerialize: serialize_gsdk_user_GetAccessGroupResponse,
    responseDeserialize: deserialize_gsdk_user_GetAccessGroupResponse,
  },
  setAccessGroup: {
    path: '/gsdk.user.User/SetAccessGroup',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetAccessGroupRequest,
    responseType: user_pb.SetAccessGroupResponse,
    requestSerialize: serialize_gsdk_user_SetAccessGroupRequest,
    requestDeserialize: deserialize_gsdk_user_SetAccessGroupRequest,
    responseSerialize: serialize_gsdk_user_SetAccessGroupResponse,
    responseDeserialize: deserialize_gsdk_user_SetAccessGroupResponse,
  },
  setAccessGroupMulti: {
    path: '/gsdk.user.User/SetAccessGroupMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetAccessGroupMultiRequest,
    responseType: user_pb.SetAccessGroupMultiResponse,
    requestSerialize: serialize_gsdk_user_SetAccessGroupMultiRequest,
    requestDeserialize: deserialize_gsdk_user_SetAccessGroupMultiRequest,
    responseSerialize: serialize_gsdk_user_SetAccessGroupMultiResponse,
    responseDeserialize: deserialize_gsdk_user_SetAccessGroupMultiResponse,
  },
  getJobCode: {
    path: '/gsdk.user.User/GetJobCode',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetJobCodeRequest,
    responseType: user_pb.GetJobCodeResponse,
    requestSerialize: serialize_gsdk_user_GetJobCodeRequest,
    requestDeserialize: deserialize_gsdk_user_GetJobCodeRequest,
    responseSerialize: serialize_gsdk_user_GetJobCodeResponse,
    responseDeserialize: deserialize_gsdk_user_GetJobCodeResponse,
  },
  setJobCode: {
    path: '/gsdk.user.User/SetJobCode',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetJobCodeRequest,
    responseType: user_pb.SetJobCodeResponse,
    requestSerialize: serialize_gsdk_user_SetJobCodeRequest,
    requestDeserialize: deserialize_gsdk_user_SetJobCodeRequest,
    responseSerialize: serialize_gsdk_user_SetJobCodeResponse,
    responseDeserialize: deserialize_gsdk_user_SetJobCodeResponse,
  },
  setJobCodeMulti: {
    path: '/gsdk.user.User/SetJobCodeMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetJobCodeMultiRequest,
    responseType: user_pb.SetJobCodeMultiResponse,
    requestSerialize: serialize_gsdk_user_SetJobCodeMultiRequest,
    requestDeserialize: deserialize_gsdk_user_SetJobCodeMultiRequest,
    responseSerialize: serialize_gsdk_user_SetJobCodeMultiResponse,
    responseDeserialize: deserialize_gsdk_user_SetJobCodeMultiResponse,
  },
  getPINHash: {
    path: '/gsdk.user.User/GetPINHash',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetPINHashRequest,
    responseType: user_pb.GetPINHashResponse,
    requestSerialize: serialize_gsdk_user_GetPINHashRequest,
    requestDeserialize: deserialize_gsdk_user_GetPINHashRequest,
    responseSerialize: serialize_gsdk_user_GetPINHashResponse,
    responseDeserialize: deserialize_gsdk_user_GetPINHashResponse,
  },
  getPINHashWithKey: {
    path: '/gsdk.user.User/GetPINHashWithKey',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetPINHashWithKeyRequest,
    responseType: user_pb.GetPINHashResponse,
    requestSerialize: serialize_gsdk_user_GetPINHashWithKeyRequest,
    requestDeserialize: deserialize_gsdk_user_GetPINHashWithKeyRequest,
    responseSerialize: serialize_gsdk_user_GetPINHashResponse,
    responseDeserialize: deserialize_gsdk_user_GetPINHashResponse,
  },
  getStatistic: {
    path: '/gsdk.user.User/GetStatistic',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetStatisticRequest,
    responseType: user_pb.GetStatisticResponse,
    requestSerialize: serialize_gsdk_user_GetStatisticRequest,
    requestDeserialize: deserialize_gsdk_user_GetStatisticRequest,
    responseSerialize: serialize_gsdk_user_GetStatisticResponse,
    responseDeserialize: deserialize_gsdk_user_GetStatisticResponse,
  },
};

exports.UserClient = grpc.makeGenericClientConstructor(UserService, 'User');
