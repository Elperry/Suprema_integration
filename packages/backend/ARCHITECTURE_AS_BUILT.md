# Backend Architecture — As-Built Documentation

> **Scope**: `packages/backend` — Suprema HR Integration System  
> **Last updated**: April 2026

---

## 1. System Overview

An Express.js REST API that bridges **HR systems** with **Suprema BioStar biometric devices** through gRPC.
The backend manages device connectivity, user enrollment, biometric credentials (fingerprint, face, card),
door access control, time & attendance, and event synchronization.

```
 ┌──────────────┐       REST / JSON          ┌──────────────────────────┐
 │  Frontend /  │ ◄─────────────────────────► │   Express REST API       │
 │  HR System   │                             │   (packages/backend)     │
 └──────────────┘                             └────────┬────────┬────────┘
                                                       │        │
                                              Prisma   │        │ gRPC / Protobuf
                                                       ▼        ▼
                                              ┌────────────┐ ┌─────────────────┐
                                              │   MySQL     │ │ Suprema Device  │
                                              │  Database   │ │ Gateway (G-SDK) │
                                              └────────────┘ └───────┬─────────┘
                                                                     │ TCP/IP
                                                              ┌──────▼──────┐
                                                              │  Biometric  │
                                                              │  Devices    │
                                                              │ (XPass, etc)│
                                                              └─────────────┘
```

---

## 2. Startup Sequence

```
index.js  ─►  bootstrap()  ─►  createApp()  ─►  app.listen()  ─►  runPostStartupTasks()
   │              │                  │                                       │
   │         Composition Root   Express factory                    ┌────────┴────────┐
   │         (DI wiring)        (middleware,                       │ connectDevices() │ ◄── async, non-blocking
   │                             routes,                           │ syncDeviceTime() │
   │                             errors)                           │ hrIntegration    │
   │                                                               │ deviceMonitoring │
   │                                                               │ eventMonitoring  │
   └── main() orchestrates the full lifecycle                      └──────────────────┘
```

**Key design**: Device connections run as a background task *after* the HTTP server starts.
This ensures the API is reachable even when devices are unreachable.

---

## 3. Directory Structure

```
packages/backend/
├── index.js                    # Entry point — thin main() + post-startup tasks
├── package.json                # ESM ("type": "module")
│
├── prisma/
│   ├── schema.prisma           # 8 models: Device, Location, Event, User, ...
│   └── seed.js
│
├── biostar/
│   ├── proto/                  # 40+ .proto files (Suprema G-SDK)
│   └── service/                # Generated JS stubs (*_grpc_pb.js, *_pb.js)
│
└── src/
    ├── bootstrap.js            # Composition Root — creates & wires everything via DI
    ├── app.js                  # Express factory — middleware, routes, error handling
    │
    ├── core/                   # Framework infrastructure
    │   ├── base/               #   BaseController, BaseService, BaseRepository
    │   ├── config/             #   Environment config with validation
    │   ├── container/          #   IoC container (singleton/transient)
    │   ├── errors/             #   AppError hierarchy + Express error handler
    │   ├── interfaces/         #   IService, IRepository, IController contracts
    │   └── utils/              #   async, card, date, object, string, validation utils
    │
    ├── middleware/              # rateLimiter, requestValidator, responseUtils
    │
    ├── models/
    │   ├── database.js         # DatabaseManager — Prisma wrapper with domain queries
    │   └── Device.js           # Legacy Sequelize model (unused)
    │
    ├── repositories/           # Data access layer (extends BaseRepository)
    │   ├── CardAssignmentRepository.js
    │   ├── DeviceRepository.js
    │   ├── DeviceEnrollmentRepository.js
    │   ├── EventRepository.js
    │   └── index.js            # createRepositories() factory
    │
    ├── services/               # Business logic layer (12 services)
    │   ├── connectionService.js       # Gateway + device gRPC management
    │   ├── userService.js             # User enrollment & credentials
    │   ├── eventService.js            # Event monitoring & retrieval
    │   ├── doorService.js             # Door control & scheduling
    │   ├── biometricService.js        # Fingerprint/face/card biometrics
    │   ├── tnaService.js              # Time & Attendance
    │   ├── timeService.js             # Device clock synchronization
    │   ├── syncService.js             # Event/user/card sync to DB
    │   ├── enrollmentService.js       # Card enrollment workflow
    │   ├── userSyncService.js         # DB ↔ device user sync
    │   ├── deviceMonitoringService.js # Periodic status & auto-reconnect
    │   └── hrIntegrationService.js    # HR event forwarding
    │
    ├── routes/                 # 13 route files — factory pattern (services) => router
    │   ├── deviceRoutes.js
    │   ├── userRoutes.js
    │   ├── eventRoutes.js
    │   ├── doorRoutes.js
    │   ├── tnaRoutes.js
    │   ├── biometricRoutes.js
    │   ├── cardRoutes.js
    │   ├── enrollmentRoutes.js
    │   ├── hrRoutes.js
    │   ├── gateEventRoutes.js
    │   ├── employeeRoutes.js
    │   ├── locationRoutes.js
    │   └── timeRoutes.js
    │
    └── utils/
        ├── createLogger.js     # Centralized Winston logger factory
        ├── logger.js           # Legacy logger (superseded)
        ├── deviceResolver.js   # Shared device/event helpers
        ├── errors.js           # Custom error classes
        └── validation.js       # Env var validation & config parsing
```

