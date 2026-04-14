const { runMulti } = require('./serviceHelpers');

function createUserService(state) {
  return {
    GetList(call, callback) {
      try {
        callback(null, { hdrs: state.getUserList(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    Get(call, callback) {
      try {
        callback(null, { users: state.getUsers(call.request.deviceID, call.request.userIDs || []) });
      } catch (error) {
        callback(error);
      }
    },

    GetPartial(call, callback) {
      try {
        callback(null, { users: state.getUsers(call.request.deviceID, call.request.userIDs || []) });
      } catch (error) {
        callback(error);
      }
    },

    Enroll(call, callback) {
      try {
        state.enrollUsers(call.request.deviceID, call.request.users || [], call.request.overwrite !== false);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    EnrollMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.enrollUsers(deviceID, call.request.users || [], call.request.overwrite !== false);
      });

      callback(null, { deviceErrors });
    },

    Update(call, callback) {
      try {
        state.updateUsers(call.request.deviceID, call.request.users || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    UpdateMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.updateUsers(deviceID, call.request.users || []);
      });

      callback(null, { deviceErrors });
    },

    Delete(call, callback) {
      try {
        state.deleteUsers(call.request.deviceID, call.request.userIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteUsers(deviceID, call.request.userIDs || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteAll(call, callback) {
      try {
        state.deleteAllUsers(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteAllMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteAllUsers(deviceID);
      });

      callback(null, { deviceErrors });
    },

    GetCard(call, callback) {
      try {
        callback(null, { userCards: state.getUserCards(call.request.deviceID, call.request.userIDs || []) });
      } catch (error) {
        callback(error);
      }
    },

    SetCard(call, callback) {
      try {
        state.setUserCards(call.request.deviceID, call.request.userCards || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetCardMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setUserCards(deviceID, call.request.userCards || []);
      });

      callback(null, { deviceErrors });
    },

    GetFinger(call, callback) {
      try {
        callback(null, { userFingers: state.getUserFingers(call.request.deviceID, call.request.userIDs || []) });
      } catch (error) {
        callback(error);
      }
    },

    SetFinger(call, callback) {
      try {
        state.setUserFingers(call.request.deviceID, call.request.userFingers || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetFingerMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setUserFingers(deviceID, call.request.userFingers || []);
      });

      callback(null, { deviceErrors });
    },

    GetFace(call, callback) {
      try {
        callback(null, { userFaces: state.getUserFaces(call.request.deviceID, call.request.userIDs || []) });
      } catch (error) {
        callback(error);
      }
    },

    SetFace(call, callback) {
      try {
        state.setUserFaces(call.request.deviceID, call.request.userFaces || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetFaceMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setUserFaces(deviceID, call.request.userFaces || []);
      });

      callback(null, { deviceErrors });
    },

    GetAccessGroup(call, callback) {
      try {
        callback(null, { userAccessGroups: state.getUserAccessGroups(call.request.deviceID, call.request.userIDs || []) });
      } catch (error) {
        callback(error);
      }
    },

    SetAccessGroup(call, callback) {
      try {
        state.setUserAccessGroups(call.request.deviceID, call.request.userAccessGroups || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetAccessGroupMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setUserAccessGroups(deviceID, call.request.userAccessGroups || []);
      });

      callback(null, { deviceErrors });
    },

    GetJobCode(call, callback) {
      try {
        callback(null, { userJobCodes: state.getUserJobCodes(call.request.deviceID, call.request.userIDs || []) });
      } catch (error) {
        callback(error);
      }
    },

    SetJobCode(call, callback) {
      try {
        state.setUserJobCodes(call.request.deviceID, call.request.userJobCodes || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetJobCodeMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setUserJobCodes(deviceID, call.request.userJobCodes || []);
      });

      callback(null, { deviceErrors });
    },

    GetPINHash(call, callback) {
      callback(null, { hashVal: Buffer.alloc(32) });
    },

    GetPINHashWithKey(call, callback) {
      callback(null, { hashVal: Buffer.alloc(32) });
    },

    GetStatistic(call, callback) {
      try {
        callback(null, { userStatistic: state.getUserStatistics(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },
  };
}

module.exports = createUserService;
