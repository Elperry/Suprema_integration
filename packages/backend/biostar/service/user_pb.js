// source: user.proto
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

var card_pb = require('./card_pb.js');
goog.object.extend(proto, card_pb);
var finger_pb = require('./finger_pb.js');
goog.object.extend(proto, finger_pb);
var face_pb = require('./face_pb.js');
goog.object.extend(proto, face_pb);
var tna_pb = require('./tna_pb.js');
goog.object.extend(proto, tna_pb);
var err_pb = require('./err_pb.js');
goog.object.extend(proto, err_pb);
goog.exportSymbol('proto.gsdk.user.DeleteAllMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.user.DeleteAllMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.user.DeleteAllRequest', null, global);
goog.exportSymbol('proto.gsdk.user.DeleteAllResponse', null, global);
goog.exportSymbol('proto.gsdk.user.DeleteMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.user.DeleteMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.user.DeleteRequest', null, global);
goog.exportSymbol('proto.gsdk.user.DeleteResponse', null, global);
goog.exportSymbol('proto.gsdk.user.EnrollMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.user.EnrollMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.user.EnrollRequest', null, global);
goog.exportSymbol('proto.gsdk.user.EnrollResponse', null, global);
goog.exportSymbol('proto.gsdk.user.Enum', null, global);
goog.exportSymbol('proto.gsdk.user.GetAccessGroupRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetAccessGroupResponse', null, global);
goog.exportSymbol('proto.gsdk.user.GetCardRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetCardResponse', null, global);
goog.exportSymbol('proto.gsdk.user.GetFaceRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetFaceResponse', null, global);
goog.exportSymbol('proto.gsdk.user.GetFingerRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetFingerResponse', null, global);
goog.exportSymbol('proto.gsdk.user.GetJobCodeRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetJobCodeResponse', null, global);
goog.exportSymbol('proto.gsdk.user.GetListRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetListResponse', null, global);
goog.exportSymbol('proto.gsdk.user.GetPINHashRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetPINHashResponse', null, global);
goog.exportSymbol('proto.gsdk.user.GetPINHashWithKeyRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetPartialRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetPartialResponse', null, global);
goog.exportSymbol('proto.gsdk.user.GetRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetResponse', null, global);
goog.exportSymbol('proto.gsdk.user.GetStatisticRequest', null, global);
goog.exportSymbol('proto.gsdk.user.GetStatisticResponse', null, global);
goog.exportSymbol('proto.gsdk.user.InfoMask', null, global);
goog.exportSymbol('proto.gsdk.user.SecurityLevel', null, global);
goog.exportSymbol('proto.gsdk.user.SetAccessGroupMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.user.SetAccessGroupMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.user.SetAccessGroupRequest', null, global);
goog.exportSymbol('proto.gsdk.user.SetAccessGroupResponse', null, global);
goog.exportSymbol('proto.gsdk.user.SetCardMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.user.SetCardMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.user.SetCardRequest', null, global);
goog.exportSymbol('proto.gsdk.user.SetCardResponse', null, global);
goog.exportSymbol('proto.gsdk.user.SetFaceMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.user.SetFaceMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.user.SetFaceRequest', null, global);
goog.exportSymbol('proto.gsdk.user.SetFaceResponse', null, global);
goog.exportSymbol('proto.gsdk.user.SetFingerMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.user.SetFingerMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.user.SetFingerRequest', null, global);
goog.exportSymbol('proto.gsdk.user.SetFingerResponse', null, global);
goog.exportSymbol('proto.gsdk.user.SetJobCodeMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.user.SetJobCodeMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.user.SetJobCodeRequest', null, global);
goog.exportSymbol('proto.gsdk.user.SetJobCodeResponse', null, global);
goog.exportSymbol('proto.gsdk.user.UpdateMask', null, global);
goog.exportSymbol('proto.gsdk.user.UpdateMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.user.UpdateMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.user.UpdateRequest', null, global);
goog.exportSymbol('proto.gsdk.user.UpdateResponse', null, global);
goog.exportSymbol('proto.gsdk.user.UserAccessGroup', null, global);
goog.exportSymbol('proto.gsdk.user.UserCard', null, global);
goog.exportSymbol('proto.gsdk.user.UserFace', null, global);
goog.exportSymbol('proto.gsdk.user.UserFinger', null, global);
goog.exportSymbol('proto.gsdk.user.UserFlag', null, global);
goog.exportSymbol('proto.gsdk.user.UserHdr', null, global);
goog.exportSymbol('proto.gsdk.user.UserInfo', null, global);
goog.exportSymbol('proto.gsdk.user.UserJobCode', null, global);
goog.exportSymbol('proto.gsdk.user.UserSetting', null, global);
goog.exportSymbol('proto.gsdk.user.UserStatistic', null, global);
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
proto.gsdk.user.UserHdr = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.UserHdr, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UserHdr.displayName = 'proto.gsdk.user.UserHdr';
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
proto.gsdk.user.GetListRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.GetListRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetListRequest.displayName = 'proto.gsdk.user.GetListRequest';
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
proto.gsdk.user.GetListResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetListResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetListResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetListResponse.displayName = 'proto.gsdk.user.GetListResponse';
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
proto.gsdk.user.UserSetting = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.UserSetting, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UserSetting.displayName = 'proto.gsdk.user.UserSetting';
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
proto.gsdk.user.UserInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.UserInfo.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.UserInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UserInfo.displayName = 'proto.gsdk.user.UserInfo';
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
proto.gsdk.user.GetRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetRequest.displayName = 'proto.gsdk.user.GetRequest';
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
proto.gsdk.user.GetResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetResponse.displayName = 'proto.gsdk.user.GetResponse';
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
proto.gsdk.user.GetPartialRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetPartialRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetPartialRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetPartialRequest.displayName = 'proto.gsdk.user.GetPartialRequest';
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
proto.gsdk.user.GetPartialResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetPartialResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetPartialResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetPartialResponse.displayName = 'proto.gsdk.user.GetPartialResponse';
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
proto.gsdk.user.EnrollRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.EnrollRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.EnrollRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.EnrollRequest.displayName = 'proto.gsdk.user.EnrollRequest';
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
proto.gsdk.user.EnrollResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.EnrollResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.EnrollResponse.displayName = 'proto.gsdk.user.EnrollResponse';
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
proto.gsdk.user.EnrollMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.EnrollMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.EnrollMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.EnrollMultiRequest.displayName = 'proto.gsdk.user.EnrollMultiRequest';
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
proto.gsdk.user.EnrollMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.EnrollMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.EnrollMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.EnrollMultiResponse.displayName = 'proto.gsdk.user.EnrollMultiResponse';
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
proto.gsdk.user.UpdateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.UpdateRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.UpdateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UpdateRequest.displayName = 'proto.gsdk.user.UpdateRequest';
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
proto.gsdk.user.UpdateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.UpdateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UpdateResponse.displayName = 'proto.gsdk.user.UpdateResponse';
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
proto.gsdk.user.UpdateMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.UpdateMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.UpdateMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UpdateMultiRequest.displayName = 'proto.gsdk.user.UpdateMultiRequest';
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
proto.gsdk.user.UpdateMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.UpdateMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.UpdateMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UpdateMultiResponse.displayName = 'proto.gsdk.user.UpdateMultiResponse';
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
proto.gsdk.user.DeleteRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.DeleteRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.DeleteRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.DeleteRequest.displayName = 'proto.gsdk.user.DeleteRequest';
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
proto.gsdk.user.DeleteResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.DeleteResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.DeleteResponse.displayName = 'proto.gsdk.user.DeleteResponse';
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
proto.gsdk.user.DeleteMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.DeleteMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.DeleteMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.DeleteMultiRequest.displayName = 'proto.gsdk.user.DeleteMultiRequest';
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
proto.gsdk.user.DeleteMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.DeleteMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.DeleteMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.DeleteMultiResponse.displayName = 'proto.gsdk.user.DeleteMultiResponse';
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
proto.gsdk.user.DeleteAllRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.DeleteAllRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.DeleteAllRequest.displayName = 'proto.gsdk.user.DeleteAllRequest';
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
proto.gsdk.user.DeleteAllResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.DeleteAllResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.DeleteAllResponse.displayName = 'proto.gsdk.user.DeleteAllResponse';
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
proto.gsdk.user.DeleteAllMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.DeleteAllMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.DeleteAllMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.DeleteAllMultiRequest.displayName = 'proto.gsdk.user.DeleteAllMultiRequest';
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
proto.gsdk.user.DeleteAllMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.DeleteAllMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.DeleteAllMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.DeleteAllMultiResponse.displayName = 'proto.gsdk.user.DeleteAllMultiResponse';
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
proto.gsdk.user.UserCard = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.UserCard.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.UserCard, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UserCard.displayName = 'proto.gsdk.user.UserCard';
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
proto.gsdk.user.GetCardRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetCardRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetCardRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetCardRequest.displayName = 'proto.gsdk.user.GetCardRequest';
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
proto.gsdk.user.GetCardResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetCardResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetCardResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetCardResponse.displayName = 'proto.gsdk.user.GetCardResponse';
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
proto.gsdk.user.SetCardRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetCardRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetCardRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetCardRequest.displayName = 'proto.gsdk.user.SetCardRequest';
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
proto.gsdk.user.SetCardResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.SetCardResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetCardResponse.displayName = 'proto.gsdk.user.SetCardResponse';
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
proto.gsdk.user.SetCardMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetCardMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetCardMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetCardMultiRequest.displayName = 'proto.gsdk.user.SetCardMultiRequest';
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
proto.gsdk.user.SetCardMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetCardMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetCardMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetCardMultiResponse.displayName = 'proto.gsdk.user.SetCardMultiResponse';
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
proto.gsdk.user.UserFinger = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.UserFinger.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.UserFinger, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UserFinger.displayName = 'proto.gsdk.user.UserFinger';
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
proto.gsdk.user.GetFingerRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetFingerRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetFingerRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetFingerRequest.displayName = 'proto.gsdk.user.GetFingerRequest';
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
proto.gsdk.user.GetFingerResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetFingerResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetFingerResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetFingerResponse.displayName = 'proto.gsdk.user.GetFingerResponse';
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
proto.gsdk.user.SetFingerRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetFingerRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetFingerRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetFingerRequest.displayName = 'proto.gsdk.user.SetFingerRequest';
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
proto.gsdk.user.SetFingerResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.SetFingerResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetFingerResponse.displayName = 'proto.gsdk.user.SetFingerResponse';
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
proto.gsdk.user.SetFingerMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetFingerMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetFingerMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetFingerMultiRequest.displayName = 'proto.gsdk.user.SetFingerMultiRequest';
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
proto.gsdk.user.SetFingerMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetFingerMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetFingerMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetFingerMultiResponse.displayName = 'proto.gsdk.user.SetFingerMultiResponse';
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
proto.gsdk.user.UserFace = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.UserFace.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.UserFace, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UserFace.displayName = 'proto.gsdk.user.UserFace';
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
proto.gsdk.user.GetFaceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetFaceRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetFaceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetFaceRequest.displayName = 'proto.gsdk.user.GetFaceRequest';
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
proto.gsdk.user.GetFaceResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetFaceResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetFaceResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetFaceResponse.displayName = 'proto.gsdk.user.GetFaceResponse';
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
proto.gsdk.user.SetFaceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetFaceRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetFaceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetFaceRequest.displayName = 'proto.gsdk.user.SetFaceRequest';
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
proto.gsdk.user.SetFaceResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.SetFaceResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetFaceResponse.displayName = 'proto.gsdk.user.SetFaceResponse';
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
proto.gsdk.user.SetFaceMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetFaceMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetFaceMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetFaceMultiRequest.displayName = 'proto.gsdk.user.SetFaceMultiRequest';
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
proto.gsdk.user.SetFaceMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetFaceMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetFaceMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetFaceMultiResponse.displayName = 'proto.gsdk.user.SetFaceMultiResponse';
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
proto.gsdk.user.UserAccessGroup = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.UserAccessGroup.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.UserAccessGroup, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UserAccessGroup.displayName = 'proto.gsdk.user.UserAccessGroup';
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
proto.gsdk.user.GetAccessGroupRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetAccessGroupRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetAccessGroupRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetAccessGroupRequest.displayName = 'proto.gsdk.user.GetAccessGroupRequest';
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
proto.gsdk.user.GetAccessGroupResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetAccessGroupResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetAccessGroupResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetAccessGroupResponse.displayName = 'proto.gsdk.user.GetAccessGroupResponse';
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
proto.gsdk.user.SetAccessGroupRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetAccessGroupRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetAccessGroupRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetAccessGroupRequest.displayName = 'proto.gsdk.user.SetAccessGroupRequest';
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
proto.gsdk.user.SetAccessGroupResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.SetAccessGroupResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetAccessGroupResponse.displayName = 'proto.gsdk.user.SetAccessGroupResponse';
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
proto.gsdk.user.SetAccessGroupMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetAccessGroupMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetAccessGroupMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetAccessGroupMultiRequest.displayName = 'proto.gsdk.user.SetAccessGroupMultiRequest';
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
proto.gsdk.user.SetAccessGroupMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetAccessGroupMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetAccessGroupMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetAccessGroupMultiResponse.displayName = 'proto.gsdk.user.SetAccessGroupMultiResponse';
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
proto.gsdk.user.UserJobCode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.UserJobCode.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.UserJobCode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UserJobCode.displayName = 'proto.gsdk.user.UserJobCode';
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
proto.gsdk.user.GetJobCodeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetJobCodeRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetJobCodeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetJobCodeRequest.displayName = 'proto.gsdk.user.GetJobCodeRequest';
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
proto.gsdk.user.GetJobCodeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.GetJobCodeResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.GetJobCodeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetJobCodeResponse.displayName = 'proto.gsdk.user.GetJobCodeResponse';
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
proto.gsdk.user.SetJobCodeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetJobCodeRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetJobCodeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetJobCodeRequest.displayName = 'proto.gsdk.user.SetJobCodeRequest';
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
proto.gsdk.user.SetJobCodeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.SetJobCodeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetJobCodeResponse.displayName = 'proto.gsdk.user.SetJobCodeResponse';
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
proto.gsdk.user.SetJobCodeMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetJobCodeMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetJobCodeMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetJobCodeMultiRequest.displayName = 'proto.gsdk.user.SetJobCodeMultiRequest';
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
proto.gsdk.user.SetJobCodeMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.user.SetJobCodeMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.user.SetJobCodeMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.SetJobCodeMultiResponse.displayName = 'proto.gsdk.user.SetJobCodeMultiResponse';
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
proto.gsdk.user.GetPINHashRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.GetPINHashRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetPINHashRequest.displayName = 'proto.gsdk.user.GetPINHashRequest';
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
proto.gsdk.user.GetPINHashResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.GetPINHashResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetPINHashResponse.displayName = 'proto.gsdk.user.GetPINHashResponse';
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
proto.gsdk.user.GetPINHashWithKeyRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.GetPINHashWithKeyRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetPINHashWithKeyRequest.displayName = 'proto.gsdk.user.GetPINHashWithKeyRequest';
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
proto.gsdk.user.GetStatisticRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.GetStatisticRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetStatisticRequest.displayName = 'proto.gsdk.user.GetStatisticRequest';
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
proto.gsdk.user.UserStatistic = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.UserStatistic, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.UserStatistic.displayName = 'proto.gsdk.user.UserStatistic';
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
proto.gsdk.user.GetStatisticResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.user.GetStatisticResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.user.GetStatisticResponse.displayName = 'proto.gsdk.user.GetStatisticResponse';
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
proto.gsdk.user.UserHdr.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UserHdr.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UserHdr} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserHdr.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userflag: jspb.Message.getFieldWithDefault(msg, 2, 0),
    numofcard: jspb.Message.getFieldWithDefault(msg, 3, 0),
    numoffinger: jspb.Message.getFieldWithDefault(msg, 4, 0),
    numofface: jspb.Message.getFieldWithDefault(msg, 5, 0),
    authgroupid: jspb.Message.getFieldWithDefault(msg, 6, 0),
    updatemask: jspb.Message.getFieldWithDefault(msg, 7, 0)
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
 * @return {!proto.gsdk.user.UserHdr}
 */