---

## 4. Layer Architecture

### 4.1 Composition Root — `bootstrap.js`

Single place where all dependencies are created and wired into the DI container:

```
 Config → Logger → PrismaClient → DatabaseManager → Repositories
                                                          │
                        Gateway init ← ConnectionService ──┘
                              │
          ┌───────────────────┼────────────────────────────┐
          ▼                   ▼                            ▼
    UserService        EventService              DoorService ...
          │                   │
          ▼                   ▼
    SyncService        EnrollmentService
          │
          ▼
    DeviceMonitoringService    HRIntegrationService
```

### 4.2 Routes Layer (Presentation)

All 13 route files export a factory function: `(services) => express.Router()`

Routes receive a `services` object containing all domain services, `database`, and `logger`.
No route creates its own dependencies (except one violation — see §6).

### 4.3 Services Layer (Business Logic)

| Service | Responsibility | Dependencies |
|---------|---------------|--------------|
| `connectionService` | gRPC gateway + device connect/disconnect/discovery | config, database |
| `userService` | User CRUD on devices, credential management | connectionService, prisma |
| `eventService` | Real-time event streams, event log retrieval | connectionService |
| `doorService` | Door open/close/lock, access schedules | connectionService |
| `biometricService` | Fingerprint/face/card operations | connectionService |
| `tnaService` | T&A config, work-time logs | connectionService, eventService |
| `timeService` | Device clock sync with server | connectionService, database |
| `syncService` | Bulk sync events/users/cards to DB | all domain services, database |
| `enrollmentService` | Card enrollment workflow | userService, biometricService, connectionService, prisma |
| `userSyncService` | Bidirectional DB ↔ device user sync | userService, connectionService, prisma |
| `deviceMonitoringService` | Periodic status check + auto-reconnect | connectionService, logger |
| `hrIntegrationService` | Listen to domain events, forward to HR | multiple services, logger |

### 4.4 Repository Layer (Data Access)

4 repositories extending `BaseRepository`, created via `createRepositories(prisma, logger)`:

- **CardAssignmentRepository** — card-to-employee mapping with status tracking
- **DeviceRepository** — device CRUD, find by IP:port or serial number
- **DeviceEnrollmentRepository** — enrollment tracking per device+card
- **EventRepository** — event queries by device, user, or time range

### 4.5 Database Layer

- **Prisma ORM** — MySQL via `@prisma/client`
- **DatabaseManager** (`models/database.js`) — wraps Prisma with domain helpers:
  `getAllDevices()`, `getActiveDevices()`, `updateDevice()`, `incrementDeviceRetries()`, etc.
- 8 Prisma models: `Location`, `Device`, `GateEvent`, `User`, `TempAccess`, `CardAssignment`, `DeviceEnrollment`, `Event`

---

## 5. Key Design Patterns

| Pattern | Where | Status |
|---------|-------|--------|
| **Dependency Injection** | `bootstrap.js` → DI container | ⚠️ Partial (see §6) |
| **Factory Pattern** | Routes `(services) => router`, `createApp(container)` | ✅ |
| **Repository Pattern** | `src/repositories/` with BaseRepository | ✅ Built, but bypassed by most services |
| **Observer / EventEmitter** | Services emit domain events (`device:connected`, etc.) | ✅ |
| **Composition Root** | `bootstrap.js` — all wiring in one place | ✅ |
| **Base Class Hierarchy** | BaseService, BaseRepository, BaseController | ⚠️ Mostly unused |

---

## 6. Known Architectural Issues

### ISSUE 1 — Services Create Their Own Logger (6 of 12 services)

**Severity**: Medium
**Principle violated**: Dependency Inversion, DRY

Six services unconditionally create a private `winston.createLogger()` in their constructor,
ignoring the centralized logger from bootstrap:

