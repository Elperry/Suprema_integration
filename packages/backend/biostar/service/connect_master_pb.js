// source: connect_master.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var connect_pb = require('./connect_pb.js');
goog.object.extend(proto, connect_pb);
var err_pb = require('./err_pb.js');
goog.object.extend(proto, err_pb);
goog.exportSymbol('proto.gsdk.connect_master.AddAsyncConnectionDBRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.AddAsyncConnectionDBResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.AddAsyncConnectionRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.AddAsyncConnectionResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.AddSlaveDeviceDBRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.AddSlaveDeviceDBResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.ConnectRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.ConnectResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DeleteAsyncConnectionRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DeleteAsyncConnectionResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DisableSSLMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DisableSSLMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DisableSSLRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DisableSSLResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DisconnectAllRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DisconnectAllResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DisconnectRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.DisconnectResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.EnableSSLMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.EnableSSLMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.EnableSSLRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.EnableSSLResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetAcceptFilterDBRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetAcceptFilterDBResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetAcceptFilterRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetAcceptFilterResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetAsyncConnectionDBRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetAsyncConnectionDBResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetDeviceListRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetDeviceListResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetPendingListRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetPendingListResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetSlaveDeviceDBRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetSlaveDeviceDBResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetSlaveDeviceRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.GetSlaveDeviceResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SearchDeviceRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SearchDeviceResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SetAcceptFilterDBRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SetAcceptFilterDBResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SetAcceptFilterRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SetAcceptFilterResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SetConnectionModeMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SetConnectionModeMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SetConnectionModeRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SetConnectionModeResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SetSlaveDeviceRequest', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SetSlaveDeviceResponse', null, global);
goog.exportSymbol('proto.gsdk.connect_master.SubscribeStatusRequest', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.ConnectRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.ConnectRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.ConnectRequest.displayName = 'proto.gsdk.connect_master.ConnectRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.ConnectResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.ConnectResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.ConnectResponse.displayName = 'proto.gsdk.connect_master.ConnectResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.AddAsyncConnectionRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.AddAsyncConnectionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.AddAsyncConnectionRequest.displayName = 'proto.gsdk.connect_master.AddAsyncConnectionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.AddAsyncConnectionResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.AddAsyncConnectionResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.AddAsyncConnectionResponse.displayName = 'proto.gsdk.connect_master.AddAsyncConnectionResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.DeleteAsyncConnectionRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.DeleteAsyncConnectionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DeleteAsyncConnectionRequest.displayName = 'proto.gsdk.connect_master.DeleteAsyncConnectionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DeleteAsyncConnectionResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.DeleteAsyncConnectionResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DeleteAsyncConnectionResponse.displayName = 'proto.gsdk.connect_master.DeleteAsyncConnectionResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.AddAsyncConnectionDBRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.AddAsyncConnectionDBRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.AddAsyncConnectionDBRequest.displayName = 'proto.gsdk.connect_master.AddAsyncConnectionDBRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.AddAsyncConnectionDBResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.AddAsyncConnectionDBResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.AddAsyncConnectionDBResponse.displayName = 'proto.gsdk.connect_master.AddAsyncConnectionDBResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.displayName = 'proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse.displayName = 'proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetAsyncConnectionDBRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.GetAsyncConnectionDBRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetAsyncConnectionDBRequest.displayName = 'proto.gsdk.connect_master.GetAsyncConnectionDBRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.GetAsyncConnectionDBResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.GetAsyncConnectionDBResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetAsyncConnectionDBResponse.displayName = 'proto.gsdk.connect_master.GetAsyncConnectionDBResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SetAcceptFilterRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.SetAcceptFilterRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SetAcceptFilterRequest.displayName = 'proto.gsdk.connect_master.SetAcceptFilterRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SetAcceptFilterResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.SetAcceptFilterResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SetAcceptFilterResponse.displayName = 'proto.gsdk.connect_master.SetAcceptFilterResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetAcceptFilterRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.GetAcceptFilterRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetAcceptFilterRequest.displayName = 'proto.gsdk.connect_master.GetAcceptFilterRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetAcceptFilterResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.GetAcceptFilterResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetAcceptFilterResponse.displayName = 'proto.gsdk.connect_master.GetAcceptFilterResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.SetAcceptFilterDBRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SetAcceptFilterDBRequest.displayName = 'proto.gsdk.connect_master.SetAcceptFilterDBRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SetAcceptFilterDBResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.SetAcceptFilterDBResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SetAcceptFilterDBResponse.displayName = 'proto.gsdk.connect_master.SetAcceptFilterDBResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetAcceptFilterDBRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.GetAcceptFilterDBRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetAcceptFilterDBRequest.displayName = 'proto.gsdk.connect_master.GetAcceptFilterDBRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetAcceptFilterDBResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.GetAcceptFilterDBResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetAcceptFilterDBResponse.displayName = 'proto.gsdk.connect_master.GetAcceptFilterDBResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetPendingListRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.GetPendingListRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetPendingListRequest.displayName = 'proto.gsdk.connect_master.GetPendingListRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetPendingListResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.GetPendingListResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.GetPendingListResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetPendingListResponse.displayName = 'proto.gsdk.connect_master.GetPendingListResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetDeviceListRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.GetDeviceListRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetDeviceListRequest.displayName = 'proto.gsdk.connect_master.GetDeviceListRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetDeviceListResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.GetDeviceListResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.GetDeviceListResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetDeviceListResponse.displayName = 'proto.gsdk.connect_master.GetDeviceListResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DisconnectRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.DisconnectRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.DisconnectRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DisconnectRequest.displayName = 'proto.gsdk.connect_master.DisconnectRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DisconnectResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.DisconnectResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DisconnectResponse.displayName = 'proto.gsdk.connect_master.DisconnectResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DisconnectAllRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.DisconnectAllRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DisconnectAllRequest.displayName = 'proto.gsdk.connect_master.DisconnectAllRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DisconnectAllResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.DisconnectAllResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DisconnectAllResponse.displayName = 'proto.gsdk.connect_master.DisconnectAllResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SearchDeviceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.SearchDeviceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SearchDeviceRequest.displayName = 'proto.gsdk.connect_master.SearchDeviceRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SearchDeviceResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.SearchDeviceResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.SearchDeviceResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SearchDeviceResponse.displayName = 'proto.gsdk.connect_master.SearchDeviceResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetSlaveDeviceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.GetSlaveDeviceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetSlaveDeviceRequest.displayName = 'proto.gsdk.connect_master.GetSlaveDeviceRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.GetSlaveDeviceResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.GetSlaveDeviceResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetSlaveDeviceResponse.displayName = 'proto.gsdk.connect_master.GetSlaveDeviceResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.SetSlaveDeviceRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.SetSlaveDeviceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SetSlaveDeviceRequest.displayName = 'proto.gsdk.connect_master.SetSlaveDeviceRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SetSlaveDeviceResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.SetSlaveDeviceResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SetSlaveDeviceResponse.displayName = 'proto.gsdk.connect_master.SetSlaveDeviceResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.AddSlaveDeviceDBRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.AddSlaveDeviceDBRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.AddSlaveDeviceDBRequest.displayName = 'proto.gsdk.connect_master.AddSlaveDeviceDBRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.AddSlaveDeviceDBResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.AddSlaveDeviceDBResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.AddSlaveDeviceDBResponse.displayName = 'proto.gsdk.connect_master.AddSlaveDeviceDBResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.displayName = 'proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse.displayName = 'proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetSlaveDeviceDBRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.GetSlaveDeviceDBRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetSlaveDeviceDBRequest.displayName = 'proto.gsdk.connect_master.GetSlaveDeviceDBRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.GetSlaveDeviceDBResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.GetSlaveDeviceDBResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.GetSlaveDeviceDBResponse.displayName = 'proto.gsdk.connect_master.GetSlaveDeviceDBResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SubscribeStatusRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.SubscribeStatusRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SubscribeStatusRequest.displayName = 'proto.gsdk.connect_master.SubscribeStatusRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SetConnectionModeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.SetConnectionModeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SetConnectionModeRequest.displayName = 'proto.gsdk.connect_master.SetConnectionModeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SetConnectionModeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.SetConnectionModeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SetConnectionModeResponse.displayName = 'proto.gsdk.connect_master.SetConnectionModeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.SetConnectionModeMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.SetConnectionModeMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SetConnectionModeMultiRequest.displayName = 'proto.gsdk.connect_master.SetConnectionModeMultiRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.SetConnectionModeMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.SetConnectionModeMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.SetConnectionModeMultiResponse.displayName = 'proto.gsdk.connect_master.SetConnectionModeMultiResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.EnableSSLRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.EnableSSLRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.EnableSSLRequest.displayName = 'proto.gsdk.connect_master.EnableSSLRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.EnableSSLResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.EnableSSLResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.EnableSSLResponse.displayName = 'proto.gsdk.connect_master.EnableSSLResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.EnableSSLMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.EnableSSLMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.EnableSSLMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.EnableSSLMultiRequest.displayName = 'proto.gsdk.connect_master.EnableSSLMultiRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.EnableSSLMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.EnableSSLMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.EnableSSLMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.EnableSSLMultiResponse.displayName = 'proto.gsdk.connect_master.EnableSSLMultiResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DisableSSLRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.DisableSSLRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DisableSSLRequest.displayName = 'proto.gsdk.connect_master.DisableSSLRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DisableSSLResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.connect_master.DisableSSLResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DisableSSLResponse.displayName = 'proto.gsdk.connect_master.DisableSSLResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DisableSSLMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.DisableSSLMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.DisableSSLMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DisableSSLMultiRequest.displayName = 'proto.gsdk.connect_master.DisableSSLMultiRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.gsdk.connect_master.DisableSSLMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.connect_master.DisableSSLMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.connect_master.DisableSSLMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.connect_master.DisableSSLMultiResponse.displayName = 'proto.gsdk.connect_master.DisableSSLMultiResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.ConnectRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.ConnectRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.ConnectRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.ConnectRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    connectinfo: (f = msg.getConnectinfo()) && connect_pb.ConnectInfo.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.ConnectRequest}
 */
proto.gsdk.connect_master.ConnectRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.ConnectRequest;
  return proto.gsdk.connect_master.ConnectRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.ConnectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.ConnectRequest}
 */
proto.gsdk.connect_master.ConnectRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var value = new connect_pb.ConnectInfo;
      reader.readMessage(value,connect_pb.ConnectInfo.deserializeBinaryFromReader);
      msg.setConnectinfo(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.ConnectRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.ConnectRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.ConnectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.ConnectRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getConnectinfo();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      connect_pb.ConnectInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.ConnectRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.ConnectRequest} returns this
 */
proto.gsdk.connect_master.ConnectRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional gsdk.connect.ConnectInfo connectInfo = 2;
 * @return {?proto.gsdk.connect.ConnectInfo}
 */
proto.gsdk.connect_master.ConnectRequest.prototype.getConnectinfo = function() {
  return /** @type{?proto.gsdk.connect.ConnectInfo} */ (
    jspb.Message.getWrapperField(this, connect_pb.ConnectInfo, 2));
};


/**
 * @param {?proto.gsdk.connect.ConnectInfo|undefined} value
 * @return {!proto.gsdk.connect_master.ConnectRequest} returns this
*/
proto.gsdk.connect_master.ConnectRequest.prototype.setConnectinfo = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.connect_master.ConnectRequest} returns this
 */