proto.gsdk.user.UserHdr.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UserHdr;
  return proto.gsdk.user.UserHdr.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UserHdr} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UserHdr}
 */
proto.gsdk.user.UserHdr.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setUserflag(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumofcard(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumoffinger(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumofface(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setAuthgroupid(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setUpdatemask(value);
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
proto.gsdk.user.UserHdr.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UserHdr.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UserHdr} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserHdr.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserflag();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getNumofcard();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getNumoffinger();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getNumofface();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getAuthgroupid();
  if (f !== 0) {
    writer.writeUint32(
      6,
      f
    );
  }
  f = message.getUpdatemask();
  if (f !== 0) {
    writer.writeUint32(
      7,
      f
    );
  }
};


/**
 * optional string ID = 1;
 * @return {string}
 */
proto.gsdk.user.UserHdr.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.user.UserHdr} returns this
 */
proto.gsdk.user.UserHdr.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 userFlag = 2;
 * @return {number}
 */
proto.gsdk.user.UserHdr.prototype.getUserflag = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserHdr} returns this
 */
proto.gsdk.user.UserHdr.prototype.setUserflag = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 numOfCard = 3;
 * @return {number}
 */
proto.gsdk.user.UserHdr.prototype.getNumofcard = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserHdr} returns this
 */
proto.gsdk.user.UserHdr.prototype.setNumofcard = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 numOfFinger = 4;
 * @return {number}
 */
proto.gsdk.user.UserHdr.prototype.getNumoffinger = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserHdr} returns this
 */
proto.gsdk.user.UserHdr.prototype.setNumoffinger = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 numOfFace = 5;
 * @return {number}
 */
proto.gsdk.user.UserHdr.prototype.getNumofface = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserHdr} returns this
 */
proto.gsdk.user.UserHdr.prototype.setNumofface = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional uint32 authGroupID = 6;
 * @return {number}
 */
proto.gsdk.user.UserHdr.prototype.getAuthgroupid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserHdr} returns this
 */
proto.gsdk.user.UserHdr.prototype.setAuthgroupid = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional uint32 updateMask = 7;
 * @return {number}
 */
proto.gsdk.user.UserHdr.prototype.getUpdatemask = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserHdr} returns this
 */
proto.gsdk.user.UserHdr.prototype.setUpdatemask = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
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
proto.gsdk.user.GetListRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetListRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetListRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetListRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.GetListRequest}
 */
proto.gsdk.user.GetListRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetListRequest;
  return proto.gsdk.user.GetListRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetListRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetListRequest}
 */
proto.gsdk.user.GetListRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.GetListRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetListRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetListRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetListRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.GetListRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.GetListRequest} returns this
 */
proto.gsdk.user.GetListRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetListResponse.repeatedFields_ = [1];



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
proto.gsdk.user.GetListResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetListResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetListResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetListResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    hdrsList: jspb.Message.toObjectList(msg.getHdrsList(),
    proto.gsdk.user.UserHdr.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.GetListResponse}
 */
proto.gsdk.user.GetListResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetListResponse;
  return proto.gsdk.user.GetListResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetListResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetListResponse}
 */
proto.gsdk.user.GetListResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.user.UserHdr;
      reader.readMessage(value,proto.gsdk.user.UserHdr.deserializeBinaryFromReader);
      msg.addHdrs(value);
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
proto.gsdk.user.GetListResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetListResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetListResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetListResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHdrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gsdk.user.UserHdr.serializeBinaryToWriter
    );
  }
};


/**
 * repeated UserHdr hdrs = 1;
 * @return {!Array<!proto.gsdk.user.UserHdr>}
 */
proto.gsdk.user.GetListResponse.prototype.getHdrsList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserHdr>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserHdr, 1));
};


/**
 * @param {!Array<!proto.gsdk.user.UserHdr>} value
 * @return {!proto.gsdk.user.GetListResponse} returns this
*/
proto.gsdk.user.GetListResponse.prototype.setHdrsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.user.UserHdr=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserHdr}
 */
proto.gsdk.user.GetListResponse.prototype.addHdrs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.user.UserHdr, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetListResponse} returns this
 */
proto.gsdk.user.GetListResponse.prototype.clearHdrsList = function() {
  return this.setHdrsList([]);
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
proto.gsdk.user.UserSetting.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UserSetting.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UserSetting} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserSetting.toObject = function(includeInstance, msg) {
  var f, obj = {
    starttime: jspb.Message.getFieldWithDefault(msg, 1, 0),
    endtime: jspb.Message.getFieldWithDefault(msg, 2, 0),
    biometricauthmode: jspb.Message.getFieldWithDefault(msg, 3, 0),
    cardauthmode: jspb.Message.getFieldWithDefault(msg, 4, 0),
    idauthmode: jspb.Message.getFieldWithDefault(msg, 5, 0),
    securitylevel: jspb.Message.getFieldWithDefault(msg, 6, 0),
    faceauthextmode: jspb.Message.getFieldWithDefault(msg, 7, 0),
    fingerauthextmode: jspb.Message.getFieldWithDefault(msg, 8, 0),
    cardauthextmode: jspb.Message.getFieldWithDefault(msg, 9, 0),
    idauthextmode: jspb.Message.getFieldWithDefault(msg, 10, 0)
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
 * @return {!proto.gsdk.user.UserSetting}
 */
proto.gsdk.user.UserSetting.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UserSetting;
  return proto.gsdk.user.UserSetting.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UserSetting} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UserSetting}
 */
proto.gsdk.user.UserSetting.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStarttime(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setEndtime(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBiometricauthmode(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCardauthmode(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setIdauthmode(value);
      break;
    case 6:
      var value = /** @type {!proto.gsdk.user.SecurityLevel} */ (reader.readEnum());
      msg.setSecuritylevel(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setFaceauthextmode(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setFingerauthextmode(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCardauthextmode(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setIdauthextmode(value);
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
proto.gsdk.user.UserSetting.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UserSetting.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UserSetting} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserSetting.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStarttime();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getEndtime();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getBiometricauthmode();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getCardauthmode();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = message.getIdauthmode();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
  f = message.getSecuritylevel();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
  f = message.getFaceauthextmode();
  if (f !== 0) {
    writer.writeUint32(
      7,
      f
    );
  }
  f = message.getFingerauthextmode();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
  f = message.getCardauthextmode();
  if (f !== 0) {
    writer.writeUint32(
      9,
      f
    );
  }
  f = message.getIdauthextmode();
  if (f !== 0) {
    writer.writeUint32(
      10,
      f
    );
  }
};


/**
 * optional uint32 startTime = 1;
 * @return {number}
 */
proto.gsdk.user.UserSetting.prototype.getStarttime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserSetting} returns this
 */
proto.gsdk.user.UserSetting.prototype.setStarttime = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint32 endTime = 2;
 * @return {number}
 */
proto.gsdk.user.UserSetting.prototype.getEndtime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserSetting} returns this
 */
proto.gsdk.user.UserSetting.prototype.setEndtime = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional uint32 biometricAuthMode = 3;
 * @return {number}
 */
proto.gsdk.user.UserSetting.prototype.getBiometricauthmode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserSetting} returns this
 */
proto.gsdk.user.UserSetting.prototype.setBiometricauthmode = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional uint32 cardAuthMode = 4;
 * @return {number}
 */
proto.gsdk.user.UserSetting.prototype.getCardauthmode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserSetting} returns this
 */
proto.gsdk.user.UserSetting.prototype.setCardauthmode = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint32 IDAuthMode = 5;
 * @return {number}
 */
proto.gsdk.user.UserSetting.prototype.getIdauthmode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserSetting} returns this
 */
proto.gsdk.user.UserSetting.prototype.setIdauthmode = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional SecurityLevel securityLevel = 6;
 * @return {!proto.gsdk.user.SecurityLevel}
 */
proto.gsdk.user.UserSetting.prototype.getSecuritylevel = function() {
  return /** @type {!proto.gsdk.user.SecurityLevel} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.gsdk.user.SecurityLevel} value
 * @return {!proto.gsdk.user.UserSetting} returns this
 */
proto.gsdk.user.UserSetting.prototype.setSecuritylevel = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};


/**
 * optional uint32 faceAuthExtMode = 7;
 * @return {number}
 */
proto.gsdk.user.UserSetting.prototype.getFaceauthextmode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserSetting} returns this
 */
proto.gsdk.user.UserSetting.prototype.setFaceauthextmode = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional uint32 fingerAuthExtMode = 8;
 * @return {number}
 */
proto.gsdk.user.UserSetting.prototype.getFingerauthextmode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserSetting} returns this
 */
proto.gsdk.user.UserSetting.prototype.setFingerauthextmode = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional uint32 cardAuthExtMode = 9;
 * @return {number}
 */
proto.gsdk.user.UserSetting.prototype.getCardauthextmode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserSetting} returns this
 */
proto.gsdk.user.UserSetting.prototype.setCardauthextmode = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional uint32 IDAuthExtMode = 10;
 * @return {number}
 */
proto.gsdk.user.UserSetting.prototype.getIdauthextmode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserSetting} returns this
 */
proto.gsdk.user.UserSetting.prototype.setIdauthextmode = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.UserInfo.repeatedFields_ = [4,5,6,7,8];



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
proto.gsdk.user.UserInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UserInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UserInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    hdr: (f = msg.getHdr()) && proto.gsdk.user.UserHdr.toObject(includeInstance, f),
    setting: (f = msg.getSetting()) && proto.gsdk.user.UserSetting.toObject(includeInstance, f),
    name: jspb.Message.getFieldWithDefault(msg, 3, ""),
    cardsList: jspb.Message.toObjectList(msg.getCardsList(),
    card_pb.CSNCardData.toObject, includeInstance),
    fingersList: jspb.Message.toObjectList(msg.getFingersList(),
    finger_pb.FingerData.toObject, includeInstance),
    facesList: jspb.Message.toObjectList(msg.getFacesList(),
    face_pb.FaceData.toObject, includeInstance),
    accessgroupidsList: (f = jspb.Message.getRepeatedField(msg, 7)) == null ? undefined : f,
    jobcodesList: jspb.Message.toObjectList(msg.getJobcodesList(),
    tna_pb.JobCode.toObject, includeInstance),
    pin: msg.getPin_asB64(),
    photo: msg.getPhoto_asB64()
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
 * @return {!proto.gsdk.user.UserInfo}
 */
proto.gsdk.user.UserInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UserInfo;
  return proto.gsdk.user.UserInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UserInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UserInfo}
 */
proto.gsdk.user.UserInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.user.UserHdr;
      reader.readMessage(value,proto.gsdk.user.UserHdr.deserializeBinaryFromReader);
      msg.setHdr(value);
      break;
    case 2:
      var value = new proto.gsdk.user.UserSetting;
      reader.readMessage(value,proto.gsdk.user.UserSetting.deserializeBinaryFromReader);
      msg.setSetting(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 4:
      var value = new card_pb.CSNCardData;
      reader.readMessage(value,card_pb.CSNCardData.deserializeBinaryFromReader);
      msg.addCards(value);
      break;
    case 5:
      var value = new finger_pb.FingerData;
      reader.readMessage(value,finger_pb.FingerData.deserializeBinaryFromReader);
      msg.addFingers(value);
      break;
    case 6:
      var value = new face_pb.FaceData;
      reader.readMessage(value,face_pb.FaceData.deserializeBinaryFromReader);
      msg.addFaces(value);
      break;
    case 7:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addAccessgroupids(values[i]);
      }
      break;
    case 8:
      var value = new tna_pb.JobCode;
      reader.readMessage(value,tna_pb.JobCode.deserializeBinaryFromReader);
      msg.addJobcodes(value);
      break;
    case 9:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPin(value);
      break;
    case 10:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPhoto(value);
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
proto.gsdk.user.UserInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UserInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UserInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHdr();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gsdk.user.UserHdr.serializeBinaryToWriter
    );
  }
  f = message.getSetting();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.user.UserSetting.serializeBinaryToWriter
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCardsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      card_pb.CSNCardData.serializeBinaryToWriter
    );
  }
  f = message.getFingersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      finger_pb.FingerData.serializeBinaryToWriter
    );
  }
  f = message.getFacesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      face_pb.FaceData.serializeBinaryToWriter
    );
  }
  f = message.getAccessgroupidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      7,
      f
    );
  }
  f = message.getJobcodesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      tna_pb.JobCode.serializeBinaryToWriter
    );
  }
  f = message.getPin_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      9,
      f
    );
  }
  f = message.getPhoto_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      10,
      f
    );
  }
};


