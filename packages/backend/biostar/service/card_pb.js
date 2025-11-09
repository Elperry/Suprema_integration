// source: card.proto
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

var err_pb = require('./err_pb.js');
goog.object.extend(proto, err_pb);
goog.exportSymbol('proto.gsdk.card.AccessOnCardData', null, global);
goog.exportSymbol('proto.gsdk.card.AddBlacklistMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.card.AddBlacklistMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.card.AddBlacklistRequest', null, global);
goog.exportSymbol('proto.gsdk.card.AddBlacklistResponse', null, global);
goog.exportSymbol('proto.gsdk.card.BlacklistItem', null, global);
goog.exportSymbol('proto.gsdk.card.CSNCardData', null, global);
goog.exportSymbol('proto.gsdk.card.Card1XConfig', null, global);
goog.exportSymbol('proto.gsdk.card.CardByteOrder', null, global);
goog.exportSymbol('proto.gsdk.card.CardConfig', null, global);
goog.exportSymbol('proto.gsdk.card.CardData', null, global);
goog.exportSymbol('proto.gsdk.card.CardDataType', null, global);
goog.exportSymbol('proto.gsdk.card.CustomConfig', null, global);
goog.exportSymbol('proto.gsdk.card.CustomDESFireCard', null, global);
goog.exportSymbol('proto.gsdk.card.CustomMifareCard', null, global);
goog.exportSymbol('proto.gsdk.card.DESFireAppLevelKey', null, global);
goog.exportSymbol('proto.gsdk.card.DESFireConfig', null, global);
goog.exportSymbol('proto.gsdk.card.DESFireEncryptionType', null, global);
goog.exportSymbol('proto.gsdk.card.DESFireOperationMode', null, global);
goog.exportSymbol('proto.gsdk.card.DeleteAllBlacklistMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.card.DeleteAllBlacklistMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.card.DeleteAllBlacklistRequest', null, global);
goog.exportSymbol('proto.gsdk.card.DeleteAllBlacklistResponse', null, global);
goog.exportSymbol('proto.gsdk.card.DeleteBlacklistMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.card.DeleteBlacklistMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.card.DeleteBlacklistRequest', null, global);
goog.exportSymbol('proto.gsdk.card.DeleteBlacklistResponse', null, global);
goog.exportSymbol('proto.gsdk.card.Enum', null, global);
goog.exportSymbol('proto.gsdk.card.EraseRequest', null, global);
goog.exportSymbol('proto.gsdk.card.EraseResponse', null, global);
goog.exportSymbol('proto.gsdk.card.FacilityCode', null, global);
goog.exportSymbol('proto.gsdk.card.FacilityCodeConfig', null, global);
goog.exportSymbol('proto.gsdk.card.Get1XConfigRequest', null, global);
goog.exportSymbol('proto.gsdk.card.Get1XConfigResponse', null, global);
goog.exportSymbol('proto.gsdk.card.GetBlacklistRequest', null, global);
goog.exportSymbol('proto.gsdk.card.GetBlacklistResponse', null, global);
goog.exportSymbol('proto.gsdk.card.GetConfigRequest', null, global);
goog.exportSymbol('proto.gsdk.card.GetConfigResponse', null, global);
goog.exportSymbol('proto.gsdk.card.GetCustomConfigRequest', null, global);
goog.exportSymbol('proto.gsdk.card.GetCustomConfigResponse', null, global);
goog.exportSymbol('proto.gsdk.card.GetFacilityCodeConfigRequest', null, global);
goog.exportSymbol('proto.gsdk.card.GetFacilityCodeConfigResponse', null, global);
goog.exportSymbol('proto.gsdk.card.GetQRConfigRequest', null, global);
goog.exportSymbol('proto.gsdk.card.GetQRConfigResponse', null, global);
goog.exportSymbol('proto.gsdk.card.IClassConfig', null, global);
goog.exportSymbol('proto.gsdk.card.MIFARE_ENCRYPTION', null, global);
goog.exportSymbol('proto.gsdk.card.MifareConfig', null, global);
goog.exportSymbol('proto.gsdk.card.QRConfig', null, global);
goog.exportSymbol('proto.gsdk.card.SEOSConfig', null, global);
goog.exportSymbol('proto.gsdk.card.ScanRequest', null, global);
goog.exportSymbol('proto.gsdk.card.ScanResponse', null, global);
goog.exportSymbol('proto.gsdk.card.Set1XConfigMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.card.Set1XConfigMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.card.Set1XConfigRequest', null, global);
goog.exportSymbol('proto.gsdk.card.Set1XConfigResponse', null, global);
goog.exportSymbol('proto.gsdk.card.SetConfigMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.card.SetConfigMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.card.SetConfigRequest', null, global);
goog.exportSymbol('proto.gsdk.card.SetConfigResponse', null, global);
goog.exportSymbol('proto.gsdk.card.SetCustomConfigMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.card.SetCustomConfigMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.card.SetCustomConfigRequest', null, global);
goog.exportSymbol('proto.gsdk.card.SetCustomConfigResponse', null, global);
goog.exportSymbol('proto.gsdk.card.SetFacilityCodeConfigMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.card.SetFacilityCodeConfigMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.card.SetFacilityCodeConfigRequest', null, global);
goog.exportSymbol('proto.gsdk.card.SetFacilityCodeConfigResponse', null, global);
goog.exportSymbol('proto.gsdk.card.SetQRConfigMultiRequest', null, global);
goog.exportSymbol('proto.gsdk.card.SetQRConfigMultiResponse', null, global);
goog.exportSymbol('proto.gsdk.card.SetQRConfigRequest', null, global);
goog.exportSymbol('proto.gsdk.card.SetQRConfigResponse', null, global);
goog.exportSymbol('proto.gsdk.card.SmartCardCredential', null, global);
goog.exportSymbol('proto.gsdk.card.SmartCardData', null, global);
goog.exportSymbol('proto.gsdk.card.SmartCardHeader', null, global);
goog.exportSymbol('proto.gsdk.card.SmartCardHeader.TemplatecountCase', null, global);
goog.exportSymbol('proto.gsdk.card.Type', null, global);
goog.exportSymbol('proto.gsdk.card.WriteQRCodeRequest', null, global);
goog.exportSymbol('proto.gsdk.card.WriteQRCodeResponse', null, global);
goog.exportSymbol('proto.gsdk.card.WriteRequest', null, global);
goog.exportSymbol('proto.gsdk.card.WriteResponse', null, global);
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
proto.gsdk.card.CSNCardData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.CSNCardData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.CSNCardData.displayName = 'proto.gsdk.card.CSNCardData';
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
proto.gsdk.card.SmartCardHeader = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.gsdk.card.SmartCardHeader.oneofGroups_);
};
goog.inherits(proto.gsdk.card.SmartCardHeader, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SmartCardHeader.displayName = 'proto.gsdk.card.SmartCardHeader';
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
proto.gsdk.card.SmartCardCredential = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.SmartCardCredential.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.SmartCardCredential, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SmartCardCredential.displayName = 'proto.gsdk.card.SmartCardCredential';
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
proto.gsdk.card.AccessOnCardData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.AccessOnCardData.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.AccessOnCardData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.AccessOnCardData.displayName = 'proto.gsdk.card.AccessOnCardData';
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
proto.gsdk.card.SmartCardData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.SmartCardData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SmartCardData.displayName = 'proto.gsdk.card.SmartCardData';
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
proto.gsdk.card.CardData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.CardData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.CardData.displayName = 'proto.gsdk.card.CardData';
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
proto.gsdk.card.ScanRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.ScanRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.ScanRequest.displayName = 'proto.gsdk.card.ScanRequest';
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
proto.gsdk.card.ScanResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.ScanResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.ScanResponse.displayName = 'proto.gsdk.card.ScanResponse';
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
proto.gsdk.card.EraseRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.EraseRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.EraseRequest.displayName = 'proto.gsdk.card.EraseRequest';
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
proto.gsdk.card.EraseResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.EraseResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.EraseResponse.displayName = 'proto.gsdk.card.EraseResponse';
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
proto.gsdk.card.WriteRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.WriteRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.WriteRequest.displayName = 'proto.gsdk.card.WriteRequest';
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
proto.gsdk.card.WriteResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.WriteResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.WriteResponse.displayName = 'proto.gsdk.card.WriteResponse';
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
proto.gsdk.card.MifareConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.MifareConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.MifareConfig.displayName = 'proto.gsdk.card.MifareConfig';
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
proto.gsdk.card.IClassConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.IClassConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.IClassConfig.displayName = 'proto.gsdk.card.IClassConfig';
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
proto.gsdk.card.DESFireConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.DESFireConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.DESFireConfig.displayName = 'proto.gsdk.card.DESFireConfig';
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
proto.gsdk.card.SEOSConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.SEOSConfig.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.SEOSConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SEOSConfig.displayName = 'proto.gsdk.card.SEOSConfig';
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
proto.gsdk.card.CardConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.CardConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.CardConfig.displayName = 'proto.gsdk.card.CardConfig';
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
proto.gsdk.card.GetConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.GetConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.GetConfigRequest.displayName = 'proto.gsdk.card.GetConfigRequest';
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
proto.gsdk.card.GetConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.GetConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.GetConfigResponse.displayName = 'proto.gsdk.card.GetConfigResponse';
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
proto.gsdk.card.SetConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.SetConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetConfigRequest.displayName = 'proto.gsdk.card.SetConfigRequest';
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
proto.gsdk.card.SetConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.SetConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetConfigResponse.displayName = 'proto.gsdk.card.SetConfigResponse';
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
proto.gsdk.card.SetConfigMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.SetConfigMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.SetConfigMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetConfigMultiRequest.displayName = 'proto.gsdk.card.SetConfigMultiRequest';
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
proto.gsdk.card.SetConfigMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.SetConfigMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.SetConfigMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetConfigMultiResponse.displayName = 'proto.gsdk.card.SetConfigMultiResponse';
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
proto.gsdk.card.BlacklistItem = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.BlacklistItem, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.BlacklistItem.displayName = 'proto.gsdk.card.BlacklistItem';
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
proto.gsdk.card.GetBlacklistRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.GetBlacklistRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.GetBlacklistRequest.displayName = 'proto.gsdk.card.GetBlacklistRequest';
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
proto.gsdk.card.GetBlacklistResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.GetBlacklistResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.GetBlacklistResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.GetBlacklistResponse.displayName = 'proto.gsdk.card.GetBlacklistResponse';
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
proto.gsdk.card.AddBlacklistRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.AddBlacklistRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.AddBlacklistRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.AddBlacklistRequest.displayName = 'proto.gsdk.card.AddBlacklistRequest';
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
proto.gsdk.card.AddBlacklistResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.AddBlacklistResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.AddBlacklistResponse.displayName = 'proto.gsdk.card.AddBlacklistResponse';
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
proto.gsdk.card.AddBlacklistMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.AddBlacklistMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.AddBlacklistMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.AddBlacklistMultiRequest.displayName = 'proto.gsdk.card.AddBlacklistMultiRequest';
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
proto.gsdk.card.AddBlacklistMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.AddBlacklistMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.AddBlacklistMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.AddBlacklistMultiResponse.displayName = 'proto.gsdk.card.AddBlacklistMultiResponse';
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
proto.gsdk.card.DeleteBlacklistRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.DeleteBlacklistRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.DeleteBlacklistRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.DeleteBlacklistRequest.displayName = 'proto.gsdk.card.DeleteBlacklistRequest';
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
proto.gsdk.card.DeleteBlacklistResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.DeleteBlacklistResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.DeleteBlacklistResponse.displayName = 'proto.gsdk.card.DeleteBlacklistResponse';
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
proto.gsdk.card.DeleteBlacklistMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.DeleteBlacklistMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.DeleteBlacklistMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.DeleteBlacklistMultiRequest.displayName = 'proto.gsdk.card.DeleteBlacklistMultiRequest';
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
proto.gsdk.card.DeleteBlacklistMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.DeleteBlacklistMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.DeleteBlacklistMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.DeleteBlacklistMultiResponse.displayName = 'proto.gsdk.card.DeleteBlacklistMultiResponse';
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
proto.gsdk.card.DeleteAllBlacklistRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.DeleteAllBlacklistRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.DeleteAllBlacklistRequest.displayName = 'proto.gsdk.card.DeleteAllBlacklistRequest';
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
proto.gsdk.card.DeleteAllBlacklistResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.DeleteAllBlacklistResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.DeleteAllBlacklistResponse.displayName = 'proto.gsdk.card.DeleteAllBlacklistResponse';
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
proto.gsdk.card.DeleteAllBlacklistMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.DeleteAllBlacklistMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.DeleteAllBlacklistMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.DeleteAllBlacklistMultiRequest.displayName = 'proto.gsdk.card.DeleteAllBlacklistMultiRequest';
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
proto.gsdk.card.DeleteAllBlacklistMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.DeleteAllBlacklistMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.DeleteAllBlacklistMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.DeleteAllBlacklistMultiResponse.displayName = 'proto.gsdk.card.DeleteAllBlacklistMultiResponse';
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
proto.gsdk.card.Card1XConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.Card1XConfig.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.Card1XConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.Card1XConfig.displayName = 'proto.gsdk.card.Card1XConfig';
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
proto.gsdk.card.Get1XConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.Get1XConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.Get1XConfigRequest.displayName = 'proto.gsdk.card.Get1XConfigRequest';
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
proto.gsdk.card.Get1XConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.Get1XConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.Get1XConfigResponse.displayName = 'proto.gsdk.card.Get1XConfigResponse';
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
proto.gsdk.card.Set1XConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.Set1XConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.Set1XConfigRequest.displayName = 'proto.gsdk.card.Set1XConfigRequest';
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
proto.gsdk.card.Set1XConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.Set1XConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.Set1XConfigResponse.displayName = 'proto.gsdk.card.Set1XConfigResponse';
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
proto.gsdk.card.Set1XConfigMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.Set1XConfigMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.Set1XConfigMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.Set1XConfigMultiRequest.displayName = 'proto.gsdk.card.Set1XConfigMultiRequest';
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
proto.gsdk.card.Set1XConfigMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.Set1XConfigMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.Set1XConfigMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.Set1XConfigMultiResponse.displayName = 'proto.gsdk.card.Set1XConfigMultiResponse';
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
proto.gsdk.card.WriteQRCodeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.WriteQRCodeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.WriteQRCodeRequest.displayName = 'proto.gsdk.card.WriteQRCodeRequest';
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
proto.gsdk.card.WriteQRCodeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.WriteQRCodeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.WriteQRCodeResponse.displayName = 'proto.gsdk.card.WriteQRCodeResponse';
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
proto.gsdk.card.QRConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.QRConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.QRConfig.displayName = 'proto.gsdk.card.QRConfig';
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
proto.gsdk.card.GetQRConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.GetQRConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.GetQRConfigRequest.displayName = 'proto.gsdk.card.GetQRConfigRequest';
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
proto.gsdk.card.GetQRConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.GetQRConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.GetQRConfigResponse.displayName = 'proto.gsdk.card.GetQRConfigResponse';
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
proto.gsdk.card.SetQRConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.SetQRConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetQRConfigRequest.displayName = 'proto.gsdk.card.SetQRConfigRequest';
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
proto.gsdk.card.SetQRConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.SetQRConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetQRConfigResponse.displayName = 'proto.gsdk.card.SetQRConfigResponse';
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
proto.gsdk.card.SetQRConfigMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.SetQRConfigMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.SetQRConfigMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetQRConfigMultiRequest.displayName = 'proto.gsdk.card.SetQRConfigMultiRequest';
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
proto.gsdk.card.SetQRConfigMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.SetQRConfigMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.SetQRConfigMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetQRConfigMultiResponse.displayName = 'proto.gsdk.card.SetQRConfigMultiResponse';
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
proto.gsdk.card.DESFireAppLevelKey = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.DESFireAppLevelKey, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.DESFireAppLevelKey.displayName = 'proto.gsdk.card.DESFireAppLevelKey';
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
proto.gsdk.card.CustomMifareCard = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.CustomMifareCard, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.CustomMifareCard.displayName = 'proto.gsdk.card.CustomMifareCard';
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
proto.gsdk.card.CustomDESFireCard = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.CustomDESFireCard, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.CustomDESFireCard.displayName = 'proto.gsdk.card.CustomDESFireCard';
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
proto.gsdk.card.CustomConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.CustomConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.CustomConfig.displayName = 'proto.gsdk.card.CustomConfig';
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
proto.gsdk.card.GetCustomConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.GetCustomConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.GetCustomConfigRequest.displayName = 'proto.gsdk.card.GetCustomConfigRequest';
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
proto.gsdk.card.GetCustomConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.GetCustomConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.GetCustomConfigResponse.displayName = 'proto.gsdk.card.GetCustomConfigResponse';
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
proto.gsdk.card.SetCustomConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.SetCustomConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetCustomConfigRequest.displayName = 'proto.gsdk.card.SetCustomConfigRequest';
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
proto.gsdk.card.SetCustomConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.SetCustomConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetCustomConfigResponse.displayName = 'proto.gsdk.card.SetCustomConfigResponse';
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
proto.gsdk.card.SetCustomConfigMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.SetCustomConfigMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.SetCustomConfigMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetCustomConfigMultiRequest.displayName = 'proto.gsdk.card.SetCustomConfigMultiRequest';
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
proto.gsdk.card.SetCustomConfigMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.SetCustomConfigMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.SetCustomConfigMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetCustomConfigMultiResponse.displayName = 'proto.gsdk.card.SetCustomConfigMultiResponse';
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
proto.gsdk.card.FacilityCode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.FacilityCode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.FacilityCode.displayName = 'proto.gsdk.card.FacilityCode';
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
proto.gsdk.card.FacilityCodeConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.FacilityCodeConfig.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.FacilityCodeConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.FacilityCodeConfig.displayName = 'proto.gsdk.card.FacilityCodeConfig';
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
proto.gsdk.card.GetFacilityCodeConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.GetFacilityCodeConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.GetFacilityCodeConfigRequest.displayName = 'proto.gsdk.card.GetFacilityCodeConfigRequest';
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
proto.gsdk.card.GetFacilityCodeConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.GetFacilityCodeConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.GetFacilityCodeConfigResponse.displayName = 'proto.gsdk.card.GetFacilityCodeConfigResponse';
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
proto.gsdk.card.SetFacilityCodeConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.SetFacilityCodeConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetFacilityCodeConfigRequest.displayName = 'proto.gsdk.card.SetFacilityCodeConfigRequest';
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
proto.gsdk.card.SetFacilityCodeConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.gsdk.card.SetFacilityCodeConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetFacilityCodeConfigResponse.displayName = 'proto.gsdk.card.SetFacilityCodeConfigResponse';
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
proto.gsdk.card.SetFacilityCodeConfigMultiRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.SetFacilityCodeConfigMultiRequest.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.SetFacilityCodeConfigMultiRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetFacilityCodeConfigMultiRequest.displayName = 'proto.gsdk.card.SetFacilityCodeConfigMultiRequest';
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
proto.gsdk.card.SetFacilityCodeConfigMultiResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.gsdk.card.SetFacilityCodeConfigMultiResponse.repeatedFields_, null);
};
goog.inherits(proto.gsdk.card.SetFacilityCodeConfigMultiResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.gsdk.card.SetFacilityCodeConfigMultiResponse.displayName = 'proto.gsdk.card.SetFacilityCodeConfigMultiResponse';
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
proto.gsdk.card.CSNCardData.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.CSNCardData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.CSNCardData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CSNCardData.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    size: jspb.Message.getFieldWithDefault(msg, 2, 0),
    data: msg.getData_asB64()
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
 * @return {!proto.gsdk.card.CSNCardData}
 */
proto.gsdk.card.CSNCardData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.CSNCardData;
  return proto.gsdk.card.CSNCardData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.CSNCardData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.CSNCardData}
 */
