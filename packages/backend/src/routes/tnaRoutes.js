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
                startDate,
                endTime,
                endDate, 
                employeeId,
                userIds = [],
                maxLogs = 1000,
                page = 1,
                pageSize = 50
            } = req.query;

            // If no deviceId, try to get from all connected devices
            let targetDeviceIds = [];
            if (deviceId) {
                targetDeviceIds = [deviceId];
            } else {
                // Get all connected devices
                const connectedDevices = await services.connection.getConnectedDevices();
                // Extract device IDs - connectedDevices returns protobuf objects with .deviceid property
                targetDeviceIds = connectedDevices.map(d => d.deviceid || d.id);
                
                if (targetDeviceIds.length === 0) {
                    return res.json({
                        success: true,
                        data: [],
                        total: 0,
                        message: 'No devices connected'
                    });
                }
            }

            // Convert dates to timestamps if provided
            const startTimestamp = startTime || (startDate ? new Date(startDate).getTime() : undefined);
            const endTimestamp = endTime || (endDate ? new Date(endDate + 'T23:59:59').getTime() : undefined);

            const filters = {
                startTime: startTimestamp,
                endTime: endTimestamp,
                userIds: employeeId ? [employeeId] : (Array.isArray(userIds) ? userIds : userIds ? [userIds] : []),
                maxLogs: parseInt(maxLogs)
            };

            // Collect logs from all target devices
            let allLogs = [];
            for (const devId of targetDeviceIds) {
                try {
                    // getTNALogs(deviceId, startEventId, maxEvents)
                    const logs = await services.tna.getTNALogs(devId, 0, filters.maxLogs);
                    allLogs = allLogs.concat(logs.map(log => ({ ...log, deviceId: devId })));
                } catch (e) {
                    console.error(`Failed to get logs from device ${devId}:`, e.message);
                }
            }

            // Filter by date if provided
            if (filters.startTime || filters.endTime) {
                allLogs = allLogs.filter(log => {
                    const logTime = log.timestamp * 1000; // Convert to milliseconds
                    if (filters.startTime && logTime < filters.startTime) return false;
                    if (filters.endTime && logTime > filters.endTime) return false;
                    return true;
                });
            }

            // Filter by userIds if provided
            if (filters.userIds && filters.userIds.length > 0) {
                allLogs = allLogs.filter(log => filters.userIds.includes(log.userid || log.userId));
            }

            // Sort by timestamp descending
            allLogs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

            // Paginate
            const total = allLogs.length;
            const totalPages = Math.ceil(total / parseInt(pageSize));
            const startIdx = (parseInt(page) - 1) * parseInt(pageSize);
            const paginatedLogs = allLogs.slice(startIdx, startIdx + parseInt(pageSize));

            res.json({
                success: true,
                data: paginatedLogs,
                total: total,
                pagination: {
                    page: parseInt(page),
                    pageSize: parseInt(pageSize),
                    total: total,
                    totalPages: totalPages
                },
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
                employeeId, 
                userId, 
                period = 'weekly',
                startDate,
                endDate
            } = req.query;

            // If no deviceId, try to get from first connected device
            let targetDeviceId = deviceId;
            if (!targetDeviceId) {
                const connectedDevices = await services.connection.getConnectedDevices();
                if (connectedDevices.length > 0) {
                    // Extract device ID - protobuf objects have .deviceid property
                    targetDeviceId = connectedDevices[0].deviceid || connectedDevices[0].id;
                } else {
                    return res.json({
                        success: true,
                        data: null,
                        message: 'No devices connected'
                    });
                }
            }

            const summary = await services.tna.getAttendanceSummary(targetDeviceId, {
                userId: employeeId || userId,
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