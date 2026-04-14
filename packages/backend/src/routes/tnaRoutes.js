/**
 * Time & Attendance Routes
 * REST API endpoints for T&A configuration and attendance management
 */

import express from 'express';
import { toCsv, toExcelTable } from '../utils/csv.js';
import { asyncHandler } from '../core/errors/index.js';
const router = express.Router();

export default (services) => {
    const prisma = services.database.getPrisma();

    // ==================== DB-BASED ATTENDANCE REPORTS ====================

    /**
     * Daily attendance report from replicated events.
     * GET /api/tna/attendance/daily
     * Query: date (YYYY-MM-DD, defaults today), deviceId, userId
     *
     * Groups authentication-success events per user and computes
     * first-in / last-out / total hours for the given date.
     */
    router.get('/attendance/daily', asyncHandler(async (req, res) => {
        try {
            const {
                date,
                deviceId,
                userId,
                format: fmt = 'json',
            } = req.query;

            const targetDate = date || new Date().toISOString().slice(0, 10);
            const dayStart = new Date(`${targetDate}T00:00:00`);
            const dayEnd = new Date(`${targetDate}T23:59:59.999`);

            const where = {
                timestamp: { gte: dayStart, lte: dayEnd },
                authResult: 'success',
            };
            if (deviceId) where.deviceId = parseInt(deviceId);
            if (userId) where.userId = { contains: userId };

            const events = await prisma.event.findMany({
                where,
                orderBy: { timestamp: 'asc' },
                select: { userId: true, deviceId: true, timestamp: true, eventType: true, doorId: true },
            });

            // Group by userId
            const userMap = new Map();
            for (const e of events) {
                if (!e.userId) continue;
                if (!userMap.has(e.userId)) {
                    userMap.set(e.userId, []);
                }
                userMap.get(e.userId).push(e);
            }

            const rows = [];
            for (const [uid, userEvents] of userMap) {
                const first = userEvents[0];
                const last = userEvents[userEvents.length - 1];
                const durationMs = last.timestamp - first.timestamp;
                const hours = Math.round((durationMs / 3_600_000) * 100) / 100;

                rows.push({
                    userId: uid,
                    date: targetDate,
                    firstEvent: first.timestamp.toISOString(),
                    lastEvent: last.timestamp.toISOString(),
                    totalHours: hours,
                    eventCount: userEvents.length,
                    devices: [...new Set(userEvents.map(e => e.deviceId))],
                });
            }

            rows.sort((a, b) => a.userId.localeCompare(b.userId));

            if (fmt === 'csv' || fmt === 'xls') {
                const columns = [
                    { header: 'User ID', value: r => r.userId },
                    { header: 'Date', value: r => r.date },
                    { header: 'First Event', value: r => r.firstEvent },
                    { header: 'Last Event', value: r => r.lastEvent },
                    { header: 'Total Hours', value: r => r.totalHours },
                    { header: 'Event Count', value: r => r.eventCount },
                    { header: 'Devices', value: r => r.devices.join(', ') },
                ];
                if (fmt === 'xls') {
                    const wb = toExcelTable(rows, columns, 'Daily Attendance');
                    res.setHeader('Content-Type', 'application/vnd.ms-excel');
                    res.setHeader('Content-Disposition', `attachment; filename="attendance_${targetDate}.xls"`);
                    return res.send(wb);
                }
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename="attendance_${targetDate}.csv"`);
                return res.send(toCsv(rows, columns));
            }

            res.json({
                success: true,
                date: targetDate,
                totalUsers: rows.length,
                data: rows,
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /**
     * Monthly attendance summary from replicated events.
     * GET /api/tna/attendance/monthly
     * Query: month (YYYY-MM, defaults to current), deviceId, userId
     *
     * Returns per-user summary: total days present, avg hours, total hours.
     */
    router.get('/attendance/monthly', asyncHandler(async (req, res) => {
        try {
            const {
                month,
                deviceId,
                userId,
                format: fmt = 'json',
            } = req.query;

            const targetMonth = month || new Date().toISOString().slice(0, 7);
            const [year, mon] = targetMonth.split('-').map(Number);
            const monthStart = new Date(year, mon - 1, 1);
            const monthEnd = new Date(year, mon, 0, 23, 59, 59, 999);

            const where = {
                timestamp: { gte: monthStart, lte: monthEnd },
                authResult: 'success',
            };
            if (deviceId) where.deviceId = parseInt(deviceId);
            if (userId) where.userId = { contains: userId };

            const events = await prisma.event.findMany({
                where,
                orderBy: { timestamp: 'asc' },
                select: { userId: true, timestamp: true },
            });

            // Group by userId → date → events
            const userDays = new Map();
            for (const e of events) {
                if (!e.userId) continue;
                const dateKey = e.timestamp.toISOString().slice(0, 10);
                if (!userDays.has(e.userId)) userDays.set(e.userId, new Map());
                const days = userDays.get(e.userId);
                if (!days.has(dateKey)) days.set(dateKey, []);
                days.get(dateKey).push(e.timestamp);
            }

            const rows = [];
            for (const [uid, days] of userDays) {
                let totalHours = 0;
                for (const [, timestamps] of days) {
                    const first = timestamps[0];
                    const last = timestamps[timestamps.length - 1];
                    totalHours += (last - first) / 3_600_000;
                }
                const daysPresent = days.size;
                const avgHours = daysPresent > 0 ? Math.round((totalHours / daysPresent) * 100) / 100 : 0;

                rows.push({
                    userId: uid,
                    month: targetMonth,
                    daysPresent,
                    totalHours: Math.round(totalHours * 100) / 100,
                    avgHoursPerDay: avgHours,
                });
            }

            rows.sort((a, b) => a.userId.localeCompare(b.userId));

            if (fmt === 'csv' || fmt === 'xls') {
                const columns = [
                    { header: 'User ID', value: r => r.userId },
                    { header: 'Month', value: r => r.month },
                    { header: 'Days Present', value: r => r.daysPresent },
                    { header: 'Total Hours', value: r => r.totalHours },
                    { header: 'Avg Hours/Day', value: r => r.avgHoursPerDay },
                ];
                if (fmt === 'xls') {
                    const wb = toExcelTable(rows, columns, 'Monthly Attendance');
                    res.setHeader('Content-Type', 'application/vnd.ms-excel');
                    res.setHeader('Content-Disposition', `attachment; filename="attendance_${targetMonth}.xls"`);
                    return res.send(wb);
                }
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename="attendance_${targetMonth}.csv"`);
                return res.send(toCsv(rows, columns));
            }

            res.json({
                success: true,
                month: targetMonth,
                totalUsers: rows.length,
                data: rows,
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    // ==================== DEVICE-BASED T&A ====================

    /**
     * Get T&A configuration
     * GET /api/tna/config
     */
    router.get('/config', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            try {
                const config = await services.tna.getTNAConfig(deviceId);

                res.json({
                    success: true,
                    data: config
                });
            } catch (grpcError) {
                // Handle gRPC parsing errors gracefully
                if (grpcError.message && grpcError.message.includes('parsing error')) {
                    services.logger.warn('gRPC parsing error for TNA config, returning defaults:', grpcError.message);
                    res.json({
                        success: true,
                        data: {
                            mode: 0,
                            key: 0,
                            isrequired: false,
                            schedulesList: [],
                            labelsList: ['In', 'Out', 'Break Out', 'Break In']
                        },
                        warning: 'Could not parse device config, returning defaults'
                    });
                } else {
                    throw grpcError;
                }
            }
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Set T&A configuration
     * POST /api/tna/config
     */
    router.post('/config', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get T&A logs
     * GET /api/tna/logs
     */
    router.get('/logs', asyncHandler(async (req, res) => {
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
                let connectedDevices = [];
                try {
                    connectedDevices = await services.connection.getConnectedDevices();
                } catch {
                    return res.json({
                        success: true,
                        data: [],
                        total: 0,
                        message: 'Gateway not available'
                    });
                }
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
                    services.logger.error(`Failed to get logs from device ${devId}:`, e.message);
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
    }));

    /**
     * Calculate work hours
     * GET /api/tna/work-hours
     */
    router.get('/work-hours', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Export T&A data to CSV
     * GET /api/tna/export
     */
    router.get('/export', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get attendance summary
     * GET /api/tna/summary
     */
    router.get('/summary', asyncHandler(async (req, res) => {
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
                let connectedDevices = [];
                try {
                    connectedDevices = await services.connection.getConnectedDevices();
                } catch {
                    return res.json({
                        success: true,
                        data: null,
                        message: 'Gateway not available'
                    });
                }
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
    }));

    /**
     * Set work schedule
     * POST /api/tna/schedule
     */
    router.post('/schedule', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get work schedule
     * GET /api/tna/schedule/:userId
     */
    router.get('/schedule/:userId', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Process attendance for payroll
     * POST /api/tna/payroll
     */
    router.post('/payroll', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get overtime calculations
     * GET /api/tna/overtime
     */
    router.get('/overtime', asyncHandler(async (req, res) => {
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
    }));

    return router;
};