proto.gsdk.connect_master.ConnectRequest.prototype.clearConnectinfo = function() {
  return this.setConnectinfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.connect_master.ConnectRequest.prototype.hasConnectinfo = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.ConnectResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.ConnectResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.ConnectResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.ConnectResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.ConnectResponse}
 */
proto.gsdk.connect_master.ConnectResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.ConnectResponse;
  return proto.gsdk.connect_master.ConnectResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.ConnectResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.ConnectResponse}
 */
proto.gsdk.connect_master.ConnectResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setDeviceid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.ConnectResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.ConnectResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.ConnectResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.ConnectResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.connect_master.ConnectResponse.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.connect_master.ConnectResponse} returns this
 */
proto.gsdk.connect_master.ConnectResponse.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.AddAsyncConnectionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    connectinfosList: jspb.Message.toObjectList(msg.getConnectinfosList(),
    connect_pb.AsyncConnectInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionRequest}
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.AddAsyncConnectionRequest;
  return proto.gsdk.connect_master.AddAsyncConnectionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionRequest}
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var value = new connect_pb.AsyncConnectInfo;
      reader.readMessage(value,connect_pb.AsyncConnectInfo.deserializeBinaryFromReader);
      msg.addConnectinfos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.AddAsyncConnectionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getConnectinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      connect_pb.AsyncConnectInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionRequest} returns this
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated gsdk.connect.AsyncConnectInfo connectInfos = 2;
 * @return {!Array<!proto.gsdk.connect.AsyncConnectInfo>}
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.prototype.getConnectinfosList = function() {
  return /** @type{!Array<!proto.gsdk.connect.AsyncConnectInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, connect_pb.AsyncConnectInfo, 2));
};


/**
 * @param {!Array<!proto.gsdk.connect.AsyncConnectInfo>} value
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionRequest} returns this
*/
proto.gsdk.connect_master.AddAsyncConnectionRequest.prototype.setConnectinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.connect.AsyncConnectInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect.AsyncConnectInfo}
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.prototype.addConnectinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.connect.AsyncConnectInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionRequest} returns this
 */
proto.gsdk.connect_master.AddAsyncConnectionRequest.prototype.clearConnectinfosList = function() {
  return this.setConnectinfosList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.AddAsyncConnectionResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.AddAsyncConnectionResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddAsyncConnectionResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionResponse}
 */
proto.gsdk.connect_master.AddAsyncConnectionResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.AddAsyncConnectionResponse;
  return proto.gsdk.connect_master.AddAsyncConnectionResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionResponse}
 */
proto.gsdk.connect_master.AddAsyncConnectionResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.AddAsyncConnectionResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.AddAsyncConnectionResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddAsyncConnectionResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DeleteAsyncConnectionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionRequest}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DeleteAsyncConnectionRequest;
  return proto.gsdk.connect_master.DeleteAsyncConnectionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionRequest}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addDeviceids(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DeleteAsyncConnectionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      2,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionRequest} returns this
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated uint32 deviceIDs = 2;
 * @return {!Array<number>}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionRequest} returns this
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionRequest} returns this
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionRequest} returns this
 */
