/**
 * Express Application Factory
 * Creates and configures the Express application with middleware, routes,
 * and error handling.  Receives all dependencies from the DI container.
 *
 * Follows the Factory pattern — no side effects at import time.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';

// Routes
import deviceRoutes from './routes/deviceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import doorRoutes from './routes/doorRoutes.js';
import tnaRoutes from './routes/tnaRoutes.js';
import biometricRoutes from './routes/biometricRoutes.js';
import hrRoutes from './routes/hrRoutes.js';
import gateEventRoutes from './routes/gateEventRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import timeRoutes from './routes/timeRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import presetRoutes from './routes/presetRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

// Error handling infrastructure
import { createErrorHandler, notFoundHandler } from './core/errors/index.js';

/**
 * Build a services object for route factories (backward-compatible shape).
 * Routes receive this instead of the raw container.
 * @param {import('./core/container/index.js').Container} container
 * @returns {Object}
 */
function buildServicesObject(container) {
    return {
        connection: container.resolve('connectionService'),
        user: container.resolve('userService'),
        event: container.resolve('eventService'),
        eventReplication: container.resolve('eventReplicationService'),
        door: container.resolve('doorService'),
        tna: container.resolve('tnaService'),
        biometric: container.resolve('biometricService'),
        time: container.resolve('timeService'),
        sync: container.resolve('syncService'),
        enrollment: container.resolve('enrollmentService'),
        card: container.resolve('biometricService'), // card ops via biometric service
        database: container.resolve('database'),
        logger: container.resolve('logger'),
        audit: container.resolve('auditService'),
    };
}

// ─── Middleware ───────────────────────────────────────────────────────────────

function setupMiddleware(app, config, logger) {
    app.use(helmet());

    app.use(cors({
        origin: config.server.corsOrigin,
        credentials: true
    }));

    app.use(morgan('combined', {
        stream: { write: (msg) => logger.info(msg.trim()) }
    }));

    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));

    // Attach unique request ID
    app.use((req, res, next) => {
        req.requestId = uuidv4();
        res.setHeader('X-Request-ID', req.requestId);
        next();
    });
}

// ─── Routes ──────────────────────────────────────────────────────────────────

function setupRoutes(app, services) {
    // Health check (no auth required)
    app.get('/health', createHealthCheck(services));

    // Domain API routes
    app.use('/api/devices', deviceRoutes(services));
    app.use('/api/users', userRoutes(services));
    app.use('/api/events', eventRoutes(services));
    app.use('/api/doors', doorRoutes(services));
    app.use('/api/tna', tnaRoutes(services));
    app.use('/api/biometric', biometricRoutes(services));
    app.use('/api/hr', hrRoutes(services));
    app.use('/api/gate-events', gateEventRoutes(services));
    app.use('/api/employees', employeeRoutes(services));
    app.use('/api/cards', cardRoutes(services));
    app.use('/api/enrollment', enrollmentRoutes(services));
    app.use('/api/locations', locationRoutes(services));
    app.use('/api/time', timeRoutes(services));
    app.use('/api/audit', auditRoutes(services));
    app.use('/api/presets', presetRoutes(services));
    app.use('/api/reports', reportRoutes(services));

    // API documentation index
    app.get('/api', (req, res) => {
        res.json({
            name: 'Suprema HR Integration API',
            version: '1.0.0',
            description: 'REST API for Suprema BioStar device integration with HR systems',
            endpoints: {
                devices: '/api/devices',
                users: '/api/users',
                events: '/api/events',
                eventReplicationHealth: '/api/events/replication/health',
                doors: '/api/doors',
                tna: '/api/tna',
                biometric: '/api/biometric',
                hr: '/api/hr',
                gateEvents: '/api/gate-events',
                employees: '/api/employees',
                cards: '/api/cards',
                enrollment: '/api/enrollment',
                locations: '/api/locations',
                time: '/api/time',
                audit: '/api/audit',
                presets: '/api/presets',
                reports: '/api/reports'
            },
            health: '/health'
        });
    });
}

// ─── Error Handling ──────────────────────────────────────────────────────────

function setupErrorHandling(app, logger) {
    // 404 for undefined routes
    app.use(notFoundHandler);

    // Centralised error handler (uses AppError hierarchy)
    app.use(createErrorHandler({ logger }));
}

// ─── Health Check ────────────────────────────────────────────────────────────

function createHealthCheck(services) {
    return async (req, res) => {
        try {
            const database = services.database;
            const dbHealth = database
                ? await database.testConnection()
                : { success: false, message: 'Database not initialized' };

            let deviceStatus = { total: 0, connected: 0, active: 0 };
            if (database) {
                try {
                    const [allDevices, connectedDevices, activeDevices] = await Promise.all([
                        database.getAllDevices(),
                        database.getConnectedDevices(),
                        database.getActiveDevices()
                    ]);
                    deviceStatus = {
                        total: allDevices.length,
                        connected: connectedDevices.length,
                        active: activeDevices.length
                    };
                } catch (error) {
                    deviceStatus.error = error.message;
                }
            }

            const gatewayConnected = services.connection?.getConnectionStats?.()?.gatewayConnected ?? false;

            const healthData = {
                status: dbHealth.success ? 'healthy' : 'degraded',
                timestamp: new Date().toISOString(),
                gateway: gatewayConnected ? 'connected' : 'disconnected',
                database: { connected: dbHealth.success, message: dbHealth.message },
                devices: deviceStatus,
                services: {
                    connection: gatewayConnected,
                    user: gatewayConnected && !!services.user,
                    event: gatewayConnected && !!services.event,
                    door: gatewayConnected && !!services.door,
                    tna: gatewayConnected && !!services.tna,
                    biometric: gatewayConnected && !!services.biometric,
                    time: gatewayConnected && !!services.time,
                    sync: !!services.sync,
                    enrollment: !!services.enrollment
                }
            };

            res.status(dbHealth.success ? 200 : 503).json(healthData);
        } catch (error) {
            res.status(503).json({
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                error: error.message
            });
        }
    };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Create the fully-configured Express application.
 *
 * @param {import('./core/container/index.js').Container} container - DI container
 * @returns {express.Application}
 */
export function createApp(container) {
    const app = express();
    const logger = container.resolve('logger');
    const config = container.resolve('config');
    const services = buildServicesObject(container);

    setupMiddleware(app, config, logger);
    setupRoutes(app, services);
    setupErrorHandling(app, logger);

    return app;
}

export default createApp;
