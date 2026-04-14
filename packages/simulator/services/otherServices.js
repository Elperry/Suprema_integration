const { runMulti } = require('./serviceHelpers');

function createAuthService(state) {
  return {
    GetConfig(call, callback) {
      try {
        callback(null, { config: state.getAuthConfig(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    SetConfig(call, callback) {
      try {
        state.setAuthConfig(call.request.deviceID, call.request.config || {});
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetConfigMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setAuthConfig(deviceID, call.request.config || {});
      });

      callback(null, { deviceErrors });
    },
  };
}

function createFingerService(state) {
  return {
    Scan(call, callback) {
      const templateData = state._createFakeTemplate(384);
      const qualityScore = Number(call.request.qualityThreshold || 80);
      state.logActivity(`[Finger] Scan completed on device ${call.request.deviceID}`);
      callback(null, { templateData, qualityScore });
    },

    GetImage(call, callback) {
      callback(null, { BMPImage: Buffer.alloc(0) });
    },

    Verify(call, callback) {
      callback(null, {});
    },

    GetConfig(call, callback) {
      callback(null, {
        config: {
          securityLevel: 0,
          fastMode: 0,
          sensitivity: 7,
          sensorMode: 0,
          templateFormat: 0,
          scanTimeout: 10,
          advancedEnrollment: false,
          showImage: false,
          LFDLevel: 0,
          checkDuplicate: false,
        },
      });
    },

    SetConfig(call, callback) { callback(null, {}); },

    SetConfigMulti(call, callback) {
      callback(null, { deviceErrors: runMulti(call.request.deviceIDs, () => {}) });
    },
  };
}

function createFaceService(state) {
  return {
    Scan(call, callback) {
      state.logActivity(`[Face] Scan completed on device ${call.request.deviceID}`);
      callback(null, {
        faceData: {
          index: 0,
          flag: 0,
          templates: [state._createFakeTemplate(552)],
          imageData: Buffer.alloc(0),
          irTemplates: [],
          irImageData: Buffer.alloc(0),
        },
      });
    },

    Extract(call, callback) {
      callback(null, { templateData: state._createFakeTemplate(552) });
    },

    Normalize(call, callback) {
      callback(null, { wrappedImageData: Buffer.alloc(0) });
    },

    GetConfig(call, callback) {
      callback(null, {
        config: {
          securityLevel: 0,
          lightCondition: 0,
          enrollThreshold: 4,
          detectSensitivity: 2,
          enrollTimeout: 60,
          LFDLevel: 0,
          quickEnrollment: false,
          previewOption: 1,
          checkDuplicate: false,
          operationMode: 0,
          maxRotation: 15,
          faceWidthMin: 0,
          faceWidthMax: 0,
          searchRangeX: 0,
          searchRangeWidth: 0,
          detectDistanceMin: 30,
          detectDistanceMax: 100,
          wideSearch: false,
          unableToSaveImageOfVisualFace: false,
        },
      });
    },

    SetConfig(call, callback) { callback(null, {}); },

    SetConfigMulti(call, callback) {
      callback(null, { deviceErrors: runMulti(call.request.deviceIDs, () => {}) });
    },

    GetAuthGroup(call, callback) {
      try {
        callback(null, { authGroups: state.getFaceAuthGroups(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    AddAuthGroup(call, callback) {
      try {
        state.addFaceAuthGroups(call.request.deviceID, call.request.authGroups || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    AddAuthGroupMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.addFaceAuthGroups(deviceID, call.request.authGroups || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteAuthGroup(call, callback) {
      try {
        state.deleteFaceAuthGroups(call.request.deviceID, call.request.groupIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteAuthGroupMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteFaceAuthGroups(deviceID, call.request.groupIDs || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteAllAuthGroup(call, callback) {
      try {
        state.clearFaceAuthGroups(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteAllAuthGroupMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.clearFaceAuthGroups(deviceID);
      });

      callback(null, { deviceErrors });
    },
  };
}

function createTNAService(state) {
  return {
    GetConfig(call, callback) {
      try {
        callback(null, { config: state.getTNAConfig(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    SetConfig(call, callback) {
      try {
        state.setTNAConfig(call.request.deviceID, call.request.config || {});
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetConfigMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setTNAConfig(deviceID, call.request.config || {});
      });

      callback(null, { deviceErrors });
    },

    GetTNALog(call, callback) {
      try {
        callback(null, {
          TNAEvents: state.getTNALogs(
            call.request.deviceID,
            call.request.startEventID || 0,
            call.request.maxNumOfLog || 1000,
            call.request.filter || null
          ),
        });
      } catch (error) {
        callback(error);
      }
    },

    GetJobCodeLog(call, callback) {
      try {
        callback(null, {
          jobCodeEvents: state.getJobCodeLogs(
            call.request.deviceID,
            call.request.startEventID || 0,
            call.request.maxNumOfLog || 1000
          ),
        });
      } catch (error) {
        callback(error);
      }
    },
  };
}

function createAccessService(state) {
  return {
    GetList(call, callback) {
      try {
        callback(null, { groups: state.getAccessGroups(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    Add(call, callback) {
      try {
        state.addAccessGroups(call.request.deviceID, call.request.groups || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    AddMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.addAccessGroups(deviceID, call.request.groups || []);
      });

      callback(null, { deviceErrors });
    },

    Delete(call, callback) {
      try {
        state.deleteAccessGroups(call.request.deviceID, call.request.groupIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteAccessGroups(deviceID, call.request.groupIDs || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteAll(call, callback) {
      try {
        state.clearAccessGroups(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteAllMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.clearAccessGroups(deviceID);
      });

      callback(null, { deviceErrors });
    },

    GetLevelList(call, callback) {
      try {
        callback(null, { levels: state.getAccessLevels(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    AddLevel(call, callback) {
      try {
        state.addAccessLevels(call.request.deviceID, call.request.levels || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    AddLevelMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.addAccessLevels(deviceID, call.request.levels || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteLevel(call, callback) {
      try {
        state.deleteAccessLevels(call.request.deviceID, call.request.levelIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteLevelMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteAccessLevels(deviceID, call.request.levelIDs || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteAllLevel(call, callback) {
      try {
        state.clearAccessLevels(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteAllLevelMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.clearAccessLevels(deviceID);
      });

      callback(null, { deviceErrors });
    },

    GetFloorLevelList(call, callback) {
      try {
        callback(null, { levels: state.getFloorLevels(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    AddFloorLevel(call, callback) {
      try {
        state.addFloorLevels(call.request.deviceID, call.request.levels || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    AddFloorLevelMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.addFloorLevels(deviceID, call.request.levels || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteFloorLevel(call, callback) {
      try {
        state.deleteFloorLevels(call.request.deviceID, call.request.levelIDs || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteFloorLevelMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteFloorLevels(deviceID, call.request.levelIDs || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteAllFloorLevel(call, callback) {
      try {
        state.clearFloorLevels(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteAllFloorLevelMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.clearFloorLevels(deviceID);
      });

      callback(null, { deviceErrors });
    },
  };
}

module.exports = {
  createAuthService,
  createFingerService,
  createFaceService,
  createTNAService,
  createAccessService,
};