proto.gsdk.connect_master.DeleteAsyncConnectionRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DeleteAsyncConnectionResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteAsyncConnectionResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionResponse}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DeleteAsyncConnectionResponse;
  return proto.gsdk.connect_master.DeleteAsyncConnectionResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionResponse}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DeleteAsyncConnectionResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteAsyncConnectionResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.AddAsyncConnectionDBRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionDBRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    connectinfosList: jspb.Message.toObjectList(msg.getConnectinfosList(),
    connect_pb.AsyncConnectInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionDBRequest}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.AddAsyncConnectionDBRequest;
  return proto.gsdk.connect_master.AddAsyncConnectionDBRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionDBRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionDBRequest}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var value = new connect_pb.AsyncConnectInfo;
      reader.readMessage(value,connect_pb.AsyncConnectInfo.deserializeBinaryFromReader);
      msg.addConnectinfos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.AddAsyncConnectionDBRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionDBRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getConnectinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      connect_pb.AsyncConnectInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionDBRequest} returns this
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated gsdk.connect.AsyncConnectInfo connectInfos = 2;
 * @return {!Array<!proto.gsdk.connect.AsyncConnectInfo>}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.prototype.getConnectinfosList = function() {
  return /** @type{!Array<!proto.gsdk.connect.AsyncConnectInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, connect_pb.AsyncConnectInfo, 2));
};


/**
 * @param {!Array<!proto.gsdk.connect.AsyncConnectInfo>} value
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionDBRequest} returns this
*/
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.prototype.setConnectinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.connect.AsyncConnectInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect.AsyncConnectInfo}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.prototype.addConnectinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.connect.AsyncConnectInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionDBRequest} returns this
 */
proto.gsdk.connect_master.AddAsyncConnectionDBRequest.prototype.clearConnectinfosList = function() {
  return this.setConnectinfosList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.AddAsyncConnectionDBResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionDBResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddAsyncConnectionDBResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionDBResponse}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.AddAsyncConnectionDBResponse;
  return proto.gsdk.connect_master.AddAsyncConnectionDBResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionDBResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.AddAsyncConnectionDBResponse}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.AddAsyncConnectionDBResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.AddAsyncConnectionDBResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.AddAsyncConnectionDBResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddAsyncConnectionDBResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest;
  return proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addDeviceids(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      2,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest} returns this
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated uint32 deviceIDs = 2;
 * @return {!Array<number>}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest} returns this
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest} returns this
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest} returns this
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse;
  return proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteAsyncConnectionDBResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetAsyncConnectionDBRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetAsyncConnectionDBRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAsyncConnectionDBRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetAsyncConnectionDBRequest}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetAsyncConnectionDBRequest;
  return proto.gsdk.connect_master.GetAsyncConnectionDBRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetAsyncConnectionDBRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetAsyncConnectionDBRequest}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetAsyncConnectionDBRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetAsyncConnectionDBRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAsyncConnectionDBRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.GetAsyncConnectionDBRequest} returns this
 */
proto.gsdk.connect_master.GetAsyncConnectionDBRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetAsyncConnectionDBResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetAsyncConnectionDBResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    connectinfosList: jspb.Message.toObjectList(msg.getConnectinfosList(),
    connect_pb.AsyncConnectInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetAsyncConnectionDBResponse}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetAsyncConnectionDBResponse;
  return proto.gsdk.connect_master.GetAsyncConnectionDBResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetAsyncConnectionDBResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetAsyncConnectionDBResponse}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new connect_pb.AsyncConnectInfo;
      reader.readMessage(value,connect_pb.AsyncConnectInfo.deserializeBinaryFromReader);
      msg.addConnectinfos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetAsyncConnectionDBResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetAsyncConnectionDBResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConnectinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      connect_pb.AsyncConnectInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated gsdk.connect.AsyncConnectInfo connectInfos = 1;
 * @return {!Array<!proto.gsdk.connect.AsyncConnectInfo>}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.prototype.getConnectinfosList = function() {
  return /** @type{!Array<!proto.gsdk.connect.AsyncConnectInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, connect_pb.AsyncConnectInfo, 1));
};


/**
 * @param {!Array<!proto.gsdk.connect.AsyncConnectInfo>} value
 * @return {!proto.gsdk.connect_master.GetAsyncConnectionDBResponse} returns this
*/
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.prototype.setConnectinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.connect.AsyncConnectInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect.AsyncConnectInfo}
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.prototype.addConnectinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.connect.AsyncConnectInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.GetAsyncConnectionDBResponse} returns this
 */
proto.gsdk.connect_master.GetAsyncConnectionDBResponse.prototype.clearConnectinfosList = function() {
  return this.setConnectinfosList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SetAcceptFilterRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SetAcceptFilterRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    filter: (f = msg.getFilter()) && connect_pb.AcceptFilter.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SetAcceptFilterRequest}
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SetAcceptFilterRequest;
  return proto.gsdk.connect_master.SetAcceptFilterRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SetAcceptFilterRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SetAcceptFilterRequest}
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var value = new connect_pb.AcceptFilter;
      reader.readMessage(value,connect_pb.AcceptFilter.deserializeBinaryFromReader);
      msg.setFilter(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SetAcceptFilterRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SetAcceptFilterRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFilter();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      connect_pb.AcceptFilter.serializeBinaryToWriter
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.SetAcceptFilterRequest} returns this
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional gsdk.connect.AcceptFilter filter = 2;
 * @return {?proto.gsdk.connect.AcceptFilter}
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.prototype.getFilter = function() {
  return /** @type{?proto.gsdk.connect.AcceptFilter} */ (
    jspb.Message.getWrapperField(this, connect_pb.AcceptFilter, 2));
};


/**
 * @param {?proto.gsdk.connect.AcceptFilter|undefined} value
 * @return {!proto.gsdk.connect_master.SetAcceptFilterRequest} returns this
*/
proto.gsdk.connect_master.SetAcceptFilterRequest.prototype.setFilter = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.connect_master.SetAcceptFilterRequest} returns this
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.prototype.clearFilter = function() {
  return this.setFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.connect_master.SetAcceptFilterRequest.prototype.hasFilter = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SetAcceptFilterResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SetAcceptFilterResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SetAcceptFilterResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetAcceptFilterResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SetAcceptFilterResponse}
 */
proto.gsdk.connect_master.SetAcceptFilterResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SetAcceptFilterResponse;
  return proto.gsdk.connect_master.SetAcceptFilterResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SetAcceptFilterResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SetAcceptFilterResponse}
 */
proto.gsdk.connect_master.SetAcceptFilterResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SetAcceptFilterResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SetAcceptFilterResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SetAcceptFilterResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetAcceptFilterResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetAcceptFilterRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetAcceptFilterRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetAcceptFilterRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAcceptFilterRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetAcceptFilterRequest}
 */
proto.gsdk.connect_master.GetAcceptFilterRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetAcceptFilterRequest;
  return proto.gsdk.connect_master.GetAcceptFilterRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetAcceptFilterRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetAcceptFilterRequest}
 */
proto.gsdk.connect_master.GetAcceptFilterRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetAcceptFilterRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetAcceptFilterRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetAcceptFilterRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAcceptFilterRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.GetAcceptFilterRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.GetAcceptFilterRequest} returns this
 */
proto.gsdk.connect_master.GetAcceptFilterRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetAcceptFilterResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetAcceptFilterResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetAcceptFilterResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAcceptFilterResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    filter: (f = msg.getFilter()) && connect_pb.AcceptFilter.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetAcceptFilterResponse}
 */
