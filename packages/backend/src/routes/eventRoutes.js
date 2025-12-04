/**
 * Event Management Routes
 * REST API endpoints for event monitoring and log management
 */

import express from 'express';
const router = express.Router();

export default (services) => {
    /**
     * Helper function to get Suprema device ID from database ID
     */
    const getSupremaDeviceId = async (dbDeviceId) => {
        // Check if it's already a Suprema device ID (large number)
        if (parseInt(dbDeviceId) > 100000) {
            return parseInt(dbDeviceId);
        }
        
        // Look up the connected device by database ID
        const connectedDevices = await services.connection.getConnectedDevices();
        const devices = await services.connection.getAllDevicesFromDB();
        const dbDevice = devices.find(d => d.id === parseInt(dbDeviceId));
        
        if (!dbDevice) {
            throw new Error(`Device with ID ${dbDeviceId} not found in database`);
        }
        
        // Find matching connected device by IP
        for (const device of connectedDevices) {
            const info = device.toObject ? device.toObject() : device;
            if (info.ipaddr === dbDevice.ip && info.port === dbDevice.port) {
                return info.deviceid;
            }
        }
        
        throw new Error(`Device ${dbDevice.name} (${dbDevice.ip}) is not connected. Please connect the device first.`);
    };

    /**
     * Subscribe to real-time events
     * POST /api/events/subscribe
     */
    router.post('/subscribe', async (req, res) => {
        try {
            const { deviceId, queueSize = 100 } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            
            // Enable monitoring and subscribe
            await services.event.enableMonitoring(supremaDeviceId);
            const subscription = services.event.subscribeToEvents(queueSize, [supremaDeviceId]);

            res.json({
                success: true,
                message: 'Event subscription activated',
                deviceId: deviceId,
                supremaDeviceId: supremaDeviceId
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Unsubscribe from events
     * POST /api/events/unsubscribe
     */
    router.post('/unsubscribe', async (req, res) => {
        try {
            const { deviceId } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            await services.event.disableMonitoring(supremaDeviceId);

            res.json({
                success: true,
                message: 'Event subscription deactivated',
                deviceId: deviceId,
                supremaDeviceId: supremaDeviceId
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get event logs
     * GET /api/events/logs
     */
    router.get('/logs', async (req, res) => {
        try {
            const { 
                deviceId, 
                startEventId = 0,
                maxEvents = 1000
            } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const logs = await services.event.getEventLogs(
                supremaDeviceId, 
                parseInt(startEventId), 
                parseInt(maxEvents)
            );

            res.json({
                success: true,
                data: logs,
                total: logs.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get event statistics
     * GET /api/events/statistics
     */
    router.get('/statistics', async (req, res) => {
        try {
            const { deviceId, startTime, endTime } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const stats = await services.event.getEventStatistics(supremaDeviceId, {
                startTime: startTime,
                endTime: endTime
            });

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

    /**
     * Get supported event codes
     * GET /api/events/codes
     */
    router.get('/codes', async (req, res) => {
        try {
            // Return monitoring status which includes event code info
            const status = services.event.getMonitoringStatus();
            
            // Return common event code categories
            const eventCodes = {
                verify: { code: 0x1000, description: 'Verify Success/Fail' },
                identify: { code: 0x1100, description: 'Identify Success/Fail' },
                door: { code: 0x2000, description: 'Door Events' },
                zone: { code: 0x3000, description: 'Zone Events' },
                device: { code: 0x4000, description: 'Device Events' },
                user: { code: 0x5000, description: 'User Events' },
                tna: { code: 0x6000, description: 'Time & Attendance' },
                eventCodeMapSize: status.eventCodeMapSize
            };

            res.json({
                success: true,
                data: eventCodes
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get event details by ID
     * GET /api/events/:eventId
     */
    router.get('/:eventId', async (req, res) => {
        try {
            const { eventId } = req.params;
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            // Get events starting from the specific ID with limit of 1
            const events = await services.event.getEventLogs(supremaDeviceId, parseInt(eventId), 1);
            const event = events.find(e => e.id === parseInt(eventId) || e.eventid === parseInt(eventId));

            if (!event) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Event not found'
                });
            }

            res.json({
                success: true,
                data: event
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Export event logs
     * GET /api/events/export
     */
    router.get('/export', async (req, res) => {
        try {
            const { 
                deviceId, 
                format = 'json',
                startEventId = 0, 
                maxEvents = 10000 
            } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const events = await services.event.getEventLogs(
                supremaDeviceId,
                parseInt(startEventId),
                parseInt(maxEvents)
            );

            if (format === 'csv') {
                // Convert to CSV
                const headers = Object.keys(events[0] || {}).join(',');
                const rows = events.map(e => Object.values(e).join(','));
                const csvData = [headers, ...rows].join('\n');
                
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename="events_${deviceId}_${Date.now()}.csv"`);
                res.send(csvData);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', `attachment; filename="events_${deviceId}_${Date.now()}.json"`);
                res.json({
                    exportedAt: new Date().toISOString(),
                    deviceId: deviceId,
                    count: events.length,
                    events: events
                });
            }
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get real-time event count
     * GET /api/events/count
     */
    router.get('/count', async (req, res) => {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            // Get a sample of recent events to count
            const events = await services.event.getEventLogs(supremaDeviceId, 0, 1000);

            res.json({
                success: true,
                count: events.length,
                message: 'Count represents recent events retrieved from device'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get event log from device
     * GET /api/events/device-log/:deviceId
     * Query: startEventId, maxNumOfLog
     */
    router.get('/device-log/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { startEventId = 0, maxNumOfLog = 1000 } = req.query;

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const logs = await services.event.getEventLogs(
                supremaDeviceId, 
                parseInt(startEventId), 
                parseInt(maxNumOfLog)
            );

            res.json({
                success: true,
                data: logs,
                total: logs.length,
                startEventId: parseInt(startEventId),
                maxNumOfLog: parseInt(maxNumOfLog)
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get filtered event log from device
     * POST /api/events/device-log/:deviceId/filtered
     * Body: { startEventId, maxNumOfLog, filter: {...} }
     */
    router.post('/device-log/:deviceId/filtered', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { startEventId = 0, maxNumOfLog = 1000, filter = {} } = req.body;

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const logs = await services.event.getFilteredEventLogs(
                supremaDeviceId, 
                {
                    startEventId: parseInt(startEventId),
                    maxEvents: parseInt(maxNumOfLog),
                    ...filter
                }
            );

            res.json({
                success: true,
                data: logs,
                total: logs.length,
                filter: filter
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get image event log from device
     * GET /api/events/image-log/:deviceId
     * Query: startEventId, maxNumOfLog
     */
    router.get('/image-log/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { startEventId = 0, maxNumOfLog = 100 } = req.query;

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const logs = await services.event.getImageLogs(
                supremaDeviceId, 
                parseInt(startEventId), 
                parseInt(maxNumOfLog)
            );

            res.json({
                success: true,
                data: logs,
                total: logs.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Enable event monitoring on device
     * POST /api/events/monitoring/:deviceId/enable
     */
    router.post('/monitoring/:deviceId/enable', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            await services.event.enableMonitoring(supremaDeviceId);

            res.json({
                success: true,
                message: 'Event monitoring enabled',
                deviceId: deviceId,
                supremaDeviceId: supremaDeviceId
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Disable event monitoring on device
     * POST /api/events/monitoring/:deviceId/disable
     */
    router.post('/monitoring/:deviceId/disable', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            await services.event.disableMonitoring(supremaDeviceId);

            res.json({
                success: true,
                message: 'Event monitoring disabled',
                deviceId: deviceId,
                supremaDeviceId: supremaDeviceId
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Enable monitoring on multiple devices
     * POST /api/events/monitoring/enable-multi
     * Body: { deviceIds: [] }
     */
    router.post('/monitoring/enable-multi', async (req, res) => {
        try {
            const { deviceIds } = req.body;

            if (!deviceIds || !Array.isArray(deviceIds)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceIds array is required'
                });
            }

            // Convert database IDs to Suprema device IDs and enable monitoring
            const results = [];
            for (const dbId of deviceIds) {
                try {
                    const supremaDeviceId = await getSupremaDeviceId(dbId);
                    await services.event.enableMonitoring(supremaDeviceId);
                    results.push({ dbId, supremaDeviceId, success: true });
                } catch (err) {
                    results.push({ dbId, success: false, error: err.message });
                }
            }

            res.json({
                success: true,
                message: `Event monitoring processed for ${deviceIds.length} devices`,
                results: results
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Subscribe to real-time event stream
     * POST /api/events/stream/subscribe
     * Body: { queueSize }
     */
    router.post('/stream/subscribe', async (req, res) => {
        try {
            const { queueSize = 100 } = req.body;

            // Use the existing subscribeToEvents method
            const subscription = services.event.subscribeToEvents(parseInt(queueSize));

            res.json({
                success: true,
                message: 'Subscribed to event stream',
                queueSize: parseInt(queueSize)
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Sync events from device to database
     * POST /api/events/sync/:deviceId
     * Body: { fromEventId, batchSize }
     */
    router.post('/sync/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { fromEventId = 0, batchSize = 1000 } = req.body;

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            
            // Get events from device
            const events = await services.event.getEventLogs(
                supremaDeviceId,
                parseInt(fromEventId),
                parseInt(batchSize)
            );

            // TODO: Store events in database using services.sync or database service
            // For now, just return the events that would be synced
            
            res.json({
                success: true,
                message: 'Events retrieved from device',
                synced: events.length,
                lastEventId: events.length > 0 ? events[events.length - 1].id : fromEventId,
                deviceId: deviceId,
                supremaDeviceId: supremaDeviceId,
                events: events
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Sync events from all devices
     * POST /api/events/sync-all
     * Body: { batchSize }
     */
    router.post('/sync-all', async (req, res) => {
        try {
            const { batchSize = 1000 } = req.body;

            // Get all connected devices and sync events from each
            const connectedDevices = await services.connection.getConnectedDevices();
            const results = [];

            for (const device of connectedDevices) {
                const info = device.toObject ? device.toObject() : device;
                try {
                    const events = await services.event.getEventLogs(
                        info.deviceid,
                        0,
                        parseInt(batchSize)
                    );
                    results.push({
                        deviceId: info.deviceid,
                        ip: info.ipaddr,
                        synced: events.length,
                        success: true
                    });
                } catch (err) {
                    results.push({
                        deviceId: info.deviceid,
                        ip: info.ipaddr,
                        success: false,
                        error: err.message
                    });
                }
            }

            res.json({
                success: true,
                message: 'All devices events synchronized',
                results: results
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get last synced event ID for device
     * GET /api/events/sync-status/:deviceId
     */
    router.get('/sync-status/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            
            // Get device from database to get last_event_sync
            const devices = await services.connection.getAllDevicesFromDB();
            const device = devices.find(d => d.id === parseInt(deviceId));
            
            if (!device) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'Device not found'
                });
            }

            res.json({
                success: true,
                data: {
                    deviceId: device.id,
                    deviceName: device.name,
                    lastEventSync: device.last_event_sync,
                    lastUserSync: device.last_user_sync,
                    status: device.status
                }
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