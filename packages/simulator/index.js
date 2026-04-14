/**
 * Device-side BioStar simulator skeleton.
 *
 * This entry point opens TCP and UDP sockets on the configured device ports so
 * the real Suprema gateway can be probed against a simulated device endpoint.
 * It does not implement the proprietary BioStar wire protocol yet; it only
 * accepts connections, logs traffic, and tracks basic device connection state.
 */

const fs = require('fs');
const os = require('os');
const net = require('net');
const tls = require('tls');
const dgram = require('dgram');
const path = require('path');

const DeviceState = require('./state');
const SimulatorTerminalController = require('./terminalController');
const { createVirtualNetworkManager } = require('./virtualNetwork');

const configPath = process.argv[2] || path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const state = new DeviceState(config);

const simulatorConfig = config.deviceServer || {};
const defaultBindIP = simulatorConfig.defaultBindIP || '0.0.0.0';
const preferAdvertisedLocalIPs = simulatorConfig.preferAdvertisedLocalIPs !== false;
const virtualNetwork = createVirtualNetworkManager(simulatorConfig);
const enableTCPProbe = simulatorConfig.enableTCPProbe !== false;
const enableUDPProbe = simulatorConfig.enableUDPProbe !== false;
const hexDumpBytes = simulatorConfig.hexDumpBytes || 64;
const connectionTimeoutMs = simulatorConfig.connectionTimeoutMs || 30000;
const minimalHandshakeConfig = simulatorConfig.minimalHandshake || {};
const enableMinimalHandshake = minimalHandshakeConfig.enabled !== false;
const syncPacketMagic = Buffer.from(minimalHandshakeConfig.syncPacketMagicHex || '7b7b3c3c', 'hex');
const syncPacketLength = minimalHandshakeConfig.syncPacketLength || 104;
const certDir = path.resolve(
  __dirname,
  simulatorConfig.certDir
    || (config.gatewayMock && config.gatewayMock.certDir)
    || (config.gateway && config.gateway.certDir)
    || '../../device_gateway/cert'
);

const devices = (config.devices || []).map((device) => ({
  ...device,
  bindIPSource: device.bindIP ? 'explicit' : 'default',
  bindIP: device.bindIP || defaultBindIP,
}));

const tcpServers = [];
const udpSockets = [];
const deviceConnectionCount = new Map();
let eventTimer = null;
let shuttingDown = false;
let pendingBinds = 0;
let failedBinds = 0;
let terminal = null;
let autoEventsEnabled = !!config.events?.autoGenerate;

function normalizeIP(ip) {
  if (!ip) return '';
  return ip.replace(/^::ffff:/, '');
}

function collectLocalIPv4Addresses() {
  const addresses = new Set(['127.0.0.1']);
  const interfaces = os.networkInterfaces();

  for (const entries of Object.values(interfaces)) {
    for (const entry of entries || []) {
      if (entry && entry.family === 'IPv4') {
        addresses.add(entry.address);
      }
    }
  }

  return addresses;
}

let localIPv4Addresses = collectLocalIPv4Addresses();

function refreshLocalIPv4Addresses() {
  localIPv4Addresses = collectLocalIPv4Addresses();
  return localIPv4Addresses;
}

function isWildcardAddress(ip) {
  return ip === '0.0.0.0' || ip === '::' || ip === '';
}

function isBindableAddress(ip) {
  return isWildcardAddress(ip) || localIPv4Addresses.has(ip);
}

function applyBindStrategy() {
  for (const device of devices) {
    if (device.bindIPSource === 'explicit') continue;

    if (virtualNetwork.isEnabled() && virtualNetwork.isActive() && virtualNetwork.shouldBindAdvertisedIP()) {
      device.bindIP = device.ip;
      device.bindIPSource = 'advertised-virtual';
      continue;
    }

    if (preferAdvertisedLocalIPs && localIPv4Addresses.has(device.ip)) {
      device.bindIP = device.ip;
      device.bindIPSource = 'advertised-local';
      continue;
    }

    device.bindIP = defaultBindIP;
    device.bindIPSource = 'default';
  }
}

function formatHex(buffer) {
  const slice = buffer.subarray(0, hexDumpBytes);
  const hex = slice.toString('hex').match(/.{1,2}/g);
  const body = hex ? hex.join(' ') : '';
  return buffer.length > hexDumpBytes ? `${body} ...` : body;
}

function summarizeDevices(endpointDevices) {
  return endpointDevices.map((device) => `${device.deviceID}@${device.ip}:${device.port}`).join(', ');
}

