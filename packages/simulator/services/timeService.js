const { runMulti } = require('./serviceHelpers');

function createTimeService(state) {
  return {
    Get(call, callback) {
      try {
        callback(null, { GMTTime: state.getDeviceTime(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    Set(call, callback) {
      try {
        state.setDeviceTime(call.request.deviceID, call.request.GMTTime);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setDeviceTime(deviceID, call.request.GMTTime);
      });

      callback(null, { deviceErrors });
    },

    GetConfig(call, callback) {
      try {
        callback(null, { config: state.getTimeConfig(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    SetConfig(call, callback) {
      try {
        state.setTimeConfig(call.request.deviceID, call.request.config || {});
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetConfigMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setTimeConfig(deviceID, call.request.config || {});
      });

      callback(null, { deviceErrors });
    },

    GetDSTConfig(call, callback) {
      try {
        callback(null, { config: state.getDSTConfig(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    SetDSTConfig(call, callback) {
      try {
        state.setDSTConfig(call.request.deviceID, call.request.config || { schedules: [] });
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetDSTConfigMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setDSTConfig(deviceID, call.request.config || { schedules: [] });
      });

      callback(null, { deviceErrors });
    },
  };
}

module.exports = createTimeService;
