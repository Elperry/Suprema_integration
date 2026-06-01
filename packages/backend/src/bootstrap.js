/**
 * Application Bootstrap
 * Initializes and wires ALL application components through the DI container.
 * This is the single composition root — no service should create its own
 * dependencies.
 */

import dotenv from 'dotenv';
import { getContainer } from './core/container/index.js';
import { createRepositories } from './repositories/index.js';
import config from './core/config/index.js';
import {
    setupUnhandledRejectionHandler,
    setupUncaughtExceptionHandler
} from './core/errors/index.js';
import { createAppLogger } from './utils/createLogger.js';

// Database
import DatabaseManager from './models/database.js';

// Domain services
import SupremaConnectionService from './services/connectionService.js';
import SupremaUserService from './services/userService.js';
import SupremaEventService from './services/eventService.js';
import SupremaDoorService from './services/doorService.js';
import SupremaTNAService from './services/tnaService.js';
import SupremaBiometricService from './services/biometricService.js';
import SupremaTimeService from './services/timeService.js';
import SyncService from './services/syncService.js';
import EnrollmentService from './services/enrollmentService.js';
import UserSyncService from './services/userSyncService.js';
import ProcessService from './services/processService.js';

// Infrastructure services
import DeviceMonitoringService from './services/deviceMonitoringService.js';
import HRIntegrationService from './services/hrIntegrationService.js';
import EventReplicationService from './services/eventReplicationService.js';
import AuditService from './services/auditService.js';
import CloudSyncService from './services/cloudSyncService.js';
import SyncSettingsService from './services/syncSettingsService.js';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

/**
 * Ensure the local MySQL database exists before Prisma connects.
 * Uses mysql2 (already a project dependency) to run CREATE DATABASE IF NOT EXISTS.
 * Safe to call even if the DB already exists.
 *
 * @param {string} databaseUrl - mysql://user:pass@host:port/dbname
 * @param {object} logger
 */