/**
 * optional UserHdr hdr = 1;
 * @return {?proto.gsdk.user.UserHdr}
 */
proto.gsdk.user.UserInfo.prototype.getHdr = function() {
  return /** @type{?proto.gsdk.user.UserHdr} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.user.UserHdr, 1));
};


/**
 * @param {?proto.gsdk.user.UserHdr|undefined} value
 * @return {!proto.gsdk.user.UserInfo} returns this
*/
proto.gsdk.user.UserInfo.prototype.setHdr = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.clearHdr = function() {
  return this.setHdr(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.user.UserInfo.prototype.hasHdr = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional UserSetting setting = 2;
 * @return {?proto.gsdk.user.UserSetting}
 */
proto.gsdk.user.UserInfo.prototype.getSetting = function() {
  return /** @type{?proto.gsdk.user.UserSetting} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.user.UserSetting, 2));
};


/**
 * @param {?proto.gsdk.user.UserSetting|undefined} value
 * @return {!proto.gsdk.user.UserInfo} returns this
*/
proto.gsdk.user.UserInfo.prototype.setSetting = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.clearSetting = function() {
  return this.setSetting(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.user.UserInfo.prototype.hasSetting = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string name = 3;
 * @return {string}
 */
proto.gsdk.user.UserInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated gsdk.card.CSNCardData cards = 4;
 * @return {!Array<!proto.gsdk.card.CSNCardData>}
 */
proto.gsdk.user.UserInfo.prototype.getCardsList = function() {
  return /** @type{!Array<!proto.gsdk.card.CSNCardData>} */ (
    jspb.Message.getRepeatedWrapperField(this, card_pb.CSNCardData, 4));
};


/**
 * @param {!Array<!proto.gsdk.card.CSNCardData>} value
 * @return {!proto.gsdk.user.UserInfo} returns this
*/
proto.gsdk.user.UserInfo.prototype.setCardsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.gsdk.card.CSNCardData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.CSNCardData}
 */
proto.gsdk.user.UserInfo.prototype.addCards = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.gsdk.card.CSNCardData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.clearCardsList = function() {
  return this.setCardsList([]);
};


/**
 * repeated gsdk.finger.FingerData fingers = 5;
 * @return {!Array<!proto.gsdk.finger.FingerData>}
 */
proto.gsdk.user.UserInfo.prototype.getFingersList = function() {
  return /** @type{!Array<!proto.gsdk.finger.FingerData>} */ (
    jspb.Message.getRepeatedWrapperField(this, finger_pb.FingerData, 5));
};


/**
 * @param {!Array<!proto.gsdk.finger.FingerData>} value
 * @return {!proto.gsdk.user.UserInfo} returns this
*/
proto.gsdk.user.UserInfo.prototype.setFingersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.gsdk.finger.FingerData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.finger.FingerData}
 */
proto.gsdk.user.UserInfo.prototype.addFingers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.gsdk.finger.FingerData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.clearFingersList = function() {
  return this.setFingersList([]);
};


/**
 * repeated gsdk.face.FaceData faces = 6;
 * @return {!Array<!proto.gsdk.face.FaceData>}
 */
proto.gsdk.user.UserInfo.prototype.getFacesList = function() {
  return /** @type{!Array<!proto.gsdk.face.FaceData>} */ (
    jspb.Message.getRepeatedWrapperField(this, face_pb.FaceData, 6));
};


/**
 * @param {!Array<!proto.gsdk.face.FaceData>} value
 * @return {!proto.gsdk.user.UserInfo} returns this
*/
proto.gsdk.user.UserInfo.prototype.setFacesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.gsdk.face.FaceData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.face.FaceData}
 */
proto.gsdk.user.UserInfo.prototype.addFaces = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.gsdk.face.FaceData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.clearFacesList = function() {
  return this.setFacesList([]);
};


/**
 * repeated uint32 accessGroupIDs = 7;
 * @return {!Array<number>}
 */
proto.gsdk.user.UserInfo.prototype.getAccessgroupidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 7));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.setAccessgroupidsList = function(value) {
  return jspb.Message.setField(this, 7, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.addAccessgroupids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 7, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.clearAccessgroupidsList = function() {
  return this.setAccessgroupidsList([]);
};


/**
 * repeated gsdk.tna.JobCode jobCodes = 8;
 * @return {!Array<!proto.gsdk.tna.JobCode>}
 */
proto.gsdk.user.UserInfo.prototype.getJobcodesList = function() {
  return /** @type{!Array<!proto.gsdk.tna.JobCode>} */ (
    jspb.Message.getRepeatedWrapperField(this, tna_pb.JobCode, 8));
};


/**
 * @param {!Array<!proto.gsdk.tna.JobCode>} value
 * @return {!proto.gsdk.user.UserInfo} returns this
*/
proto.gsdk.user.UserInfo.prototype.setJobcodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.gsdk.tna.JobCode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.tna.JobCode}
 */
proto.gsdk.user.UserInfo.prototype.addJobcodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.gsdk.tna.JobCode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.clearJobcodesList = function() {
  return this.setJobcodesList([]);
};


/**
 * optional bytes PIN = 9;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.user.UserInfo.prototype.getPin = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * optional bytes PIN = 9;
 * This is a type-conversion wrapper around `getPin()`
 * @return {string}
 */
proto.gsdk.user.UserInfo.prototype.getPin_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPin()));
};


/**
 * optional bytes PIN = 9;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPin()`
 * @return {!Uint8Array}
 */
proto.gsdk.user.UserInfo.prototype.getPin_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPin()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.setPin = function(value) {
  return jspb.Message.setProto3BytesField(this, 9, value);
};


/**
 * optional bytes photo = 10;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.user.UserInfo.prototype.getPhoto = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * optional bytes photo = 10;
 * This is a type-conversion wrapper around `getPhoto()`
 * @return {string}
 */
proto.gsdk.user.UserInfo.prototype.getPhoto_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPhoto()));
};


/**
 * optional bytes photo = 10;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPhoto()`
 * @return {!Uint8Array}
 */
proto.gsdk.user.UserInfo.prototype.getPhoto_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPhoto()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.user.UserInfo} returns this
 */
proto.gsdk.user.UserInfo.prototype.setPhoto = function(value) {
  return jspb.Message.setProto3BytesField(this, 10, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetRequest.repeatedFields_ = [2];



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
proto.gsdk.user.GetRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    useridsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.gsdk.user.GetRequest}
 */
proto.gsdk.user.GetRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetRequest;
  return proto.gsdk.user.GetRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetRequest}
 */
proto.gsdk.user.GetRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.addUserids(value);
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
proto.gsdk.user.GetRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUseridsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.GetRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.GetRequest} returns this
 */
proto.gsdk.user.GetRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated string userIDs = 2;
 * @return {!Array<string>}
 */
proto.gsdk.user.GetRequest.prototype.getUseridsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gsdk.user.GetRequest} returns this
 */
proto.gsdk.user.GetRequest.prototype.setUseridsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.GetRequest} returns this
 */
proto.gsdk.user.GetRequest.prototype.addUserids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetRequest} returns this
 */
proto.gsdk.user.GetRequest.prototype.clearUseridsList = function() {
  return this.setUseridsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetResponse.repeatedFields_ = [1];



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
proto.gsdk.user.GetResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.gsdk.user.UserInfo.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.GetResponse}
 */
proto.gsdk.user.GetResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetResponse;
  return proto.gsdk.user.GetResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetResponse}
 */
proto.gsdk.user.GetResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.user.UserInfo;
      reader.readMessage(value,proto.gsdk.user.UserInfo.deserializeBinaryFromReader);
      msg.addUsers(value);
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
proto.gsdk.user.GetResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gsdk.user.UserInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated UserInfo users = 1;
 * @return {!Array<!proto.gsdk.user.UserInfo>}
 */
proto.gsdk.user.GetResponse.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserInfo, 1));
};


/**
 * @param {!Array<!proto.gsdk.user.UserInfo>} value
 * @return {!proto.gsdk.user.GetResponse} returns this
*/
proto.gsdk.user.GetResponse.prototype.setUsersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.user.UserInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserInfo}
 */
proto.gsdk.user.GetResponse.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.user.UserInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetResponse} returns this
 */
proto.gsdk.user.GetResponse.prototype.clearUsersList = function() {
  return this.setUsersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetPartialRequest.repeatedFields_ = [2];



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
proto.gsdk.user.GetPartialRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetPartialRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetPartialRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetPartialRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    useridsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f,
    infomask: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * @return {!proto.gsdk.user.GetPartialRequest}
 */
proto.gsdk.user.GetPartialRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetPartialRequest;
  return proto.gsdk.user.GetPartialRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetPartialRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetPartialRequest}
 */
proto.gsdk.user.GetPartialRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.addUserids(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setInfomask(value);
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
proto.gsdk.user.GetPartialRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetPartialRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetPartialRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetPartialRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUseridsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
  f = message.getInfomask();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.GetPartialRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.GetPartialRequest} returns this
 */
proto.gsdk.user.GetPartialRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated string userIDs = 2;
 * @return {!Array<string>}
 */
proto.gsdk.user.GetPartialRequest.prototype.getUseridsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gsdk.user.GetPartialRequest} returns this
 */
proto.gsdk.user.GetPartialRequest.prototype.setUseridsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.GetPartialRequest} returns this
 */
proto.gsdk.user.GetPartialRequest.prototype.addUserids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetPartialRequest} returns this
 */
proto.gsdk.user.GetPartialRequest.prototype.clearUseridsList = function() {
  return this.setUseridsList([]);
};


/**
 * optional uint32 infoMask = 3;
 * @return {number}
 */
proto.gsdk.user.GetPartialRequest.prototype.getInfomask = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.GetPartialRequest} returns this
 */
proto.gsdk.user.GetPartialRequest.prototype.setInfomask = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetPartialResponse.repeatedFields_ = [1];



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
proto.gsdk.user.GetPartialResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetPartialResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetPartialResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetPartialResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.gsdk.user.UserInfo.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.GetPartialResponse}
 */
proto.gsdk.user.GetPartialResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetPartialResponse;
  return proto.gsdk.user.GetPartialResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetPartialResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetPartialResponse}
 */
proto.gsdk.user.GetPartialResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.user.UserInfo;
      reader.readMessage(value,proto.gsdk.user.UserInfo.deserializeBinaryFromReader);
      msg.addUsers(value);
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
proto.gsdk.user.GetPartialResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetPartialResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetPartialResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetPartialResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gsdk.user.UserInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated UserInfo users = 1;
 * @return {!Array<!proto.gsdk.user.UserInfo>}
 */
proto.gsdk.user.GetPartialResponse.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserInfo, 1));
};


/**
 * @param {!Array<!proto.gsdk.user.UserInfo>} value
 * @return {!proto.gsdk.user.GetPartialResponse} returns this
*/
proto.gsdk.user.GetPartialResponse.prototype.setUsersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.user.UserInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserInfo}
 */
proto.gsdk.user.GetPartialResponse.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.user.UserInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetPartialResponse} returns this
 */
proto.gsdk.user.GetPartialResponse.prototype.clearUsersList = function() {
  return this.setUsersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.EnrollRequest.repeatedFields_ = [2];



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
proto.gsdk.user.EnrollRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.EnrollRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.EnrollRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.EnrollRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.gsdk.user.UserInfo.toObject, includeInstance),
    overwrite: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
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
 * @return {!proto.gsdk.user.EnrollRequest}
 */
proto.gsdk.user.EnrollRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.EnrollRequest;
  return proto.gsdk.user.EnrollRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.EnrollRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.EnrollRequest}
 */
proto.gsdk.user.EnrollRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserInfo;
      reader.readMessage(value,proto.gsdk.user.UserInfo.deserializeBinaryFromReader);
      msg.addUsers(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setOverwrite(value);
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
proto.gsdk.user.EnrollRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.EnrollRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.EnrollRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.EnrollRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserInfo.serializeBinaryToWriter
    );
  }
  f = message.getOverwrite();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.EnrollRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.EnrollRequest} returns this
 */
proto.gsdk.user.EnrollRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated UserInfo users = 2;
 * @return {!Array<!proto.gsdk.user.UserInfo>}
 */
proto.gsdk.user.EnrollRequest.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserInfo, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserInfo>} value
 * @return {!proto.gsdk.user.EnrollRequest} returns this
*/
proto.gsdk.user.EnrollRequest.prototype.setUsersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserInfo}
 */
proto.gsdk.user.EnrollRequest.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.EnrollRequest} returns this
 */
proto.gsdk.user.EnrollRequest.prototype.clearUsersList = function() {
  return this.setUsersList([]);
};


/**
 * optional bool overwrite = 3;
 * @return {boolean}
 */
proto.gsdk.user.EnrollRequest.prototype.getOverwrite = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.user.EnrollRequest} returns this
 */
proto.gsdk.user.EnrollRequest.prototype.setOverwrite = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
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
proto.gsdk.user.EnrollResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.EnrollResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.EnrollResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.EnrollResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.EnrollResponse}
 */
proto.gsdk.user.EnrollResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.EnrollResponse;
  return proto.gsdk.user.EnrollResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.EnrollResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.EnrollResponse}
 */
proto.gsdk.user.EnrollResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.EnrollResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.EnrollResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.EnrollResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.EnrollResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.EnrollMultiRequest.repeatedFields_ = [1,2];



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
proto.gsdk.user.EnrollMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.EnrollMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.EnrollMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.EnrollMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.gsdk.user.UserInfo.toObject, includeInstance),
    overwrite: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
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
 * @return {!proto.gsdk.user.EnrollMultiRequest}
 */
proto.gsdk.user.EnrollMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.EnrollMultiRequest;
  return proto.gsdk.user.EnrollMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.EnrollMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.EnrollMultiRequest}
 */
