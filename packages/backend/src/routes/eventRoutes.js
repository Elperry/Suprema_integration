/**
 * Event Management Routes
 * REST API endpoints for event monitoring and log management
 */

import express from 'express';
const router = express.Router();

export default (services) => {
    /**
     * Subscribe to real-time events
     * POST /api/events/subscribe
     */
    router.post('/subscribe', async (req, res) => {
        try {
            const { deviceId, filters = [] } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            await services.event.subscribeToEvents(deviceId, filters);

            res.json({
                success: true,
                message: 'Event subscription activated',
                deviceId: deviceId,
                filters: filters
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

            await services.event.unsubscribeFromEvents(deviceId);

            res.json({
                success: true,
                message: 'Event subscription deactivated',
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
     * Get event logs
     * GET /api/events/logs
     */
    router.get('/logs', async (req, res) => {
        try {
            const { 
                deviceId, 
                startTime, 
                endTime, 
                maxEvents = 1000,
                eventCodes = []
            } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const filters = {
                startTime: startTime,
                endTime: endTime,
                maxEvents: parseInt(maxEvents),
                eventCodes: Array.isArray(eventCodes) ? eventCodes : eventCodes ? [eventCodes] : []
            };

            const logs = await services.event.getEventLogs(deviceId, filters);

            res.json({
                success: true,
                data: logs,
                total: logs.length,
                filters: filters
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

            const stats = await services.event.getEventStatistics(deviceId, {
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
            const eventCodes = services.event.getSupportedEventCodes();

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

            const event = await services.event.getEventById(deviceId, eventId);

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
                format = 'csv',
                startTime, 
                endTime, 
                maxEvents = 10000 
            } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const exportData = await services.event.exportEventLogs(deviceId, {
                format: format,
                startTime: startTime,
                endTime: endTime,
                maxEvents: parseInt(maxEvents)
            });

            if (format === 'csv') {
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename="events_${deviceId}_${Date.now()}.csv"`);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', `attachment; filename="events_${deviceId}_${Date.now()}.json"`);
            }

            res.send(exportData);
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
            const { deviceId, timeWindow = 3600 } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const count = await services.event.getEventCount(deviceId, parseInt(timeWindow));

            res.json({
                success: true,
                count: count,
                timeWindow: parseInt(timeWindow)
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

            const logs = await services.event.getDeviceLog(
                deviceId, 
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

            const logs = await services.event.getFilteredDeviceLog(
                deviceId, 
                parseInt(startEventId), 
                parseInt(maxNumOfLog),
                filter
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

            const logs = await services.event.getImageLog(
                deviceId, 
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
            await services.event.enableMonitoring(deviceId);

            res.json({
                success: true,
                message: 'Event monitoring enabled',
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
     * Disable event monitoring on device
     * POST /api/events/monitoring/:deviceId/disable
     */
    router.post('/monitoring/:deviceId/disable', async (req, res) => {
        try {
            const { deviceId } = req.params;
            await services.event.disableMonitoring(deviceId);

            res.json({
                success: true,
                message: 'Event monitoring disabled',
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

            await services.event.enableMonitoringMulti(deviceIds);

            res.json({
                success: true,
                message: `Event monitoring enabled on ${deviceIds.length} devices`,
                deviceIds: deviceIds
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

            await services.event.subscribeToStream(parseInt(queueSize));

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
            const { fromEventId, batchSize = 1000 } = req.body;

            const result = await services.event.syncEventsToDatabase(
                deviceId,
                fromEventId,
                parseInt(batchSize)
            );

            res.json({
                success: true,
                message: 'Events synchronized to database',
                synced: result.synced,
                lastEventId: result.lastEventId,
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
     * Sync events from all devices
     * POST /api/events/sync-all
     * Body: { batchSize }
     */
    router.post('/sync-all', async (req, res) => {
        try {
            const { batchSize = 1000 } = req.body;

            const results = await services.event.syncAllDevicesEvents(parseInt(batchSize));

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
            const status = await services.event.getSyncStatus(deviceId);

            res.json({
                success: true,
                data: status
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