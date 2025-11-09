/**
 * Database Configuration and Connection
 * Prisma setup for device and HR data management
 */

const { PrismaClient } = require('@prisma/client');
const winston = require('winston');

class DatabaseManager {
    constructor(logger = null) {
        this.prisma = null;
        this.logger = logger || winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [new winston.transports.Console()]
        });
    }

    /**
     * Initialize database connection
     */
    async initialize() {
        try {
            // Initialize Prisma client
            this.prisma = new PrismaClient({
                log: [
                    {
                        emit: 'event',
                        level: 'query',
                    },
                    {
                        emit: 'event',
                        level: 'error',
                    },
                    {
                        emit: 'event',
                        level: 'info',
                    },
                    {
                        emit: 'event',
                        level: 'warn',
                    },
                ],
            });

            // Setup logging
            this.prisma.$on('query', (e) => {
                this.logger.debug('Query: ' + e.query);
                this.logger.debug('Params: ' + e.params);
                this.logger.debug('Duration: ' + e.duration + 'ms');
            });

            this.prisma.$on('error', (e) => {
                this.logger.error('Database error:', e);
            });

            this.prisma.$on('info', (e) => {
                this.logger.info('Database info:', e.message);
            });

            this.prisma.$on('warn', (e) => {
                this.logger.warn('Database warning:', e.message);
            });

            // Test connection
            await this.prisma.$connect();
            this.logger.info('Database connection established successfully');

            // Seed initial data if needed
            await this.seedInitialData();

            return true;
        } catch (error) {
            this.logger.error('Database initialization failed:', error);
            throw error;
        }
    }



    /**
     * Seed initial data
     */
    async seedInitialData() {
        try {
            // Check if we need to seed initial devices
            const deviceCount = await this.prisma.device.count();
            
            if (deviceCount === 0 && process.env.SEED_INITIAL_DEVICES === 'true') {
                this.logger.info('Seeding initial device data...');
                
                // Example initial devices - you can modify this
                const initialDevices = [
                    {
                        name: 'Main Entrance',
                        description: 'Primary building entrance device',
                        ip: '192.168.0.110',
                        port: 51211,
                        useSSL: false,
                        location: 'Building A - Main Entrance',
                        deviceType: 'BioStation 3'
                    }
                ];

                for (const deviceData of initialDevices) {
                    await this.prisma.device.create({
                        data: deviceData
                    });
                }
                
                this.logger.info(`Seeded ${initialDevices.length} initial devices`);
            }
        } catch (error) {
            this.logger.warn('Failed to seed initial data:', error);
        }
    }

    /**
     * Close database connection
     */
    async close() {
        if (this.prisma) {
            await this.prisma.$disconnect();
            this.logger.info('Database connection closed');
        }
    }

    /**
     * Get Prisma client instance
     */
    getPrisma() {
        return this.prisma;
    }

    /**
     * Get device model (for backward compatibility)
     */
    getModel(modelName) {
        if (modelName === 'Device') {
            return {
                findAll: (options = {}) => this.prisma.device.findMany(options),
                findByPk: (id) => this.prisma.device.findUnique({ where: { id } }),
                findOne: (options) => this.prisma.device.findFirst(options),
                create: (data) => this.prisma.device.create({ data }),
                count: (options = {}) => this.prisma.device.count(options),
                getActiveDevices: () => this.prisma.device.findMany({
                    where: {
                        isActive: true,
                        status: { in: ['active', 'maintenance'] }
                    },
                    orderBy: { name: 'asc' }
                }),
                getConnectedDevices: () => this.prisma.device.findMany({
                    where: {
                        isConnected: true,
                        isActive: true
                    },
                    orderBy: { name: 'asc' }
                }),
                findByConnection: (ip, port) => this.prisma.device.findFirst({
                    where: { ip, port }
                }),
                findBySerialNumber: (serialNumber) => this.prisma.device.findFirst({
                    where: { serialNumber }
                })
            };
        }
        return null;
    }

    /**
     * Execute raw query
     */
    async query(sql, params = []) {
        return await this.prisma.$queryRawUnsafe(sql, ...params);
    }

    /**
     * Start transaction
     */
    async transaction(callback) {
        return await this.prisma.$transaction(callback);
    }

    /**
     * Test database connection
     */
    async testConnection() {
        try {
            await this.prisma.$queryRaw`SELECT 1`;
            return { success: true, message: 'Database connection is healthy' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Device management methods using Prisma
     */
    async getAllDevices() {
        return await this.prisma.device.findMany({
            orderBy: { name: 'asc' }
        });
    }

    async getActiveDevices() {
        return await this.prisma.device.findMany({
            where: {
                isActive: true,
                status: { in: ['active', 'maintenance'] }
            },
            orderBy: { name: 'asc' }
        });
    }

    async getConnectedDevices() {
        return await this.prisma.device.findMany({
            where: {
                isConnected: true,
                isActive: true
            },
            orderBy: { name: 'asc' }
        });
    }

    async addDevice(deviceData) {
        return await this.prisma.device.create({
            data: deviceData
        });
    }

    async updateDevice(id, data) {
        return await this.prisma.device.update({
            where: { id },
            data
        });
    }

    async deleteDevice(id) {
        return await this.prisma.device.delete({
            where: { id }
        });
    }

    async findDeviceByConnection(ip, port) {
        return await this.prisma.device.findFirst({
            where: { ip, port }
        });
    }

    async updateDeviceConnectionStatus(id, isConnected, error = null) {
        const updateData = {
            isConnected,
            lastConnected: isConnected ? new Date() : undefined
        };

        if (error) {
            updateData.lastError = error.message || error;
            updateData.errorCount = { increment: 1 };
            updateData.status = 'error';
        } else if (isConnected) {
            updateData.lastError = null;
            updateData.errorCount = 0;
            updateData.status = 'active';
            updateData.connectionRetries = 0;
        }

        return await this.prisma.device.update({
            where: { id },
            data: updateData
        });
    }

    async incrementDeviceRetries(id) {
        const device = await this.prisma.device.update({
            where: { id },
            data: {
                connectionRetries: { increment: 1 }
            }
        });

        if (device.connectionRetries >= device.maxRetries) {
            await this.prisma.device.update({
                where: { id },
                data: { status: 'error' }
            });
        }

        return device.connectionRetries;
    }

    async resetDeviceRetries(id) {
        return await this.prisma.device.update({
            where: { id },
            data: { connectionRetries: 0 }
        });
    }

    // ================ SYSTEM CONFIGURATION ================

    /**
     * Get gateway configuration from database
     * Returns null if not configured in database
     */
    async getGatewayConfig() {
        try {
            const configs = await this.prisma.systemConfig.findMany({
                where: {
                    category: 'gateway',
                    isActive: true
                }
            });

            if (configs.length === 0) {
                return null; // No gateway config in database
            }

            // Convert array of key-value pairs to object
            const config = {};
            configs.forEach(item => {
                config[item.key] = item.value;
            });

            return {
                ip: config.gateway_ip || config.ip,
                port: config.gateway_port ? parseInt(config.gateway_port) : (config.port ? parseInt(config.port) : null),
                caFile: config.gateway_ca_file || config.caFile || null
            };
        } catch (error) {
            this.logger.error('Error getting gateway config from database:', error);
            return null;
        }
    }

    /**
     * Save gateway configuration to database
     */
    async saveGatewayConfig(ip, port, caFile = null) {
        try {
            const configs = [
                { key: 'gateway_ip', value: ip, category: 'gateway', description: 'Gateway server IP address' },
                { key: 'gateway_port', value: port.toString(), category: 'gateway', description: 'Gateway server port' }
            ];

            if (caFile) {
                configs.push({ 
                    key: 'gateway_ca_file', 
                    value: caFile, 
                    category: 'gateway', 
                    description: 'Gateway TLS certificate file path' 
                });
            }

            for (const config of configs) {
                await this.prisma.systemConfig.upsert({
                    where: { key: config.key },
                    update: { 
                        value: config.value,
                        updatedAt: new Date()
                    },
                    create: config
                });
            }

            this.logger.info(`Gateway configuration saved: ${ip}:${port}`);
            return true;
        } catch (error) {
            this.logger.error('Error saving gateway config:', error);
            throw error;
        }
    }

    /**
     * Get system configuration value
     */
    async getConfig(key) {
        try {
            const config = await this.prisma.systemConfig.findUnique({
                where: { key, isActive: true }
            });
            return config ? config.value : null;
        } catch (error) {
            this.logger.error(`Error getting config ${key}:`, error);
            return null;
        }
    }

    /**
     * Set system configuration value
     */
    async setConfig(key, value, category = 'system', description = null) {
        try {
            return await this.prisma.systemConfig.upsert({
                where: { key },
                update: { 
                    value,
                    updatedAt: new Date()
                },
                create: {
                    key,
                    value,
                    category,
                    description
                }
            });
        } catch (error) {
            this.logger.error(`Error setting config ${key}:`, error);
            throw error;
        }
    }
}

module.exports = DatabaseManager;