proto.gsdk.user.EnrollMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserInfo;
      reader.readMessage(value,proto.gsdk.user.UserInfo.deserializeBinaryFromReader);
      msg.addUsers(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setOverwrite(value);
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
proto.gsdk.user.EnrollMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.EnrollMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.EnrollMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.EnrollMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserInfo.serializeBinaryToWriter
    );
  }
  f = message.getOverwrite();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.user.EnrollMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.EnrollMultiRequest} returns this
 */
proto.gsdk.user.EnrollMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.EnrollMultiRequest} returns this
 */
proto.gsdk.user.EnrollMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.EnrollMultiRequest} returns this
 */
proto.gsdk.user.EnrollMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * repeated UserInfo users = 2;
 * @return {!Array<!proto.gsdk.user.UserInfo>}
 */
proto.gsdk.user.EnrollMultiRequest.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserInfo, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserInfo>} value
 * @return {!proto.gsdk.user.EnrollMultiRequest} returns this
*/
proto.gsdk.user.EnrollMultiRequest.prototype.setUsersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserInfo}
 */
proto.gsdk.user.EnrollMultiRequest.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.EnrollMultiRequest} returns this
 */
proto.gsdk.user.EnrollMultiRequest.prototype.clearUsersList = function() {
  return this.setUsersList([]);
};


/**
 * optional bool overwrite = 3;
 * @return {boolean}
 */
proto.gsdk.user.EnrollMultiRequest.prototype.getOverwrite = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.user.EnrollMultiRequest} returns this
 */
proto.gsdk.user.EnrollMultiRequest.prototype.setOverwrite = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.EnrollMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.user.EnrollMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.EnrollMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.EnrollMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.EnrollMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.EnrollMultiResponse}
 */
proto.gsdk.user.EnrollMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.EnrollMultiResponse;
  return proto.gsdk.user.EnrollMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.EnrollMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.EnrollMultiResponse}
 */
proto.gsdk.user.EnrollMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.EnrollMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.EnrollMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.EnrollMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.EnrollMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.EnrollMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.user.EnrollMultiResponse} returns this
*/
proto.gsdk.user.EnrollMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.user.EnrollMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.EnrollMultiResponse} returns this
 */
proto.gsdk.user.EnrollMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.UpdateRequest.repeatedFields_ = [2];



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
proto.gsdk.user.UpdateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UpdateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UpdateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UpdateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.gsdk.user.UserInfo.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.UpdateRequest}
 */
proto.gsdk.user.UpdateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UpdateRequest;
  return proto.gsdk.user.UpdateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UpdateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UpdateRequest}
 */
proto.gsdk.user.UpdateRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserInfo;
      reader.readMessage(value,proto.gsdk.user.UserInfo.deserializeBinaryFromReader);
      msg.addUsers(value);
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
proto.gsdk.user.UpdateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UpdateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UpdateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UpdateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.UpdateRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UpdateRequest} returns this
 */
proto.gsdk.user.UpdateRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated UserInfo users = 2;
 * @return {!Array<!proto.gsdk.user.UserInfo>}
 */
proto.gsdk.user.UpdateRequest.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserInfo, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserInfo>} value
 * @return {!proto.gsdk.user.UpdateRequest} returns this
*/
proto.gsdk.user.UpdateRequest.prototype.setUsersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserInfo}
 */
proto.gsdk.user.UpdateRequest.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UpdateRequest} returns this
 */
proto.gsdk.user.UpdateRequest.prototype.clearUsersList = function() {
  return this.setUsersList([]);
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
proto.gsdk.user.UpdateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UpdateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UpdateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UpdateResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.UpdateResponse}
 */
proto.gsdk.user.UpdateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UpdateResponse;
  return proto.gsdk.user.UpdateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UpdateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UpdateResponse}
 */
proto.gsdk.user.UpdateResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.UpdateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UpdateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UpdateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UpdateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.UpdateMultiRequest.repeatedFields_ = [1,2];



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
proto.gsdk.user.UpdateMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UpdateMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UpdateMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UpdateMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.gsdk.user.UserInfo.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.UpdateMultiRequest}
 */
proto.gsdk.user.UpdateMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UpdateMultiRequest;
  return proto.gsdk.user.UpdateMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UpdateMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UpdateMultiRequest}
 */
proto.gsdk.user.UpdateMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserInfo;
      reader.readMessage(value,proto.gsdk.user.UserInfo.deserializeBinaryFromReader);
      msg.addUsers(value);
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
proto.gsdk.user.UpdateMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UpdateMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UpdateMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UpdateMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.user.UpdateMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.UpdateMultiRequest} returns this
 */
proto.gsdk.user.UpdateMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UpdateMultiRequest} returns this
 */
proto.gsdk.user.UpdateMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UpdateMultiRequest} returns this
 */
proto.gsdk.user.UpdateMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * repeated UserInfo users = 2;
 * @return {!Array<!proto.gsdk.user.UserInfo>}
 */
proto.gsdk.user.UpdateMultiRequest.prototype.getUsersList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserInfo, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserInfo>} value
 * @return {!proto.gsdk.user.UpdateMultiRequest} returns this
*/
proto.gsdk.user.UpdateMultiRequest.prototype.setUsersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserInfo}
 */
proto.gsdk.user.UpdateMultiRequest.prototype.addUsers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UpdateMultiRequest} returns this
 */
proto.gsdk.user.UpdateMultiRequest.prototype.clearUsersList = function() {
  return this.setUsersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.UpdateMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.user.UpdateMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UpdateMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UpdateMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UpdateMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.UpdateMultiResponse}
 */
proto.gsdk.user.UpdateMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UpdateMultiResponse;
  return proto.gsdk.user.UpdateMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UpdateMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UpdateMultiResponse}
 */
proto.gsdk.user.UpdateMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.UpdateMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UpdateMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UpdateMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UpdateMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.UpdateMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.user.UpdateMultiResponse} returns this
*/
proto.gsdk.user.UpdateMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.user.UpdateMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UpdateMultiResponse} returns this
 */
proto.gsdk.user.UpdateMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.DeleteRequest.repeatedFields_ = [2];



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
proto.gsdk.user.DeleteRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.DeleteRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.DeleteRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    useridsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.gsdk.user.DeleteRequest}
 */
proto.gsdk.user.DeleteRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.DeleteRequest;
  return proto.gsdk.user.DeleteRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.DeleteRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.DeleteRequest}
 */
proto.gsdk.user.DeleteRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.addUserids(value);
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
proto.gsdk.user.DeleteRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.DeleteRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.DeleteRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUseridsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.DeleteRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.DeleteRequest} returns this
 */
proto.gsdk.user.DeleteRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated string userIDs = 2;
 * @return {!Array<string>}
 */
proto.gsdk.user.DeleteRequest.prototype.getUseridsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gsdk.user.DeleteRequest} returns this
 */
proto.gsdk.user.DeleteRequest.prototype.setUseridsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.DeleteRequest} returns this
 */
proto.gsdk.user.DeleteRequest.prototype.addUserids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.DeleteRequest} returns this
 */
proto.gsdk.user.DeleteRequest.prototype.clearUseridsList = function() {
  return this.setUseridsList([]);
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
proto.gsdk.user.DeleteResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.DeleteResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.DeleteResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.DeleteResponse}
 */
proto.gsdk.user.DeleteResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.DeleteResponse;
  return proto.gsdk.user.DeleteResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.DeleteResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.DeleteResponse}
 */
proto.gsdk.user.DeleteResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.DeleteResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.DeleteResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.DeleteResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.DeleteMultiRequest.repeatedFields_ = [1,2];



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
proto.gsdk.user.DeleteMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.DeleteMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.DeleteMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    useridsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.gsdk.user.DeleteMultiRequest}
 */
proto.gsdk.user.DeleteMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.DeleteMultiRequest;
  return proto.gsdk.user.DeleteMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.DeleteMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.DeleteMultiRequest}
 */
proto.gsdk.user.DeleteMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.addUserids(value);
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
proto.gsdk.user.DeleteMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.DeleteMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.DeleteMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getUseridsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.user.DeleteMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.DeleteMultiRequest} returns this
 */
proto.gsdk.user.DeleteMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.DeleteMultiRequest} returns this
 */
proto.gsdk.user.DeleteMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.DeleteMultiRequest} returns this
 */
proto.gsdk.user.DeleteMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * repeated string userIDs = 2;
 * @return {!Array<string>}
 */
proto.gsdk.user.DeleteMultiRequest.prototype.getUseridsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gsdk.user.DeleteMultiRequest} returns this
 */
proto.gsdk.user.DeleteMultiRequest.prototype.setUseridsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.DeleteMultiRequest} returns this
 */
proto.gsdk.user.DeleteMultiRequest.prototype.addUserids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.DeleteMultiRequest} returns this
 */
proto.gsdk.user.DeleteMultiRequest.prototype.clearUseridsList = function() {
  return this.setUseridsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.DeleteMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.user.DeleteMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.DeleteMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.DeleteMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.DeleteMultiResponse}
 */
proto.gsdk.user.DeleteMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.DeleteMultiResponse;
  return proto.gsdk.user.DeleteMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.DeleteMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.DeleteMultiResponse}
 */
proto.gsdk.user.DeleteMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.DeleteMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.DeleteMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.DeleteMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.DeleteMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.user.DeleteMultiResponse} returns this
*/
proto.gsdk.user.DeleteMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.user.DeleteMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.DeleteMultiResponse} returns this
 */
proto.gsdk.user.DeleteMultiResponse.prototype.clearDeviceerrorsList = function() {
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
proto.gsdk.user.DeleteAllRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.DeleteAllRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.DeleteAllRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteAllRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.DeleteAllRequest}
 */
proto.gsdk.user.DeleteAllRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.DeleteAllRequest;
  return proto.gsdk.user.DeleteAllRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.DeleteAllRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.DeleteAllRequest}
 */
proto.gsdk.user.DeleteAllRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.DeleteAllRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.DeleteAllRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.DeleteAllRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteAllRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.DeleteAllRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.DeleteAllRequest} returns this
 */
proto.gsdk.user.DeleteAllRequest.prototype.setDeviceid = function(value) {
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
proto.gsdk.user.DeleteAllResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.DeleteAllResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.DeleteAllResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteAllResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.DeleteAllResponse}
 */
proto.gsdk.user.DeleteAllResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.DeleteAllResponse;
  return proto.gsdk.user.DeleteAllResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.DeleteAllResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.DeleteAllResponse}
 */
proto.gsdk.user.DeleteAllResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.DeleteAllResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.DeleteAllResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.DeleteAllResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteAllResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.DeleteAllMultiRequest.repeatedFields_ = [1];



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
proto.gsdk.user.DeleteAllMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.DeleteAllMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.DeleteAllMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteAllMultiRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.DeleteAllMultiRequest}
 */
proto.gsdk.user.DeleteAllMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.DeleteAllMultiRequest;
  return proto.gsdk.user.DeleteAllMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.DeleteAllMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.DeleteAllMultiRequest}
 */
proto.gsdk.user.DeleteAllMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.DeleteAllMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.DeleteAllMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.DeleteAllMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteAllMultiRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.DeleteAllMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.DeleteAllMultiRequest} returns this
 */
proto.gsdk.user.DeleteAllMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.DeleteAllMultiRequest} returns this
 */
proto.gsdk.user.DeleteAllMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.DeleteAllMultiRequest} returns this
 */
proto.gsdk.user.DeleteAllMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.DeleteAllMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.user.DeleteAllMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.DeleteAllMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.DeleteAllMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteAllMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.DeleteAllMultiResponse}
 */
proto.gsdk.user.DeleteAllMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.DeleteAllMultiResponse;
  return proto.gsdk.user.DeleteAllMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.DeleteAllMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.DeleteAllMultiResponse}
 */
proto.gsdk.user.DeleteAllMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.DeleteAllMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.DeleteAllMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.DeleteAllMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.DeleteAllMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.DeleteAllMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.user.DeleteAllMultiResponse} returns this
*/
proto.gsdk.user.DeleteAllMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.user.DeleteAllMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.DeleteAllMultiResponse} returns this
 */
proto.gsdk.user.DeleteAllMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.UserCard.repeatedFields_ = [2];



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
proto.gsdk.user.UserCard.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UserCard.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UserCard} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserCard.toObject = function(includeInstance, msg) {
  var f, obj = {
    userid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    cardsList: jspb.Message.toObjectList(msg.getCardsList(),
    card_pb.CSNCardData.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.UserCard}
 */
proto.gsdk.user.UserCard.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UserCard;
  return proto.gsdk.user.UserCard.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UserCard} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UserCard}
 */
proto.gsdk.user.UserCard.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 2:
      var value = new card_pb.CSNCardData;
      reader.readMessage(value,card_pb.CSNCardData.deserializeBinaryFromReader);
      msg.addCards(value);
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
proto.gsdk.user.UserCard.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UserCard.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UserCard} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserCard.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCardsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      card_pb.CSNCardData.serializeBinaryToWriter
    );
  }
};


/**
 * optional string userID = 1;
 * @return {string}
 */
proto.gsdk.user.UserCard.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.user.UserCard} returns this
 */
proto.gsdk.user.UserCard.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated gsdk.card.CSNCardData cards = 2;
 * @return {!Array<!proto.gsdk.card.CSNCardData>}
 */
proto.gsdk.user.UserCard.prototype.getCardsList = function() {
  return /** @type{!Array<!proto.gsdk.card.CSNCardData>} */ (
    jspb.Message.getRepeatedWrapperField(this, card_pb.CSNCardData, 2));
};


/**
 * @param {!Array<!proto.gsdk.card.CSNCardData>} value
 * @return {!proto.gsdk.user.UserCard} returns this
*/
proto.gsdk.user.UserCard.prototype.setCardsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.card.CSNCardData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.CSNCardData}
 */
proto.gsdk.user.UserCard.prototype.addCards = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.card.CSNCardData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UserCard} returns this
 */
proto.gsdk.user.UserCard.prototype.clearCardsList = function() {
  return this.setCardsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetCardRequest.repeatedFields_ = [2];



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
proto.gsdk.user.GetCardRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetCardRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetCardRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetCardRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    useridsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.gsdk.user.GetCardRequest}
 */
proto.gsdk.user.GetCardRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetCardRequest;
  return proto.gsdk.user.GetCardRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetCardRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetCardRequest}
 */