function startsWithSyncPacketMagic(buffer) {
  return buffer.length >= syncPacketMagic.length && buffer.subarray(0, syncPacketMagic.length).equals(syncPacketMagic);
}

function maybeReplyToInitialSync(socket, protocolLabel, local, remote, handshakeState) {
  if (!enableMinimalHandshake || handshakeState.replied || handshakeState.disabled) {
    return false;
  }

  if (handshakeState.buffer.length < syncPacketLength) {
    return false;
  }

  const candidate = handshakeState.buffer.subarray(0, syncPacketLength);
  if (!startsWithSyncPacketMagic(candidate)) {
    handshakeState.disabled = true;
    return false;
  }

  socket.write(candidate);
  handshakeState.replied = true;
  console.log(`[${protocolLabel}] Replied to initial sync packet local=${local} remote=${remote} bytes=${candidate.length}`);
  return true;
}

function noteDeviceConnected(device) {
  if (!device) return;

  const current = deviceConnectionCount.get(device.deviceID) || 0;
  deviceConnectionCount.set(device.deviceID, current + 1);
  if (current === 0) {
    state.connectDevice(device.deviceID);
  }
}

function noteDeviceDisconnected(device) {
  if (!device) return;

  const current = deviceConnectionCount.get(device.deviceID) || 0;
  if (current <= 1) {
    deviceConnectionCount.delete(device.deviceID);
    state.disconnectDevice(device.deviceID);
    return;
  }

  deviceConnectionCount.set(device.deviceID, current - 1);
}

function resolveDeviceForSocket(endpointDevices, socket) {
  const localAddress = normalizeIP(socket.localAddress);
  const localPort = socket.localPort;

  const directMatch = endpointDevices.find((device) => device.ip === localAddress && device.port === localPort);
  if (directMatch) return directMatch;

  const bindMatch = endpointDevices.find((device) => normalizeIP(device.bindIP) === localAddress && device.port === localPort);
  if (bindMatch) return bindMatch;

  if (endpointDevices.length === 1) return endpointDevices[0];
  return null;
}