proto.gsdk.card.CSNCardData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.gsdk.card.Type} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSize(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
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
proto.gsdk.card.CSNCardData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.CSNCardData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.CSNCardData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CSNCardData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getSize();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
};


/**
 * optional Type type = 1;
 * @return {!proto.gsdk.card.Type}
 */
proto.gsdk.card.CSNCardData.prototype.getType = function() {
  return /** @type {!proto.gsdk.card.Type} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gsdk.card.Type} value
 * @return {!proto.gsdk.card.CSNCardData} returns this
 */
proto.gsdk.card.CSNCardData.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional int32 size = 2;
 * @return {number}
 */
proto.gsdk.card.CSNCardData.prototype.getSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.CSNCardData} returns this
 */
proto.gsdk.card.CSNCardData.prototype.setSize = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes data = 3;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.CSNCardData.prototype.getData = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes data = 3;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.gsdk.card.CSNCardData.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.CSNCardData.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.CSNCardData} returns this
 */
proto.gsdk.card.CSNCardData.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.gsdk.card.SmartCardHeader.oneofGroups_ = [[4,10]];

/**
 * @enum {number}
 */
proto.gsdk.card.SmartCardHeader.TemplatecountCase = {
  TEMPLATECOUNT_NOT_SET: 0,
  NUMOFTEMPLATE: 4,
  NUMOFFACETEMPLATE: 10
};

/**
 * @return {proto.gsdk.card.SmartCardHeader.TemplatecountCase}
 */
proto.gsdk.card.SmartCardHeader.prototype.getTemplatecountCase = function() {
  return /** @type {proto.gsdk.card.SmartCardHeader.TemplatecountCase} */(jspb.Message.computeOneofCase(this, proto.gsdk.card.SmartCardHeader.oneofGroups_[0]));
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
proto.gsdk.card.SmartCardHeader.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SmartCardHeader.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SmartCardHeader} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SmartCardHeader.toObject = function(includeInstance, msg) {
  var f, obj = {
    headercrc: jspb.Message.getFieldWithDefault(msg, 1, 0),
    cardcrc: jspb.Message.getFieldWithDefault(msg, 2, 0),
    type: jspb.Message.getFieldWithDefault(msg, 3, 0),
    numoftemplate: jspb.Message.getFieldWithDefault(msg, 4, 0),
    numoffacetemplate: jspb.Message.getFieldWithDefault(msg, 10, 0),
    templatesize: jspb.Message.getFieldWithDefault(msg, 5, 0),
    issuecount: jspb.Message.getFieldWithDefault(msg, 6, 0),
    duressmask: jspb.Message.getFieldWithDefault(msg, 7, 0),
    cardauthmode: jspb.Message.getFieldWithDefault(msg, 8, 0),
    usealphanumericid: jspb.Message.getBooleanFieldWithDefault(msg, 9, false),
    cardauthmodeex: jspb.Message.getFieldWithDefault(msg, 11, 0)
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
 * @return {!proto.gsdk.card.SmartCardHeader}
 */
proto.gsdk.card.SmartCardHeader.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SmartCardHeader;
  return proto.gsdk.card.SmartCardHeader.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SmartCardHeader} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SmartCardHeader}
 */
proto.gsdk.card.SmartCardHeader.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setHeadercrc(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCardcrc(value);
      break;
    case 3:
      var value = /** @type {!proto.gsdk.card.Type} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNumoftemplate(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNumoffacetemplate(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTemplatesize(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setIssuecount(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setDuressmask(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCardauthmode(value);
      break;
    case 9:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUsealphanumericid(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCardauthmodeex(value);
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
proto.gsdk.card.SmartCardHeader.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SmartCardHeader.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SmartCardHeader} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SmartCardHeader.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHeadercrc();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getCardcrc();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 10));
  if (f != null) {
    writer.writeUint32(
      10,
      f
    );
  }
  f = message.getTemplatesize();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
  f = message.getIssuecount();
  if (f !== 0) {
    writer.writeUint32(
      6,
      f
    );
  }
  f = message.getDuressmask();
  if (f !== 0) {
    writer.writeUint32(
      7,
      f
    );
  }
  f = message.getCardauthmode();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
  f = message.getUsealphanumericid();
  if (f) {
    writer.writeBool(
      9,
      f
    );
  }
  f = message.getCardauthmodeex();
  if (f !== 0) {
    writer.writeUint32(
      11,
      f
    );
  }
};


/**
 * optional uint32 headerCRC = 1;
 * @return {number}
 */
proto.gsdk.card.SmartCardHeader.prototype.getHeadercrc = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setHeadercrc = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint32 cardCRC = 2;
 * @return {number}
 */
proto.gsdk.card.SmartCardHeader.prototype.getCardcrc = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setCardcrc = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional Type type = 3;
 * @return {!proto.gsdk.card.Type}
 */
proto.gsdk.card.SmartCardHeader.prototype.getType = function() {
  return /** @type {!proto.gsdk.card.Type} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.gsdk.card.Type} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional uint32 numOfTemplate = 4;
 * @return {number}
 */
proto.gsdk.card.SmartCardHeader.prototype.getNumoftemplate = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setNumoftemplate = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.gsdk.card.SmartCardHeader.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.clearNumoftemplate = function() {
  return jspb.Message.setOneofField(this, 4, proto.gsdk.card.SmartCardHeader.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SmartCardHeader.prototype.hasNumoftemplate = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional uint32 numOfFaceTemplate = 10;
 * @return {number}
 */
proto.gsdk.card.SmartCardHeader.prototype.getNumoffacetemplate = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setNumoffacetemplate = function(value) {
  return jspb.Message.setOneofField(this, 10, proto.gsdk.card.SmartCardHeader.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.clearNumoffacetemplate = function() {
  return jspb.Message.setOneofField(this, 10, proto.gsdk.card.SmartCardHeader.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SmartCardHeader.prototype.hasNumoffacetemplate = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional uint32 templateSize = 5;
 * @return {number}
 */
proto.gsdk.card.SmartCardHeader.prototype.getTemplatesize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setTemplatesize = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional uint32 issueCount = 6;
 * @return {number}
 */
proto.gsdk.card.SmartCardHeader.prototype.getIssuecount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setIssuecount = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional uint32 duressMask = 7;
 * @return {number}
 */
proto.gsdk.card.SmartCardHeader.prototype.getDuressmask = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setDuressmask = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional uint32 cardAuthMode = 8;
 * @return {number}
 */
proto.gsdk.card.SmartCardHeader.prototype.getCardauthmode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setCardauthmode = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional bool useAlphanumericID = 9;
 * @return {boolean}
 */
proto.gsdk.card.SmartCardHeader.prototype.getUsealphanumericid = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 9, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setUsealphanumericid = function(value) {
  return jspb.Message.setProto3BooleanField(this, 9, value);
};


/**
 * optional uint32 cardAuthModeEx = 11;
 * @return {number}
 */
proto.gsdk.card.SmartCardHeader.prototype.getCardauthmodeex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SmartCardHeader} returns this
 */
proto.gsdk.card.SmartCardHeader.prototype.setCardauthmodeex = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.SmartCardCredential.repeatedFields_ = [2];



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
proto.gsdk.card.SmartCardCredential.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SmartCardCredential.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SmartCardCredential} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SmartCardCredential.toObject = function(includeInstance, msg) {
  var f, obj = {
    pin: msg.getPin_asB64(),
    templatesList: msg.getTemplatesList_asB64()
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
 * @return {!proto.gsdk.card.SmartCardCredential}
 */
proto.gsdk.card.SmartCardCredential.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SmartCardCredential;
  return proto.gsdk.card.SmartCardCredential.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SmartCardCredential} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SmartCardCredential}
 */
proto.gsdk.card.SmartCardCredential.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPin(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addTemplates(value);
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
proto.gsdk.card.SmartCardCredential.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SmartCardCredential.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SmartCardCredential} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SmartCardCredential.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPin_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getTemplatesList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
};


/**
 * optional bytes PIN = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.SmartCardCredential.prototype.getPin = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes PIN = 1;
 * This is a type-conversion wrapper around `getPin()`
 * @return {string}
 */
proto.gsdk.card.SmartCardCredential.prototype.getPin_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPin()));
};


/**
 * optional bytes PIN = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPin()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.SmartCardCredential.prototype.getPin_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPin()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.SmartCardCredential} returns this
 */
proto.gsdk.card.SmartCardCredential.prototype.setPin = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * repeated bytes templates = 2;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.gsdk.card.SmartCardCredential.prototype.getTemplatesList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * repeated bytes templates = 2;
 * This is a type-conversion wrapper around `getTemplatesList()`
 * @return {!Array<string>}
 */
proto.gsdk.card.SmartCardCredential.prototype.getTemplatesList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getTemplatesList()));
};


/**
 * repeated bytes templates = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTemplatesList()`
 * @return {!Array<!Uint8Array>}
 */
proto.gsdk.card.SmartCardCredential.prototype.getTemplatesList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getTemplatesList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.gsdk.card.SmartCardCredential} returns this
 */
proto.gsdk.card.SmartCardCredential.prototype.setTemplatesList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.SmartCardCredential} returns this
 */
proto.gsdk.card.SmartCardCredential.prototype.addTemplates = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SmartCardCredential} returns this
 */
proto.gsdk.card.SmartCardCredential.prototype.clearTemplatesList = function() {
  return this.setTemplatesList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.AccessOnCardData.repeatedFields_ = [1];



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
proto.gsdk.card.AccessOnCardData.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.AccessOnCardData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.AccessOnCardData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.AccessOnCardData.toObject = function(includeInstance, msg) {
  var f, obj = {
    accessgroupidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    starttime: jspb.Message.getFieldWithDefault(msg, 2, 0),
    endtime: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * @return {!proto.gsdk.card.AccessOnCardData}
 */
proto.gsdk.card.AccessOnCardData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.AccessOnCardData;
  return proto.gsdk.card.AccessOnCardData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.AccessOnCardData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.AccessOnCardData}
 */
proto.gsdk.card.AccessOnCardData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addAccessgroupids(values[i]);
      }
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStarttime(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setEndtime(value);
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
proto.gsdk.card.AccessOnCardData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.AccessOnCardData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.AccessOnCardData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.AccessOnCardData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAccessgroupidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getStarttime();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getEndtime();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * repeated uint32 accessGroupIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.card.AccessOnCardData.prototype.getAccessgroupidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.AccessOnCardData} returns this
 */
proto.gsdk.card.AccessOnCardData.prototype.setAccessgroupidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.AccessOnCardData} returns this
 */
proto.gsdk.card.AccessOnCardData.prototype.addAccessgroupids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.AccessOnCardData} returns this
 */
proto.gsdk.card.AccessOnCardData.prototype.clearAccessgroupidsList = function() {
  return this.setAccessgroupidsList([]);
};


/**
 * optional uint32 startTime = 2;
 * @return {number}
 */
proto.gsdk.card.AccessOnCardData.prototype.getStarttime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.AccessOnCardData} returns this
 */
proto.gsdk.card.AccessOnCardData.prototype.setStarttime = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional uint32 endTime = 3;
 * @return {number}
 */
proto.gsdk.card.AccessOnCardData.prototype.getEndtime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.AccessOnCardData} returns this
 */
proto.gsdk.card.AccessOnCardData.prototype.setEndtime = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
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
proto.gsdk.card.SmartCardData.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SmartCardData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SmartCardData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SmartCardData.toObject = function(includeInstance, msg) {
  var f, obj = {
    header: (f = msg.getHeader()) && proto.gsdk.card.SmartCardHeader.toObject(includeInstance, f),
    cardid: msg.getCardid_asB64(),
    credential: (f = msg.getCredential()) && proto.gsdk.card.SmartCardCredential.toObject(includeInstance, f),
    accessondata: (f = msg.getAccessondata()) && proto.gsdk.card.AccessOnCardData.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.SmartCardData}
 */
proto.gsdk.card.SmartCardData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SmartCardData;
  return proto.gsdk.card.SmartCardData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SmartCardData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SmartCardData}
 */
proto.gsdk.card.SmartCardData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.card.SmartCardHeader;
      reader.readMessage(value,proto.gsdk.card.SmartCardHeader.deserializeBinaryFromReader);
      msg.setHeader(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCardid(value);
      break;
    case 3:
      var value = new proto.gsdk.card.SmartCardCredential;
      reader.readMessage(value,proto.gsdk.card.SmartCardCredential.deserializeBinaryFromReader);
      msg.setCredential(value);
      break;
    case 4:
      var value = new proto.gsdk.card.AccessOnCardData;
      reader.readMessage(value,proto.gsdk.card.AccessOnCardData.deserializeBinaryFromReader);
      msg.setAccessondata(value);
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
proto.gsdk.card.SmartCardData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SmartCardData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SmartCardData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SmartCardData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHeader();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gsdk.card.SmartCardHeader.serializeBinaryToWriter
    );
  }
  f = message.getCardid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getCredential();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gsdk.card.SmartCardCredential.serializeBinaryToWriter
    );
  }
  f = message.getAccessondata();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.gsdk.card.AccessOnCardData.serializeBinaryToWriter
    );
  }
};


/**
 * optional SmartCardHeader header = 1;
 * @return {?proto.gsdk.card.SmartCardHeader}
 */
proto.gsdk.card.SmartCardData.prototype.getHeader = function() {
  return /** @type{?proto.gsdk.card.SmartCardHeader} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.SmartCardHeader, 1));
};


/**
 * @param {?proto.gsdk.card.SmartCardHeader|undefined} value
 * @return {!proto.gsdk.card.SmartCardData} returns this
*/
proto.gsdk.card.SmartCardData.prototype.setHeader = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SmartCardData} returns this
 */
proto.gsdk.card.SmartCardData.prototype.clearHeader = function() {
  return this.setHeader(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SmartCardData.prototype.hasHeader = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes cardID = 2;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.SmartCardData.prototype.getCardid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes cardID = 2;
 * This is a type-conversion wrapper around `getCardid()`
 * @return {string}
 */
proto.gsdk.card.SmartCardData.prototype.getCardid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCardid()));
};


/**
 * optional bytes cardID = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCardid()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.SmartCardData.prototype.getCardid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCardid()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.SmartCardData} returns this
 */
proto.gsdk.card.SmartCardData.prototype.setCardid = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional SmartCardCredential credential = 3;
 * @return {?proto.gsdk.card.SmartCardCredential}
 */
proto.gsdk.card.SmartCardData.prototype.getCredential = function() {
  return /** @type{?proto.gsdk.card.SmartCardCredential} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.SmartCardCredential, 3));
};


/**
 * @param {?proto.gsdk.card.SmartCardCredential|undefined} value
 * @return {!proto.gsdk.card.SmartCardData} returns this
*/
proto.gsdk.card.SmartCardData.prototype.setCredential = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SmartCardData} returns this
 */
proto.gsdk.card.SmartCardData.prototype.clearCredential = function() {
  return this.setCredential(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SmartCardData.prototype.hasCredential = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional AccessOnCardData accessOnData = 4;
 * @return {?proto.gsdk.card.AccessOnCardData}
 */
proto.gsdk.card.SmartCardData.prototype.getAccessondata = function() {
  return /** @type{?proto.gsdk.card.AccessOnCardData} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.AccessOnCardData, 4));
};


/**
 * @param {?proto.gsdk.card.AccessOnCardData|undefined} value
 * @return {!proto.gsdk.card.SmartCardData} returns this
*/
proto.gsdk.card.SmartCardData.prototype.setAccessondata = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SmartCardData} returns this
 */
proto.gsdk.card.SmartCardData.prototype.clearAccessondata = function() {
  return this.setAccessondata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SmartCardData.prototype.hasAccessondata = function() {
  return jspb.Message.getField(this, 4) != null;
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
proto.gsdk.card.CardData.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.CardData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.CardData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CardData.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    csncarddata: (f = msg.getCsncarddata()) && proto.gsdk.card.CSNCardData.toObject(includeInstance, f),
    smartcarddata: (f = msg.getSmartcarddata()) && proto.gsdk.card.SmartCardData.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.CardData}
 */
proto.gsdk.card.CardData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.CardData;
  return proto.gsdk.card.CardData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.CardData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.CardData}
 */
proto.gsdk.card.CardData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.gsdk.card.Type} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = new proto.gsdk.card.CSNCardData;
      reader.readMessage(value,proto.gsdk.card.CSNCardData.deserializeBinaryFromReader);
      msg.setCsncarddata(value);
      break;
    case 3:
      var value = new proto.gsdk.card.SmartCardData;
      reader.readMessage(value,proto.gsdk.card.SmartCardData.deserializeBinaryFromReader);
      msg.setSmartcarddata(value);
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
proto.gsdk.card.CardData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.CardData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.CardData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CardData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getCsncarddata();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.CSNCardData.serializeBinaryToWriter
    );
  }
  f = message.getSmartcarddata();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gsdk.card.SmartCardData.serializeBinaryToWriter
    );
  }
};