proto.gsdk.user.GetCardRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.addUserids(value);
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
proto.gsdk.user.GetCardRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetCardRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetCardRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetCardRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUseridsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.GetCardRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.GetCardRequest} returns this
 */
proto.gsdk.user.GetCardRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated string userIDs = 2;
 * @return {!Array<string>}
 */
proto.gsdk.user.GetCardRequest.prototype.getUseridsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gsdk.user.GetCardRequest} returns this
 */
proto.gsdk.user.GetCardRequest.prototype.setUseridsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.GetCardRequest} returns this
 */
proto.gsdk.user.GetCardRequest.prototype.addUserids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetCardRequest} returns this
 */
proto.gsdk.user.GetCardRequest.prototype.clearUseridsList = function() {
  return this.setUseridsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetCardResponse.repeatedFields_ = [1];



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
proto.gsdk.user.GetCardResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetCardResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetCardResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetCardResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    usercardsList: jspb.Message.toObjectList(msg.getUsercardsList(),
    proto.gsdk.user.UserCard.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.GetCardResponse}
 */
proto.gsdk.user.GetCardResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetCardResponse;
  return proto.gsdk.user.GetCardResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetCardResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetCardResponse}
 */
proto.gsdk.user.GetCardResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.user.UserCard;
      reader.readMessage(value,proto.gsdk.user.UserCard.deserializeBinaryFromReader);
      msg.addUsercards(value);
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
proto.gsdk.user.GetCardResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetCardResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetCardResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetCardResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsercardsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gsdk.user.UserCard.serializeBinaryToWriter
    );
  }
};


/**
 * repeated UserCard userCards = 1;
 * @return {!Array<!proto.gsdk.user.UserCard>}
 */
proto.gsdk.user.GetCardResponse.prototype.getUsercardsList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserCard>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserCard, 1));
};


/**
 * @param {!Array<!proto.gsdk.user.UserCard>} value
 * @return {!proto.gsdk.user.GetCardResponse} returns this
*/
proto.gsdk.user.GetCardResponse.prototype.setUsercardsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.user.UserCard=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserCard}
 */
proto.gsdk.user.GetCardResponse.prototype.addUsercards = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.user.UserCard, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetCardResponse} returns this
 */
proto.gsdk.user.GetCardResponse.prototype.clearUsercardsList = function() {
  return this.setUsercardsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetCardRequest.repeatedFields_ = [2];



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
proto.gsdk.user.SetCardRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetCardRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetCardRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetCardRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    usercardsList: jspb.Message.toObjectList(msg.getUsercardsList(),
    proto.gsdk.user.UserCard.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.SetCardRequest}
 */
proto.gsdk.user.SetCardRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetCardRequest;
  return proto.gsdk.user.SetCardRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetCardRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetCardRequest}
 */
proto.gsdk.user.SetCardRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserCard;
      reader.readMessage(value,proto.gsdk.user.UserCard.deserializeBinaryFromReader);
      msg.addUsercards(value);
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
proto.gsdk.user.SetCardRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetCardRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetCardRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetCardRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUsercardsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserCard.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.SetCardRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.SetCardRequest} returns this
 */
proto.gsdk.user.SetCardRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated UserCard userCards = 2;
 * @return {!Array<!proto.gsdk.user.UserCard>}
 */
proto.gsdk.user.SetCardRequest.prototype.getUsercardsList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserCard>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserCard, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserCard>} value
 * @return {!proto.gsdk.user.SetCardRequest} returns this
*/
proto.gsdk.user.SetCardRequest.prototype.setUsercardsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserCard=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserCard}
 */
proto.gsdk.user.SetCardRequest.prototype.addUsercards = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserCard, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetCardRequest} returns this
 */
proto.gsdk.user.SetCardRequest.prototype.clearUsercardsList = function() {
  return this.setUsercardsList([]);
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
proto.gsdk.user.SetCardResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetCardResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetCardResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetCardResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.SetCardResponse}
 */
proto.gsdk.user.SetCardResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetCardResponse;
  return proto.gsdk.user.SetCardResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetCardResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetCardResponse}
 */
proto.gsdk.user.SetCardResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.SetCardResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetCardResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetCardResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetCardResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetCardMultiRequest.repeatedFields_ = [1,2];



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
proto.gsdk.user.SetCardMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetCardMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetCardMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetCardMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    usercardsList: jspb.Message.toObjectList(msg.getUsercardsList(),
    proto.gsdk.user.UserCard.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.SetCardMultiRequest}
 */
proto.gsdk.user.SetCardMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetCardMultiRequest;
  return proto.gsdk.user.SetCardMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetCardMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetCardMultiRequest}
 */
proto.gsdk.user.SetCardMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserCard;
      reader.readMessage(value,proto.gsdk.user.UserCard.deserializeBinaryFromReader);
      msg.addUsercards(value);
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
proto.gsdk.user.SetCardMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetCardMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetCardMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetCardMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getUsercardsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserCard.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.user.SetCardMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.SetCardMultiRequest} returns this
 */
proto.gsdk.user.SetCardMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.SetCardMultiRequest} returns this
 */
proto.gsdk.user.SetCardMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetCardMultiRequest} returns this
 */
proto.gsdk.user.SetCardMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * repeated UserCard userCards = 2;
 * @return {!Array<!proto.gsdk.user.UserCard>}
 */
proto.gsdk.user.SetCardMultiRequest.prototype.getUsercardsList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserCard>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserCard, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserCard>} value
 * @return {!proto.gsdk.user.SetCardMultiRequest} returns this
*/
proto.gsdk.user.SetCardMultiRequest.prototype.setUsercardsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserCard=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserCard}
 */
proto.gsdk.user.SetCardMultiRequest.prototype.addUsercards = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserCard, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetCardMultiRequest} returns this
 */
proto.gsdk.user.SetCardMultiRequest.prototype.clearUsercardsList = function() {
  return this.setUsercardsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetCardMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.user.SetCardMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetCardMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetCardMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetCardMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.SetCardMultiResponse}
 */
proto.gsdk.user.SetCardMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetCardMultiResponse;
  return proto.gsdk.user.SetCardMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetCardMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetCardMultiResponse}
 */
proto.gsdk.user.SetCardMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.SetCardMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetCardMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetCardMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetCardMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.SetCardMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.user.SetCardMultiResponse} returns this
*/
proto.gsdk.user.SetCardMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.user.SetCardMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetCardMultiResponse} returns this
 */
proto.gsdk.user.SetCardMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.UserFinger.repeatedFields_ = [2];



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
proto.gsdk.user.UserFinger.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UserFinger.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UserFinger} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserFinger.toObject = function(includeInstance, msg) {
  var f, obj = {
    userid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    fingersList: jspb.Message.toObjectList(msg.getFingersList(),
    finger_pb.FingerData.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.UserFinger}
 */
proto.gsdk.user.UserFinger.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UserFinger;
  return proto.gsdk.user.UserFinger.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UserFinger} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UserFinger}
 */
proto.gsdk.user.UserFinger.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 2:
      var value = new finger_pb.FingerData;
      reader.readMessage(value,finger_pb.FingerData.deserializeBinaryFromReader);
      msg.addFingers(value);
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
proto.gsdk.user.UserFinger.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UserFinger.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UserFinger} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserFinger.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFingersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      finger_pb.FingerData.serializeBinaryToWriter
    );
  }
};


/**
 * optional string userID = 1;
 * @return {string}
 */
proto.gsdk.user.UserFinger.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.user.UserFinger} returns this
 */
proto.gsdk.user.UserFinger.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated gsdk.finger.FingerData fingers = 2;
 * @return {!Array<!proto.gsdk.finger.FingerData>}
 */
proto.gsdk.user.UserFinger.prototype.getFingersList = function() {
  return /** @type{!Array<!proto.gsdk.finger.FingerData>} */ (
    jspb.Message.getRepeatedWrapperField(this, finger_pb.FingerData, 2));
};


/**
 * @param {!Array<!proto.gsdk.finger.FingerData>} value
 * @return {!proto.gsdk.user.UserFinger} returns this
*/
proto.gsdk.user.UserFinger.prototype.setFingersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.finger.FingerData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.finger.FingerData}
 */
proto.gsdk.user.UserFinger.prototype.addFingers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.finger.FingerData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UserFinger} returns this
 */
proto.gsdk.user.UserFinger.prototype.clearFingersList = function() {
  return this.setFingersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetFingerRequest.repeatedFields_ = [2];



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
proto.gsdk.user.GetFingerRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetFingerRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetFingerRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetFingerRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    useridsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.gsdk.user.GetFingerRequest}
 */
proto.gsdk.user.GetFingerRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetFingerRequest;
  return proto.gsdk.user.GetFingerRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetFingerRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetFingerRequest}
 */
proto.gsdk.user.GetFingerRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.addUserids(value);
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
proto.gsdk.user.GetFingerRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetFingerRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetFingerRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetFingerRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUseridsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.GetFingerRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.GetFingerRequest} returns this
 */
proto.gsdk.user.GetFingerRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated string userIDs = 2;
 * @return {!Array<string>}
 */
proto.gsdk.user.GetFingerRequest.prototype.getUseridsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gsdk.user.GetFingerRequest} returns this
 */
proto.gsdk.user.GetFingerRequest.prototype.setUseridsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.GetFingerRequest} returns this
 */
proto.gsdk.user.GetFingerRequest.prototype.addUserids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetFingerRequest} returns this
 */
proto.gsdk.user.GetFingerRequest.prototype.clearUseridsList = function() {
  return this.setUseridsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetFingerResponse.repeatedFields_ = [1];



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
proto.gsdk.user.GetFingerResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetFingerResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetFingerResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetFingerResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    userfingersList: jspb.Message.toObjectList(msg.getUserfingersList(),
    proto.gsdk.user.UserFinger.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.GetFingerResponse}
 */
proto.gsdk.user.GetFingerResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetFingerResponse;
  return proto.gsdk.user.GetFingerResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetFingerResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetFingerResponse}
 */
proto.gsdk.user.GetFingerResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.user.UserFinger;
      reader.readMessage(value,proto.gsdk.user.UserFinger.deserializeBinaryFromReader);
      msg.addUserfingers(value);
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
proto.gsdk.user.GetFingerResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetFingerResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetFingerResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetFingerResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserfingersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gsdk.user.UserFinger.serializeBinaryToWriter
    );
  }
};


/**
 * repeated UserFinger userFingers = 1;
 * @return {!Array<!proto.gsdk.user.UserFinger>}
 */
proto.gsdk.user.GetFingerResponse.prototype.getUserfingersList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserFinger>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserFinger, 1));
};


/**
 * @param {!Array<!proto.gsdk.user.UserFinger>} value
 * @return {!proto.gsdk.user.GetFingerResponse} returns this
*/
proto.gsdk.user.GetFingerResponse.prototype.setUserfingersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.user.UserFinger=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserFinger}
 */
proto.gsdk.user.GetFingerResponse.prototype.addUserfingers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.user.UserFinger, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetFingerResponse} returns this
 */
proto.gsdk.user.GetFingerResponse.prototype.clearUserfingersList = function() {
  return this.setUserfingersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetFingerRequest.repeatedFields_ = [2];



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
proto.gsdk.user.SetFingerRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetFingerRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetFingerRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFingerRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    userfingersList: jspb.Message.toObjectList(msg.getUserfingersList(),
    proto.gsdk.user.UserFinger.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.SetFingerRequest}
 */
proto.gsdk.user.SetFingerRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetFingerRequest;
  return proto.gsdk.user.SetFingerRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetFingerRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetFingerRequest}
 */
proto.gsdk.user.SetFingerRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserFinger;
      reader.readMessage(value,proto.gsdk.user.UserFinger.deserializeBinaryFromReader);
      msg.addUserfingers(value);
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
proto.gsdk.user.SetFingerRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetFingerRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetFingerRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFingerRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUserfingersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserFinger.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.SetFingerRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.SetFingerRequest} returns this
 */
proto.gsdk.user.SetFingerRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated UserFinger userFingers = 2;
 * @return {!Array<!proto.gsdk.user.UserFinger>}
 */
proto.gsdk.user.SetFingerRequest.prototype.getUserfingersList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserFinger>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserFinger, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserFinger>} value
 * @return {!proto.gsdk.user.SetFingerRequest} returns this
*/
proto.gsdk.user.SetFingerRequest.prototype.setUserfingersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserFinger=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserFinger}
 */
proto.gsdk.user.SetFingerRequest.prototype.addUserfingers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserFinger, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetFingerRequest} returns this
 */
proto.gsdk.user.SetFingerRequest.prototype.clearUserfingersList = function() {
  return this.setUserfingersList([]);
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
proto.gsdk.user.SetFingerResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetFingerResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetFingerResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFingerResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.SetFingerResponse}
 */
proto.gsdk.user.SetFingerResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetFingerResponse;
  return proto.gsdk.user.SetFingerResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetFingerResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetFingerResponse}
 */
proto.gsdk.user.SetFingerResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.SetFingerResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetFingerResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetFingerResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFingerResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetFingerMultiRequest.repeatedFields_ = [1,2];



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
proto.gsdk.user.SetFingerMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetFingerMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetFingerMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFingerMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    userfingersList: jspb.Message.toObjectList(msg.getUserfingersList(),
    proto.gsdk.user.UserFinger.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.SetFingerMultiRequest}
 */
proto.gsdk.user.SetFingerMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetFingerMultiRequest;
  return proto.gsdk.user.SetFingerMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetFingerMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetFingerMultiRequest}
 */
proto.gsdk.user.SetFingerMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserFinger;
      reader.readMessage(value,proto.gsdk.user.UserFinger.deserializeBinaryFromReader);
      msg.addUserfingers(value);
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
proto.gsdk.user.SetFingerMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetFingerMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetFingerMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFingerMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getUserfingersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserFinger.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.user.SetFingerMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.SetFingerMultiRequest} returns this
 */
proto.gsdk.user.SetFingerMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.SetFingerMultiRequest} returns this
 */
proto.gsdk.user.SetFingerMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetFingerMultiRequest} returns this
 */