function startEventGenerator() {
  if (!autoEventsEnabled) return;
  if (eventTimer) return;

  const eventsConfig = config.events;
  const intervalMs = eventsConfig.intervalMs || 8000;
  console.log(`[Simulator] Auto event generator enabled: ${intervalMs}ms interval.`);

  eventTimer = setInterval(() => {
    const connectedDeviceIDs = [];
    for (const [deviceID, status] of state.connectionStatus) {
      if (status === 'connected') connectedDeviceIDs.push(deviceID);
    }

    if (connectedDeviceIDs.length === 0) return;

    const deviceID = connectedDeviceIDs[Math.floor(Math.random() * connectedDeviceIDs.length)];
    const eventType = state.getRandomEventDefinition();
    if (!eventType) return;
    const users = state.users.get(deviceID);
    let userID = '';

    if (users && users.size > 0) {
      const userIDs = Array.from(users.keys());
      userID = userIDs[Math.floor(Math.random() * userIDs.length)];
    }

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
  state.logActivity(`[Simulator] Auto events ${autoEventsEnabled ? 'enabled' : 'disabled'}`);
}

function getTlsOptions() {
  try {
    return {
      cert: fs.readFileSync(path.join(certDir, 'server.crt')),
      key: fs.readFileSync(path.join(certDir, 'server_key.pem')),
      ca: fs.readFileSync(path.join(certDir, 'ca.crt')),
      requestCert: false,
      rejectUnauthorized: false,
    };
  } catch (error) {
    console.warn(`[TLS] Could not load certificates from ${certDir}: ${error.message}`);
    return null;
  }
}

function groupEndpoints(protocolFilter) {
  const endpoints = new Map();

  for (const device of devices) {
    if (protocolFilter === 'tls' && !device.useSSL) continue;
    if (protocolFilter === 'tcp' && device.useSSL) continue;

    const key = `${device.bindIP}:${device.port}`;
    if (!endpoints.has(key)) {
      endpoints.set(key, {
        host: device.bindIP,
        port: device.port,
        devices: [],
      });
    }
    endpoints.get(key).devices.push(device);
  }

  return Array.from(endpoints.values());
}

function createConnectionHandler(endpointDevices, protocolLabel) {
  return (socket) => {
    const device = resolveDeviceForSocket(endpointDevices, socket);
    const local = `${normalizeIP(socket.localAddress)}:${socket.localPort}`;
    const remote = `${normalizeIP(socket.remoteAddress)}:${socket.remotePort}`;
    const handshakeState = {
      replied: false,
      disabled: false,
      buffer: Buffer.alloc(0),
    };

    noteDeviceConnected(device);
    console.log(`[${protocolLabel}] Connection accepted local=${local} remote=${remote}${device ? ` device=${device.deviceID}` : ' device=unknown'}`);

    socket.setTimeout(connectionTimeoutMs);
    if (typeof socket.setKeepAlive === 'function') socket.setKeepAlive(true, 30000);
    if (typeof socket.setNoDelay === 'function') socket.setNoDelay(true);

    socket.on('data', (chunk) => {
      console.log(`[${protocolLabel}] ${remote} -> ${local} ${chunk.length} bytes :: ${formatHex(chunk)}`);
      if (!handshakeState.replied && !handshakeState.disabled) {
        handshakeState.buffer = Buffer.concat([handshakeState.buffer, chunk]);
        maybeReplyToInitialSync(socket, protocolLabel, local, remote, handshakeState);
        if (handshakeState.buffer.length > syncPacketLength) {
          handshakeState.buffer = handshakeState.buffer.subarray(0, syncPacketLength);
        }
      }
    });

    socket.on('timeout', () => {
      console.log(`[${protocolLabel}] Connection timeout local=${local} remote=${remote}`);
      socket.destroy();
    });

    socket.on('error', (error) => {
      console.warn(`[${protocolLabel}] Socket error local=${local} remote=${remote}: ${error.message}`);
    });

    socket.on('close', () => {
      noteDeviceDisconnected(device);
      console.log(`[${protocolLabel}] Connection closed local=${local} remote=${remote}${device ? ` device=${device.deviceID}` : ''}`);
    });
  };
}

function startTcpEndpoint(endpoint, useTLS, tlsOptions) {
  if (!isBindableAddress(endpoint.host)) {
    console.warn(`[${useTLS ? 'TLS' : 'TCP'}] ${endpoint.host}:${endpoint.port} is not a local IP. Add it as an alias on this machine or override device.bindIP.`);
  }

  if (useTLS && !tlsOptions) {
    console.warn(`[TLS] Skipping ${endpoint.host}:${endpoint.port} because TLS certificates are unavailable.`);
    return;
  }

  const server = useTLS
    ? tls.createServer(tlsOptions, createConnectionHandler(endpoint.devices, 'TLS'))
    : net.createServer(createConnectionHandler(endpoint.devices, 'TCP'));

  server.on('error', (error) => {
    console.error(`[${useTLS ? 'TLS' : 'TCP'}] Failed on ${endpoint.host}:${endpoint.port}: ${error.message}`);
    failedBinds++;
    checkAllBindsFailed();
  });

  pendingBinds++;
  server.listen({ host: endpoint.host, port: endpoint.port }, () => {
    console.log(`[${useTLS ? 'TLS' : 'TCP'}] Listening on ${endpoint.host}:${endpoint.port} for ${summarizeDevices(endpoint.devices)}`);
    if (isWildcardAddress(endpoint.host) && endpoint.devices.length > 1) {
      console.log(`[${useTLS ? 'TLS' : 'TCP'}] Wildcard bind is shared by multiple virtual devices. The gateway still needs the advertised device IPs routed to this host.`);
    }
  });

  tcpServers.push(server);
}

function startUdpEndpoint(endpoint) {
  if (!isBindableAddress(endpoint.host)) {
    console.warn(`[UDP] ${endpoint.host}:${endpoint.port} is not a local IP. Add it as an alias on this machine or override device.bindIP.`);
  }

  const socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });

  socket.on('error', (error) => {
    console.error(`[UDP] Failed on ${endpoint.host}:${endpoint.port}: ${error.message}`);
    failedBinds++;
    checkAllBindsFailed();
  });

  pendingBinds++;
  socket.on('listening', () => {
    console.log(`[UDP] Listening on ${endpoint.host}:${endpoint.port} for ${summarizeDevices(endpoint.devices)}`);
    if (isWildcardAddress(endpoint.host) && endpoint.devices.length > 1) {
      console.log('[UDP] Wildcard UDP bind cannot tell which advertised device IP was targeted. Use per-device bindIP values when you add local IP aliases.');
    }
  });

  socket.on('message', (message, remote) => {
    console.log(`[UDP] ${remote.address}:${remote.port} -> ${endpoint.host}:${endpoint.port} ${message.length} bytes :: ${formatHex(message)}`);
  });

  socket.bind(endpoint.port, endpoint.host);
  udpSockets.push(socket);
}

