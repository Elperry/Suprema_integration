/**
 * CloudSyncService
 *
 * Synchronizes the local database with the cloud/online database.
 *
 * Source-of-truth rules:
 *   1. `employee` is authoritative in the cloud DB and is pulled into local.
 *   2. Every other shared application table is authoritative in the local DB and
 *      is mirrored into the cloud DB.
 *
 * Triggering is controlled outside the service via an environment-backed trigger
 * mode (`disabled`, `startup`, `interval`, `both`). The service exposes helper
 * methods so startup can decide whether to run once, on an interval, or both.
 */

import { CircuitBreaker, CircuitOpenError, isConnectivityError } from '../core/utils/circuitBreaker.js';

// Per-table wall-clock budget for the apply step.  If a single table's
// upsert batch takes longer than this, the Promise is rejected so the
// cycle can continue with the remaining tables instead of hanging forever.
// Override with CLOUD_SYNC_TABLE_TIMEOUT_MS (0 = no timeout).
const TABLE_APPLY_TIMEOUT_MS = Number(process.env.CLOUD_SYNC_TABLE_TIMEOUT_MS ?? 30_000);

// Circuit-breaker tuning. The breaker protects every cycle against a
// dead/unreachable cloud DB: N consecutive connectivity failures open
// the breaker, and subsequent cycles short-circuit until the cool-down
// elapses and a single half-open trial succeeds.
const CIRCUIT_FAILURE_THRESHOLD = Math.max(1, Number(process.env.CLOUD_SYNC_CIRCUIT_FAILURE_THRESHOLD ?? 3));
const CIRCUIT_OPEN_MS         = Math.max(0, Number(process.env.CLOUD_SYNC_CIRCUIT_OPEN_MS ?? 60_000));
const CIRCUIT_PROBE_TIMEOUT_MS = Math.max(1_000, Number(process.env.CLOUD_SYNC_PROBE_TIMEOUT_MS ?? 5_000));

const DEFAULT_LOCAL_TO_CLOUD_TABLES = Object.freeze([
    // ── Reference / config tables ─────────────────────────────────────────
    {
        model: 'location',
        label: 'locations',
        ignoreWriteFields: ['updatedAt'],
        ignoreCompareFields: ['updatedAt'],
        jsonFields: [],
    },
    {
        model: 'device',
        label: 'device',
        // Replication cursors are local-only state and must not be mirrored.
        cloudOmitFields: ['last_event_sync', 'last_user_sync', 'last_replicated_event_id'],
        ignoreCompareFields: [
            'last_event_sync', 'last_user_sync',
            'last_replicated_event_id',
            'createdAt', 'updatedAt',
        ],
        jsonFields: [],
    },
    {
        model: 'user',
        label: 'user',
        // Both local and cloud DBs now share the same schema.
        jsonFields: [],
    },
    {
        model: 'tempAccess',
        label: 'tempaccess',
        jsonFields: [],
    },
    // ── High-priority event / audit tables (process before large card tables)
    {
        model: 'event',
        label: 'events',
        // cloudSyncedAt is a LOCAL tracking field — never push it to cloud.
        cloudOmitFields: ['cloudSyncedAt'],
        ignoreCompareFields: ['cloudSyncedAt', 'createdAt', 'updatedAt'],
        jsonFields: ['rawData'],
        // Event log is append-only on cloud: the replication cursor is the
        // cloud MAX(id) — only local rows with id > MAX(id) are pushed, so
        // the shared autoincrement `id` guarantees unique records. Cloud
        // rows are never deleted.
        appendOnly: true,
        // Large table — allow extra time on slow cloud connections.
        timeoutMs: 120_000,
    },
    {
        model: 'auditLog',
        label: 'audit_logs',
        jsonFields: ['details'],
        appendOnly: true,
    },
    {
        model: 'enrollmentLog',
        label: 'enrollment_logs',
        jsonFields: ['requestPayload', 'responsePayload'],
        appendOnly: true,
        // Large table — allow extra time on slow cloud connections.
        timeoutMs: 120_000,
    },
    {
        model: 'filterPreset',
        label: 'filter_presets',
        ignoreWriteFields: ['updatedAt'],
        ignoreCompareFields: ['updatedAt'],
        jsonFields: ['filters'],
    },
    // ── Operational tables (large, lower priority) ────────────────────────
    {
        model: 'cardAssignment',
        label: 'card_assignments',
        // Both local and cloud DBs now share the same schema.
        jsonFields: [],
        // Large table — allow extra time on slow cloud connections.
        timeoutMs: 120_000,
    },
    {
        model: 'deviceEnrollment',
        label: 'device_enrollments',
        jsonFields: [],
        // Large table — allow extra time on slow cloud connections.
        timeoutMs: 120_000,
    },
]);

