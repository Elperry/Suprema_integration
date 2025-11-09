/**
 * Gate Event Routes
 * API endpoints for managing gate access events
 */

import express from 'express';
const router = express.Router();

export default (database, logger) => {
    /**
     * GET /api/gate-events
     * Get gate events with optional filters
     */
    router.get('/', async (req, res) => {
        try {
            const filters = {
                employee_id: req.query.employee_id,
                gate_id: req.query.gate_id ? parseInt(req.query.gate_id) : null,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
                limit: req.query.limit ? parseInt(req.query.limit) : 100
            };

            const events = await database.getGateEvents(filters);

            res.json({
                success: true,
                count: events.length,
                data: events
            });
        } catch (error) {
            logger.error('Error fetching gate events:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * GET /api/gate-events/employee/:employeeId
     * Get latest gate event for specific employee
     */
    router.get('/employee/:employeeId', async (req, res) => {
        try {
            const event = await database.getLatestEmployeeEvent(req.params.employeeId);

            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: 'No events found for this employee'
                });
            }

            res.json({
                success: true,
                data: event
            });
        } catch (error) {
            logger.error('Error fetching employee event:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * POST /api/gate-events
     * Create new gate event (usually called by device webhook or sync)
     */
    router.post('/', async (req, res) => {
        try {
            const eventData = {
                employee_id: req.body.employee_id,
                door_no: req.body.door_no,
                gate_id: req.body.gate_id,
                loc: req.body.loc,
                dir: req.body.dir,
                etime: req.body.etime ? new Date(req.body.etime) : new Date()
            };

            const event = await database.addGateEvent(eventData);

            logger.info(`Gate event created: ${event.id} for employee ${eventData.employee_id}`);

            res.status(201).json({
                success: true,
                message: 'Gate event created successfully',
                data: event
            });
        } catch (error) {
            logger.error('Error creating gate event:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * GET /api/gate-events/stats
     * Get gate event statistics
     */
    router.get('/stats', async (req, res) => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const todayEvents = await database.getGateEvents({
                startDate: today.toISOString(),
                endDate: new Date().toISOString(),
                limit: 10000
            });

            // Calculate statistics
            const stats = {
                total_today: todayEvents.length,
                entries: todayEvents.filter(e => e.dir === 'in').length,
                exits: todayEvents.filter(e => e.dir === 'out').length,
                by_location: {}
            };

            // Group by location
            todayEvents.forEach(event => {
                const loc = event.loc || 'Unknown';
                if (!stats.by_location[loc]) {
                    stats.by_location[loc] = 0;
                }
                stats.by_location[loc]++;
            });

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            logger.error('Error fetching gate event stats:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    return router;
};
