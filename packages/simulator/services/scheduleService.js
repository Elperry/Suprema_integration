const { runMulti } = require('./serviceHelpers');

function createScheduleService(state) {
  return {
    GetList(call, callback) {
      try {
        callback(null, { schedules: state.getSchedules(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    Add(call, callback) {
      try {
        state.addSchedules(call.request.deviceID, call.request.schedules || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    AddMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.addSchedules(deviceID, call.request.schedules || []);
      });

      callback(null, { deviceErrors });
    },

    Delete(call, callback) {
      try {
        state.deleteSchedules(call.request.deviceID, call.request.scheduleIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteSchedules(deviceID, call.request.scheduleIDs || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteAll(call, callback) {
      try {
        state.clearSchedules(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteAllMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.clearSchedules(deviceID);
      });

      callback(null, { deviceErrors });
    },

    GetHolidayList(call, callback) {
      try {
        callback(null, { groups: state.getHolidayGroups(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    AddHoliday(call, callback) {
      try {
        state.addHolidayGroups(call.request.deviceID, call.request.groups || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    AddHolidayMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.addHolidayGroups(deviceID, call.request.groups || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteHoliday(call, callback) {
      try {
        state.deleteHolidayGroups(call.request.deviceID, call.request.groupIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteHolidayMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteHolidayGroups(deviceID, call.request.groupIDs || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteAllHoliday(call, callback) {
      try {
        state.clearHolidayGroups(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteAllHolidayMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.clearHolidayGroups(deviceID);
      });

      callback(null, { deviceErrors });
    },
  };
}

module.exports = createScheduleService;