class CloudSyncService {
    /**
     * @param {object} opts
     * @param {import('@prisma/client').PrismaClient} opts.localPrisma  - Local DB client
     * @param {import('@prisma/client').PrismaClient} opts.cloudPrisma  - Cloud DB client
     * @param {object} opts.logger
     * @param {number} [opts.intervalMs=300000] - Sync interval in ms (default 5 min)
     * @param {string} [opts.trigger='both'] - disabled|startup|interval|both
     * @param {Array<object>} [opts.tableSpecs] - Local-authoritative table specs
     */
    constructor({
        localPrisma,
        cloudPrisma,
        logger,
        intervalMs = 5 * 60 * 1000,
        trigger = 'both',
        tableSpecs = DEFAULT_LOCAL_TO_CLOUD_TABLES,
        allowEmptySourcePrune = process.env.CLOUD_SYNC_ALLOW_EMPTY_SOURCE_PRUNE === 'true',
        upsertBatchSize = 50,
        employeeMinPrunePct = Number(process.env.CLOUD_SYNC_EMPLOYEE_MIN_PRUNE_PCT ?? 50),
    }) {
        this.localPrisma = localPrisma;
        this.cloudPrisma = cloudPrisma;
        this.logger = logger;
        this.intervalMs = intervalMs;
        this.trigger = this._normalizeTrigger(trigger);
        this.tableSpecs = tableSpecs;
        this.allowEmptySourcePrune = allowEmptySourcePrune;
        this.upsertBatchSize = upsertBatchSize > 0 ? upsertBatchSize : 50;
        this.employeeMinPrunePct = Number.isFinite(employeeMinPrunePct)
            ? Math.max(0, Math.min(100, employeeMinPrunePct))
            : 50;
        this._timer = null;
        this._running = false;

        // Circuit breaker around all cloud DB I/O. Connectivity errors
        // (P1001/P1002/P1008/P1017/P2024, ECONNRESET/ETIMEDOUT/..., or
        // "apply timed out") trip it; application/schema errors do not.
        this._breaker = new CircuitBreaker({
            name: 'cloud-sync',
            failureThreshold: CIRCUIT_FAILURE_THRESHOLD,
            openMs: CIRCUIT_OPEN_MS,
            logger: this.logger,
            isFailure: isConnectivityError,
        });
    }

    /**
     * Current breaker state. Exposed for /health endpoints and tests.
     * @returns {{ state:string, consecutiveFailures:number, msUntilRetry:number, lastError:string|null }}
     */
    getCloudHealth() {
        return {
            state: this._breaker.state,
            consecutiveFailures: this._breaker.consecutiveFailures,
            msUntilRetry: this._breaker.msUntilRetry(),
            lastError: this._breaker.lastError?.message || null,
        };
    }

    isEnabled() {
        return !!this.cloudPrisma && this.trigger !== 'disabled';
    }

    shouldRunInitialSync() {
        return this.isEnabled() && (this.trigger === 'startup' || this.trigger === 'both');
    }

    shouldRunIntervalSync() {
        return this.isEnabled()
            && (this.trigger === 'interval' || this.trigger === 'both')
            && this.intervalMs > 0;
    }

    start() {
        if (!this.cloudPrisma) {
            this.logger.info('CloudSync start skipped - CLOUD_DATABASE_URL not configured');
            return;
        }
        if (!this.shouldRunIntervalSync()) {
            this.logger.info(
                `CloudSync interval start skipped (trigger=${this.trigger}, intervalMs=${this.intervalMs})`
            );
            return;
        }
        if (this._timer) return;
        this.logger.info(`CloudSyncService started (interval: ${this.intervalMs / 1000}s)`);
        this._timer = setInterval(() => {
            this._cycle().catch(err =>
                this.logger.error('CloudSync cycle error:', err.message)
            );
        }, this.intervalMs);
    }

    /**
     * Run an immediate, awaitable initial sync cycle.
     * Used at startup to ensure employees are imported before the server
     * accepts traffic. Safe no-op when cloudPrisma is not configured.
     */
    async runInitialSync() {
        if (!this.cloudPrisma) {
            this.logger.info('CloudSync skipped — CLOUD_DATABASE_URL not configured');
            return;
        }
        if (!this.shouldRunInitialSync()) {
            this.logger.info(`CloudSync initial sync skipped (trigger=${this.trigger})`);
            return;
        }
        this.logger.info('CloudSync initial import starting...');
        const started = Date.now();
        try {
            await this._cycle();
            this.logger.info(`CloudSync initial import complete (${Date.now() - started}ms)`);
        } catch (err) {
            this.logger.error('CloudSync initial import failed:', err.message);
        }
    }