proto.gsdk.connect_master.GetAcceptFilterResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetAcceptFilterResponse;
  return proto.gsdk.connect_master.GetAcceptFilterResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetAcceptFilterResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetAcceptFilterResponse}
 */
proto.gsdk.connect_master.GetAcceptFilterResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new connect_pb.AcceptFilter;
      reader.readMessage(value,connect_pb.AcceptFilter.deserializeBinaryFromReader);
      msg.setFilter(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetAcceptFilterResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetAcceptFilterResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetAcceptFilterResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAcceptFilterResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFilter();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      connect_pb.AcceptFilter.serializeBinaryToWriter
    );
  }
};


/**
 * optional gsdk.connect.AcceptFilter filter = 1;
 * @return {?proto.gsdk.connect.AcceptFilter}
 */
proto.gsdk.connect_master.GetAcceptFilterResponse.prototype.getFilter = function() {
  return /** @type{?proto.gsdk.connect.AcceptFilter} */ (
    jspb.Message.getWrapperField(this, connect_pb.AcceptFilter, 1));
};


/**
 * @param {?proto.gsdk.connect.AcceptFilter|undefined} value
 * @return {!proto.gsdk.connect_master.GetAcceptFilterResponse} returns this
*/
proto.gsdk.connect_master.GetAcceptFilterResponse.prototype.setFilter = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.connect_master.GetAcceptFilterResponse} returns this
 */
proto.gsdk.connect_master.GetAcceptFilterResponse.prototype.clearFilter = function() {
  return this.setFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.connect_master.GetAcceptFilterResponse.prototype.hasFilter = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SetAcceptFilterDBRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SetAcceptFilterDBRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    filter: (f = msg.getFilter()) && connect_pb.AcceptFilter.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SetAcceptFilterDBRequest}
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SetAcceptFilterDBRequest;
  return proto.gsdk.connect_master.SetAcceptFilterDBRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SetAcceptFilterDBRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SetAcceptFilterDBRequest}
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var value = new connect_pb.AcceptFilter;
      reader.readMessage(value,connect_pb.AcceptFilter.deserializeBinaryFromReader);
      msg.setFilter(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SetAcceptFilterDBRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SetAcceptFilterDBRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFilter();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      connect_pb.AcceptFilter.serializeBinaryToWriter
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.SetAcceptFilterDBRequest} returns this
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional gsdk.connect.AcceptFilter filter = 2;
 * @return {?proto.gsdk.connect.AcceptFilter}
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.prototype.getFilter = function() {
  return /** @type{?proto.gsdk.connect.AcceptFilter} */ (
    jspb.Message.getWrapperField(this, connect_pb.AcceptFilter, 2));
};


/**
 * @param {?proto.gsdk.connect.AcceptFilter|undefined} value
 * @return {!proto.gsdk.connect_master.SetAcceptFilterDBRequest} returns this
*/
proto.gsdk.connect_master.SetAcceptFilterDBRequest.prototype.setFilter = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.connect_master.SetAcceptFilterDBRequest} returns this
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.prototype.clearFilter = function() {
  return this.setFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.connect_master.SetAcceptFilterDBRequest.prototype.hasFilter = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SetAcceptFilterDBResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SetAcceptFilterDBResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SetAcceptFilterDBResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetAcceptFilterDBResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SetAcceptFilterDBResponse}
 */
proto.gsdk.connect_master.SetAcceptFilterDBResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SetAcceptFilterDBResponse;
  return proto.gsdk.connect_master.SetAcceptFilterDBResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SetAcceptFilterDBResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SetAcceptFilterDBResponse}
 */
proto.gsdk.connect_master.SetAcceptFilterDBResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SetAcceptFilterDBResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SetAcceptFilterDBResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SetAcceptFilterDBResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetAcceptFilterDBResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetAcceptFilterDBRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetAcceptFilterDBRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetAcceptFilterDBRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAcceptFilterDBRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetAcceptFilterDBRequest}
 */
proto.gsdk.connect_master.GetAcceptFilterDBRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetAcceptFilterDBRequest;
  return proto.gsdk.connect_master.GetAcceptFilterDBRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetAcceptFilterDBRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetAcceptFilterDBRequest}
 */
proto.gsdk.connect_master.GetAcceptFilterDBRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetAcceptFilterDBRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetAcceptFilterDBRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetAcceptFilterDBRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAcceptFilterDBRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.GetAcceptFilterDBRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.GetAcceptFilterDBRequest} returns this
 */
proto.gsdk.connect_master.GetAcceptFilterDBRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetAcceptFilterDBResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetAcceptFilterDBResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetAcceptFilterDBResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAcceptFilterDBResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    filter: (f = msg.getFilter()) && connect_pb.AcceptFilter.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetAcceptFilterDBResponse}
 */
proto.gsdk.connect_master.GetAcceptFilterDBResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetAcceptFilterDBResponse;
  return proto.gsdk.connect_master.GetAcceptFilterDBResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetAcceptFilterDBResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetAcceptFilterDBResponse}
 */
proto.gsdk.connect_master.GetAcceptFilterDBResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new connect_pb.AcceptFilter;
      reader.readMessage(value,connect_pb.AcceptFilter.deserializeBinaryFromReader);
      msg.setFilter(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetAcceptFilterDBResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetAcceptFilterDBResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetAcceptFilterDBResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetAcceptFilterDBResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFilter();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      connect_pb.AcceptFilter.serializeBinaryToWriter
    );
  }
};


/**
 * optional gsdk.connect.AcceptFilter filter = 1;
 * @return {?proto.gsdk.connect.AcceptFilter}
 */
proto.gsdk.connect_master.GetAcceptFilterDBResponse.prototype.getFilter = function() {
  return /** @type{?proto.gsdk.connect.AcceptFilter} */ (
    jspb.Message.getWrapperField(this, connect_pb.AcceptFilter, 1));
};


/**
 * @param {?proto.gsdk.connect.AcceptFilter|undefined} value
 * @return {!proto.gsdk.connect_master.GetAcceptFilterDBResponse} returns this
*/
proto.gsdk.connect_master.GetAcceptFilterDBResponse.prototype.setFilter = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.connect_master.GetAcceptFilterDBResponse} returns this
 */
proto.gsdk.connect_master.GetAcceptFilterDBResponse.prototype.clearFilter = function() {
  return this.setFilter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.connect_master.GetAcceptFilterDBResponse.prototype.hasFilter = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetPendingListRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetPendingListRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetPendingListRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetPendingListRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetPendingListRequest}
 */
proto.gsdk.connect_master.GetPendingListRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetPendingListRequest;
  return proto.gsdk.connect_master.GetPendingListRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetPendingListRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetPendingListRequest}
 */
proto.gsdk.connect_master.GetPendingListRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetPendingListRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetPendingListRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetPendingListRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetPendingListRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.GetPendingListRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.GetPendingListRequest} returns this
 */
proto.gsdk.connect_master.GetPendingListRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.GetPendingListResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetPendingListResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetPendingListResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetPendingListResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetPendingListResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceinfosList: jspb.Message.toObjectList(msg.getDeviceinfosList(),
    connect_pb.PendingDeviceInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetPendingListResponse}
 */
proto.gsdk.connect_master.GetPendingListResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetPendingListResponse;
  return proto.gsdk.connect_master.GetPendingListResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetPendingListResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetPendingListResponse}
 */
