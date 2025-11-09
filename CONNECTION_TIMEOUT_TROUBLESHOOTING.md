# Connection Timeout Troubleshooting Guide

## Error: UNAVAILABLE - Cannot handshake the direct connection

### Error Details
```
14 UNAVAILABLE: Cannot handshake the direct connection: Cannot handshake: 
Cannot receive the sync packet: Cannot receive packet: Timeout to read the 
start code: read tcp 10.0.0.6:46583->10.0.0.8:51211: i/o timeout
```

### What This Means

This error occurs when the gateway cannot establish a direct TCP connection to the Suprema device at `10.0.0.8:51211`. The connection times out during the handshake phase.

**Error Code 14** = gRPC `UNAVAILABLE` status code

## Root Causes

### 1. **Network Connectivity Issues** (Most Common)
- Device is powered off
- Network cable unplugged
- Device on different network/VLAN
- Firewall blocking port 51211

### 2. **IP Configuration Issues**
- Wrong IP address configured
- IP address changed on device
- DHCP vs Static IP mismatch

### 3. **Port Configuration Issues**
- Wrong port number (default should be 51211)
- Port blocked by firewall
- Device using different port

### 4. **Device Busy/Overloaded**
- Device processing many requests
- Device rebooting
- Firmware update in progress

### 5. **Timeout Too Short**
- Default timeout may be insufficient
- Slow network connection
- Device takes longer to respond

## Solutions Implemented

### 1. **Extended Timeout with Deadline**

The connection service now includes configurable timeouts:

```javascript
// Default 30 seconds, can be configured per device
const timeout = deviceConfig.timeout || 30000; // milliseconds
const deadline = new Date();
deadline.setMilliseconds(deadline.getMilliseconds() + timeout);

this.connClient.connect(req, { deadline }, (err, response) => {
    // Connection handling
});
```

### 2. **Automatic Retry Logic**

Connections now retry 3 times with 2-second delays:

```javascript
const maxRetries = 3;
const retryDelay = 2000; // 2 seconds

for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
        const deviceId = await this.connectToDevice(config);
        return deviceId; // Success!
    } catch (error) {
        if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}
```

### 3. **Enhanced Error Messages**

More descriptive error messages to help diagnose issues:

```javascript
if (err.code === 14 || err.message.includes('UNAVAILABLE')) {
    const errorMsg = `Device unreachable at ${deviceConfig.ip}:${deviceConfig.port}. ` +
                   `Please check: 1) Device is powered on, 2) Network connectivity, ` +
                   `3) IP and port are correct, 4) Firewall settings`;
    reject(new Error(errorMsg));
}
```

## Troubleshooting Steps

### Step 1: Verify Device Power and Network

```bash
# Ping the device
ping 10.0.0.8

# Check if port is accessible
# Windows PowerShell:
Test-NetConnection -ComputerName 10.0.0.8 -Port 51211

# Linux/Mac:
nc -zv 10.0.0.8 51211
# or
telnet 10.0.0.8 51211
```

**Expected Result:**
- Ping should respond (< 100ms typically)
- Port 51211 should be open/accessible

### Step 2: Check Device Configuration

1. **Access Device Web Interface:**
   - Open browser: `http://10.0.0.8` or `https://10.0.0.8`
   - Default credentials usually `admin` / `admin`

2. **Verify Network Settings:**
   - Check IP address matches configuration
   - Verify port is 51211
   - Check gateway and DNS settings

3. **Check Connection Mode:**
   - Should be in "Server Mode" or "Direct Connection" mode
   - Not in "Cloud Only" mode

### Step 3: Verify Gateway Service

1. **Check Gateway is Running:**
   ```bash
   # Check if gateway process is running
   # Look for device_gateway or biostar_gateway
   ps aux | grep gateway
   ```

2. **Verify Gateway Configuration:**
   ```bash
   # Check gateway config
   cat device_gateway/config.json
   ```

3. **Check Gateway Logs:**
   ```bash
   # View recent logs
   tail -f device_gateway/logs/*.log
   ```

### Step 4: Test from Debugger Tab

1. Navigate to **Debugger Tab** in frontend
2. Click **🔍 Search Devices** with timeout 10-15 seconds
3. If device appears, it's reachable
4. Try **🔌 Connect Device** with selected device
5. Review JSON response for specific error details

### Step 5: Increase Timeout

For slow networks or busy devices, increase timeout:

**In Database:**
```sql
UPDATE Device 
SET timeout = 60000  -- 60 seconds
WHERE ip = '10.0.0.8';
```

**Via API:**
```javascript
PUT /api/devices/{deviceId}
{
  "timeout": 60000
}
```

**When Adding Device:**
```javascript
POST /api/devices
{
  "name": "Main Device",
  "ip": "10.0.0.8",
  "port": 51211,
  "timeout": 60000
}
```

### Step 6: Check Firewall Rules

**Windows Firewall:**
```powershell
# Allow inbound on port 51211
New-NetFirewallRule -DisplayName "Suprema Device" -Direction Inbound -LocalPort 51211 -Protocol TCP -Action Allow

# Allow outbound on port 51211
New-NetFirewallRule -DisplayName "Suprema Device" -Direction Outbound -RemotePort 51211 -Protocol TCP -Action Allow
```

