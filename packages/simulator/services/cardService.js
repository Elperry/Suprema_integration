const { runMulti } = require('./serviceHelpers');

function createCardService(state) {
  return {
    Scan(call, callback) {
      try {
        const deviceID = call.request.deviceID;
        const card = state.getNextScanCard(deviceID);
        const delay = Number(state.config.cards?.scanDelayMs || 1500);

        state.logActivity(`[Card] Scan started on device ${deviceID}`, { delay });

        setTimeout(() => {
          callback(null, {
            cardData: {
              type: Number(state.config.cards?.defaultType || card.type || 1),
              CSNCardData: card,
              smartCardData: null,
            },
          });
        }, delay);
      } catch (error) {
        callback(error);
      }
    },

    Erase(call, callback) {
      state.logActivity(`[Card] Erase requested on device ${call.request.deviceID}`);
      callback(null, {});
    },

    Write(call, callback) {
      state.logActivity(`[Card] Write requested on device ${call.request.deviceID}`);
      callback(null, {});
    },

    GetConfig(call, callback) {
      try {
        callback(null, { config: state.getCardConfig(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    SetConfig(call, callback) {
      try {
        state.setCardConfig(call.request.deviceID, call.request.config);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetConfigMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setCardConfig(deviceID, call.request.config);
      });

      callback(null, { deviceErrors });
    },

    GetBlacklist(call, callback) {
      try {
        callback(null, { blacklist: state.getBlacklist(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    AddBlacklist(call, callback) {
      try {
        state.addBlacklist(call.request.deviceID, call.request.cardInfos || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    AddBlacklistMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.addBlacklist(deviceID, call.request.cardInfos || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteBlacklist(call, callback) {
      try {
        state.deleteBlacklist(call.request.deviceID, call.request.cardInfos || []);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteBlacklistMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteBlacklist(deviceID, call.request.cardInfos || []);
      });

      callback(null, { deviceErrors });
    },

    DeleteAllBlacklist(call, callback) {
      try {
        state.clearBlacklist(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DeleteAllBlacklistMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.clearBlacklist(deviceID);
      });

      callback(null, { deviceErrors });
    },

    Get1XConfig(call, callback) {
      try {
        callback(null, { config: state.getCard1XConfig(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    Set1XConfig(call, callback) {
      try {
        state.setCard1XConfig(call.request.deviceID, call.request.config || {});
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    Set1XConfigMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setCard1XConfig(deviceID, call.request.config || {});
      });

      callback(null, { deviceErrors });
    },

    WriteQRCode(call, callback) {
      const text = String(call.request.QRText || '');
      const cardData = {
        type: 6,
        size: Buffer.byteLength(text),
        data: Buffer.from(text, 'utf8'),
      };
      callback(null, { cardData });
    },

    GetQRConfig(call, callback) {
      try {
        callback(null, { config: state.getQRConfig(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    SetQRConfig(call, callback) {
      try {
        state.setQRConfig(call.request.deviceID, call.request.config);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetQRConfigMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setQRConfig(deviceID, call.request.config);
      });

      callback(null, { deviceErrors });
    },

    GetCustomConfig(call, callback) {
      try {
        callback(null, { config: state.getCustomConfig(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    SetCustomConfig(call, callback) {
      try {
        state.setCustomConfig(call.request.deviceID, call.request.config);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetCustomConfigMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setCustomConfig(deviceID, call.request.config);
      });

      callback(null, { deviceErrors });
    },

    GetFacilityCodeConfig(call, callback) {
      try {
        callback(null, { config: state.getFacilityCodeConfig(call.request.deviceID) });
      } catch (error) {
        callback(error);
      }
    },

    SetFacilityCodeConfig(call, callback) {
      try {
        state.setFacilityCodeConfig(call.request.deviceID, call.request.config);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetFacilityCodeConfigMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.setFacilityCodeConfig(deviceID, call.request.config);
      });

      callback(null, { deviceErrors });
    },
  };
}

module.exports = createCardService;