proto.gsdk.user.SetFingerMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * repeated UserFinger userFingers = 2;
 * @return {!Array<!proto.gsdk.user.UserFinger>}
 */
proto.gsdk.user.SetFingerMultiRequest.prototype.getUserfingersList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserFinger>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserFinger, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserFinger>} value
 * @return {!proto.gsdk.user.SetFingerMultiRequest} returns this
*/
proto.gsdk.user.SetFingerMultiRequest.prototype.setUserfingersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserFinger=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserFinger}
 */
proto.gsdk.user.SetFingerMultiRequest.prototype.addUserfingers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserFinger, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetFingerMultiRequest} returns this
 */
proto.gsdk.user.SetFingerMultiRequest.prototype.clearUserfingersList = function() {
  return this.setUserfingersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetFingerMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.user.SetFingerMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetFingerMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetFingerMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFingerMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.SetFingerMultiResponse}
 */
proto.gsdk.user.SetFingerMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetFingerMultiResponse;
  return proto.gsdk.user.SetFingerMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetFingerMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetFingerMultiResponse}
 */
proto.gsdk.user.SetFingerMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.SetFingerMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetFingerMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetFingerMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFingerMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.SetFingerMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.user.SetFingerMultiResponse} returns this
*/
proto.gsdk.user.SetFingerMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.user.SetFingerMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetFingerMultiResponse} returns this
 */
proto.gsdk.user.SetFingerMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.UserFace.repeatedFields_ = [2];



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
proto.gsdk.user.UserFace.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UserFace.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UserFace} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserFace.toObject = function(includeInstance, msg) {
  var f, obj = {
    userid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    facesList: jspb.Message.toObjectList(msg.getFacesList(),
    face_pb.FaceData.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.UserFace}
 */
proto.gsdk.user.UserFace.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UserFace;
  return proto.gsdk.user.UserFace.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UserFace} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UserFace}
 */
proto.gsdk.user.UserFace.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 2:
      var value = new face_pb.FaceData;
      reader.readMessage(value,face_pb.FaceData.deserializeBinaryFromReader);
      msg.addFaces(value);
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
proto.gsdk.user.UserFace.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UserFace.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UserFace} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserFace.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFacesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      face_pb.FaceData.serializeBinaryToWriter
    );
  }
};


/**
 * optional string userID = 1;
 * @return {string}
 */
proto.gsdk.user.UserFace.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.user.UserFace} returns this
 */
proto.gsdk.user.UserFace.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated gsdk.face.FaceData faces = 2;
 * @return {!Array<!proto.gsdk.face.FaceData>}
 */
proto.gsdk.user.UserFace.prototype.getFacesList = function() {
  return /** @type{!Array<!proto.gsdk.face.FaceData>} */ (
    jspb.Message.getRepeatedWrapperField(this, face_pb.FaceData, 2));
};


/**
 * @param {!Array<!proto.gsdk.face.FaceData>} value
 * @return {!proto.gsdk.user.UserFace} returns this
*/
proto.gsdk.user.UserFace.prototype.setFacesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.face.FaceData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.face.FaceData}
 */
proto.gsdk.user.UserFace.prototype.addFaces = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.face.FaceData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UserFace} returns this
 */
proto.gsdk.user.UserFace.prototype.clearFacesList = function() {
  return this.setFacesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetFaceRequest.repeatedFields_ = [2];



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
proto.gsdk.user.GetFaceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetFaceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetFaceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetFaceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    useridsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.gsdk.user.GetFaceRequest}
 */
proto.gsdk.user.GetFaceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetFaceRequest;
  return proto.gsdk.user.GetFaceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetFaceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetFaceRequest}
 */
proto.gsdk.user.GetFaceRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.addUserids(value);
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
proto.gsdk.user.GetFaceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetFaceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetFaceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetFaceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUseridsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.GetFaceRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.GetFaceRequest} returns this
 */
proto.gsdk.user.GetFaceRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated string userIDs = 2;
 * @return {!Array<string>}
 */
proto.gsdk.user.GetFaceRequest.prototype.getUseridsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gsdk.user.GetFaceRequest} returns this
 */
proto.gsdk.user.GetFaceRequest.prototype.setUseridsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.GetFaceRequest} returns this
 */
proto.gsdk.user.GetFaceRequest.prototype.addUserids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetFaceRequest} returns this
 */
proto.gsdk.user.GetFaceRequest.prototype.clearUseridsList = function() {
  return this.setUseridsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetFaceResponse.repeatedFields_ = [1];



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
proto.gsdk.user.GetFaceResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetFaceResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetFaceResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetFaceResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    userfacesList: jspb.Message.toObjectList(msg.getUserfacesList(),
    proto.gsdk.user.UserFace.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.GetFaceResponse}
 */
proto.gsdk.user.GetFaceResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetFaceResponse;
  return proto.gsdk.user.GetFaceResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetFaceResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetFaceResponse}
 */
proto.gsdk.user.GetFaceResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.user.UserFace;
      reader.readMessage(value,proto.gsdk.user.UserFace.deserializeBinaryFromReader);
      msg.addUserfaces(value);
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
proto.gsdk.user.GetFaceResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetFaceResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetFaceResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetFaceResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserfacesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gsdk.user.UserFace.serializeBinaryToWriter
    );
  }
};


/**
 * repeated UserFace userFaces = 1;
 * @return {!Array<!proto.gsdk.user.UserFace>}
 */
proto.gsdk.user.GetFaceResponse.prototype.getUserfacesList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserFace>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserFace, 1));
};


/**
 * @param {!Array<!proto.gsdk.user.UserFace>} value
 * @return {!proto.gsdk.user.GetFaceResponse} returns this
*/
proto.gsdk.user.GetFaceResponse.prototype.setUserfacesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.user.UserFace=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserFace}
 */
proto.gsdk.user.GetFaceResponse.prototype.addUserfaces = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.user.UserFace, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetFaceResponse} returns this
 */
proto.gsdk.user.GetFaceResponse.prototype.clearUserfacesList = function() {
  return this.setUserfacesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetFaceRequest.repeatedFields_ = [2];



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
proto.gsdk.user.SetFaceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetFaceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetFaceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFaceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    userfacesList: jspb.Message.toObjectList(msg.getUserfacesList(),
    proto.gsdk.user.UserFace.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.SetFaceRequest}
 */
proto.gsdk.user.SetFaceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetFaceRequest;
  return proto.gsdk.user.SetFaceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetFaceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetFaceRequest}
 */
proto.gsdk.user.SetFaceRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserFace;
      reader.readMessage(value,proto.gsdk.user.UserFace.deserializeBinaryFromReader);
      msg.addUserfaces(value);
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
proto.gsdk.user.SetFaceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetFaceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetFaceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFaceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUserfacesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserFace.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.SetFaceRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.SetFaceRequest} returns this
 */
proto.gsdk.user.SetFaceRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated UserFace userFaces = 2;
 * @return {!Array<!proto.gsdk.user.UserFace>}
 */
proto.gsdk.user.SetFaceRequest.prototype.getUserfacesList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserFace>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserFace, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserFace>} value
 * @return {!proto.gsdk.user.SetFaceRequest} returns this
*/
proto.gsdk.user.SetFaceRequest.prototype.setUserfacesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserFace=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserFace}
 */
proto.gsdk.user.SetFaceRequest.prototype.addUserfaces = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserFace, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetFaceRequest} returns this
 */
proto.gsdk.user.SetFaceRequest.prototype.clearUserfacesList = function() {
  return this.setUserfacesList([]);
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
proto.gsdk.user.SetFaceResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetFaceResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetFaceResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFaceResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.SetFaceResponse}
 */
proto.gsdk.user.SetFaceResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetFaceResponse;
  return proto.gsdk.user.SetFaceResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetFaceResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetFaceResponse}
 */
proto.gsdk.user.SetFaceResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.SetFaceResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetFaceResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetFaceResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFaceResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetFaceMultiRequest.repeatedFields_ = [1,2];



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
proto.gsdk.user.SetFaceMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetFaceMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetFaceMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFaceMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    userfacesList: jspb.Message.toObjectList(msg.getUserfacesList(),
    proto.gsdk.user.UserFace.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.SetFaceMultiRequest}
 */
proto.gsdk.user.SetFaceMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetFaceMultiRequest;
  return proto.gsdk.user.SetFaceMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetFaceMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetFaceMultiRequest}
 */
proto.gsdk.user.SetFaceMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserFace;
      reader.readMessage(value,proto.gsdk.user.UserFace.deserializeBinaryFromReader);
      msg.addUserfaces(value);
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
proto.gsdk.user.SetFaceMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetFaceMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetFaceMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFaceMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getUserfacesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserFace.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.user.SetFaceMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.SetFaceMultiRequest} returns this
 */
proto.gsdk.user.SetFaceMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.SetFaceMultiRequest} returns this
 */
proto.gsdk.user.SetFaceMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetFaceMultiRequest} returns this
 */
proto.gsdk.user.SetFaceMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * repeated UserFace userFaces = 2;
 * @return {!Array<!proto.gsdk.user.UserFace>}
 */
proto.gsdk.user.SetFaceMultiRequest.prototype.getUserfacesList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserFace>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserFace, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserFace>} value
 * @return {!proto.gsdk.user.SetFaceMultiRequest} returns this
*/
proto.gsdk.user.SetFaceMultiRequest.prototype.setUserfacesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserFace=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserFace}
 */
proto.gsdk.user.SetFaceMultiRequest.prototype.addUserfaces = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserFace, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetFaceMultiRequest} returns this
 */
proto.gsdk.user.SetFaceMultiRequest.prototype.clearUserfacesList = function() {
  return this.setUserfacesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetFaceMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.user.SetFaceMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetFaceMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetFaceMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFaceMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.SetFaceMultiResponse}
 */
proto.gsdk.user.SetFaceMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetFaceMultiResponse;
  return proto.gsdk.user.SetFaceMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetFaceMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetFaceMultiResponse}
 */
proto.gsdk.user.SetFaceMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.SetFaceMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetFaceMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetFaceMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetFaceMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.SetFaceMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.user.SetFaceMultiResponse} returns this
*/
proto.gsdk.user.SetFaceMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.user.SetFaceMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetFaceMultiResponse} returns this
 */
proto.gsdk.user.SetFaceMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.UserAccessGroup.repeatedFields_ = [2];



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
proto.gsdk.user.UserAccessGroup.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UserAccessGroup.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UserAccessGroup} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserAccessGroup.toObject = function(includeInstance, msg) {
  var f, obj = {
    userid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    accessgroupidsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.gsdk.user.UserAccessGroup}
 */
proto.gsdk.user.UserAccessGroup.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UserAccessGroup;
  return proto.gsdk.user.UserAccessGroup.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UserAccessGroup} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UserAccessGroup}
 */
proto.gsdk.user.UserAccessGroup.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 2:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addAccessgroupids(values[i]);
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
proto.gsdk.user.UserAccessGroup.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UserAccessGroup.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UserAccessGroup} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserAccessGroup.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAccessgroupidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      2,
      f
    );
  }
};


/**
 * optional string userID = 1;
 * @return {string}
 */
proto.gsdk.user.UserAccessGroup.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.user.UserAccessGroup} returns this
 */
proto.gsdk.user.UserAccessGroup.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated uint32 accessGroupIDs = 2;
 * @return {!Array<number>}
 */
proto.gsdk.user.UserAccessGroup.prototype.getAccessgroupidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.UserAccessGroup} returns this
 */
proto.gsdk.user.UserAccessGroup.prototype.setAccessgroupidsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserAccessGroup} returns this
 */
proto.gsdk.user.UserAccessGroup.prototype.addAccessgroupids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UserAccessGroup} returns this
 */
proto.gsdk.user.UserAccessGroup.prototype.clearAccessgroupidsList = function() {
  return this.setAccessgroupidsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetAccessGroupRequest.repeatedFields_ = [2];



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
proto.gsdk.user.GetAccessGroupRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetAccessGroupRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetAccessGroupRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetAccessGroupRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    useridsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.gsdk.user.GetAccessGroupRequest}
 */
proto.gsdk.user.GetAccessGroupRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetAccessGroupRequest;
  return proto.gsdk.user.GetAccessGroupRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetAccessGroupRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetAccessGroupRequest}
 */
proto.gsdk.user.GetAccessGroupRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.addUserids(value);
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
proto.gsdk.user.GetAccessGroupRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetAccessGroupRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetAccessGroupRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetAccessGroupRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUseridsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.GetAccessGroupRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.GetAccessGroupRequest} returns this
 */
proto.gsdk.user.GetAccessGroupRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated string userIDs = 2;
 * @return {!Array<string>}
 */
proto.gsdk.user.GetAccessGroupRequest.prototype.getUseridsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gsdk.user.GetAccessGroupRequest} returns this
 */
proto.gsdk.user.GetAccessGroupRequest.prototype.setUseridsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.GetAccessGroupRequest} returns this
 */
proto.gsdk.user.GetAccessGroupRequest.prototype.addUserids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetAccessGroupRequest} returns this
 */
proto.gsdk.user.GetAccessGroupRequest.prototype.clearUseridsList = function() {
  return this.setUseridsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetAccessGroupResponse.repeatedFields_ = [1];



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
proto.gsdk.user.GetAccessGroupResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetAccessGroupResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetAccessGroupResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetAccessGroupResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    useraccessgroupsList: jspb.Message.toObjectList(msg.getUseraccessgroupsList(),
    proto.gsdk.user.UserAccessGroup.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.GetAccessGroupResponse}
 */
proto.gsdk.user.GetAccessGroupResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetAccessGroupResponse;
  return proto.gsdk.user.GetAccessGroupResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetAccessGroupResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetAccessGroupResponse}
 */
proto.gsdk.user.GetAccessGroupResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.user.UserAccessGroup;
      reader.readMessage(value,proto.gsdk.user.UserAccessGroup.deserializeBinaryFromReader);
      msg.addUseraccessgroups(value);
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
proto.gsdk.user.GetAccessGroupResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetAccessGroupResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetAccessGroupResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetAccessGroupResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUseraccessgroupsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gsdk.user.UserAccessGroup.serializeBinaryToWriter
    );
  }
};


/**
 * repeated UserAccessGroup userAccessGroups = 1;
 * @return {!Array<!proto.gsdk.user.UserAccessGroup>}
 */