| Service | Pattern |
|---------|---------|
| `connectionService.js` | `this.logger = winston.createLogger({...})` |
| `eventService.js` | `this.logger = winston.createLogger({...})` |
| `doorService.js` | `this.logger = winston.createLogger({...})` |
| `biometricService.js` | `this.logger = winston.createLogger({...})` |
| `tnaService.js` | `this.logger = winston.createLogger({...})` |
| `timeService.js` | `this.logger = winston.createLogger({...})` |

Three more use a fallback pattern (`options.logger || winston.createLogger()`) which works
only if the caller remembers to pass a logger. The remaining 3 services properly require injection.

**Impact**: 6+ duplicate Winston instances, each with its own file transport, inconsistent log format.

**Fix**: Accept logger via constructor options; bootstrap passes the centralized logger.

---

### ISSUE 2 — Repositories Exist But Are Bypassed

**Severity**: Medium
**Principle violated**: Single Responsibility, Layered Architecture

The 4 repositories are properly built and registered in the DI container, but most services
go directly through `DatabaseManager` or raw `prisma` calls:

- `connectionService` → `this.database.getAllDevices()`, `this.database.updateDevice()`
- `syncService` → `this.database.getAllDevices()`, `this.database.getActiveDevices()`
- `enrollmentService` → `this.prisma.cardAssignment.findMany()`
- `userSyncService` → `this.prisma.cardAssignment.findFirst()`
- `locationRoutes` → `services.database.getPrisma().location.findMany()`

The `DeviceRepository`, `CardAssignmentRepository`, etc. are registered but never resolved.

**Impact**: Two parallel data access paths; repository optimizations/caching would be ineffective.

---

### ISSUE 3 — `UserSyncService` Created Inside Route Handler

**Severity**: Low-Medium
**Principle violated**: Composition Root

In `userRoutes.js`, `UserSyncService` is instantiated per-request inside the route factory
instead of being created once in `bootstrap.js`:

```javascript
// userRoutes.js — VIOLATION
const syncService = new UserSyncService(
    services.user, services.connection, services.logger, { prisma }
);
```

**Fix**: Create `userSyncService` in bootstrap and add to the services object.

---

### ISSUE 4 — Controllers Layer Is Empty

**Severity**: Low
**Principle violated**: Separation of Concerns

`src/controllers/` exists but is empty. All HTTP handling logic (input parsing, validation,
response formatting) lives directly inside route handler closures.

`BaseController` exists in `core/base/` with methods like `sendSuccess()`, `sendNotFound()`,
`parseId()`, but no route file uses it.

**Impact**: Route files mix HTTP concerns with business logic invocation. Harder to unit test.

---

### ISSUE 5 — Base Classes Largely Unused

**Severity**: Low
**Principle violated**: Interface Segregation

The core infrastructure provides:
- `BaseService` — with `executeOperation()`, health checks, event emission
- `BaseController` — with response helpers, route registration
- `BaseRepository` — with CRUD methods, pagination, soft deletes

**Adoption**:
- `BaseRepository` → ✅ All 4 repositories extend it
- `BaseService` → ❌ 0 of 12 services extend it
- `BaseController` → ❌ 0 controllers (none exist)

---

### ISSUE 6 — `DatabaseManager` Duplicates Repository Responsibilities

**Severity**: Low-Medium
**Principle violated**: Single Responsibility

`DatabaseManager` contains 20+ domain-specific methods (`getAllDevices()`, `getActiveDevices()`,
`updateDevice()`, `addDevice()`, `incrementDeviceRetries()`, `getConnectedDevices()`, etc.)
that overlap with what the repositories already provide.

This creates two data access paths:
1. `database.getAllDevices()` — used by services
2. `deviceRepository.findMany()` — registered but unused

---

### ISSUE 7 — `connectionService` Has Multiple Responsibilities

**Severity**: Low
**Principle violated**: Single Responsibility

`connectionService.js` (~1100 lines) handles:

1. Gateway connection management (gRPC client lifecycle)
2. Device discovery (network scanning)
3. Device connect/disconnect with retry logic
4. SSL management
5. Database device CRUD (`addDeviceToDB`, `removeDeviceFromDB`, `updateDeviceInDB`)
6. Auto-reconnection (`autoReconnectDevices`)
7. Status synchronization (`syncDeviceStatus`)
8. Connection statistics

Could be split into: `GatewayService` (gRPC lifecycle), `DeviceConnectionService`
(connect/disconnect/retry), `DeviceManagementService` (DB CRUD + status).

---

### ISSUE 8 — Legacy / Dead Code

**Severity**: Info