/**
 * optional Type type = 1;
 * @return {!proto.gsdk.card.Type}
 */
proto.gsdk.card.CardData.prototype.getType = function() {
  return /** @type {!proto.gsdk.card.Type} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gsdk.card.Type} value
 * @return {!proto.gsdk.card.CardData} returns this
 */
proto.gsdk.card.CardData.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional CSNCardData CSNCardData = 2;
 * @return {?proto.gsdk.card.CSNCardData}
 */
proto.gsdk.card.CardData.prototype.getCsncarddata = function() {
  return /** @type{?proto.gsdk.card.CSNCardData} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CSNCardData, 2));
};


/**
 * @param {?proto.gsdk.card.CSNCardData|undefined} value
 * @return {!proto.gsdk.card.CardData} returns this
*/
proto.gsdk.card.CardData.prototype.setCsncarddata = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.CardData} returns this
 */
proto.gsdk.card.CardData.prototype.clearCsncarddata = function() {
  return this.setCsncarddata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.CardData.prototype.hasCsncarddata = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional SmartCardData smartCardData = 3;
 * @return {?proto.gsdk.card.SmartCardData}
 */
proto.gsdk.card.CardData.prototype.getSmartcarddata = function() {
  return /** @type{?proto.gsdk.card.SmartCardData} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.SmartCardData, 3));
};


/**
 * @param {?proto.gsdk.card.SmartCardData|undefined} value
 * @return {!proto.gsdk.card.CardData} returns this
*/
proto.gsdk.card.CardData.prototype.setSmartcarddata = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.CardData} returns this
 */
proto.gsdk.card.CardData.prototype.clearSmartcarddata = function() {
  return this.setSmartcarddata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.CardData.prototype.hasSmartcarddata = function() {
  return jspb.Message.getField(this, 3) != null;
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
proto.gsdk.card.ScanRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.ScanRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.ScanRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.ScanRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.ScanRequest}
 */
proto.gsdk.card.ScanRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.ScanRequest;
  return proto.gsdk.card.ScanRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.ScanRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.ScanRequest}
 */
proto.gsdk.card.ScanRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.ScanRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.ScanRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.ScanRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.ScanRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.ScanRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.ScanRequest} returns this
 */
proto.gsdk.card.ScanRequest.prototype.setDeviceid = function(value) {
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
proto.gsdk.card.ScanResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.ScanResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.ScanResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.ScanResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    carddata: (f = msg.getCarddata()) && proto.gsdk.card.CardData.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.ScanResponse}
 */
proto.gsdk.card.ScanResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.ScanResponse;
  return proto.gsdk.card.ScanResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.ScanResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.ScanResponse}
 */
proto.gsdk.card.ScanResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.card.CardData;
      reader.readMessage(value,proto.gsdk.card.CardData.deserializeBinaryFromReader);
      msg.setCarddata(value);
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
proto.gsdk.card.ScanResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.ScanResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.ScanResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.ScanResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCarddata();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gsdk.card.CardData.serializeBinaryToWriter
    );
  }
};


/**
 * optional CardData cardData = 1;
 * @return {?proto.gsdk.card.CardData}
 */
proto.gsdk.card.ScanResponse.prototype.getCarddata = function() {
  return /** @type{?proto.gsdk.card.CardData} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CardData, 1));
};


/**
 * @param {?proto.gsdk.card.CardData|undefined} value
 * @return {!proto.gsdk.card.ScanResponse} returns this
*/
proto.gsdk.card.ScanResponse.prototype.setCarddata = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.ScanResponse} returns this
 */
proto.gsdk.card.ScanResponse.prototype.clearCarddata = function() {
  return this.setCarddata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.ScanResponse.prototype.hasCarddata = function() {
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
proto.gsdk.card.EraseRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.EraseRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.EraseRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.EraseRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.EraseRequest}
 */
proto.gsdk.card.EraseRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.EraseRequest;
  return proto.gsdk.card.EraseRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.EraseRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.EraseRequest}
 */
proto.gsdk.card.EraseRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.EraseRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.EraseRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.EraseRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.EraseRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.EraseRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.EraseRequest} returns this
 */
proto.gsdk.card.EraseRequest.prototype.setDeviceid = function(value) {
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
proto.gsdk.card.EraseResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.EraseResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.EraseResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.EraseResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.EraseResponse}
 */
proto.gsdk.card.EraseResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.EraseResponse;
  return proto.gsdk.card.EraseResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.EraseResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.EraseResponse}
 */
proto.gsdk.card.EraseResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.EraseResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.EraseResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.EraseResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.EraseResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.WriteRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.WriteRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.WriteRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.WriteRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    smartcarddata: (f = msg.getSmartcarddata()) && proto.gsdk.card.SmartCardData.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.WriteRequest}
 */
proto.gsdk.card.WriteRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.WriteRequest;
  return proto.gsdk.card.WriteRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.WriteRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.WriteRequest}
 */
proto.gsdk.card.WriteRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.SmartCardData;
      reader.readMessage(value,proto.gsdk.card.SmartCardData.deserializeBinaryFromReader);
      msg.setSmartcarddata(value);
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
proto.gsdk.card.WriteRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.WriteRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.WriteRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.WriteRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getSmartcarddata();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.SmartCardData.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.card.WriteRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.WriteRequest} returns this
 */
proto.gsdk.card.WriteRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional SmartCardData smartCardData = 2;
 * @return {?proto.gsdk.card.SmartCardData}
 */
proto.gsdk.card.WriteRequest.prototype.getSmartcarddata = function() {
  return /** @type{?proto.gsdk.card.SmartCardData} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.SmartCardData, 2));
};


/**
 * @param {?proto.gsdk.card.SmartCardData|undefined} value
 * @return {!proto.gsdk.card.WriteRequest} returns this
*/
proto.gsdk.card.WriteRequest.prototype.setSmartcarddata = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.WriteRequest} returns this
 */
proto.gsdk.card.WriteRequest.prototype.clearSmartcarddata = function() {
  return this.setSmartcarddata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.WriteRequest.prototype.hasSmartcarddata = function() {
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
proto.gsdk.card.WriteResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.WriteResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.WriteResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.WriteResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.WriteResponse}
 */
proto.gsdk.card.WriteResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.WriteResponse;
  return proto.gsdk.card.WriteResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.WriteResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.WriteResponse}
 */
proto.gsdk.card.WriteResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.WriteResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.WriteResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.WriteResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.WriteResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.MifareConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.MifareConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.MifareConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.MifareConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    primarykey: msg.getPrimarykey_asB64(),
    secondarykey: msg.getSecondarykey_asB64(),
    startblockindex: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * @return {!proto.gsdk.card.MifareConfig}
 */
proto.gsdk.card.MifareConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.MifareConfig;
  return proto.gsdk.card.MifareConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.MifareConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.MifareConfig}
 */
proto.gsdk.card.MifareConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPrimarykey(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSecondarykey(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartblockindex(value);
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
proto.gsdk.card.MifareConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.MifareConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.MifareConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.MifareConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPrimarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getSecondarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getStartblockindex();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional bytes primaryKey = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.MifareConfig.prototype.getPrimarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes primaryKey = 1;
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {string}
 */
proto.gsdk.card.MifareConfig.prototype.getPrimarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPrimarykey()));
};


/**
 * optional bytes primaryKey = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.MifareConfig.prototype.getPrimarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPrimarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.MifareConfig} returns this
 */
proto.gsdk.card.MifareConfig.prototype.setPrimarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes secondaryKey = 2;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.MifareConfig.prototype.getSecondarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes secondaryKey = 2;
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {string}
 */
proto.gsdk.card.MifareConfig.prototype.getSecondarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSecondarykey()));
};


/**
 * optional bytes secondaryKey = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.MifareConfig.prototype.getSecondarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSecondarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.MifareConfig} returns this
 */
proto.gsdk.card.MifareConfig.prototype.setSecondarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional int32 startBlockIndex = 3;
 * @return {number}
 */
proto.gsdk.card.MifareConfig.prototype.getStartblockindex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.MifareConfig} returns this
 */
proto.gsdk.card.MifareConfig.prototype.setStartblockindex = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
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
proto.gsdk.card.IClassConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.IClassConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.IClassConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.IClassConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    primarykey: msg.getPrimarykey_asB64(),
    secondarykey: msg.getSecondarykey_asB64(),
    startblockindex: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * @return {!proto.gsdk.card.IClassConfig}
 */
proto.gsdk.card.IClassConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.IClassConfig;
  return proto.gsdk.card.IClassConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.IClassConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.IClassConfig}
 */
proto.gsdk.card.IClassConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPrimarykey(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSecondarykey(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartblockindex(value);
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
proto.gsdk.card.IClassConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.IClassConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.IClassConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.IClassConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPrimarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getSecondarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getStartblockindex();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional bytes primaryKey = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.IClassConfig.prototype.getPrimarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes primaryKey = 1;
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {string}
 */
proto.gsdk.card.IClassConfig.prototype.getPrimarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPrimarykey()));
};


/**
 * optional bytes primaryKey = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.IClassConfig.prototype.getPrimarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPrimarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.IClassConfig} returns this
 */
proto.gsdk.card.IClassConfig.prototype.setPrimarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes secondaryKey = 2;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.IClassConfig.prototype.getSecondarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes secondaryKey = 2;
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {string}
 */
proto.gsdk.card.IClassConfig.prototype.getSecondarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSecondarykey()));
};


/**
 * optional bytes secondaryKey = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.IClassConfig.prototype.getSecondarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSecondarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.IClassConfig} returns this
 */
proto.gsdk.card.IClassConfig.prototype.setSecondarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional int32 startBlockIndex = 3;
 * @return {number}
 */
proto.gsdk.card.IClassConfig.prototype.getStartblockindex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.IClassConfig} returns this
 */
proto.gsdk.card.IClassConfig.prototype.setStartblockindex = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
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
proto.gsdk.card.DESFireConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.DESFireConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.DESFireConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DESFireConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    primarykey: msg.getPrimarykey_asB64(),
    secondarykey: msg.getSecondarykey_asB64(),
    appid: msg.getAppid_asB64(),
    fileid: jspb.Message.getFieldWithDefault(msg, 4, 0),
    encryptiontype: jspb.Message.getFieldWithDefault(msg, 5, 0),
    operationmode: jspb.Message.getFieldWithDefault(msg, 6, 0)
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
 * @return {!proto.gsdk.card.DESFireConfig}
 */
proto.gsdk.card.DESFireConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.DESFireConfig;
  return proto.gsdk.card.DESFireConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.DESFireConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.DESFireConfig}
 */
proto.gsdk.card.DESFireConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPrimarykey(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSecondarykey(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAppid(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setFileid(value);
      break;
    case 5:
      var value = /** @type {!proto.gsdk.card.DESFireEncryptionType} */ (reader.readEnum());
      msg.setEncryptiontype(value);
      break;
    case 6:
      var value = /** @type {!proto.gsdk.card.DESFireOperationMode} */ (reader.readEnum());
      msg.setOperationmode(value);
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
proto.gsdk.card.DESFireConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.DESFireConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.DESFireConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DESFireConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPrimarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getSecondarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getAppid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getFileid();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = message.getEncryptiontype();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getOperationmode();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
};


/**
 * optional bytes primaryKey = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.DESFireConfig.prototype.getPrimarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes primaryKey = 1;
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {string}
 */
proto.gsdk.card.DESFireConfig.prototype.getPrimarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPrimarykey()));
};


/**
 * optional bytes primaryKey = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.DESFireConfig.prototype.getPrimarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPrimarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.DESFireConfig} returns this
 */
proto.gsdk.card.DESFireConfig.prototype.setPrimarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes secondaryKey = 2;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.DESFireConfig.prototype.getSecondarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes secondaryKey = 2;
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {string}
 */
proto.gsdk.card.DESFireConfig.prototype.getSecondarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSecondarykey()));
};


/**
 * optional bytes secondaryKey = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.DESFireConfig.prototype.getSecondarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSecondarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.DESFireConfig} returns this
 */
proto.gsdk.card.DESFireConfig.prototype.setSecondarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional bytes appID = 3;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.DESFireConfig.prototype.getAppid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes appID = 3;
 * This is a type-conversion wrapper around `getAppid()`
 * @return {string}
 */
proto.gsdk.card.DESFireConfig.prototype.getAppid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAppid()));
};


/**
 * optional bytes appID = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAppid()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.DESFireConfig.prototype.getAppid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAppid()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.DESFireConfig} returns this
 */
proto.gsdk.card.DESFireConfig.prototype.setAppid = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional uint32 fileID = 4;
 * @return {number}
 */
proto.gsdk.card.DESFireConfig.prototype.getFileid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.DESFireConfig} returns this
 */
proto.gsdk.card.DESFireConfig.prototype.setFileid = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional DESFireEncryptionType encryptionType = 5;
 * @return {!proto.gsdk.card.DESFireEncryptionType}
 */
proto.gsdk.card.DESFireConfig.prototype.getEncryptiontype = function() {
  return /** @type {!proto.gsdk.card.DESFireEncryptionType} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.gsdk.card.DESFireEncryptionType} value
 * @return {!proto.gsdk.card.DESFireConfig} returns this
 */
proto.gsdk.card.DESFireConfig.prototype.setEncryptiontype = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional DESFireOperationMode operationMode = 6;
 * @return {!proto.gsdk.card.DESFireOperationMode}
 */
proto.gsdk.card.DESFireConfig.prototype.getOperationmode = function() {
  return /** @type {!proto.gsdk.card.DESFireOperationMode} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.gsdk.card.DESFireOperationMode} value
 * @return {!proto.gsdk.card.DESFireConfig} returns this
 */
proto.gsdk.card.DESFireConfig.prototype.setOperationmode = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.SEOSConfig.repeatedFields_ = [3,4];



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
proto.gsdk.card.SEOSConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SEOSConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SEOSConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SEOSConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    oidadf: msg.getOidadf_asB64(),
    sizeadf: jspb.Message.getFieldWithDefault(msg, 2, 0),
    oiddataobjectidList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    sizedataobjectList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f,
    primarykeyauth: msg.getPrimarykeyauth_asB64(),
    secondarykeyauth: msg.getSecondarykeyauth_asB64()
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
 * @return {!proto.gsdk.card.SEOSConfig}
 */
proto.gsdk.card.SEOSConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SEOSConfig;
  return proto.gsdk.card.SEOSConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SEOSConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SEOSConfig}
 */
proto.gsdk.card.SEOSConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOidadf(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setSizeadf(value);
      break;
    case 3:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addOiddataobjectid(values[i]);
      }
      break;
    case 4:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addSizedataobject(values[i]);
      }
      break;
    case 5:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPrimarykeyauth(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSecondarykeyauth(value);
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
proto.gsdk.card.SEOSConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SEOSConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SEOSConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SEOSConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOidadf_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getSizeadf();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getOiddataobjectidList();
  if (f.length > 0) {
    writer.writePackedUint32(
      3,
      f
    );
  }
  f = message.getSizedataobjectList();
  if (f.length > 0) {
    writer.writePackedUint32(
      4,
      f
    );
  }
  f = message.getPrimarykeyauth_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      5,
      f
    );
  }
  f = message.getSecondarykeyauth_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
};


/**
 * optional bytes OIDADF = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.SEOSConfig.prototype.getOidadf = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes OIDADF = 1;
 * This is a type-conversion wrapper around `getOidadf()`
 * @return {string}
 */
proto.gsdk.card.SEOSConfig.prototype.getOidadf_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOidadf()));
};


/**
 * optional bytes OIDADF = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOidadf()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.SEOSConfig.prototype.getOidadf_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOidadf()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.SEOSConfig} returns this
 */
proto.gsdk.card.SEOSConfig.prototype.setOidadf = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional uint32 sizeADF = 2;
 * @return {number}
 */
proto.gsdk.card.SEOSConfig.prototype.getSizeadf = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SEOSConfig} returns this
 */
proto.gsdk.card.SEOSConfig.prototype.setSizeadf = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * repeated uint32 OIDDataObjectID = 3;
 * @return {!Array<number>}
 */
proto.gsdk.card.SEOSConfig.prototype.getOiddataobjectidList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.SEOSConfig} returns this
 */
proto.gsdk.card.SEOSConfig.prototype.setOiddataobjectidList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.SEOSConfig} returns this
 */
proto.gsdk.card.SEOSConfig.prototype.addOiddataobjectid = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SEOSConfig} returns this
 */
proto.gsdk.card.SEOSConfig.prototype.clearOiddataobjectidList = function() {
  return this.setOiddataobjectidList([]);
};


/**
 * repeated uint32 sizeDataObject = 4;
 * @return {!Array<number>}
 */
proto.gsdk.card.SEOSConfig.prototype.getSizedataobjectList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.SEOSConfig} returns this
 */
proto.gsdk.card.SEOSConfig.prototype.setSizedataobjectList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.SEOSConfig} returns this
 */
proto.gsdk.card.SEOSConfig.prototype.addSizedataobject = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SEOSConfig} returns this
 */
proto.gsdk.card.SEOSConfig.prototype.clearSizedataobjectList = function() {
  return this.setSizedataobjectList([]);
};


/**
 * optional bytes primaryKeyAuth = 5;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.SEOSConfig.prototype.getPrimarykeyauth = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * optional bytes primaryKeyAuth = 5;
 * This is a type-conversion wrapper around `getPrimarykeyauth()`
 * @return {string}
 */
proto.gsdk.card.SEOSConfig.prototype.getPrimarykeyauth_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPrimarykeyauth()));
};


/**
 * optional bytes primaryKeyAuth = 5;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPrimarykeyauth()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.SEOSConfig.prototype.getPrimarykeyauth_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPrimarykeyauth()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.SEOSConfig} returns this
 */
proto.gsdk.card.SEOSConfig.prototype.setPrimarykeyauth = function(value) {
  return jspb.Message.setProto3BytesField(this, 5, value);
};


