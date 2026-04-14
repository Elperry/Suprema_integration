const { runMulti } = require('./serviceHelpers');

function createDeviceService(state) {
  function buildCapability(device) {
    const capability = device.capabilities || {};
    return {
      maxUsers: capability.maxUsers || 0,
      maxEventLogs: capability.maxEventLogs || 0,
      maxImageLogs: capability.maxImageLogs || 0,
      maxBlacklists: capability.maxBlacklists || 0,
      maxOperators: capability.maxOperators || 0,
      maxCards: capability.maxCards || 0,
      maxFaces: capability.maxFaces || 0,
      maxFingerprints: capability.maxFingerprints || 0,
      maxUserNames: capability.maxUsers || 0,
      maxUserImages: capability.maxUsers || 0,
      maxUserJobs: capability.maxUsers || 0,
      maxUserPhrases: capability.maxUsers || 0,
      maxCardsPerUser: capability.maxCardsPerUser || 0,
      maxFacesPerUser: capability.maxFacesPerUser || 0,
      maxFingerprintsPerUser: capability.maxFingerprintsPerUser || 0,
      maxInputPorts: capability.maxInputPorts || 0,
      maxOutputPorts: capability.maxOutputPorts || 0,
      maxRelays: capability.maxRelays || 0,
      maxRS485Channels: capability.maxRS485Channels || 0,
      cameraSupported: !!capability.cameraSupported,
      tamperSupported: !!capability.tamperSupported,
      wlanSupported: !!capability.wlanSupported,
      displaySupported: !!capability.displaySupported,
      thermalSupported: !!capability.thermalSupported,
      maskSupported: !!capability.thermalSupported,
      faceExSupported: !!capability.faceSupported,
      voipExSupported: false,
      EMCardSupported: true,
      HIDProxCardSupported: false,
      MifareFelicaCardSupported: true,
      iClassCardSupported: true,
      ClassicPlusCardSupported: true,
      DesFireEV1CardSupported: true,
      SRSECardSupported: false,
      SEOSCardSupported: false,
      NFCSupported: true,
      BLESupported: false,
      CustomClassicPlusSupported: false,
      CustomDesFireEV1Supported: false,
      TOM_NFCSupported: false,
      TOM_BLESupported: false,
      CustomFelicaSupported: false,
      useCardOperation: !!capability.cardSupported,
      extendedAuthSupported: device.type === 13 || device.type === 25,
      cardInputSupported: !!capability.cardSupported,
      fingerprintInputSupported: !!capability.fingerSupported,
      faceInputSupported: !!capability.faceSupported,
      idInputSupported: true,
      PINInputSupported: true,
      biometricOnlySupported: !!(capability.fingerSupported || capability.faceSupported),
      biometricPINSupported: !!(capability.fingerSupported || capability.faceSupported),
      cardOnlySupported: !!capability.cardSupported,
      cardBiometricSupported: !!capability.cardSupported,
      cardPINSupported: !!capability.cardSupported,
      cardBiometricOrPINSupported: !!capability.cardSupported,
      cardBiometricPINSupported: !!capability.cardSupported,
      idBiometricSupported: true,
      idPINSupported: true,
      idBiometricOrPINSupported: true,
      idBiometricPINSupported: true,
      extendedFaceOnlySupported: !!capability.faceSupported,
      extendedFaceFingerprintSupported: !!(capability.faceSupported && capability.fingerSupported),
      extendedFacePINSupported: !!capability.faceSupported,
      extendedFaceFingerprintOrPINSupported: !!(capability.faceSupported && capability.fingerSupported),
      extendedFaceFingerprintPINSupported: !!(capability.faceSupported && capability.fingerSupported),
      extendedFingerprintOnlySupported: !!capability.fingerSupported,
      extendedFingerprintFaceSupported: !!(capability.faceSupported && capability.fingerSupported),
      extendedFingerprintPINSupported: !!capability.fingerSupported,
      extendedFingerprintFaceOrPINSupported: !!(capability.faceSupported && capability.fingerSupported),
      extendedFingerprintFacePINSupported: !!(capability.faceSupported && capability.fingerSupported),
      extendedCardOnlySupported: !!capability.cardSupported,
      extendedCardFaceSupported: !!(capability.cardSupported && capability.faceSupported),
      extendedCardFingerprintSupported: !!(capability.cardSupported && capability.fingerSupported),
      extendedCardPINSupported: !!capability.cardSupported,
      extendedCardFaceOrFingerprintSupported: !!(capability.cardSupported && (capability.faceSupported || capability.fingerSupported)),
      extendedCardFaceOrPINSupported: !!capability.cardSupported,
      extendedCardFingerprintOrPINSupported: !!capability.cardSupported,
      extendedCardFaceOrFingerprintOrPINSupported: !!capability.cardSupported,
      extendedCardFaceFingerprintSupported: !!(capability.cardSupported && capability.faceSupported && capability.fingerSupported),
      extendedCardFacePINSupported: !!capability.cardSupported,
      extendedCardFingerprintFaceSupported: !!(capability.cardSupported && capability.faceSupported && capability.fingerSupported),
      extendedCardFingerprintPINSupported: !!capability.cardSupported,
      extendedCardFaceOrFingerprintPINSupported: !!capability.cardSupported,
      extendedCardFaceFingerprintOrPINSupported: !!capability.cardSupported,
      extendedCardFingerprintFaceOrPINSupported: !!capability.cardSupported,
      extendedIdFaceSupported: true,
      extendedIdFingerprintSupported: true,
      extendedIdPINSupported: true,
      extendedIdFaceOrFingerprintSupported: true,
      extendedIdFaceOrPINSupported: true,
      extendedIdFingerprintOrPINSupported: true,
      extendedIdFaceOrFingerprintOrPINSupported: true,
      extendedIdFaceFingerprintSupported: true,
      extendedIdFacePINSupported: true,
      extendedIdFingerprintFaceSupported: true,
      extendedIdFingerprintPINSupported: true,
      extendedIdFaceOrFingerprintPINSupported: true,
      extendedIdFaceFingerprintOrPINSupported: true,
      extendedIdFingerprintFaceOrPINSupported: true,
      intelligentPDSupported: false,
      updateUserSupported: true,
      simulatedUnlockSupported: true,
      smartCardByteOrderSupported: false,
      qrAsCSNSupported: !!capability.qrSupported,
      rtspSupported: false,
      lfdSupported: false,
      visualQRSupported: !!capability.qrSupported,
      maxVoipExtensionNumbers: 0,
      osdpStandardCentralSupported: false,
      enableLicenseFuncSupported: false,
      keypadBacklightSupported: false,
      uzWirelessLockDoorSupported: false,
      customSmartCardSupported: false,
      tomSupported: false,
      tomEnrollSupported: false,
      showOsdpResultbyLED: false,
      customSmartCardFelicaSupported: false,
      ignoreInputAfterWiegandOut: false,
      setSlaveBaudrateSupported: false,
      changeRtspResolutionSupported: false,
      changeVoipResolutionSupported: false,
      changeVoipTransportSupported: false,
      showOptionUserInfoSupported: false,
      changeScrambleKeypadSupported: false,
      visualFaceTemplateVersion: 0,
      authOnlyUnMaskSupported: false,
      mifareExSupported: false,
      lockOverrideSupported: true,
      doorModeOverrideSupported: true,
      alternateAccessTimerSupported: false,
      realtimeIOStatusReportSupported: false,
      dynamicSlaveDeviceSupported: false,
      secureTamperSupported: false,
      customSmartcardSlaveSupported: false,
      serverPrivateMsgSupported: false,
      facilityCodeSupported: false,
    };
  }

  return {
    GetInfo(call, callback) {
      try {
        const device = state.getDevice(call.request.deviceID);
        callback(null, {
          info: {
            MACAddr: device.macAddr || '00:00:00:00:00:00',
            modelName: device.model || 'Unknown',
            firmwareVersion: device.firmware || '0.0.0',
            kernelVersion: device.kernelVersion || '0.0.0',
            BSCoreVersion: device.bscoreVersion || '0.0.0',
            boardVersion: device.boardVersion || '0.0.0',
          },
        });
      } catch (error) {
        callback(error);
      }
    },

    GetCapability(call, callback) {
      try {
        callback(null, { deviceCapability: buildCapability(state.getDevice(call.request.deviceID)) });
      } catch (error) {
        callback(error);
      }
    },

    GetCapabilityInfo(call, callback) {
      try {
        const device = state.getDevice(call.request.deviceID);
        const capability = device.capabilities || {};
        callback(null, {
          capInfo: {
            type: device.type || 0,
            maxNumOfUser: capability.maxUsers || 0,
            PINSupported: true,
            cardSupported: !!capability.cardSupported,
            card1xSupported: false,
            SEOSSupported: false,
            fingerSupported: !!capability.fingerSupported,
            faceSupported: !!capability.faceSupported,
            userNameSupported: true,
            userPhotoSupported: true,
            userPhraseSupported: false,
            alphanumericIDSupported: true,
            WLANSupported: !!capability.wlanSupported,
            imageLogSupported: !!capability.cameraSupported,
            VOIPSupported: false,
            TNASupported: true,
            jobCodeSupported: true,
            wiegandSupported: !!capability.cardSupported,
            wiegandMultiSupported: false,
            triggerActionSupported: false,
            DSTSupported: true,
            DNSSupported: false,
            OSDPKeySupported: false,
            RS485ExtSupported: false,
            QRSupported: !!capability.qrSupported,
            dynamicSlaveDeviceSupported: false,
          },
        });
      } catch (error) {
        callback(error);
      }
    },

    DeleteRootCA(call, callback) { callback(null, {}); },
    Lock(call, callback) { callback(null, {}); },
    Unlock(call, callback) { callback(null, {}); },

    LockMulti(call, callback) {
      callback(null, { deviceErrors: runMulti(call.request.deviceIDs, () => {}) });
    },

    UnlockMulti(call, callback) {
      callback(null, { deviceErrors: runMulti(call.request.deviceIDs, () => {}) });
    },

    Reboot(call, callback) {
      try {
        state.emitEventByCode(call.request.deviceID, 16385, 0, '', { silent: true });
        state.emitEventByCode(call.request.deviceID, 16384, 0, '', { silent: true });
        state.logActivity(`[Device] Rebooted device ${call.request.deviceID}`);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    RebootMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.emitEventByCode(deviceID, 16385, 0, '', { silent: true });
        state.emitEventByCode(deviceID, 16384, 0, '', { silent: true });
      });

      callback(null, { deviceErrors });
    },

    FactoryReset(call, callback) {
      try {
        state.deleteAllUsers(call.request.deviceID);
        state.clearEventLog(call.request.deviceID);
        state.clearBlacklist(call.request.deviceID);
        state.clearAccessGroups(call.request.deviceID);
        state.clearAccessLevels(call.request.deviceID);
        state.clearSchedules(call.request.deviceID);
        state.emitEventByCode(call.request.deviceID, 16642, 0, '', { silent: true });
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    FactoryResetMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteAllUsers(deviceID);
        state.clearEventLog(deviceID);
        state.clearBlacklist(deviceID);
        state.clearAccessGroups(deviceID);
        state.clearAccessLevels(deviceID);
        state.clearSchedules(deviceID);
        state.emitEventByCode(deviceID, 16642, 0, '', { silent: true });
      });

      callback(null, { deviceErrors });
    },

    ClearDB(call, callback) {
      try {
        state.deleteAllUsers(call.request.deviceID);
        state.clearEventLog(call.request.deviceID);
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    ClearDBMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        state.deleteAllUsers(deviceID);
        state.clearEventLog(deviceID);
      });

      callback(null, { deviceErrors });
    },

    ResetConfig(call, callback) { callback(null, {}); },
    ResetConfigMulti(call, callback) { callback(null, { deviceErrors: runMulti(call.request.deviceIDs, () => {}) }); },
    UpgradeFirmware(call, callback) { callback(null, {}); },
    UpgradeFirmwareMulti(call, callback) { callback(null, { deviceErrors: runMulti(call.request.deviceIDs, () => {}) }); },

    GetHashKey(call, callback) {
      callback(null, { isDefault: true, checksum: 0 });
    },

    SetHashKey(call, callback) {
      callback(null, {});
    },
  };
}

module.exports = createDeviceService;