- `src/models/Device.js` — Sequelize model, but the project uses Prisma
- `src/utils/logger.js` — Superseded by `src/utils/createLogger.js`
- `src/utils/errors.js` — Duplicates `src/core/errors/AppErrors.js`

---

## 7. Data Flow Examples

### Device Connection (Startup)

```
index.js main()
  └─► bootstrap()
       ├─► PrismaClient → DatabaseManager.initialize()
       ├─► ConnectionService → initializeGateway() [gRPC client setup]
       └─► return container
  └─► createApp(container) → app.listen(:3000)        ◄── HTTP ready
  └─► runPostStartupTasks()
       └─► connectDevices()                             ◄── background, non-blocking
            └─► connectionService.loadAndConnectDevices()
                 ├─► database.getActiveDevices()
                 └─► for each device:
                      └─► connectToDeviceFromDB(device)
                           ├─► check local map
                           ├─► check gateway
                           └─► connectToDevice() [gRPC] × 3 retries
```

### API Request (e.g., GET /api/users/:id/credentials)

```
HTTP Request
  └─► Express middleware (helmet, cors, morgan, json parser, request ID)
       └─► userRoutes(services) => router
            └─► GET /:deviceId/users/:userId
                 ├─► resolveSupremaDeviceId(deviceId, connectionService)
                 └─► userService.getUserCredentials(supremaDeviceId, userId)
                      └─► gRPC → deviceGateway → physical device
                           └─► response → JSON → HTTP 200
```

### Event Sync

```
syncService.syncEvents(deviceId)
  └─► connectionService (resolve Suprema device ID)
       └─► eventService.getEventLog(supremaDeviceId, filters)
            └─► gRPC getEventLog → device
       └─► database.createEvents(events)   ◄── bypasses EventRepository
            └─► prisma.event.createMany()
```

---

## 8. Configuration

Managed by `src/core/config/index.js`, reads from environment variables:

| Category | Key Variables |
|----------|--------------|
| Server | `PORT`, `CORS_ORIGIN`, `NODE_ENV` |
| Database | `DATABASE_URL` (Prisma connection string) |
| Gateway | `GATEWAY_IP`, `GATEWAY_PORT`, `GATEWAY_CA_FILE` |
| Features | `ENABLE_DEVICE_TIME_SYNC`, `USE_SYSTEM_TIMEZONE`, `DEVICE_TIMEZONE_OFFSET` |
| Monitoring | `ENABLE_REALTIME_EVENTS`, `DEVICE_SYNC_INTERVAL`, `DEVICE_RECONNECT_INTERVAL` |

---

## 9. Prisma Schema (Models)

```
Location  ──┐
             │ 1:N
Device    ◄──┘
  │
  ├── Event (synced from device)
  ├── GateEvent (legacy gate access log)
  ├── DeviceEnrollment ──► CardAssignment ──► (employeeId)
  │
User (app auth)
TempAccess (QR-based temporary access)
```

---

## 10. API Surface

13 route groups mounted at `/api/*`:

| Endpoint | Route File | Key Operations |
|----------|-----------|----------------|
| `/api/devices` | deviceRoutes | CRUD, connect, disconnect, search, status |
| `/api/users` | userRoutes | Enroll, sync, credentials, access groups |
| `/api/events` | eventRoutes | Query, sync, real-time monitoring |
| `/api/doors` | doorRoutes | Open, close, lock, schedules |
| `/api/tna` | tnaRoutes | T&A config, work-time logs |
| `/api/biometric` | biometricRoutes | Fingerprint/face/card ops |
| `/api/cards` | cardRoutes | Card assign, revoke, scan |
| `/api/enrollment` | enrollmentRoutes | Full enrollment workflow |
| `/api/hr` | hrRoutes | HR system sync |
| `/api/gate-events` | gateEventRoutes | Gate event queries |
| `/api/employees` | employeeRoutes | Employee view (DB) |
| `/api/locations` | locationRoutes | Location tree CRUD |
| `/api/time` | timeRoutes | Device time sync |
| `/health` | app.js (inline) | Health check |

---

## 11. Improvement Roadmap

| Priority | Issue | Effort | Section |
|----------|-------|--------|---------|
| **P1** | Inject logger into all 6 services | Low | §6.1 |
| **P2** | Route services through repositories instead of DatabaseManager | Medium | §6.2, §6.6 |
| **P2** | Move UserSyncService creation to bootstrap | Low | §6.3 |
| **P3** | Adopt BaseService in domain services | Medium | §6.5 |
| **P3** | Split connectionService into focused classes | Medium | §6.7 |
| **P3** | Create controllers using BaseController | High | §6.4 |
| **P4** | Remove dead code (Device.js, logger.js, errors.js) | Low | §6.8 |
