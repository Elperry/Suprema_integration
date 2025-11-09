/**
 * Suprema Gateway Connection Service
 * Handles connection to Suprema device gateway and device management
 */

const grpc = require('@grpc/grpc-js');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const winston = require('winston');

// Import protobuf services (these would come from the G-SDK)
// Note: In actual implementation, you would download the G-SDK and import these
const connectService = require('../../biostar/service/connect_grpc_pb');
const deviceService = require('../../biostar/service/device_grpc_pb');
const connectMessage = require('../../biostar/service/connect_pb');
const deviceMessage = require('../../biostar/service/device_pb');

class SupremaConnectionService extends EventEmitter {
    constructor(config, database) {
        super();
        this.config = config;
        this.database = database;
        this.connClient = null;
        this.deviceClient = null;
        this.connectedDevices = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        
        // Initialize with insecure credentials by default
        // This will be updated when initializeGateway is called
        this.sslCreds = grpc.credentials.createInsecure();
        
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/connection.log' })
            ]
        });
    }

    /**
     * Initialize connection to the gateway
     * @param {Object} gatewayConfig - Gateway configuration
     * @returns {Promise<boolean>} Success status
     */
    async initializeGateway(gatewayConfig = null) {
        try {
            const config = gatewayConfig || this.config.gateway;
            const gatewayAddress = `${config.ip}:${config.port}`;
            
            // Determine credentials (TLS or insecure)
            let credentials;
            
            if (config.caFile) {
                // Load SSL certificate if provided
                const certPath = path.resolve(config.caFile);
                if (!fs.existsSync(certPath)) {
                    this.logger.warn(`Certificate file not found: ${certPath}. Using insecure connection.`);
                    credentials = grpc.credentials.createInsecure();
                } else {
                    try {
                        const rootCa = fs.readFileSync(certPath);
                        credentials = grpc.credentials.createSsl(rootCa);
                        this.logger.info('Using TLS connection with certificate');
                    } catch (error) {
                        this.logger.warn(`Failed to load certificate: ${error.message}. Using insecure connection.`);
                        credentials = grpc.credentials.createInsecure();
                    }
                }
            } else {
                // No certificate specified, use insecure connection
                this.logger.info('No certificate specified, using insecure connection');
                credentials = grpc.credentials.createInsecure();
            }

            // Store credentials for other services to use
            this.sslCreds = credentials;

            // Initialize clients with the credentials
            this.connClient = new connectService.ConnectClient(gatewayAddress, credentials);
            this.deviceClient = new deviceService.DeviceClient(gatewayAddress, credentials);

            this.logger.info(`Gateway client initialized for ${gatewayAddress}`);
            this.emit('gateway:connected', { address: gatewayAddress });
            
            return true;
        } catch (error) {
            this.logger.error('Failed to initialize gateway connection:', error);
            this.emit('gateway:error', error);
            throw error;
        }
    }

    /**
     * Search for available devices on the network
     * @param {number} timeout - Search timeout in seconds
     * @returns {Promise<Array>} List of discovered devices
     */
    async searchDevices(timeout = 5) {
        try {
            if (!this.connClient) {
                throw new Error('Gateway not connected');
            }

            const req = new connectMessage.SearchDeviceRequest();
            req.setTimeout(timeout);

            return new Promise((resolve, reject) => {
                this.connClient.searchDevice(req, (err, response) => {
                    if (err) {
                        this.logger.error('Device search failed:', err);
                        reject(err);
                        return;
                    }

                    const devices = response.toObject().deviceinfosList;
                    this.logger.info(`Found ${devices.length} devices`);
                    this.emit('devices:discovered', devices);
                    resolve(devices);
                });
            });
        } catch (error) {
            this.logger.error('Error searching devices:', error);
            throw error;
        }
    }

    /**
     * Connect to a specific device
     * @param {Object} deviceConfig - Device connection configuration
     * @returns {Promise<string>} Device ID
     */
    async connectToDevice(deviceConfig) {
        try {
            if (!this.connClient) {
                throw new Error('Gateway not connected');
            }

            const connInfo = new connectMessage.ConnectInfo();
            connInfo.setIpaddr(deviceConfig.ip);
            connInfo.setPort(deviceConfig.port);
            connInfo.setUsessl(deviceConfig.useSSL || false);

            const req = new connectMessage.ConnectRequest();
            req.setConnectinfo(connInfo);

            return new Promise((resolve, reject) => {
                this.connClient.connect(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to connect to device ${deviceConfig.ip}:`, err);
                        reject(err);
                        return;
                    }

                    const deviceId = response.getDeviceid();
                    this.connectedDevices.set(deviceId, {
                        id: deviceId,
                        ip: deviceConfig.ip,
                        port: deviceConfig.port,
                        useSSL: deviceConfig.useSSL || false,
                        connectedAt: new Date(),
                        status: 'connected'
                    });

                    this.logger.info(`Connected to device ${deviceId} at ${deviceConfig.ip}:${deviceConfig.port}`);
                    this.emit('device:connected', { deviceId, config: deviceConfig });
                    resolve(deviceId);
                });
            });
        } catch (error) {
            this.logger.error('Error connecting to device:', error);
            throw error;
        }
    }

    /**
     * Disconnect from a device
     * @param {string} deviceId - Device ID to disconnect
     * @returns {Promise<boolean>} Success status
     */
    async disconnectDevice(deviceId) {
        try {
            if (!this.connClient) {
                throw new Error('Gateway not connected');
            }

            const req = new connectMessage.DisconnectRequest();
            req.setDeviceidsList([deviceId]);

            return new Promise((resolve, reject) => {
                this.connClient.disconnect(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to disconnect device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.connectedDevices.delete(deviceId);
                    this.logger.info(`Disconnected from device ${deviceId}`);
                    this.emit('device:disconnected', { deviceId });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error disconnecting device:', error);
            throw error;
        }
    }

    /**
     * Get list of connected devices
     * @returns {Promise<Array>} List of connected devices
     */
    async getConnectedDevices() {
        try {
            if (!this.connClient) {
                throw new Error('Gateway not connected');
            }

            const req = new connectMessage.GetDeviceListRequest();

            return new Promise((resolve, reject) => {
                this.connClient.getDeviceList(req, (err, response) => {
                    if (err) {
                        this.logger.error('Failed to get device list:', err);
                        reject(err);
                        return;
                    }

                    const devices = response.toObject().deviceinfosList;
                    resolve(devices);
                });
            });
        } catch (error) {
            this.logger.error('Error getting connected devices:', error);
            throw error;
        }
    }

    /**
     * Get device information
     * @param {string} deviceId - Device ID
     * @returns {Promise<Object>} Device information
     */
    async getDeviceInfo(deviceId) {
        try {
            if (!this.deviceClient) {
                throw new Error('Gateway not connected');
            }

            const req = new deviceMessage.GetInfoRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.deviceClient.getInfo(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get device info for ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const deviceInfo = response.toObject().info;
                    resolve(deviceInfo);
                });
            });
        } catch (error) {
            this.logger.error('Error getting device info:', error);
            throw error;
        }
    }

    /**
     * Get device capabilities
     * @param {string} deviceId - Device ID
     * @returns {Promise<Object>} Device capabilities
     */
    async getDeviceCapabilities(deviceId) {
        try {
            if (!this.deviceClient) {
                throw new Error('Gateway not connected');
            }

            const req = new deviceMessage.GetCapabilityInfoRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.deviceClient.getCapabilityInfo(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get device capabilities for ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const capabilities = response.toObject().capinfo;
                    resolve(capabilities);
                });
            });
        } catch (error) {
            this.logger.error('Error getting device capabilities:', error);
            throw error;
        }
    }

    /**
     * Enable SSL for a device
     * @param {string} deviceId - Device ID
     * @returns {Promise<boolean>} Success status
     */
    async enableDeviceSSL(deviceId) {
        try {
            if (!this.connClient) {
                throw new Error('Gateway not connected');
            }

            const req = new connectMessage.EnableSSLRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.connClient.enableSSL(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to enable SSL for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`SSL enabled for device ${deviceId}`);
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error enabling device SSL:', error);
            throw error;
        }
    }

    /**
     * Test device connection
     * @param {string} deviceId - Device ID
     * @returns {Promise<boolean>} Connection status
     */
    async testDeviceConnection(deviceId) {
        try {
            const info = await this.getDeviceInfo(deviceId);
            return !!info;
        } catch (error) {
            this.logger.error(`Device connection test failed for ${deviceId}:`, error);
            return false;
        }
    }

    /**
     * Setup automatic reconnection for devices
     */
    setupAutoReconnect() {
        setInterval(async () => {
            for (const [deviceId, deviceInfo] of this.connectedDevices.entries()) {
                const isConnected = await this.testDeviceConnection(deviceId);
                if (!isConnected && this.reconnectAttempts < this.maxReconnectAttempts) {
                    this.logger.warn(`Device ${deviceId} disconnected. Attempting to reconnect...`);
                    try {
                        await this.connectToDevice({
                            ip: deviceInfo.ip,
                            port: deviceInfo.port,
                            useSSL: deviceInfo.useSSL
                        });
                        this.reconnectAttempts = 0;
                    } catch (error) {
                        this.reconnectAttempts++;
                        this.logger.error(`Reconnection attempt ${this.reconnectAttempts} failed for device ${deviceId}:`, error);
                    }
                }
            }
        }, 30000); // Check every 30 seconds
    }

    /**
     * Disconnect all devices and close gateway connection
     */
    async shutdown() {
        try {
            const deviceIds = Array.from(this.connectedDevices.keys());
            
            for (const deviceId of deviceIds) {
                await this.disconnectDevice(deviceId);
            }

            this.connClient = null;
            this.deviceClient = null;
            this.logger.info('Connection service shutdown complete');
            this.emit('service:shutdown');
        } catch (error) {
            this.logger.error('Error during shutdown:', error);
            throw error;
        }
    }

    /**
     * Get connection statistics
     * @returns {Object} Connection statistics
     */
    getConnectionStats() {
        return {
            gatewayConnected: !!this.connClient,
            connectedDeviceCount: this.connectedDevices.size,
            connectedDevices: Array.from(this.connectedDevices.values()),
            reconnectAttempts: this.reconnectAttempts
        };
    }

    /**
     * Load devices from database and connect to all active devices
     */
    async loadAndConnectDevices() {
        try {
            if (!this.database) {
                this.logger.warn('Database not available for device loading');
                return [];
            }

            const activeDevices = await this.database.getActiveDevices();
            
            this.logger.info(`Loading ${activeDevices.length} active devices from database`);
            
            const connectionResults = [];
            
            for (const device of activeDevices) {
                try {
                    const deviceId = await this.connectToDeviceFromDB(device);
                    connectionResults.push({
                        device: device,
                        deviceId: deviceId,
                        success: true
                    });
                } catch (error) {
                    this.logger.error(`Failed to connect to device ${device.name} (${device.ip}:${device.port}):`, error);
                    // Increment retry counter for failed connection
                    await this.database.incrementDeviceRetries(device.id);
                    connectionResults.push({
                        device: device,
                        success: false,
                        error: error.message
                    });
                }
            }
            
            return connectionResults;
        } catch (error) {
            this.logger.error('Failed to load devices from database:', error);
            throw error;
        }
    }

    /**
     * Connect to device using database configuration
     */
    async connectToDeviceFromDB(deviceRecord) {
        try {
            const config = {
                ip: deviceRecord.ip,
                port: deviceRecord.port,
                useSSL: deviceRecord.useSSL,
                timeout: deviceRecord.timeout
            };
            const deviceId = await this.connectToDevice(config);
            
            // Reset device retry counter after successful connection
            await this.database.resetDeviceRetries(deviceRecord.id);
            
            // Store device info
            try {
                const deviceInfo = await this.getDeviceInfo(deviceId);
                
                // Update device details in database
                const updates = {};
                if (deviceInfo.serialNumber && deviceInfo.serialNumber !== deviceRecord.serialNumber) {
                    updates.serialNumber = deviceInfo.serialNumber;
                }
                if (deviceInfo.type && deviceInfo.type !== deviceRecord.deviceType) {
                    updates.deviceType = deviceInfo.type;
                }
                if (deviceInfo.firmwareVersion && deviceInfo.firmwareVersion !== deviceRecord.firmwareVersion) {
                    updates.firmwareVersion = deviceInfo.firmwareVersion;
                }
                
                if (Object.keys(updates).length > 0) {
                    await this.database.updateDevice(deviceRecord.id, updates);
                }
            } catch (infoError) {
                this.logger.warn(`Could not retrieve device info for ${deviceRecord.name}:`, infoError);
            }
            
            return deviceId;
        } catch (error) {
            await this.database.incrementDeviceRetries(deviceRecord.id);
            throw error;
        }
    }

    /**
     * Get all devices from database
     */
    async getAllDevicesFromDB() {
        try {
            if (!this.database) {
                throw new Error('Database not available');
            }

            return await this.database.getAllDevices();
        } catch (error) {
            this.logger.error('Failed to get devices from database:', error);
            throw error;
        }
    }

    /**
     * Add new device to database
     */
    async addDeviceToDB(deviceConfig) {
        try {
            if (!this.database) {
                throw new Error('Database not available');
            }
            
            // Check if device already exists
            const existingDevice = await this.database.findDeviceByConnection(deviceConfig.ip, deviceConfig.port);
            if (existingDevice) {
                throw new Error(`Device with IP ${deviceConfig.ip}:${deviceConfig.port} already exists`);
            }
            
            // Create new device record
            const device = await this.database.addDevice(deviceConfig);
            this.logger.info(`Added new device to database: ${device.name} (${device.ip}:${device.port})`);
            
            return device;
        } catch (error) {
            this.logger.error('Failed to add device to database:', error);
            throw error;
        }
    }

    /**
     * Update device in database
     */
    async updateDeviceInDB(deviceId, updates) {
        try {
            if (!this.database) {
                throw new Error('Database not available');
            }
            
            const device = await this.database.updateDevice(deviceId, updates);
            this.logger.info(`Updated device in database: ${device.name}`);
            
            return device;
        } catch (error) {
            this.logger.error('Failed to update device in database:', error);
            throw error;
        }
    }

    /**
     * Remove device from database
     */
    async removeDeviceFromDB(deviceId) {
        try {
            if (!this.database) {
                throw new Error('Database not available');
            }

            const device = await this.database.getPrisma().device.findUnique({
                where: { id: deviceId }
            });
            
            if (!device) {
                throw new Error(`Device not found: ${deviceId}`);
            }
            
            // Disconnect device first if connected
            if (device.isConnected) {
                try {
                    await this.disconnectDevice(device.id);
                } catch (disconnectError) {
                    this.logger.warn(`Failed to disconnect device before removal:`, disconnectError);
                }
            }
            
            await this.database.deleteDevice(deviceId);
            this.logger.info(`Removed device from database: ${device.name}`);
            
            return true;
        } catch (error) {
            this.logger.error('Failed to remove device from database:', error);
            throw error;
        }
    }

    /**
     * Get connected devices from database
     */
    async getConnectedDevicesFromDB() {
        try {
            if (!this.database) {
                return [];
            }

            return await this.database.getConnectedDevices();
        } catch (error) {
            this.logger.error('Failed to get connected devices from database:', error);
            return [];
        }
    }

    /**
     * Sync device status with database
     */
    async syncDeviceStatus() {
        try {
            if (!this.database) {
                return;
            }

            const dbDevices = await this.database.getAllDevices();
            
            for (const device of dbDevices) {
                const isActuallyConnected = this.connectedDevices.has(device.id);
                
                // Log connection status (no isConnected field in DB to update)
                this.logger.debug(`Device ${device.name} connection status: ${isActuallyConnected}`);
            }
        } catch (error) {
            this.logger.error('Failed to sync device status:', error);
        }
    }

    /**
     * Auto-reconnect to failed devices
     */
    async autoReconnectDevices() {
        try {
            if (!this.database) {
                return;
            }

            const failedDevices = await this.database.getPrisma().device.findMany({
                where: {
                    isActive: true,
                    isConnected: false,
                    status: { in: ['active', 'error'] }
                }
            });
            
            for (const device of failedDevices) {
                if (device.connectionRetries < device.maxRetries) {
                    try {
                        this.logger.info(`Attempting to reconnect device: ${device.name}`);
                        await this.connectToDeviceFromDB(device);
                        this.logger.info(`Successfully reconnected device: ${device.name}`);
                    } catch (error) {
                        this.logger.warn(`Failed to reconnect device ${device.name}:`, error);
                    }
                }
            }
        } catch (error) {
            this.logger.error('Auto-reconnect failed:', error);
        }
    }
}

module.exports = SupremaConnectionService;