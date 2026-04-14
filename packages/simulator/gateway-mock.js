/**
 * Legacy gateway-mock entry point.
 *
 * This preserves the earlier behavior where the simulator replaced the
 * Suprema device gateway with a gRPC server. The primary index.js entry point
 * now runs a device-side probe/skeleton instead.
 */

const fs = require('fs');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const DeviceState = require('./state');
const createConnectService = require('./services/connectService');
const createDeviceService = require('./services/deviceService');
const createUserService = require('./services/userService');
const createCardService = require('./services/cardService');
const createEventService = require('./services/eventService');
const createDoorService = require('./services/doorService');
const createScheduleService = require('./services/scheduleService');
const createTimeService = require('./services/timeService');
const SimulatorTerminalController = require('./terminalController');
const {
  createAuthService,
  createFingerService,
  createFaceService,
  createTNAService,
  createAccessService,
} = require('./services/otherServices');

const configPath = process.argv[2] || path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const gatewayConfig = config.gatewayMock || config.gateway || {};

const PROTO_DIR = path.resolve(__dirname, '../backend/biostar/proto');

const LOADER_OPTS = {
  keepCase: true,
  longs: Number,
  enums: Number,
  bytes: Buffer,
  defaults: true,
  oneofs: true,
  includeDirs: [PROTO_DIR],
};

function loadProto(fileName, packagePath) {
  const def = protoLoader.loadSync(path.join(PROTO_DIR, fileName), LOADER_OPTS);
  const pkg = grpc.loadPackageDefinition(def);

  let obj = pkg;
  for (const part of packagePath.split('.')) {
    obj = obj[part];
    if (!obj) throw new Error(`Package path ${packagePath} not found in ${fileName}`);
  }
  return obj;
}

const connectPkg = loadProto('connect.proto', 'gsdk.connect');
const devicePkg = loadProto('device.proto', 'gsdk.device');
const userPkg = loadProto('user.proto', 'gsdk.user');
const cardPkg = loadProto('card.proto', 'gsdk.card');
const eventPkg = loadProto('event.proto', 'gsdk.event');
const doorPkg = loadProto('door.proto', 'gsdk.door');
const authPkg = loadProto('auth.proto', 'gsdk.auth');
const fingerPkg = loadProto('finger.proto', 'gsdk.finger');
const facePkg = loadProto('face.proto', 'gsdk.face');
const tnaPkg = loadProto('tna.proto', 'gsdk.tna');
const accessPkg = loadProto('access.proto', 'gsdk.access');
const schedulePkg = loadProto('schedule.proto', 'gsdk.schedule');
const timePkg = loadProto('time.proto', 'gsdk.time');

const state = new DeviceState(config);

const server = new grpc.Server({
  'grpc.max_receive_message_length': 100 * 1024 * 1024,
  'grpc.max_send_message_length': 100 * 1024 * 1024,
});

server.addService(connectPkg.Connect.service, createConnectService(state));
server.addService(devicePkg.Device.service, createDeviceService(state));
server.addService(userPkg.User.service, createUserService(state));
server.addService(cardPkg.Card.service, createCardService(state));
server.addService(eventPkg.Event.service, createEventService(state));
server.addService(doorPkg.Door.service, createDoorService(state));
server.addService(authPkg.Auth.service, createAuthService(state));
server.addService(fingerPkg.Finger.service, createFingerService(state));
server.addService(facePkg.Face.service, createFaceService(state));
server.addService(tnaPkg.TNA.service, createTNAService(state));
server.addService(accessPkg.Access.service, createAccessService(state));
server.addService(schedulePkg.Schedule.service, createScheduleService(state));
server.addService(timePkg.Time.service, createTimeService(state));

function getServerCredentials() {
  if (!gatewayConfig.useTLS) {
    console.log('[GatewayMock] Starting in INSECURE mode (no TLS)');
    return grpc.ServerCredentials.createInsecure();
  }

  const certDir = path.resolve(__dirname, gatewayConfig.certDir || '../../device_gateway/cert');

  try {
    const rootCa = fs.readFileSync(path.join(certDir, 'ca.crt'));
    const serverCert = fs.readFileSync(path.join(certDir, 'server.crt'));
    const serverKey = fs.readFileSync(path.join(certDir, 'server_key.pem'));

    console.log(`[GatewayMock] TLS certs loaded from ${certDir}`);
    return grpc.ServerCredentials.createSsl(rootCa, [
      { cert_chain: serverCert, private_key: serverKey },
    ], false);
  } catch (err) {
    console.warn(`[GatewayMock] TLS cert load failed: ${err.message}`);
    console.warn('[GatewayMock] Falling back to INSECURE mode');
    return grpc.ServerCredentials.createInsecure();
  }
}

let eventTimer = null;
let autoEventsEnabled = !!config.events?.autoGenerate;
let terminal = null;

function startEventGenerator() {
  if (!autoEventsEnabled) return;
  if (eventTimer) return;

  const intervalMs = Number(config.events?.intervalMs || 8000);
  console.log(`[GatewayMock] Auto event generator enabled every ${intervalMs}ms`);

  eventTimer = setInterval(() => {
    const connectedDevices = [];
    for (const [deviceID, status] of state.connectionStatus) {
      if (status === 'connected') connectedDevices.push(deviceID);
    }

    if (connectedDevices.length === 0) return;

    const deviceID = connectedDevices[Math.floor(Math.random() * connectedDevices.length)];
    const eventType = state.getRandomEventDefinition();
    if (!eventType) return;

    const users = state.users.get(deviceID);
    const userIDs = users ? Array.from(users.keys()) : [];
    const userID = userIDs.length > 0
      ? userIDs[Math.floor(Math.random() * userIDs.length)]
      : '';

    state.emitEventByDefinition(deviceID, eventType, userID);
  }, intervalMs);
}

function stopEventGenerator() {
  if (!eventTimer) return;
  clearInterval(eventTimer);
  eventTimer = null;
}

function toggleAutoEventGenerator() {
  autoEventsEnabled = !autoEventsEnabled;
  if (autoEventsEnabled) {
    startEventGenerator();
  } else {
    stopEventGenerator();
  }
  state.logActivity(`[GatewayMock] Auto events ${autoEventsEnabled ? 'enabled' : 'disabled'}`);
}

const host = gatewayConfig.ip || '0.0.0.0';
const port = gatewayConfig.port || 4000;
const address = `${host}:${port}`;

server.bindAsync(address, getServerCredentials(), (err) => {
  if (err) {
    console.error(`[GatewayMock] Failed to bind: ${err.message}`);
    process.exit(1);
  }

  console.log('');
  console.log('+----------------------------------------------------------+');
  console.log('| Suprema Gateway Mock - gRPC Server                       |');
  console.log('+----------------------------------------------------------+');
  console.log(`| Address: ${address.padEnd(48)}|`);
  console.log(`| TLS: ${(gatewayConfig.useTLS ? 'Enabled' : 'Disabled').padEnd(52)}|`);
  console.log(`| Devices: ${String(config.devices.length).padEnd(48)}|`);
  console.log('+----------------------------------------------------------+');
  console.log('[GatewayMock] This entrypoint replaces the real gateway for backend-only tests.');

  startEventGenerator();
  terminal = new SimulatorTerminalController(state, {
    getAutoEventsEnabled: () => autoEventsEnabled,
    toggleAutoEvents: toggleAutoEventGenerator,
    onExit: shutdown,
  });
  terminal.start();
});

function shutdown() {
  stopEventGenerator();
  terminal?.stop();
  server.tryShutdown(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
