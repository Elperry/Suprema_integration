/**
 * HR Integration Routes
 * REST API endpoints for HR system integration
 */

import express from 'express';
const router = express.Router();

export default (services) => {
    /**
     * Sync users from HR system to Suprema devices
     * POST /api/hr/users/sync
     */
    router.post('/users/sync', async (req, res) => {
        try {
            const { deviceId, users } = req.body;

            if (!deviceId || !users || !Array.isArray(users)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and users array are required'
                });
            }

            // Transform HR user data to Suprema format
            const supremaUsers = users.map(hrUser => ({
                id: hrUser.employeeId || hrUser.id,
                name: hrUser.fullName || hrUser.name,
                jobCode: hrUser.jobCode,
                department: hrUser.department,
                photo: hrUser.photo,
                settings: {
                    cardAuthMode: hrUser.authSettings?.cardMode,
                    biometricAuthMode: hrUser.authSettings?.biometricMode,
                    startTime: hrUser.workSchedule?.startTime,
                    endTime: hrUser.workSchedule?.endTime
                }
            }));

            await services.user.enrollUsers(deviceId, supremaUsers);

            res.json({
                success: true,
                message: `Successfully synced ${supremaUsers.length} users to device ${deviceId}`,
                syncedUsers: supremaUsers.length
            });

        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get attendance data for HR system
     * GET /api/hr/attendance
     */
    router.get('/attendance', async (req, res) => {
        try {
            const { 
                deviceId, 
                startDate, 
                endDate, 
                employeeIds,
                format = 'json'
            } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const filters = {
                startDate,
                endDate,
                userIds: employeeIds ? employeeIds.split(',') : null
            };

            // Add timeout to prevent indefinite hangs (15 second limit)
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Attendance data request timed out after 15 seconds')), 15000)
            );

            let attendanceData;
            try {
                attendanceData = await Promise.race([
                    services.tna.getFilteredTNALogs(deviceId, filters),
                    timeoutPromise
                ]);
            } catch (timeoutErr) {
                // Return empty data on timeout
                return res.json({
                    success: true,
                    data: [],
                    total: 0,
                    filters,
                    note: timeoutErr.message
                });
            }

            // Transform to HR-friendly format
            const hrAttendanceData = attendanceData.map(event => ({
                employeeId: event.userid,
                deviceId: event.deviceId,
                timestamp: event.timestamp,
                date: event.dateString,
                time: event.timeString,
                eventType: event.eventType,
                eventLabel: event.tnaLabel,
                rawEventId: event.id
            }));

            if (format === 'csv') {
                const csvData = services.tna.exportTNAToCSV(attendanceData);
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename=attendance.csv');
                return res.send(csvData);
            }

            res.json({
                success: true,
                data: hrAttendanceData,
                total: hrAttendanceData.length,
                filters
            });

        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Calculate work hours for employees
     * POST /api/hr/attendance/work-hours
     */
    router.post('/attendance/work-hours', async (req, res) => {
        try {
            const { deviceId, employeeIds, startDate, endDate } = req.body;

            if (!deviceId || !employeeIds || !startDate || !endDate) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId, employeeIds, startDate, and endDate are required'
                });
            }

            const workHours = await services.tna.calculateWorkHours(
                deviceId, 
                employeeIds, 
                startDate, 
                endDate
            );

            // Transform to HR-friendly format
            const hrWorkHours = {};
            Object.keys(workHours).forEach(employeeId => {
                const data = workHours[employeeId];
                hrWorkHours[employeeId] = {
                    employeeId,
                    period: { startDate, endDate },
                    summary: {
                        totalWorkHours: Math.round(data.totalWorkHours * 100) / 100,
                        totalBreakHours: Math.round(data.totalBreakHours * 100) / 100,
                        totalOvertimeHours: Math.round(data.totalOvertimeHours * 100) / 100
                    },
                    dailyBreakdown: data.dailyHours,
                    sessions: data.sessions
                };
            });

            res.json({
                success: true,
                data: hrWorkHours,
                calculatedFor: employeeIds.length,
                period: { startDate, endDate }
            });

        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get access events for HR system
     * GET /api/hr/access-events
     */
    router.get('/access-events', async (req, res) => {
        try {
            const { 
                deviceId, 
                startDate, 
                endDate, 
                employeeIds,
                eventType = 'all'
            } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const filters = {
                startDate,
                endDate,
                userIds: employeeIds ? employeeIds.split(',') : null
            };

            // Get relevant event codes based on eventType
            let eventCodes = [];
            switch (eventType) {
                case 'success':
                    eventCodes = [0x1000, 0x1100]; // Auth success, Identify success
                    break;
                case 'failure':
                    eventCodes = [0x1001, 0x1101]; // Auth fail, Identify fail
                    break;
                case 'door':
                    eventCodes = [0x2000, 0x2001, 0x2002, 0x2003]; // Door events
                    break;
                default:
                    // All authentication and door events
                    eventCodes = [0x1000, 0x1001, 0x1100, 0x1101, 0x2000, 0x2001, 0x2002, 0x2003];
            }

            filters.eventCodes = eventCodes;
            
            // Add timeout to prevent indefinite hangs (15 second limit)
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Access events request timed out after 15 seconds')), 15000)
            );

            let events;
            try {
                events = await Promise.race([
                    services.event.getFilteredEventLogs(deviceId, filters),
                    timeoutPromise
                ]);
            } catch (timeoutErr) {
                return res.json({
                    success: true,
                    data: [],
                    total: 0,
                    filters,
                    note: timeoutErr.message
                });
            }

            // Transform to HR-friendly format
            const hrAccessEvents = events.map(event => ({
                employeeId: event.userid,
                deviceId: event.deviceid,
                timestamp: event.timestamp,
                eventType: event.eventType,
                eventDescription: event.description,
                accessGranted: [0x1000, 0x1100].includes(event.eventcode),
                doorAction: event.eventcode >= 0x2000 && event.eventcode < 0x3000 ? 
                    event.description : null,
                rawEventId: event.id
            }));

            res.json({
                success: true,
                data: hrAccessEvents,
                total: hrAccessEvents.length,
                filters
            });

        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get employee biometric enrollment status
     * GET /api/hr/employees/:employeeId/biometric-status
     */
    router.get('/employees/:employeeId/biometric-status', async (req, res) => {
        try {
            const { employeeId } = req.params;
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const users = await services.user.getUsers(deviceId, [employeeId]);
            
            if (users.length === 0) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: `Employee ${employeeId} not found on device ${deviceId}`
                });
            }

            const user = users[0];
            const biometricStatus = {
                employeeId,
                deviceId,
                enrolled: true,
                biometrics: {
                    fingerprint: {
                        enrolled: user.hdr.numoffinger > 0,
                        count: user.hdr.numoffinger || 0
                    },
                    card: {
                        enrolled: user.hdr.numofcard > 0,
                        count: user.hdr.numofcard || 0
                    },
                    face: {
                        enrolled: user.hdr.numofface > 0,
                        count: user.hdr.numofface || 0
                    }
                },
                profile: {
                    name: user.name || null,
                    jobCode: user.jobcode || null,
                    department: user.department || null
                },
                lastUpdated: new Date().toISOString()
            };

            res.json({
                success: true,
                data: biometricStatus
            });

        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Helper function to wrap async operations with timeout
     * @param {Promise} promise - The promise to wrap
     * @param {number} timeoutMs - Timeout in milliseconds
     * @param {string} operation - Description of the operation (for error message)
     * @returns {Promise} The result or timeout error
     */
    const withTimeout = (promise, timeoutMs, operation) => {
        return Promise.race([
            promise,
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error(`${operation} timed out after ${timeoutMs}ms`)), timeoutMs)
            )
        ]);
    };

    /**
     * Bulk enroll employee biometrics
     * POST /api/hr/employees/biometric-enrollment
     */
    router.post('/employees/biometric-enrollment', async (req, res) => {
        try {
            const { deviceId, enrollments } = req.body;
            const timeout = req.body.timeout || 30000; // Default 30 second timeout per enrollment

            if (!deviceId || !enrollments || !Array.isArray(enrollments)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and enrollments array are required'
                });
            }

            const results = {
                successful: [],
                failed: []
            };

            for (const enrollment of enrollments) {
                try {
                    const { employeeId, biometricType, data } = enrollment;

                    let enrollmentPromise;
                    switch (biometricType) {
                        case 'fingerprint':
                            enrollmentPromise = services.user.setUserFingerprints(deviceId, [{
                                userId: employeeId,
                                templates: data.templates,
                                fingerIndex: data.fingerIndex || 0
                            }]);
                            break;

                        case 'card':
                            enrollmentPromise = services.user.setUserCards(deviceId, [{
                                userId: employeeId,
                                cardData: data.cardData,
                                cardIndex: data.cardIndex || 0
                            }]);
                            break;

                        case 'face':
                            enrollmentPromise = services.user.setUserFaces(deviceId, [{
                                userId: employeeId,
                                faceData: data.faceData,
                                faceIndex: data.faceIndex || 0
                            }]);
                            break;

                        default:
                            throw new Error(`Unsupported biometric type: ${biometricType}`);
                    }

                    // Wrap with timeout
                    await withTimeout(
                        enrollmentPromise, 
                        timeout, 
                        `${biometricType} enrollment for ${employeeId}`
                    );

                    results.successful.push({
                        employeeId,
                        biometricType,
                        status: 'enrolled'
                    });

                } catch (error) {
                    results.failed.push({
                        employeeId: enrollment.employeeId,
                        biometricType: enrollment.biometricType,
                        error: error.message
                    });
                }
            }

            res.json({
                success: true,
                message: `Processed ${enrollments.length} biometric enrollments`,
                results
            });

        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get system status for HR dashboard
     * GET /api/hr/system-status
     */
    router.get('/system-status', async (req, res) => {
        try {
            let devices = [];
            let connectionStats = { gatewayConnected: false, connectedDeviceCount: 0 };
            let eventStatus = { isMonitoring: false, monitoredDevices: [] };

            // Safely get connection info
            try {
                devices = await services.connection.getConnectedDevices();
                connectionStats = services.connection.getConnectionStats();
            } catch (connErr) {
                console.warn('Failed to get connection info:', connErr.message);
            }

            // Safely get event status
            try {
                eventStatus = services.event.getMonitoringStatus();
            } catch (eventErr) {
                console.warn('Failed to get event status:', eventErr.message);
            }

            const systemStatus = {
                overall: connectionStats.gatewayConnected ? 'healthy' : 'degraded',
                timestamp: new Date().toISOString(),
                gateway: {
                    connected: connectionStats.gatewayConnected,
                    address: `${process.env.GATEWAY_IP || 'N/A'}:${process.env.GATEWAY_PORT || 'N/A'}`
                },
                devices: {
                    total: devices.length,
                    connected: connectionStats.connectedDeviceCount,
                    list: devices.map(device => ({
                        id: device.id || device.deviceid,
                        ip: device.ipaddr,
                        port: device.port,
                        status: device.status || 'connected'
                    }))
                },
                monitoring: {
                    enabled: eventStatus.isMonitoring,
                    monitoredDevices: eventStatus.monitoredDevices?.length || 0
                },
                services: {
                    connection: !!services.connection,
                    user: !!services.user,
                    event: !!services.event,
                    door: !!services.door,
                    tna: !!services.tna,
                    biometric: !!services.biometric
                }
            };

            res.json({
                success: true,
                data: systemStatus
            });

        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Webhook endpoint for HR system notifications
     * POST /api/hr/webhook
     */
    router.post('/webhook', async (req, res) => {
        try {
            const { type, data } = req.body;

            switch (type) {
                case 'employee_created':
                    // Handle new employee creation
                    break;

                case 'employee_updated':
                    // Handle employee profile updates
                    break;

                case 'employee_terminated':
                    // Handle employee termination
                    if (data.deviceIds && data.employeeId) {
                        for (const deviceId of data.deviceIds) {
                            await services.user.deleteUsers(deviceId, [data.employeeId]);
                        }
                    }
                    break;

                case 'schedule_updated':
                    // Handle work schedule updates
                    break;

                default:
                    return res.status(400).json({
                        error: 'Bad Request',
                        message: `Unsupported webhook type: ${type}`
                    });
            }

            res.json({
                success: true,
                message: `Webhook ${type} processed successfully`
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