/**
 * optional bytes secondaryKeyAuth = 6;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.SEOSConfig.prototype.getSecondarykeyauth = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * optional bytes secondaryKeyAuth = 6;
 * This is a type-conversion wrapper around `getSecondarykeyauth()`
 * @return {string}
 */
proto.gsdk.card.SEOSConfig.prototype.getSecondarykeyauth_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSecondarykeyauth()));
};


/**
 * optional bytes secondaryKeyAuth = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSecondarykeyauth()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.SEOSConfig.prototype.getSecondarykeyauth_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSecondarykeyauth()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.SEOSConfig} returns this
 */
proto.gsdk.card.SEOSConfig.prototype.setSecondarykeyauth = function(value) {
  return jspb.Message.setProto3BytesField(this, 6, value);
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
proto.gsdk.card.CardConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.CardConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.CardConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CardConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    byteorder: jspb.Message.getFieldWithDefault(msg, 1, 0),
    usewiegandformat: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    datatype: jspb.Message.getFieldWithDefault(msg, 3, 0),
    usesecondarykey: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    mifareconfig: (f = msg.getMifareconfig()) && proto.gsdk.card.MifareConfig.toObject(includeInstance, f),
    iclassconfig: (f = msg.getIclassconfig()) && proto.gsdk.card.IClassConfig.toObject(includeInstance, f),
    desfireconfig: (f = msg.getDesfireconfig()) && proto.gsdk.card.DESFireConfig.toObject(includeInstance, f),
    seosconfig: (f = msg.getSeosconfig()) && proto.gsdk.card.SEOSConfig.toObject(includeInstance, f),
    formatid: jspb.Message.getFieldWithDefault(msg, 9, 0),
    cipher: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
    smartcardbyteorder: jspb.Message.getFieldWithDefault(msg, 11, 0),
    mifareencryption: jspb.Message.getFieldWithDefault(msg, 12, 0)
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
 * @return {!proto.gsdk.card.CardConfig}
 */
proto.gsdk.card.CardConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.CardConfig;
  return proto.gsdk.card.CardConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.CardConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.CardConfig}
 */
proto.gsdk.card.CardConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.gsdk.card.CardByteOrder} */ (reader.readEnum());
      msg.setByteorder(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUsewiegandformat(value);
      break;
    case 3:
      var value = /** @type {!proto.gsdk.card.CardDataType} */ (reader.readEnum());
      msg.setDatatype(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUsesecondarykey(value);
      break;
    case 5:
      var value = new proto.gsdk.card.MifareConfig;
      reader.readMessage(value,proto.gsdk.card.MifareConfig.deserializeBinaryFromReader);
      msg.setMifareconfig(value);
      break;
    case 6:
      var value = new proto.gsdk.card.IClassConfig;
      reader.readMessage(value,proto.gsdk.card.IClassConfig.deserializeBinaryFromReader);
      msg.setIclassconfig(value);
      break;
    case 7:
      var value = new proto.gsdk.card.DESFireConfig;
      reader.readMessage(value,proto.gsdk.card.DESFireConfig.deserializeBinaryFromReader);
      msg.setDesfireconfig(value);
      break;
    case 8:
      var value = new proto.gsdk.card.SEOSConfig;
      reader.readMessage(value,proto.gsdk.card.SEOSConfig.deserializeBinaryFromReader);
      msg.setSeosconfig(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setFormatid(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCipher(value);
      break;
    case 11:
      var value = /** @type {!proto.gsdk.card.CardByteOrder} */ (reader.readEnum());
      msg.setSmartcardbyteorder(value);
      break;
    case 12:
      var value = /** @type {!proto.gsdk.card.MIFARE_ENCRYPTION} */ (reader.readEnum());
      msg.setMifareencryption(value);
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
proto.gsdk.card.CardConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.CardConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.CardConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CardConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getByteorder();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getUsewiegandformat();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getDatatype();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getUsesecondarykey();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getMifareconfig();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.gsdk.card.MifareConfig.serializeBinaryToWriter
    );
  }
  f = message.getIclassconfig();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.gsdk.card.IClassConfig.serializeBinaryToWriter
    );
  }
  f = message.getDesfireconfig();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.gsdk.card.DESFireConfig.serializeBinaryToWriter
    );
  }
  f = message.getSeosconfig();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.gsdk.card.SEOSConfig.serializeBinaryToWriter
    );
  }
  f = message.getFormatid();
  if (f !== 0) {
    writer.writeUint32(
      9,
      f
    );
  }
  f = message.getCipher();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getSmartcardbyteorder();
  if (f !== 0.0) {
    writer.writeEnum(
      11,
      f
    );
  }
  f = message.getMifareencryption();
  if (f !== 0.0) {
    writer.writeEnum(
      12,
      f
    );
  }
};


/**
 * optional CardByteOrder byteOrder = 1;
 * @return {!proto.gsdk.card.CardByteOrder}
 */
proto.gsdk.card.CardConfig.prototype.getByteorder = function() {
  return /** @type {!proto.gsdk.card.CardByteOrder} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gsdk.card.CardByteOrder} value
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.setByteorder = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional bool useWiegandFormat = 2;
 * @return {boolean}
 */
proto.gsdk.card.CardConfig.prototype.getUsewiegandformat = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.setUsewiegandformat = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional CardDataType dataType = 3;
 * @return {!proto.gsdk.card.CardDataType}
 */
proto.gsdk.card.CardConfig.prototype.getDatatype = function() {
  return /** @type {!proto.gsdk.card.CardDataType} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.gsdk.card.CardDataType} value
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.setDatatype = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional bool useSecondaryKey = 4;
 * @return {boolean}
 */
proto.gsdk.card.CardConfig.prototype.getUsesecondarykey = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.setUsesecondarykey = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional MifareConfig mifareConfig = 5;
 * @return {?proto.gsdk.card.MifareConfig}
 */
proto.gsdk.card.CardConfig.prototype.getMifareconfig = function() {
  return /** @type{?proto.gsdk.card.MifareConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.MifareConfig, 5));
};


/**
 * @param {?proto.gsdk.card.MifareConfig|undefined} value
 * @return {!proto.gsdk.card.CardConfig} returns this
*/
proto.gsdk.card.CardConfig.prototype.setMifareconfig = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.clearMifareconfig = function() {
  return this.setMifareconfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.CardConfig.prototype.hasMifareconfig = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional IClassConfig iClassConfig = 6;
 * @return {?proto.gsdk.card.IClassConfig}
 */
proto.gsdk.card.CardConfig.prototype.getIclassconfig = function() {
  return /** @type{?proto.gsdk.card.IClassConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.IClassConfig, 6));
};


/**
 * @param {?proto.gsdk.card.IClassConfig|undefined} value
 * @return {!proto.gsdk.card.CardConfig} returns this
*/
proto.gsdk.card.CardConfig.prototype.setIclassconfig = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.clearIclassconfig = function() {
  return this.setIclassconfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.CardConfig.prototype.hasIclassconfig = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional DESFireConfig DESFireConfig = 7;
 * @return {?proto.gsdk.card.DESFireConfig}
 */
proto.gsdk.card.CardConfig.prototype.getDesfireconfig = function() {
  return /** @type{?proto.gsdk.card.DESFireConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.DESFireConfig, 7));
};


/**
 * @param {?proto.gsdk.card.DESFireConfig|undefined} value
 * @return {!proto.gsdk.card.CardConfig} returns this
*/
proto.gsdk.card.CardConfig.prototype.setDesfireconfig = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.clearDesfireconfig = function() {
  return this.setDesfireconfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.CardConfig.prototype.hasDesfireconfig = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional SEOSConfig SEOSConfig = 8;
 * @return {?proto.gsdk.card.SEOSConfig}
 */
proto.gsdk.card.CardConfig.prototype.getSeosconfig = function() {
  return /** @type{?proto.gsdk.card.SEOSConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.SEOSConfig, 8));
};


/**
 * @param {?proto.gsdk.card.SEOSConfig|undefined} value
 * @return {!proto.gsdk.card.CardConfig} returns this
*/
proto.gsdk.card.CardConfig.prototype.setSeosconfig = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.clearSeosconfig = function() {
  return this.setSeosconfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.CardConfig.prototype.hasSeosconfig = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional uint32 formatID = 9;
 * @return {number}
 */
proto.gsdk.card.CardConfig.prototype.getFormatid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.setFormatid = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional bool cipher = 10;
 * @return {boolean}
 */
proto.gsdk.card.CardConfig.prototype.getCipher = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.setCipher = function(value) {
  return jspb.Message.setProto3BooleanField(this, 10, value);
};


/**
 * optional CardByteOrder smartCardByteOrder = 11;
 * @return {!proto.gsdk.card.CardByteOrder}
 */
proto.gsdk.card.CardConfig.prototype.getSmartcardbyteorder = function() {
  return /** @type {!proto.gsdk.card.CardByteOrder} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {!proto.gsdk.card.CardByteOrder} value
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.setSmartcardbyteorder = function(value) {
  return jspb.Message.setProto3EnumField(this, 11, value);
};


/**
 * optional MIFARE_ENCRYPTION mifareEncryption = 12;
 * @return {!proto.gsdk.card.MIFARE_ENCRYPTION}
 */
proto.gsdk.card.CardConfig.prototype.getMifareencryption = function() {
  return /** @type {!proto.gsdk.card.MIFARE_ENCRYPTION} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {!proto.gsdk.card.MIFARE_ENCRYPTION} value
 * @return {!proto.gsdk.card.CardConfig} returns this
 */
proto.gsdk.card.CardConfig.prototype.setMifareencryption = function(value) {
  return jspb.Message.setProto3EnumField(this, 12, value);
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
proto.gsdk.card.GetConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.GetConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.GetConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetConfigRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.GetConfigRequest}
 */
proto.gsdk.card.GetConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.GetConfigRequest;
  return proto.gsdk.card.GetConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.GetConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.GetConfigRequest}
 */
proto.gsdk.card.GetConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.GetConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.GetConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.GetConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetConfigRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.GetConfigRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.GetConfigRequest} returns this
 */
proto.gsdk.card.GetConfigRequest.prototype.setDeviceid = function(value) {
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
proto.gsdk.card.GetConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.GetConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.GetConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetConfigResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.gsdk.card.CardConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.GetConfigResponse}
 */
proto.gsdk.card.GetConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.GetConfigResponse;
  return proto.gsdk.card.GetConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.GetConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.GetConfigResponse}
 */
proto.gsdk.card.GetConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.card.CardConfig;
      reader.readMessage(value,proto.gsdk.card.CardConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.GetConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.GetConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.GetConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gsdk.card.CardConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional CardConfig config = 1;
 * @return {?proto.gsdk.card.CardConfig}
 */
proto.gsdk.card.GetConfigResponse.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.CardConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CardConfig, 1));
};


/**
 * @param {?proto.gsdk.card.CardConfig|undefined} value
 * @return {!proto.gsdk.card.GetConfigResponse} returns this
*/
proto.gsdk.card.GetConfigResponse.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.GetConfigResponse} returns this
 */
proto.gsdk.card.GetConfigResponse.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.GetConfigResponse.prototype.hasConfig = function() {
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
proto.gsdk.card.SetConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetConfigRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    config: (f = msg.getConfig()) && proto.gsdk.card.CardConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.SetConfigRequest}
 */
proto.gsdk.card.SetConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetConfigRequest;
  return proto.gsdk.card.SetConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetConfigRequest}
 */
proto.gsdk.card.SetConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.CardConfig;
      reader.readMessage(value,proto.gsdk.card.CardConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.SetConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetConfigRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.CardConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.card.SetConfigRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SetConfigRequest} returns this
 */
proto.gsdk.card.SetConfigRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional CardConfig config = 2;
 * @return {?proto.gsdk.card.CardConfig}
 */
proto.gsdk.card.SetConfigRequest.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.CardConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CardConfig, 2));
};


/**
 * @param {?proto.gsdk.card.CardConfig|undefined} value
 * @return {!proto.gsdk.card.SetConfigRequest} returns this
*/
proto.gsdk.card.SetConfigRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SetConfigRequest} returns this
 */
proto.gsdk.card.SetConfigRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SetConfigRequest.prototype.hasConfig = function() {
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
proto.gsdk.card.SetConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetConfigResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.SetConfigResponse}
 */
proto.gsdk.card.SetConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetConfigResponse;
  return proto.gsdk.card.SetConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetConfigResponse}
 */
proto.gsdk.card.SetConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.SetConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.SetConfigMultiRequest.repeatedFields_ = [1];



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
proto.gsdk.card.SetConfigMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetConfigMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetConfigMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetConfigMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    config: (f = msg.getConfig()) && proto.gsdk.card.CardConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.SetConfigMultiRequest}
 */
proto.gsdk.card.SetConfigMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetConfigMultiRequest;
  return proto.gsdk.card.SetConfigMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetConfigMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetConfigMultiRequest}
 */
proto.gsdk.card.SetConfigMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.CardConfig;
      reader.readMessage(value,proto.gsdk.card.CardConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.SetConfigMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetConfigMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetConfigMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetConfigMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.CardConfig.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.card.SetConfigMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.SetConfigMultiRequest} returns this
 */
proto.gsdk.card.SetConfigMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.SetConfigMultiRequest} returns this
 */
proto.gsdk.card.SetConfigMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SetConfigMultiRequest} returns this
 */
proto.gsdk.card.SetConfigMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * optional CardConfig config = 2;
 * @return {?proto.gsdk.card.CardConfig}
 */
proto.gsdk.card.SetConfigMultiRequest.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.CardConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CardConfig, 2));
};


/**
 * @param {?proto.gsdk.card.CardConfig|undefined} value
 * @return {!proto.gsdk.card.SetConfigMultiRequest} returns this
*/
proto.gsdk.card.SetConfigMultiRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SetConfigMultiRequest} returns this
 */
proto.gsdk.card.SetConfigMultiRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SetConfigMultiRequest.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.SetConfigMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.card.SetConfigMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetConfigMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetConfigMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetConfigMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.SetConfigMultiResponse}
 */
proto.gsdk.card.SetConfigMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetConfigMultiResponse;
  return proto.gsdk.card.SetConfigMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetConfigMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetConfigMultiResponse}
 */
proto.gsdk.card.SetConfigMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.SetConfigMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetConfigMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetConfigMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetConfigMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.SetConfigMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.card.SetConfigMultiResponse} returns this
*/
proto.gsdk.card.SetConfigMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.card.SetConfigMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SetConfigMultiResponse} returns this
 */
proto.gsdk.card.SetConfigMultiResponse.prototype.clearDeviceerrorsList = function() {
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
proto.gsdk.card.BlacklistItem.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.BlacklistItem.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.BlacklistItem} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.BlacklistItem.toObject = function(includeInstance, msg) {
  var f, obj = {
    cardid: msg.getCardid_asB64(),
    issuecount: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
 * @return {!proto.gsdk.card.BlacklistItem}
 */
proto.gsdk.card.BlacklistItem.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.BlacklistItem;
  return proto.gsdk.card.BlacklistItem.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.BlacklistItem} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.BlacklistItem}
 */
proto.gsdk.card.BlacklistItem.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCardid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setIssuecount(value);
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
proto.gsdk.card.BlacklistItem.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.BlacklistItem.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.BlacklistItem} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.BlacklistItem.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCardid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getIssuecount();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * optional bytes cardID = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.BlacklistItem.prototype.getCardid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes cardID = 1;
 * This is a type-conversion wrapper around `getCardid()`
 * @return {string}
 */
proto.gsdk.card.BlacklistItem.prototype.getCardid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCardid()));
};


/**
 * optional bytes cardID = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCardid()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.BlacklistItem.prototype.getCardid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCardid()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.BlacklistItem} returns this
 */
proto.gsdk.card.BlacklistItem.prototype.setCardid = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional uint32 issueCount = 2;
 * @return {number}
 */
proto.gsdk.card.BlacklistItem.prototype.getIssuecount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.BlacklistItem} returns this
 */
proto.gsdk.card.BlacklistItem.prototype.setIssuecount = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
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
proto.gsdk.card.GetBlacklistRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.GetBlacklistRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.GetBlacklistRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetBlacklistRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.GetBlacklistRequest}
 */
proto.gsdk.card.GetBlacklistRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.GetBlacklistRequest;
  return proto.gsdk.card.GetBlacklistRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.GetBlacklistRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.GetBlacklistRequest}
 */
proto.gsdk.card.GetBlacklistRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.GetBlacklistRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.GetBlacklistRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.GetBlacklistRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetBlacklistRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.GetBlacklistRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.GetBlacklistRequest} returns this
 */
proto.gsdk.card.GetBlacklistRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.GetBlacklistResponse.repeatedFields_ = [1];



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
proto.gsdk.card.GetBlacklistResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.GetBlacklistResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.GetBlacklistResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetBlacklistResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    blacklistList: jspb.Message.toObjectList(msg.getBlacklistList(),
    proto.gsdk.card.BlacklistItem.toObject, includeInstance)
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
 * @return {!proto.gsdk.card.GetBlacklistResponse}
 */
proto.gsdk.card.GetBlacklistResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.GetBlacklistResponse;
  return proto.gsdk.card.GetBlacklistResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.GetBlacklistResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.GetBlacklistResponse}
 */
proto.gsdk.card.GetBlacklistResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.card.BlacklistItem;
      reader.readMessage(value,proto.gsdk.card.BlacklistItem.deserializeBinaryFromReader);
      msg.addBlacklist(value);
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
proto.gsdk.card.GetBlacklistResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.GetBlacklistResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.GetBlacklistResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetBlacklistResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBlacklistList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gsdk.card.BlacklistItem.serializeBinaryToWriter
    );
  }
};


/**
 * repeated BlacklistItem blacklist = 1;
 * @return {!Array<!proto.gsdk.card.BlacklistItem>}
 */
proto.gsdk.card.GetBlacklistResponse.prototype.getBlacklistList = function() {
  return /** @type{!Array<!proto.gsdk.card.BlacklistItem>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.card.BlacklistItem, 1));
};


/**
 * @param {!Array<!proto.gsdk.card.BlacklistItem>} value
 * @return {!proto.gsdk.card.GetBlacklistResponse} returns this
*/
proto.gsdk.card.GetBlacklistResponse.prototype.setBlacklistList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.card.BlacklistItem=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.BlacklistItem}
 */
