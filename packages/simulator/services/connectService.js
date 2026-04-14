const { runMulti } = require('./serviceHelpers');

function createConnectService(state) {
  return {
    Connect(call, callback) {
      try {
        const info = call.request.connectInfo || {};
        const deviceID = state.connectByIP(info.IPAddr, info.port, info.useSSL);
        if (!deviceID) {
          return callback({ code: 5, message: `No simulated device at ${info.IPAddr}:${info.port}` });
        }

        callback(null, { deviceID });
      } catch (error) {
        callback(error);
      }
    },

    GetDeviceList(call, callback) {
      const deviceInfos = state.getDeviceList().map((device) => ({
        deviceID: device.deviceID,
        type: device.type,
        connectionMode: device.connectionMode || 0,
        IPAddr: device.ip,
        port: device.port,
        status: device.status === 'connected' ? (device.useSSL ? 2 : 1) : 0,
        autoReconnect: false,
        useSSL: !!device.useSSL,
      }));

      callback(null, { deviceInfos });
    },

    SearchDevice(call, callback) {
      const deviceInfos = state.getDeviceList().map((device) => ({
        deviceID: device.deviceID,
        type: device.type,
        useDHCP: device.useDHCP !== false,
        connectionMode: device.connectionMode || 0,
        IPAddr: device.ip,
        port: device.port,
        useSSL: !!device.useSSL,
        serverAddr: '',
      }));

      callback(null, { deviceInfos });
    },

    Disconnect(call, callback) {
      for (const deviceID of call.request.deviceIDs || []) {
        state.disconnectDevice(deviceID);
      }
      callback(null, {});
    },

    DisconnectAll(call, callback) {
      state.disconnectAll();
      callback(null, {});
    },

    AddAsyncConnection(call, callback) {
      for (const info of call.request.connectInfos || []) {
        if (state.devices.has(Number(info.deviceID))) {
          state.connectDevice(info.deviceID);
        }
      }
      callback(null, {});
    },

    DeleteAsyncConnection(call, callback) {
      for (const deviceID of call.request.deviceIDs || []) {
        state.disconnectDevice(deviceID);
      }
      callback(null, {});
    },

    SetAcceptFilter(call, callback) {
      state.setAcceptFilter(call.request.filter || {});
      callback(null, {});
    },

    GetAcceptFilter(call, callback) {
      callback(null, { filter: state.getAcceptFilter() });
    },

    GetPendingList(call, callback) {
      callback(null, { deviceInfos: [] });
    },

    GetSlaveDevice(call, callback) {
      callback(null, { slaveDeviceInfos: [] });
    },

    SetSlaveDevice(call, callback) {
      callback(null, {});
    },

    SetConnectionMode(call, callback) {
      try {
        const device = state.getDevice(call.request.deviceID);
        state.devices.set(device.deviceID, {
          ...device,
          connectionMode: call.request.connectionMode || 0,
        });
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    SetConnectionModeMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        const device = state.getDevice(deviceID);
        state.devices.set(deviceID, {
          ...device,
          connectionMode: call.request.connectionMode || 0,
        });
      });

      callback(null, { deviceErrors });
    },

    EnableSSL(call, callback) {
      try {
        const device = state.getDevice(call.request.deviceID);
        state.devices.set(device.deviceID, { ...device, useSSL: true });
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    EnableSSLMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        const device = state.getDevice(deviceID);
        state.devices.set(deviceID, { ...device, useSSL: true });
      });

      callback(null, { deviceErrors });
    },

    DisableSSL(call, callback) {
      try {
        const device = state.getDevice(call.request.deviceID);
        state.devices.set(device.deviceID, { ...device, useSSL: false });
        callback(null, {});
      } catch (error) {
        callback(error);
      }
    },

    DisableSSLMulti(call, callback) {
      const deviceErrors = runMulti(call.request.deviceIDs, (deviceID) => {
        const device = state.getDevice(deviceID);
        state.devices.set(deviceID, { ...device, useSSL: false });
      });

      callback(null, { deviceErrors });
    },

    SubscribeStatus(call) {
      state.addStatusSubscriber(call);
    },
  };
}

module.exports = createConnectService;
