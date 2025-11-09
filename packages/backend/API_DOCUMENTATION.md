# Suprema HR Integration API - Comprehensive Endpoint Documentation

## Overview
This document provides a complete reference for all available REST API endpoints in the Suprema HR Integration system.

---

## 1. Device Management (`/api/devices`)

### Device CRUD Operations

#### Search for devices on network
- **GET** `/api/devices/search?timeout=5`
- Query params: `timeout` (seconds)

#### Get all devices from database
- **GET** `/api/devices`
- Query params: `status`, `connected=true`

#### Add new device to database
- **POST** `/api/devices`
- Body: `{ name, ip, port, username, password, loc, channel }`

#### Update device in database
- **PUT** `/api/devices/:deviceId`
- Body: `{ name?, ip?, port?, ... }`

#### Delete device from database
- **DELETE** `/api/devices/:deviceId`

### Device Connection

#### Connect to device
- **POST** `/api/devices/:deviceId/connect`

#### Disconnect device
- **POST** `/api/devices/:deviceId/disconnect`

#### Test device connection
- **GET** `/api/devices/:deviceId/test`

### Device Information

#### Get device information
- **GET** `/api/devices/:deviceId/info`

#### Get device capabilities
- **GET** `/api/devices/:deviceId/capabilities`

#### Get connection statistics
- **GET** `/api/devices/statistics`

### Device Sync

#### Sync all device statuses
- **POST** `/api/devices/sync`

#### Auto-reconnect failed devices
- **POST** `/api/devices/reconnect`

---

## 2. User Management (`/api/users`)

### User Operations on Device

#### Get all users from device
- **GET** `/api/users/:deviceId?detailed=true`
- Query params: `detailed` - Get full user details

#### Get specific user details
- **GET** `/api/users/:deviceId/user/:userId`

#### Enroll users to device
- **POST** `/api/users/:deviceId`
- Body: `{ users: [{userID, name, ...}] }`

#### Enroll users to multiple devices
- **POST** `/api/users/enroll-multi`
- Body: `{ deviceIds: [], users: [] }`

#### Update user on device
- **PUT** `/api/users/:deviceId/:userId`
- Body: `{ userInfo: {...} }`

#### Update users on multiple devices
- **PUT** `/api/users/update-multi`
- Body: `{ deviceIds: [], users: [] }`

#### Delete users from device
- **DELETE** `/api/users/:deviceId`
- Body: `{ userIds: [] }`

#### Delete users from multiple devices
- **DELETE** `/api/users/delete-multi`
- Body: `{ deviceIds: [], userIds: [] }`

### Biometric Credentials

#### Set fingerprints for users
- **POST** `/api/users/:deviceId/fingerprints`
- Body: `{ userFingerData: [{userId, fingerData}] }`

#### Set cards for users
- **POST** `/api/users/:deviceId/cards`
- Body: `{ userCardData: [{userId, cardData}] }`

#### Get user card credentials
- **GET** `/api/users/:deviceId/cards/:userId`

#### Update user card credentials
- **PUT** `/api/users/:deviceId/cards/:userId`
- Body: `{ cardData, cardIndex }`

#### Delete user card credentials
- **DELETE** `/api/users/:deviceId/cards/:userId?cardIndex=0`

#### Set faces for users
- **POST** `/api/users/:deviceId/faces`
- Body: `{ userFaceData: [{userId, faceData}] }`

### Access Groups

#### Get access groups for users
- **GET** `/api/users/:deviceId/access-groups?userIds=123,456`

#### Set access groups for users
- **POST** `/api/users/:deviceId/access-groups`
- Body: `{ userAccessGroups: [{userID, accessGroupIDs}] }`

### User Sync

#### Sync users from device to database
- **POST** `/api/users/:deviceId/sync`

#### Sync users from all devices
- **POST** `/api/users/sync-all`

#### Get user statistics
- **GET** `/api/users/:deviceId/statistics`

### Card Blacklist

