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
                        ip: '192.168.0.110',
                        username: 'admin',
                        password: 'admin',
                        loc: 'Building A',
                        channel: 1
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
                    orderBy: { name: 'asc' }
                }),
                getConnectedDevices: () => this.prisma.device.findMany({
                    orderBy: { name: 'asc' }
                }),
                findByConnection: (ip) => this.prisma.device.findFirst({
                    where: { ip }
                })
            };
        }
        if (modelName === 'GateEvent') {
            return {
                findAll: (options = {}) => this.prisma.gateEvent.findMany(options),
                create: (data) => this.prisma.gateEvent.create({ data }),
                count: (options = {}) => this.prisma.gateEvent.count(options)
            };
        }
        if (modelName === 'User') {
            return {
                findAll: (options = {}) => this.prisma.user.findMany(options),
                findOne: (options) => this.prisma.user.findFirst(options),
                create: (data) => this.prisma.user.create({ data })
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
            orderBy: { name: 'asc' }
        });
    }

    async getConnectedDevices() {
        return await this.prisma.device.findMany({
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

    async findDeviceByConnection(ip) {
        return await this.prisma.device.findFirst({
            where: { ip }
        });
    }

    async updateDeviceConnectionStatus(id, last_event_sync = null, last_user_sync = null) {
        const updateData = {};

        if (last_event_sync) {
            updateData.last_event_sync = last_event_sync;
        }
        if (last_user_sync) {
            updateData.last_user_sync = last_user_sync;
        }

        return await this.prisma.device.update({
            where: { id },
            data: updateData
        });
    }

    // ================ GATE EVENTS ================

    /**
     * Add gate event
     */
    async addGateEvent(eventData) {
        return await this.prisma.gateEvent.create({
            data: eventData
        });
    }

    /**
     * Get gate events with filters
     */
    async getGateEvents(filters = {}) {
        const where = {};
        
        if (filters.employee_id) {
            where.employee_id = filters.employee_id;
        }
        if (filters.gate_id) {
            where.gate_id = filters.gate_id;
        }
        if (filters.startDate && filters.endDate) {
            where.etime = {
                gte: new Date(filters.startDate),
                lte: new Date(filters.endDate)
            };
        }

        return await this.prisma.gateEvent.findMany({
            where,
            orderBy: { etime: 'desc' },
            take: filters.limit || 100,
            include: {
                device: true
            }
        });
    }

    /**
     * Get latest gate event for employee
     */
    async getLatestEmployeeEvent(employee_id) {
        return await this.prisma.gateEvent.findFirst({
            where: { employee_id },
            orderBy: { etime: 'desc' }
        });
    }

    // ================ USER MANAGEMENT ================

    /**
     * Authenticate user
     */
    async authenticateUser(username, password) {
        return await this.prisma.user.findFirst({
            where: {
                username,
                userpassword: password
            }
        });
    }

    /**
     * Get all system users
     */
    async getAllUsers() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                displayname: true
            }
        });
    }

    /**
     * Add new user
     */
    async addUser(userData) {
        return await this.prisma.user.create({
            data: userData
        });
    }

    // ================ TEMPORARY ACCESS ================

    /**
     * Create temporary access
     */
    async createTempAccess(accessData) {
        return await this.prisma.tempAccess.create({
            data: accessData
        });
    }

    /**
     * Get pending temporary access entries
     */
    async getPendingTempAccess() {
        return await this.prisma.tempAccess.findMany({
            where: { done: false },
            orderBy: { ts: 'desc' }
        });
    }

    /**
     * Mark temporary access as done
     */
    async markTempAccessDone(id) {
        return await this.prisma.tempAccess.update({
            where: { id },
            data: { done: true }
        });
    }

    // ================ EMPLOYEE QUERIES (Views) ================

    /**
     * Get all employees from view
     */
    /**
     * Get all employees from view with optional filters
     * Uses raw SQL because employee/allemployees are database views with @@ignore
     */
    async getAllEmployees(filters = {}) {
        try {
            let whereConditions = [];
            let params = [];

            if (filters.company_id) {
                whereConditions.push('company_id = ?');
                params.push(filters.company_id);
            }
            if (filters.suspend === false || filters.suspend === true) {
                whereConditions.push('suspend = ?');
                params.push(filters.suspend ? 'yes' : 'no');
            }

            let query = 'SELECT * FROM allemployees';
            if (whereConditions.length > 0) {
                query += ' WHERE ' + whereConditions.join(' AND ');
            }
            query += ' ORDER BY displayname ASC';

            const employees = await this.prisma.$queryRawUnsafe(query, ...params);
            
            // Convert BigInt values to Number for JSON serialization
            return this.convertBigIntToNumber(employees);
        } catch (error) {
            this.logger.error('Error fetching all employees:', error);
            throw error;
        }
    }

    /**
     * Get employee by ID from view
     * Uses raw SQL because employee is a database view with @@ignore
     */
    async getEmployeeById(id) {
        try {
            const employees = await this.prisma.$queryRawUnsafe(
                'SELECT * FROM employee WHERE id = ? LIMIT 1',
                id
            );
            const employee = employees[0] || null;
            
            // Convert BigInt values to Number for JSON serialization
            return employee ? this.convertBigIntToNumber([employee])[0] : null;
        } catch (error) {
            this.logger.error('Error fetching employee by ID:', error);
            throw error;
        }
    }

    /**
     * Search employees by name or email
     * Uses raw SQL because allemployees is a database view with @@ignore
     */
    async searchEmployees(searchTerm) {
        try {
            const employees = await this.prisma.$queryRawUnsafe(
                `SELECT * FROM allemployees 
                 WHERE displayname LIKE ? OR email LIKE ? OR fullname LIKE ?
                 LIMIT 50`,
                `%${searchTerm}%`,
                `%${searchTerm}%`,
                `%${searchTerm}%`
            );
            
            // Convert BigInt values to Number for JSON serialization
            return this.convertBigIntToNumber(employees);
        } catch (error) {
            this.logger.error('Error searching employees:', error);
            throw error;
        }
    }

    /**
     * Convert BigInt values to Number in objects/arrays
     * Required for JSON serialization of MySQL BIGINT columns
     */
    convertBigIntToNumber(data) {
        if (Array.isArray(data)) {
            return data.map(item => this.convertBigIntToNumber(item));
        } else if (data !== null && typeof data === 'object') {
            const converted = {};
            for (const [key, value] of Object.entries(data)) {
                if (typeof value === 'bigint') {
                    converted[key] = Number(value);
                } else if (typeof value === 'object' && value !== null) {
                    converted[key] = this.convertBigIntToNumber(value);
                } else {
                    converted[key] = value;
                }
            }
            return converted;
        }
        return data;
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
}

module.exports = DatabaseManager;