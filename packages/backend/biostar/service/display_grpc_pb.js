// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var display_pb = require('./display_pb.js');
var err_pb = require('./err_pb.js');

function serialize_gsdk_display_GetConfigRequest(arg) {
  if (!(arg instanceof display_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.display.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_GetConfigRequest(buffer_arg) {
  return display_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_GetConfigResponse(arg) {
  if (!(arg instanceof display_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.display.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_GetConfigResponse(buffer_arg) {
  return display_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_SetConfigMultiRequest(arg) {
  if (!(arg instanceof display_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type gsdk.display.SetConfigMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_SetConfigMultiRequest(buffer_arg) {
  return display_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_SetConfigMultiResponse(arg) {
  if (!(arg instanceof display_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type gsdk.display.SetConfigMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_SetConfigMultiResponse(buffer_arg) {
  return display_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_SetConfigRequest(arg) {
  if (!(arg instanceof display_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type gsdk.display.SetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_SetConfigRequest(buffer_arg) {
  return display_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_SetConfigResponse(arg) {
  if (!(arg instanceof display_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type gsdk.display.SetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_SetConfigResponse(buffer_arg) {
  return display_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateBackgroundImageMultiRequest(arg) {
  if (!(arg instanceof display_pb.UpdateBackgroundImageMultiRequest)) {
    throw new Error('Expected argument of type gsdk.display.UpdateBackgroundImageMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateBackgroundImageMultiRequest(buffer_arg) {
  return display_pb.UpdateBackgroundImageMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateBackgroundImageMultiResponse(arg) {
  if (!(arg instanceof display_pb.UpdateBackgroundImageMultiResponse)) {
    throw new Error('Expected argument of type gsdk.display.UpdateBackgroundImageMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateBackgroundImageMultiResponse(buffer_arg) {
  return display_pb.UpdateBackgroundImageMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateBackgroundImageRequest(arg) {
  if (!(arg instanceof display_pb.UpdateBackgroundImageRequest)) {
    throw new Error('Expected argument of type gsdk.display.UpdateBackgroundImageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateBackgroundImageRequest(buffer_arg) {
  return display_pb.UpdateBackgroundImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateBackgroundImageResponse(arg) {
  if (!(arg instanceof display_pb.UpdateBackgroundImageResponse)) {
    throw new Error('Expected argument of type gsdk.display.UpdateBackgroundImageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateBackgroundImageResponse(buffer_arg) {
  return display_pb.UpdateBackgroundImageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateLanguagePackMultiRequest(arg) {
  if (!(arg instanceof display_pb.UpdateLanguagePackMultiRequest)) {
    throw new Error('Expected argument of type gsdk.display.UpdateLanguagePackMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateLanguagePackMultiRequest(buffer_arg) {
  return display_pb.UpdateLanguagePackMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateLanguagePackMultiResponse(arg) {
  if (!(arg instanceof display_pb.UpdateLanguagePackMultiResponse)) {
    throw new Error('Expected argument of type gsdk.display.UpdateLanguagePackMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateLanguagePackMultiResponse(buffer_arg) {
  return display_pb.UpdateLanguagePackMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateLanguagePackRequest(arg) {
  if (!(arg instanceof display_pb.UpdateLanguagePackRequest)) {
    throw new Error('Expected argument of type gsdk.display.UpdateLanguagePackRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateLanguagePackRequest(buffer_arg) {
  return display_pb.UpdateLanguagePackRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateLanguagePackResponse(arg) {
  if (!(arg instanceof display_pb.UpdateLanguagePackResponse)) {
    throw new Error('Expected argument of type gsdk.display.UpdateLanguagePackResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateLanguagePackResponse(buffer_arg) {
  return display_pb.UpdateLanguagePackResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateNoticeMultiRequest(arg) {
  if (!(arg instanceof display_pb.UpdateNoticeMultiRequest)) {
    throw new Error('Expected argument of type gsdk.display.UpdateNoticeMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateNoticeMultiRequest(buffer_arg) {
  return display_pb.UpdateNoticeMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateNoticeMultiResponse(arg) {
  if (!(arg instanceof display_pb.UpdateNoticeMultiResponse)) {
    throw new Error('Expected argument of type gsdk.display.UpdateNoticeMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateNoticeMultiResponse(buffer_arg) {
  return display_pb.UpdateNoticeMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateNoticeRequest(arg) {
  if (!(arg instanceof display_pb.UpdateNoticeRequest)) {
    throw new Error('Expected argument of type gsdk.display.UpdateNoticeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateNoticeRequest(buffer_arg) {
  return display_pb.UpdateNoticeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateNoticeResponse(arg) {
  if (!(arg instanceof display_pb.UpdateNoticeResponse)) {
    throw new Error('Expected argument of type gsdk.display.UpdateNoticeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateNoticeResponse(buffer_arg) {
  return display_pb.UpdateNoticeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateSlideImagesMultiRequest(arg) {
  if (!(arg instanceof display_pb.UpdateSlideImagesMultiRequest)) {
    throw new Error('Expected argument of type gsdk.display.UpdateSlideImagesMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateSlideImagesMultiRequest(buffer_arg) {
  return display_pb.UpdateSlideImagesMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateSlideImagesMultiResponse(arg) {
  if (!(arg instanceof display_pb.UpdateSlideImagesMultiResponse)) {
    throw new Error('Expected argument of type gsdk.display.UpdateSlideImagesMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateSlideImagesMultiResponse(buffer_arg) {
  return display_pb.UpdateSlideImagesMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateSlideImagesRequest(arg) {
  if (!(arg instanceof display_pb.UpdateSlideImagesRequest)) {
    throw new Error('Expected argument of type gsdk.display.UpdateSlideImagesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateSlideImagesRequest(buffer_arg) {
  return display_pb.UpdateSlideImagesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateSlideImagesResponse(arg) {
  if (!(arg instanceof display_pb.UpdateSlideImagesResponse)) {
    throw new Error('Expected argument of type gsdk.display.UpdateSlideImagesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateSlideImagesResponse(buffer_arg) {
  return display_pb.UpdateSlideImagesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateSoundMultiRequest(arg) {
  if (!(arg instanceof display_pb.UpdateSoundMultiRequest)) {
    throw new Error('Expected argument of type gsdk.display.UpdateSoundMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateSoundMultiRequest(buffer_arg) {
  return display_pb.UpdateSoundMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateSoundMultiResponse(arg) {
  if (!(arg instanceof display_pb.UpdateSoundMultiResponse)) {
    throw new Error('Expected argument of type gsdk.display.UpdateSoundMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateSoundMultiResponse(buffer_arg) {
  return display_pb.UpdateSoundMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateSoundRequest(arg) {
  if (!(arg instanceof display_pb.UpdateSoundRequest)) {
    throw new Error('Expected argument of type gsdk.display.UpdateSoundRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateSoundRequest(buffer_arg) {
  return display_pb.UpdateSoundRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_display_UpdateSoundResponse(arg) {
  if (!(arg instanceof display_pb.UpdateSoundResponse)) {
    throw new Error('Expected argument of type gsdk.display.UpdateSoundResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_display_UpdateSoundResponse(buffer_arg) {
  return display_pb.UpdateSoundResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DisplayService = exports.DisplayService = {
  updateLanguagePack: {
    path: '/gsdk.display.Display/UpdateLanguagePack',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateLanguagePackRequest,
    responseType: display_pb.UpdateLanguagePackResponse,
    requestSerialize: serialize_gsdk_display_UpdateLanguagePackRequest,
    requestDeserialize: deserialize_gsdk_display_UpdateLanguagePackRequest,
    responseSerialize: serialize_gsdk_display_UpdateLanguagePackResponse,
    responseDeserialize: deserialize_gsdk_display_UpdateLanguagePackResponse,
  },
  updateLanguagePackMulti: {
    path: '/gsdk.display.Display/UpdateLanguagePackMulti',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateLanguagePackMultiRequest,
    responseType: display_pb.UpdateLanguagePackMultiResponse,
    requestSerialize: serialize_gsdk_display_UpdateLanguagePackMultiRequest,
    requestDeserialize: deserialize_gsdk_display_UpdateLanguagePackMultiRequest,
    responseSerialize: serialize_gsdk_display_UpdateLanguagePackMultiResponse,
    responseDeserialize: deserialize_gsdk_display_UpdateLanguagePackMultiResponse,
  },
  updateNotice: {
    path: '/gsdk.display.Display/UpdateNotice',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateNoticeRequest,
    responseType: display_pb.UpdateNoticeResponse,
    requestSerialize: serialize_gsdk_display_UpdateNoticeRequest,
    requestDeserialize: deserialize_gsdk_display_UpdateNoticeRequest,
    responseSerialize: serialize_gsdk_display_UpdateNoticeResponse,
    responseDeserialize: deserialize_gsdk_display_UpdateNoticeResponse,
  },
  updateNoticeMulti: {
    path: '/gsdk.display.Display/UpdateNoticeMulti',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateNoticeMultiRequest,
    responseType: display_pb.UpdateNoticeMultiResponse,
    requestSerialize: serialize_gsdk_display_UpdateNoticeMultiRequest,
    requestDeserialize: deserialize_gsdk_display_UpdateNoticeMultiRequest,
    responseSerialize: serialize_gsdk_display_UpdateNoticeMultiResponse,
    responseDeserialize: deserialize_gsdk_display_UpdateNoticeMultiResponse,
  },
  updateBackgroundImage: {
    path: '/gsdk.display.Display/UpdateBackgroundImage',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateBackgroundImageRequest,
    responseType: display_pb.UpdateBackgroundImageResponse,
    requestSerialize: serialize_gsdk_display_UpdateBackgroundImageRequest,
    requestDeserialize: deserialize_gsdk_display_UpdateBackgroundImageRequest,
    responseSerialize: serialize_gsdk_display_UpdateBackgroundImageResponse,
    responseDeserialize: deserialize_gsdk_display_UpdateBackgroundImageResponse,
  },
  updateBackgroundImageMulti: {
    path: '/gsdk.display.Display/UpdateBackgroundImageMulti',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateBackgroundImageMultiRequest,
    responseType: display_pb.UpdateBackgroundImageMultiResponse,
    requestSerialize: serialize_gsdk_display_UpdateBackgroundImageMultiRequest,
    requestDeserialize: deserialize_gsdk_display_UpdateBackgroundImageMultiRequest,
    responseSerialize: serialize_gsdk_display_UpdateBackgroundImageMultiResponse,
    responseDeserialize: deserialize_gsdk_display_UpdateBackgroundImageMultiResponse,
  },
  updateSlideImages: {
    path: '/gsdk.display.Display/UpdateSlideImages',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateSlideImagesRequest,
    responseType: display_pb.UpdateSlideImagesResponse,
    requestSerialize: serialize_gsdk_display_UpdateSlideImagesRequest,
    requestDeserialize: deserialize_gsdk_display_UpdateSlideImagesRequest,
    responseSerialize: serialize_gsdk_display_UpdateSlideImagesResponse,
    responseDeserialize: deserialize_gsdk_display_UpdateSlideImagesResponse,
  },
  updateSlideImagesMulti: {
    path: '/gsdk.display.Display/UpdateSlideImagesMulti',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateSlideImagesMultiRequest,
    responseType: display_pb.UpdateSlideImagesMultiResponse,
    requestSerialize: serialize_gsdk_display_UpdateSlideImagesMultiRequest,
    requestDeserialize: deserialize_gsdk_display_UpdateSlideImagesMultiRequest,
    responseSerialize: serialize_gsdk_display_UpdateSlideImagesMultiResponse,
    responseDeserialize: deserialize_gsdk_display_UpdateSlideImagesMultiResponse,
  },
  updateSound: {
    path: '/gsdk.display.Display/UpdateSound',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateSoundRequest,
    responseType: display_pb.UpdateSoundResponse,
    requestSerialize: serialize_gsdk_display_UpdateSoundRequest,
    requestDeserialize: deserialize_gsdk_display_UpdateSoundRequest,
    responseSerialize: serialize_gsdk_display_UpdateSoundResponse,
    responseDeserialize: deserialize_gsdk_display_UpdateSoundResponse,
  },
  updateSoundMulti: {
    path: '/gsdk.display.Display/UpdateSoundMulti',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateSoundMultiRequest,
    responseType: display_pb.UpdateSoundMultiResponse,
    requestSerialize: serialize_gsdk_display_UpdateSoundMultiRequest,
    requestDeserialize: deserialize_gsdk_display_UpdateSoundMultiRequest,
    responseSerialize: serialize_gsdk_display_UpdateSoundMultiResponse,
    responseDeserialize: deserialize_gsdk_display_UpdateSoundMultiResponse,
  },
  getConfig: {
    path: '/gsdk.display.Display/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.GetConfigRequest,
    responseType: display_pb.GetConfigResponse,
    requestSerialize: serialize_gsdk_display_GetConfigRequest,
    requestDeserialize: deserialize_gsdk_display_GetConfigRequest,
    responseSerialize: serialize_gsdk_display_GetConfigResponse,
    responseDeserialize: deserialize_gsdk_display_GetConfigResponse,
  },
  setConfig: {
    path: '/gsdk.display.Display/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.SetConfigRequest,
    responseType: display_pb.SetConfigResponse,
    requestSerialize: serialize_gsdk_display_SetConfigRequest,
    requestDeserialize: deserialize_gsdk_display_SetConfigRequest,
    responseSerialize: serialize_gsdk_display_SetConfigResponse,
    responseDeserialize: deserialize_gsdk_display_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/gsdk.display.Display/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.SetConfigMultiRequest,
    responseType: display_pb.SetConfigMultiResponse,
    requestSerialize: serialize_gsdk_display_SetConfigMultiRequest,
    requestDeserialize: deserialize_gsdk_display_SetConfigMultiRequest,
    responseSerialize: serialize_gsdk_display_SetConfigMultiResponse,
    responseDeserialize: deserialize_gsdk_display_SetConfigMultiResponse,
  },
};

exports.DisplayClient = grpc.makeGenericClientConstructor(DisplayService, 'Display');
