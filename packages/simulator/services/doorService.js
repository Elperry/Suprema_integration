function createDoorService(state) {
  return {
    GetList(call, callback) {
      try {
        callback(null, { doors: state.getDoorList(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    GetStatus(call, callback) {
      try {
        callback(null, {
          status: state.getDoorStatus(call.request.deviceID, call.request.doorIDs || null),
        });
      } catch (error) {
        callback(error);
      }
    },

    Add(call, callback) {
      try {
        state.addDoors(call.request.deviceID, call.request.doors || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    Delete(call, callback) {
      try {
        state.deleteDoors(call.request.deviceID, call.request.doorIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteAll(call, callback) {
      try {
        state.deleteAllDoors(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    Lock(call, callback) {
      try {
        state.lockDoors(call.request.deviceID, call.request.doorIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    Unlock(call, callback) {
      try {
        state.unlockDoors(call.request.deviceID, call.request.doorIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    Release(call, callback) {
      try {
        state.releaseDoors(call.request.deviceID, call.request.doorIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetAlarm(call, callback) {
      try {
        state.setDoorAlarm(call.request.deviceID, call.request.doorIDs || [], call.request.alarmFlag || 0);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },
  };
}

module.exports = createDoorService;