proto.gsdk.user.GetAccessGroupResponse.prototype.getUseraccessgroupsList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserAccessGroup>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserAccessGroup, 1));
};


/**
 * @param {!Array<!proto.gsdk.user.UserAccessGroup>} value
 * @return {!proto.gsdk.user.GetAccessGroupResponse} returns this
*/
proto.gsdk.user.GetAccessGroupResponse.prototype.setUseraccessgroupsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.user.UserAccessGroup=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserAccessGroup}
 */
proto.gsdk.user.GetAccessGroupResponse.prototype.addUseraccessgroups = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.user.UserAccessGroup, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetAccessGroupResponse} returns this
 */
proto.gsdk.user.GetAccessGroupResponse.prototype.clearUseraccessgroupsList = function() {
  return this.setUseraccessgroupsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetAccessGroupRequest.repeatedFields_ = [2];



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
proto.gsdk.user.SetAccessGroupRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetAccessGroupRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetAccessGroupRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetAccessGroupRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    useraccessgroupsList: jspb.Message.toObjectList(msg.getUseraccessgroupsList(),
    proto.gsdk.user.UserAccessGroup.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.SetAccessGroupRequest}
 */
proto.gsdk.user.SetAccessGroupRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetAccessGroupRequest;
  return proto.gsdk.user.SetAccessGroupRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetAccessGroupRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetAccessGroupRequest}
 */
proto.gsdk.user.SetAccessGroupRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserAccessGroup;
      reader.readMessage(value,proto.gsdk.user.UserAccessGroup.deserializeBinaryFromReader);
      msg.addUseraccessgroups(value);
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
proto.gsdk.user.SetAccessGroupRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetAccessGroupRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetAccessGroupRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetAccessGroupRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUseraccessgroupsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserAccessGroup.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.SetAccessGroupRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.SetAccessGroupRequest} returns this
 */
proto.gsdk.user.SetAccessGroupRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated UserAccessGroup userAccessGroups = 2;
 * @return {!Array<!proto.gsdk.user.UserAccessGroup>}
 */
proto.gsdk.user.SetAccessGroupRequest.prototype.getUseraccessgroupsList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserAccessGroup>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserAccessGroup, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserAccessGroup>} value
 * @return {!proto.gsdk.user.SetAccessGroupRequest} returns this
*/
proto.gsdk.user.SetAccessGroupRequest.prototype.setUseraccessgroupsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserAccessGroup=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserAccessGroup}
 */
proto.gsdk.user.SetAccessGroupRequest.prototype.addUseraccessgroups = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserAccessGroup, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetAccessGroupRequest} returns this
 */
proto.gsdk.user.SetAccessGroupRequest.prototype.clearUseraccessgroupsList = function() {
  return this.setUseraccessgroupsList([]);
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
proto.gsdk.user.SetAccessGroupResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetAccessGroupResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetAccessGroupResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetAccessGroupResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.SetAccessGroupResponse}
 */
proto.gsdk.user.SetAccessGroupResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetAccessGroupResponse;
  return proto.gsdk.user.SetAccessGroupResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetAccessGroupResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetAccessGroupResponse}
 */
proto.gsdk.user.SetAccessGroupResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.SetAccessGroupResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetAccessGroupResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetAccessGroupResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetAccessGroupResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetAccessGroupMultiRequest.repeatedFields_ = [1,2];



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
proto.gsdk.user.SetAccessGroupMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetAccessGroupMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetAccessGroupMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetAccessGroupMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    useraccessgroupsList: jspb.Message.toObjectList(msg.getUseraccessgroupsList(),
    proto.gsdk.user.UserAccessGroup.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.SetAccessGroupMultiRequest}
 */
proto.gsdk.user.SetAccessGroupMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetAccessGroupMultiRequest;
  return proto.gsdk.user.SetAccessGroupMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetAccessGroupMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetAccessGroupMultiRequest}
 */
proto.gsdk.user.SetAccessGroupMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserAccessGroup;
      reader.readMessage(value,proto.gsdk.user.UserAccessGroup.deserializeBinaryFromReader);
      msg.addUseraccessgroups(value);
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
proto.gsdk.user.SetAccessGroupMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetAccessGroupMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetAccessGroupMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetAccessGroupMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getUseraccessgroupsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserAccessGroup.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.user.SetAccessGroupMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.SetAccessGroupMultiRequest} returns this
 */
proto.gsdk.user.SetAccessGroupMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.SetAccessGroupMultiRequest} returns this
 */
proto.gsdk.user.SetAccessGroupMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetAccessGroupMultiRequest} returns this
 */
proto.gsdk.user.SetAccessGroupMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * repeated UserAccessGroup userAccessGroups = 2;
 * @return {!Array<!proto.gsdk.user.UserAccessGroup>}
 */
proto.gsdk.user.SetAccessGroupMultiRequest.prototype.getUseraccessgroupsList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserAccessGroup>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserAccessGroup, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserAccessGroup>} value
 * @return {!proto.gsdk.user.SetAccessGroupMultiRequest} returns this
*/
proto.gsdk.user.SetAccessGroupMultiRequest.prototype.setUseraccessgroupsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserAccessGroup=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserAccessGroup}
 */
proto.gsdk.user.SetAccessGroupMultiRequest.prototype.addUseraccessgroups = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserAccessGroup, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetAccessGroupMultiRequest} returns this
 */
proto.gsdk.user.SetAccessGroupMultiRequest.prototype.clearUseraccessgroupsList = function() {
  return this.setUseraccessgroupsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetAccessGroupMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.user.SetAccessGroupMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetAccessGroupMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetAccessGroupMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetAccessGroupMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.SetAccessGroupMultiResponse}
 */
proto.gsdk.user.SetAccessGroupMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetAccessGroupMultiResponse;
  return proto.gsdk.user.SetAccessGroupMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetAccessGroupMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetAccessGroupMultiResponse}
 */
proto.gsdk.user.SetAccessGroupMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.SetAccessGroupMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetAccessGroupMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetAccessGroupMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetAccessGroupMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.SetAccessGroupMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.user.SetAccessGroupMultiResponse} returns this
*/
proto.gsdk.user.SetAccessGroupMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.user.SetAccessGroupMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetAccessGroupMultiResponse} returns this
 */
proto.gsdk.user.SetAccessGroupMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.UserJobCode.repeatedFields_ = [2];



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
proto.gsdk.user.UserJobCode.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UserJobCode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UserJobCode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserJobCode.toObject = function(includeInstance, msg) {
  var f, obj = {
    userid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    jobcodesList: jspb.Message.toObjectList(msg.getJobcodesList(),
    tna_pb.JobCode.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.UserJobCode}
 */
proto.gsdk.user.UserJobCode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UserJobCode;
  return proto.gsdk.user.UserJobCode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UserJobCode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UserJobCode}
 */
proto.gsdk.user.UserJobCode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 2:
      var value = new tna_pb.JobCode;
      reader.readMessage(value,tna_pb.JobCode.deserializeBinaryFromReader);
      msg.addJobcodes(value);
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
proto.gsdk.user.UserJobCode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UserJobCode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UserJobCode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserJobCode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getJobcodesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      tna_pb.JobCode.serializeBinaryToWriter
    );
  }
};


/**
 * optional string userID = 1;
 * @return {string}
 */
proto.gsdk.user.UserJobCode.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.user.UserJobCode} returns this
 */
proto.gsdk.user.UserJobCode.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated gsdk.tna.JobCode jobCodes = 2;
 * @return {!Array<!proto.gsdk.tna.JobCode>}
 */
proto.gsdk.user.UserJobCode.prototype.getJobcodesList = function() {
  return /** @type{!Array<!proto.gsdk.tna.JobCode>} */ (
    jspb.Message.getRepeatedWrapperField(this, tna_pb.JobCode, 2));
};


/**
 * @param {!Array<!proto.gsdk.tna.JobCode>} value
 * @return {!proto.gsdk.user.UserJobCode} returns this
*/
proto.gsdk.user.UserJobCode.prototype.setJobcodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.tna.JobCode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.tna.JobCode}
 */
proto.gsdk.user.UserJobCode.prototype.addJobcodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.tna.JobCode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.UserJobCode} returns this
 */
proto.gsdk.user.UserJobCode.prototype.clearJobcodesList = function() {
  return this.setJobcodesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetJobCodeRequest.repeatedFields_ = [2];



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
proto.gsdk.user.GetJobCodeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetJobCodeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetJobCodeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetJobCodeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    useridsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
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
 * @return {!proto.gsdk.user.GetJobCodeRequest}
 */
proto.gsdk.user.GetJobCodeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetJobCodeRequest;
  return proto.gsdk.user.GetJobCodeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetJobCodeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetJobCodeRequest}
 */
proto.gsdk.user.GetJobCodeRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.addUserids(value);
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
proto.gsdk.user.GetJobCodeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetJobCodeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetJobCodeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetJobCodeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUseridsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.GetJobCodeRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.GetJobCodeRequest} returns this
 */
proto.gsdk.user.GetJobCodeRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated string userIDs = 2;
 * @return {!Array<string>}
 */
proto.gsdk.user.GetJobCodeRequest.prototype.getUseridsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.gsdk.user.GetJobCodeRequest} returns this
 */
proto.gsdk.user.GetJobCodeRequest.prototype.setUseridsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.GetJobCodeRequest} returns this
 */
proto.gsdk.user.GetJobCodeRequest.prototype.addUserids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetJobCodeRequest} returns this
 */
proto.gsdk.user.GetJobCodeRequest.prototype.clearUseridsList = function() {
  return this.setUseridsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.GetJobCodeResponse.repeatedFields_ = [1];



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
proto.gsdk.user.GetJobCodeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetJobCodeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetJobCodeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetJobCodeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    userjobcodesList: jspb.Message.toObjectList(msg.getUserjobcodesList(),
    proto.gsdk.user.UserJobCode.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.GetJobCodeResponse}
 */
proto.gsdk.user.GetJobCodeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetJobCodeResponse;
  return proto.gsdk.user.GetJobCodeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetJobCodeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetJobCodeResponse}
 */
proto.gsdk.user.GetJobCodeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.user.UserJobCode;
      reader.readMessage(value,proto.gsdk.user.UserJobCode.deserializeBinaryFromReader);
      msg.addUserjobcodes(value);
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
proto.gsdk.user.GetJobCodeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetJobCodeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetJobCodeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetJobCodeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserjobcodesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gsdk.user.UserJobCode.serializeBinaryToWriter
    );
  }
};


/**
 * repeated UserJobCode userJobCodes = 1;
 * @return {!Array<!proto.gsdk.user.UserJobCode>}
 */
proto.gsdk.user.GetJobCodeResponse.prototype.getUserjobcodesList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserJobCode>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserJobCode, 1));
};


/**
 * @param {!Array<!proto.gsdk.user.UserJobCode>} value
 * @return {!proto.gsdk.user.GetJobCodeResponse} returns this
*/
proto.gsdk.user.GetJobCodeResponse.prototype.setUserjobcodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.user.UserJobCode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserJobCode}
 */
proto.gsdk.user.GetJobCodeResponse.prototype.addUserjobcodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.user.UserJobCode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.GetJobCodeResponse} returns this
 */
proto.gsdk.user.GetJobCodeResponse.prototype.clearUserjobcodesList = function() {
  return this.setUserjobcodesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetJobCodeRequest.repeatedFields_ = [2];



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
proto.gsdk.user.SetJobCodeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetJobCodeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetJobCodeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetJobCodeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    userjobcodesList: jspb.Message.toObjectList(msg.getUserjobcodesList(),
    proto.gsdk.user.UserJobCode.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.SetJobCodeRequest}
 */
proto.gsdk.user.SetJobCodeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetJobCodeRequest;
  return proto.gsdk.user.SetJobCodeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetJobCodeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetJobCodeRequest}
 */
proto.gsdk.user.SetJobCodeRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserJobCode;
      reader.readMessage(value,proto.gsdk.user.UserJobCode.deserializeBinaryFromReader);
      msg.addUserjobcodes(value);
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
proto.gsdk.user.SetJobCodeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetJobCodeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetJobCodeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetJobCodeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getUserjobcodesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserJobCode.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.user.SetJobCodeRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.SetJobCodeRequest} returns this
 */
proto.gsdk.user.SetJobCodeRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated UserJobCode userJobCodes = 2;
 * @return {!Array<!proto.gsdk.user.UserJobCode>}
 */
proto.gsdk.user.SetJobCodeRequest.prototype.getUserjobcodesList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserJobCode>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserJobCode, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserJobCode>} value
 * @return {!proto.gsdk.user.SetJobCodeRequest} returns this
*/
proto.gsdk.user.SetJobCodeRequest.prototype.setUserjobcodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserJobCode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserJobCode}
 */
proto.gsdk.user.SetJobCodeRequest.prototype.addUserjobcodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserJobCode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetJobCodeRequest} returns this
 */
proto.gsdk.user.SetJobCodeRequest.prototype.clearUserjobcodesList = function() {
  return this.setUserjobcodesList([]);
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
proto.gsdk.user.SetJobCodeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetJobCodeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetJobCodeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetJobCodeResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.SetJobCodeResponse}
 */
proto.gsdk.user.SetJobCodeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetJobCodeResponse;
  return proto.gsdk.user.SetJobCodeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetJobCodeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetJobCodeResponse}
 */
proto.gsdk.user.SetJobCodeResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.SetJobCodeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetJobCodeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetJobCodeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetJobCodeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetJobCodeMultiRequest.repeatedFields_ = [1,2];



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
proto.gsdk.user.SetJobCodeMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetJobCodeMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetJobCodeMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetJobCodeMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    userjobcodesList: jspb.Message.toObjectList(msg.getUserjobcodesList(),
    proto.gsdk.user.UserJobCode.toObject, includeInstance)
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
 * @return {!proto.gsdk.user.SetJobCodeMultiRequest}
 */
proto.gsdk.user.SetJobCodeMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetJobCodeMultiRequest;
  return proto.gsdk.user.SetJobCodeMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetJobCodeMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetJobCodeMultiRequest}
 */
