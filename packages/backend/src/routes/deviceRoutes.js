/**
 * Device Management Routes
 * REST API endpoints for device operations
 */

import express from 'express';
const router = express.Router();

export default (services) => {
    // =====================================================
    // DIRECT DEVICE COMMUNICATION (No Database Required)
    // These endpoints communicate directly with devices using IP
    // =====================================================

    /**
     * Helper function to parse device ID to proper integer
     */
    const parseDeviceId = (deviceId) => {
        if (deviceId === null || deviceId === undefined || deviceId === '') {
            return null;
        }
        const parsed = parseInt(deviceId, 10);
        if (isNaN(parsed)) {
            return null;
        }
        return parsed;
    };

    /**
     * Helper function to find device ID by IP address from connected devices
     */
    const findConnectedDeviceByIp = async (ip, port) => {
        try {
            const connectedDevices = await services.connection.getConnectedDevices();
            const deviceList = connectedDevices.map(d => d.toObject ? d.toObject() : d);
            
            // Find device matching IP and port
            const parsedPort = parseInt(port, 10);
            const device = deviceList.find(d => 
                d.ipaddr === ip && d.port === parsedPort
            );
            
            return device ? device.deviceid : null;
        } catch (error) {
            console.error('Error finding connected device:', error);
            return null;
        }
    };

    /**
     * Helper function to get or establish device connection
     */
    const getOrConnectDevice = async (ip, port, useSSL = false) => {
        const parsedPort = parseInt(port, 10) || 51211;
        
        // First, check if device is already connected
        let deviceId = await findConnectedDeviceByIp(ip, parsedPort);
        
        if (deviceId) {
            console.log(`Device already connected at ${ip}:${parsedPort} with ID ${deviceId}`);
            return { deviceId, alreadyConnected: true };
        }

        // Device not connected, establish new connection
        console.log(`Connecting to device at ${ip}:${parsedPort}...`);
        const deviceConfig = {
            ip: ip,
            port: parsedPort,
            useSSL: useSSL,
            timeout: 15000
        };

        deviceId = await services.connection.connectToDevice(deviceConfig);
        return { deviceId, alreadyConnected: false };
    };

    /**
     * Helper function to resolve device ID (DB ID or Suprema ID) to Suprema device ID
     * @param {string|number} paramDeviceId - The device ID from request params
     * @returns {Promise<{supremaDeviceId: number, deviceRecord: object|null}>}
     * @throws {Error} If device not found or no IP configured
     */
    const resolveSupremaDeviceId = async (paramDeviceId) => {
        const parsedId = parseInt(paramDeviceId, 10);
        
        if (isNaN(parsedId)) {
            throw new Error('Invalid device ID format. Must be a number.');
        }
        
        let supremaDeviceId = parsedId;
        let deviceRecord = null;
        
        // If it's a small number (likely DB ID), lookup the device and connect by IP
        if (parsedId < 1000) {
            // Use the getModel method to get the Device model
            const Device = services.database.getModel('Device');
            deviceRecord = await Device.findByPk(parsedId);
            
            if (!deviceRecord) {
                const error = new Error(`Device with DB ID ${parsedId} not found`);
                error.statusCode = 404;
                throw error;
            }
            
            if (!deviceRecord.ip) {
                const error = new Error(`Device ${parsedId} has no IP address configured`);
                error.statusCode = 400;
                throw error;
            }
            
            // Get or establish connection using device IP
            const connection = await getOrConnectDevice(
                deviceRecord.ip, 
                deviceRecord.port || 51211, 
                deviceRecord.useSSL || false
            );
            supremaDeviceId = connection.deviceId;
        }
        
        return { supremaDeviceId, deviceRecord };
    };

    /**
     * Get device info directly from device using IP
     * GET /api/devices/direct/info
     * Query: ip, port (optional, default 51211), deviceId (optional, use if already connected)
     */
    router.get('/direct/info', async (req, res) => {
        try {
            const { ip, port = 51211, deviceId: providedDeviceId } = req.query;

            let deviceId = parseDeviceId(providedDeviceId);

            // If deviceId not provided or invalid, try to find by IP
            if (deviceId === null) {
                if (!ip) {
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: 'Either deviceId or IP address is required. Use ?ip=10.0.0.8&port=51211 or ?deviceId=546173337'
                    });
                }

                // Get or establish connection
                const connection = await getOrConnectDevice(ip, parseInt(port, 10) || 51211);
                deviceId = connection.deviceId;
            }
            
            // Ensure deviceId is a valid number
            if (deviceId === null || isNaN(deviceId)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Invalid device ID. Please provide a valid numeric device ID or IP address.'
                });
            }
            
            // Get device info
            const info = await services.connection.getDeviceInfo(deviceId);

            // Convert protobuf to plain object
            const deviceInfo = info.toObject ? info.toObject() : info;

            res.json({
                success: true,
                source: 'direct_device',
                connectionInfo: {
                    ip: ip || 'N/A',
                    port: parseInt(port, 10) || 51211,
                    deviceId: deviceId
                },
                data: deviceInfo
            });
        } catch (error) {
            res.status(500).json({
                error: 'Device Communication Error',
                message: error.message,
                hint: 'Ensure the device is powered on, reachable, and the gateway is running'
            });
        }
    });

    /**
     * Get device capabilities directly from device using IP
     * GET /api/devices/direct/capabilities
     * Query: ip, port (optional, default 51211), deviceId (optional)
     */
    router.get('/direct/capabilities', async (req, res) => {
        try {
            const { ip, port = 51211, deviceId: providedDeviceId } = req.query;

            let deviceId = parseDeviceId(providedDeviceId);

            // If deviceId not provided or invalid, try to find by IP
            if (deviceId === null) {
                if (!ip) {
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: 'Either deviceId or IP address is required. Use ?ip=10.0.0.8&port=51211 or ?deviceId=546173337'
                    });
                }

                // Get or establish connection
                const connection = await getOrConnectDevice(ip, parseInt(port, 10) || 51211);
                deviceId = connection.deviceId;
            }
            
            // Ensure deviceId is a valid number
            if (deviceId === null || isNaN(deviceId)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Invalid device ID. Please provide a valid numeric device ID or IP address.'
                });
            }
            
            // Get device capabilities
            const capabilities = await services.connection.getDeviceCapabilities(deviceId);

            // Convert protobuf to plain object
            const capsData = capabilities.toObject ? capabilities.toObject() : capabilities;

            res.json({
                success: true,
                source: 'direct_device',
                connectionInfo: {
                    ip: ip || 'N/A',
                    port: parseInt(port, 10) || 51211,
                    deviceId: deviceId
                },
                data: capsData
            });
        } catch (error) {
            res.status(500).json({
                error: 'Device Communication Error',
                message: error.message,
                hint: 'Ensure the device is powered on, reachable, and the gateway is running'
            });
        }
    });

    /**
     * Test direct connection to a device using IP
     * POST /api/devices/direct/connect
     * Body: { ip, port, useSSL }
     */
    router.post('/direct/connect', async (req, res) => {
        try {
            const { ip, port = 51211, useSSL = false } = req.body;

            if (!ip) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Device IP address is required in request body'
                });
            }

            const parsedPort = parseInt(port, 10) || 51211;

            // Check if already connected first
            const existingDeviceId = await findConnectedDeviceByIp(ip, parsedPort);
            
            if (existingDeviceId) {
                return res.json({
                    success: true,
                    message: 'Device is already connected',
                    source: 'direct_device',
                    data: {
                        deviceId: existingDeviceId,
                        ip: ip,
                        port: parsedPort,
                        useSSL: useSSL,
                        alreadyConnected: true
                    }
                });
            }

            // Not connected, establish new connection
            const deviceConfig = {
                ip: ip,
                port: parsedPort,
                useSSL: useSSL,
                timeout: 15000
            };

            const deviceId = await services.connection.connectToDevice(deviceConfig);

            res.json({
                success: true,
                message: 'Successfully connected to device',
                source: 'direct_device',
                data: {
                    deviceId: deviceId,
                    ip: ip,
                    port: parsedPort,
                    useSSL: useSSL,
                    connectedAt: new Date().toISOString()
                }
            });
        } catch (error) {
            res.status(500).json({
                error: 'Connection Failed',
                message: error.message,
                hint: 'Check: 1) Device is powered on, 2) IP/Port are correct, 3) Network is reachable, 4) Gateway is running'
            });
        }
    });

    /**
     * Disconnect from a device by deviceId (from gateway connection)
     * POST /api/devices/direct/disconnect
     * Body: { deviceId }
     */
    router.post('/direct/disconnect', async (req, res) => {
        try {
            const { deviceId: rawDeviceId } = req.body;

            const deviceId = parseDeviceId(rawDeviceId);

            if (deviceId === null) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Valid numeric Device ID is required in request body'
                });
            }

            await services.connection.disconnectDevice(deviceId);

            res.json({
                success: true,
                message: 'Successfully disconnected from device',
                deviceId: deviceId
            });
        } catch (error) {
            res.status(500).json({
                error: 'Disconnect Failed',
                message: error.message
            });
        }
    });

    /**
     * Get list of currently connected devices (from gateway)
     * GET /api/devices/direct/connected
     */
    router.get('/direct/connected', async (req, res) => {
        try {
            const devices = await services.connection.getConnectedDevices();
            
            // Convert protobuf to plain objects
            const deviceList = devices.map(d => d.toObject ? d.toObject() : d);

            res.json({
                success: true,
                source: 'gateway',
                data: deviceList,
                total: deviceList.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get connected devices',
                message: error.message
            });
        }
    });

    /**
     * Get users enrolled on a device
     * GET /api/devices/direct/users
     * Query: ip, port (optional, default 51211), deviceId (optional)
     */
    router.get('/direct/users', async (req, res) => {
        try {
            const { ip, port = 51211, deviceId: providedDeviceId } = req.query;

            let deviceId = parseDeviceId(providedDeviceId);

            // If deviceId not provided or invalid, try to find by IP
            if (deviceId === null) {
                if (!ip) {
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: 'Either deviceId or IP address is required. Use ?ip=10.0.0.8&port=51211 or ?deviceId=546173337'
                    });
                }

                // Get or establish connection
                const connection = await getOrConnectDevice(ip, parseInt(port, 10) || 51211);
                deviceId = connection.deviceId;
            }

            // Ensure deviceId is a valid number
            if (deviceId === null || isNaN(deviceId)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Invalid device ID. Please provide a valid numeric device ID or IP address.'
                });
            }

            // Get user list from device
            const userHeaders = await services.user.getUserList(deviceId);

            // If we have user headers, optionally get full user details
            let users = userHeaders;
            if (userHeaders && userHeaders.length > 0 && req.query.details === 'true') {
                const userIds = userHeaders.map(u => u.id);
                users = await services.user.getUsers(deviceId, userIds);
            }

            res.json({
                success: true,
                source: 'direct_device',
                connectionInfo: {
                    ip: ip || 'N/A',
                    port: parseInt(port, 10) || 51211,
                    deviceId: deviceId
                },
                data: users,
                total: users.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Device Communication Error',
                message: error.message,
                hint: 'Ensure the device is connected and the gateway is running'
            });
        }
    });

    /**
     * Get detailed user information from a device
     * GET /api/devices/direct/users/:userId
     * Query: ip, port (optional, default 51211), deviceId (optional)
     */
    router.get('/direct/users/:userId', async (req, res) => {
        try {
            const { ip, port = 51211, deviceId: providedDeviceId } = req.query;
            const { userId } = req.params;

            let deviceId = parseDeviceId(providedDeviceId);

            // If deviceId not provided or invalid, try to find by IP
            if (deviceId === null) {
                if (!ip) {
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: 'Either deviceId or IP address is required. Use ?ip=10.0.0.8&port=51211 or ?deviceId=546173337'
                    });
                }

                // Get or establish connection
                const connection = await getOrConnectDevice(ip, parseInt(port, 10) || 51211);
                deviceId = connection.deviceId;
            }

            // Ensure deviceId is a valid number
            if (deviceId === null || isNaN(deviceId)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Invalid device ID. Please provide a valid numeric device ID or IP address.'
                });
            }

            // Get user details
            const users = await services.user.getUsers(deviceId, [userId]);

            if (!users || users.length === 0) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `User ${userId} not found on device`
                });
            }

            res.json({
                success: true,
                source: 'direct_device',
                connectionInfo: {
                    ip: ip || 'N/A',
                    port: parseInt(port, 10) || 51211,
                    deviceId: deviceId
                },
                data: users[0]
            });
        } catch (error) {
            res.status(500).json({
                error: 'Device Communication Error',
                message: error.message,
                hint: 'Ensure the device is connected and the gateway is running'
            });
        }
    });

    /**
     * Get cards for a specific user on a device
     * GET /api/devices/direct/users/:userId/cards
     * Query: ip, port (optional, default 51211), deviceId (optional)
     */
    router.get('/direct/users/:userId/cards', async (req, res) => {
        try {
            const { ip, port = 51211, deviceId: providedDeviceId } = req.query;
            const { userId } = req.params;

            let deviceId = parseDeviceId(providedDeviceId);

            // If deviceId not provided or invalid, try to find by IP
            if (deviceId === null) {
                if (!ip) {
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: 'Either deviceId or IP address is required. Use ?ip=10.0.0.8&port=51211 or ?deviceId=546173337'
                    });
                }

                // Get or establish connection
                const connection = await getOrConnectDevice(ip, parseInt(port, 10) || 51211);
                deviceId = connection.deviceId;
            }

            // Ensure deviceId is a valid number
            if (deviceId === null || isNaN(deviceId)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Invalid device ID. Please provide a valid numeric device ID or IP address.'
                });
            }

            // Get user with card details
            const users = await services.user.getUsers(deviceId, [userId]);

            if (!users || users.length === 0) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `User ${userId} not found on device`
                });
            }

            const user = users[0];
            
            // Extract card information from user data
            const cards = user.cardsList || user.cards || [];

            res.json({
                success: true,
                source: 'direct_device',
                connectionInfo: {
                    ip: ip || 'N/A',
                    port: parseInt(port, 10) || 51211,
                    deviceId: deviceId
                },
                userId: userId,
                data: cards,
                total: cards.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Device Communication Error',
                message: error.message,
                hint: 'Ensure the device is connected and the gateway is running'
            });
        }
    });

    /**
     * Get all users with their cards from a device (combined view)
     * GET /api/devices/direct/users-cards
     * Query: ip, port (optional, default 51211), deviceId (optional)
     */
    router.get('/direct/users-cards', async (req, res) => {
        try {
            const { ip, port = 51211, deviceId: providedDeviceId } = req.query;

            let deviceId = parseDeviceId(providedDeviceId);

            // If deviceId not provided or invalid, try to find by IP
            if (deviceId === null) {
                if (!ip) {
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: 'Either deviceId or IP address is required. Use ?ip=10.0.0.8&port=51211 or ?deviceId=546173337'
                    });
                }

                // Get or establish connection
                const connection = await getOrConnectDevice(ip, parseInt(port, 10) || 51211);
                deviceId = connection.deviceId;
            }

            // Ensure deviceId is a valid number
            if (deviceId === null || isNaN(deviceId)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Invalid device ID. Please provide a valid numeric device ID or IP address.'
                });
            }

            // Get user list headers first
            const userHeaders = await services.user.getUserList(deviceId);

            if (!userHeaders || userHeaders.length === 0) {
                return res.json({
                    success: true,
                    source: 'direct_device',
                    connectionInfo: {
                        ip: ip || 'N/A',
                        port: parseInt(port, 10) || 51211,
                        deviceId: deviceId
                    },
                    data: [],
                    total: 0,
                    message: 'No users enrolled on this device'
                });
            }

            // Get full user details including cards
            const userIds = userHeaders.map(u => u.id);
            const users = await services.user.getUsers(deviceId, userIds);

            // Format response with card info
            const usersWithCards = users.map(user => {
                const cards = user.cardsList || user.cards || [];
                
                // Format cards for display
                const formattedCards = cards.map(card => {
                    // Handle CSN card data
                    const csnData = card.csncarddata || card.csnCardData || card.csnCarddata || {};
                    let cardHex = '';
                    
                    if (csnData.data) {
                        if (typeof csnData.data === 'string') {
                            // Base64 encoded from protobuf
                            try {
                                const buffer = Buffer.from(csnData.data, 'base64');
                                cardHex = buffer.toString('hex').toUpperCase();
                            } catch (e) {
                                cardHex = csnData.data;
                            }
                        } else if (Buffer.isBuffer(csnData.data)) {
                            cardHex = csnData.data.toString('hex').toUpperCase();
                        }
                    }

                    return {
                        type: card.type,
                        cardType: csnData.type,
                        size: csnData.size,
                        data: cardHex,
                        raw: card
                    };
                });

                return {
                    id: user.hdr?.id || user.id,
                    name: user.name,
                    numOfCard: user.hdr?.numofcard || user.numOfCard || 0,
                    numOfFinger: user.hdr?.numoffinger || user.numOfFinger || 0,
                    numOfFace: user.hdr?.numofface || user.numOfFace || 0,
                    cards: formattedCards,
                    raw: user
                };
            });

            res.json({
                success: true,
                source: 'direct_device',
                connectionInfo: {
                    ip: ip || 'N/A',
                    port: parseInt(port, 10) || 51211,
                    deviceId: deviceId
                },
                data: usersWithCards,
                total: usersWithCards.length,
                summary: {
                    totalUsers: usersWithCards.length,
                    usersWithCards: usersWithCards.filter(u => u.cards.length > 0).length,
                    totalCards: usersWithCards.reduce((sum, u) => sum + u.cards.length, 0)
                }
            });
        } catch (error) {
            res.status(500).json({
                error: 'Device Communication Error',
                message: error.message,
                hint: 'Ensure the device is connected and the gateway is running'
            });
        }
    });

    // =====================================================
    // DATABASE-BASED ROUTES (Original functionality)
    // =====================================================

    /**
     * Search for devices on network
     * GET /api/devices/search
     */
    router.get('/search', async (req, res) => {
        try {
            const { timeout = 5 } = req.query;
            const devices = await services.connection.searchDevices(parseInt(timeout));

            res.json({
                success: true,
                data: devices,
                total: devices.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error', 
                message: error.message
            });
        }
    });

    /**
     * Get all devices from database
     * GET /api/devices
     */
    router.get('/', async (req, res) => {
        try {
            const { status, connected } = req.query;
            
            let devices;
            if (connected === 'true') {
                devices = await services.connection.getConnectedDevicesFromDB();
            } else {
                devices = await services.connection.getAllDevicesFromDB();
            }

            // Filter by status if provided
            if (status) {
                devices = devices.filter(device => device.status === status);
            }

            res.json({
                success: true,
                data: devices,
                total: devices.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Add new device to database
     * POST /api/devices
     */
    router.post('/', async (req, res) => {
        try {
            const deviceConfig = req.body;

            // Validate required fields
            if (!deviceConfig.name || !deviceConfig.ip || !deviceConfig.port) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'name, ip, and port are required'
                });
            }

            const device = await services.connection.addDeviceToDB(deviceConfig);

            res.status(201).json({
                success: true,
                message: 'Device added successfully',
                data: device
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Connect to device from database
     * POST /api/devices/:deviceId/connect
     */
    router.post('/:deviceId/connect', async (req, res) => {
        try {
            const deviceId = parseInt(req.params.deviceId);
            
            // Get device from database
            const devices = await services.connection.getAllDevicesFromDB();
            const device = devices.find(d => d.id === deviceId);
            
            if (!device) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Device not found'
                });
            }

            const connectedDeviceId = await services.connection.connectToDeviceFromDB(device);

            res.json({
                success: true,
                message: 'Device connected successfully',
                deviceId: connectedDeviceId,
                device: device
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Disconnect device
     * POST /api/devices/:deviceId/disconnect
     */
    router.post('/:deviceId/disconnect', async (req, res) => {
        try {
            const deviceId = req.params.deviceId; // deviceId can be string or number depending on service
            await services.connection.disconnectDevice(deviceId);

            res.json({
                success: true,
                message: 'Device disconnected successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get device information by DB ID or Suprema device ID
     * GET /api/devices/:deviceId/info
     * 
     * The deviceId parameter can be:
     * 1. A small number (1-999) - treated as DB ID, will lookup device IP and connect
     * 2. A large number (>999) - treated as Suprema device ID, used directly
     * 
     * This allows both:
     * - /api/devices/1/info (DB ID)
     * - /api/devices/546173337/info (Suprema device ID)
     */
    router.get('/:deviceId/info', async (req, res) => {
        try {
            const { supremaDeviceId, deviceRecord } = await resolveSupremaDeviceId(req.params.deviceId);
            
            const info = await services.connection.getDeviceInfo(supremaDeviceId);
            
            // Convert protobuf to plain object
            const deviceInfo = info.toObject ? info.toObject() : info;

            res.json({
                success: true,
                data: {
                    ...deviceInfo,
                    ...(deviceRecord && {
                        dbId: deviceRecord.id,
                        dbName: deviceRecord.name,
                        dbIp: deviceRecord.ip
                    })
                }
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({
                error: statusCode === 404 ? 'Not Found' : 'Internal Server Error',
                message: error.message,
                hint: 'For DB IDs (1-999), ensure device has IP configured. For Suprema IDs (large numbers), ensure device is connected.'
            });
        }
    });

    /**
     * Get device capabilities by DB ID or Suprema device ID
     * GET /api/devices/:deviceId/capabilities
     */
    router.get('/:deviceId/capabilities', async (req, res) => {
        try {
            const { supremaDeviceId, deviceRecord } = await resolveSupremaDeviceId(req.params.deviceId);
            const capabilities = await services.connection.getDeviceCapabilities(supremaDeviceId);
            
            // Convert protobuf to plain object
            const capData = capabilities.toObject ? capabilities.toObject() : capabilities;

            res.json({
                success: true,
                data: capData,
                ...(deviceRecord && { dbId: deviceRecord.id, dbName: deviceRecord.name })
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({
                error: statusCode === 404 ? 'Not Found' : 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Test device connection by DB ID or Suprema device ID
     * GET /api/devices/:deviceId/test
     */
    router.get('/:deviceId/test', async (req, res) => {
        try {
            const { supremaDeviceId, deviceRecord } = await resolveSupremaDeviceId(req.params.deviceId);
            const isConnected = await services.connection.testDeviceConnection(supremaDeviceId);

            res.json({
                success: true,
                connected: isConnected,
                deviceId: supremaDeviceId,
                ...(deviceRecord && { dbId: deviceRecord.id, dbName: deviceRecord.name })
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({
                error: statusCode === 404 ? 'Not Found' : 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Test network connectivity to a device before connecting
     * POST /api/devices/test-network
     * Body: { ip, port }
     */
    router.post('/test-network', async (req, res) => {
        try {
            const { ip, port } = req.body;

            if (!ip) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'IP address is required'
                });
            }

            const results = await services.connection.testNetworkConnectivity(ip, port);

            res.json({
                success: true,
                data: results
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Update device in database
     * PUT /api/devices/:deviceId
     */
    router.put('/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const updates = req.body;

            const device = await services.connection.updateDeviceInDB(deviceId, updates);

            res.json({
                success: true,
                message: 'Device updated successfully',
                data: device
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Delete device from database
     * DELETE /api/devices/:deviceId
     */
    router.delete('/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;

            await services.connection.removeDeviceFromDB(deviceId);

            res.json({
                success: true,
                message: 'Device deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Sync all device statuses
     * POST /api/devices/sync
     */
    router.post('/sync', async (req, res) => {
        try {
            await services.connection.syncDeviceStatus();

            res.json({
                success: true,
                message: 'Device status synchronized successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Auto-reconnect failed devices
     * POST /api/devices/reconnect
     */
    router.post('/reconnect', async (req, res) => {
        try {
            await services.connection.autoReconnectDevices();

            res.json({
                success: true,
                message: 'Device reconnection process initiated'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get connection statistics
     * GET /api/devices/statistics
     */
    router.get('/statistics', async (req, res) => {
        try {
            const stats = services.connection.getConnectionStats();

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    return router;
};