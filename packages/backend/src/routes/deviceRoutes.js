/**
 * Device Management Routes
 * REST API endpoints for device operations
 */

const express = require('express');
const router = express.Router();

module.exports = (services) => {
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
            const { deviceId } = req.params;
            
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
            const { deviceId } = req.params;
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
            const { deviceId } = req.params;
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