proto.gsdk.user.SetJobCodeMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.user.UserJobCode;
      reader.readMessage(value,proto.gsdk.user.UserJobCode.deserializeBinaryFromReader);
      msg.addUserjobcodes(value);
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
proto.gsdk.user.SetJobCodeMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetJobCodeMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetJobCodeMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetJobCodeMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getUserjobcodesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.user.UserJobCode.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.user.SetJobCodeMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.user.SetJobCodeMultiRequest} returns this
 */
proto.gsdk.user.SetJobCodeMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.SetJobCodeMultiRequest} returns this
 */
proto.gsdk.user.SetJobCodeMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetJobCodeMultiRequest} returns this
 */
proto.gsdk.user.SetJobCodeMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * repeated UserJobCode userJobCodes = 2;
 * @return {!Array<!proto.gsdk.user.UserJobCode>}
 */
proto.gsdk.user.SetJobCodeMultiRequest.prototype.getUserjobcodesList = function() {
  return /** @type{!Array<!proto.gsdk.user.UserJobCode>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.user.UserJobCode, 2));
};


/**
 * @param {!Array<!proto.gsdk.user.UserJobCode>} value
 * @return {!proto.gsdk.user.SetJobCodeMultiRequest} returns this
*/
proto.gsdk.user.SetJobCodeMultiRequest.prototype.setUserjobcodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.user.UserJobCode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.user.UserJobCode}
 */
proto.gsdk.user.SetJobCodeMultiRequest.prototype.addUserjobcodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.user.UserJobCode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetJobCodeMultiRequest} returns this
 */
proto.gsdk.user.SetJobCodeMultiRequest.prototype.clearUserjobcodesList = function() {
  return this.setUserjobcodesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.user.SetJobCodeMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.user.SetJobCodeMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.SetJobCodeMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.SetJobCodeMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetJobCodeMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.SetJobCodeMultiResponse}
 */
proto.gsdk.user.SetJobCodeMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.SetJobCodeMultiResponse;
  return proto.gsdk.user.SetJobCodeMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.SetJobCodeMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.SetJobCodeMultiResponse}
 */
proto.gsdk.user.SetJobCodeMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.SetJobCodeMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.SetJobCodeMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.SetJobCodeMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.SetJobCodeMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.SetJobCodeMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.user.SetJobCodeMultiResponse} returns this
*/
proto.gsdk.user.SetJobCodeMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.user.SetJobCodeMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.user.SetJobCodeMultiResponse} returns this
 */
proto.gsdk.user.SetJobCodeMultiResponse.prototype.clearDeviceerrorsList = function() {
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
proto.gsdk.user.GetPINHashRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetPINHashRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetPINHashRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetPINHashRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    pin: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.gsdk.user.GetPINHashRequest}
 */
proto.gsdk.user.GetPINHashRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetPINHashRequest;
  return proto.gsdk.user.GetPINHashRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetPINHashRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetPINHashRequest}
 */
proto.gsdk.user.GetPINHashRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPin(value);
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
proto.gsdk.user.GetPINHashRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetPINHashRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetPINHashRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetPINHashRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPin();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string PIN = 1;
 * @return {string}
 */
proto.gsdk.user.GetPINHashRequest.prototype.getPin = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.user.GetPINHashRequest} returns this
 */
proto.gsdk.user.GetPINHashRequest.prototype.setPin = function(value) {
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
proto.gsdk.user.GetPINHashResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetPINHashResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetPINHashResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetPINHashResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    hashval: msg.getHashval_asB64()
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
 * @return {!proto.gsdk.user.GetPINHashResponse}
 */
proto.gsdk.user.GetPINHashResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetPINHashResponse;
  return proto.gsdk.user.GetPINHashResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetPINHashResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetPINHashResponse}
 */
proto.gsdk.user.GetPINHashResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHashval(value);
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
proto.gsdk.user.GetPINHashResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetPINHashResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetPINHashResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetPINHashResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHashval_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes hashVal = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.user.GetPINHashResponse.prototype.getHashval = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hashVal = 1;
 * This is a type-conversion wrapper around `getHashval()`
 * @return {string}
 */
proto.gsdk.user.GetPINHashResponse.prototype.getHashval_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHashval()));
};


/**
 * optional bytes hashVal = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHashval()`
 * @return {!Uint8Array}
 */
proto.gsdk.user.GetPINHashResponse.prototype.getHashval_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHashval()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.user.GetPINHashResponse} returns this
 */
proto.gsdk.user.GetPINHashResponse.prototype.setHashval = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
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
proto.gsdk.user.GetPINHashWithKeyRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetPINHashWithKeyRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetPINHashWithKeyRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetPINHashWithKeyRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    pin: jspb.Message.getFieldWithDefault(msg, 1, ""),
    hashkey: msg.getHashkey_asB64()
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
 * @return {!proto.gsdk.user.GetPINHashWithKeyRequest}
 */
proto.gsdk.user.GetPINHashWithKeyRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetPINHashWithKeyRequest;
  return proto.gsdk.user.GetPINHashWithKeyRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetPINHashWithKeyRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetPINHashWithKeyRequest}
 */
proto.gsdk.user.GetPINHashWithKeyRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPin(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHashkey(value);
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
proto.gsdk.user.GetPINHashWithKeyRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetPINHashWithKeyRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetPINHashWithKeyRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetPINHashWithKeyRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPin();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getHashkey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional string PIN = 1;
 * @return {string}
 */
proto.gsdk.user.GetPINHashWithKeyRequest.prototype.getPin = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.user.GetPINHashWithKeyRequest} returns this
 */
proto.gsdk.user.GetPINHashWithKeyRequest.prototype.setPin = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bytes hashKey = 2;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.user.GetPINHashWithKeyRequest.prototype.getHashkey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes hashKey = 2;
 * This is a type-conversion wrapper around `getHashkey()`
 * @return {string}
 */
proto.gsdk.user.GetPINHashWithKeyRequest.prototype.getHashkey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHashkey()));
};


/**
 * optional bytes hashKey = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHashkey()`
 * @return {!Uint8Array}
 */
proto.gsdk.user.GetPINHashWithKeyRequest.prototype.getHashkey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHashkey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.user.GetPINHashWithKeyRequest} returns this
 */
proto.gsdk.user.GetPINHashWithKeyRequest.prototype.setHashkey = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
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
proto.gsdk.user.GetStatisticRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetStatisticRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetStatisticRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetStatisticRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.user.GetStatisticRequest}
 */
proto.gsdk.user.GetStatisticRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetStatisticRequest;
  return proto.gsdk.user.GetStatisticRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetStatisticRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetStatisticRequest}
 */
proto.gsdk.user.GetStatisticRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.user.GetStatisticRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetStatisticRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetStatisticRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetStatisticRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.user.GetStatisticRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.GetStatisticRequest} returns this
 */
proto.gsdk.user.GetStatisticRequest.prototype.setDeviceid = function(value) {
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
proto.gsdk.user.UserStatistic.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.UserStatistic.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.UserStatistic} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserStatistic.toObject = function(includeInstance, msg) {
  var f, obj = {
    numofusers: jspb.Message.getFieldWithDefault(msg, 1, 0),
    numofcards: jspb.Message.getFieldWithDefault(msg, 2, 0),
    numoffingerprints: jspb.Message.getFieldWithDefault(msg, 3, 0),
    numoffaces: jspb.Message.getFieldWithDefault(msg, 4, 0),
    numofnames: jspb.Message.getFieldWithDefault(msg, 5, 0),
    numofimages: jspb.Message.getFieldWithDefault(msg, 6, 0),
    numofphrases: jspb.Message.getFieldWithDefault(msg, 7, 0)
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
 * @return {!proto.gsdk.user.UserStatistic}
 */
proto.gsdk.user.UserStatistic.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.UserStatistic;
  return proto.gsdk.user.UserStatistic.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.UserStatistic} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.UserStatistic}
 */
proto.gsdk.user.UserStatistic.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNumofusers(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNumofcards(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNumoffingerprints(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNumoffaces(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNumofnames(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNumofimages(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNumofphrases(value);
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
proto.gsdk.user.UserStatistic.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.UserStatistic.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.UserStatistic} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.UserStatistic.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNumofusers();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getNumofcards();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getNumoffingerprints();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getNumoffaces();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = message.getNumofnames();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
  f = message.getNumofimages();
  if (f !== 0) {
    writer.writeUint32(
      6,
      f
    );
  }
  f = message.getNumofphrases();
  if (f !== 0) {
    writer.writeUint32(
      7,
      f
    );
  }
};


/**
 * optional uint32 numOfUsers = 1;
 * @return {number}
 */
proto.gsdk.user.UserStatistic.prototype.getNumofusers = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserStatistic} returns this
 */
proto.gsdk.user.UserStatistic.prototype.setNumofusers = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint32 numOfCards = 2;
 * @return {number}
 */
proto.gsdk.user.UserStatistic.prototype.getNumofcards = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserStatistic} returns this
 */
proto.gsdk.user.UserStatistic.prototype.setNumofcards = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional uint32 numOfFingerprints = 3;
 * @return {number}
 */
proto.gsdk.user.UserStatistic.prototype.getNumoffingerprints = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserStatistic} returns this
 */
proto.gsdk.user.UserStatistic.prototype.setNumoffingerprints = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional uint32 numOfFaces = 4;
 * @return {number}
 */
proto.gsdk.user.UserStatistic.prototype.getNumoffaces = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserStatistic} returns this
 */
proto.gsdk.user.UserStatistic.prototype.setNumoffaces = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint32 numOfNames = 5;
 * @return {number}
 */
proto.gsdk.user.UserStatistic.prototype.getNumofnames = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserStatistic} returns this
 */
proto.gsdk.user.UserStatistic.prototype.setNumofnames = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional uint32 numOfImages = 6;
 * @return {number}
 */
proto.gsdk.user.UserStatistic.prototype.getNumofimages = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserStatistic} returns this
 */
proto.gsdk.user.UserStatistic.prototype.setNumofimages = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional uint32 numOfPhrases = 7;
 * @return {number}
 */
proto.gsdk.user.UserStatistic.prototype.getNumofphrases = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.user.UserStatistic} returns this
 */
proto.gsdk.user.UserStatistic.prototype.setNumofphrases = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
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
proto.gsdk.user.GetStatisticResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.user.GetStatisticResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.user.GetStatisticResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetStatisticResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    userstatistic: (f = msg.getUserstatistic()) && proto.gsdk.user.UserStatistic.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.user.GetStatisticResponse}
 */
proto.gsdk.user.GetStatisticResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.user.GetStatisticResponse;
  return proto.gsdk.user.GetStatisticResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.user.GetStatisticResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.user.GetStatisticResponse}
 */
proto.gsdk.user.GetStatisticResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.user.UserStatistic;
      reader.readMessage(value,proto.gsdk.user.UserStatistic.deserializeBinaryFromReader);
      msg.setUserstatistic(value);
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
proto.gsdk.user.GetStatisticResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.user.GetStatisticResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.user.GetStatisticResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.user.GetStatisticResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserstatistic();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gsdk.user.UserStatistic.serializeBinaryToWriter
    );
  }
};


/**
 * optional UserStatistic userStatistic = 1;
 * @return {?proto.gsdk.user.UserStatistic}
 */
proto.gsdk.user.GetStatisticResponse.prototype.getUserstatistic = function() {
  return /** @type{?proto.gsdk.user.UserStatistic} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.user.UserStatistic, 1));
};


/**
 * @param {?proto.gsdk.user.UserStatistic|undefined} value
 * @return {!proto.gsdk.user.GetStatisticResponse} returns this
*/
proto.gsdk.user.GetStatisticResponse.prototype.setUserstatistic = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.user.GetStatisticResponse} returns this
 */
proto.gsdk.user.GetStatisticResponse.prototype.clearUserstatistic = function() {
  return this.setUserstatistic(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.user.GetStatisticResponse.prototype.hasUserstatistic = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * @enum {number}
 */
proto.gsdk.user.Enum = {
  FIRST_ENUM_VALUE_MUST_BE_ZERO: 0,
  MAX_ACCESS_GROUPS: 16,
  MAX_JOB_CODES: 16,
  MAX_PIN_LENGTH: 32,
  MAX_JOB_LABEL_LENGTH: 48,
  MAX_NAME_LENGTH: 192
};

/**
 * @enum {number}
 */
proto.gsdk.user.UserFlag = {
  USER_FLAG_NONE: 0,
  USER_FLAG_CREATED: 1,
  USER_FLAG_UPDATED: 2,
  USER_FLAG_DELETED: 4,
  USER_FLAG_DISABLED: 128,
  USER_FLAG_ALL: 255
};

/**
 * @enum {number}
 */
proto.gsdk.user.UpdateMask = {
  KEEP_NONE: 0,
  KEEP_USER_PHRASE: 1,
  KEEP_USER_JOB_CODE: 2,
  KEEP_USER_NAME: 4,
  KEEP_USER_PHOTO: 8,
  KEEP_USER_PIN: 16,
  KEEP_USER_CARD: 32,
  KEEP_USER_FINGER: 64,
  KEEP_USER_FACE: 128,
  KEEP_ALL: 255
};

/**
 * @enum {number}
 */
proto.gsdk.user.SecurityLevel = {
  SECURITY_LEVEL_LOWEST: 0,
  SECURITY_LEVEL_LOWER: 1,
  SECURITY_LEVEL_LOW: 2,
  SECURITY_LEVEL_NORMAL: 3,
  SECURITY_LEVEL_HIGH: 4,
  SECURITY_LEVEL_HIGHER: 5
};

/**
 * @enum {number}
 */
proto.gsdk.user.InfoMask = {
  USER_MASK_ID_ONLY: 0,
  USER_MASK_HDR: 1,
  USER_MASK_SETTING: 2,
  USER_MASK_NAME: 4,
  USER_MASK_PHOTO: 8,
  USER_MASK_PIN: 16,
  USER_MASK_CARD: 32,
  USER_MASK_FINGER: 64,
  USER_MASK_FACE: 128,
  USER_MASK_ACCESS_GROUP: 256,
  USER_MASK_JOB: 512,
  USER_MASK_PHRASE: 1024,
  USER_MASK_FACE_EX: 2048,
  USER_MASK_SETTING_EX: 4096,
  USER_MASK_ALL: 65535
};

goog.object.extend(exports, proto.gsdk.user);
