/**
 * Time & Attendance Routes
 * REST API endpoints for T&A configuration and attendance management
 */

import express from 'express';
const router = express.Router();

export default (services) => {
    /**
     * Get T&A configuration
     * GET /api/tna/config
     */
    router.get('/config', async (req, res) => {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const config = await services.tna.getTNAConfig(deviceId);

            res.json({
                success: true,
                data: config
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Set T&A configuration
     * POST /api/tna/config
     */
    router.post('/config', async (req, res) => {
        try {
            const { deviceId, config } = req.body;

            if (!deviceId || !config) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and config are required'
                });
            }

            await services.tna.setTNAConfig(deviceId, config);

            res.json({
                success: true,
                message: 'T&A configuration updated successfully',
                config: config
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get T&A logs
     * GET /api/tna/logs
     */
    router.get('/logs', async (req, res) => {
        try {
            const { 
                deviceId, 
                startTime, 
                endTime, 
                userIds = [],
                maxLogs = 1000 
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
                userIds: Array.isArray(userIds) ? userIds : userIds ? [userIds] : [],
                maxLogs: parseInt(maxLogs)
            };

            const logs = await services.tna.getTNALogs(deviceId, filters);

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
     * Calculate work hours
     * GET /api/tna/work-hours
     */
    router.get('/work-hours', async (req, res) => {
        try {
            const { 
                deviceId, 
                userId, 
                startDate, 
                endDate,
                workSchedule 
            } = req.query;

            if (!deviceId || !userId || !startDate || !endDate) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId, userId, startDate, and endDate are required'
                });
            }

            const workHours = await services.tna.calculateWorkHours(
                deviceId, 
                userId, 
                startDate, 
                endDate, 
                workSchedule ? JSON.parse(workSchedule) : undefined
            );

            res.json({
                success: true,
                data: workHours
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Export T&A data to CSV
     * GET /api/tna/export
     */
    router.get('/export', async (req, res) => {
        try {
            const { 
                deviceId, 
                startTime, 
                endTime, 
                userIds = [],
                format = 'csv'
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
                userIds: Array.isArray(userIds) ? userIds : userIds ? [userIds] : []
            };

            if (format === 'csv') {
                const csvData = await services.tna.exportTNAToCSV(deviceId, filters);
                
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename="tna_logs_${deviceId}_${Date.now()}.csv"`);
                res.send(csvData);
            } else {
                const logs = await services.tna.getTNALogs(deviceId, filters);
                
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', `attachment; filename="tna_logs_${deviceId}_${Date.now()}.json"`);
                res.json({
                    success: true,
                    data: logs,
                    exportedAt: new Date().toISOString()
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
     * Get attendance summary
     * GET /api/tna/summary
     */
    router.get('/summary', async (req, res) => {
        try {
            const { 
                deviceId, 
                userId, 
                period = 'weekly',
                startDate,
                endDate
            } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const summary = await services.tna.getAttendanceSummary(deviceId, {
                userId: userId,
                period: period,
                startDate: startDate,
                endDate: endDate
            });

            res.json({
                success: true,
                data: summary
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Set work schedule
     * POST /api/tna/schedule
     */
    router.post('/schedule', async (req, res) => {
        try {
            const { deviceId, userId, schedule } = req.body;

            if (!deviceId || !userId || !schedule) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId, userId, and schedule are required'
                });
            }

            await services.tna.setWorkSchedule(deviceId, userId, schedule);

            res.json({
                success: true,
                message: 'Work schedule set successfully',
                userId: userId,
                schedule: schedule
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get work schedule
     * GET /api/tna/schedule/:userId
     */
    router.get('/schedule/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const schedule = await services.tna.getWorkSchedule(deviceId, userId);

            res.json({
                success: true,
                data: schedule
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Process attendance for payroll
     * POST /api/tna/payroll
     */
    router.post('/payroll', async (req, res) => {
        try {
            const { 
                deviceId, 
                payrollPeriod,
                userIds = [],
                includeOvertimeCalculation = true
            } = req.body;

            if (!deviceId || !payrollPeriod) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and payrollPeriod are required'
                });
            }

            const payrollData = await services.tna.processPayrollData(deviceId, {
                payrollPeriod: payrollPeriod,
                userIds: userIds,
                includeOvertime: includeOvertimeCalculation
            });

            res.json({
                success: true,
                data: payrollData,
                period: payrollPeriod
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get overtime calculations
     * GET /api/tna/overtime
     */
    router.get('/overtime', async (req, res) => {
        try {
            const { 
                deviceId, 
                userId, 
                startDate, 
                endDate,
                overtimeRules 
            } = req.query;

            if (!deviceId || !userId || !startDate || !endDate) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId, userId, startDate, and endDate are required'
                });
            }

            const overtime = await services.tna.calculateOvertime(
                deviceId, 
                userId, 
                startDate, 
                endDate,
                overtimeRules ? JSON.parse(overtimeRules) : undefined
            );

            res.json({
                success: true,
                data: overtime
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