# Suprema Device Simulator

This package now starts a device-side simulator skeleton instead of replacing the Suprema gateway.

## What it does now

- Opens TCP listeners on the configured device ports, such as `51211`
- Opens UDP listeners on the same ports for discovery probing
- Logs raw traffic in hex so you can inspect what the real gateway sends
- Can echo the gateway's initial 104-byte sync frame to satisfy the first direct-connect handshake step
- Tracks basic device connection state in memory
- Reuses already-local device IPs automatically instead of wildcard-binding everything when possible
- Can create temporary per-device Windows loopback IP aliases on startup and remove them on shutdown
- Preserves the old gateway-replacement behavior under `gateway-mock.js`

## What it does not do yet

- It does not implement the proprietary BioStar device protocol
- It does not answer discovery packets with a real BioStar payload
- It does not speak the full TCP/TLS device handshake used by the real gateway
- After the initial sync echo, richer requests such as `GetDeviceInfo` can still time out or fail

## Run modes

```bash
npm run start:device
npm run start:gateway-mock
```

`start:device` is the primary mode.

`start:gateway-mock` preserves the earlier behavior for backend-only tests.

## Important IP requirement

The configured device IPs, such as `192.168.1.120`, must exist on this machine if you want the real gateway to reach them directly.

If the host does not own those IPs, the gateway cannot connect to them even if the simulator is listening on `0.0.0.0:51211`.

You have two practical options:

1. Add the device IPs as secondary IPv4 addresses on this machine.
2. Set per-device `bindIP` values to real local IP aliases once those aliases exist.

When `deviceServer.preferAdvertisedLocalIPs=true`, the simulator will automatically bind to `device.ip` for any device IP that is already local on this host. That avoids the ambiguous `0.0.0.0` listener when those addresses already exist.

## Minimal handshake stub

By default, `deviceServer.minimalHandshake.enabled=true`.

That mode watches for the gateway's first TCP sync frame and echoes the same 104-byte packet back once. In local testing, that is enough for `Connect()` to succeed and mark the device as connected.

It is only a bootstrap stub, not a real protocol implementation.

## Optional Windows virtual network lifecycle

If you enable `deviceServer.virtualNetwork`, the simulator will:

- Require an elevated PowerShell session
- Add one temporary host-only (`/32`) IPv4 alias per simulated device on `Loopback Pseudo-Interface 1`
- Bind each device socket to its advertised device IP unless `bindIP` is explicitly set
- Remove only the aliases it created when the simulator exits
- Avoid stealing the whole LAN subnet route, which is the main way this kind of setup can break internet access

Example:

```json
{
  "deviceServer": {
    "virtualNetwork": {
      "enabled": true,
      "provider": "windows-loopback-aliases",
      "interfaceName": "Loopback Pseudo-Interface 1",
      "mask": "255.255.255.255",
      "allowUnsafeMask": false,
      "skipAsSource": true,
      "bindAdvertisedIP": true
    }
  }
}
```

This uses the built-in Windows loopback interface rather than installing a separate adapter driver per device.

Keep the default `255.255.255.255` mask unless you explicitly want broader routing. A wider mask like `/24` can capture traffic for your real LAN and interfere with internet access.

Example device entry:

```json
{
  "deviceID": 540092578,
  "ip": "192.168.1.120",
  "bindIP": "192.168.1.120",
  "port": 51211,
  "useSSL": false
}
```

If you leave out `bindIP`, the simulator uses the advertised device IP when `deviceServer.virtualNetwork.bindAdvertisedIP=true`; otherwise it falls back to `deviceServer.defaultBindIP`.

## Config sections

- `deviceServer`: settings for the device-side simulator skeleton
- `gatewayMock`: legacy gRPC gateway replacement settings
- `devices`: advertised BioStar devices and their ports

## Recommended next step

Run the device-side simulator, point the real gateway at one advertised device IP that is locally assigned, and capture the first TCP and UDP packets. That gives the protocol trace needed to implement the next layer of emulation.
