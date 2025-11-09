/**
 * Main Application Entry Point
 * Suprema HR Integration System
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');

// Import services
const SupremaConnectionService = require('./src/services/connectionService');
const SupremaUserService = require('./src/services/userService');
const SupremaEventService = require('./src/services/eventService');
const SupremaDoorService = require('./src/services/doorService');
const SupremaTNAService = require('./src/services/tnaService');
const SupremaBiometricService = require('./src/services/biometricService');

// Import database
const DatabaseManager = require('./src/models/database');

// Import routes
const deviceRoutes = require('./src/routes/deviceRoutes');
const userRoutes = require('./src/routes/userRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const doorRoutes = require('./src/routes/doorRoutes');
const tnaRoutes = require('./src/routes/tnaRoutes');
const biometricRoutes = require('./src/routes/biometricRoutes');
const hrRoutes = require('./src/routes/hrRoutes');

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

        this.initializeServices();
        this.setupMiddleware();
        this.setupRoutes();
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

            // Try to get gateway configuration from database first
            let gatewayConfig = await this.database.getGatewayConfig();
            
            if (!gatewayConfig) {
                // Fall back to environment variables if not in database
                this.logger.info('Gateway configuration not found in database, using environment variables');
                gatewayConfig = {
                    ip: process.env.GATEWAY_IP || '127.0.0.1',
                    port: parseInt(process.env.GATEWAY_PORT) || 4000,
                    caFile: process.env.GATEWAY_CA_FILE || './cert/gateway/ca.crt'
                };
            } else {
                this.logger.info(`Gateway configuration loaded from database: ${gatewayConfig.ip}:${gatewayConfig.port}`);
            }

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
            req.requestId = require('uuid').v4();
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
                        biometric: !!this.services.biometric
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
                    hr: '/api/hr'
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
                userId: event.userid,
                deviceId: event.deviceid,
                timestamp: event.timestamp,
                eventId: event.id
            };
            this.sendToHRSystem('access', hrEvent);
        });

        this.services.event.on('auth:failure', (event) => {
            const hrEvent = {
                type: 'access_denied',
                userId: event.userid || 'unknown',
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
            await this.initializeServices();
            
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
if (require.main === module) {
    const app = new SupremaHRIntegrationApp();
    app.start();
}

module.exports = SupremaHRIntegrationApp;