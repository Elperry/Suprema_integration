function toDeviceError(deviceID, error) {
  return {
    deviceID: Number(deviceID) || 0,
    code: Number(error?.code || 13),
    msg: error?.message || String(error),
  };
}

function runMulti(deviceIDs, handler) {
  const deviceErrors = [];

  for (const rawDeviceID of deviceIDs || []) {
    try {
      handler(Number(rawDeviceID));
    } catch (error) {
      deviceErrors.push(toDeviceError(rawDeviceID, error));
    }
  }

  return deviceErrors;
}

module.exports = {
  runMulti,
  toDeviceError,
};