proto.gsdk.connect_master.GetPendingListResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new connect_pb.PendingDeviceInfo;
      reader.readMessage(value,connect_pb.PendingDeviceInfo.deserializeBinaryFromReader);
      msg.addDeviceinfos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetPendingListResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetPendingListResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetPendingListResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetPendingListResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      connect_pb.PendingDeviceInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated gsdk.connect.PendingDeviceInfo deviceInfos = 1;
 * @return {!Array<!proto.gsdk.connect.PendingDeviceInfo>}
 */
proto.gsdk.connect_master.GetPendingListResponse.prototype.getDeviceinfosList = function() {
  return /** @type{!Array<!proto.gsdk.connect.PendingDeviceInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, connect_pb.PendingDeviceInfo, 1));
};


/**
 * @param {!Array<!proto.gsdk.connect.PendingDeviceInfo>} value
 * @return {!proto.gsdk.connect_master.GetPendingListResponse} returns this
*/
proto.gsdk.connect_master.GetPendingListResponse.prototype.setDeviceinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.connect.PendingDeviceInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect.PendingDeviceInfo}
 */
proto.gsdk.connect_master.GetPendingListResponse.prototype.addDeviceinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.connect.PendingDeviceInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.GetPendingListResponse} returns this
 */
proto.gsdk.connect_master.GetPendingListResponse.prototype.clearDeviceinfosList = function() {
  return this.setDeviceinfosList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetDeviceListRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetDeviceListRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetDeviceListRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetDeviceListRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetDeviceListRequest}
 */
proto.gsdk.connect_master.GetDeviceListRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetDeviceListRequest;
  return proto.gsdk.connect_master.GetDeviceListRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetDeviceListRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetDeviceListRequest}
 */
proto.gsdk.connect_master.GetDeviceListRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetDeviceListRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetDeviceListRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetDeviceListRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetDeviceListRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.GetDeviceListRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.GetDeviceListRequest} returns this
 */
proto.gsdk.connect_master.GetDeviceListRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.GetDeviceListResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetDeviceListResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetDeviceListResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetDeviceListResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetDeviceListResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceinfosList: jspb.Message.toObjectList(msg.getDeviceinfosList(),
    connect_pb.DeviceInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetDeviceListResponse}
 */
proto.gsdk.connect_master.GetDeviceListResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetDeviceListResponse;
  return proto.gsdk.connect_master.GetDeviceListResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetDeviceListResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetDeviceListResponse}
 */
proto.gsdk.connect_master.GetDeviceListResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new connect_pb.DeviceInfo;
      reader.readMessage(value,connect_pb.DeviceInfo.deserializeBinaryFromReader);
      msg.addDeviceinfos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetDeviceListResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetDeviceListResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetDeviceListResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetDeviceListResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      connect_pb.DeviceInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated gsdk.connect.DeviceInfo deviceInfos = 1;
 * @return {!Array<!proto.gsdk.connect.DeviceInfo>}
 */
proto.gsdk.connect_master.GetDeviceListResponse.prototype.getDeviceinfosList = function() {
  return /** @type{!Array<!proto.gsdk.connect.DeviceInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, connect_pb.DeviceInfo, 1));
};


/**
 * @param {!Array<!proto.gsdk.connect.DeviceInfo>} value
 * @return {!proto.gsdk.connect_master.GetDeviceListResponse} returns this
*/
proto.gsdk.connect_master.GetDeviceListResponse.prototype.setDeviceinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.connect.DeviceInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect.DeviceInfo}
 */
proto.gsdk.connect_master.GetDeviceListResponse.prototype.addDeviceinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.connect.DeviceInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.GetDeviceListResponse} returns this
 */
proto.gsdk.connect_master.GetDeviceListResponse.prototype.clearDeviceinfosList = function() {
  return this.setDeviceinfosList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.DisconnectRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DisconnectRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DisconnectRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DisconnectRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisconnectRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DisconnectRequest}
 */
proto.gsdk.connect_master.DisconnectRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DisconnectRequest;
  return proto.gsdk.connect_master.DisconnectRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DisconnectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DisconnectRequest}
 */
proto.gsdk.connect_master.DisconnectRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addDeviceids(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DisconnectRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DisconnectRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DisconnectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisconnectRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.connect_master.DisconnectRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.connect_master.DisconnectRequest} returns this
 */
proto.gsdk.connect_master.DisconnectRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect_master.DisconnectRequest} returns this
 */
proto.gsdk.connect_master.DisconnectRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.DisconnectRequest} returns this
 */
proto.gsdk.connect_master.DisconnectRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DisconnectResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DisconnectResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DisconnectResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisconnectResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DisconnectResponse}
 */
proto.gsdk.connect_master.DisconnectResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DisconnectResponse;
  return proto.gsdk.connect_master.DisconnectResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DisconnectResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DisconnectResponse}
 */
proto.gsdk.connect_master.DisconnectResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DisconnectResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DisconnectResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DisconnectResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisconnectResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DisconnectAllRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DisconnectAllRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DisconnectAllRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisconnectAllRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DisconnectAllRequest}
 */
proto.gsdk.connect_master.DisconnectAllRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DisconnectAllRequest;
  return proto.gsdk.connect_master.DisconnectAllRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DisconnectAllRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DisconnectAllRequest}
 */
proto.gsdk.connect_master.DisconnectAllRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DisconnectAllRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DisconnectAllRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DisconnectAllRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisconnectAllRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.DisconnectAllRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.DisconnectAllRequest} returns this
 */
proto.gsdk.connect_master.DisconnectAllRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DisconnectAllResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DisconnectAllResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DisconnectAllResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisconnectAllResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DisconnectAllResponse}
 */
proto.gsdk.connect_master.DisconnectAllResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DisconnectAllResponse;
  return proto.gsdk.connect_master.DisconnectAllResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DisconnectAllResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DisconnectAllResponse}
 */
proto.gsdk.connect_master.DisconnectAllResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DisconnectAllResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DisconnectAllResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DisconnectAllResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisconnectAllResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SearchDeviceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SearchDeviceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SearchDeviceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SearchDeviceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    timeout: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SearchDeviceRequest}
 */
proto.gsdk.connect_master.SearchDeviceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SearchDeviceRequest;
  return proto.gsdk.connect_master.SearchDeviceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SearchDeviceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SearchDeviceRequest}
 */
proto.gsdk.connect_master.SearchDeviceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTimeout(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SearchDeviceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SearchDeviceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SearchDeviceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SearchDeviceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTimeout();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.SearchDeviceRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.SearchDeviceRequest} returns this
 */
proto.gsdk.connect_master.SearchDeviceRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 timeout = 2;
 * @return {number}
 */
proto.gsdk.connect_master.SearchDeviceRequest.prototype.getTimeout = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.connect_master.SearchDeviceRequest} returns this
 */
proto.gsdk.connect_master.SearchDeviceRequest.prototype.setTimeout = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.SearchDeviceResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SearchDeviceResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SearchDeviceResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SearchDeviceResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SearchDeviceResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceinfosList: jspb.Message.toObjectList(msg.getDeviceinfosList(),
    connect_pb.SearchDeviceInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SearchDeviceResponse}
 */
proto.gsdk.connect_master.SearchDeviceResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SearchDeviceResponse;
  return proto.gsdk.connect_master.SearchDeviceResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SearchDeviceResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SearchDeviceResponse}
 */