proto.gsdk.card.GetBlacklistResponse.prototype.addBlacklist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.card.BlacklistItem, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.GetBlacklistResponse} returns this
 */
proto.gsdk.card.GetBlacklistResponse.prototype.clearBlacklistList = function() {
  return this.setBlacklistList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.AddBlacklistRequest.repeatedFields_ = [2];



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
proto.gsdk.card.AddBlacklistRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.AddBlacklistRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.AddBlacklistRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.AddBlacklistRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    cardinfosList: jspb.Message.toObjectList(msg.getCardinfosList(),
    proto.gsdk.card.BlacklistItem.toObject, includeInstance)
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
 * @return {!proto.gsdk.card.AddBlacklistRequest}
 */
proto.gsdk.card.AddBlacklistRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.AddBlacklistRequest;
  return proto.gsdk.card.AddBlacklistRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.AddBlacklistRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.AddBlacklistRequest}
 */
proto.gsdk.card.AddBlacklistRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.BlacklistItem;
      reader.readMessage(value,proto.gsdk.card.BlacklistItem.deserializeBinaryFromReader);
      msg.addCardinfos(value);
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
proto.gsdk.card.AddBlacklistRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.AddBlacklistRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.AddBlacklistRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.AddBlacklistRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getCardinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.card.BlacklistItem.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.card.AddBlacklistRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.AddBlacklistRequest} returns this
 */
proto.gsdk.card.AddBlacklistRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated BlacklistItem cardInfos = 2;
 * @return {!Array<!proto.gsdk.card.BlacklistItem>}
 */
proto.gsdk.card.AddBlacklistRequest.prototype.getCardinfosList = function() {
  return /** @type{!Array<!proto.gsdk.card.BlacklistItem>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.card.BlacklistItem, 2));
};


/**
 * @param {!Array<!proto.gsdk.card.BlacklistItem>} value
 * @return {!proto.gsdk.card.AddBlacklistRequest} returns this
*/
proto.gsdk.card.AddBlacklistRequest.prototype.setCardinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.card.BlacklistItem=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.BlacklistItem}
 */
proto.gsdk.card.AddBlacklistRequest.prototype.addCardinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.card.BlacklistItem, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.AddBlacklistRequest} returns this
 */
proto.gsdk.card.AddBlacklistRequest.prototype.clearCardinfosList = function() {
  return this.setCardinfosList([]);
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
proto.gsdk.card.AddBlacklistResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.AddBlacklistResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.AddBlacklistResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.AddBlacklistResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.AddBlacklistResponse}
 */
proto.gsdk.card.AddBlacklistResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.AddBlacklistResponse;
  return proto.gsdk.card.AddBlacklistResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.AddBlacklistResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.AddBlacklistResponse}
 */
proto.gsdk.card.AddBlacklistResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.AddBlacklistResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.AddBlacklistResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.AddBlacklistResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.AddBlacklistResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.AddBlacklistMultiRequest.repeatedFields_ = [1,2];



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
proto.gsdk.card.AddBlacklistMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.AddBlacklistMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.AddBlacklistMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.AddBlacklistMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    cardinfosList: jspb.Message.toObjectList(msg.getCardinfosList(),
    proto.gsdk.card.BlacklistItem.toObject, includeInstance)
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
 * @return {!proto.gsdk.card.AddBlacklistMultiRequest}
 */
proto.gsdk.card.AddBlacklistMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.AddBlacklistMultiRequest;
  return proto.gsdk.card.AddBlacklistMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.AddBlacklistMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.AddBlacklistMultiRequest}
 */
proto.gsdk.card.AddBlacklistMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.BlacklistItem;
      reader.readMessage(value,proto.gsdk.card.BlacklistItem.deserializeBinaryFromReader);
      msg.addCardinfos(value);
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
proto.gsdk.card.AddBlacklistMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.AddBlacklistMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.AddBlacklistMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.AddBlacklistMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getCardinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.card.BlacklistItem.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.card.AddBlacklistMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.AddBlacklistMultiRequest} returns this
 */
proto.gsdk.card.AddBlacklistMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.AddBlacklistMultiRequest} returns this
 */
proto.gsdk.card.AddBlacklistMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.AddBlacklistMultiRequest} returns this
 */
proto.gsdk.card.AddBlacklistMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * repeated BlacklistItem cardInfos = 2;
 * @return {!Array<!proto.gsdk.card.BlacklistItem>}
 */
proto.gsdk.card.AddBlacklistMultiRequest.prototype.getCardinfosList = function() {
  return /** @type{!Array<!proto.gsdk.card.BlacklistItem>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.card.BlacklistItem, 2));
};


/**
 * @param {!Array<!proto.gsdk.card.BlacklistItem>} value
 * @return {!proto.gsdk.card.AddBlacklistMultiRequest} returns this
*/
proto.gsdk.card.AddBlacklistMultiRequest.prototype.setCardinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.card.BlacklistItem=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.BlacklistItem}
 */
proto.gsdk.card.AddBlacklistMultiRequest.prototype.addCardinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.card.BlacklistItem, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.AddBlacklistMultiRequest} returns this
 */
proto.gsdk.card.AddBlacklistMultiRequest.prototype.clearCardinfosList = function() {
  return this.setCardinfosList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.AddBlacklistMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.card.AddBlacklistMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.AddBlacklistMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.AddBlacklistMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.AddBlacklistMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.AddBlacklistMultiResponse}
 */
proto.gsdk.card.AddBlacklistMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.AddBlacklistMultiResponse;
  return proto.gsdk.card.AddBlacklistMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.AddBlacklistMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.AddBlacklistMultiResponse}
 */
proto.gsdk.card.AddBlacklistMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.AddBlacklistMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.AddBlacklistMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.AddBlacklistMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.AddBlacklistMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.AddBlacklistMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.card.AddBlacklistMultiResponse} returns this
*/
proto.gsdk.card.AddBlacklistMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.card.AddBlacklistMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.AddBlacklistMultiResponse} returns this
 */
proto.gsdk.card.AddBlacklistMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.DeleteBlacklistRequest.repeatedFields_ = [2];



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
proto.gsdk.card.DeleteBlacklistRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.DeleteBlacklistRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.DeleteBlacklistRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteBlacklistRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    cardinfosList: jspb.Message.toObjectList(msg.getCardinfosList(),
    proto.gsdk.card.BlacklistItem.toObject, includeInstance)
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
 * @return {!proto.gsdk.card.DeleteBlacklistRequest}
 */
proto.gsdk.card.DeleteBlacklistRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.DeleteBlacklistRequest;
  return proto.gsdk.card.DeleteBlacklistRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.DeleteBlacklistRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.DeleteBlacklistRequest}
 */
proto.gsdk.card.DeleteBlacklistRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.BlacklistItem;
      reader.readMessage(value,proto.gsdk.card.BlacklistItem.deserializeBinaryFromReader);
      msg.addCardinfos(value);
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
proto.gsdk.card.DeleteBlacklistRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.DeleteBlacklistRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.DeleteBlacklistRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteBlacklistRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getCardinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.card.BlacklistItem.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.card.DeleteBlacklistRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.DeleteBlacklistRequest} returns this
 */
proto.gsdk.card.DeleteBlacklistRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated BlacklistItem cardInfos = 2;
 * @return {!Array<!proto.gsdk.card.BlacklistItem>}
 */
proto.gsdk.card.DeleteBlacklistRequest.prototype.getCardinfosList = function() {
  return /** @type{!Array<!proto.gsdk.card.BlacklistItem>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.card.BlacklistItem, 2));
};


/**
 * @param {!Array<!proto.gsdk.card.BlacklistItem>} value
 * @return {!proto.gsdk.card.DeleteBlacklistRequest} returns this
*/
proto.gsdk.card.DeleteBlacklistRequest.prototype.setCardinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.card.BlacklistItem=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.BlacklistItem}
 */
proto.gsdk.card.DeleteBlacklistRequest.prototype.addCardinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.card.BlacklistItem, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.DeleteBlacklistRequest} returns this
 */
proto.gsdk.card.DeleteBlacklistRequest.prototype.clearCardinfosList = function() {
  return this.setCardinfosList([]);
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
proto.gsdk.card.DeleteBlacklistResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.DeleteBlacklistResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.DeleteBlacklistResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteBlacklistResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.DeleteBlacklistResponse}
 */
proto.gsdk.card.DeleteBlacklistResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.DeleteBlacklistResponse;
  return proto.gsdk.card.DeleteBlacklistResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.DeleteBlacklistResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.DeleteBlacklistResponse}
 */
proto.gsdk.card.DeleteBlacklistResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.DeleteBlacklistResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.DeleteBlacklistResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.DeleteBlacklistResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteBlacklistResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.repeatedFields_ = [1,2];



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
proto.gsdk.card.DeleteBlacklistMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.DeleteBlacklistMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.DeleteBlacklistMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    cardinfosList: jspb.Message.toObjectList(msg.getCardinfosList(),
    proto.gsdk.card.BlacklistItem.toObject, includeInstance)
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
 * @return {!proto.gsdk.card.DeleteBlacklistMultiRequest}
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.DeleteBlacklistMultiRequest;
  return proto.gsdk.card.DeleteBlacklistMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.DeleteBlacklistMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.DeleteBlacklistMultiRequest}
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.BlacklistItem;
      reader.readMessage(value,proto.gsdk.card.BlacklistItem.deserializeBinaryFromReader);
      msg.addCardinfos(value);
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
proto.gsdk.card.DeleteBlacklistMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.DeleteBlacklistMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.DeleteBlacklistMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getCardinfosList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.gsdk.card.BlacklistItem.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.DeleteBlacklistMultiRequest} returns this
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.DeleteBlacklistMultiRequest} returns this
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.DeleteBlacklistMultiRequest} returns this
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * repeated BlacklistItem cardInfos = 2;
 * @return {!Array<!proto.gsdk.card.BlacklistItem>}
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.prototype.getCardinfosList = function() {
  return /** @type{!Array<!proto.gsdk.card.BlacklistItem>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.card.BlacklistItem, 2));
};


/**
 * @param {!Array<!proto.gsdk.card.BlacklistItem>} value
 * @return {!proto.gsdk.card.DeleteBlacklistMultiRequest} returns this
*/
proto.gsdk.card.DeleteBlacklistMultiRequest.prototype.setCardinfosList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.gsdk.card.BlacklistItem=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.BlacklistItem}
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.prototype.addCardinfos = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.gsdk.card.BlacklistItem, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.DeleteBlacklistMultiRequest} returns this
 */
proto.gsdk.card.DeleteBlacklistMultiRequest.prototype.clearCardinfosList = function() {
  return this.setCardinfosList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.DeleteBlacklistMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.card.DeleteBlacklistMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.DeleteBlacklistMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.DeleteBlacklistMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteBlacklistMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.DeleteBlacklistMultiResponse}
 */
proto.gsdk.card.DeleteBlacklistMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.DeleteBlacklistMultiResponse;
  return proto.gsdk.card.DeleteBlacklistMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.DeleteBlacklistMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.DeleteBlacklistMultiResponse}
 */
proto.gsdk.card.DeleteBlacklistMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.DeleteBlacklistMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.DeleteBlacklistMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.DeleteBlacklistMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteBlacklistMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.DeleteBlacklistMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.card.DeleteBlacklistMultiResponse} returns this
*/
proto.gsdk.card.DeleteBlacklistMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.card.DeleteBlacklistMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.DeleteBlacklistMultiResponse} returns this
 */
proto.gsdk.card.DeleteBlacklistMultiResponse.prototype.clearDeviceerrorsList = function() {
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
proto.gsdk.card.DeleteAllBlacklistRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.DeleteAllBlacklistRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.DeleteAllBlacklistRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteAllBlacklistRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.DeleteAllBlacklistRequest}
 */
proto.gsdk.card.DeleteAllBlacklistRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.DeleteAllBlacklistRequest;
  return proto.gsdk.card.DeleteAllBlacklistRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.DeleteAllBlacklistRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.DeleteAllBlacklistRequest}
 */
proto.gsdk.card.DeleteAllBlacklistRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.DeleteAllBlacklistRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.DeleteAllBlacklistRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.DeleteAllBlacklistRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteAllBlacklistRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.DeleteAllBlacklistRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.DeleteAllBlacklistRequest} returns this
 */
proto.gsdk.card.DeleteAllBlacklistRequest.prototype.setDeviceid = function(value) {
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
proto.gsdk.card.DeleteAllBlacklistResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.DeleteAllBlacklistResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.DeleteAllBlacklistResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteAllBlacklistResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.DeleteAllBlacklistResponse}
 */
proto.gsdk.card.DeleteAllBlacklistResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.DeleteAllBlacklistResponse;
  return proto.gsdk.card.DeleteAllBlacklistResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.DeleteAllBlacklistResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.DeleteAllBlacklistResponse}
 */
proto.gsdk.card.DeleteAllBlacklistResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.DeleteAllBlacklistResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.DeleteAllBlacklistResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.DeleteAllBlacklistResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteAllBlacklistResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.DeleteAllBlacklistMultiRequest.repeatedFields_ = [1];



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
proto.gsdk.card.DeleteAllBlacklistMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.DeleteAllBlacklistMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.DeleteAllBlacklistMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteAllBlacklistMultiRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.DeleteAllBlacklistMultiRequest}
 */
proto.gsdk.card.DeleteAllBlacklistMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.DeleteAllBlacklistMultiRequest;
  return proto.gsdk.card.DeleteAllBlacklistMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.DeleteAllBlacklistMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.DeleteAllBlacklistMultiRequest}
 */
proto.gsdk.card.DeleteAllBlacklistMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.DeleteAllBlacklistMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.DeleteAllBlacklistMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.DeleteAllBlacklistMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteAllBlacklistMultiRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.DeleteAllBlacklistMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.DeleteAllBlacklistMultiRequest} returns this
 */
proto.gsdk.card.DeleteAllBlacklistMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.DeleteAllBlacklistMultiRequest} returns this
 */
proto.gsdk.card.DeleteAllBlacklistMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.DeleteAllBlacklistMultiRequest} returns this
 */
proto.gsdk.card.DeleteAllBlacklistMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.DeleteAllBlacklistMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.card.DeleteAllBlacklistMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.DeleteAllBlacklistMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.DeleteAllBlacklistMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteAllBlacklistMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.DeleteAllBlacklistMultiResponse}
 */
proto.gsdk.card.DeleteAllBlacklistMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.DeleteAllBlacklistMultiResponse;
  return proto.gsdk.card.DeleteAllBlacklistMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.DeleteAllBlacklistMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.DeleteAllBlacklistMultiResponse}
 */
proto.gsdk.card.DeleteAllBlacklistMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.DeleteAllBlacklistMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.DeleteAllBlacklistMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.DeleteAllBlacklistMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DeleteAllBlacklistMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.DeleteAllBlacklistMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.card.DeleteAllBlacklistMultiResponse} returns this
*/
proto.gsdk.card.DeleteAllBlacklistMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.card.DeleteAllBlacklistMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.DeleteAllBlacklistMultiResponse} returns this
 */
proto.gsdk.card.DeleteAllBlacklistMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.Card1XConfig.repeatedFields_ = [10];



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
proto.gsdk.card.Card1XConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.Card1XConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.Card1XConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Card1XConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    disabled: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    usecsnonly: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    bioentrycompatible: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    usesecondarykey: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    primarykey: msg.getPrimarykey_asB64(),
    secondarykey: msg.getSecondarykey_asB64(),
    cisindex: jspb.Message.getFieldWithDefault(msg, 7, 0),
    numoftemplate: jspb.Message.getFieldWithDefault(msg, 8, 0),
    templatesize: jspb.Message.getFieldWithDefault(msg, 9, 0),
    templatestartblocksList: (f = jspb.Message.getRepeatedField(msg, 10)) == null ? undefined : f
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
 * @return {!proto.gsdk.card.Card1XConfig}
 */
proto.gsdk.card.Card1XConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.Card1XConfig;
  return proto.gsdk.card.Card1XConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.Card1XConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.Card1XConfig}
 */
proto.gsdk.card.Card1XConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDisabled(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUsecsnonly(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBioentrycompatible(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUsesecondarykey(value);
      break;
    case 5:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPrimarykey(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSecondarykey(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCisindex(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNumoftemplate(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTemplatesize(value);
      break;
    case 10:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addTemplatestartblocks(values[i]);
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
proto.gsdk.card.Card1XConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.Card1XConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.Card1XConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Card1XConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDisabled();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getUsecsnonly();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getBioentrycompatible();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getUsesecondarykey();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getPrimarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      5,
      f
    );
  }
  f = message.getSecondarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
  f = message.getCisindex();
  if (f !== 0) {
    writer.writeUint32(
      7,
      f
    );
  }
  f = message.getNumoftemplate();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
  f = message.getTemplatesize();
  if (f !== 0) {
    writer.writeUint32(
      9,
      f
    );
  }
  f = message.getTemplatestartblocksList();
  if (f.length > 0) {
    writer.writePackedUint32(
      10,
      f
    );
  }
};


/**
 * optional bool disabled = 1;
 * @return {boolean}
 */
proto.gsdk.card.Card1XConfig.prototype.getDisabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.setDisabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional bool useCSNOnly = 2;
 * @return {boolean}
 */
proto.gsdk.card.Card1XConfig.prototype.getUsecsnonly = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.setUsecsnonly = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool bioEntryCompatible = 3;
 * @return {boolean}
 */
proto.gsdk.card.Card1XConfig.prototype.getBioentrycompatible = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.setBioentrycompatible = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool useSecondaryKey = 4;
 * @return {boolean}
 */
proto.gsdk.card.Card1XConfig.prototype.getUsesecondarykey = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.setUsesecondarykey = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional bytes primaryKey = 5;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.Card1XConfig.prototype.getPrimarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * optional bytes primaryKey = 5;
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {string}
 */
proto.gsdk.card.Card1XConfig.prototype.getPrimarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPrimarykey()));
};


/**
 * optional bytes primaryKey = 5;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.Card1XConfig.prototype.getPrimarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPrimarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.setPrimarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 5, value);
};


/**
 * optional bytes secondaryKey = 6;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.Card1XConfig.prototype.getSecondarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * optional bytes secondaryKey = 6;
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {string}
 */
proto.gsdk.card.Card1XConfig.prototype.getSecondarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSecondarykey()));
};