async function ensureLocalDatabase(databaseUrl, logger) {
    try {
        const url = new URL(databaseUrl);
        const dbName = decodeURIComponent(url.pathname.slice(1));
        url.pathname = '/';
        const mysql = await import('mysql2/promise');
        const conn = await mysql.default.createConnection(url.toString());
        await conn.execute(
            `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
        );
        await conn.end();
        logger.info(`Local database '${dbName}' ensured`);
    } catch (err) {
        // Non-fatal: DB may already exist or credentials differ
        logger.warn('ensureLocalDatabase: could not auto-create DB (continuing):', err.message);
    }
}

/**
 * Check whether all Prisma-managed tables exist. Returns true if any are missing.
 *
 * @param {string} databaseUrl
 * @param {string[]} expectedTables
 * @returns {Promise<boolean>}
 */
async function isSchemaMissing(databaseUrl, expectedTables) {
    try {
        const url = new URL(databaseUrl);
        const dbName = decodeURIComponent(url.pathname.slice(1));
        const mysql = await import('mysql2/promise');
        const conn = await mysql.default.createConnection(databaseUrl);
        const [rows] = await conn.query(
            'SELECT table_name AS t FROM information_schema.tables WHERE table_schema = ?',
            [dbName]
        );
        await conn.end();
        const existing = new Set(rows.map(r => String(r.t || r.table_name).toLowerCase()));
        return expectedTables.some(t => !existing.has(t.toLowerCase()));
    } catch {
        // If we can't check, assume schema is missing so push runs
        return true;
    }
}

/**
 * Run `prisma db push` to create/update the local schema.
 * Idempotent: when the DB already matches schema.prisma, Prisma exits quickly
 * without altering anything. Skipped when AUTO_SCHEMA_SYNC=false.
 *
 * @param {object} logger
 */
async function ensureSchema(logger) {
    if (process.env.AUTO_SCHEMA_SYNC === 'false') {
        logger.info('Schema auto-sync disabled (AUTO_SCHEMA_SYNC=false)');
        return;
    }

    // Tables that MUST exist for the app to run
    const expected = [
        'device', 'employee', 'events', 'card_assignments',
        'device_enrollments', 'audit_logs', 'system_settings',
    ];
    const missing = await isSchemaMissing(config.database.url, expected);

    // Resolve paths up-front — needed for both db push and prisma generate
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const backendRoot = path.resolve(__dirname, '..');
    const schemaPath = path.join(backendRoot, 'prisma', 'schema.prisma');
    const isWin = process.platform === 'win32';
    const binName = isWin ? 'prisma.cmd' : 'prisma';
    const fs = await import('fs');

    // Detect whether the generated PrismaClient is stale relative to schema.prisma
    let clientStale = false;
    try {
        const schemaStat = fs.statSync(schemaPath);
        // The hoisted generated client lives at workspace root in monorepos
        const clientCandidates = [
            path.join(backendRoot, 'node_modules', '.prisma', 'client', 'index.js'),
            path.join(backendRoot, '..', '..', 'node_modules', '.prisma', 'client', 'index.js'),
        ];
        const clientPath = clientCandidates.find(p => fs.existsSync(p));
        if (!clientPath) {
            clientStale = true;
        } else {
            const clientStat = fs.statSync(clientPath);
            if (schemaStat.mtimeMs > clientStat.mtimeMs) clientStale = true;
        }
    } catch {
        clientStale = true;
    }

    if (!missing && !clientStale) {
        logger.debug('Schema check: all expected tables present, generated client up to date');
        return;
    }

    if (missing) {
        logger.info('Schema missing or out of date — running prisma db push...');
    } else {
        logger.info('Generated Prisma client is stale — running prisma generate...');
    }

    let prismaBin = null;
    let dir = backendRoot;
    for (let i = 0; i < 5; i++) {
        const candidate = path.join(dir, 'node_modules', '.bin', binName);
        if (fs.existsSync(candidate)) {
            prismaBin = candidate;
            break;
        }
        const parent = path.dirname(dir);
        if (parent === dir) break;
        dir = parent;
    }

    if (!prismaBin) {
        logger.error('Prisma CLI not found in any node_modules/.bin — skipping schema sync');
        return;
    }

    // `db push` (without --skip-generate) implicitly runs `generate`, so we
    // only need a standalone `generate` when the DB is fine but the client is stale.
    const args = missing
        ? ['db', 'push', '--accept-data-loss']
        : ['generate'];

    await new Promise((resolve) => {
        const child = spawn(
            prismaBin,
            args,
            { cwd: backendRoot, env: process.env, shell: isWin }
        );
        let stderr = '';
        child.stdout.on('data', d => logger.info('[prisma] ' + d.toString().trim()));
        child.stderr.on('data', d => { stderr += d.toString(); });
        child.on('error', err => {
            logger.error(`prisma ${args.join(' ')} spawn error: ` + err.message);
            resolve();
        });
        child.on('close', code => {
            if (code === 0) {
                logger.info(`prisma ${args.join(' ')} complete`);
            } else {
                logger.error(`prisma ${args.join(' ')} failed (exit ${code}):\n${stderr}`);
            }
            resolve();
        });
    });
}

/**
 * Bootstrap the application.
 * Creates and registers all dependencies in the DI container following this order:
 *   1. Configuration
 *   2. Logger
 *   3. Database (single PrismaClient)
 *   4. Repositories
 *   5. Connection service + gateway init
 *   6. Domain services
 *   7. Composite services (sync, enrollment)
 *   8. Infrastructure services (monitoring, HR integration)
 *
 * @returns {Promise<import('./core/container/index.js').Container>}
 */
export async function bootstrap() {
    const container = getContainer();

    // ── 1. Configuration ──────────────────────────────────────────────────
    container.registerInstance('config', config);

    // ── 2. Logger ─────────────────────────────────────────────────────────
    const logger = createAppLogger();
    container.registerInstance('logger', logger);

    setupUnhandledRejectionHandler(logger);
    setupUncaughtExceptionHandler(logger);

    // ── 3. Database (single shared PrismaClient) ──────────────────────────
    if (config.database.url) {
        await ensureLocalDatabase(config.database.url, logger);
        await ensureSchema(logger);
    }

    // Dynamic import AFTER `prisma generate` ran inside ensureSchema, so a
    // newly added model is available on the client without a manual restart.
    const { PrismaClient } = await import('@prisma/client');

    const datasourceUrl = config.database.url
        ? `${config.database.url}${config.database.url.includes('?') ? '&' : '?'}connection_limit=${config.database.poolMax}&pool_timeout=${config.database.poolTimeout}`
        : undefined;

    const prisma = new PrismaClient({
        log: config.database.logQueries
            ? [
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'info' },
                { emit: 'event', level: 'warn' },
                { emit: 'event', level: 'error' },
              ]
            : [{ emit: 'stdout', level: 'error' }],
        ...(datasourceUrl ? { datasourceUrl } : {}),
    });
    container.registerInstance('prisma', prisma);

    logger.info('Prisma connection pool configured', {
        poolMax: config.database.poolMax,
        poolTimeout: config.database.poolTimeout,
    });

    const database = new DatabaseManager(logger, prisma);
    await database.initialize();
    // Watch the connection and auto-reconnect when the network drops.
    // Initialize() does not throw on failure anymore — the monitor will keep
    // retrying in the background until connectivity is restored.
    database.startConnectionMonitor({
        heartbeatIntervalMs: parseInt(process.env.DB_HEARTBEAT_INTERVAL_MS) || 15000,
        reconnectInitialDelayMs: parseInt(process.env.DB_RECONNECT_INITIAL_DELAY_MS) || 2000,
        reconnectMaxDelayMs: parseInt(process.env.DB_RECONNECT_MAX_DELAY_MS) || 60000,
    });
    container.registerInstance('database', database);

    // ── 3b. Cloud PrismaClient (sync only — null when CLOUD_DATABASE_URL not set) ──
    let cloudPrisma = null;
    if (config.database.cloudUrl) {
        cloudPrisma = new PrismaClient({
            log: [{ emit: 'stdout', level: 'error' }],
            datasourceUrl: config.database.cloudUrl,
        });
        container.registerInstance('cloudPrisma', cloudPrisma);
        logger.info('Cloud database client initialized for sync');
    } else {
        logger.warn('CLOUD_DATABASE_URL not set — cloud sync disabled');
    }

    // ── 4. Repositories ───────────────────────────────────────────────────
    const repositories = createRepositories(prisma, logger);
    container.registerInstance('repositories', repositories);
    container.registerInstance('cardAssignmentRepository', repositories.cardAssignment);
    container.registerInstance('deviceEnrollmentRepository', repositories.deviceEnrollment);
    container.registerInstance('deviceRepository', repositories.device);
    container.registerInstance('eventRepository', repositories.event);

    // ── 5. Connection service (requires gateway initialization) ───────────
    const gatewayConfig = {
        ip: config.gateway.ip,
        port: config.gateway.port,
        useSSL: config.gateway.useSSL,
        caFile: config.gateway.caFile,
        tlsServerName: config.gateway.tlsServerName,
        readyTimeoutMs: config.gateway.readyTimeoutMs,
    };

    const connectionService = new SupremaConnectionService(
        { gateway: gatewayConfig },
        database
    );
    // Gateway init is non-fatal — if the device gateway is offline, the rest
    // of the app (DB, cloud sync, HTTP API) still starts. Device connections
    // are retried by deviceMonitoringService once the gateway is reachable.
    try {
        await connectionService.initializeGateway();
    } catch (err) {
        logger.warn(
            `Gateway init failed (${err.message}) — continuing startup. ` +
            'Device monitoring will retry in the background.'
        );
    }

    // Device connections are deferred to post-startup so the HTTP server
    // starts immediately, even when devices are unreachable.
    container.registerInstance('connectionService', connectionService);

    // ── 6. Domain services ────────────────────────────────────────────────
    const userService = new SupremaUserService(connectionService, { prisma, logger });
    container.registerInstance('userService', userService);

    const eventService = new SupremaEventService(connectionService);
    container.registerInstance('eventService', eventService);

    const doorService = new SupremaDoorService(connectionService);
    container.registerInstance('doorService', doorService);

    const tnaService = new SupremaTNAService(connectionService, eventService);
    container.registerInstance('tnaService', tnaService);

    const biometricService = new SupremaBiometricService(connectionService);
    container.registerInstance('biometricService', biometricService);

    const timeService = new SupremaTimeService(connectionService, database);
    container.registerInstance('timeService', timeService);

    // ── 7. Composite services ─────────────────────────────────────────────
    const domainServices = {
        connection: connectionService,
        user: userService,
        event: eventService,
        door: doorService,
        tna: tnaService,
        biometric: biometricService,
        time: timeService,
        database
    };

    const syncService = new SyncService(domainServices, { database, logger });
    container.registerInstance('syncService', syncService);

    const enrollmentService = new EnrollmentService(
        userService,
        biometricService,
        connectionService,
        { prisma, logger }
    );
    container.registerInstance('enrollmentService', enrollmentService);

    const userSyncService = new UserSyncService(
        userService,
        connectionService,
        logger,
        { prisma, biometricService }
    );
    container.registerInstance('userSyncService', userSyncService);

    const processService = new ProcessService(logger);
    container.registerInstance('processService', processService);

    // ── 8. Infrastructure services ────────────────────────────────────────
    const deviceMonitoring = new DeviceMonitoringService(connectionService, logger);
    container.registerInstance('deviceMonitoringService', deviceMonitoring);

    const hrIntegration = new HRIntegrationService(domainServices, logger);
    container.registerInstance('hrIntegrationService', hrIntegration);

    const eventReplication = new EventReplicationService(
        {
            connectionService,
            eventService,
            eventRepository: repositories.event,
            database,
            logger,
        },
        {
            intervalMs: parseInt(process.env.EVENT_SYNC_INTERVAL_MS) || 60_000,
            batchSize: parseInt(process.env.EVENT_SYNC_BATCH_SIZE) || 1000,
            maxBatches: parseInt(process.env.EVENT_SYNC_MAX_BATCHES) || 50,
            enableRealtime: process.env.ENABLE_REALTIME_EVENTS === 'true',
            realtimeQueueSize: parseInt(process.env.EVENT_REALTIME_QUEUE_SIZE) || 100,
        },
    );
    container.registerInstance('eventReplicationService', eventReplication);

    const auditService = new AuditService(prisma, logger);
    container.registerInstance('auditService', auditService);

    const syncSettingsService = new SyncSettingsService(prisma, logger);
    container.registerInstance('syncSettingsService', syncSettingsService);

    // ── 9. Cloud sync service ─────────────────────────────────────────────
    // CloudSync gets its own dedicated local PrismaClient so that the
    // AutoSync device-write storm (30 devices in parallel) cannot exhaust
    // the shared pool and cause P2024 timeouts during CloudSync's planning
    // phase (localPrisma.event.findMany() etc.).
    // We give it a small dedicated pool (5 connections, 60 s timeout) that
    // is separate from the main shared pool used by AutoSync / HTTP routes.
    const cloudSyncLocalPrisma = config.database.url
        ? new PrismaClient({
            log: [{ emit: 'stdout', level: 'error' }],
            datasourceUrl: `${config.database.url}${config.database.url.includes('?') ? '&' : '?'}connection_limit=5&pool_timeout=60`,
          })
        : prisma; // fallback to shared client when no explicit URL (shouldn't happen)
    const cloudSync = new CloudSyncService({
        localPrisma: cloudSyncLocalPrisma,
        cloudPrisma,  // null-safe — CloudSyncService is a no-op when cloudPrisma is null
        logger,
        intervalMs: config.database.cloudSyncIntervalMs,
        trigger: config.database.cloudSyncTrigger,
    });
    container.registerInstance('cloudSyncService', cloudSync);

    logger.info('Application bootstrap complete', {
        environment: config.app.env,
        version: config.app.version
    });

    return container;
}

export default { bootstrap };
