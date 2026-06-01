/**
 * Database Configuration and Connection
 * Prisma setup for device and HR data management
 */

import winston from 'winston';

class DatabaseManager {
    /**
     * @param {Object} [logger] - Winston logger instance
     * @param {import('@prisma/client').PrismaClient} [prisma] - Shared PrismaClient
     *        When provided, DatabaseManager will NOT create its own client,
     *        avoiding duplicate connections.
     */
    constructor(logger = null, prisma = null) {
        this.prisma = prisma;
        this.logger = logger || winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [new winston.transports.Console()]
        });
        this.isConnected = false;
        this._monitorTimer = null;
        this._reconnectInProgress = false;
        this._stopRequested = false;
    }

    /**
     * Initialize database connection.
     * If a PrismaClient was provided via the constructor, it is reused
     * (no duplicate client is created).
     */
    async initialize() {
        try {
            if (!this.prisma) {
                // Create PrismaClient only when none was injected.
                // Dynamic import — the generated client may not exist at
                // module-load time during first-run bootstrap.
                const { PrismaClient } = await import('@prisma/client');
                this.prisma = new PrismaClient({
                    log: [
                        { emit: 'event', level: 'query' },
                        { emit: 'event', level: 'error' },
                        { emit: 'event', level: 'info' },
                        { emit: 'event', level: 'warn' },
                    ],
                });
            }

            // Attach event hooks unconditionally. Externally-provided clients
            // created with emit:'event' log levels (e.g. from bootstrap) will
            // emit events here; clients using emit:'stdout' will simply not fire.
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

            // Ensure connection (idempotent if already connected)
            await this.prisma.$connect();
            // Verify with a real round-trip — $connect may resolve before
            // a TCP session is actually usable on some drivers.
            await this.prisma.$queryRaw`SELECT 1`;
            this.isConnected = true;
            this.logger.info('Database connection established successfully');

            // Apply lightweight column migrations that prisma db push misses
            // (only runs when tables already exist but new columns are added).
            await this.ensureDeviceColumns();

            // Seed initial data if needed
            await this.seedInitialData();

            return true;
        } catch (error) {
            this.isConnected = false;
            this.logger.error('Database initialization failed (will keep retrying in background):', error.message);
            // Don't throw — let the monitor keep trying so the HTTP server
            // can still start and recover when the network returns.
            return false;
        }
    }

    /**
     * Start a background connection monitor that pings the database
     * periodically and reconnects on failure. Safe to call once after init.
     *
     * @param {Object} [opts]
     * @param {number} [opts.heartbeatIntervalMs=15000] - How often to ping while healthy
     * @param {number} [opts.reconnectInitialDelayMs=2000] - First backoff delay
     * @param {number} [opts.reconnectMaxDelayMs=60000] - Max backoff delay
     */
    startConnectionMonitor(opts = {}) {
        const heartbeatIntervalMs = opts.heartbeatIntervalMs ?? 15000;
        const reconnectInitialDelayMs = opts.reconnectInitialDelayMs ?? 2000;
        const reconnectMaxDelayMs = opts.reconnectMaxDelayMs ?? 60000;

        if (this._monitorTimer) return; // already running
        this._stopRequested = false;

        const tick = async () => {
            if (this._stopRequested) return;

            try {
                await this.prisma.$queryRaw`SELECT 1`;
                if (!this.isConnected) {
                    this.isConnected = true;
                    this.logger.info('Database connection restored');
                }
            } catch (err) {
                if (this.isConnected) {
                    this.logger.warn('Database heartbeat failed — entering reconnect loop:', err.message);
                }
                this.isConnected = false;
                await this._reconnectLoop(reconnectInitialDelayMs, reconnectMaxDelayMs);
            } finally {
                if (!this._stopRequested) {
                    this._monitorTimer = setTimeout(tick, heartbeatIntervalMs);
                }
            }
        };

        // Kick off immediately so the first ping happens without waiting
        // a full interval after startup.
        this._monitorTimer = setTimeout(tick, 0);
        this.logger.info(`Database connection monitor started (heartbeat ${heartbeatIntervalMs}ms)`);
    }

    /**
     * Stop the background monitor. Idempotent.
     */
    stopConnectionMonitor() {
        this._stopRequested = true;
        if (this._monitorTimer) {
            clearTimeout(this._monitorTimer);
            this._monitorTimer = null;
        }
    }

    /**
     * Reconnect loop with exponential backoff. Returns when either the
     * connection is restored or stop has been requested.
     */
    async _reconnectLoop(initialDelayMs, maxDelayMs) {
        if (this._reconnectInProgress) return;
        this._reconnectInProgress = true;

        let delay = initialDelayMs;
        let attempt = 0;

        try {
            while (!this._stopRequested) {
                attempt += 1;
                try {
                    // Drop any half-open pool sockets, then re-open.
                    try { await this.prisma.$disconnect(); } catch (_) { /* ignore */ }
                    await this.prisma.$connect();
                    await this.prisma.$queryRaw`SELECT 1`;
                    this.isConnected = true;
                    this.logger.info(`Database reconnected after ${attempt} attempt(s)`);
                    return;
                } catch (err) {
                    this.logger.warn(`Database reconnect attempt ${attempt} failed (retrying in ${delay}ms): ${err.message}`);
                    await this._sleep(delay);
                    delay = Math.min(delay * 2, maxDelayMs);
                }
            }
        } finally {
            this._reconnectInProgress = false;
        }
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    /**
     * Ensure new columns added to existing tables are present in the DB.
     * Prisma's db push only runs when tables are missing; this handles the
     * case where tables already exist but are missing newly added columns.
     * Safe to call on every startup — it is a no-op when columns already exist.
     */
    async ensureDeviceColumns() {
        try {
            // Check whether last_synced_event_id already exists
            const rows = await this.prisma.$queryRaw`
                SELECT COLUMN_NAME
                FROM   INFORMATION_SCHEMA.COLUMNS
                WHERE  TABLE_SCHEMA = DATABASE()
                  AND  TABLE_NAME   = 'device'
                  AND  COLUMN_NAME  = 'last_synced_event_id'
            `;
            if (rows.length === 0) {
                await this.prisma.$executeRaw`
                    ALTER TABLE device
                    ADD COLUMN last_synced_event_id INT UNSIGNED NOT NULL DEFAULT 0
                `;
                this.logger.info('Added last_synced_event_id column to device table');
            }
        } catch (err) {
            // Non-fatal: log and continue — app will still work, sync cursor
            // will fall back to 0 on first run.
            this.logger.warn('ensureDeviceColumns: could not verify/add columns:', err.message);
        }
    }

    /**
     * Seed initial data
     */
    async seedInitialData() {
        if (process.env.SEED_INITIAL_DEVICES !== 'true') return;
        try {
            // Check if we need to seed initial devices
            const deviceCount = await this.prisma.device.count();
            
            if (deviceCount === 0) {
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
        this.stopConnectionMonitor();
        if (this.prisma) {
            await this.prisma.$disconnect();
            this.isConnected = false;
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
            where: { isActive: true },
            orderBy: { name: 'asc' }
        });
    }

    async getConnectedDevices() {
        return await this.prisma.device.findMany({
            where: { status: 'connected' },
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

        // Handle DateTime values properly
        if (last_event_sync && last_event_sync instanceof Date) {
            updateData.last_event_sync = last_event_sync;
        }
        if (last_user_sync && last_user_sync instanceof Date) {
            updateData.last_user_sync = last_user_sync;
        }

        // Only update if there's actual data to update
        if (Object.keys(updateData).length === 0) {
            return await this.prisma.device.findUnique({ where: { id } });
        }

        return await this.prisma.device.update({
            where: { id },
            data: updateData
        });
    }

    /**
     * Increment device retry counter (for failed connection attempts)
     */
    async incrementDeviceRetries(id) {
        // For now, just log the retry attempt
        // You can add a retries column to the Device model if needed
        this.logger.warn(`Device ${id} connection retry incremented`);
        return;
    }

    /**
     * Reset device retry counter (after successful connection)
     */
    async resetDeviceRetries(id) {
        // For now, just log the reset
        // You can add a retries column to the Device model if needed
        this.logger.info(`Device ${id} connection retries reset`);
        return;
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
            take: filters.limit || 100
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
     * NOTE: The user table no longer stores credentials — it now represents
     * employee-linked device users. Authentication must be handled separately.
     */
    async authenticateUser(username, password) {
        throw new Error('authenticateUser: user table no longer stores credentials. Implement a separate admin authentication mechanism.');
    }

    /**
     * Get all local users (employee-linked)
     */
    async getAllUsers() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                code: true,
                name: true,
                full_name: true,
                employee_id: true,
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
            const where = {};

            if (filters.company_id) {
                where.company_id = filters.company_id;
            }
            if (filters.suspend === true) {
                where.suspend = 'yes';
            } else if (filters.suspend === false) {
                where.suspend = 'no';
            }
            if (filters.department) {
                where.department = { contains: filters.department };
            }

            const employees = await this.prisma.employee.findMany({
                where,
                orderBy: { id: 'asc' },
            });

            return await this._enrichEmployeesWithCards(employees);
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
            const employee = await this.prisma.employee.findUnique({ where: { id } });
            if (!employee) return null;
            const enriched = await this._enrichEmployeesWithCards([employee]);
            return enriched[0];
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
            const employees = await this.prisma.employee.findMany({
                where: {
                    OR: [
                        { displayname: { contains: searchTerm } },
                        { fullname:    { contains: searchTerm } },
                        { email:       { contains: searchTerm } },
                    ],
                },
                take: 50,
            });
            return employees;
        } catch (error) {
            this.logger.error('Error searching employees:', error);
            throw error;
        }
    }

    /**
     * Enrich employee records with card data from our card_assignments table.
     * The Suprema employee view may not contain cards enrolled via this system.
     */
    async _enrichEmployeesWithCards(employees) {
        if (!employees || employees.length === 0) return employees;
        try {
            const ids = employees.map(e => e.id || e.employee_id).filter(Boolean).map(Number);
            // Find users for these employee IDs, then their active card assignments
            const users = await this.prisma.user.findMany({
                where: { employee_id: { in: ids } },
                select: {
                    employee_id: true,
                    cardAssignments: {
                        where: { status: 'active' },
                        select: { card_data: true, card_csn: true },
                        orderBy: { assignedAt: 'desc' },
                        take: 1,
                    },
                },
            });
            const cardMap = new Map();
            for (const u of users) {
                if (u.cardAssignments.length > 0) {
                    cardMap.set(u.employee_id, u.cardAssignments[0]);
                }
            }
            return employees.map(e => {
                const empId = e.id || e.employee_id;
                const ca = cardMap.get(empId);
                return {
                    ...e,
                    card: ca?.card_data || e.card || null,
                    has_card: !!(ca || e.card),
                };
            });
        } catch {
            return employees;
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

export default DatabaseManager;