**Linux iptables:**
```bash
# Allow connection to device port
sudo iptables -A OUTPUT -p tcp --dport 51211 -j ACCEPT
sudo iptables -A INPUT -p tcp --sport 51211 -j ACCEPT
```

### Step 7: Check Network Path

```bash
# Trace route to device
traceroute 10.0.0.8

# Windows:
tracert 10.0.0.8
```

Look for:
- Too many hops (should be 1-3 typically)
- Timeouts along the path
- Different subnets/VLANs

## Common Scenarios and Fixes

### Scenario 1: Device IP Changed

**Symptom:** Was working, suddenly getting timeout

**Fix:**
1. Search for devices to find new IP
2. Update device configuration:
   ```javascript
   PUT /api/devices/{id}
   { "ip": "10.0.0.X" }
   ```

### Scenario 2: Network Segmentation

**Symptom:** Can ping but cannot connect

**Fix:**
1. Ensure both server and device on same network
2. Or configure routing between networks
3. Check firewall allows port 51211

### Scenario 3: Device Firmware Update

**Symptom:** Timeout during specific times

**Fix:**
1. Wait for firmware update to complete
2. Device will reconnect automatically
3. Check device web interface for update status

### Scenario 4: Multiple Connection Attempts

**Symptom:** First connection fails, subsequent work

**Fix:**
- Automatic retry now handles this
- Device may need warm-up time after power on

### Scenario 5: SSL Certificate Issues

**Symptom:** Connection fails with SSL devices

**Fix:**
1. Ensure `useSSL: true` in device config
2. Verify gateway has correct SSL certificates
3. Try without SSL first to isolate issue

## Configuration Best Practices

### 1. Static IP Assignment

Always use static IPs for Suprema devices:
```
Device Network Settings:
- IP: 10.0.0.8
- Subnet: 255.255.255.0
- Gateway: 10.0.0.1
- DNS: 10.0.0.1
```

### 2. Timeout Values

Recommended timeout settings:

| Network Type | Recommended Timeout |
|--------------|-------------------|
| LAN (Local) | 15-30 seconds |
| LAN (Slow) | 30-60 seconds |
| VPN | 60-90 seconds |
| Internet | 90-120 seconds |

### 3. Connection Mode

Configure devices in proper mode:
- **Server Mode** (Direct): Best for LAN
- **Slave Mode**: For gateway connections
- Avoid "Cloud Only" mode for local integration

### 4. Port Configuration

Standard ports:
- **51211** - Device communication (TCP)
- **80/443** - Web interface (HTTP/HTTPS)

### 5. Network Quality

Ensure good network quality:
- Ping < 50ms
- No packet loss
- Stable connection
- Sufficient bandwidth (1+ Mbps)

## Monitoring and Prevention

### 1. Regular Connection Tests

Use the Debugger tab to periodically test connections:
```javascript
// Every 5 minutes
GET /api/devices/{id}/test
```

### 2. Auto-Reconnect

Enable automatic reconnection:
```javascript
POST /api/devices/reconnect
```

System will attempt to reconnect failed devices.

### 3. Device Status Sync

Regular status synchronization:
```javascript
POST /api/devices/sync
```

### 4. Connection Statistics

Monitor connection health:
```javascript
GET /api/devices/statistics
```

## Gateway Configuration

Ensure gateway is properly configured:

**device_gateway/config.json:**
```json
{
  "gateway": {
    "ip": "0.0.0.0",
    "port": 4000,
    "use_tls": false
  },
  "connection": {
    "timeout": 30000,
    "max_retries": 3,
    "retry_delay": 2000
  }
}
```

## Environment Variables

Configure via environment variables:

```bash
# .env file
GATEWAY_IP=127.0.0.1
GATEWAY_PORT=4000
DEVICE_CONNECTION_TIMEOUT=30000
DEVICE_MAX_RETRIES=3
DEVICE_RETRY_DELAY=2000
```

## Logging

Enable detailed logging for troubleshooting:

```javascript
// Set log level to debug
LOG_LEVEL=debug

// Check logs
tail -f logs/connection.log
```

Look for:
- Connection attempts
- Timeout details
- Retry attempts
- Error codes

## Quick Reference

| Issue | First Check | Quick Fix |
|-------|------------|-----------|
| Cannot connect | Ping device | Power cycle device |
| Timeout | Port 51211 open? | Increase timeout |
| Intermittent | Network stable? | Check cables |
| After reboot | IP changed? | Update config |
| SSL errors | Certificate valid? | Try without SSL |

## Support Resources

1. **Check Gateway Logs:** `device_gateway/logs/`
2. **Use Debugger Tab:** Real-time testing
3. **Device Web UI:** `http://device-ip`
4. **Suprema Documentation:** Device manual
5. **Network Tools:** ping, traceroute, telnet

## Summary

The connection service now includes:
- ✅ Configurable timeouts (default 30s)
- ✅ Automatic 3-retry mechanism
- ✅ 2-second delay between retries
- ✅ Enhanced error messages
- ✅ Better logging
- ✅ Graceful degradation

Most timeout issues are resolved by:
1. Verifying network connectivity
2. Checking device power/status
3. Confirming IP and port settings
4. Increasing timeout if needed
5. Using automatic retry

---

**Updated:** November 9, 2025
**Issue:** gRPC UNAVAILABLE (code 14) timeout errors
**Status:** ✅ Enhanced with retry logic and better error handling
