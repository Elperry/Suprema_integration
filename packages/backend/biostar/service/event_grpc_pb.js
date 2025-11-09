// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var event_pb = require('./event_pb.js');
var err_pb = require('./err_pb.js');
var tna_pb = require('./tna_pb.js');

function serialize_gsdk_event_ClearLogMultiRequest(arg) {
  if (!(arg instanceof event_pb.ClearLogMultiRequest)) {
    throw new Error('Expected argument of type gsdk.event.ClearLogMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_ClearLogMultiRequest(buffer_arg) {
  return event_pb.ClearLogMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_ClearLogMultiResponse(arg) {
  if (!(arg instanceof event_pb.ClearLogMultiResponse)) {
    throw new Error('Expected argument of type gsdk.event.ClearLogMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_ClearLogMultiResponse(buffer_arg) {
  return event_pb.ClearLogMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_ClearLogRequest(arg) {
  if (!(arg instanceof event_pb.ClearLogRequest)) {
    throw new Error('Expected argument of type gsdk.event.ClearLogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_ClearLogRequest(buffer_arg) {
  return event_pb.ClearLogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_ClearLogResponse(arg) {
  if (!(arg instanceof event_pb.ClearLogResponse)) {
    throw new Error('Expected argument of type gsdk.event.ClearLogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_ClearLogResponse(buffer_arg) {
  return event_pb.ClearLogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_DisableMonitoringMultiRequest(arg) {
  if (!(arg instanceof event_pb.DisableMonitoringMultiRequest)) {
    throw new Error('Expected argument of type gsdk.event.DisableMonitoringMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_DisableMonitoringMultiRequest(buffer_arg) {
  return event_pb.DisableMonitoringMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_DisableMonitoringMultiResponse(arg) {
  if (!(arg instanceof event_pb.DisableMonitoringMultiResponse)) {
    throw new Error('Expected argument of type gsdk.event.DisableMonitoringMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_DisableMonitoringMultiResponse(buffer_arg) {
  return event_pb.DisableMonitoringMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_DisableMonitoringRequest(arg) {
  if (!(arg instanceof event_pb.DisableMonitoringRequest)) {
    throw new Error('Expected argument of type gsdk.event.DisableMonitoringRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_DisableMonitoringRequest(buffer_arg) {
  return event_pb.DisableMonitoringRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_DisableMonitoringResponse(arg) {
  if (!(arg instanceof event_pb.DisableMonitoringResponse)) {
    throw new Error('Expected argument of type gsdk.event.DisableMonitoringResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_DisableMonitoringResponse(buffer_arg) {
  return event_pb.DisableMonitoringResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_EnableMonitoringMultiRequest(arg) {
  if (!(arg instanceof event_pb.EnableMonitoringMultiRequest)) {
    throw new Error('Expected argument of type gsdk.event.EnableMonitoringMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_EnableMonitoringMultiRequest(buffer_arg) {
  return event_pb.EnableMonitoringMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_EnableMonitoringMultiResponse(arg) {
  if (!(arg instanceof event_pb.EnableMonitoringMultiResponse)) {
    throw new Error('Expected argument of type gsdk.event.EnableMonitoringMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_EnableMonitoringMultiResponse(buffer_arg) {
  return event_pb.EnableMonitoringMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_EnableMonitoringRequest(arg) {
  if (!(arg instanceof event_pb.EnableMonitoringRequest)) {
    throw new Error('Expected argument of type gsdk.event.EnableMonitoringRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_EnableMonitoringRequest(buffer_arg) {
  return event_pb.EnableMonitoringRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_EnableMonitoringResponse(arg) {
  if (!(arg instanceof event_pb.EnableMonitoringResponse)) {
    throw new Error('Expected argument of type gsdk.event.EnableMonitoringResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_EnableMonitoringResponse(buffer_arg) {
  return event_pb.EnableMonitoringResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_EventLog(arg) {
  if (!(arg instanceof event_pb.EventLog)) {
    throw new Error('Expected argument of type gsdk.event.EventLog');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_EventLog(buffer_arg) {
  return event_pb.EventLog.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_GetImageFilterRequest(arg) {
  if (!(arg instanceof event_pb.GetImageFilterRequest)) {
    throw new Error('Expected argument of type gsdk.event.GetImageFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_GetImageFilterRequest(buffer_arg) {
  return event_pb.GetImageFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_GetImageFilterResponse(arg) {
  if (!(arg instanceof event_pb.GetImageFilterResponse)) {
    throw new Error('Expected argument of type gsdk.event.GetImageFilterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_GetImageFilterResponse(buffer_arg) {
  return event_pb.GetImageFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_GetImageLogRequest(arg) {
  if (!(arg instanceof event_pb.GetImageLogRequest)) {
    throw new Error('Expected argument of type gsdk.event.GetImageLogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_GetImageLogRequest(buffer_arg) {
  return event_pb.GetImageLogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_GetImageLogResponse(arg) {
  if (!(arg instanceof event_pb.GetImageLogResponse)) {
    throw new Error('Expected argument of type gsdk.event.GetImageLogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_GetImageLogResponse(buffer_arg) {
  return event_pb.GetImageLogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_GetLogRequest(arg) {
  if (!(arg instanceof event_pb.GetLogRequest)) {
    throw new Error('Expected argument of type gsdk.event.GetLogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_GetLogRequest(buffer_arg) {
  return event_pb.GetLogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_GetLogResponse(arg) {
  if (!(arg instanceof event_pb.GetLogResponse)) {
    throw new Error('Expected argument of type gsdk.event.GetLogResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_GetLogResponse(buffer_arg) {
  return event_pb.GetLogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_GetLogWithFilterRequest(arg) {
  if (!(arg instanceof event_pb.GetLogWithFilterRequest)) {
    throw new Error('Expected argument of type gsdk.event.GetLogWithFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_GetLogWithFilterRequest(buffer_arg) {
  return event_pb.GetLogWithFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_GetLogWithFilterResponse(arg) {
  if (!(arg instanceof event_pb.GetLogWithFilterResponse)) {
    throw new Error('Expected argument of type gsdk.event.GetLogWithFilterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_GetLogWithFilterResponse(buffer_arg) {
  return event_pb.GetLogWithFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_SetImageFilterMultiRequest(arg) {
  if (!(arg instanceof event_pb.SetImageFilterMultiRequest)) {
    throw new Error('Expected argument of type gsdk.event.SetImageFilterMultiRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_SetImageFilterMultiRequest(buffer_arg) {
  return event_pb.SetImageFilterMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_SetImageFilterMultiResponse(arg) {
  if (!(arg instanceof event_pb.SetImageFilterMultiResponse)) {
    throw new Error('Expected argument of type gsdk.event.SetImageFilterMultiResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_SetImageFilterMultiResponse(buffer_arg) {
  return event_pb.SetImageFilterMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_SetImageFilterRequest(arg) {
  if (!(arg instanceof event_pb.SetImageFilterRequest)) {
    throw new Error('Expected argument of type gsdk.event.SetImageFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_SetImageFilterRequest(buffer_arg) {
  return event_pb.SetImageFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_SetImageFilterResponse(arg) {
  if (!(arg instanceof event_pb.SetImageFilterResponse)) {
    throw new Error('Expected argument of type gsdk.event.SetImageFilterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_SetImageFilterResponse(buffer_arg) {
  return event_pb.SetImageFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gsdk_event_SubscribeRealtimeLogRequest(arg) {
  if (!(arg instanceof event_pb.SubscribeRealtimeLogRequest)) {
    throw new Error('Expected argument of type gsdk.event.SubscribeRealtimeLogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gsdk_event_SubscribeRealtimeLogRequest(buffer_arg) {
  return event_pb.SubscribeRealtimeLogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var EventService = exports.EventService = {
  enableMonitoring: {
    path: '/gsdk.event.Event/EnableMonitoring',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.EnableMonitoringRequest,
    responseType: event_pb.EnableMonitoringResponse,
    requestSerialize: serialize_gsdk_event_EnableMonitoringRequest,
    requestDeserialize: deserialize_gsdk_event_EnableMonitoringRequest,
    responseSerialize: serialize_gsdk_event_EnableMonitoringResponse,
    responseDeserialize: deserialize_gsdk_event_EnableMonitoringResponse,
  },
  enableMonitoringMulti: {
    path: '/gsdk.event.Event/EnableMonitoringMulti',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.EnableMonitoringMultiRequest,
    responseType: event_pb.EnableMonitoringMultiResponse,
    requestSerialize: serialize_gsdk_event_EnableMonitoringMultiRequest,
    requestDeserialize: deserialize_gsdk_event_EnableMonitoringMultiRequest,
    responseSerialize: serialize_gsdk_event_EnableMonitoringMultiResponse,
    responseDeserialize: deserialize_gsdk_event_EnableMonitoringMultiResponse,
  },
  disableMonitoring: {
    path: '/gsdk.event.Event/DisableMonitoring',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.DisableMonitoringRequest,
    responseType: event_pb.DisableMonitoringResponse,
    requestSerialize: serialize_gsdk_event_DisableMonitoringRequest,
    requestDeserialize: deserialize_gsdk_event_DisableMonitoringRequest,
    responseSerialize: serialize_gsdk_event_DisableMonitoringResponse,
    responseDeserialize: deserialize_gsdk_event_DisableMonitoringResponse,
  },
  disableMonitoringMulti: {
    path: '/gsdk.event.Event/DisableMonitoringMulti',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.DisableMonitoringMultiRequest,
    responseType: event_pb.DisableMonitoringMultiResponse,
    requestSerialize: serialize_gsdk_event_DisableMonitoringMultiRequest,
    requestDeserialize: deserialize_gsdk_event_DisableMonitoringMultiRequest,
    responseSerialize: serialize_gsdk_event_DisableMonitoringMultiResponse,
    responseDeserialize: deserialize_gsdk_event_DisableMonitoringMultiResponse,
  },
  subscribeRealtimeLog: {
    path: '/gsdk.event.Event/SubscribeRealtimeLog',
    requestStream: false,
    responseStream: true,
    requestType: event_pb.SubscribeRealtimeLogRequest,
    responseType: event_pb.EventLog,
    requestSerialize: serialize_gsdk_event_SubscribeRealtimeLogRequest,
    requestDeserialize: deserialize_gsdk_event_SubscribeRealtimeLogRequest,
    responseSerialize: serialize_gsdk_event_EventLog,
    responseDeserialize: deserialize_gsdk_event_EventLog,
  },
  getLog: {
    path: '/gsdk.event.Event/GetLog',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.GetLogRequest,
    responseType: event_pb.GetLogResponse,
    requestSerialize: serialize_gsdk_event_GetLogRequest,
    requestDeserialize: deserialize_gsdk_event_GetLogRequest,
    responseSerialize: serialize_gsdk_event_GetLogResponse,
    responseDeserialize: deserialize_gsdk_event_GetLogResponse,
  },
  getLogWithFilter: {
    path: '/gsdk.event.Event/GetLogWithFilter',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.GetLogWithFilterRequest,
    responseType: event_pb.GetLogWithFilterResponse,
    requestSerialize: serialize_gsdk_event_GetLogWithFilterRequest,
    requestDeserialize: deserialize_gsdk_event_GetLogWithFilterRequest,
    responseSerialize: serialize_gsdk_event_GetLogWithFilterResponse,
    responseDeserialize: deserialize_gsdk_event_GetLogWithFilterResponse,
  },
  getImageLog: {
    path: '/gsdk.event.Event/GetImageLog',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.GetImageLogRequest,
    responseType: event_pb.GetImageLogResponse,
    requestSerialize: serialize_gsdk_event_GetImageLogRequest,
    requestDeserialize: deserialize_gsdk_event_GetImageLogRequest,
    responseSerialize: serialize_gsdk_event_GetImageLogResponse,
    responseDeserialize: deserialize_gsdk_event_GetImageLogResponse,
  },
  getImageFilter: {
    path: '/gsdk.event.Event/GetImageFilter',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.GetImageFilterRequest,
    responseType: event_pb.GetImageFilterResponse,
    requestSerialize: serialize_gsdk_event_GetImageFilterRequest,
    requestDeserialize: deserialize_gsdk_event_GetImageFilterRequest,
    responseSerialize: serialize_gsdk_event_GetImageFilterResponse,
    responseDeserialize: deserialize_gsdk_event_GetImageFilterResponse,
  },
  setImageFilter: {
    path: '/gsdk.event.Event/SetImageFilter',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.SetImageFilterRequest,
    responseType: event_pb.SetImageFilterResponse,
    requestSerialize: serialize_gsdk_event_SetImageFilterRequest,
    requestDeserialize: deserialize_gsdk_event_SetImageFilterRequest,
    responseSerialize: serialize_gsdk_event_SetImageFilterResponse,
    responseDeserialize: deserialize_gsdk_event_SetImageFilterResponse,
  },
  setImageFilterMulti: {
    path: '/gsdk.event.Event/SetImageFilterMulti',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.SetImageFilterMultiRequest,
    responseType: event_pb.SetImageFilterMultiResponse,
    requestSerialize: serialize_gsdk_event_SetImageFilterMultiRequest,
    requestDeserialize: deserialize_gsdk_event_SetImageFilterMultiRequest,
    responseSerialize: serialize_gsdk_event_SetImageFilterMultiResponse,
    responseDeserialize: deserialize_gsdk_event_SetImageFilterMultiResponse,
  },
  clearLog: {
    path: '/gsdk.event.Event/ClearLog',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.ClearLogRequest,
    responseType: event_pb.ClearLogResponse,
    requestSerialize: serialize_gsdk_event_ClearLogRequest,
    requestDeserialize: deserialize_gsdk_event_ClearLogRequest,
    responseSerialize: serialize_gsdk_event_ClearLogResponse,
    responseDeserialize: deserialize_gsdk_event_ClearLogResponse,
  },
  clearLogMulti: {
    path: '/gsdk.event.Event/ClearLogMulti',
    requestStream: false,
    responseStream: false,
    requestType: event_pb.ClearLogMultiRequest,
    responseType: event_pb.ClearLogMultiResponse,
    requestSerialize: serialize_gsdk_event_ClearLogMultiRequest,
    requestDeserialize: deserialize_gsdk_event_ClearLogMultiRequest,
    responseSerialize: serialize_gsdk_event_ClearLogMultiResponse,
    responseDeserialize: deserialize_gsdk_event_ClearLogMultiResponse,
  },
};

exports.EventClient = grpc.makeGenericClientConstructor(EventService, 'Event');