proto.gsdk.connect_master.SearchDeviceResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new connect_pb.SearchDeviceInfo;
      reader.readMessage(value,connect_pb.SearchDeviceInfo.deserializeBinaryFromReader);
      msg.addDeviceinfos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SearchDeviceResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SearchDeviceResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SearchDeviceResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SearchDeviceResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      connect_pb.SearchDeviceInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated gsdk.connect.SearchDeviceInfo deviceInfos = 1;
 * @return {!Array<!proto.gsdk.connect.SearchDeviceInfo>}
 */
proto.gsdk.connect_master.SearchDeviceResponse.prototype.getDeviceinfosList = function() {
  return /** @type{!Array<!proto.gsdk.connect.SearchDeviceInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, connect_pb.SearchDeviceInfo, 1));
};


/**
 * @param {!Array<!proto.gsdk.connect.SearchDeviceInfo>} value
 * @return {!proto.gsdk.connect_master.SearchDeviceResponse} returns this
*/
proto.gsdk.connect_master.SearchDeviceResponse.prototype.setDeviceinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.connect.SearchDeviceInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect.SearchDeviceInfo}
 */
proto.gsdk.connect_master.SearchDeviceResponse.prototype.addDeviceinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.connect.SearchDeviceInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.SearchDeviceResponse} returns this
 */
proto.gsdk.connect_master.SearchDeviceResponse.prototype.clearDeviceinfosList = function() {
  return this.setDeviceinfosList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetSlaveDeviceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetSlaveDeviceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetSlaveDeviceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceRequest}
 */
proto.gsdk.connect_master.GetSlaveDeviceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetSlaveDeviceRequest;
  return proto.gsdk.connect_master.GetSlaveDeviceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceRequest}
 */
proto.gsdk.connect_master.GetSlaveDeviceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetSlaveDeviceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetSlaveDeviceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetSlaveDeviceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.GetSlaveDeviceRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceRequest} returns this
 */
proto.gsdk.connect_master.GetSlaveDeviceRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetSlaveDeviceResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    slavedeviceinfosList: jspb.Message.toObjectList(msg.getSlavedeviceinfosList(),
    connect_pb.SlaveDeviceInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceResponse}
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetSlaveDeviceResponse;
  return proto.gsdk.connect_master.GetSlaveDeviceResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceResponse}
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new connect_pb.SlaveDeviceInfo;
      reader.readMessage(value,connect_pb.SlaveDeviceInfo.deserializeBinaryFromReader);
      msg.addSlavedeviceinfos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetSlaveDeviceResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSlavedeviceinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      connect_pb.SlaveDeviceInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated gsdk.connect.SlaveDeviceInfo slaveDeviceInfos = 1;
 * @return {!Array<!proto.gsdk.connect.SlaveDeviceInfo>}
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse.prototype.getSlavedeviceinfosList = function() {
  return /** @type{!Array<!proto.gsdk.connect.SlaveDeviceInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, connect_pb.SlaveDeviceInfo, 1));
};


/**
 * @param {!Array<!proto.gsdk.connect.SlaveDeviceInfo>} value
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceResponse} returns this
*/
proto.gsdk.connect_master.GetSlaveDeviceResponse.prototype.setSlavedeviceinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.connect.SlaveDeviceInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect.SlaveDeviceInfo}
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse.prototype.addSlavedeviceinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.connect.SlaveDeviceInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceResponse} returns this
 */
proto.gsdk.connect_master.GetSlaveDeviceResponse.prototype.clearSlavedeviceinfosList = function() {
  return this.setSlavedeviceinfosList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SetSlaveDeviceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SetSlaveDeviceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    slavedeviceinfosList: jspb.Message.toObjectList(msg.getSlavedeviceinfosList(),
    connect_pb.SlaveDeviceInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SetSlaveDeviceRequest}
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SetSlaveDeviceRequest;
  return proto.gsdk.connect_master.SetSlaveDeviceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SetSlaveDeviceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SetSlaveDeviceRequest}
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var value = new connect_pb.SlaveDeviceInfo;
      reader.readMessage(value,connect_pb.SlaveDeviceInfo.deserializeBinaryFromReader);
      msg.addSlavedeviceinfos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SetSlaveDeviceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SetSlaveDeviceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSlavedeviceinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      connect_pb.SlaveDeviceInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.SetSlaveDeviceRequest} returns this
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated gsdk.connect.SlaveDeviceInfo slaveDeviceInfos = 2;
 * @return {!Array<!proto.gsdk.connect.SlaveDeviceInfo>}
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.prototype.getSlavedeviceinfosList = function() {
  return /** @type{!Array<!proto.gsdk.connect.SlaveDeviceInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, connect_pb.SlaveDeviceInfo, 2));
};


/**
 * @param {!Array<!proto.gsdk.connect.SlaveDeviceInfo>} value
 * @return {!proto.gsdk.connect_master.SetSlaveDeviceRequest} returns this
*/
proto.gsdk.connect_master.SetSlaveDeviceRequest.prototype.setSlavedeviceinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.connect.SlaveDeviceInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect.SlaveDeviceInfo}
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.prototype.addSlavedeviceinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.connect.SlaveDeviceInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.SetSlaveDeviceRequest} returns this
 */
proto.gsdk.connect_master.SetSlaveDeviceRequest.prototype.clearSlavedeviceinfosList = function() {
  return this.setSlavedeviceinfosList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SetSlaveDeviceResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SetSlaveDeviceResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SetSlaveDeviceResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetSlaveDeviceResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SetSlaveDeviceResponse}
 */
proto.gsdk.connect_master.SetSlaveDeviceResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SetSlaveDeviceResponse;
  return proto.gsdk.connect_master.SetSlaveDeviceResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SetSlaveDeviceResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SetSlaveDeviceResponse}
 */
proto.gsdk.connect_master.SetSlaveDeviceResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SetSlaveDeviceResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SetSlaveDeviceResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SetSlaveDeviceResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetSlaveDeviceResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.AddSlaveDeviceDBRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.AddSlaveDeviceDBRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    slavedeviceinfosList: jspb.Message.toObjectList(msg.getSlavedeviceinfosList(),
    connect_pb.SlaveDeviceInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.AddSlaveDeviceDBRequest}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.AddSlaveDeviceDBRequest;
  return proto.gsdk.connect_master.AddSlaveDeviceDBRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.AddSlaveDeviceDBRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.AddSlaveDeviceDBRequest}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var value = new connect_pb.SlaveDeviceInfo;
      reader.readMessage(value,connect_pb.SlaveDeviceInfo.deserializeBinaryFromReader);
      msg.addSlavedeviceinfos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.AddSlaveDeviceDBRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.AddSlaveDeviceDBRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSlavedeviceinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      connect_pb.SlaveDeviceInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.AddSlaveDeviceDBRequest} returns this
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated gsdk.connect.SlaveDeviceInfo slaveDeviceInfos = 2;
 * @return {!Array<!proto.gsdk.connect.SlaveDeviceInfo>}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.prototype.getSlavedeviceinfosList = function() {
  return /** @type{!Array<!proto.gsdk.connect.SlaveDeviceInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, connect_pb.SlaveDeviceInfo, 2));
};


/**
 * @param {!Array<!proto.gsdk.connect.SlaveDeviceInfo>} value
 * @return {!proto.gsdk.connect_master.AddSlaveDeviceDBRequest} returns this
*/
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.prototype.setSlavedeviceinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.connect.SlaveDeviceInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect.SlaveDeviceInfo}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.prototype.addSlavedeviceinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.connect.SlaveDeviceInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.AddSlaveDeviceDBRequest} returns this
 */
