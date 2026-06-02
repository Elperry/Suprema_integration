const errMessage = require('../../biostar/service/err_pb');
const grpcExt= require('../../biostar/service/ext/status_pb.js');

function getMultiError(err) {
  const buffer = err.metadata.get('grpc-status-details-bin')[0];

  if(buffer) {
    const status = grpcExt.Status.deserializeBinary(buffer);
    
    if(status) {
      var details = status.getDetailsList();

      for(any of details) {
        const multiErr = any.unpack(errMessage.MultiErrorResponse.deserializeBinary, "err.MultiErrorResponse");

        if(multiErr) {
          return multiErr.toObject();
        }
      }
    }
  }

  return null;
}

module.exports.getMultiError = getMultiError;