/**
 * optional bytes secondaryKey = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.Card1XConfig.prototype.getSecondarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSecondarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.setSecondarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 6, value);
};


/**
 * optional uint32 CISIndex = 7;
 * @return {number}
 */
proto.gsdk.card.Card1XConfig.prototype.getCisindex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.setCisindex = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional uint32 numOfTemplate = 8;
 * @return {number}
 */
proto.gsdk.card.Card1XConfig.prototype.getNumoftemplate = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.setNumoftemplate = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional uint32 templateSize = 9;
 * @return {number}
 */
proto.gsdk.card.Card1XConfig.prototype.getTemplatesize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.setTemplatesize = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * repeated uint32 templateStartBlocks = 10;
 * @return {!Array<number>}
 */
proto.gsdk.card.Card1XConfig.prototype.getTemplatestartblocksList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 10));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.setTemplatestartblocksList = function(value) {
  return jspb.Message.setField(this, 10, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.addTemplatestartblocks = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 10, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.Card1XConfig} returns this
 */
proto.gsdk.card.Card1XConfig.prototype.clearTemplatestartblocksList = function() {
  return this.setTemplatestartblocksList([]);
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
proto.gsdk.card.Get1XConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.Get1XConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.Get1XConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Get1XConfigRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.Get1XConfigRequest}
 */
proto.gsdk.card.Get1XConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.Get1XConfigRequest;
  return proto.gsdk.card.Get1XConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.Get1XConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.Get1XConfigRequest}
 */
proto.gsdk.card.Get1XConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.Get1XConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.Get1XConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.Get1XConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Get1XConfigRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.Get1XConfigRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.Get1XConfigRequest} returns this
 */
proto.gsdk.card.Get1XConfigRequest.prototype.setDeviceid = function(value) {
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
proto.gsdk.card.Get1XConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.Get1XConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.Get1XConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Get1XConfigResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.gsdk.card.Card1XConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.Get1XConfigResponse}
 */
proto.gsdk.card.Get1XConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.Get1XConfigResponse;
  return proto.gsdk.card.Get1XConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.Get1XConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.Get1XConfigResponse}
 */
proto.gsdk.card.Get1XConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.card.Card1XConfig;
      reader.readMessage(value,proto.gsdk.card.Card1XConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.Get1XConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.Get1XConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.Get1XConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Get1XConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gsdk.card.Card1XConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional Card1XConfig config = 1;
 * @return {?proto.gsdk.card.Card1XConfig}
 */
proto.gsdk.card.Get1XConfigResponse.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.Card1XConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.Card1XConfig, 1));
};


/**
 * @param {?proto.gsdk.card.Card1XConfig|undefined} value
 * @return {!proto.gsdk.card.Get1XConfigResponse} returns this
*/
proto.gsdk.card.Get1XConfigResponse.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.Get1XConfigResponse} returns this
 */
proto.gsdk.card.Get1XConfigResponse.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.Get1XConfigResponse.prototype.hasConfig = function() {
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
proto.gsdk.card.Set1XConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.Set1XConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.Set1XConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Set1XConfigRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    config: (f = msg.getConfig()) && proto.gsdk.card.Card1XConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.Set1XConfigRequest}
 */
proto.gsdk.card.Set1XConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.Set1XConfigRequest;
  return proto.gsdk.card.Set1XConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.Set1XConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.Set1XConfigRequest}
 */
proto.gsdk.card.Set1XConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.Card1XConfig;
      reader.readMessage(value,proto.gsdk.card.Card1XConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.Set1XConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.Set1XConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.Set1XConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Set1XConfigRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.Card1XConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.card.Set1XConfigRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.Set1XConfigRequest} returns this
 */
proto.gsdk.card.Set1XConfigRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional Card1XConfig config = 2;
 * @return {?proto.gsdk.card.Card1XConfig}
 */
proto.gsdk.card.Set1XConfigRequest.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.Card1XConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.Card1XConfig, 2));
};


/**
 * @param {?proto.gsdk.card.Card1XConfig|undefined} value
 * @return {!proto.gsdk.card.Set1XConfigRequest} returns this
*/
proto.gsdk.card.Set1XConfigRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.Set1XConfigRequest} returns this
 */
proto.gsdk.card.Set1XConfigRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.Set1XConfigRequest.prototype.hasConfig = function() {
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
proto.gsdk.card.Set1XConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.Set1XConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.Set1XConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Set1XConfigResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.Set1XConfigResponse}
 */
proto.gsdk.card.Set1XConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.Set1XConfigResponse;
  return proto.gsdk.card.Set1XConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.Set1XConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.Set1XConfigResponse}
 */
proto.gsdk.card.Set1XConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.Set1XConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.Set1XConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.Set1XConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Set1XConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.Set1XConfigMultiRequest.repeatedFields_ = [1];



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
proto.gsdk.card.Set1XConfigMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.Set1XConfigMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.Set1XConfigMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Set1XConfigMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    config: (f = msg.getConfig()) && proto.gsdk.card.Card1XConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.Set1XConfigMultiRequest}
 */
proto.gsdk.card.Set1XConfigMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.Set1XConfigMultiRequest;
  return proto.gsdk.card.Set1XConfigMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.Set1XConfigMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.Set1XConfigMultiRequest}
 */
proto.gsdk.card.Set1XConfigMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.Card1XConfig;
      reader.readMessage(value,proto.gsdk.card.Card1XConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.Set1XConfigMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.Set1XConfigMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.Set1XConfigMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Set1XConfigMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.Card1XConfig.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.card.Set1XConfigMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.Set1XConfigMultiRequest} returns this
 */
proto.gsdk.card.Set1XConfigMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.Set1XConfigMultiRequest} returns this
 */
proto.gsdk.card.Set1XConfigMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.Set1XConfigMultiRequest} returns this
 */
proto.gsdk.card.Set1XConfigMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * optional Card1XConfig config = 2;
 * @return {?proto.gsdk.card.Card1XConfig}
 */
proto.gsdk.card.Set1XConfigMultiRequest.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.Card1XConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.Card1XConfig, 2));
};


/**
 * @param {?proto.gsdk.card.Card1XConfig|undefined} value
 * @return {!proto.gsdk.card.Set1XConfigMultiRequest} returns this
*/
proto.gsdk.card.Set1XConfigMultiRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.Set1XConfigMultiRequest} returns this
 */
proto.gsdk.card.Set1XConfigMultiRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.Set1XConfigMultiRequest.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.Set1XConfigMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.card.Set1XConfigMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.Set1XConfigMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.Set1XConfigMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Set1XConfigMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.Set1XConfigMultiResponse}
 */
proto.gsdk.card.Set1XConfigMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.Set1XConfigMultiResponse;
  return proto.gsdk.card.Set1XConfigMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.Set1XConfigMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.Set1XConfigMultiResponse}
 */
proto.gsdk.card.Set1XConfigMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.Set1XConfigMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.Set1XConfigMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.Set1XConfigMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.Set1XConfigMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.Set1XConfigMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.card.Set1XConfigMultiResponse} returns this
*/
proto.gsdk.card.Set1XConfigMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.card.Set1XConfigMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.Set1XConfigMultiResponse} returns this
 */
proto.gsdk.card.Set1XConfigMultiResponse.prototype.clearDeviceerrorsList = function() {
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
proto.gsdk.card.WriteQRCodeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.WriteQRCodeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.WriteQRCodeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.WriteQRCodeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    qrtext: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.gsdk.card.WriteQRCodeRequest}
 */
proto.gsdk.card.WriteQRCodeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.WriteQRCodeRequest;
  return proto.gsdk.card.WriteQRCodeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.WriteQRCodeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.WriteQRCodeRequest}
 */
proto.gsdk.card.WriteQRCodeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setQrtext(value);
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
proto.gsdk.card.WriteQRCodeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.WriteQRCodeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.WriteQRCodeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.WriteQRCodeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getQrtext();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string QRText = 1;
 * @return {string}
 */
proto.gsdk.card.WriteQRCodeRequest.prototype.getQrtext = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.gsdk.card.WriteQRCodeRequest} returns this
 */
proto.gsdk.card.WriteQRCodeRequest.prototype.setQrtext = function(value) {
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
proto.gsdk.card.WriteQRCodeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.WriteQRCodeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.WriteQRCodeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.WriteQRCodeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    carddata: (f = msg.getCarddata()) && proto.gsdk.card.CSNCardData.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.WriteQRCodeResponse}
 */
proto.gsdk.card.WriteQRCodeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.WriteQRCodeResponse;
  return proto.gsdk.card.WriteQRCodeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.WriteQRCodeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.WriteQRCodeResponse}
 */
proto.gsdk.card.WriteQRCodeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.card.CSNCardData;
      reader.readMessage(value,proto.gsdk.card.CSNCardData.deserializeBinaryFromReader);
      msg.setCarddata(value);
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
proto.gsdk.card.WriteQRCodeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.WriteQRCodeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.WriteQRCodeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.WriteQRCodeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCarddata();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gsdk.card.CSNCardData.serializeBinaryToWriter
    );
  }
};


/**
 * optional CSNCardData cardData = 1;
 * @return {?proto.gsdk.card.CSNCardData}
 */
proto.gsdk.card.WriteQRCodeResponse.prototype.getCarddata = function() {
  return /** @type{?proto.gsdk.card.CSNCardData} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CSNCardData, 1));
};


/**
 * @param {?proto.gsdk.card.CSNCardData|undefined} value
 * @return {!proto.gsdk.card.WriteQRCodeResponse} returns this
*/
proto.gsdk.card.WriteQRCodeResponse.prototype.setCarddata = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.WriteQRCodeResponse} returns this
 */
proto.gsdk.card.WriteQRCodeResponse.prototype.clearCarddata = function() {
  return this.setCarddata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.WriteQRCodeResponse.prototype.hasCarddata = function() {
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
proto.gsdk.card.QRConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.QRConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.QRConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.QRConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    useqrcode: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    scantimeout: jspb.Message.getFieldWithDefault(msg, 2, 0),
    bypassdata: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    treatascsn: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.gsdk.card.QRConfig}
 */
proto.gsdk.card.QRConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.QRConfig;
  return proto.gsdk.card.QRConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.QRConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.QRConfig}
 */
proto.gsdk.card.QRConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUseqrcode(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setScantimeout(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBypassdata(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setTreatascsn(value);
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
proto.gsdk.card.QRConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.QRConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.QRConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.QRConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUseqrcode();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getScantimeout();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getBypassdata();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getTreatascsn();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional bool useQRCode = 1;
 * @return {boolean}
 */
proto.gsdk.card.QRConfig.prototype.getUseqrcode = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.QRConfig} returns this
 */
proto.gsdk.card.QRConfig.prototype.setUseqrcode = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional uint32 scanTimeout = 2;
 * @return {number}
 */
proto.gsdk.card.QRConfig.prototype.getScantimeout = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.QRConfig} returns this
 */
proto.gsdk.card.QRConfig.prototype.setScantimeout = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bool bypassData = 3;
 * @return {boolean}
 */
proto.gsdk.card.QRConfig.prototype.getBypassdata = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.QRConfig} returns this
 */
proto.gsdk.card.QRConfig.prototype.setBypassdata = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool treatAsCSN = 4;
 * @return {boolean}
 */
proto.gsdk.card.QRConfig.prototype.getTreatascsn = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.QRConfig} returns this
 */
proto.gsdk.card.QRConfig.prototype.setTreatascsn = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
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
proto.gsdk.card.GetQRConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.GetQRConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.GetQRConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetQRConfigRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.GetQRConfigRequest}
 */
proto.gsdk.card.GetQRConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.GetQRConfigRequest;
  return proto.gsdk.card.GetQRConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.GetQRConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.GetQRConfigRequest}
 */
proto.gsdk.card.GetQRConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.GetQRConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.GetQRConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.GetQRConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetQRConfigRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.GetQRConfigRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.GetQRConfigRequest} returns this
 */
proto.gsdk.card.GetQRConfigRequest.prototype.setDeviceid = function(value) {
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
proto.gsdk.card.GetQRConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.GetQRConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.GetQRConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetQRConfigResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.gsdk.card.QRConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.GetQRConfigResponse}
 */
proto.gsdk.card.GetQRConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.GetQRConfigResponse;
  return proto.gsdk.card.GetQRConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.GetQRConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.GetQRConfigResponse}
 */
proto.gsdk.card.GetQRConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.card.QRConfig;
      reader.readMessage(value,proto.gsdk.card.QRConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.GetQRConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.GetQRConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.GetQRConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetQRConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gsdk.card.QRConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional QRConfig config = 1;
 * @return {?proto.gsdk.card.QRConfig}
 */
proto.gsdk.card.GetQRConfigResponse.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.QRConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.QRConfig, 1));
};


/**
 * @param {?proto.gsdk.card.QRConfig|undefined} value
 * @return {!proto.gsdk.card.GetQRConfigResponse} returns this
*/
proto.gsdk.card.GetQRConfigResponse.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.GetQRConfigResponse} returns this
 */
proto.gsdk.card.GetQRConfigResponse.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.GetQRConfigResponse.prototype.hasConfig = function() {
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
proto.gsdk.card.SetQRConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetQRConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetQRConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetQRConfigRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    config: (f = msg.getConfig()) && proto.gsdk.card.QRConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.SetQRConfigRequest}
 */
proto.gsdk.card.SetQRConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetQRConfigRequest;
  return proto.gsdk.card.SetQRConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetQRConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetQRConfigRequest}
 */
proto.gsdk.card.SetQRConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.QRConfig;
      reader.readMessage(value,proto.gsdk.card.QRConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.SetQRConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetQRConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetQRConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetQRConfigRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.QRConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.card.SetQRConfigRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SetQRConfigRequest} returns this
 */
proto.gsdk.card.SetQRConfigRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional QRConfig config = 2;
 * @return {?proto.gsdk.card.QRConfig}
 */
proto.gsdk.card.SetQRConfigRequest.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.QRConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.QRConfig, 2));
};


/**
 * @param {?proto.gsdk.card.QRConfig|undefined} value
 * @return {!proto.gsdk.card.SetQRConfigRequest} returns this
*/
proto.gsdk.card.SetQRConfigRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SetQRConfigRequest} returns this
 */
proto.gsdk.card.SetQRConfigRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SetQRConfigRequest.prototype.hasConfig = function() {
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
proto.gsdk.card.SetQRConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetQRConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetQRConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetQRConfigResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.SetQRConfigResponse}
 */
proto.gsdk.card.SetQRConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetQRConfigResponse;
  return proto.gsdk.card.SetQRConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetQRConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetQRConfigResponse}
 */
proto.gsdk.card.SetQRConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.SetQRConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetQRConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetQRConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetQRConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.SetQRConfigMultiRequest.repeatedFields_ = [1];



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
proto.gsdk.card.SetQRConfigMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetQRConfigMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetQRConfigMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetQRConfigMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    config: (f = msg.getConfig()) && proto.gsdk.card.QRConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.SetQRConfigMultiRequest}
 */
proto.gsdk.card.SetQRConfigMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetQRConfigMultiRequest;
  return proto.gsdk.card.SetQRConfigMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetQRConfigMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetQRConfigMultiRequest}
 */
proto.gsdk.card.SetQRConfigMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.QRConfig;
      reader.readMessage(value,proto.gsdk.card.QRConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.SetQRConfigMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetQRConfigMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetQRConfigMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetQRConfigMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.QRConfig.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.card.SetQRConfigMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.SetQRConfigMultiRequest} returns this
 */
proto.gsdk.card.SetQRConfigMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.SetQRConfigMultiRequest} returns this
 */
proto.gsdk.card.SetQRConfigMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SetQRConfigMultiRequest} returns this
 */
proto.gsdk.card.SetQRConfigMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * optional QRConfig config = 2;
 * @return {?proto.gsdk.card.QRConfig}
 */
proto.gsdk.card.SetQRConfigMultiRequest.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.QRConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.QRConfig, 2));
};


/**
 * @param {?proto.gsdk.card.QRConfig|undefined} value
 * @return {!proto.gsdk.card.SetQRConfigMultiRequest} returns this
*/
proto.gsdk.card.SetQRConfigMultiRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SetQRConfigMultiRequest} returns this
 */
proto.gsdk.card.SetQRConfigMultiRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SetQRConfigMultiRequest.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.SetQRConfigMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.card.SetQRConfigMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetQRConfigMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetQRConfigMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetQRConfigMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.SetQRConfigMultiResponse}
 */
proto.gsdk.card.SetQRConfigMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetQRConfigMultiResponse;
  return proto.gsdk.card.SetQRConfigMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetQRConfigMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetQRConfigMultiResponse}
 */
proto.gsdk.card.SetQRConfigMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.SetQRConfigMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetQRConfigMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetQRConfigMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetQRConfigMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.SetQRConfigMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.card.SetQRConfigMultiResponse} returns this
*/
proto.gsdk.card.SetQRConfigMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.card.SetQRConfigMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SetQRConfigMultiResponse} returns this
 */
proto.gsdk.card.SetQRConfigMultiResponse.prototype.clearDeviceerrorsList = function() {
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
proto.gsdk.card.DESFireAppLevelKey.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.DESFireAppLevelKey.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.DESFireAppLevelKey} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DESFireAppLevelKey.toObject = function(includeInstance, msg) {
  var f, obj = {
    appmasterkey: msg.getAppmasterkey_asB64(),
    filereadkey: msg.getFilereadkey_asB64(),
    filewritekey: msg.getFilewritekey_asB64(),
    filereadkeynumber: jspb.Message.getFieldWithDefault(msg, 4, 0),
    filewritekeynumber: jspb.Message.getFieldWithDefault(msg, 5, 0)
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
 * @return {!proto.gsdk.card.DESFireAppLevelKey}
 */
proto.gsdk.card.DESFireAppLevelKey.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.DESFireAppLevelKey;
  return proto.gsdk.card.DESFireAppLevelKey.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.DESFireAppLevelKey} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.DESFireAppLevelKey}
 */