proto.gsdk.connect_master.AddSlaveDeviceDBRequest.prototype.clearSlavedeviceinfosList = function() {
  return this.setSlavedeviceinfosList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.AddSlaveDeviceDBResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.AddSlaveDeviceDBResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddSlaveDeviceDBResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.AddSlaveDeviceDBResponse}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.AddSlaveDeviceDBResponse;
  return proto.gsdk.connect_master.AddSlaveDeviceDBResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.AddSlaveDeviceDBResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.AddSlaveDeviceDBResponse}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.AddSlaveDeviceDBResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.AddSlaveDeviceDBResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.AddSlaveDeviceDBResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.AddSlaveDeviceDBResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest}
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest;
  return proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest}
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    case 2:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addDeviceids(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      2,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest} returns this
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated uint32 deviceIDs = 2;
 * @return {!Array<number>}
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest} returns this
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest} returns this
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest} returns this
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse}
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse;
  return proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse}
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DeleteSlaveDeviceDBResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetSlaveDeviceDBRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceDBRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetSlaveDeviceDBRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    gatewayid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceDBRequest}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetSlaveDeviceDBRequest;
  return proto.gsdk.connect_master.GetSlaveDeviceDBRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceDBRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceDBRequest}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGatewayid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetSlaveDeviceDBRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceDBRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetSlaveDeviceDBRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGatewayid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string gatewayID = 1;
 * @return {string}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBRequest.prototype.getGatewayid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceDBRequest} returns this
 */
proto.gsdk.connect_master.GetSlaveDeviceDBRequest.prototype.setGatewayid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.GetSlaveDeviceDBResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceDBResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    slavedeviceinfosList: jspb.Message.toObjectList(msg.getSlavedeviceinfosList(),
    connect_pb.SlaveDeviceInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceDBResponse}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.GetSlaveDeviceDBResponse;
  return proto.gsdk.connect_master.GetSlaveDeviceDBResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceDBResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceDBResponse}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new connect_pb.SlaveDeviceInfo;
      reader.readMessage(value,connect_pb.SlaveDeviceInfo.deserializeBinaryFromReader);
      msg.addSlavedeviceinfos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.GetSlaveDeviceDBResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.GetSlaveDeviceDBResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSlavedeviceinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      connect_pb.SlaveDeviceInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated gsdk.connect.SlaveDeviceInfo slaveDeviceInfos = 1;
 * @return {!Array<!proto.gsdk.connect.SlaveDeviceInfo>}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.prototype.getSlavedeviceinfosList = function() {
  return /** @type{!Array<!proto.gsdk.connect.SlaveDeviceInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, connect_pb.SlaveDeviceInfo, 1));
};


/**
 * @param {!Array<!proto.gsdk.connect.SlaveDeviceInfo>} value
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceDBResponse} returns this
*/
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.prototype.setSlavedeviceinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.connect.SlaveDeviceInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect.SlaveDeviceInfo}
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.prototype.addSlavedeviceinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.connect.SlaveDeviceInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.GetSlaveDeviceDBResponse} returns this
 */
proto.gsdk.connect_master.GetSlaveDeviceDBResponse.prototype.clearSlavedeviceinfosList = function() {
  return this.setSlavedeviceinfosList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SubscribeStatusRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SubscribeStatusRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SubscribeStatusRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SubscribeStatusRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    queuesize: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SubscribeStatusRequest}
 */
proto.gsdk.connect_master.SubscribeStatusRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SubscribeStatusRequest;
  return proto.gsdk.connect_master.SubscribeStatusRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SubscribeStatusRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SubscribeStatusRequest}
 */
proto.gsdk.connect_master.SubscribeStatusRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setQueuesize(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SubscribeStatusRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SubscribeStatusRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SubscribeStatusRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SubscribeStatusRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getQueuesize();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 queueSize = 1;
 * @return {number}
 */
proto.gsdk.connect_master.SubscribeStatusRequest.prototype.getQueuesize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.connect_master.SubscribeStatusRequest} returns this
 */
proto.gsdk.connect_master.SubscribeStatusRequest.prototype.setQueuesize = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SetConnectionModeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SetConnectionModeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SetConnectionModeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetConnectionModeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    connectionmode: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SetConnectionModeRequest}
 */
proto.gsdk.connect_master.SetConnectionModeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SetConnectionModeRequest;
  return proto.gsdk.connect_master.SetConnectionModeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SetConnectionModeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SetConnectionModeRequest}
 */
proto.gsdk.connect_master.SetConnectionModeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setDeviceid(value);
      break;
    case 2:
      var value = /** @type {!proto.gsdk.connect.ConnectionMode} */ (reader.readEnum());
      msg.setConnectionmode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SetConnectionModeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SetConnectionModeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SetConnectionModeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetConnectionModeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getConnectionmode();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.connect_master.SetConnectionModeRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.connect_master.SetConnectionModeRequest} returns this
 */
proto.gsdk.connect_master.SetConnectionModeRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional gsdk.connect.ConnectionMode connectionMode = 2;
 * @return {!proto.gsdk.connect.ConnectionMode}
 */
proto.gsdk.connect_master.SetConnectionModeRequest.prototype.getConnectionmode = function() {
  return /** @type {!proto.gsdk.connect.ConnectionMode} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.gsdk.connect.ConnectionMode} value
 * @return {!proto.gsdk.connect_master.SetConnectionModeRequest} returns this
 */
proto.gsdk.connect_master.SetConnectionModeRequest.prototype.setConnectionmode = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SetConnectionModeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SetConnectionModeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SetConnectionModeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetConnectionModeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SetConnectionModeResponse}
 */
proto.gsdk.connect_master.SetConnectionModeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SetConnectionModeResponse;
  return proto.gsdk.connect_master.SetConnectionModeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SetConnectionModeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SetConnectionModeResponse}
 */
proto.gsdk.connect_master.SetConnectionModeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SetConnectionModeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SetConnectionModeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SetConnectionModeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetConnectionModeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SetConnectionModeMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SetConnectionModeMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    connectionmode: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SetConnectionModeMultiRequest}
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SetConnectionModeMultiRequest;
  return proto.gsdk.connect_master.SetConnectionModeMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SetConnectionModeMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SetConnectionModeMultiRequest}
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addDeviceids(values[i]);
      }
      break;
    case 2:
      var value = /** @type {!proto.gsdk.connect.ConnectionMode} */ (reader.readEnum());
      msg.setConnectionmode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SetConnectionModeMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SetConnectionModeMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getConnectionmode();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.connect_master.SetConnectionModeMultiRequest} returns this
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect_master.SetConnectionModeMultiRequest} returns this
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.SetConnectionModeMultiRequest} returns this
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * optional gsdk.connect.ConnectionMode connectionMode = 2;
 * @return {!proto.gsdk.connect.ConnectionMode}
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.prototype.getConnectionmode = function() {
  return /** @type {!proto.gsdk.connect.ConnectionMode} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.gsdk.connect.ConnectionMode} value
 * @return {!proto.gsdk.connect_master.SetConnectionModeMultiRequest} returns this
 */
proto.gsdk.connect_master.SetConnectionModeMultiRequest.prototype.setConnectionmode = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.SetConnectionModeMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.SetConnectionModeMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceerrorsList: jspb.Message.toObjectList(msg.getDeviceerrorsList(),
    err_pb.ErrorResponse.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.SetConnectionModeMultiResponse}
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.SetConnectionModeMultiResponse;
  return proto.gsdk.connect_master.SetConnectionModeMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.SetConnectionModeMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.SetConnectionModeMultiResponse}
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new err_pb.ErrorResponse;
      reader.readMessage(value,err_pb.ErrorResponse.deserializeBinaryFromReader);
      msg.addDeviceerrors(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.SetConnectionModeMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.SetConnectionModeMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceerrorsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      err_pb.ErrorResponse.serializeBinaryToWriter
    );
  }
};


