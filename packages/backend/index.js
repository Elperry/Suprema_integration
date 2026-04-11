/**
 * Main Application Entry Point
 * Suprema HR Integration System
 */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import services
import SupremaConnectionService from './src/services/connectionService.js';
import SupremaUserService from './src/services/userService.js';
import SupremaEventService from './src/services/eventService.js';
import SupremaDoorService from './src/services/doorService.js';
import SupremaTNAService from './src/services/tnaService.js';
import SupremaBiometricService from './src/services/biometricService.js';
import SupremaTimeService from './src/services/timeService.js';
import SyncService from './src/services/syncService.js';

// Import database
import DatabaseManager from './src/models/database.js';

// Import routes
import deviceRoutes from './src/routes/deviceRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import doorRoutes from './src/routes/doorRoutes.js';
import tnaRoutes from './src/routes/tnaRoutes.js';
import biometricRoutes from './src/routes/biometricRoutes.js';
import hrRoutes from './src/routes/hrRoutes.js';
import gateEventRoutes from './src/routes/gateEventRoutes.js';
import employeeRoutes from './src/routes/employeeRoutes.js';
import cardRoutes from './src/routes/cardRoutes.js';
import enrollmentRoutes from './src/routes/enrollmentRoutes.js';
import locationRoutes from './src/routes/locationRoutes.js';
import timeRoutes from './src/routes/timeRoutes.js';

// Import enrollment service
import EnrollmentService from './src/services/enrollmentService.js';

// ES6 module equivalents for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

/**
 * Helper function to extract user ID from event
 * For user-related events (0x5000-0x5FFF), the user ID may be in entityid instead of userid
 * @param {Object} event - Event object from device
 * @returns {string|null} User ID or null
 */
function extractUserIdFromEvent(event) {
    // First check userid
    if (event.userid && event.userid !== '' && event.userid !== '0') {
        return event.userid;
    }
    
    // For user events (event codes 0x5000-0x5FFF = 20480-24575), use entityid as fallback
    const eventCode = event.eventcode || 0;
    if (eventCode >= 0x5000 && eventCode <= 0x5FFF) {
        if (event.entityid && event.entityid !== 0) {
            return String(event.entityid);
        }
    }
    
    return null;
}

