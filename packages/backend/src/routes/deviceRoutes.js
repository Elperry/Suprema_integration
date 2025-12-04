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
     * Helper function to find device ID by IP address from connected devices
     */
    const findConnectedDeviceByIp = async (ip, port) => {
        try {
            const connectedDevices = await services.connection.getConnectedDevices();
            const deviceList = connectedDevices.map(d => d.toObject ? d.toObject() : d);
            
            // Find device matching IP and port
            const device = deviceList.find(d => 
                d.ipaddr === ip && d.port === parseInt(port)
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
        // First, check if device is already connected
        let deviceId = await findConnectedDeviceByIp(ip, port);
        
        if (deviceId) {
            console.log(`Device already connected at ${ip}:${port} with ID ${deviceId}`);
            return { deviceId, alreadyConnected: true };
        }

        // Device not connected, establish new connection
        console.log(`Connecting to device at ${ip}:${port}...`);
        const deviceConfig = {
            ip: ip,
            port: parseInt(port),
            useSSL: useSSL,
            timeout: 15000
        };

        deviceId = await services.connection.connectToDevice(deviceConfig);
        return { deviceId, alreadyConnected: false };
    };

    /**
     * Get device info directly from device using IP
     * GET /api/devices/direct/info
     * Query: ip, port (optional, default 51211), deviceId (optional, use if already connected)
     */
    router.get('/direct/info', async (req, res) => {
        try {
            const { ip, port = 51211, deviceId: providedDeviceId } = req.query;

            let deviceId = providedDeviceId;

            // If deviceId provided, use it directly
            if (!deviceId) {
                if (!ip) {
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: 'Either deviceId or IP address is required. Use ?ip=10.0.0.8&port=51211 or ?deviceId=546173337'
                    });
                }

                // Get or establish connection
                const connection = await getOrConnectDevice(ip, parseInt(port));
                deviceId = connection.deviceId;
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
                    port: parseInt(port) || 'N/A',
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

            let deviceId = providedDeviceId;

            // If deviceId provided, use it directly
            if (!deviceId) {
                if (!ip) {
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: 'Either deviceId or IP address is required. Use ?ip=10.0.0.8&port=51211 or ?deviceId=546173337'
                    });
                }

                // Get or establish connection
                const connection = await getOrConnectDevice(ip, parseInt(port));
                deviceId = connection.deviceId;
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
                    port: parseInt(port) || 'N/A',
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

            // Check if already connected first
            const existingDeviceId = await findConnectedDeviceByIp(ip, parseInt(port));
            
            if (existingDeviceId) {
                return res.json({
                    success: true,
                    message: 'Device is already connected',
                    source: 'direct_device',
                    data: {
                        deviceId: existingDeviceId,
                        ip: ip,
                        port: parseInt(port),
                        useSSL: useSSL,
                        alreadyConnected: true
                    }
                });
            }

            // Not connected, establish new connection
            const deviceConfig = {
                ip: ip,
                port: parseInt(port),
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
                    port: parseInt(port),
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
            const { deviceId } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Device ID is required in request body'
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
     * Get device information
     * GET /api/devices/:deviceId/info
     */
    router.get('/:deviceId/info', async (req, res) => {
        try {
            const deviceId = req.params.deviceId; // deviceId can be string or number depending on service
            const info = await services.connection.getDeviceInfo(deviceId);

            res.json({
                success: true,
                data: info
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get device capabilities
     * GET /api/devices/:deviceId/capabilities
     */
    router.get('/:deviceId/capabilities', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const capabilities = await services.connection.getDeviceCapabilities(deviceId);

            res.json({
                success: true,
                data: capabilities
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Test device connection
     * GET /api/devices/:deviceId/test
     */
    router.get('/:deviceId/test', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const isConnected = await services.connection.testDeviceConnection(deviceId);

            res.json({
                success: true,
                connected: isConnected,
                deviceId: deviceId
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
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