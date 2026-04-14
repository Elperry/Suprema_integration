const { runMulti } = require('./serviceHelpers');

function createEventService(state) {
  return {
    EnableMonitoring(call, callback) {
      try {
        state.setMonitoring(call.request.deviceID, true);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    EnableMonitoringMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setMonitoring(deviceID, true);
      });

      callback(null, { deviceErrors });
    },

    DisableMonitoring(call, callback) {
      try {
        state.setMonitoring(call.request.deviceID, false);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DisableMonitoringMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setMonitoring(deviceID, false);
      });

      callback(null, { deviceErrors });
    },

    SubscribeRealtimeLog(call) {
      state.addEventSubscriber(call);
    },

    GetLog(call, callback) {
      try {
        callback(null, {
          events: state.getEventLog(
            call.request.deviceID,
            call.request.startEventID || 0,
            call.request.maxNumOfLog || 1000
          ),
        });
      } catch (error) {
        callback(error);
      }
    },

    GetLogWithFilter(call, callback) {
      try {
        callback(null, {
          events: state.getEventLogWithFilters(
            call.request.deviceID,
            call.request.startEventID || 0,
            call.request.maxNumOfLog || 1000,
            call.request.filters || []
          ),
        });
      } catch (error) {
        callback(error);
      }
    },

    GetImageLog(call, callback) {
      try {
        callback(null, {
          imageEvents: state.getImageLog(
            call.request.deviceID,
            call.request.startEventID || 0,
            call.request.maxNumOfLog || 100
          ),
        });
      } catch (error) {
        callback(error);
      }
    },

    GetImageFilter(call, callback) {
      try {
        callback(null, { filters: state.getImageFilters(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    SetImageFilter(call, callback) {
      try {
        state.setImageFilters(call.request.deviceID, call.request.filters || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetImageFilterMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setImageFilters(deviceID, call.request.filters || []);
      });

      callback(null, { deviceErrors });
    },

    ClearLog(call, callback) {
      try {
        state.clearEventLog(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    ClearLogMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.clearEventLog(deviceID);
      });

      callback(null, { deviceErrors });
    },
  };
}

module.exports = createEventService;
