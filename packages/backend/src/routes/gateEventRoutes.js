/**
 * Gate Event Routes
 * API endpoints for managing gate access events
 */

import express from 'express';
import { toCsv, toExcelTable } from '../utils/csv.js';
import { asyncHandler } from '../core/errors/index.js';
const router = express.Router();

export default (services) => {
    const database = services.database;
    const logger = services.logger || console;
    const audit = services.audit;

    /**
     * GET /api/gate-events
     * Get authentication events from the event log with optional filters
     */
    router.get('/', asyncHandler(async (req, res) => {
        try {
            const limit = req.query.limit ? Math.min(parseInt(req.query.limit), 500) : 50;
            const offset = req.query.offset ? parseInt(req.query.offset) : 0;
            const where = { eventType: 'authentication' };

            if (req.query.employee_id) where.userId = req.query.employee_id;
            if (req.query.gate_id) where.deviceId = parseInt(req.query.gate_id);
            if (req.query.authResult) where.authResult = req.query.authResult;
            if (req.query.startDate || req.query.endDate) {
                where.timestamp = {};
                if (req.query.startDate) where.timestamp.gte = new Date(req.query.startDate);
                if (req.query.endDate) where.timestamp.lte = new Date(req.query.endDate);
            }

            const [rows, total] = await Promise.all([
                database.prisma.event.findMany({
                    where,
                    orderBy: { timestamp: 'desc' },
                    take: limit,
                    skip: offset,
                    select: {
                        id: true,
                        userId: true,
                        deviceId: true,
                        doorId: true,
                        description: true,
                        authResult: true,
                        subType: true,
                        timestamp: true,
                    },
                }),
                database.prisma.event.count({ where }),
            ]);

            const data = rows.map(ev => ({
                id: ev.id,
                employee_id: ev.userId,
                gate_id: ev.deviceId,
                door_no: ev.doorId,
                description: ev.description,
                authResult: ev.authResult,
                subType: ev.subType,
                etime: ev.timestamp,
            }));

            res.json({ success: true, count: data.length, total, data });
        } catch (error) {
            logger.error('Error fetching gate events:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }));

    /**
     * GET /api/gate-events/export
     * Export replicated gate events in CSV or JSON format
     */
    router.get('/export', asyncHandler(async (req, res) => {
        try {
            const filters = {
                employee_id: req.query.employee_id,
                gate_id: req.query.gate_id ? parseInt(req.query.gate_id) : null,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
                limit: req.query.limit ? parseInt(req.query.limit) : 5000
            };
            const format = req.query.format || 'csv';

            const events = await database.getGateEvents(filters);

            if (format === 'json') {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', `attachment; filename="gate_events_${Date.now()}.json"`);
                return res.json({
                    success: true,
                    exportedAt: new Date().toISOString(),
                    count: events.length,
                    filters,
                    data: events
                });
            }

            const columns = [
                { header: 'ID', value: (row) => row.id },
                { header: 'Employee ID', value: (row) => row.employee_id },
                { header: 'Door No', value: (row) => row.door_no },
                { header: 'Gate ID', value: (row) => row.gate_id },
                { header: 'Location', value: (row) => row.loc },
                { header: 'Direction', value: (row) => row.dir },
                { header: 'Event Time', value: (row) => row.etime },
                { header: 'Date', value: (row) => row.d },
                { header: 'Time', value: (row) => row.t }
            ];

            if (format === 'xls') {
                const workbook = toExcelTable(events, columns, 'Gate Events');
                res.setHeader('Content-Type', 'application/vnd.ms-excel');
                res.setHeader('Content-Disposition', `attachment; filename="gate_events_${Date.now()}.xls"`);
                return res.send(workbook);
            }

            const csvData = toCsv(events, columns);

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="gate_events_${Date.now()}.csv"`);

            audit?.log({ action: 'export-gate-events', category: 'export', details: { format, count: events.length }, ipAddress: req.ip, requestId: req.requestId });
            res.send(csvData);
        } catch (error) {
            logger.error('Error exporting gate events:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }));

    /**
     * GET /api/gate-events/employee/:employeeId
     * Get latest gate event for specific employee
     */
    router.get('/employee/:employeeId', asyncHandler(async (req, res) => {
        try {
            const event = await database.getLatestEmployeeEvent(req.params.employeeId);

            res.json({
                success: true,
                data: event || null
            });
        } catch (error) {
            logger.error('Error fetching employee event:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }));

    /**
     * POST /api/gate-events
     * Create new gate event (usually called by device webhook or sync)
     */
    router.post('/', asyncHandler(async (req, res) => {
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
    }));

    /**
     * GET /api/gate-events/stats
     * Get authentication event statistics for today
     */
    router.get('/stats', asyncHandler(async (req, res) => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const todayWhere = { eventType: 'authentication', timestamp: { gte: today } };

            const [todayTotal, successCount, failCount, uniqueUsers] = await Promise.all([
                database.prisma.event.count({ where: todayWhere }),
                database.prisma.event.count({ where: { ...todayWhere, authResult: 'success' } }),
                database.prisma.event.count({ where: { ...todayWhere, authResult: { not: 'success' } } }),
                database.prisma.event.findMany({
                    where: { ...todayWhere, userId: { not: null } },
                    select: { userId: true },
                    distinct: ['userId'],
                }),
            ]);

            res.json({
                success: true,
                data: {
                    todayTotal,
                    successes: successCount,
                    failures: failCount,
                    uniqueEmployees: uniqueUsers.length,
                },
            });
        } catch (error) {
            logger.error('Error fetching gate event stats:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }));

    return router;
};