#### Manage card blacklist
- **POST** `/api/users/:deviceId/cards/blacklist`
- Body: `{ action: "add"|"delete", cardInfos: [] }`

---

## 3. Card Operations (`/api/cards`)

### Card Scanning

#### Scan card from device
- **POST** `/api/cards/scan`
- Body: `{ deviceId, format?, threshold? }`

#### Verify card data
- **POST** `/api/cards/verify`
- Body: `{ deviceId, cardData }`

### Blacklist Management

#### Get card blacklist
- **GET** `/api/cards/blacklist/:deviceId`

#### Add cards to blacklist
- **POST** `/api/cards/blacklist/:deviceId`
- Body: `{ cardInfos: [{cardID, issueCount}] }`

#### Remove cards from blacklist
- **DELETE** `/api/cards/blacklist/:deviceId`
- Body: `{ cardInfos: [{cardID, issueCount}] }`

### Card Configuration

#### Get card configuration
- **GET** `/api/cards/config/:deviceId`

#### Set card configuration
- **PUT** `/api/cards/config/:deviceId`
- Body: `{ config: {...} }`

#### Get QR code configuration
- **GET** `/api/cards/qr-config/:deviceId`

#### Set QR code configuration
- **PUT** `/api/cards/qr-config/:deviceId`
- Body: `{ qrConfig: {...} }`

#### Get card statistics
- **GET** `/api/cards/statistics/:deviceId`

---

## 4. Event Management (`/api/events`)

### Event Subscription

#### Subscribe to real-time events
- **POST** `/api/events/subscribe`
- Body: `{ deviceId, filters: [] }`

#### Unsubscribe from events
- **POST** `/api/events/unsubscribe`
- Body: `{ deviceId }`

#### Subscribe to real-time event stream
- **POST** `/api/events/stream/subscribe`
- Body: `{ queueSize: 100 }`

### Event Logs

#### Get event logs
- **GET** `/api/events/logs?deviceId=123&startTime=&endTime=&maxEvents=1000`

#### Get event by ID
- **GET** `/api/events/:eventId?deviceId=123`

#### Export event logs
- **GET** `/api/events/export?deviceId=123&format=csv&startTime=&endTime=`

### Device Event Logs

#### Get event log from device
- **GET** `/api/events/device-log/:deviceId?startEventId=0&maxNumOfLog=1000`

#### Get filtered event log
- **POST** `/api/events/device-log/:deviceId/filtered`
- Body: `{ startEventId, maxNumOfLog, filter: {...} }`

#### Get image event log
- **GET** `/api/events/image-log/:deviceId?startEventId=0&maxNumOfLog=100`

### Event Monitoring

#### Enable event monitoring
- **POST** `/api/events/monitoring/:deviceId/enable`

#### Disable event monitoring
- **POST** `/api/events/monitoring/:deviceId/disable`

#### Enable monitoring on multiple devices
- **POST** `/api/events/monitoring/enable-multi`
- Body: `{ deviceIds: [] }`

### Event Sync

#### Sync events from device to database
- **POST** `/api/events/sync/:deviceId`
- Body: `{ fromEventId?, batchSize: 1000 }`

#### Sync events from all devices
- **POST** `/api/events/sync-all`
- Body: `{ batchSize: 1000 }`

#### Get sync status for device
- **GET** `/api/events/sync-status/:deviceId`

### Event Statistics

#### Get event statistics
- **GET** `/api/events/statistics?deviceId=123&startTime=&endTime=`

#### Get event count
- **GET** `/api/events/count?deviceId=123&timeWindow=3600`

#### Get supported event codes
- **GET** `/api/events/codes`

---

## 5. Gate Events (`/api/gate-events`)

### Gate Event CRUD

#### Get all gate events
- **GET** `/api/gate-events?limit=100&offset=0&startDate=&endDate=`

#### Create new gate event
- **POST** `/api/gate-events`
- Body: `{ employee_id, door_no, gate_id, loc, dir, etime }`

#### Get events for specific employee
- **GET** `/api/gate-events/employee/:employeeId?limit=50`

