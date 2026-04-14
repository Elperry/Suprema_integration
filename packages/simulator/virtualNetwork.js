const { spawnSync } = require('child_process');
const net = require('net');
const os = require('os');

const DEFAULT_INTERFACE_NAME = 'Loopback Pseudo-Interface 1';

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

function createVirtualNetworkManager(simulatorConfig) {
  const virtualNetworkConfig = simulatorConfig.virtualNetwork || {};

  if (!virtualNetworkConfig.enabled) {
    return new NoopVirtualNetworkManager();
  }

  const provider = virtualNetworkConfig.provider || 'windows-loopback-aliases';
  if (provider !== 'windows-loopback-aliases') {
    throw new Error(`[VirtualNetwork] Unsupported provider "${provider}".`);
  }

  return new WindowsLoopbackAliasManager(virtualNetworkConfig);
}

class NoopVirtualNetworkManager {
  isEnabled() {
    return false;
  }

  isActive() {
    return false;
  }

  shouldBindAdvertisedIP() {
    return false;
  }

  describe() {
    return 'disabled';
  }

  setup() {}

  cleanup() {}

  getSummary() {
    return {
      enabled: false,
      createdAddresses: [],
      reusedAddresses: [],
      interfaceName: null,
    };
  }
}

class WindowsLoopbackAliasManager {
  constructor(config) {
    this.config = {
      interfaceName: DEFAULT_INTERFACE_NAME,
      mask: '255.255.255.255',
      allowUnsafeMask: false,
      skipAsSource: true,
      bindAdvertisedIP: true,
      strict: true,
      ...config,
    };
    this.createdAddresses = new Set();
    this.reusedAddresses = new Set();
    this.interfaceName = String(this.config.interfaceName || DEFAULT_INTERFACE_NAME);
    this.status = 'pending';
  }

  isEnabled() {
    return true;
  }

  isActive() {
    return this.status === 'active';
  }

  shouldBindAdvertisedIP() {
    return this.config.bindAdvertisedIP !== false;
  }

  describe() {
    if (this.status === 'active') {
      return `active on ${this.interfaceName}`;
    }

    if (this.status === 'fallback') {
      return 'requested, fallback mode';
    }

    return `planned on ${this.interfaceName}`;
  }

  setup(devices) {
    this.createdAddresses.clear();
    this.reusedAddresses.clear();

    try {
      this.ensureSupported();
      this.ensureSafeMask();
      this.ensureElevated();
      this.ensureInterfaceExists();

      const bindAddresses = this.collectBindableAddresses(devices);
      if (bindAddresses.length === 0) {
        console.log('[VirtualNetwork] No concrete bind IPs were requested. Skipping alias creation.');
        this.status = 'active';
        return true;
      }

      const localAddresses = collectLocalIPv4Addresses();
      for (const address of bindAddresses) {
        if (localAddresses.has(address)) {
          this.reusedAddresses.add(address);
          continue;
        }

        this.runNetsh([
          'interface',
          'ipv4',
          'add',
          'address',
          `name=${this.interfaceName}`,
          `address=${address}`,
          `mask=${this.config.mask}`,
          'store=active',
          `skipassource=${this.config.skipAsSource ? 'true' : 'false'}`,
        ], `add address ${address}`);
        this.createdAddresses.add(address);
      }

      const summary = this.getSummary();
      this.status = 'active';
      console.log(`[VirtualNetwork] Ready on ${this.interfaceName}. Created ${summary.createdAddresses.length} temporary device IP alias(es), reused ${summary.reusedAddresses.length}.`);
      return true;
    } catch (error) {
      this.cleanup();
      if (this.config.strict === false) {
        this.status = 'fallback';
        console.warn(`${error.message} Falling back to existing bind settings because deviceServer.virtualNetwork.strict=false.`);
        return false;
      }

      this.status = 'pending';
      throw error;
    }
  }