proto.gsdk.card.DESFireAppLevelKey.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAppmasterkey(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFilereadkey(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFilewritekey(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setFilereadkeynumber(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setFilewritekeynumber(value);
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
proto.gsdk.card.DESFireAppLevelKey.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.DESFireAppLevelKey.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.DESFireAppLevelKey} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.DESFireAppLevelKey.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAppmasterkey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getFilereadkey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getFilewritekey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getFilereadkeynumber();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = message.getFilewritekeynumber();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
};


/**
 * optional bytes appMasterKey = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getAppmasterkey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes appMasterKey = 1;
 * This is a type-conversion wrapper around `getAppmasterkey()`
 * @return {string}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getAppmasterkey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAppmasterkey()));
};


/**
 * optional bytes appMasterKey = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAppmasterkey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getAppmasterkey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAppmasterkey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.DESFireAppLevelKey} returns this
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.setAppmasterkey = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes fileReadKey = 2;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getFilereadkey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes fileReadKey = 2;
 * This is a type-conversion wrapper around `getFilereadkey()`
 * @return {string}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getFilereadkey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFilereadkey()));
};


/**
 * optional bytes fileReadKey = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFilereadkey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getFilereadkey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFilereadkey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.DESFireAppLevelKey} returns this
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.setFilereadkey = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional bytes fileWriteKey = 3;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getFilewritekey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes fileWriteKey = 3;
 * This is a type-conversion wrapper around `getFilewritekey()`
 * @return {string}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getFilewritekey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFilewritekey()));
};


/**
 * optional bytes fileWriteKey = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFilewritekey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getFilewritekey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFilewritekey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.DESFireAppLevelKey} returns this
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.setFilewritekey = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional uint32 fileReadKeyNumber = 4;
 * @return {number}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getFilereadkeynumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.DESFireAppLevelKey} returns this
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.setFilereadkeynumber = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint32 fileWriteKeyNumber = 5;
 * @return {number}
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.getFilewritekeynumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.DESFireAppLevelKey} returns this
 */
proto.gsdk.card.DESFireAppLevelKey.prototype.setFilewritekeynumber = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
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
proto.gsdk.card.CustomMifareCard.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.CustomMifareCard.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.CustomMifareCard} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CustomMifareCard.toObject = function(includeInstance, msg) {
  var f, obj = {
    primarykey: msg.getPrimarykey_asB64(),
    secondarykey: msg.getSecondarykey_asB64(),
    startblockindex: jspb.Message.getFieldWithDefault(msg, 3, 0),
    datasize: jspb.Message.getFieldWithDefault(msg, 4, 0),
    skipbytes: jspb.Message.getFieldWithDefault(msg, 5, 0)
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
 * @return {!proto.gsdk.card.CustomMifareCard}
 */
proto.gsdk.card.CustomMifareCard.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.CustomMifareCard;
  return proto.gsdk.card.CustomMifareCard.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.CustomMifareCard} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.CustomMifareCard}
 */
proto.gsdk.card.CustomMifareCard.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPrimarykey(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSecondarykey(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStartblockindex(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setDatasize(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setSkipbytes(value);
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
proto.gsdk.card.CustomMifareCard.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.CustomMifareCard.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.CustomMifareCard} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CustomMifareCard.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPrimarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getSecondarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getStartblockindex();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getDatasize();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = message.getSkipbytes();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
};


/**
 * optional bytes primaryKey = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.CustomMifareCard.prototype.getPrimarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes primaryKey = 1;
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {string}
 */
proto.gsdk.card.CustomMifareCard.prototype.getPrimarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPrimarykey()));
};


/**
 * optional bytes primaryKey = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.CustomMifareCard.prototype.getPrimarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPrimarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.CustomMifareCard} returns this
 */
proto.gsdk.card.CustomMifareCard.prototype.setPrimarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes secondaryKey = 2;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.CustomMifareCard.prototype.getSecondarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes secondaryKey = 2;
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {string}
 */
proto.gsdk.card.CustomMifareCard.prototype.getSecondarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSecondarykey()));
};


/**
 * optional bytes secondaryKey = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.CustomMifareCard.prototype.getSecondarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSecondarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.CustomMifareCard} returns this
 */
proto.gsdk.card.CustomMifareCard.prototype.setSecondarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional uint32 startBlockIndex = 3;
 * @return {number}
 */
proto.gsdk.card.CustomMifareCard.prototype.getStartblockindex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.CustomMifareCard} returns this
 */
proto.gsdk.card.CustomMifareCard.prototype.setStartblockindex = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional uint32 dataSize = 4;
 * @return {number}
 */
proto.gsdk.card.CustomMifareCard.prototype.getDatasize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.CustomMifareCard} returns this
 */
proto.gsdk.card.CustomMifareCard.prototype.setDatasize = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint32 skipBytes = 5;
 * @return {number}
 */
proto.gsdk.card.CustomMifareCard.prototype.getSkipbytes = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.CustomMifareCard} returns this
 */
proto.gsdk.card.CustomMifareCard.prototype.setSkipbytes = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
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
proto.gsdk.card.CustomDESFireCard.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.CustomDESFireCard.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.CustomDESFireCard} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CustomDESFireCard.toObject = function(includeInstance, msg) {
  var f, obj = {
    primarykey: msg.getPrimarykey_asB64(),
    secondarykey: msg.getSecondarykey_asB64(),
    appid: msg.getAppid_asB64(),
    fileid: jspb.Message.getFieldWithDefault(msg, 4, 0),
    encryptiontype: jspb.Message.getFieldWithDefault(msg, 5, 0),
    operationmode: jspb.Message.getFieldWithDefault(msg, 6, 0),
    datasize: jspb.Message.getFieldWithDefault(msg, 7, 0),
    skipbytes: jspb.Message.getFieldWithDefault(msg, 8, 0),
    desfireappkey: (f = msg.getDesfireappkey()) && proto.gsdk.card.DESFireAppLevelKey.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.CustomDESFireCard}
 */
proto.gsdk.card.CustomDESFireCard.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.CustomDESFireCard;
  return proto.gsdk.card.CustomDESFireCard.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.CustomDESFireCard} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.CustomDESFireCard}
 */
proto.gsdk.card.CustomDESFireCard.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPrimarykey(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSecondarykey(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAppid(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setFileid(value);
      break;
    case 5:
      var value = /** @type {!proto.gsdk.card.DESFireEncryptionType} */ (reader.readEnum());
      msg.setEncryptiontype(value);
      break;
    case 6:
      var value = /** @type {!proto.gsdk.card.DESFireOperationMode} */ (reader.readEnum());
      msg.setOperationmode(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setDatasize(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setSkipbytes(value);
      break;
    case 9:
      var value = new proto.gsdk.card.DESFireAppLevelKey;
      reader.readMessage(value,proto.gsdk.card.DESFireAppLevelKey.deserializeBinaryFromReader);
      msg.setDesfireappkey(value);
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
proto.gsdk.card.CustomDESFireCard.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.CustomDESFireCard.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.CustomDESFireCard} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CustomDESFireCard.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPrimarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getSecondarykey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getAppid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getFileid();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = message.getEncryptiontype();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getOperationmode();
  if (f !== 0.0) {
    writer.writeEnum(
      6,
      f
    );
  }
  f = message.getDatasize();
  if (f !== 0) {
    writer.writeUint32(
      7,
      f
    );
  }
  f = message.getSkipbytes();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
  f = message.getDesfireappkey();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.gsdk.card.DESFireAppLevelKey.serializeBinaryToWriter
    );
  }
};


/**
 * optional bytes primaryKey = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getPrimarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes primaryKey = 1;
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {string}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getPrimarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPrimarykey()));
};


/**
 * optional bytes primaryKey = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPrimarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getPrimarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPrimarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.CustomDESFireCard} returns this
 */
proto.gsdk.card.CustomDESFireCard.prototype.setPrimarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes secondaryKey = 2;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getSecondarykey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes secondaryKey = 2;
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {string}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getSecondarykey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSecondarykey()));
};


/**
 * optional bytes secondaryKey = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSecondarykey()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getSecondarykey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSecondarykey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.CustomDESFireCard} returns this
 */
proto.gsdk.card.CustomDESFireCard.prototype.setSecondarykey = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional bytes appID = 3;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getAppid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes appID = 3;
 * This is a type-conversion wrapper around `getAppid()`
 * @return {string}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getAppid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAppid()));
};


/**
 * optional bytes appID = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAppid()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getAppid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAppid()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.CustomDESFireCard} returns this
 */
proto.gsdk.card.CustomDESFireCard.prototype.setAppid = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional uint32 fileID = 4;
 * @return {number}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getFileid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.CustomDESFireCard} returns this
 */
proto.gsdk.card.CustomDESFireCard.prototype.setFileid = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional DESFireEncryptionType encryptionType = 5;
 * @return {!proto.gsdk.card.DESFireEncryptionType}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getEncryptiontype = function() {
  return /** @type {!proto.gsdk.card.DESFireEncryptionType} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.gsdk.card.DESFireEncryptionType} value
 * @return {!proto.gsdk.card.CustomDESFireCard} returns this
 */
proto.gsdk.card.CustomDESFireCard.prototype.setEncryptiontype = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional DESFireOperationMode operationMode = 6;
 * @return {!proto.gsdk.card.DESFireOperationMode}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getOperationmode = function() {
  return /** @type {!proto.gsdk.card.DESFireOperationMode} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {!proto.gsdk.card.DESFireOperationMode} value
 * @return {!proto.gsdk.card.CustomDESFireCard} returns this
 */
proto.gsdk.card.CustomDESFireCard.prototype.setOperationmode = function(value) {
  return jspb.Message.setProto3EnumField(this, 6, value);
};


/**
 * optional uint32 dataSize = 7;
 * @return {number}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getDatasize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.CustomDESFireCard} returns this
 */
proto.gsdk.card.CustomDESFireCard.prototype.setDatasize = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional uint32 skipBytes = 8;
 * @return {number}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getSkipbytes = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.CustomDESFireCard} returns this
 */
proto.gsdk.card.CustomDESFireCard.prototype.setSkipbytes = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional DESFireAppLevelKey desfireAppKey = 9;
 * @return {?proto.gsdk.card.DESFireAppLevelKey}
 */
proto.gsdk.card.CustomDESFireCard.prototype.getDesfireappkey = function() {
  return /** @type{?proto.gsdk.card.DESFireAppLevelKey} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.DESFireAppLevelKey, 9));
};


/**
 * @param {?proto.gsdk.card.DESFireAppLevelKey|undefined} value
 * @return {!proto.gsdk.card.CustomDESFireCard} returns this
*/
proto.gsdk.card.CustomDESFireCard.prototype.setDesfireappkey = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.CustomDESFireCard} returns this
 */
proto.gsdk.card.CustomDESFireCard.prototype.clearDesfireappkey = function() {
  return this.setDesfireappkey(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.CustomDESFireCard.prototype.hasDesfireappkey = function() {
  return jspb.Message.getField(this, 9) != null;
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
proto.gsdk.card.CustomConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.CustomConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.CustomConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CustomConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    datatype: jspb.Message.getFieldWithDefault(msg, 1, 0),
    usesecondarykey: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    mifare: (f = msg.getMifare()) && proto.gsdk.card.CustomMifareCard.toObject(includeInstance, f),
    desfire: (f = msg.getDesfire()) && proto.gsdk.card.CustomDESFireCard.toObject(includeInstance, f),
    smartcardbyteorder: jspb.Message.getFieldWithDefault(msg, 5, 0),
    formatid: jspb.Message.getFieldWithDefault(msg, 6, 0),
    mifareencryption: jspb.Message.getFieldWithDefault(msg, 7, 0)
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
 * @return {!proto.gsdk.card.CustomConfig}
 */
proto.gsdk.card.CustomConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.CustomConfig;
  return proto.gsdk.card.CustomConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.CustomConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.CustomConfig}
 */
proto.gsdk.card.CustomConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.gsdk.card.CardDataType} */ (reader.readEnum());
      msg.setDatatype(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUsesecondarykey(value);
      break;
    case 3:
      var value = new proto.gsdk.card.CustomMifareCard;
      reader.readMessage(value,proto.gsdk.card.CustomMifareCard.deserializeBinaryFromReader);
      msg.setMifare(value);
      break;
    case 4:
      var value = new proto.gsdk.card.CustomDESFireCard;
      reader.readMessage(value,proto.gsdk.card.CustomDESFireCard.deserializeBinaryFromReader);
      msg.setDesfire(value);
      break;
    case 5:
      var value = /** @type {!proto.gsdk.card.CardByteOrder} */ (reader.readEnum());
      msg.setSmartcardbyteorder(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setFormatid(value);
      break;
    case 7:
      var value = /** @type {!proto.gsdk.card.MIFARE_ENCRYPTION} */ (reader.readEnum());
      msg.setMifareencryption(value);
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
proto.gsdk.card.CustomConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.CustomConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.CustomConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.CustomConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDatatype();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getUsesecondarykey();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getMifare();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.gsdk.card.CustomMifareCard.serializeBinaryToWriter
    );
  }
  f = message.getDesfire();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.gsdk.card.CustomDESFireCard.serializeBinaryToWriter
    );
  }
  f = message.getSmartcardbyteorder();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getFormatid();
  if (f !== 0) {
    writer.writeUint32(
      6,
      f
    );
  }
  f = message.getMifareencryption();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * optional CardDataType dataType = 1;
 * @return {!proto.gsdk.card.CardDataType}
 */
proto.gsdk.card.CustomConfig.prototype.getDatatype = function() {
  return /** @type {!proto.gsdk.card.CardDataType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.gsdk.card.CardDataType} value
 * @return {!proto.gsdk.card.CustomConfig} returns this
 */
proto.gsdk.card.CustomConfig.prototype.setDatatype = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional bool useSecondaryKey = 2;
 * @return {boolean}
 */
proto.gsdk.card.CustomConfig.prototype.getUsesecondarykey = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.gsdk.card.CustomConfig} returns this
 */
proto.gsdk.card.CustomConfig.prototype.setUsesecondarykey = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional CustomMifareCard mifare = 3;
 * @return {?proto.gsdk.card.CustomMifareCard}
 */
proto.gsdk.card.CustomConfig.prototype.getMifare = function() {
  return /** @type{?proto.gsdk.card.CustomMifareCard} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CustomMifareCard, 3));
};


/**
 * @param {?proto.gsdk.card.CustomMifareCard|undefined} value
 * @return {!proto.gsdk.card.CustomConfig} returns this
*/
proto.gsdk.card.CustomConfig.prototype.setMifare = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.CustomConfig} returns this
 */
proto.gsdk.card.CustomConfig.prototype.clearMifare = function() {
  return this.setMifare(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.CustomConfig.prototype.hasMifare = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional CustomDESFireCard desfire = 4;
 * @return {?proto.gsdk.card.CustomDESFireCard}
 */
proto.gsdk.card.CustomConfig.prototype.getDesfire = function() {
  return /** @type{?proto.gsdk.card.CustomDESFireCard} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CustomDESFireCard, 4));
};


/**
 * @param {?proto.gsdk.card.CustomDESFireCard|undefined} value
 * @return {!proto.gsdk.card.CustomConfig} returns this
*/
proto.gsdk.card.CustomConfig.prototype.setDesfire = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.CustomConfig} returns this
 */
proto.gsdk.card.CustomConfig.prototype.clearDesfire = function() {
  return this.setDesfire(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.CustomConfig.prototype.hasDesfire = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional CardByteOrder smartCardByteOrder = 5;
 * @return {!proto.gsdk.card.CardByteOrder}
 */
proto.gsdk.card.CustomConfig.prototype.getSmartcardbyteorder = function() {
  return /** @type {!proto.gsdk.card.CardByteOrder} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.gsdk.card.CardByteOrder} value
 * @return {!proto.gsdk.card.CustomConfig} returns this
 */
proto.gsdk.card.CustomConfig.prototype.setSmartcardbyteorder = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional uint32 formatID = 6;
 * @return {number}
 */
proto.gsdk.card.CustomConfig.prototype.getFormatid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.CustomConfig} returns this
 */
proto.gsdk.card.CustomConfig.prototype.setFormatid = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional MIFARE_ENCRYPTION mifareEncryption = 7;
 * @return {!proto.gsdk.card.MIFARE_ENCRYPTION}
 */
proto.gsdk.card.CustomConfig.prototype.getMifareencryption = function() {
  return /** @type {!proto.gsdk.card.MIFARE_ENCRYPTION} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.gsdk.card.MIFARE_ENCRYPTION} value
 * @return {!proto.gsdk.card.CustomConfig} returns this
 */
proto.gsdk.card.CustomConfig.prototype.setMifareencryption = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
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
proto.gsdk.card.GetCustomConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.GetCustomConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.GetCustomConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetCustomConfigRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.GetCustomConfigRequest}
 */
proto.gsdk.card.GetCustomConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.GetCustomConfigRequest;
  return proto.gsdk.card.GetCustomConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.GetCustomConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.GetCustomConfigRequest}
 */
proto.gsdk.card.GetCustomConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.GetCustomConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.GetCustomConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.GetCustomConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetCustomConfigRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.GetCustomConfigRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.GetCustomConfigRequest} returns this
 */
proto.gsdk.card.GetCustomConfigRequest.prototype.setDeviceid = function(value) {
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
proto.gsdk.card.GetCustomConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.GetCustomConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.GetCustomConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetCustomConfigResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.gsdk.card.CustomConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.GetCustomConfigResponse}
 */
proto.gsdk.card.GetCustomConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.GetCustomConfigResponse;
  return proto.gsdk.card.GetCustomConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.GetCustomConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.GetCustomConfigResponse}
 */
proto.gsdk.card.GetCustomConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.card.CustomConfig;
      reader.readMessage(value,proto.gsdk.card.CustomConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.GetCustomConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.GetCustomConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.GetCustomConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetCustomConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gsdk.card.CustomConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional CustomConfig config = 1;
 * @return {?proto.gsdk.card.CustomConfig}
 */
proto.gsdk.card.GetCustomConfigResponse.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.CustomConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CustomConfig, 1));
};


