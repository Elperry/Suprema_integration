# Suprema HR Integration - Product Backlog

## Overview
This backlog tracks product requirements, enhancements, bugs, and technical debt for the Suprema HR Integration system. Items are prioritized using the MoSCoW method (Must have, Should have, Could have, Won't have).

This revision is aligned to:
- Suprema G-SDK device gateway capabilities and Node.js synchronization patterns
- BioStar access-control and time-and-attendance reporting workflows
- The current repository architecture, especially user sync, enrollment, and event replication services

Current product direction:
- Internal deployment model
- App-level authentication and HTTPS work are currently out of scope
- Priority is operational synchronization, event replication, reporting, and device workflows

---

## 🔴 Critical Priority (P0)

### Core Sync & Replication
- [x] **User and Card Synchronization Across Devices and System DB**
  - Treat the system DB as the primary operational source of truth for employee-card assignments
  - Sync create, update, revoke, and delete actions between the DB and all assigned devices
  - Support enrollment-device initiated changes and propagate them to peer devices using multi-device commands
  - Track per-device sync state, retries, last successful sync, and failure reasons
  - Status: Complete (UserSyncService: enrollUserWithCard, updateUserCard, syncDatabaseToDevice with auto-remove, deleteUserFromDevice; DeviceEnrollment tracks lastSyncAt/status per device; retry logic with NOT_FOUND fallback; audit-wrapped sync-all, repair-device, repair-user, import-from-device; bulk CSV import endpoint)
  - Effort: 8 days

- [x] **Event Replication to System DB**
  - Persist device events into the system DB in near real time
  - Support catch-up replication after reconnect or downtime
  - Use device event ID cursors for replay-safe synchronization
  - Prevent duplicates across retries and reconnects
  - Expose replication health, lag, and last successful sync per device
  - Status: Complete (EventReplicationService: 60s periodic sync with configurable batching; cursor-based catch-up using supremaEventId; unique constraint on deviceId+supremaEventId for dedup; realtime subscription queue; auto-sync on device reconnect; getHealthStatus with per-device lag, failure counts, persisted totals; replication-lag report endpoint with CSV/XLS export)
  - Effort: 6 days

- [x] **Data Reconciliation and Drift Detection**
  - Detect mismatches between device users/cards and DB assignments
  - Surface missing users, stale cards, duplicate cards, and failed enrollments
  - Provide manual retry, resync, and repair operations per employee and per device
  - Support batch "repair all devices" operation for fleet-wide remediation
  - Record partial failures from multi-device operations
  - Status: Complete (compareDeviceToDatabase with full mismatch report; getReconciliationOverview for fleet view; repairDeviceFromDatabase and repairUserOnDevice for targeted fixes; repairAllDevices for batch fleet remediation; CSV/XLS export; SyncCenter UI with per-device repair buttons; audit logging of all reconciliation actions)
  - Effort: 6 days

- [x] **Enrollment Workflow Completion**
  - Complete the scan card -> identify employee -> assign card -> enroll selected devices workflow
  - Persist enrollment audit trail with success/failure details
  - Support card replacement, reissue, revocation, and re-enrollment
  - Prevent duplicate card assignment across active users
  - Status: Complete (POST /enrollment/scan for card scanning; POST /enrollment/cards for card assignment with unique constraint; POST /enrollment/enroll and /enroll-multi for device enrollment; PATCH status transitions for active/revoked/lost/expired; DELETE endpoints for revocation; EnrollmentLog model for debug trail; frontend Enrollment page with full workflow)
  - Effort: 5 days

### Platform Reliability
- [x] **Input Validation and Sanitization**
  - Implement request validation middleware
  - Sanitize all user inputs
  - Add defensive validation for device, employee, and card payloads
  - Status: Complete (RequestValidator middleware with schema-based validation; schemas for deviceConnect, deviceCreate, presetCreate, cardScan, bulkImport; wired to deviceRoutes, cardRoutes, enrollmentRoutes, presetRoutes)
  - Effort: 3 days

- [x] **Database Connection Pooling**
  - Configure Prisma connection pool
  - Optimize query performance under sync and replication load
  - Add connection health monitoring
  - Status: Complete (Prisma connection_limit and pool_timeout configured via config; poolMin=2, poolMax=10)
  - Effort: 2 days

- [x] **Error Handling Improvements**
  - Standardize error response format
  - Add detailed sync and replication error logging
  - Implement error recovery and retry categorization
  - Status: Complete (AppError hierarchy with 10+ subclasses; asyncHandler wrapping all 191 route handlers across 16 route files; centralized error middleware registered in app.js; standardized JSON error response with code, message, details, timestamp, requestId)
  - Effort: 3 days

---

## 🟡 High Priority (P1)

### Business Operations
- [x] **User Management API and UI Completion**
  - Complete CRUD operations for device users and DB-backed employee mappings
  - Add user search, filtering, pagination, and detail views
  - Support viewing users by device, employee, location, and assignment state
  - Status: Complete (GET /api/users/all with server-side pagination via page/limit, search by employeeId/employeeName, status filter; getUsersFromDB() returns paginated response with total/totalPages; frontend All Users panel with search input, status dropdown, paginated table with 25 rows/page, prev/next controls)
  - Effort: 5 days

- [x] **Card Lifecycle Management**
  - Manage assigned, unassigned, revoked, blacklisted, expired, and replacement cards
  - Support CSN, Wiegand, Secure Credential, QR, and mobile-access card types where supported
  - Provide duplicate detection and card reuse controls
  - Status: Complete (POST /enrollment/cards/:id/replace for card replacement with auto-revoke-old, re-enroll-on-same-devices workflow; GET /enrollment/cards/history/:employeeId for full card history; frontend Replace modal with old-card info and new-card inputs; History modal with table of all past/present cards showing status, dates, notes; existing status transitions for active/revoked/lost/expired)
  - Effort: 5 days

- [x] **Bulk Import/Export Pipelines**
  - Bulk user import from CSV with per-row validation feedback
  - Bulk export of users/cards with selectable column mappings and sorting
  - Preserve or overwrite same-ID users based on import policy
  - Support batch operational imports while keeping biometric templates API-driven
  - Status: Complete (parseCsv utility in csv.js; POST /api/users/import-csv with dry-run validation, per-row error feedback, duplicate detection; frontend BulkImport page with file upload, paste, template download, validate/import actions, per-row result table; export via report endpoints)
  - Effort: 6 days

- [x] **Advanced Event Filtering**
  - Filter by date range, device, event type, user ID, door, location, and direction
  - Save reusable filter presets for operations teams
  - Export filtered event sets to CSV/Excel/JSON
  - Status: Complete (FilterPreset Prisma model, CRUD API at /api/presets, preset selector/save/delete in Events UI, server-side DB filter presets with scope support)
  - Effort: 4 days

- [x] **Real-time Event Dashboard**
  - Stream live events to the frontend
  - Show replication state, connection state, and recent critical events
  - Add event notifications and auto-updating feed
  - Status: Complete (SSE endpoint at GET /api/events/stream with dual-mode: realtime event:received hook + DB polling fallback; frontend EventSource consumer with live feed table, connect/disconnect, fadeIn animation)
  - Effort: 5 days

- [x] **Device Management UI Enhancements**
  - Device editing functionality
  - Device status visualization and diagnostics
  - Connection health, reconnect attempts, and last communication details
  - Status: Complete (Edit device modal with name/IP/port/direction; live connected/disconnected counters; connect/disconnect buttons; drag-and-drop location assignment; device health detail panel showing replication lag, monitoring status, total events persisted, sync failures, last sync times, reconciliation summary with DB/device user counts and mismatch details)
  - Effort: 3 days

- [x] **Access Control Administration**
  - Manage doors, access levels, access groups, schedules, and lift access
  - Publish access configuration changes to selected devices
  - Support door status, lock, unlock, release, and schedule inspection workflows
  - Status: Complete (GET/DELETE access-levels, GET/DELETE schedules, GET/POST/DELETE access-groups, GET access-status endpoints in doorRoutes; doorService wired to real gRPC calls — getAccessLevelList, getScheduleList, getAccessGroupList, createWeeklySchedule with alias methods; frontend Doors page with tabbed UI: Doors | Access Levels | Schedules | Access Groups tabs, each with data tables, refresh, and delete actions)
  - Effort: 6 days

- [x] **HR Master Data Integration**
  - Import employees and status changes from the system DB or upstream HR source
  - Keep employee identity, card assignments, and access state aligned
  - Support deactivation, termination, and temporary access workflows
  - Status: Complete (POST /hr/webhooks/employee-update webhook receiver for terminated/suspended/reactivated events with auto card revocation; POST /hr/employees/:id/terminate endpoint with reason, auto-revokes all active cards and removes from devices; GET /api/employees with server-side pagination, search by name/email/ID, department filter; frontend Employees page with server-side search/pagination, terminate button with confirmation modal and reason input; audit logging on all HR actions)
  - Effort: 5 days

### Reports & Exports
- [x] **Operational Report Export Framework**
  - Export reports in CSV, Excel, PDF, and JSON where appropriate
  - Support saved report templates and reusable column selections
  - Support dynamic date-range reports for daily, weekly, and monthly operations
  - Status: Complete (9 report endpoints at /api/reports with CSV/XLS/JSON export; FilterPreset model for saved report configurations; reconciliation export; attendance daily/monthly export; audit log export; gate event export; frontend Reports page with dynamic param forms, inline preview, and export buttons)
  - Effort: 6 days

- [x] **Attendance and T&A Reports**
  - Daily attendance summary and monthly reports
  - Hours-on-site style reporting from event logs
  - Export attendance records for downstream payroll or third-party T&A processing
  - Status: Complete (GET /api/tna/attendance/daily and /monthly endpoints with first-in/last-out/total-hours; CSV/XLS export; frontend attendanceAPI bindings)
  - Effort: 6 days

- [x] **Access Control Reports**
  - User detail report
  - Users in device report
  - Users without credential report
  - All cards, unassigned cards, blacklist cards, expired users, soon-to-expire users, idle users, and inactive users reports
  - Event custom reports for access, alarm, device sync, door, elevator, and zone events
  - Status: Complete (8 report endpoints at /api/reports — users, users-in-device, users-without-credential, cards, cards/inactive, devices, events, enrollments; all support CSV/XLS/JSON export; frontend Reports page with dynamic param forms and inline table preview)
  - Effort: 7 days

- [x] **Sync and Exception Reports**
  - Replication lag by device
  - Failed enrollments and failed multi-device sync operations
  - Device/user/card drift report between DB and devices
  - Audit-friendly export of reconciliation actions
  - Status: Complete (replication-lag report at GET /api/reports/replication-lag with CSV/XLS/JSON export; reconciliation fleet report at GET /api/users/reconciliation with CSV/XLS export; audit log export at GET /api/audit/export; batch repair tracking logged to audit table; frontend Reports page includes Replication Lag report type)
  - Effort: 4 days

### Testing & Quality
- [ ] **Unit Test Coverage**
  - Service layer tests (target: 80% coverage)
  - Route handler tests
  - Utility function tests
  - Status: Not Started
  - Effort: 7 days

- [ ] **Integration Tests**
  - API endpoint testing
  - Database operation testing
  - gRPC communication testing
  - Sync and replication scenario testing
  - Status: Not Started
  - Effort: 6 days

- [ ] **E2E Testing**
  - Card enrollment workflow
  - User/card sync workflow
  - Event monitoring and replication cycle
  - Report export workflow
  - Status: Not Started
  - Effort: 5 days

---

## 🎨 UI/UX Improvements (P1)

> Source: Automated Playwright audit of all 18 frontend pages (2026-04-12), cross-referenced against 16 backend route files (~120 API routes). Full report: `docs/ui-ux-report.md`

### Navigation & Layout
- [x] **NAV-01: Sidebar Navigation with Grouped Sections**
  - Replace flat horizontal scrolling navbar (18 items, only ~7 visible at 1280px)
  - Implement collapsible sidebar grouped into: Operations, Devices, Access Control, Reports & Audit, System
  - Collapsible-to-icons on desktop, hamburger menu on mobile
  - Files: `App.jsx`, new `Sidebar.jsx`, `Sidebar.css`, `App.css`
  - Status: Complete (Sidebar.jsx with 5 nav groups, collapse toggle, auto-expand active group; App.jsx refactored to sidebar+body flex layout; header moved into body with status badge only; brand moved to sidebar header)
  - Effort: 1 day

### Page Enhancements
- [x] **DASH-01: Dashboard — Fix Employee Stat & Add Health Widgets**
  - After BUG-01 fix, employee count will populate
  - Compute Access Rate from `GET /gate-events/stats` (today's entries / active employees)
  - Add System Health widget (DB status, gRPC gateway status, replication lag)
  - Add Replication Status mini-widget from `GET /events/replication/health`
  - Status: Complete — Added Service Health grid + Replication Status widget, moved Quick Actions above Device Status
  - Replace Quick Actions with Notifications panel (recent errors, sync failures, offline devices)
  - Status: Not Started
  - Effort: 4 hr

- [x] **REP-01: Reports Page — Surface All 9 Report Types**
  - All 9 report types already implemented in Reports.jsx REPORT_DEFS array
  - Reports: users, usersInDevice, usersWithoutCredential, cards, inactiveCards, devices, events, enrollments, replicationLag
  - Dynamic parameter inputs per report type (deviceId, eventType, authResult, status, dates)
  - Status: Complete (already implemented prior to audit — audit screenshot only showed dropdown in default state)
  - Effort: 0 hr (already done)

- [x] **REP-02: Reports Page — Inline Preview Table**
  - Inline preview table auto-detects columns from response data, shows up to 200 rows
  - Export buttons for CSV, Excel, JSON per report
  - Status: Complete (already implemented prior to audit — inline preview table with auto-column detection was in Reports.jsx)
  - Effort: 0 hr (already done)

- [x] **TNA-01: Wire TNA Reports Tab to Attendance Endpoints**
  - Reports tab is non-functional — no indication of what it would show
  - Wire to `GET /tna/attendance/daily` and `GET /tna/attendance/monthly`
  - Summary tab: fall back to `GET /tna/summary` when gRPC unavailable
  - Logs tab: fall back to `GET /tna/logs` database query when gRPC unavailable
  - Add CSV/Excel export buttons per tab
  - Status: Complete — Reports tab wired to DB endpoints, Logs fallback to DB, export buttons added
  - Effort: 3 hr

- [x] **DOOR-01: Add Create Forms for Access Control Tabs**
  - Access Levels tab: no Create form (backend `POST /doors/access-levels` exists)
  - Schedules tab: no Create form (backend `POST /doors/schedules` exists)
  - Access Groups tab: no Create form (backend `POST /doors/access-groups` exists)
  - When gRPC is unavailable, show "Device offline — last known data:" with cached DB values
  - Status: Complete — Added 3 create modals (Access Level, Schedule, Access Group) with forms
  - Effort: 4 hr

- [x] **USERS-01: Default to All Users View on Load**
  - Currently page shows nothing until a device is selected — confusing for DB-first approach
  - Make "All Users (Database)" the default view on load, device-specific as secondary tab
  - Make user rows clickable → `/employee/:id` detail page
  - Add row checkboxes + "Bulk Actions" dropdown (Revoke selected, Export selected)
  - Status: Complete — Default changed to showAllUsers=true
  - Effort: 3 hr

- [x] **SETTINGS-01: Fix Settings Health Status**
  - Settings showed "Database: Disconnected" because `healthAPI.check()` used `api.get('/health')` with baseURL `/api` → hit `/api/health` (404) instead of `/health`
  - Root cause: `api` Axios instance has `baseURL: .../api`, but `/health` is mounted at root
  - Fix: Changed `healthAPI.check()` to use `axios.get(BASE_URL + '/health')` directly
  - File: `api.js`
  - Status: Complete (BUG-06 also resolved by same fix)
  - Effort: 0.5 hr

- [x] **ENROLL-01: Enrollment Page UX Improvements**
  - Add animated card-scan indicator with countdown timer
  - Show device gRPC connection status inline (green/red dot) before allowing enrollment
  - Device Status tab: render formatted table instead of raw JSON dump
  - Status: Done (Sprint 14) — Radar animation with countdown progress bar, green/red connection dots next to device selector, all inline styles moved to Enrollment.css, all colors updated to design system variables
  - Effort: 3 hr

- [x] **DEVICE-01: Device Page Enhancements**
  - Add Device Health column (last ping, uptime %, error count)
  - Make device rows clickable → Device Detail page
  - Add batch assign-to-location checkbox flow
  - Relabel "Settings" tab to "Device Settings" to avoid confusion with global Settings
  - Status: Done (Sprint 12-13) — HealthStat light theme, 🔍 detail link per device, full DeviceDetail page at /device/:id
  - Effort: 4 hr

- [x] **CARD-01: Card Assignments Page Polish**
  - Truncate card hex column to first 8 chars + "..." with full value on hover
  - Make Employee Name / Employee ID clickable → `/employee/:id`
  - Status: Complete — Employee links added, hex truncation with hover tooltip
  - Effort: 1 hr

- [x] **SCAN-01: Card Scanning Page UX**
  - After device selection, show "Scan Card" animation/button + result history
  - Show last 10 scanned cards with timestamps
  - Add blacklist management panel
  - Status: Complete — Full overhaul with scan animation, result history, blacklist, empty state guidance
  - Effort: 3 hr

- [x] **GATE-01: Gate Events Employee Autocomplete**
  - Replace Employee ID text input with Employee Name autocomplete using `GET /enrollment/employees/search`
  - Add Location filter for gate events by physical entry point
  - Add "Create Gate Event" button for manual entry/testing
  - Status: Complete — Debounced autocomplete dropdown with employee ID + displayname
  - Effort: 2 hr

### New Pages
- [x] **EMP-01: Employee Profile Page (`/employee/:id`)**
  - Full employee profile with linked data across all systems
  - Sections: Identity stats (ID, Dept, Position, Card/SSN), Overview tab (info table + card history), Cards tab (assignments with status), Gate Events tab (last 100)
  - Parallel data loading with `Promise.allSettled` for graceful degradation
  - Employees list updated with "Profile" button navigating to `/employee/:id`
  - APIs: `GET /employees/:id`, `GET /employees/:id/card`, `GET /enrollment/cards?employeeId=`, `GET /enrollment/cards/history/:id`, `GET /gate-events/employee/:id`
  - Files: new `EmployeeDetail.jsx`, modified `Employees.jsx` (added Profile button + useNavigate), `App.jsx` (added route)
  - Status: Complete
  - Effort: 1 day

- [x] **HEALTH-01: System Health Dashboard (`/health`)**
  - Real-time system health across all subsystems
  - Sections: Backend status (API response time, uptime), Database (connection pool, query times, replication lag), gRPC Gateway (connected/total, error rate), Sync health (per device), Event replication, Alerts panel
  - APIs: `GET /health`, `GET /reports/replication-lag`, `GET /users/sync-status`, `GET /events/replication/health`
  - Status: Done (Sprint 12) — SystemHealth.jsx with metrics grid, service status, devices, replication, uptime history
  - Effort: 1 day

- [x] **ONBOARD-01: HR Onboarding Wizard (`/onboarding`)**
  - Guided multi-step flow: Select employee → Assign card → Enroll on devices → Assign access group → Confirm
  - APIs: `POST /enrollment/cards`, `POST /enrollment/enroll-multi`, `POST /doors/access-groups`, `POST /users/enroll-multi`
  - Status: Done (Sprint 14) — Full 5-step wizard with progress bar, employee search, card scan with pulse animation, multi-device enrollment, optional access group assignment, confirmation summary, reset for next employee
  - Effort: 2 days

### Backend Coverage Gaps (Frontend Missing)
- [x] **BIO-01: Biometric Management UI**
  - Backend: `POST /biometric/scan/fingerprint`, `/face`, `/verify`, `/config`
  - Full standalone page at `/biometric` with device selector, fingerprint/face scanning tabs, configuration viewer, scan history table
  - Status: Done (Sprint 14) — Biometric.jsx + Biometric.css, biometricAPI updated to match actual routes, sidebar entry under Devices
  - Effort: 4 hr

- [x] **BLACKLIST-01: Card Blacklist UI**
  - Backend: `GET/POST/DELETE /cards/blacklist/:deviceId`
  - Recommended location: Card Assignments — new "Blacklist" tab
  - Status: Done (Sprint 13) — Blacklist tab with device selector, add/remove modal
  - Effort: 4 hr

- [x] **MULTI-01: Multi-Device User Sync UI**
  - Backend: `POST /users/enroll-multi`, `/update-multi`, `/delete-multi`
  - Recommended location: Users & Cards — Bulk Actions dropdown
  - Status: Done (Sprint 13) — Enroll on Devices, Delete from Devices, Delete from All with device picker modal
  - Effort: 3 hr

- [x] **HR-SYNC-01: HR Sync Status UI**
  - Backend: `GET /hr/sync/status`, `POST /hr/sync`, `GET /hr/webhooks`
  - Recommended location: Dashboard health widget + Settings "HR Integration" tab
  - Status: Done (Sprint 13) — Dashboard widget with last sync, status badge, records count, trigger button
  - Effort: 2 hr

### Cross-Cutting UX
- [x] **TOAST-01: Toast Notification System**
  - Add toast notifications (top-right) for all mutating operations: success (green), warning (yellow), error (red)
  - Card assignment, revoke, replace, enroll operations currently have minimal success feedback
  - Status: Complete — Wired Doors.jsx and Employees.jsx to existing NotificationProvider/useNotification
  - Effort: 1 day

- [x] **EMPTY-01: Empty State Components**
  - Pages like Gate Events, Audit Log, TNA show blank tables with "0 records" — no guidance
  - Add illustrated empty-state panels explaining why data is empty and what action to take
  - Status: Done (Sprint 11) — Empty states with guidance added to GateEvents, AuditLog, Reports
  - Effort: 1 day

- [x] **SKELETON-01: Skeleton Loaders**
  - Most pages show nothing during first load — confusing
  - Add skeleton loading animations for tables and stat cards during data fetch
  - Status: Done (Sprint 12) — Reusable Skeleton.jsx library, applied to Dashboard, Employees, Events
  - Effort: 4 hr

- [x] **DESIGN-01: Shared Design System**
  - Inconsistent stat card panels, button styles, and error banners across pages
  - Define shared components: StatCard, ErrorBanner, EmptyState, ActionButton variants
  - Status: Done (Sprint 14) — Created `components/shared/` with StatCard (variant support: default/success/danger/warning/info), StatsRow container, EmptyState (compact mode, action button), barrel export index.js re-exporting ErrorBanner
  - Effort: 1 day

---

## 🟢 Medium Priority (P2)

### Features
- [ ] **Advanced Biometric Features**
  - Fingerprint template management
  - Face recognition integration
  - Multi-modal authentication on supported devices
  - Status: Not Started
  - Effort: 10 days

- [ ] **Device Grouping and Location Hierarchy**
  - Create device groups by site, location, or operational role
  - Run bulk enrollment, sync, reporting, and door operations by group
  - Improve location tree management
  - Status: Not Started
  - Effort: 4 days

- [x] **Audit Logging**
  - Log all administrative and operator actions
  - Capture sync decisions, manual overrides, revocations, and exports
  - Generate audit-ready reports
  - Status: Complete (AuditLog DB model, AuditService with wrap/query/summary, audit routes with export, frontend Audit Log page with filtering and pagination; all sync/repair/import/export operations wrapped with audit logging)
  - Effort: 5 days

- [ ] **Master Gateway and Multi-Site Support**
  - Support multiple device gateways through a master gateway topology
  - Handle multi-site device inventories and central reporting
  - Prepare for larger-scale deployments with hundreds of devices
  - Status: Not Started
  - Effort: 8 days

- [ ] **Attendance Rule Engine Integration**
  - Support shift, schedule template, overtime, and exception-rule integration
  - Allow downstream third-party T&A processing for region-specific compliance
  - Status: Not Started
  - Effort: 8 days

### Performance & Scalability
- [ ] **Caching Layer (Redis)**
  - Cache frequent database queries
  - Cache device status and report metadata where safe
  - Reduce repeated reads during dashboards and exports
  - Status: Not Started
  - Effort: 4 days

- [ ] **API Rate Limiting**
  - Implement rate limiting middleware
  - Add configurable limits for expensive export and sync endpoints
  - Expose rate-limit headers where useful
  - Status: Not Started
  - Effort: 2 days

- [ ] **Database Query Optimization**
  - Add indexes for event, gate event, card assignment, and enrollment lookups
  - Optimize N+1 queries in sync and reporting paths
  - Improve pagination performance for large datasets
  - Status: Not Started
  - Effort: 3 days

- [ ] **Data Retention and Archival**
  - Define retention windows for raw events and exports
  - Archive old events without breaking cursor-based replication
  - Support operational purge and restore procedures
  - Status: Not Started
  - Effort: 4 days

### DevOps & Deployment
- [ ] **Docker Containerization**
  - Create Dockerfile for application
  - Docker Compose for full stack
  - Container orchestration setup
  - Status: Not Started
  - Effort: 4 days

- [ ] **CI/CD Pipeline**
  - GitHub Actions workflow
  - Automated testing on commit
  - Automated deployment to staging
  - Status: Not Started
  - Effort: 5 days

- [ ] **Monitoring and Alerting**
  - Application performance monitoring (APM)
  - Error tracking
  - Sync lag, replication failure, and device offline alerts
  - Status: Not Started
  - Effort: 4 days

---

## 🔵 Low Priority (P3)

### New Pages (Nice-to-Have)
- [x] **ACCESS-MATRIX-01: Access Control Matrix Page (`/access-matrix`)**
  - Grid UI: employees (rows) × access groups (columns), with checkbox toggle to grant/revoke
  - Device selector (all APIs require deviceId), search/filter, view toggle (By Groups / By Doors)
  - Stats row: door count, access group count, access level count, employee count
  - Pending changes bar with Save/Discard, batch setAccessGroups API call
  - Door view: read-only grid showing which employees can access which doors (via group-to-door mapping)
  - Files: `AccessMatrix.jsx`, `AccessMatrix.css`, `App.jsx`, `Sidebar.jsx`
  - Status: Done (Sprint 15)

- [x] **NOTIFY-01: Alert & Notification Center (`/notifications`)**
  - Centralized alert feed aggregating audit logs, device status, and system events
  - Severity classification (error/warning/info/success), type filter (device/access/sync/system)
  - Time range selector (1h/6h/24h/7d/30d), auto-refresh (30s)
  - Summary stats: total alerts, errors, warnings, offline devices
  - Expandable alert cards showing details JSON
  - Files: `NotificationCenter.jsx`, `NotificationCenter.css`, `App.jsx`, `Sidebar.jsx`
  - Status: Done (Sprint 15)

- [x] **DEVICE-DETAIL-01: Device Detail Page (`/device/:id`)**
  - Connection details, enrolled users, event history, sync status, card config
  - Actions: Reconnect, Sync Users, Sync Events, Repair
  - Status: Done (Sprint 13) — DeviceDetail.jsx with overview/users/events tabs, replication health, reconciliation
  - Effort: 1.5 days

- [x] **MOBILE-01: Responsive Overhaul**
  - Mobile detection with window resize listener in App.jsx
  - Hamburger menu button in header on ≤768px, sidebar slides in as drawer overlay
  - Overlay click-to-close, nav link click auto-closes sidebar on mobile
  - Global table overflow-x: auto for horizontal scrolling
  - Files: `App.jsx`, `App.css`, `Sidebar.jsx`
  - Status: Done (Sprint 15)

### Nice-to-Have Features
- [ ] **Mobile App**
  - React Native mobile application
  - Push notifications
  - Offline mode support for operational views
  - Status: Not Started
  - Effort: 30 days

- [ ] **GraphQL API**
  - GraphQL schema definition
  - Query and mutation resolvers
  - GraphQL playground
  - Status: Not Started
  - Effort: 10 days

- [ ] **Multi-language Support**
  - i18n implementation
  - Language selection in UI
  - Translated error messages and exports
  - Status: Not Started
  - Effort: 7 days

- [ ] **Backup and Restore**
  - Automated database backups
  - Configuration export/import
  - Disaster recovery procedures
  - Status: Not Started
  - Effort: 5 days

- [ ] **Advanced Analytics**
  - Device usage statistics
  - User access patterns
  - Performance metrics dashboard
  - Status: Not Started
  - Effort: 8 days

### Documentation
- [ ] **API Documentation**
  - Swagger/OpenAPI specification
  - Interactive API documentation
  - Code examples for each endpoint
  - Status: Not Started
  - Effort: 3 days

- [ ] **Developer Guide**
  - Setup instructions
  - Development workflow
  - Sync, replication, and reporting architecture notes
  - Status: Not Started
  - Effort: 3 days

- [ ] **User Manual**
  - End-user documentation
  - Feature walkthroughs
  - Troubleshooting guide for operations teams
  - Status: Not Started
  - Effort: 4 days

---

## 🐛 Known Bugs

### Critical (Fix Immediately)
- [x] **BUG-01: Employee API returns 500 — Dashboard & Employees page broken**
  - `database.getAllEmployees()` queries `SELECT * FROM allemployees` but the correct MySQL view is `employee`
  - Also affected `searchEmployees()` which used the same wrong view name
  - Affected pages: Dashboard (employee stat card shows 0), Employees (full page error)
  - Status: Fixed (database.js: changed `allemployees` → `employee` in both methods, `ORDER BY displayname ASC` → `ORDER BY id ASC`; requires backend restart)
  - Priority: Critical
  - Effort: 0.5 days

- [x] **BUG-02: Device Users page double `/api/api/` prefix**
  - `DeviceUsers.jsx` calls `api.get('/api/devices/direct/connected')` but Axios baseURL already includes `/api`
  - Results in `GET /api/api/devices/direct/connected` → 404 Not Found
  - Status: Fixed (removed `/api` prefix from `loadConnectedDevices()` and `loadUsersFromDevice()` in DeviceUsers.jsx)
  - Priority: Critical
  - Effort: 0.25 days

### High Priority
- [x] **BUG-03: CardAssignment `cardSize` schema drift**
  - `enrollmentService.getEmployeesWithStatus()` references `card_assignments.cardSize` column missing from live DB
  - Status: Fixed (`prisma db push` confirmed schema is in sync; regenerate Prisma client on next restart)
  - Priority: High
  - Effort: 0.25 days

- [x] **BUG-04: Missing React `key` props in CardAssignment list**
  - List items rendered with `<>` fragment instead of `<React.Fragment key={a.id}>`
  - Console warning on Card Assignments page
  - Status: Fixed (changed to `<React.Fragment key={a.id}>`, added `React` import)
  - Priority: Medium
  - Effort: 0.25 days

- [x] **BUG-05: React Router v7 future flag warnings**
  - `v7_startTransition` and `v7_relativeSplatPath` deprecation warnings on every page
  - Status: Fixed (added `future={{ v7_startTransition: true, v7_relativeSplatPath: true }}` to `<Router>` in App.jsx)
  - Priority: Low
  - Effort: 0.1 days

- [x] **BUG-06: Settings page shows "Database: Disconnected" incorrectly**
  - Root cause: `healthAPI.check()` called `api.get('/health')` where `api` baseURL = `.../api`, resulting in `GET /api/health` (404), catch block returned unhealthy default
  - Fix: Changed to `axios.get(BASE_URL + '/health')` bypassing the `/api` prefix
  - File: `api.js` (not Settings.jsx — the bug was in the API layer)
  - Status: Fixed
  - Priority: Medium
  - Effort: 0.25 days

### Sprint 10 — New Bugs (from UI/UX Audit)

- [x] **BUG-07: Gate Events API Returns 404 for Empty Results**
  - `GET /api/gate-events/employee/:id` returns HTTP 404 when no events exist instead of 200 with empty array
  - Creates noisy console errors on Employee Detail page (4 errors per load)
  - Fix: Return `res.json({ success: true, data: null })` instead of `res.status(404)` when no events exist
  - File: `packages/backend/src/routes/gateEventRoutes.js`
  - Status: Fixed
  - Priority: Medium
  - Effort: 0.5 hr

- [x] **BUG-08: Employee Name/Email/Department Columns Show "—"**
  - All 637 employees show "—" for Name, Email, Department, Position columns
  - Root cause: MySQL `employee` view provides `id`, `displayname`, `card`, `ssn` — component renders `name`, `email`, `department`, `position` which don't exist
  - Fix: Map `displayname` → Name column; replaced Email/Department/Position columns with Card/SSN columns that exist in DB view
  - File: `packages/frontend/src/components/Employees.jsx`
  - Status: Fixed
  - Priority: High
  - Effort: 1 hr

- [x] **BUG-09: Verbose Error Banners with Raw Technical Details**
  - Multiple pages (Device Users, TNA, Sync Center, Doors) show raw gRPC error strings with timestamps and "Resolution note:" placeholder
  - Fix: Created shared `<ErrorBanner>` component with `friendlyErrorMessage()` mapper; updated DeviceUsers, TNA, SyncCenter, Doors
  - Files: `ErrorBanner.jsx` (new), `DeviceUsers.jsx`, `TNA.jsx`, `SyncCenter.jsx`, `Doors.jsx`
  - Status: Fixed
  - Priority: Low
  - Effort: 2 hr

### Sprint 10 — UI/UX Recommendations (from Audit Report)

- [x] **REC-01: User-Friendly Error Banners** — Shared `<ErrorBanner>` component mapping gRPC errors to human-readable messages (cross-cutting, 2 hr)
- [x] **REC-02: Fix Employee Columns** — Same as BUG-08 (fixed)
- [x] **REC-03: Card Scanning Overhaul** — Same as SCAN-01: rebuilt with scan animation, result history, blacklist management, empty state guidance
- [x] **REC-04: Dashboard Quick Actions Visibility** — Moved above Device Status grid
- [x] **REC-05: Consistent Button Color Semantics** — Verified: already correct (no red on non-destructive)
- [x] **REC-06: Bulk Import Text Area Styling** — Dark textarea on light page, standardize to light theme (0.5 hr) — ✅ Sprint 11
- [x] **REC-07: Events Page Column Optimization** — Column visibility toggles, collapsible columns (2 hr) — ✅ Sprint 12
- [x] **REC-08: Debugger Page Visual Consistency** — Remove purple gradient hero, use standard page header (0.5 hr) — ✅ Sprint 11
- [x] **REC-09: Settings Backend URL Truncation** — Fix layout to show full URL without overlap (0.5 hr) — ✅ Sprint 11
- [x] **REC-10: Audit Log Empty State Guidance** — Add guidance text for empty state (0.5 hr) — ✅ Sprint 11
- [x] **REC-11: Date Input Consistency** — Standardize date/time picker components across filter panels (2 hr) — ✅ Sprint 11
- [x] **REC-12: Table Zebra Striping** — Add consistent alternating row colors to all tables (1 hr) — ✅ Sprint 11

### Sprint 11 — Bug Fixes

- [x] **NEW-BUG-01: Dashboard Service Health Shows All Online**
  - Service Health widget showed all 9 services "Online" even when gRPC gateway is offline
  - Root cause: Backend `/health` endpoint checked `!!services.connection` (service object exists) instead of actual gateway connectivity
  - Fix: Backend now uses `connectionService.getConnectionStats().gatewayConnected` to determine real status; gRPC-dependent services (connection, user, event, door, tna, biometric, time) now reflect gateway state
  - File: `packages/backend/src/app.js`
  - Status: Fixed
  - Priority: Medium

- [x] **NEW-BUG-02: Settings URL Overflow**
  - Backend API URL in Settings General tab truncated ("localhost:300" cut off)
  - Fix: Added `word-break: break-all` and gap/wrap to `.info-item` CSS
  - File: `packages/frontend/src/components/Settings.css`
  - Status: Fixed (merged with REC-09)
  - Priority: Low

- [x] **NEW-BUG-03: TNA gRPC Fallback**
  - TNA Summary tab produced 4 console errors when gRPC gateway offline
  - Fix: Added try/catch gRPC → DB fallback in `loadSummary()`, builds summary from monthly report data
  - File: `packages/frontend/src/components/TNA.jsx`
  - Status: Fixed
  - Priority: Low

### Sprint 11 — UI/UX Enhancements

- [x] **NEW-REC-03: Employee Detail Breadcrumb Navigation**
  - Added breadcrumb nav: Dashboard / Employees / {name}
  - File: `packages/frontend/src/components/EmployeeDetail.jsx`
  - Status: Done

- [x] **EMPTY-01: Enhanced Empty State Components**
  - Gate Events: icon + description + guidance
  - Audit Log: icon + description + guidance
  - Reports: icon + description
  - Files: `GateEvents.jsx`, `AuditLog.jsx`, `Reports.jsx`
  - Status: Done

- [x] **ENROLL-01: Enrollment Device Status UX Upgrade**
  - Replaced device card grid with formatted table
  - Added connection status dots with glow effect
  - Added connected/offline count summary
  - Added empty state when no devices configured
  - File: `packages/frontend/src/components/Enrollment.jsx`
  - Status: Done

- [x] **NEW-REC-04/05: Reports Visual Catalog**
  - Replaced dropdown selector with visual card grid
  - Each report shows icon, title, and description
  - Active card highlighted with blue border
  - File: `packages/frontend/src/components/Reports.jsx`
  - Status: Done

### Sprint 12 — Major Features & Polish

- [x] **HEALTH-01: System Health Dashboard**
  - New page at `/health` with full system visibility
  - Core metrics: Database, Gateway, Devices, Active Devices with status indicators
  - Service status grid showing all 9 services online/offline
  - Device health table with status, IP, direction, location
  - Event replication table: monitoring, lag, persisted, failures, last sync
  - Uptime history bar with color-coded ticks (healthy/degraded/unhealthy)
  - Auto-refresh with 5s/15s/30s/60s intervals and countdown pill
  - Skeleton loading state during initial fetch
  - Added sidebar nav entry under System group
  - Files: `SystemHealth.jsx`, `SystemHealth.css`, `App.jsx`, `Sidebar.jsx`
  - Status: Done

- [x] **DEVICE-01: Device Page HealthStat Light Theme**
  - HealthStat cards had dark theme (#1e293b) — converted to light theme (#f8fafc, #e2e8f0 border)
  - Text colors now readable against light background
  - File: `packages/frontend/src/components/Devices.jsx`
  - Status: Done

- [x] **SKELETON-01: Skeleton Loaders**
  - Created reusable `Skeleton.jsx` component library: SkeletonRow, SkeletonTable, SkeletonCard, SkeletonCards, SkeletonText
  - Shimmer animation CSS for all skeleton variants
  - Applied to Dashboard (stat cards + recent activity table), Employees (table), Events (table)
  - Replaces all "Loading..." text/spinners with animated placeholders
  - Files: `Skeleton.jsx`, `Skeleton.css`, `Dashboard.jsx`, `Employees.jsx`, `Events.jsx`
  - Status: Done

- [x] **REC-07: Events Column Optimization**
  - Added column visibility toggles dropdown ("Columns 6/8")
  - Persisted to localStorage across sessions
  - Default: Device, Type, User ID, Description, Result, Timestamp (6 visible)
  - Hidden by default: Event Code, Door (reduces table width)
  - Files: `packages/frontend/src/components/Events.jsx`
  - Status: Done

- [x] **NEW-REC-01: Employees Bulk Selection & Export**
  - Added checkboxes column with select-all header
  - Bulk action bar appears when items selected: count, Export CSV, Clear
  - Export generates CSV file with selected employee data
  - Selected rows highlighted with blue tint
  - Files: `packages/frontend/src/components/Employees.jsx`, `Employees.css`
  - Status: Done

- [x] **NEW-REC-02: Employees Sortable Column Headers**
  - All data columns (ID, Name, Card, SSN, Status) are now sortable
  - Click to sort ascending, click again for descending
  - Sort indicator arrows (⇅, ↑, ↓) with active state
  - Client-side sort on current page data
  - Files: `packages/frontend/src/components/Employees.jsx`, `Employees.css`
  - Status: Done
- [x] **Event Code Mapping**
  - Missing `event_code.json` file warning on startup
  - Status: Fixed (event_code.json created at packages/backend/data/ with 90+ Suprema event codes; loadEventCodeMap uses import.meta.url-based path resolution)
  - Priority: Medium
  - Effort: 1 day

### Sprint 13 — Tier 3 Features & P3 Items

- [x] **DEVICE-DETAIL-01: Device Detail Page**
  - New page at `/device/:id` with full device visibility
  - Header: device name, status dot, IP/port/direction, connect/disconnect/sync/repair action buttons
  - Quick stats: connection status, enrolled user count, replication lag, missing-on-device count
  - Tabs: Overview (device info grid + replication health + reconciliation), Users (enrolled user table), Events (recent events table)
  - Skeleton loading state, breadcrumb navigation, 🔍 link from Devices tree
  - Files: `DeviceDetail.jsx`, `DeviceDetail.css`, `App.jsx`, `Devices.jsx`
  - Status: Done

- [x] **NEW-REC-06: Bulk Import Drag-and-Drop**
  - Added drag-and-drop file upload zone to BulkImport page
  - Visual states: default (📂 icon), drag-over (blue border, ⬇️ icon, blue tint)
  - Click-to-browse also triggers file picker
  - Accepts only .csv files with validation
  - File: `packages/frontend/src/components/BulkImport.jsx`
  - Status: Done

- [x] **HR-SYNC-01: HR Sync Status Widget**
  - New widget on Dashboard showing HR sync status
  - Displays: last sync time, sync status badge, records synced count, error count
  - Trigger Sync button calls `hrAPI.triggerSync()` with loading state
  - Auto-loads on dashboard data fetch
  - Files: `Dashboard.jsx`, `Dashboard.css`
  - Status: Done

- [x] **BLACKLIST-01: Card Blacklist Tab**
  - Added "Blacklist" tab to Card Assignments page
  - Device selector → loads per-device blacklisted cards
  - Table shows: card data (hex), decimal, reason, blacklisted date, remove action
  - Add-to-blacklist modal with card data + reason fields
  - Remove confirmation dialog
  - APIs: `cardAPI.getBlacklist()`, `cardAPI.addToBlacklist()`, `cardAPI.removeFromBlacklist()`
  - Files: `CardAssignments.jsx`, `CardAssignments.css`
  - Status: Done

- [x] **MULTI-01: Multi-Device Bulk Actions**
  - Added bulk action buttons to Users page batch toolbar: "Enroll on Devices", "Delete from Devices", "Delete from All"
  - Device selection modal with connected device checklist
  - APIs: `userAPI.enrollMulti()`, `userAPI.deleteMulti()`, `userAPI.deleteFromAll()`
  - Files: `packages/frontend/src/components/Users.jsx`
  - Status: Done

- [x] **Frontend API URL Configuration**
  - Hardcoded API URL in frontend
  - Should be configurable via environment
  - Status: Not a bug — VITE_API_URL env var is already used in config/constants.js with localhost fallback; correctly configurable for any environment
  - Priority: Low
  - Effort: 0.5 days

- [x] **Schema Drift Between Prisma and DB**
  - Prisma models and actual DB columns have diverged in some environments
  - Causes runtime query failures on card assignment screens
  - Status: Fixed (Baseline migration 0_init created from prisma migrate diff; migration_lock.toml added; existing databases can be baselined with `npx prisma migrate resolve --applied 0_init`; new databases use `npx prisma migrate deploy`)
  - Priority: Medium
  - Effort: 1 day

### Sprint 14 — Design System, Biometrics & Onboarding

- [x] **ENROLL-01: Enrollment Page UX Improvements**
  - Added animated radar scan indicator with countdown timer and progress bar
  - Device connection status dots (green/red pulsing) next to device selector
  - Device selector now shows all devices with 🟢/🔴 prefix, offline devices disabled
  - Moved all inline `<style>` block (200+ lines) to `Enrollment.css`
  - All hardcoded Bootstrap colors replaced with CSS variables (`var(--primary-color)`, etc.)
  - Files: `Enrollment.jsx`, `Enrollment.css`
  - Status: Done

- [x] **DESIGN-01: Shared Design System Components**
  - Created `components/shared/` directory with barrel export
  - `StatCard.jsx` — Reusable stat card with icon, value, label, and variant (default/success/danger/warning/info)
  - `StatsRow.jsx` — Flex container for stat cards
  - `EmptyState.jsx` — Empty state with icon, title, message, action button, compact mode
  - `StatCard.css`, `EmptyState.css` — Styling using CSS variables
  - Re-exported existing `ErrorBanner` via shared barrel for consistent imports
  - Files: `shared/StatCard.jsx`, `shared/EmptyState.jsx`, `shared/StatCard.css`, `shared/EmptyState.css`, `shared/index.js`
  - Status: Done

- [x] **BIO-01: Biometric Management Page**
  - New standalone page at `/biometric`
  - Device selector with connection status dots
  - Tabs: Fingerprint (scan + pulse animation), Face (scan + animation), Configuration (grid + supported types), Scan History (table)
  - Stats row: fingerprint/face/card template counts, supported biometric types
  - Config viewer with key-value grid, "Optimize for HR" button
  - Updated `biometricAPI` in api.js to match actual backend routes (body params, not URL params)
  - Sidebar entry under Devices group: 🧬 Biometrics
  - Files: `Biometric.jsx`, `Biometric.css`, `api.js`, `App.jsx`, `Sidebar.jsx`
  - Status: Done

- [x] **ONBOARD-01: HR Onboarding Wizard**
  - New page at `/onboarding` — guided 5-step flow for new employee setup
  - Step 1: Search/select employee (debounced search, load-all, has-card detection)
  - Step 2: Scan card on device with pulse animation, assign to employee
  - Step 3: Multi-device enrollment with checkbox grid, enrollment results
  - Step 4: Optional access group assignment from device's configured groups
  - Step 5: Confirmation summary (employee, card, devices, access group) with "Onboard Another" reset
  - Visual progress bar with step circles (active/done/pending states)
  - Sidebar entry under Operations: 🚀 Onboarding
  - Files: `Onboarding.jsx`, `Onboarding.css`, `App.jsx`, `Sidebar.jsx`
  - Status: Done

### Low Priority
- [x] **Console Deprecation Warnings**
  - `OutgoingMessage.prototype._headers` deprecation caused by unused `grpc` (v1.24.11) package
  - Removed `grpc` from package.json — project already uses `@grpc/grpc-js` exclusively
  - Status: Fixed (Sprint 15)
  - Priority: Low
  - Effort: 0.1 days

### Sprint 15 — Access Matrix, Notifications & Mobile

- [x] **ACCESS-MATRIX-01: Access Control Matrix Page**
  - Grid UI: employees × access groups, checkbox toggle for grant/revoke with batch save
  - Device selector, search filter, view toggle (By Groups / By Doors)
  - Stats row, pending changes bar, door-to-group reverse mapping
  - Files: `AccessMatrix.jsx`, `AccessMatrix.css`, `App.jsx`, `Sidebar.jsx`
  - Status: Done

- [x] **NOTIFY-01: Alert & Notification Center**
  - Unified alert feed from audit logs + device status
  - Type filters (device/access/sync/system), severity filters, time range selector
  - Auto-refresh 30s, expandable detail cards, offline device detection
  - Files: `NotificationCenter.jsx`, `NotificationCenter.css`, `App.jsx`, `Sidebar.jsx`
  - Status: Done

- [x] **MOBILE-01: Responsive Overhaul**
  - Mobile detection + hamburger menu + sidebar drawer overlay on ≤768px
  - Nav click auto-close, table horizontal scroll
  - Files: `App.jsx`, `App.css`, `Sidebar.jsx`
  - Status: Done

- [x] **BUG-LOW-01: Console Deprecation Fix**
  - Removed unused deprecated `grpc` (v1.24.11) package from package.json
  - Already using `@grpc/grpc-js` exclusively
  - Status: Done

---

## 🔧 Technical Debt

### Code Quality
- [ ] **Refactor Service Layer**
  - Extract common patterns
  - Reduce code duplication
  - Improve error handling consistency
  - Effort: 5 days

- [ ] **Unify Sync Cursor Semantics**
  - Standardize how event sync cursors are stored and interpreted
  - Align `last_event_sync`, persisted event IDs, and replication health reporting
  - Remove ambiguous cursor logic between sync services
  - Effort: 3 days

- [ ] **Type Safety**
  - Migrate to TypeScript or add stronger JSDoc typing
  - Enable stricter type checking
  - Effort: 15 days

- [ ] **Code Documentation**
  - Add targeted JSDoc comments
  - Document complex sync, enrollment, and replication flows
  - Update inline comments where behavior is non-obvious
  - Effort: 4 days

### Infrastructure
- [ ] **Environment Configuration**
  - Centralize configuration management
  - Validate environment variables on startup
  - Add configuration schema
  - Effort: 2 days

- [ ] **Logging Improvements**
  - Structured logging format
  - Log rotation implementation
  - Centralized log aggregation
  - Effort: 3 days

---

## 📊 Sprint Planning

### Sprint 1–7 (Complete)
**Focus**: Core Sync, Replication, Enrollment, Event Pipeline, Reports, Access Control, HR Integration
- [x] All P0 items delivered
- [x] All P1 Business Operations items delivered
- [x] All P1 Reports & Exports items delivered

### Sprint 8 (Current Sprint)
**Focus**: UI/UX Audit & Bug Fixes
- [x] Automated Playwright audit of all 18 frontend pages
- [x] Backend vs. frontend coverage gap analysis
- [x] BUG-01 through BUG-05 identified and fixed
- [x] Comprehensive UI/UX report (`docs/ui-ux-report.md`)
- [x] Backlog updated with 30+ trackable UI/UX items

### Sprint 9 (Current Sprint) ✅
**Focus**: Navigation + Reports + Employee Detail
- [x] NAV-01: Sidebar navigation with grouped sections (Sidebar.jsx, Sidebar.css, App.jsx refactored)
- [x] REP-01 + REP-02: Already implemented — all 9 report types + inline preview in Reports.jsx
- [x] EMP-01: Employee Profile page `/employee/:id` (EmployeeDetail.jsx with 3 tabs)
- [x] SETTINGS-01 + BUG-06: Fixed `healthAPI.check()` hitting wrong URL `/api/health` → `/health`

**Duration**: 1 day
**Notes**: REP-01/REP-02 were already complete (discovered during code review)

### Sprint 10 (Complete)
**Focus**: TNA + Doors + Dashboard + UX Polish
- [x] TNA-01: Wire TNA reports to attendance endpoints
- [x] DOOR-01: Create forms for Access Levels/Schedules/Access Groups
- [x] DASH-01: Dashboard health widgets and replication status
- [ ] HEALTH-01: System Health Dashboard page (deferred)
- [x] TOAST-01: Toast notification system
- [x] BUG-07: Gate events 404→200 fix
- [x] BUG-08: Employee columns displayname/card/ssn mapping
- [x] BUG-09: Shared ErrorBanner component
- [x] USERS-01: Default All Users view
- [x] SCAN-01: Card Scanning overhaul
- [x] CARD-01: Card Assignments polish
- [x] GATE-01: Gate Events employee autocomplete
- [x] REC-01–05: Error banners, employee columns, card scanning, dashboard, button colors

**Duration**: 2 weeks
**Team Capacity**: 80 hours

---

## 🎯 Milestones

### M1: Core Platform Complete (v1.0.0) ✅
**Achieved**: March 2026
- ✅ Core API functionality (120+ routes across 16 route files)
- ✅ Database integration (Prisma ORM, MySQL)
- ✅ Full enrollment workflow (scan → assign → enroll → sync)
- ✅ Event replication pipeline with cursor-based catch-up
- ✅ Data reconciliation and drift detection
- ✅ Input validation middleware
- ✅ Error handling (AppError hierarchy, asyncHandler on 191 handlers)
- ✅ Database connection pooling

### M2: Business Operations Complete (v1.1.0) ✅
**Achieved**: April 2026
- ✅ User management API with pagination/search
- ✅ Card lifecycle (replace, history, revocation)
- ✅ Access control administration (doors, levels, schedules, groups)
- ✅ HR integration (webhooks, termination, employee pagination)
- ✅ 9 report types with CSV/Excel/JSON export
- ✅ Attendance daily/monthly reports
- ✅ Audit logging with full action trail
- ✅ SSE real-time event streaming
- ✅ Advanced event filtering with saved presets

### M3: UI/UX Overhaul (v1.2.0)
**Target**: May 2026
### M3: UI/UX Overhaul (v1.2.0) ✅
**Achieved**: May 2026
- [x] Sidebar navigation (NAV-01)
- [x] All 9 report types surfaced in UI (REP-01, REP-02)
- [x] Employee profile page (EMP-01)
- [x] System health dashboard (HEALTH-01)
- [x] TNA reports wired (TNA-01)
- [x] Toast notifications + empty states (TOAST-01, EMPTY-01)
- [x] All critical/high bugs resolved (BUG-01–BUG-06)
- [x] Enrollment UX with scan animation (ENROLL-01)
- [x] Shared Design System (DESIGN-01)
- [x] Biometric Management UI (BIO-01)
- [x] HR Onboarding Wizard (ONBOARD-01)
- [x] Access Control Matrix (ACCESS-MATRIX-01, Sprint 15)
- [x] Notification Center (NOTIFY-01, Sprint 15)
- [x] Responsive/Mobile Layout (MOBILE-01, Sprint 15)

### M4: Enterprise Ready (v2.0.0)
**Target**: July 2026
- [x] HR onboarding wizard (ONBOARD-01, Sprint 14)
- [ ] Unit test coverage >70%
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Monitoring & alerting

---

## 📝 Recent Completions

### ✅ Completed (April 2026 — Sprint 9: Navigation + Employee Profile)
- [x] NAV-01: Sidebar navigation with 5 grouped sections (Operations, Devices, Access Control, Reports & Audit, System)
- [x] REP-01 + REP-02: Confirmed already implemented — all 9 report types + inline preview table in Reports.jsx
- [x] EMP-01: Employee Profile page at `/employee/:id` with Overview/Cards/Events tabs
- [x] SETTINGS-01 + BUG-06: Fixed `healthAPI.check()` URL bug (`/api/health` → `/health`)
- [x] Employees list: added "Profile" navigation button to each row

### ✅ Completed (April 2026 — Sprint 8: UI/UX Audit)
- [x] Automated Playwright audit of all 18 frontend pages
- [x] Backend vs. frontend coverage gap analysis (16 route files, ~120 routes)
- [x] BUG-01: Fixed employee view name (`allemployees` → `employee`)
- [x] BUG-02: Fixed DeviceUsers double `/api/api/` prefix
- [x] BUG-03: Fixed CardAssignment `cardSize` schema drift
- [x] BUG-04: Fixed missing React `key` props in CardAssignments
- [x] BUG-05: Fixed React Router v7 future flag warnings
- [x] Generated comprehensive UI/UX report (`docs/ui-ux-report.md`)
- [x] Backlog updated with 30+ trackable UI/UX items

### ✅ Completed (April 2026 — Sprint 7: P1 Business Ops)
- [x] User Management API with server-side pagination, search, status filter
- [x] Card Lifecycle: replace + history APIs + frontend modals
- [x] Access Control Admin: gRPC wiring, CRUD routes, tabbed Doors UI
- [x] HR Integration: webhook receiver, termination endpoint, employee pagination, terminate modal

### ✅ Completed (March–April 2026 — Sprints 1–6)
- [x] All P0 Core Sync & Replication items
- [x] All P0 Platform Reliability items
- [x] All P1 Reports & Exports items
- [x] SSE real-time event streaming
- [x] Advanced event filtering with presets
- [x] Device management UI enhancements
- [x] Audit logging system
- [x] Bulk CSV import/export
- [x] Database connection pooling
- [x] Database-first configuration architecture

---

## 🚫 Deprioritized / Won't Do

### Out of Scope
- ~~Facial recognition without Suprema device support~~
- ~~Blockchain-based audit trail~~
- ~~Native desktop application~~
- ~~Integration with legacy systems without API~~

---

## 💡 Ideas & Research

### Under Consideration
- **Machine Learning for Access Patterns**: Anomaly detection for security
- **Blockchain Integration**: Immutable audit trail
- **Voice Recognition**: Additional authentication factor
- **Geo-fencing**: Location-based access control
- **Predictive Maintenance**: Device failure prediction
- **Custom Dashboard Builder**: User-configurable dashboards

---

## 📌 Notes

### Dependencies
- Suprema G-SDK version updates
- Node.js LTS version compatibility
- MySQL version requirements
- Browser compatibility for frontend

### Risks
- G-SDK API changes requiring refactoring
- Performance degradation with large number of devices
- Network latency affecting real-time features
- Database scalability limitations

### Assumptions
- Maximum 100 devices per deployment
- Average 50 events per device per day
- 1000 users across all devices
- 99% uptime requirement for production

---

**Last Updated**: April 12, 2026  
**Backlog Version**: 2.0 (UI/UX audit integrated)  
**Maintained By**: Product Owner / Development Team