  cleanup() {
    const createdAddresses = Array.from(this.createdAddresses);
    if (createdAddresses.length === 0) return;

    for (const address of createdAddresses.reverse()) {
      try {
        this.runNetsh([
          'interface',
          'ipv4',
          'delete',
          'address',
          `name=${this.interfaceName}`,
          `address=${address}`,
          'store=active',
        ], `delete address ${address}`);
      } catch (error) {
        console.warn(`[VirtualNetwork] Failed to remove temporary alias ${address}: ${error.message}`);
      }
    }

    this.createdAddresses.clear();
    console.log(`[VirtualNetwork] Removed ${createdAddresses.length} temporary device IP alias(es).`);
  }

  getSummary() {
    return {
      enabled: true,
      interfaceName: this.interfaceName,
      createdAddresses: Array.from(this.createdAddresses),
      reusedAddresses: Array.from(this.reusedAddresses),
    };
  }

  ensureSupported() {
    if (process.platform !== 'win32') {
      throw new Error('[VirtualNetwork] windows-loopback-aliases is only supported on Windows.');
    }
  }

  ensureSafeMask() {
    const mask = String(this.config.mask || '').trim();
    if (mask === '255.255.255.255') {
      return;
    }

    if (this.config.allowUnsafeMask === true) {
      console.warn(`[VirtualNetwork] Using non-/32 mask ${mask}. This can hijack subnet routes and affect LAN or internet connectivity.`);
      return;
    }

    throw new Error(`[VirtualNetwork] Refusing mask ${mask}. Use 255.255.255.255 for host-only aliases, or set allowUnsafeMask=true if you intentionally want broader subnet routing.`);
  }

  ensureElevated() {
    const result = spawnSync(
      'powershell.exe',
      [
        '-NoProfile',
        '-Command',
        '[bool](([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))',
      ],
      {
        encoding: 'utf8',
        windowsHide: true,
      }
    );

    const isElevated = result.status === 0 && /^true\s*$/i.test(result.stdout || '');
    if (!isElevated) {
      throw new Error('[VirtualNetwork] Run the simulator from an elevated PowerShell session when deviceServer.virtualNetwork.enabled=true.');
    }
  }

  ensureInterfaceExists() {
    const interfaceResult = this.runNetsh(
      ['interface', 'ipv4', 'show', 'address', `name=${this.interfaceName}`],
      `inspect interface ${this.interfaceName}`,
      true
    );

    if (interfaceResult.status === 0) return;

    const availableInterfaces = this.runNetsh(
      ['interface', 'ipv4', 'show', 'interfaces'],
      'list IPv4 interfaces',
      true
    );

    const extra = availableInterfaces.stdout
      ? ` Available interfaces:\n${availableInterfaces.stdout.trim()}`
      : '';
    throw new Error(`[VirtualNetwork] Interface "${this.interfaceName}" was not found.${extra}`);
  }

  collectBindableAddresses(devices) {
    const addresses = new Set();

    for (const device of devices) {
      if (!device.bindIP || device.bindIP === '0.0.0.0' || device.bindIP === '::') {
        continue;
      }

      if (!net.isIPv4(device.bindIP)) {
        throw new Error(`[VirtualNetwork] Device ${device.deviceID} uses unsupported bindIP "${device.bindIP}". Only IPv4 aliases are supported.`);
      }

      addresses.add(device.bindIP);
    }

    return Array.from(addresses).sort();
  }

  runNetsh(args, label, allowFailure = false) {
    const result = spawnSync('netsh', args, {
      encoding: 'utf8',
      windowsHide: true,
    });

    if (allowFailure) return result;

    if (result.error) {
      throw new Error(`${label} failed: ${result.error.message}`);
    }

    if (result.status !== 0) {
      const output = (result.stderr || result.stdout || '').trim();
      throw new Error(`${label} failed: ${output || 'netsh exited with a non-zero status.'}`);
    }

    return result;
  }
}

module.exports = {
  createVirtualNetworkManager,
};