#### Get gate event statistics
- **GET** `/api/gate-events/stats?startDate=&endDate=&loc=`

---

## 6. Employee Management (`/api/employees`)

#### Get all employees
- **GET** `/api/employees?limit=100&offset=0`

#### Get employee by ID
- **GET** `/api/employees/:id`

#### Search employees
- **GET** `/api/employees/search/:searchTerm`

#### Get employee card information
- **GET** `/api/employees/:id/card`

---

## 7. Door Management (`/api/doors`)

#### Get all doors from device
- **GET** `/api/doors/:deviceId`

#### Control door (lock/unlock)
- **POST** `/api/doors/:deviceId/control`
- Body: `{ doorId, action: "lock"|"unlock", duration? }`

#### Get door status
- **GET** `/api/doors/:deviceId/status/:doorId`

---

## 8. Time & Attendance (`/api/tna`)

#### Get T&A logs
- **GET** `/api/tna/logs?deviceId=123&startTime=&endTime=`

#### Get T&A summary
- **GET** `/api/tna/summary?deviceId=123&userId=456&date=2024-01-01`

#### Process T&A events
- **POST** `/api/tna/process`
- Body: `{ deviceId, eventIds: [] }`

---

## 9. Biometric Management (`/api/biometric`)

#### Scan fingerprint
- **POST** `/api/biometric/:deviceId/scan/fingerprint`

#### Scan face
- **POST** `/api/biometric/:deviceId/scan/face`

#### Get biometric configuration
- **GET** `/api/biometric/:deviceId/config`

#### Set biometric configuration
- **PUT** `/api/biometric/:deviceId/config`
- Body: `{ config: {...} }`

---

## 10. HR Integration (`/api/hr`)

#### Get HR webhook logs
- **GET** `/api/hr/webhooks`

#### Trigger manual sync
- **POST** `/api/hr/sync`

#### Get sync status
- **GET** `/api/hr/sync/status`

---

## Common Response Formats

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "requestId": "uuid"
}
```

---

## Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **404** - Not Found
- **500** - Internal Server Error
- **503** - Service Unavailable

---

## Complete Endpoint Summary

### Device Operations ✅
- ✅ Search devices on network
- ✅ Get all devices from DB
- ✅ Add device to DB
- ✅ Update device in DB
- ✅ Delete device from DB
- ✅ Connect/disconnect device
- ✅ Get device info & capabilities
- ✅ Test connection
- ✅ Sync device status
- ✅ Auto-reconnect devices

### User Operations ✅
- ✅ Get users from device
- ✅ Enroll users (single & multi-device)
- ✅ Update users (single & multi-device)
- ✅ Delete users (single & multi-device)
- ✅ Set fingerprints
- ✅ Set cards
- ✅ Set faces
- ✅ Manage access groups
- ✅ Sync users to database
- ✅ User statistics

### Card Operations ✅
- ✅ Scan card
- ✅ Verify card
- ✅ Manage blacklist (get/add/delete)
- ✅ Get/set card configuration
- ✅ Get/set QR configuration
- ✅ Card statistics

### Event Operations ✅
- ✅ Subscribe/unsubscribe to events
- ✅ Get event logs (database)
- ✅ Get device event logs
- ✅ Get filtered event logs
- ✅ Get image event logs
- ✅ Enable/disable monitoring
- ✅ Multi-device monitoring
- ✅ Sync events to database
- ✅ Sync all devices events
- ✅ Get sync status
- ✅ Event statistics
- ✅ Export events

### Database Operations ✅
- ✅ Gate events CRUD
- ✅ Employee queries
- ✅ Employee search
- ✅ Statistics & reporting

---

## Notes

- All sync operations use the `SyncService` to handle synchronization between devices and database
- Event monitoring supports real-time streaming with configurable queue sizes
- Multi-device operations support batch enrollment, updates, and deletions
- Card operations include blacklist management and QR code support
- All endpoints support proper error handling with detailed error messages
