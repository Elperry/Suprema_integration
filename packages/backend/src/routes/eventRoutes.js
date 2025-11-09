/**
 * Event Management Routes
 * REST API endpoints for event monitoring and log management
 */

const express = require('express');
const router = express.Router();

module.exports = (services) => {
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

    return router;
};