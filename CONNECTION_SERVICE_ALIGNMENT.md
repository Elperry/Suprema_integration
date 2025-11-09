# Connection Service Alignment with Example Patterns

## Overview
This document outlines the alignment of `connectionService.js` with the patterns used in the `example/connect` folder to ensure consistency and correctness in device connection management.

## Analysis of Example Folder Patterns

### Core Principles from Examples

1. **Client Initialization**
   - Uses `initClient(addr, credential)` pattern
   - Stores client instance for reuse
   - Returns client via `getClient()` accessor

2. **gRPC Request Pattern**
   - Create protobuf request objects using `new connectMessage.XxxRequest()`
   - Set parameters using setter methods (e.g., `req.setTimeout()`, `req.setDeviceid()`)
   - Wrap gRPC calls in Promises
   - Use specific getter methods on responses (e.g., `response.getDeviceinfosList()`, `response.getDeviceid()`)

3. **Error Handling**
   - Log errors with descriptive messages using `console.error` or logger
   - Reject promises with the error
   - Return early after error handling

4. **Response Extraction**
   - Use protobuf getter methods instead of `.toObject()`
   - Examples: `.getDeviceid()`, `.getDeviceinfosList()`, `.getInfo()`, `.getDevicecapability()`

## Changes Made to connectionService.js

### 1. Fixed Response Extraction Methods

**Before:**
```javascript
const devices = response.toObject().deviceinfosList;
const deviceInfo = response.toObject().info;
const capabilities = response.toObject().capinfo;
```

**After (matching example patterns):**
```javascript
const devices = response.getDeviceinfosList();
const deviceInfo = response.getInfo();
const capabilities = response.getDevicecapability();
```

### 2. Updated Error Messages

**Before:**
```javascript
this.logger.error('Device search failed:', err);
this.logger.error('Failed to get device list:', err);
this.logger.error('Failed to disconnect device ${deviceId}:', err);
```

**After (matching example patterns):**
```javascript
this.logger.error('Cannot search device:', err);
this.logger.error('Cannot get device list:', err);
this.logger.error('Cannot disconnect: ${deviceId}', err);
```

### 3. Added Missing Connection Methods

The following methods were added to match the complete API from the example folder:

#### a. `disconnectAll()`
- Disconnects all connected devices at once
- Uses `DisconnectAllRequest` message
- Clears local `connectedDevices` map

#### b. `enableSSLMulti(deviceIds)`
- Enables SSL for multiple devices simultaneously
- Uses `EnableSSLMultiRequest` message
- More efficient than calling `enableDeviceSSL` multiple times

#### c. `disableSSLMulti(deviceIds)`
- Disables SSL for multiple devices
- Uses `DisableSSLMultiRequest` message
- Mirrors the `enableSSLMulti` pattern

#### d. `addAsyncConnection(connInfos)`
- Adds asynchronous connection configurations
- Uses `AddAsyncConnectionRequest` message
- Accepts array of connection info objects

#### e. `deleteAsyncConnection(deviceIds)`
- Removes async connection configurations
- Uses `DeleteAsyncConnectionRequest` message
- Accepts array of device IDs

#### f. `setConnectionMode(deviceIds, mode)`
- Sets connection mode for multiple devices
- Uses `SetConnectionModeMultiRequest` message
- Applies mode setting to all specified devices

#### g. `getPendingList()`
- Retrieves list of pending device connections
- Uses `GetPendingListRequest` message
- Returns array of pending device info

#### h. `getAcceptFilter()`
- Gets current accept filter configuration
- Uses `GetAcceptFilterRequest` message
- Returns filter object

#### i. `setAcceptFilter(filter)`
- Sets accept filter for device connections
- Uses `SetAcceptFilterRequest` message
- Accepts filter configuration object

#### j. `subscribeStatus(queueSize)`
- Subscribes to device status change stream
- Uses `SubscribeStatusRequest` message
- Returns gRPC stream for status events
- Default queue size of 100

### 4. Updated Device Capabilities Method

**Before:**
```javascript
const req = new deviceMessage.GetCapabilityInfoRequest();
req.setDeviceid(deviceId);
// ...
const capabilities = response.toObject().capinfo;
```

**After (matching example patterns):**
```javascript
const req = new deviceMessage.GetCapabilityRequest();
req.setDeviceid(deviceId);
// ...
const capabilities = response.getDevicecapability();
```

## Method Comparison Table

| Example Folder Method | connectionService Method | Status |
|----------------------|--------------------------|--------|
| `initClient()` | `initializeGateway()` | ✅ Aligned |
| `getDeviceList()` | `getConnectedDevices()` | ✅ Updated |
| `searchDevice()` | `searchDevices()` | ✅ Updated |
| `connectToDevice()` | `connectToDevice()` | ✅ Already correct |
| `disconnect()` | `disconnectDevice()` | ✅ Updated |
| `disconnectAll()` | `disconnectAll()` | ✅ Added |
| `addAsyncConnection()` | `addAsyncConnection()` | ✅ Added |
| `deleteAsyncConnection()` | `deleteAsyncConnection()` | ✅ Added |
| `setConnectionMode()` | `setConnectionMode()` | ✅ Added |
| `enableSSL()` (multi) | `enableSSLMulti()` | ✅ Added |
| `disableSSL()` (multi) | `disableSSLMulti()` | ✅ Added |
| `getPendingList()` | `getPendingList()` | ✅ Added |
| `getAcceptFilter()` | `getAcceptFilter()` | ✅ Added |
| `setAcceptFilter()` | `setAcceptFilter()` | ✅ Added |
| `subscribe()` | `subscribeStatus()` | ✅ Added |
| `getInfo()` (device) | `getDeviceInfo()` | ✅ Updated |
| `getCapability()` (device) | `getDeviceCapabilities()` | ✅ Updated |

## Benefits of Alignment

1. **Consistency**: Backend service now uses the exact same patterns as documented examples
2. **Reliability**: Tested patterns from examples reduce potential bugs
3. **Maintainability**: Easier to reference example code when debugging
4. **Completeness**: All connection management features from examples are now available
5. **Correctness**: Using proper protobuf getters instead of generic `.toObject()`

## Usage Examples

### Connect to Device
```javascript
const deviceId = await connectionService.connectToDevice({
    ip: '192.168.1.100',
    port: 51211,
    useSSL: false
});
```

### Search for Devices
```javascript
const devices = await connectionService.searchDevices(5); // 5 second timeout
```

### Enable SSL for Multiple Devices
```javascript
await connectionService.enableSSLMulti([deviceId1, deviceId2, deviceId3]);
```

### Add Async Connection
```javascript
const connInfos = [
    new connectMessage.ConnectInfo()
        .setIpaddr('192.168.1.100')
        .setPort(51211)
        .setUsessl(false)
];
await connectionService.addAsyncConnection(connInfos);
```

### Subscribe to Status Changes
```javascript
const statusStream = connectionService.subscribeStatus(100);
statusStream.on('data', (status) => {
    console.log('Device status changed:', status);
});
```

## Testing Recommendations

1. Test device connection/disconnection cycles
2. Verify SSL operations work correctly
3. Test async connection management
4. Validate status subscription stream
5. Confirm pending device list retrieval
6. Test accept filter configuration

## Next Steps

1. Update API documentation to include new methods
2. Add route handlers for new connection features
3. Implement comprehensive error handling tests
4. Document connection mode values and their meanings
5. Add status subscription event handlers in main application

## References

- Example folder: `example/connect/`
- Main service file: `packages/backend/src/services/connectionService.js`
- Route handlers: `packages/backend/src/routes/deviceRoutes.js`