    stop() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
        this.logger.info('CloudSyncService stopped');
    }

    // ── Internal ─────────────────────────────────────────────────────────────

    configure(options = {}) {
        if (options.intervalMs !== undefined) {
            this.intervalMs = options.intervalMs;
        }

        if (options.trigger !== undefined) {
            this.trigger = this._normalizeTrigger(options.trigger);
        }
    }

    getRuntimeStatus() {
        return {
            configured: !!this.cloudPrisma,
            enabled: this.isEnabled(),
            running: !!this._timer,
            trigger: this.trigger,
            intervalMs: this.intervalMs,
            runningCycle: this._running,
            breaker: this.getCloudHealth(),
        };
    }

    async _cycle() {
        if (!this.cloudPrisma) {
            return;
        }
        if (this._running) {
            this.logger.debug('CloudSync cycle skipped — previous cycle still running');
            return;
        }

        // Fast-fail when the breaker is open: avoid piling up timeouts
        // against an unreachable cloud DB.
        if (!this._breaker.canExecute()) {
            this.logger.warn(
                `CloudSync cycle skipped — circuit open ` +
                `(retry in ${Math.ceil(this._breaker.msUntilRetry() / 1000)}s, ` +
                `lastError=${this._breaker.lastError?.message || 'n/a'})`
            );
            return;
        }

        // Probe the cloud DB before doing any real work. A lightweight
        // SELECT 1 with a short timeout detects a dead connection in
        // seconds instead of waiting 30+s for the first real query.
        try {
            await this._breaker.exec(() => this._probeCloud());
        } catch (error) {
            if (error instanceof CircuitOpenError) {
                // Race: another check tripped the breaker between canExecute()
                // and exec(). Treat the same as the early-return above.
                return;
            }
            this.logger.warn(
                `CloudSync cycle skipped — cloud DB probe failed: ${error.message || error.code || error}`
            );
            return;
        }

        this._running = true;
        try {
            // Ensure cloud tables have the same columns as local tables (runs once).
            await this._ensureCloudSchema();

            try {
                await this._pullEmployees();
            } catch (error) {
                this._notifyOnConnectivityError(error);
                this.logger.error(
                    `Employee pull error: ${error?.message || error?.code || String(error)}`,
                    { code: error?.code, stack: error?.stack }
                );
            }

            try {
                await this._provisionUsersFromEmployees();
            } catch (error) {
                this.logger.error(
                    `User provisioning error: ${error?.message || error?.code || String(error)}`,
                    { stack: error?.stack }
                );
            }

            try {
                await this._mirrorLocalTablesToCloud();
            } catch (error) {
                this._notifyOnConnectivityError(error);
                this.logger.error(
                    `Local-to-cloud mirror error: ${error?.message || error?.code || String(error)}`,
                    { code: error?.code, stack: error?.stack }
                );
            }
        } finally {
            this._running = false;
        }
    }

    /**
     * Ensures all local-schema columns exist in the cloud DB tables.
     *
     * MySQL (unlike MariaDB \u2265 10.0.2 and PostgreSQL) does NOT support
     * `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`, so we query
     * `information_schema.COLUMNS` first and only issue a plain
     * `ADD COLUMN` when the column is actually missing. Runs once per
     * process lifetime (guarded by _cloudSchemaEnsured).
     */
    async _ensureCloudSchema() {
        if (this._cloudSchemaEnsured) return;
        if (!this.cloudPrisma) return;

        // [table, column, column-definition without column name]
        const columns = [
            // \u2500\u2500 user \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            ['user', 'code',        'VARCHAR(15)  NULL'],
            ['user', 'name',        'VARCHAR(200) NULL'],
            ['user', 'full_name',   'VARCHAR(200) NULL'],
            ['user', 'employee_id', 'INT          NULL'],
            // \u2500\u2500 device \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            ['device', 'last_event_sync',          'DATETIME     NULL DEFAULT CURRENT_TIMESTAMP'],
            ['device', 'last_user_sync',           'DATETIME     NULL DEFAULT CURRENT_TIMESTAMP'],
            ['device', 'last_replicated_event_id', 'INT UNSIGNED NULL DEFAULT 0'],
            ['device', 'port',                     'INT UNSIGNED NULL DEFAULT 51211'],
            ['device', 'isActive',                 'TINYINT(1)   NULL DEFAULT 1'],
            ['device', 'status',                   "VARCHAR(50)  NULL DEFAULT 'disconnected'"],
            ['device', 'useSSL',                   'TINYINT(1)   NULL DEFAULT 0'],
            ['device', 'locationId',               'INT          NULL'],
            ['device', 'direction',                "VARCHAR(10)  NULL DEFAULT 'in'"],
            ['device', 'deviceType',               'VARCHAR(50)  NULL'],
            ['device', 'serialNumber',             'VARCHAR(100) NULL'],
            // \u2500\u2500 card_assignments \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            ['card_assignments', 'user_id',    'INT          NULL'],
            ['card_assignments', 'card_data',  'VARCHAR(191) NULL'],
            ['card_assignments', 'card_csn',   "VARCHAR(100) NULL DEFAULT ''"],
            ['card_assignments', 'status',     "VARCHAR(20)  NULL DEFAULT 'active'"],
            ['card_assignments', 'assignedAt', 'DATETIME     NULL'],
            ['card_assignments', 'revokedAt',  'DATETIME     NULL'],
            ['card_assignments', 'notes',      'TEXT         NULL'],
        ];

        for (const [table, column, definition] of columns) {
            try {
                const exists = await this.cloudPrisma.$queryRawUnsafe(
                    'SELECT 1 AS present FROM information_schema.COLUMNS '
                    + 'WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ? LIMIT 1',
                    table,
                    column,
                );
                if (Array.isArray(exists) && exists.length > 0) continue;

                const sql = `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`;
                await this.cloudPrisma.$executeRawUnsafe(sql);
                this.logger.info(`[CloudSync] Added cloud column ${table}.${column}`);
            } catch (err) {
                // Column may have been added concurrently \u2014 not fatal.
                this.logger.debug(`[CloudSync] _ensureCloudSchema (${table}.${column}): ${err.message}`);
            }
        }

        this._cloudSchemaEnsured = true;
        this.logger.info('[CloudSync] Cloud schema ensured');
    }

    /**
     * Light-weight cloud connectivity probe. Resolves on the first
     * round-trip; rejects with a connectivity-classed Error on timeout
     * so the breaker treats it as a failure.
     */
    async _probeCloud() {
        let timer;
        const timeout = new Promise((_, reject) => {
            timer = setTimeout(() => {
                const err = new Error(`cloud DB probe timed out after ${CIRCUIT_PROBE_TIMEOUT_MS}ms`);
                err.isConnectivityError = true;
                reject(err);
            }, CIRCUIT_PROBE_TIMEOUT_MS);
        });
        try {
            await Promise.race([
                this.cloudPrisma.$queryRaw`SELECT 1`,
                timeout,
            ]);
        } finally {
            clearTimeout(timer);
        }
    }

    /**
     * Funnel an error caught from the cloud-touching stages into the
     * breaker only when it looks like a connectivity issue. Schema /
     * data / application errors are deliberately ignored so they don't
     * disable cloud sync for unrelated reasons.
     */
    _notifyOnConnectivityError(error) {
        if (isConnectivityError(error)) {
            this._breaker.recordFailure(error);
        }
    }

    _firstNonEmpty(...values) {
        for (const value of values) {
            if (value === null || value === undefined) continue;
            if (typeof value === 'string') {
                const trimmed = value.trim();
                if (trimmed) return trimmed;
                continue;
            }
            return value;
        }
        return null;
    }

    _joinName(firstname, lastname) {
        const fullName = [firstname, lastname]
            .map(part => (typeof part === 'string' ? part.trim() : part))
            .filter(Boolean)
            .join(' ')
            .trim();

        return fullName || null;
    }

    _splitName(displayName, explicitFirst, explicitLast) {
        if (explicitFirst || explicitLast) {
            return {
                firstname: explicitFirst ?? null,
                lastname: explicitLast ?? null,
            };
        }

        const normalizedName = typeof displayName === 'string'
            ? displayName.trim().replace(/\s+/g, ' ')
            : '';

        if (!normalizedName) {
            return { firstname: null, lastname: null };
        }

        const [firstname, ...rest] = normalizedName.split(' ');
        return {
            firstname: firstname || null,
            lastname: rest.length ? rest.join(' ') : null,
        };
    }

    _mapCloudEmployeeRow(row) {
        const safeVal = (value) => (typeof value === 'bigint' ? Number(value) : value ?? null);

        const explicitFirst = this._firstNonEmpty(
            row.firstname,
            row.first_name,
            row.firstName,
        );
        const explicitLast = this._firstNonEmpty(
            row.lastname,
            row.last_name,
            row.lastName,
        );
        const derivedDisplayName = this._firstNonEmpty(
            row.displayname,
            row.fullname,
            row.full_name,
            row.employee_name,
            row.name,
            this._joinName(explicitFirst, explicitLast),
        );
        const { firstname, lastname } = this._splitName(
            derivedDisplayName,
            explicitFirst,
            explicitLast,
        );

        return {
            id: safeVal(row.id),
            known: {
                fullname: this._firstNonEmpty(
                    row.fullname,
                    row.full_name,
                    derivedDisplayName,
                    this._joinName(firstname, lastname),
                ),
                firstname,
                lastname,
                displayname: derivedDisplayName,
                email: this._firstNonEmpty(
                    row.email,
                    row.officialemail,
                    row.username,
                ),
                mobile: this._firstNonEmpty(
                    row.mobile,
                    row.phone,
                    row.phoneNumber,
                    row.phonenumber,
                    row.telephone,
                ),
                jobtitle: this._firstNonEmpty(row.jobtitle, row.job_title),
                company_id: safeVal(row.company_id),
                suspend: this._firstNonEmpty(row.suspend),
                ssn: this._firstNonEmpty(row.ssn),
                card: this._firstNonEmpty(row.card),
                department: this._firstNonEmpty(row.department, row.departmentid),
                code: this._firstNonEmpty(row.code, row.employee_code, row.emp_code),
            },
        };
    }

    // ── 1. Employee pull: cloud view → local table ───────────────────────────

    // ── 1a. User provisioning: ensure every employee has a local user row ────
    //
    // After each employee pull, any employee that does not yet have a row in
    // the local `user` table gets one auto-created here.  The user table is
    // the source of truth for the local DB (card assignments link to it), so
    // rows are never removed by this method — only added.
    async _provisionUsersFromEmployees() {
        const employees = await this.localPrisma.employee.findMany({
            select: { id: true, code: true, displayname: true, fullname: true },
        });

        if (employees.length === 0) return;

        const existingUsers = await this.localPrisma.user.findMany({
            select: { employee_id: true },
        });

        const existingSet = new Set(existingUsers.map((u) => u.employee_id));

        const toCreate = employees.filter((e) => !existingSet.has(e.id));
        if (toCreate.length === 0) return;

        await this.localPrisma.user.createMany({
            data: toCreate.map((e) => ({
                code:        e.code        || '',
                name:        e.displayname || e.fullname || '',
                full_name:   e.fullname    || e.displayname || '',
                employee_id: e.id,
            })),
            skipDuplicates: true,
        });

        this.logger.info(`User provisioning: ${toCreate.length} new user row(s) created from employees`);
    }

    async _pullEmployees() {
        const rows = await this.cloudPrisma.$queryRawUnsafe(
            'SELECT * FROM employee ORDER BY id ASC'
        );

        if (!rows || rows.length === 0) {
            this.logger.warn(
                'Employee pull: cloud returned 0 rows — skipping upsert and delete to avoid wiping local cache'
            );
            return;
        }

        // Known columns — everything else goes into `extra`
        const KNOWN = new Set([
            'id', 'fullname', 'firstname', 'lastname', 'displayname',
            'email', 'mobile', 'jobtitle', 'company_id', 'suspend',
            'ssn', 'card', 'department', 'code',
        ]);

        // Batch upserts in chunks for far fewer round-trips.
        const batchSize = this.upsertBatchSize;
        let upserted = 0;
        for (let i = 0; i < rows.length; i += batchSize) {
            const batch = rows.slice(i, i + batchSize);

            const ops = batch.map((row) => {
                const { id, known } = this._mapCloudEmployeeRow(row);

                const extra = {};
                for (const [k, v] of Object.entries(row)) {
                    if (!KNOWN.has(k)) extra[k] = this._sanitizeJsonValue(v);
                }

                return this.localPrisma.employee.upsert({
                    where:  { id },
                    update: { ...known, extra, lastSyncedAt: new Date() },
                    create: { id, ...known, extra },
                });
            });

            await this.localPrisma.$transaction(ops);
            upserted += ops.length;
        }

        // Safety guard: if the cloud row count is suspiciously smaller than what
        // we have locally, refuse to prune. A transient cloud read or partial
        // replication should never silently wipe local employees.
        const localCount = await this.localPrisma.employee.count();
        const minRequired = Math.ceil((localCount * this.employeeMinPrunePct) / 100);

        if (localCount > 0 && rows.length < minRequired) {
            this.logger.warn(
                `Employee pull: cloud returned ${rows.length} row(s) vs local ${localCount}; ` +
                `below safety threshold (${this.employeeMinPrunePct}% = ${minRequired}). ` +
                `Skipping stale-row delete to avoid data loss. ` +
                `Adjust CLOUD_SYNC_EMPLOYEE_MIN_PRUNE_PCT to override.`
            );
            this.logger.info(`Employee pull: ${upserted} upserted, 0 stale rows removed (delete skipped)`);
            return;
        }

        const cloudIds = rows.map(r => (typeof r.id === 'bigint' ? Number(r.id) : r.id));
        const deleted = await this.localPrisma.employee.deleteMany({
            where: { id: { notIn: cloudIds } },
        });

        this.logger.info(
            `Employee pull: ${upserted} upserted, ${deleted.count} stale rows removed`
        );
    }

    // ── 2. Local-authoritative tables: local → cloud ────────────────────────

    async _mirrorLocalTablesToCloud() {
        const plans = [];

        for (const spec of this.tableSpecs) {
            try {
                plans.push(await this._buildMirrorPlan(spec));
            } catch (error) {
                this._notifyOnConnectivityError(error);
                const code = error.code;
                let hint = '';
                if (code === 'P2020') {
                    hint = ' — likely a zero/invalid datetime in the local table. ' +
                        'Run `UPDATE <table> SET <col> = NULL WHERE <col> = \'0000-00-00 00:00:00\'` ' +
                        'to repair, then resync.';
                } else if (code === 'P2010' || code === 'P1014') {
                    hint = ' — cloud/local schema mismatch. Run `npx prisma migrate deploy` on both DBs.';
                }
                this.logger.error(
                    `[CloudSync:${spec.label}] Planning failed (${code || 'unknown'}): ${error.message}${hint}`,
                    { stack: error.stack }
                );
            }
        }

        let totalUpserted = 0;
        let totalDeleted = 0;
        let totalUnchanged = 0;

        for (const plan of plans) {
            try {
                const applyPromise = this._applyMirrorUpserts(plan);
                const tableTimeout = plan.spec.timeoutMs ?? TABLE_APPLY_TIMEOUT_MS;
                const upserted = tableTimeout > 0
                    ? await Promise.race([
                        applyPromise,
                        new Promise((_, reject) =>
                            setTimeout(
                                () => {
                                    const err = new Error(
                                        `[CloudSync:${plan.spec.label}] apply timed out after ${tableTimeout}ms`
                                    );
                                    err.isConnectivityError = true;
                                    reject(err);
                                },
                                tableTimeout
                            )
                        ),
                    ])
                    : await applyPromise;
                totalUpserted += upserted;
                totalUnchanged += plan.unchanged;
            } catch (error) {
                this._notifyOnConnectivityError(error);
                const code = error.code;
                let hint = '';
                if (code === 'P2022') {
                    hint = ` — cloud table \`${plan.spec.label}\` is missing a column. ` +
                        'Add the column name to this spec\'s `cloudOmitFields` ' +
                        '(then the raw-SQL writer will skip it), or run ' +
                        '`npx prisma migrate deploy` against the cloud DB.';
                } else if (code === 'P2020') {
                    hint = ' — invalid datetime value in source rows; heal with SQL and resync.';
                }
                this.logger.error(
                    `[CloudSync:${plan.spec.label}] Upsert failed (${code || 'unknown'}): ${error.message}${hint}`,
                    { stack: error.stack }
                );
            }
        }

        for (const plan of [...plans].reverse()) {
            try {
                const deleted = await this._applyMirrorDeletes(plan);
                totalDeleted += deleted;
            } catch (error) {
                this._notifyOnConnectivityError(error);
                this.logger.error(
                    `[CloudSync:${plan.spec.label}] Delete failed (${error.code || 'unknown'}): ${error.message}`,
                    { stack: error.stack }
                );
            }
        }

        this.logger.info(
            `Cloud mirror: ${totalUpserted} row(s) upserted, ` +
            `${totalDeleted} stale row(s) deleted, ${totalUnchanged} unchanged`
        );
    }

    async _buildMirrorPlan(spec) {
        // ── Cloud-cursor path (append-only: events, audit_logs, enrollment_logs)
        // Derives the cursor by querying MAX(id) on the cloud side; only
        // local rows with id > MAX(id) are pushed, so the shared `id`
        // column guarantees each record is replicated exactly once.
        if (spec.appendOnly) {
            // Fast-path for logs/events: cursor-based fetch
            const maxCloud = await this.cloudPrisma[spec.model].aggregate({
                _max: { id: true }
            });
            const lastId = maxCloud._max.id || 0;

            const localRows = await this.localPrisma[spec.model].findMany({
                where: { id: { gt: lastId } },
                orderBy: { id: 'asc' }
            });

            const rowsToUpsert = [];
            for (const row of localRows) {
                rowsToUpsert.push(this._prepareRecordForWrite(spec, row, { omitFields: spec.cloudOmitFields }));
            }

            return {
                spec,
                rowsToUpsert,
                staleIds: [],
                localCount: localRows.length,
                cloudCount: 0,
                unchanged: 0,
                skipDeletes: true,
            };
        }

        const cloudSelect = this._buildCloudSelect(spec);
        const [localRows, cloudRows] = await Promise.all([
            this.localPrisma[spec.model].findMany({ orderBy: { id: 'asc' } }),
            this.cloudPrisma[spec.model].findMany({
                orderBy: { id: 'asc' },
                ...(cloudSelect ? { select: cloudSelect } : {}),
            }),
        ]);

        const cloudById = new Map(
            cloudRows.map(row => [this._normalizeId(row.id), row])
        );
        const localIds = new Set();
        const rowsToUpsert = [];
        let unchanged = 0;

        for (const row of localRows) {
            const id = this._normalizeId(row.id);
            localIds.add(id);

            const cloudRow = cloudById.get(id);
            if (cloudRow && this._recordsEqual(spec, row, cloudRow)) {
                unchanged++;
                continue;
            }

            rowsToUpsert.push(this._prepareRecordForWrite(spec, row, { omitFields: spec.cloudOmitFields }));
        }

        // Append-only specs never delete from the cloud, so skip the
        // stale-id computation entirely.
        const staleIds = spec.appendOnly
            ? []
            : cloudRows
                .map(row => row.id)
                .filter(id => !localIds.has(this._normalizeId(id)));

        const skipDeletes = spec.appendOnly
            || (!this.allowEmptySourcePrune
                && localRows.length === 0
                && cloudRows.length > 0);

        return {
            spec,
            rowsToUpsert,
            staleIds,
            localCount: localRows.length,
            cloudCount: cloudRows.length,
            unchanged,
            skipDeletes,
        };
    }

    async _applyMirrorUpserts(plan) {
        const { spec, rowsToUpsert, localCount, cloudCount, unchanged } = plan;

        if (rowsToUpsert.length === 0) {
            this.logger.info(
                `[CloudSync:${spec.label}] local=${localCount}, cloud=${cloudCount}, ` +
                `upserted=0, unchanged=${unchanged}`
            );
            return 0;
        }

        // Always use raw INSERT ... ON DUPLICATE KEY UPDATE for all tables
        // to greatly improve performance, resolving the N+1 query problem.
        return this._rawUpsertCloud(plan);
    }

    /**
     * Raw-SQL upsert used for tables whose cloud schema is known to be
     * missing columns that exist locally. Bypasses Prisma's schema-aware
     * INSERT so only the columns present in the row payload are written.
     */
    async _rawUpsertCloud(plan) {
        const { spec, localCount, cloudCount, unchanged } = plan;
        // Always write lower ids first so a mid-run failure never leaves
        // id gaps below the cloud MAX(id) cursor (append-only tables
        // resume from MAX(id) and would silently skip such gaps).
        const rowsToUpsert = [...plan.rowsToUpsert].sort((a, b) =>
            this._compareIds(a.id, b.id)
        );
        const tableName = spec.label;
        // Use the column set of the first row; all rows from
        // _prepareRecordForWrite share the same key shape.
        const columns = Object.keys(rowsToUpsert[0]);
        const colList = columns.map(c => `\`${c}\``).join(', ');
        const updateList = columns
            .filter(c => c !== 'id')
            .map(c => `\`${c}\` = VALUES(\`${c}\`)`)
            .join(', ');

        let upserted = 0;
        const batchSize = this.upsertBatchSize;
        for (let i = 0; i < rowsToUpsert.length; i += batchSize) {
            const batch = rowsToUpsert.slice(i, i + batchSize);
            const rowPlaceholder = `(${columns.map(() => '?').join(', ')})`;
            const placeholders = batch.map(() => rowPlaceholder).join(', ');
            const params = [];
            for (const row of batch) {
                for (const col of columns) {
                    params.push(this._toRawSqlValue(row[col], spec, col));
                }
            }
            const sql =
                `INSERT INTO \`${tableName}\` (${colList}) VALUES ${placeholders} ` +
                `ON DUPLICATE KEY UPDATE ${updateList}`;
            await this.cloudPrisma.$executeRawUnsafe(sql, ...params);
            upserted += batch.length;
        }

        this.logger.info(
            `[CloudSync:${spec.label}] local=${localCount}, cloud=${cloudCount}, ` +
            `upserted=${upserted}, unchanged=${unchanged} (raw)`
        );

        return upserted;
    }

    _toRawSqlValue(value, spec, col) {
        if (value === undefined || value === null) return null;
        if (value instanceof Date) return value;
        if (Buffer.isBuffer(value)) return value;
        if (typeof value === 'bigint') return value.toString();
        if ((spec.jsonFields || []).includes(col)) {
            return value === null ? null : JSON.stringify(this._sanitizeJsonValue(value));
        }
        if (typeof value === 'object') {
            // Decimal/BigNumber-like
            if (typeof value.toString === 'function') return value.toString();
            return JSON.stringify(value);
        }
        return value;
    }

    async _applyMirrorDeletes(plan) {
        const { spec, staleIds, localCount, cloudCount, skipDeletes } = plan;

        if (spec.appendOnly) {
            // Append-only: never delete from cloud. No log needed; the
            // upsert log line already conveys the relevant counts.
            return 0;
        }

        if (skipDeletes) {
            this.logger.warn(
                `[CloudSync:${spec.label}] Skipping delete phase because local source is empty ` +
                `while cloud has ${cloudCount} row(s). Set CLOUD_SYNC_ALLOW_EMPTY_SOURCE_PRUNE=true ` +
                `to allow pruning cloud rows from an empty local source.`
            );
            return 0;
        }

        if (staleIds.length === 0) {
            return 0;
        }

        let deleted = 0;
        for (const batch of this._chunk(staleIds, 250)) {
            const result = await this.cloudPrisma[spec.model].deleteMany({
                where: {
                    id: { in: batch },
                },
            });
            deleted += result.count;
        }

        this.logger.info(`[CloudSync:${spec.label}] deleted=${deleted} stale row(s)`);
        return deleted;
    }

    _normalizeTrigger(trigger) {
        const value = String(trigger || 'both').trim().toLowerCase();
        if (['disabled', 'startup', 'interval', 'both'].includes(value)) {
            return value;
        }
        return 'both';
    }

    _normalizeId(value) {
        return typeof value === 'bigint' ? value.toString() : String(value);
    }

    _compareIds(a, b) {
        const left = typeof a === 'bigint' ? a : BigInt(a ?? 0);
        const right = typeof b === 'bigint' ? b : BigInt(b ?? 0);
        return left < right ? -1 : left > right ? 1 : 0;
    }

    _recordsEqual(spec, left, right) {
        const normalizedLeft = this._normalizeRecordForComparison(spec, left);
        const normalizedRight = this._normalizeRecordForComparison(spec, right);

        return JSON.stringify(normalizedLeft) === JSON.stringify(normalizedRight);
    }

    _normalizeRecordForComparison(spec, row) {
        const normalized = {};
        const ignoreCompareFields = new Set([
            ...(spec.ignoreCompareFields || []),
            ...(spec.cloudOmitFields || []),
        ]);

        for (const key of Object.keys(row).sort()) {
            if (ignoreCompareFields.has(key)) continue;

            const isJsonField = (spec.jsonFields || []).includes(key);
            const value = isJsonField
                ? this._sanitizeJsonValue(row[key])
                : row[key];

            normalized[key] = this._normalizeValueForComparison(value);
        }

        return normalized;
    }

    _prepareRecordForWrite(spec, row, options = {}) {
        const record = {};
        const ignoreWriteFields = new Set([
            ...(spec.ignoreWriteFields || []),
            ...(options.omitFields || []),
        ]);

        for (const [key, value] of Object.entries(row)) {
            if (ignoreWriteFields.has(key)) continue;

            record[key] = (spec.jsonFields || []).includes(key)
                ? this._sanitizeJsonValue(value)
                : value;
        }

        return record;
    }

    _buildCloudSelect(spec) {
        if (Array.isArray(spec.cloudSelectFields) && spec.cloudSelectFields.length > 0) {
            return spec.cloudSelectFields.reduce((select, field) => {
                select[field] = true;
                return select;
            }, {});
        }

        if (!spec.cloudOmitFields || spec.cloudOmitFields.length === 0) {
            return null;
        }

        const fields = this._getModelScalarFields(spec.model);
        if (!fields || fields.length === 0) {
            return null;
        }

        const ignoreFields = new Set(spec.cloudOmitFields);
        const select = {};
        for (const fieldName of fields) {
            if (ignoreFields.has(fieldName)) continue;
            select[fieldName] = true;
        }
        // Always include the primary key
        select.id = true;
        return select;
    }

    _getModelScalarFields(modelName) {
        const dataModel = this.localPrisma?._runtimeDataModel;
        if (!dataModel || !dataModel.models) return null;

        const pascal = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        const model = dataModel.models[pascal] || dataModel.models[modelName];
        if (!model || !Array.isArray(model.fields)) return null;

        return model.fields
            .filter(f => f && f.kind === 'scalar')
            .map(f => f.name);
    }

    _sanitizeJsonValue(value) {
        if (value === null || value === undefined) return value ?? null;
        if (value instanceof Date) return value.toISOString();
        if (typeof value === 'bigint') return value.toString();
        if (Buffer.isBuffer(value)) return value.toString('base64');
        if (Array.isArray(value)) return value.map(item => this._sanitizeJsonValue(item));

        if (typeof value === 'object') {
            // Prisma Decimal / decimal.js / other rich numeric types: collapse to
            // their string form so the JSON column doesn't end up holding the
            // raw internal structure (which Prisma rejects on write).
            const ctorName = value.constructor && value.constructor.name;
            if (ctorName === 'Decimal' || ctorName === 'BigNumber') {
                return value.toString();
            }
            if (typeof value.toJSON === 'function' && ctorName !== 'Object') {
                return this._sanitizeJsonValue(value.toJSON());
            }

            return Object.keys(value).sort().reduce((acc, key) => {
                acc[key] = this._sanitizeJsonValue(value[key]);
                return acc;
            }, {});
        }

        return value;
    }

    _normalizeValueForComparison(value) {
        if (value === null || value === undefined) return null;
        if (value instanceof Date) return value.toISOString();
        if (typeof value === 'bigint') return value.toString();
        if (Buffer.isBuffer(value)) return value.toString('base64');
        if (Array.isArray(value)) return value.map(item => this._normalizeValueForComparison(item));

        if (typeof value === 'object') {
            return Object.keys(value).sort().reduce((acc, key) => {
                acc[key] = this._normalizeValueForComparison(value[key]);
                return acc;
            }, {});
        }

        return value;
    }

    _chunk(items, size) {
        const chunks = [];
        for (let index = 0; index < items.length; index += size) {
            chunks.push(items.slice(index, index + size));
        }
        return chunks;
    }
}

export default CloudSyncService;