class SupremaHRIntegrationApp {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.services = {};
        
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }),
                new winston.transports.File({ 
                    filename: process.env.LOG_FILE || './logs/application.log' 
                })
            ]
        });

        this.setupMiddleware();
        this.setupErrorHandling();
    }

    /**
     * Initialize database and all Suprema services
     */
    async initializeServices() {
        try {
            // Initialize database
            this.database = new DatabaseManager(this.logger);
            await this.database.initialize();

            // Get gateway configuration from environment variables
            this.logger.info('Using gateway configuration from environment variables');
            const gatewayConfig = {
                ip: process.env.GATEWAY_IP || '127.0.0.1',
                port: parseInt(process.env.GATEWAY_PORT) || 4000,
                caFile: process.env.GATEWAY_CA_FILE || './cert/gateway/ca.crt'
            };

            const config = {
                gateway: gatewayConfig
            };

            // Initialize connection service with database support
            this.services.connection = new SupremaConnectionService(config, this.database);
            await this.services.connection.initializeGateway();

            // Load and connect to all devices from database
            const deviceConnections = await this.services.connection.loadAndConnectDevices();
            this.logger.info(`Connected to ${deviceConnections.filter(c => c.success).length} devices from database`);

            // Initialize other services with database support
            this.services.user = new SupremaUserService(this.services.connection, this.database);
            this.services.event = new SupremaEventService(this.services.connection, this.database);
            this.services.door = new SupremaDoorService(this.services.connection, this.database);
            this.services.tna = new SupremaTNAService(this.services.connection, this.services.event, this.database);
            this.services.biometric = new SupremaBiometricService(this.services.connection, this.database);
            this.services.time = new SupremaTimeService(this.services.connection, this.database);
            
            // Card service is provided by biometricService (scanCard, getBlacklist, etc.)
            // This creates a unified interface for card operations via /api/cards routes
            this.services.card = this.services.biometric;
            
            // Expose database on the shared services object so route factories
            // and other modules can access the DatabaseManager via services.database
            this.services.database = this.database;

            // Initialize sync service for event/user synchronization
            this.services.sync = new SyncService(this.services);

            // Initialize enrollment service for card-based employee enrollment
            this.services.enrollment = new EnrollmentService(
                this.services.user,
                this.services.biometric,
                this.services.connection
            );

            // Sync time and timezone for all connected devices on startup
            await this.syncDeviceTime();

            // Setup event listeners for HR integration
            this.setupHREventListeners();

            // Setup periodic device status sync and auto-reconnection
            this.setupDeviceMonitoring();

            this.logger.info('All Suprema services initialized successfully');
        } catch (error) {
            this.logger.error('Failed to initialize services:', error);
            throw error;
        }
    }

    /**
     * Setup middleware
     */
    setupMiddleware() {
        // Security middleware
        this.app.use(helmet());
        
        // CORS middleware
        this.app.use(cors({
            origin: process.env.CORS_ORIGIN || '*',
            credentials: true
        }));

        // Logging middleware
        this.app.use(morgan('combined', {
            stream: {
                write: (message) => this.logger.info(message.trim())
            }
        }));

        // Body parsing middleware
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));

        // Request ID middleware
        this.app.use((req, res, next) => {
            req.requestId = uuidv4();
            res.setHeader('X-Request-ID', req.requestId);
            next();
        });
    }

    /**
     * Setup API routes
     */
    setupRoutes() {
        // Health check endpoint
        this.app.get('/health', async (req, res) => {
            try {
                // Test database connection
                const dbHealth = this.database ? await this.database.testConnection() : { success: false, message: 'Database not initialized' };
                
                // Get device status from database
                let deviceStatus = { total: 0, connected: 0, active: 0 };
                if (this.database) {
                    try {
                        const allDevices = await this.database.getAllDevices();
                        const connectedDevices = await this.database.getConnectedDevices();
                        const activeDevices = await this.database.getActiveDevices();
                        
                        deviceStatus = {
                            total: allDevices.length,
                            connected: connectedDevices.length,
                            active: activeDevices.length
                        };
                    } catch (error) {
                        deviceStatus.error = error.message;
                    }
                }

                const healthData = {
                    status: dbHealth.success ? 'healthy' : 'degraded',
                    timestamp: new Date().toISOString(),
                    database: {
                        connected: dbHealth.success,
                        message: dbHealth.message
                    },
                    devices: deviceStatus,
                    services: {
                        connection: !!this.services.connection,
                        user: !!this.services.user,
                        event: !!this.services.event,
                        door: !!this.services.door,
                        tna: !!this.services.tna,
                        biometric: !!this.services.biometric,
                        time: !!this.services.time,
                        sync: !!this.services.sync,
                        enrollment: !!this.services.enrollment
                    }
                };

                const statusCode = dbHealth.success ? 200 : 503;
                res.status(statusCode).json(healthData);
            } catch (error) {
                res.status(503).json({
                    status: 'unhealthy',
                    timestamp: new Date().toISOString(),
                    error: error.message
                });
            }
        });

        // API routes
        this.app.use('/api/devices', deviceRoutes(this.services));
        this.app.use('/api/users', userRoutes(this.services));
        this.app.use('/api/events', eventRoutes(this.services));
        this.app.use('/api/doors', doorRoutes(this.services));
        this.app.use('/api/tna', tnaRoutes(this.services));
        this.app.use('/api/biometric', biometricRoutes(this.services));
        this.app.use('/api/hr', hrRoutes(this.services));
        this.app.use('/api/gate-events', gateEventRoutes(this.database, this.logger));
        this.app.use('/api/employees', employeeRoutes(this.database, this.logger));
        this.app.use('/api/cards', cardRoutes(this.services));
        this.app.use('/api/enrollment', enrollmentRoutes(this.services));
        this.app.use('/api/locations', locationRoutes({ ...this.services, database: this.database }));
        this.app.use('/api/time', timeRoutes(this.services));

        // API documentation
        this.app.get('/api', (req, res) => {
            res.json({
                name: 'Suprema HR Integration API',
                version: '1.0.0',
                description: 'REST API for Suprema BioStar device integration with HR systems',
                endpoints: {
                    devices: '/api/devices',
                    users: '/api/users',
                    events: '/api/events',
                    doors: '/api/doors',
                    tna: '/api/tna',
                    biometric: '/api/biometric',
                    hr: '/api/hr',
                    gateEvents: '/api/gate-events',
                    employees: '/api/employees',
                    cards: '/api/cards',
                    enrollment: '/api/enrollment',
                    time: '/api/time'
                },
                health: '/health'
            });
        });

        // 404 handler
        this.app.use('*', (req, res) => {
            res.status(404).json({
                error: 'Not Found',
                message: `Route ${req.method} ${req.originalUrl} not found`,
                requestId: req.requestId
            });
        });
    }

    /**
     * Setup error handling
     */
    setupErrorHandling() {
        // Global error handler
        this.app.use((error, req, res, next) => {
            this.logger.error('Unhandled error:', {
                error: error.message,
                stack: error.stack,
                requestId: req.requestId,
                url: req.originalUrl,
                method: req.method
            });

            res.status(error.status || 500).json({
                error: 'Internal Server Error',
                message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
                requestId: req.requestId
            });
        });

        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            this.logger.error('Uncaught Exception:', error);
            process.exit(1);
        });

        // Handle unhandled rejections
        process.on('unhandledRejection', (reason, promise) => {
            this.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
            process.exit(1);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => this.shutdown());
        process.on('SIGINT', () => this.shutdown());
    }

    /**
     * Setup HR integration event listeners
     */
    setupHREventListeners() {
        // Listen for T&A events for HR integration
        this.services.tna.on('tna:hrEvent', (hrEvent) => {
            this.logger.info('HR T&A Event:', hrEvent);
            // Here you would send the event to your HR system
            this.sendToHRSystem('attendance', hrEvent);
        });

        // Listen for authentication events
        this.services.event.on('auth:success', (event) => {
            const hrEvent = {
                type: 'access_granted',
                userId: extractUserIdFromEvent(event),
                deviceId: event.deviceid,
                timestamp: event.timestamp,
                eventId: event.id
            };
            this.sendToHRSystem('access', hrEvent);
        });

        this.services.event.on('auth:failure', (event) => {
            const hrEvent = {
                type: 'access_denied',
                userId: extractUserIdFromEvent(event) || 'unknown',
                deviceId: event.deviceid,
                timestamp: event.timestamp,
                eventId: event.id,
                reason: 'authentication_failed'
            };
            this.sendToHRSystem('access', hrEvent);
        });

        // Listen for user management events
        this.services.user.on('users:enrolled', (data) => {
            const hrEvent = {
                type: 'users_enrolled',
                deviceId: data.deviceId,
                userIds: data.users,
                timestamp: new Date().toISOString()
            };
            this.sendToHRSystem('user_management', hrEvent);
        });

        this.services.user.on('users:deleted', (data) => {
            const hrEvent = {
                type: 'users_deleted',
                deviceId: data.deviceId,
                userIds: data.userIds,
                timestamp: new Date().toISOString()
            };
            this.sendToHRSystem('user_management', hrEvent);
        });
    }

    /**
     * Sync time and timezone for all connected devices
     * Called on backend startup to ensure all devices have correct time
     */
    async syncDeviceTime() {
        try {
            if (!this.services.time) {
                this.logger.warn('Time service not available for device time sync');
                return;
            }

            // Check if time sync is enabled (default: true)
            const enableTimeSync = process.env.ENABLE_DEVICE_TIME_SYNC !== 'false';
            if (!enableTimeSync) {
                this.logger.info('Device time sync is disabled via ENABLE_DEVICE_TIME_SYNC=false');
                return;
            }

            // Determine which timezone to use
            const useSystemTimezone = process.env.USE_SYSTEM_TIMEZONE === 'true';
            
            this.logger.info('═══════════════════════════════════════════════════════════');
            this.logger.info('           DEVICE TIME SYNCHRONIZATION                     ');
            this.logger.info('═══════════════════════════════════════════════════════════');

            let result;
            if (useSystemTimezone) {
                this.logger.info('Using system timezone for device sync');
                result = await this.services.time.syncWithSystemTimezone();
            } else {
                // Use configured timezone offset or default (0 = UTC)
                const timezoneOffset = parseInt(process.env.DEVICE_TIMEZONE_OFFSET) || 0;
                this.logger.info(`Using configured timezone offset: ${timezoneOffset}s (${timezoneOffset / 3600}h)`);
                result = await this.services.time.syncAllDevices(timezoneOffset);
            }

            if (result.success) {
                this.logger.info(`✓ Time sync completed: ${result.devicesCount} devices synchronized`);
                this.logger.info(`  Server time: ${result.serverTime}`);
                this.logger.info(`  Timezone: ${result.timezone.description}`);
            } else {
                this.logger.warn('Time sync completed with some errors:', result);
            }

            this.logger.info('═══════════════════════════════════════════════════════════');

        } catch (error) {
            // Don't fail startup if time sync fails, just log the error
            this.logger.error('Failed to sync device time (non-fatal):', error.message);
        }
    }

    /**
     * Send events to HR system
     * @param {string} category - Event category
     * @param {Object} data - Event data
     */
    async sendToHRSystem(category, data) {
        try {
            if (!process.env.HR_API_BASE_URL) {
                this.logger.warn('HR API base URL not configured, skipping HR integration');
                return;
            }

            // Here you would implement the actual HTTP request to your HR system
            // This is a placeholder implementation
            const hrPayload = {
                category,
                data,
                source: 'suprema_integration',
                timestamp: new Date().toISOString()
            };

            this.logger.info('Sending to HR system:', hrPayload);
            
            // Example implementation:
            // const axios = require('axios');
            // await axios.post(`${process.env.HR_API_BASE_URL}/webhook/suprema`, hrPayload, {
            //     headers: {
            //         'Authorization': `Bearer ${process.env.HR_API_TOKEN}`,
            //         'Content-Type': 'application/json'
            //     }
            // });

        } catch (error) {
            this.logger.error('Failed to send event to HR system:', error);
        }
    }

    /**
     * Start the application
     */
    async start() {
        try {
            // Initialize services first, then set up routes
            await this.initializeServices();
            this.setupRoutes();
            
            this.server = this.app.listen(this.port, () => {
                this.logger.info(`Suprema HR Integration Server running on port ${this.port}`);
                this.logger.info(`API documentation available at http://localhost:${this.port}/api`);
                this.logger.info(`Health check available at http://localhost:${this.port}/health`);
            });

            // Start real-time event monitoring if enabled
            if (process.env.ENABLE_REALTIME_EVENTS === 'true') {
                await this.startEventMonitoring();
            }

        } catch (error) {
            this.logger.error('Failed to start application:', error);
            process.exit(1);
        }
    }

    /**
     * Start real-time event monitoring
     */
    async startEventMonitoring() {
        try {
            // Get connected devices
            const devices = await this.services.connection.getConnectedDevices();
            const deviceIds = devices.map(device => device.id);

            if (deviceIds.length > 0) {
                await this.services.event.startMonitoring(deviceIds);
                this.logger.info(`Started real-time event monitoring for ${deviceIds.length} devices`);
            } else {
                this.logger.warn('No connected devices found for event monitoring');
            }
        } catch (error) {
            this.logger.error('Failed to start event monitoring:', error);
        }
    }

    /**
     * Setup device monitoring and auto-reconnection
     */
    setupDeviceMonitoring() {
        // Sync device status every 5 minutes
        const syncInterval = parseInt(process.env.DEVICE_SYNC_INTERVAL) || 300000; // 5 minutes
        this.deviceSyncTimer = setInterval(async () => {
            try {
                await this.services.connection.syncDeviceStatus();
            } catch (error) {
                this.logger.error('Device status sync failed:', error);
            }
        }, syncInterval);

        // Auto-reconnect failed devices every 10 minutes
        const reconnectInterval = parseInt(process.env.DEVICE_RECONNECT_INTERVAL) || 600000; // 10 minutes
        this.deviceReconnectTimer = setInterval(async () => {
            try {
                await this.services.connection.autoReconnectDevices();
            } catch (error) {
                this.logger.error('Device auto-reconnect failed:', error);
            }
        }, reconnectInterval);

        this.logger.info('Device monitoring and auto-reconnection enabled');
    }

    /**
     * Shutdown the application gracefully
     */
    async shutdown() {
        this.logger.info('Shutting down application...');
        
        try {
            // Clear device monitoring timers
            if (this.deviceSyncTimer) {
                clearInterval(this.deviceSyncTimer);
            }
            if (this.deviceReconnectTimer) {
                clearInterval(this.deviceReconnectTimer);
            }

            // Stop event monitoring
            if (this.services.event) {
                await this.services.event.stopMonitoring();
            }

            // Close server
            if (this.server) {
                this.server.close();
            }

            // Shutdown services
            if (this.services.connection) {
                await this.services.connection.shutdown();
            }

            // Close database connection
            if (this.database) {
                await this.database.close();
            }

            this.logger.info('Application shutdown complete');
            process.exit(0);
        } catch (error) {
            this.logger.error('Error during shutdown:', error);
            process.exit(1);
        }
    }

    /**
     * Get application instance
     */
    getApp() {
        return this.app;
    }

    /**
     * Get services instance
     */
    getServices() {
        return this.services;
    }
}

// Create and start application if run directly
// Always start the app when this file is executed
const app = new SupremaHRIntegrationApp();
app.start();

export default SupremaHRIntegrationApp;