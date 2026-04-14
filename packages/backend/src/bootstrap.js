/**
 * Application Bootstrap
 * Initializes and wires ALL application components through the DI container.
 * This is the single composition root — no service should create its own
 * dependencies.
 */

import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
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

// Infrastructure services
import DeviceMonitoringService from './services/deviceMonitoringService.js';
import HRIntegrationService from './services/hrIntegrationService.js';
import EventReplicationService from './services/eventReplicationService.js';
import AuditService from './services/auditService.js';

dotenv.config();

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
    const datasourceUrl = config.database.url
        ? `${config.database.url}${config.database.url.includes('?') ? '&' : '?'}connection_limit=${config.database.poolMax}&pool_timeout=30`
        : undefined;

    const prisma = new PrismaClient({
        log: config.database.logQueries
            ? ['query', 'info', 'warn', 'error']
            : ['error'],
        ...(datasourceUrl ? { datasourceUrl } : {}),
    });
    container.registerInstance('prisma', prisma);

    logger.info('Prisma connection pool configured', {
        poolMax: config.database.poolMax,
        poolMin: config.database.poolMin,
    });

    const database = new DatabaseManager(logger, prisma);
    await database.initialize();
    container.registerInstance('database', database);

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
    await connectionService.initializeGateway();

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

    logger.info('Application bootstrap complete', {
        environment: config.app.env,
        version: config.app.version
    });

    return container;
}

export default { bootstrap };