/**
 * @param {?proto.gsdk.card.CustomConfig|undefined} value
 * @return {!proto.gsdk.card.GetCustomConfigResponse} returns this
*/
proto.gsdk.card.GetCustomConfigResponse.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.GetCustomConfigResponse} returns this
 */
proto.gsdk.card.GetCustomConfigResponse.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.GetCustomConfigResponse.prototype.hasConfig = function() {
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
proto.gsdk.card.SetCustomConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetCustomConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetCustomConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetCustomConfigRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    config: (f = msg.getConfig()) && proto.gsdk.card.CustomConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.SetCustomConfigRequest}
 */
proto.gsdk.card.SetCustomConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetCustomConfigRequest;
  return proto.gsdk.card.SetCustomConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetCustomConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetCustomConfigRequest}
 */
proto.gsdk.card.SetCustomConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.CustomConfig;
      reader.readMessage(value,proto.gsdk.card.CustomConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.SetCustomConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetCustomConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetCustomConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetCustomConfigRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.CustomConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.card.SetCustomConfigRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SetCustomConfigRequest} returns this
 */
proto.gsdk.card.SetCustomConfigRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional CustomConfig config = 2;
 * @return {?proto.gsdk.card.CustomConfig}
 */
proto.gsdk.card.SetCustomConfigRequest.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.CustomConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CustomConfig, 2));
};


/**
 * @param {?proto.gsdk.card.CustomConfig|undefined} value
 * @return {!proto.gsdk.card.SetCustomConfigRequest} returns this
*/
proto.gsdk.card.SetCustomConfigRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SetCustomConfigRequest} returns this
 */
proto.gsdk.card.SetCustomConfigRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SetCustomConfigRequest.prototype.hasConfig = function() {
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
proto.gsdk.card.SetCustomConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetCustomConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetCustomConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetCustomConfigResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.SetCustomConfigResponse}
 */
proto.gsdk.card.SetCustomConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetCustomConfigResponse;
  return proto.gsdk.card.SetCustomConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetCustomConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetCustomConfigResponse}
 */
proto.gsdk.card.SetCustomConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.SetCustomConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetCustomConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetCustomConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetCustomConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.SetCustomConfigMultiRequest.repeatedFields_ = [1];



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
proto.gsdk.card.SetCustomConfigMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetCustomConfigMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetCustomConfigMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetCustomConfigMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    config: (f = msg.getConfig()) && proto.gsdk.card.CustomConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.SetCustomConfigMultiRequest}
 */
proto.gsdk.card.SetCustomConfigMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetCustomConfigMultiRequest;
  return proto.gsdk.card.SetCustomConfigMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetCustomConfigMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetCustomConfigMultiRequest}
 */
proto.gsdk.card.SetCustomConfigMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.CustomConfig;
      reader.readMessage(value,proto.gsdk.card.CustomConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.SetCustomConfigMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetCustomConfigMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetCustomConfigMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetCustomConfigMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.CustomConfig.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.card.SetCustomConfigMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.SetCustomConfigMultiRequest} returns this
 */
proto.gsdk.card.SetCustomConfigMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.SetCustomConfigMultiRequest} returns this
 */
proto.gsdk.card.SetCustomConfigMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SetCustomConfigMultiRequest} returns this
 */
proto.gsdk.card.SetCustomConfigMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * optional CustomConfig config = 2;
 * @return {?proto.gsdk.card.CustomConfig}
 */
proto.gsdk.card.SetCustomConfigMultiRequest.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.CustomConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.CustomConfig, 2));
};


/**
 * @param {?proto.gsdk.card.CustomConfig|undefined} value
 * @return {!proto.gsdk.card.SetCustomConfigMultiRequest} returns this
*/
proto.gsdk.card.SetCustomConfigMultiRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SetCustomConfigMultiRequest} returns this
 */
proto.gsdk.card.SetCustomConfigMultiRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SetCustomConfigMultiRequest.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.SetCustomConfigMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.card.SetCustomConfigMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetCustomConfigMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetCustomConfigMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetCustomConfigMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.SetCustomConfigMultiResponse}
 */
proto.gsdk.card.SetCustomConfigMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetCustomConfigMultiResponse;
  return proto.gsdk.card.SetCustomConfigMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetCustomConfigMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetCustomConfigMultiResponse}
 */
proto.gsdk.card.SetCustomConfigMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.SetCustomConfigMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetCustomConfigMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetCustomConfigMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetCustomConfigMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.SetCustomConfigMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.card.SetCustomConfigMultiResponse} returns this
*/
proto.gsdk.card.SetCustomConfigMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.card.SetCustomConfigMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SetCustomConfigMultiResponse} returns this
 */
proto.gsdk.card.SetCustomConfigMultiResponse.prototype.clearDeviceerrorsList = function() {
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
proto.gsdk.card.FacilityCode.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.FacilityCode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.FacilityCode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.FacilityCode.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: msg.getCode_asB64()
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
 * @return {!proto.gsdk.card.FacilityCode}
 */
proto.gsdk.card.FacilityCode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.FacilityCode;
  return proto.gsdk.card.FacilityCode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.FacilityCode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.FacilityCode}
 */
proto.gsdk.card.FacilityCode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCode(value);
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
proto.gsdk.card.FacilityCode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.FacilityCode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.FacilityCode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.FacilityCode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes code = 1;
 * @return {!(string|Uint8Array)}
 */
proto.gsdk.card.FacilityCode.prototype.getCode = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes code = 1;
 * This is a type-conversion wrapper around `getCode()`
 * @return {string}
 */
proto.gsdk.card.FacilityCode.prototype.getCode_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCode()));
};


/**
 * optional bytes code = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCode()`
 * @return {!Uint8Array}
 */
proto.gsdk.card.FacilityCode.prototype.getCode_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCode()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.gsdk.card.FacilityCode} returns this
 */
proto.gsdk.card.FacilityCode.prototype.setCode = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.FacilityCodeConfig.repeatedFields_ = [1];



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
proto.gsdk.card.FacilityCodeConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.FacilityCodeConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.FacilityCodeConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.FacilityCodeConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    facilitycodesList: jspb.Message.toObjectList(msg.getFacilitycodesList(),
    proto.gsdk.card.FacilityCode.toObject, includeInstance)
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
 * @return {!proto.gsdk.card.FacilityCodeConfig}
 */
proto.gsdk.card.FacilityCodeConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.FacilityCodeConfig;
  return proto.gsdk.card.FacilityCodeConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.FacilityCodeConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.FacilityCodeConfig}
 */
proto.gsdk.card.FacilityCodeConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.card.FacilityCode;
      reader.readMessage(value,proto.gsdk.card.FacilityCode.deserializeBinaryFromReader);
      msg.addFacilitycodes(value);
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
proto.gsdk.card.FacilityCodeConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.FacilityCodeConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.FacilityCodeConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.FacilityCodeConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFacilitycodesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.gsdk.card.FacilityCode.serializeBinaryToWriter
    );
  }
};


/**
 * repeated FacilityCode facilityCodes = 1;
 * @return {!Array<!proto.gsdk.card.FacilityCode>}
 */
proto.gsdk.card.FacilityCodeConfig.prototype.getFacilitycodesList = function() {
  return /** @type{!Array<!proto.gsdk.card.FacilityCode>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.gsdk.card.FacilityCode, 1));
};


/**
 * @param {!Array<!proto.gsdk.card.FacilityCode>} value
 * @return {!proto.gsdk.card.FacilityCodeConfig} returns this
*/
proto.gsdk.card.FacilityCodeConfig.prototype.setFacilitycodesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.card.FacilityCode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.FacilityCode}
 */
proto.gsdk.card.FacilityCodeConfig.prototype.addFacilitycodes = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.card.FacilityCode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.FacilityCodeConfig} returns this
 */
proto.gsdk.card.FacilityCodeConfig.prototype.clearFacilitycodesList = function() {
  return this.setFacilitycodesList([]);
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
proto.gsdk.card.GetFacilityCodeConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.GetFacilityCodeConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.GetFacilityCodeConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetFacilityCodeConfigRequest.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.GetFacilityCodeConfigRequest}
 */
proto.gsdk.card.GetFacilityCodeConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.GetFacilityCodeConfigRequest;
  return proto.gsdk.card.GetFacilityCodeConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.GetFacilityCodeConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.GetFacilityCodeConfigRequest}
 */
proto.gsdk.card.GetFacilityCodeConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.GetFacilityCodeConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.GetFacilityCodeConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.GetFacilityCodeConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetFacilityCodeConfigRequest.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.GetFacilityCodeConfigRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.GetFacilityCodeConfigRequest} returns this
 */
proto.gsdk.card.GetFacilityCodeConfigRequest.prototype.setDeviceid = function(value) {
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
proto.gsdk.card.GetFacilityCodeConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.GetFacilityCodeConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.GetFacilityCodeConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetFacilityCodeConfigResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.gsdk.card.FacilityCodeConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.GetFacilityCodeConfigResponse}
 */
proto.gsdk.card.GetFacilityCodeConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.GetFacilityCodeConfigResponse;
  return proto.gsdk.card.GetFacilityCodeConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.GetFacilityCodeConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.GetFacilityCodeConfigResponse}
 */
proto.gsdk.card.GetFacilityCodeConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.gsdk.card.FacilityCodeConfig;
      reader.readMessage(value,proto.gsdk.card.FacilityCodeConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.GetFacilityCodeConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.GetFacilityCodeConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.GetFacilityCodeConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.GetFacilityCodeConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.gsdk.card.FacilityCodeConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional FacilityCodeConfig config = 1;
 * @return {?proto.gsdk.card.FacilityCodeConfig}
 */
proto.gsdk.card.GetFacilityCodeConfigResponse.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.FacilityCodeConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.FacilityCodeConfig, 1));
};


/**
 * @param {?proto.gsdk.card.FacilityCodeConfig|undefined} value
 * @return {!proto.gsdk.card.GetFacilityCodeConfigResponse} returns this
*/
proto.gsdk.card.GetFacilityCodeConfigResponse.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.GetFacilityCodeConfigResponse} returns this
 */
proto.gsdk.card.GetFacilityCodeConfigResponse.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.GetFacilityCodeConfigResponse.prototype.hasConfig = function() {
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
proto.gsdk.card.SetFacilityCodeConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetFacilityCodeConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetFacilityCodeConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetFacilityCodeConfigRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    config: (f = msg.getConfig()) && proto.gsdk.card.FacilityCodeConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.SetFacilityCodeConfigRequest}
 */
proto.gsdk.card.SetFacilityCodeConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetFacilityCodeConfigRequest;
  return proto.gsdk.card.SetFacilityCodeConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetFacilityCodeConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetFacilityCodeConfigRequest}
 */
proto.gsdk.card.SetFacilityCodeConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.FacilityCodeConfig;
      reader.readMessage(value,proto.gsdk.card.FacilityCodeConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.SetFacilityCodeConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetFacilityCodeConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetFacilityCodeConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetFacilityCodeConfigRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceid();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.FacilityCodeConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 deviceID = 1;
 * @return {number}
 */
proto.gsdk.card.SetFacilityCodeConfigRequest.prototype.getDeviceid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.gsdk.card.SetFacilityCodeConfigRequest} returns this
 */
proto.gsdk.card.SetFacilityCodeConfigRequest.prototype.setDeviceid = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional FacilityCodeConfig config = 2;
 * @return {?proto.gsdk.card.FacilityCodeConfig}
 */
proto.gsdk.card.SetFacilityCodeConfigRequest.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.FacilityCodeConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.FacilityCodeConfig, 2));
};


/**
 * @param {?proto.gsdk.card.FacilityCodeConfig|undefined} value
 * @return {!proto.gsdk.card.SetFacilityCodeConfigRequest} returns this
*/
proto.gsdk.card.SetFacilityCodeConfigRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SetFacilityCodeConfigRequest} returns this
 */
proto.gsdk.card.SetFacilityCodeConfigRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SetFacilityCodeConfigRequest.prototype.hasConfig = function() {
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
proto.gsdk.card.SetFacilityCodeConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetFacilityCodeConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetFacilityCodeConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetFacilityCodeConfigResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.SetFacilityCodeConfigResponse}
 */
proto.gsdk.card.SetFacilityCodeConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetFacilityCodeConfigResponse;
  return proto.gsdk.card.SetFacilityCodeConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetFacilityCodeConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetFacilityCodeConfigResponse}
 */
proto.gsdk.card.SetFacilityCodeConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.SetFacilityCodeConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetFacilityCodeConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetFacilityCodeConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetFacilityCodeConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.repeatedFields_ = [1];



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
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetFacilityCodeConfigMultiRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetFacilityCodeConfigMultiRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deviceidsList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    config: (f = msg.getConfig()) && proto.gsdk.card.FacilityCodeConfig.toObject(includeInstance, f)
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
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiRequest}
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetFacilityCodeConfigMultiRequest;
  return proto.gsdk.card.SetFacilityCodeConfigMultiRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetFacilityCodeConfigMultiRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiRequest}
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.gsdk.card.FacilityCodeConfig;
      reader.readMessage(value,proto.gsdk.card.FacilityCodeConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
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
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetFacilityCodeConfigMultiRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetFacilityCodeConfigMultiRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeviceidsList();
  if (f.length > 0) {
    writer.writePackedUint32(
      1,
      f
    );
  }
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.gsdk.card.FacilityCodeConfig.serializeBinaryToWriter
    );
  }
};


/**
 * repeated uint32 deviceIDs = 1;
 * @return {!Array<number>}
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.prototype.getDeviceidsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiRequest} returns this
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.prototype.setDeviceidsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiRequest} returns this
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.prototype.addDeviceids = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiRequest} returns this
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.prototype.clearDeviceidsList = function() {
  return this.setDeviceidsList([]);
};


/**
 * optional FacilityCodeConfig config = 2;
 * @return {?proto.gsdk.card.FacilityCodeConfig}
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.prototype.getConfig = function() {
  return /** @type{?proto.gsdk.card.FacilityCodeConfig} */ (
    jspb.Message.getWrapperField(this, proto.gsdk.card.FacilityCodeConfig, 2));
};


/**
 * @param {?proto.gsdk.card.FacilityCodeConfig|undefined} value
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiRequest} returns this
*/
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiRequest} returns this
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.gsdk.card.SetFacilityCodeConfigMultiRequest.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.repeatedFields_ = [1];



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
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.gsdk.card.SetFacilityCodeConfigMultiResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.gsdk.card.SetFacilityCodeConfigMultiResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.toObject = function(includeInstance, msg) {
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
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiResponse}
 */
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.gsdk.card.SetFacilityCodeConfigMultiResponse;
  return proto.gsdk.card.SetFacilityCodeConfigMultiResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.gsdk.card.SetFacilityCodeConfigMultiResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiResponse}
 */
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.deserializeBinaryFromReader = function(msg, reader) {
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
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.gsdk.card.SetFacilityCodeConfigMultiResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.gsdk.card.SetFacilityCodeConfigMultiResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.serializeBinaryToWriter = function(message, writer) {
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
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.prototype.getDeviceerrorsList = function() {
  return /** @type{!Array<!proto.gsdk.err.ErrorResponse>} */ (
    jspb.Message.getRepeatedWrapperField(this, err_pb.ErrorResponse, 1));
};


/**
 * @param {!Array<!proto.gsdk.err.ErrorResponse>} value
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiResponse} returns this
*/
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.prototype.setDeviceerrorsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.gsdk.err.ErrorResponse=} opt_value
 * @param {number=} opt_index
 * @return {!proto.gsdk.err.ErrorResponse}
 */
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.prototype.addDeviceerrors = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.gsdk.err.ErrorResponse, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.gsdk.card.SetFacilityCodeConfigMultiResponse} returns this
 */
proto.gsdk.card.SetFacilityCodeConfigMultiResponse.prototype.clearDeviceerrorsList = function() {
  return this.setDeviceerrorsList([]);
};


/**
 * @enum {number}
 */
proto.gsdk.card.Enum = {
  FIRST_ENUM_VALUE_MUST_BE_ZERO: 0,
  DEFAULT_SCAN_TIMEOUT: 4,
  DEFAULT_TEMPLATE_SIZE: 384,
  FACE_TEMPLATE_SIZE: 552,
  MAX_TEMPLATES: 4,
  FACILITY_CODE_SIZE: 4,
  MAX_FACILITY_CODE: 16,
  MAX_MIFARE_KEY_SIZE_CRYPTO1: 6,
  MAX_MIFARE_KEY_SIZE_AES128: 16
};

/**
 * @enum {number}
 */
proto.gsdk.card.Type = {
  CARD_TYPE_UNKNOWN: 0,
  CARD_TYPE_CSN: 1,
  CARD_TYPE_SECURE: 2,
  CARD_TYPE_ACCESS: 3,
  CARD_TYPE_CSN_MOBILE: 4,
  CARD_TYPE_WIEGAND_MOBILE: 5,
  CARD_TYPE_QR: 6,
  CARD_TYPE_SECURE_QR: 7,
  CARD_TYPE_WIEGAND: 10,
  CARD_TYPE_CONFIG_CARD: 11,
  CARD_TYPE_CUSTOM_SMART: 13
};

/**
 * @enum {number}
 */
proto.gsdk.card.DESFireEncryptionType = {
  ENC_DES_3DES: 0,
  ENC_AES: 1
};

/**
 * @enum {number}
 */
proto.gsdk.card.DESFireOperationMode = {
  OPERATION_LEGACY: 0,
  OPERATION_APPLEVELKEY: 1
};

/**
 * @enum {number}
 */
proto.gsdk.card.CardByteOrder = {
  MSB: 0,
  LSB: 1
};

/**
 * @enum {number}
 */
proto.gsdk.card.CardDataType = {
  DATA_BINARY: 0,
  DATA_ASCII: 1,
  DATA_UTF16: 2,
  DATA_BCD: 3
};

/**
 * @enum {number}
 */
proto.gsdk.card.MIFARE_ENCRYPTION = {
  MIFARE_ENCRYPTION_CRYPTO1: 0,
  MIFARE_ENCRYPTION_AES128: 1
};

goog.object.extend(exports, proto.gsdk.card);