function printBanner() {
  console.log('');
  console.log('+----------------------------------------------------------+');
  console.log('| Suprema Device Simulator - device-side skeleton          |');
  console.log('+----------------------------------------------------------+');
  console.log(`| Devices configured: ${String(devices.length).padEnd(36)}|`);
  console.log(`| TCP probe: ${String(enableTCPProbe).padEnd(43)}|`);
  console.log(`| UDP probe: ${String(enableUDPProbe).padEnd(43)}|`);
  console.log(`| Minimal handshake: ${String(enableMinimalHandshake).padEnd(36)}|`);
  console.log(`| Virtual network: ${virtualNetwork.describe().padEnd(35)}|`);
  console.log('+----------------------------------------------------------+');
  console.log(`[Simulator] Local IPv4 addresses: ${Array.from(localIPv4Addresses).join(', ')}`);
  console.log('[Simulator] This mode does not implement the proprietary Suprema device protocol yet.');
  console.log('[Simulator] It opens device-side sockets, logs traffic, and tracks basic connection state.');

  const missingAdvertisedIPs = devices
    .filter((device) => !localIPv4Addresses.has(device.ip))
    .map((device) => device.ip);

  const autoBoundDeviceIPs = devices
    .filter((device) => device.bindIPSource === 'advertised-local' || device.bindIPSource === 'advertised-virtual')
    .map((device) => `${device.deviceID}@${device.bindIP}`);

  if (autoBoundDeviceIPs.length > 0) {
    console.log(`[Simulator] Binding directly to local device IPs: ${autoBoundDeviceIPs.join(', ')}`);
  }

  if (missingAdvertisedIPs.length > 0) {
    const uniqueIPs = Array.from(new Set(missingAdvertisedIPs));
    console.log(`[Simulator] Advertised device IPs not present on this host: ${uniqueIPs.join(', ')}`);
    console.log('[Simulator] Add those IPs as local aliases if you want the real gateway to reach them directly.');
  }
}

async function shutdown(signal, exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`\n[Simulator] Shutting down (${signal})...`);
  stopEventGenerator();
  terminal?.stop();

  await Promise.all(tcpServers.map((server) => new Promise((resolve) => server.close(() => resolve()))));
  await Promise.all(udpSockets.map((socket) => new Promise((resolve) => socket.close(() => resolve()))));
  virtualNetwork.cleanup();

  console.log('[Simulator] Device-side sockets stopped.');
  process.exit(exitCode);
}

function checkAllBindsFailed() {
  if (failedBinds >= pendingBinds) {
    console.error('[Simulator] All port binds failed. Is a previous instance still running?');
    console.error('[Simulator] Kill stale processes with: npx kill-port 51211  or  taskkill /F /IM node.exe (careful)');
    shutdown('bind-failure', 1);
  }
}

function start() {
  if (devices.length === 0) {
    console.error('[Simulator] No devices configured in config.json');
    process.exit(1);
  }

  virtualNetwork.setup(devices);
  refreshLocalIPv4Addresses();
  applyBindStrategy();
  printBanner();

  const tlsOptions = getTlsOptions();

  if (enableTCPProbe) {
    for (const endpoint of groupEndpoints('tcp')) {
      startTcpEndpoint(endpoint, false, null);
    }

    for (const endpoint of groupEndpoints('tls')) {
      startTcpEndpoint(endpoint, true, tlsOptions);
    }
  }

  if (enableUDPProbe) {
    const udpEndpoints = new Map();
    for (const device of devices) {
      const key = `${device.bindIP}:${device.port}`;
      if (!udpEndpoints.has(key)) {
        udpEndpoints.set(key, {
          host: device.bindIP,
          port: device.port,
          devices: [],
        });
      }
      udpEndpoints.get(key).devices.push(device);
    }

    for (const endpoint of udpEndpoints.values()) {
      startUdpEndpoint(endpoint);
    }
  }

  startEventGenerator();
  terminal = new SimulatorTerminalController(state, {
    getAutoEventsEnabled: () => autoEventsEnabled,
    toggleAutoEvents: toggleAutoEventGenerator,
    onExit: () => shutdown('terminal'),
  });
  terminal.start();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('uncaughtException', (error) => {
  console.error(`[Simulator] Uncaught exception: ${error.stack || error.message}`);
  shutdown('uncaughtException', 1);
});
process.on('unhandledRejection', (error) => {
  const message = error && error.stack ? error.stack : String(error);
  console.error(`[Simulator] Unhandled rejection: ${message}`);
  shutdown('unhandledRejection', 1);
});

start();