/**
 * repeated gsdk.err.ErrorResponse deviceErrors = 1;
 * @return {!Array<!proto.gsdk.err.ErrorResponse>}
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.connect_master.SetConnectionModeMultiResponse} returns this
*/
proto.gsdk.connect_master.SetConnectionModeMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.SetConnectionModeMultiResponse} returns this
 */
proto.gsdk.connect_master.SetConnectionModeMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.EnableSSLRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.EnableSSLRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.EnableSSLRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.EnableSSLRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.EnableSSLRequest}
 */
proto.gsdk.connect_master.EnableSSLRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.EnableSSLRequest;
  return proto.gsdk.connect_master.EnableSSLRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.EnableSSLRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.EnableSSLRequest}
 */
proto.gsdk.connect_master.EnableSSLRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setDeviceid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.EnableSSLRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.EnableSSLRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.EnableSSLRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.EnableSSLRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.connect_master.EnableSSLRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.connect_master.EnableSSLRequest} returns this
 */
proto.gsdk.connect_master.EnableSSLRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.EnableSSLResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.EnableSSLResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.EnableSSLResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.EnableSSLResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.EnableSSLResponse}
 */
proto.gsdk.connect_master.EnableSSLResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.EnableSSLResponse;
  return proto.gsdk.connect_master.EnableSSLResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.EnableSSLResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.EnableSSLResponse}
 */
proto.gsdk.connect_master.EnableSSLResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.EnableSSLResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.EnableSSLResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.EnableSSLResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.EnableSSLResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.EnableSSLMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.EnableSSLMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.EnableSSLMultiRequest}
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.EnableSSLMultiRequest;
  return proto.gsdk.connect_master.EnableSSLMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.EnableSSLMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.EnableSSLMultiRequest}
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addDeviceids(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.EnableSSLMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.EnableSSLMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.connect_master.EnableSSLMultiRequest} returns this
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect_master.EnableSSLMultiRequest} returns this
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.EnableSSLMultiRequest} returns this
 */
proto.gsdk.connect_master.EnableSSLMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.EnableSSLMultiResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.EnableSSLMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.EnableSSLMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.EnableSSLMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.EnableSSLMultiResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceerrorsList: jspb.Message.toObjectList(msg.getDeviceerrorsList(),
    err_pb.ErrorResponse.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.EnableSSLMultiResponse}
 */
proto.gsdk.connect_master.EnableSSLMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.EnableSSLMultiResponse;
  return proto.gsdk.connect_master.EnableSSLMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.EnableSSLMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.EnableSSLMultiResponse}
 */
proto.gsdk.connect_master.EnableSSLMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new err_pb.ErrorResponse;
      reader.readMessage(value,err_pb.ErrorResponse.deserializeBinaryFromReader);
      msg.addDeviceerrors(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.EnableSSLMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.EnableSSLMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.EnableSSLMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.EnableSSLMultiResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceerrorsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      err_pb.ErrorResponse.serializeBinaryToWriter
    );
  }
};


/**
 * repeated gsdk.err.ErrorResponse deviceErrors = 1;
 * @return {!Array<!proto.gsdk.err.ErrorResponse>}
 */
proto.gsdk.connect_master.EnableSSLMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.connect_master.EnableSSLMultiResponse} returns this
*/
proto.gsdk.connect_master.EnableSSLMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.connect_master.EnableSSLMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.EnableSSLMultiResponse} returns this
 */
proto.gsdk.connect_master.EnableSSLMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DisableSSLRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DisableSSLRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DisableSSLRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisableSSLRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DisableSSLRequest}
 */
proto.gsdk.connect_master.DisableSSLRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DisableSSLRequest;
  return proto.gsdk.connect_master.DisableSSLRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DisableSSLRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DisableSSLRequest}
 */
proto.gsdk.connect_master.DisableSSLRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setDeviceid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DisableSSLRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DisableSSLRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DisableSSLRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisableSSLRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.connect_master.DisableSSLRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.connect_master.DisableSSLRequest} returns this
 */
proto.gsdk.connect_master.DisableSSLRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DisableSSLResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DisableSSLResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DisableSSLResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisableSSLResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DisableSSLResponse}
 */
proto.gsdk.connect_master.DisableSSLResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DisableSSLResponse;
  return proto.gsdk.connect_master.DisableSSLResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DisableSSLResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DisableSSLResponse}
 */
proto.gsdk.connect_master.DisableSSLResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DisableSSLResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DisableSSLResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DisableSSLResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisableSSLResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DisableSSLMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DisableSSLMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DisableSSLMultiRequest}
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DisableSSLMultiRequest;
  return proto.gsdk.connect_master.DisableSSLMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DisableSSLMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DisableSSLMultiRequest}
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addDeviceids(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DisableSSLMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DisableSSLMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.connect_master.DisableSSLMultiRequest} returns this
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.connect_master.DisableSSLMultiRequest} returns this
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.DisableSSLMultiRequest} returns this
 */
proto.gsdk.connect_master.DisableSSLMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.connect_master.DisableSSLMultiResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.gsdk.connect_master.DisableSSLMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.connect_master.DisableSSLMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.connect_master.DisableSSLMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisableSSLMultiResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceerrorsList: jspb.Message.toObjectList(msg.getDeviceerrorsList(),
    err_pb.ErrorResponse.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.gsdk.connect_master.DisableSSLMultiResponse}
 */
proto.gsdk.connect_master.DisableSSLMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.connect_master.DisableSSLMultiResponse;
  return proto.gsdk.connect_master.DisableSSLMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.connect_master.DisableSSLMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.connect_master.DisableSSLMultiResponse}
 */
proto.gsdk.connect_master.DisableSSLMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new err_pb.ErrorResponse;
      reader.readMessage(value,err_pb.ErrorResponse.deserializeBinaryFromReader);
      msg.addDeviceerrors(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.gsdk.connect_master.DisableSSLMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.connect_master.DisableSSLMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.connect_master.DisableSSLMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.connect_master.DisableSSLMultiResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceerrorsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      err_pb.ErrorResponse.serializeBinaryToWriter
    );
  }
};


/**
 * repeated gsdk.err.ErrorResponse deviceErrors = 1;
 * @return {!Array<!proto.gsdk.err.ErrorResponse>}
 */
proto.gsdk.connect_master.DisableSSLMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.connect_master.DisableSSLMultiResponse} returns this
*/
proto.gsdk.connect_master.DisableSSLMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.connect_master.DisableSSLMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.connect_master.DisableSSLMultiResponse} returns this
 */
proto.gsdk.connect_master.DisableSSLMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};


goog.object.extend(exports, proto.gsdk.connect_master);
