/**
 * Event Management Routes
 * REST API endpoints for event monitoring and log management
 */

import express from 'express';
import { extractUserIdFromEvent, resolveSupremaDeviceId } from '../utils/deviceResolver.js';
import { toCsv, toExcelTable } from '../utils/csv.js';
import { asyncHandler } from '../core/errors/index.js';

const router = express.Router();

export default (services) => {
    const audit = services.audit;
    /**
     * Helper function to get Suprema device ID from database ID
     */
    const getSupremaDeviceId = (dbDeviceId) => resolveSupremaDeviceId(dbDeviceId, services.connection);

    const buildDbEventWhere = (query, options = {}) => {
        const { includeStoredEventType = false } = options;
        const where = {};

        if (query.deviceId) {
            where.deviceId = parseInt(query.deviceId);
        }
        if (includeStoredEventType && query.eventType) {
            where.eventType = query.eventType;
        }
        if (query.exactUserId) {
            where.userId = String(query.exactUserId);
        } else if (query.userId) {
            where.userId = { contains: query.userId };
        }
        if (query.authResult) {
            where.authResult = query.authResult;
        }
        if (query.doorId) {
            where.doorId = parseInt(query.doorId);
        }
        if (query.startDate) {
            where.timestamp = { ...where.timestamp, gte: new Date(query.startDate) };
        }
        if (query.endDate) {
            where.timestamp = { ...where.timestamp, lte: new Date(query.endDate) };
        }
        if (query.description) {
            where.description = { contains: query.description };
        }
        if (query.eventCode) {
            const raw = String(query.eventCode).trim();
            const code = raw.startsWith('0x') || raw.startsWith('0X')
                ? parseInt(raw, 16)
                : parseInt(raw, 10);
            if (!isNaN(code)) where.eventCode = code;
        }

        return where;
    };

    const getDbEventCode = (event) => Number(event?.eventCode ?? event?.rawData?.eventcode ?? event?.rawData?.eventCode ?? 0);
    const getDbEventSubCode = (event) => Number(event?.subType ?? event?.rawData?.subcode ?? event?.rawData?.subCode ?? 0);
    const getDbEventTnaKey = (event) => Number(event?.rawData?.tnakey ?? event?.rawData?.tnaKey ?? 0);

    const isValidPersistedTnaEvent = (event) => {
        const storedEventType = String(event?.eventType || '');
        // Accept any access event: plain auth or T&A-keyed attendance
        if (storedEventType === 'authentication' || storedEventType === 'attendance' || storedEventType.startsWith('tna_key_')) {
            return true;
        }
        return false;
    };

    const serializeDbEvent = (event) => ({
        ...event,
        supremaEventId: event.supremaEventId.toString()
    });

    const runBackgroundEventSync = async ({ req, res, processType, description, source, deviceIds = null, fromStart = false }) => {
        const ps = services.processService;
        const eventReplication = services.eventReplication;

        if (!ps) {
            return res.status(503).json({ error: 'ProcessService unavailable', message: 'Restart the server and try again.' });
        }

        if (!eventReplication || typeof eventReplication.syncAllNow !== 'function') {
            return res.status(503).json({ error: 'EventReplication unavailable', message: 'Restart the server and try again.' });
        }

        const prisma = services.database.getPrisma();
        let devices = await prisma.device.findMany({ where: { isActive: true } });

        if (Array.isArray(deviceIds) && deviceIds.length > 0) {
            const wanted = new Set(deviceIds.map((id) => String(id)));
            devices = devices.filter((device) => wanted.has(String(device.id)));
        }

        const processId = ps.create(processType, {
            description,
            deviceCount: devices.length,
        });
        ps.update(processId, { total: devices.length });

        res.json({
            success: true,
            background: true,
            processId,
            message: `Event sync started for ${devices.length} device(s). Track progress at /processes/${processId}`,
        });

        setImmediate(async () => {
            try {
                ps.update(processId, { status: 'running' });
                ps.log(processId, 'Delegating event sync to EventReplicationService…');

                const results = await eventReplication.syncAllNow({ deviceIds: devices.map((device) => device.id), source, fromStart });

                for (const result of results) {
                    if (ps.isCancelled(processId)) {
                        ps.log(processId, 'Cancelled by user', 'warning');
                        break;
                    }

                    ps.addResult(processId, result);

                    if (result.success) {
                        ps.log(processId, `${result.deviceName || result.deviceId}: synced ${result.synced} event(s)`);
                    } else {
                        ps.log(processId, `${result.deviceName || result.deviceId}: ${result.error || 'sync failed'}`, 'warning');
                    }
                }

                const successfulResults = results.filter((result) => result.success);
                const totalSynced = successfulResults.reduce((sum, result) => sum + (result.synced || 0), 0);

                ps.update(processId, {
                    status: ps.isCancelled(processId) ? 'cancelled' : 'completed',
                    progress: successfulResults.length,
                });
                ps.log(processId, `Event sync done — ${totalSynced} event(s) persisted across ${successfulResults.length}/${results.length} devices`);
            } catch (error) {
                services.logger.error('[API] background event sync error:', { processType, error: error.message });
                ps.update(processId, { status: 'failed' });
                ps.log(processId, `Fatal error: ${error.message}`, 'error');
            }
        });
    };

    const normalizeDbEvent = (event) => {
        const eventCode = getDbEventCode(event);
        const subCode = getDbEventSubCode(event);
        const storedEventType = String(event?.eventType || '');

        const isPersistedTna = storedEventType === 'attendance' || storedEventType.startsWith('tna_key_');
        const isPersistedAuth = storedEventType === 'authentication';

        // Trust the stored eventType for authentication/attendance rows.
        // For any old rows with an unexpected type, reclassify from the event code.
        const eventType = isPersistedTna
            ? 'attendance'
            : isPersistedAuth
            ? 'authentication'
            : (typeof services.event?.classifyEventType === 'function'
                ? services.event.classifyEventType(eventCode)
                : event.eventType);

        const description = typeof services.event?.getEventDescription === 'function'
            ? services.event.getEventDescription(eventCode, subCode)
            : event.description;

        return {
            ...serializeDbEvent(event),
            eventType,
            description,
        };
    };

    /**
     * Subscribe to real-time events
     * POST /api/events/subscribe
     */
    router.post('/subscribe', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Unsubscribe from events
     * POST /api/events/unsubscribe
     */
    router.post('/unsubscribe', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get synced events from database (all devices)
     * GET /api/events/db
     * Query: page, pageSize, deviceId, eventType, userId, authResult, startDate, endDate
     */
    router.get('/db', asyncHandler(async (req, res) => {
        try {
            const { 
                page = 1, 
                pageSize = 50,
                deviceId,
                eventType,
                exactUserId,
                userId,
                userName,
                authResult,
                doorId,
                startDate,
                endDate,
                description,
                eventCode,
            } = req.query;

            const prisma = services.database.getPrisma();
            const where = buildDbEventWhere({ deviceId, eventType, exactUserId, userId, authResult, doorId, startDate, endDate, description, eventCode }, { includeStoredEventType: true });
            const pageNumber = parseInt(page);
            const pageSizeNumber = parseInt(pageSize);

            // If a userName filter is provided, resolve it to matching User.id values.
            // event.userId stores User.id (local DB PK) as a string.
            if (userName && userName.trim()) {
                const matchingUsers = await prisma.user.findMany({
                    where: { OR: [
                        { name: { contains: userName.trim() } },
                        { full_name: { contains: userName.trim() } },
                    ]},
                    select: { id: true }
                });
                if (matchingUsers.length === 0) {
                    return res.json({
                        success: true,
                        data: [],
                        pagination: { page: pageNumber, pageSize: pageSizeNumber, totalEvents: 0, totalPages: 0 }
                    });
                }
                where.userId = { in: matchingUsers.map(u => String(u.id)) };
            }

            const [totalEvents, rawEvents] = await Promise.all([
                prisma.event.count({ where }),
                prisma.event.findMany({
                    where,
                    orderBy: { timestamp: 'desc' },
                    skip: (pageNumber - 1) * pageSizeNumber,
                    take: pageSizeNumber,
                })
            ]);

            const paginatedEvents = rawEvents.map((event) => normalizeDbEvent(event));

            // Enrich events with user name and device context for UI consumers.
            // event.userId = User.id (local DB PK), set as the Suprema device user ID at enrolment time.
            const uniqueUserIds = [...new Set(paginatedEvents.map(e => e.userId).filter(id => id && /^\d+$/.test(id)))];
            const uniqueDeviceIds = [...new Set(paginatedEvents.map((event) => event.deviceId).filter((id) => Number.isInteger(id)))];
            const userNameMap = {};
            const deviceMap = {};
            if (uniqueUserIds.length > 0) {
                const users = await prisma.user.findMany({
                    where: { id: { in: uniqueUserIds.map(id => parseInt(id)) } },
                    select: { id: true, name: true, full_name: true }
                });
                users.forEach(u => {
                    userNameMap[String(u.id)] = u.full_name || u.name || null;
                });
            }
            if (uniqueDeviceIds.length > 0) {
                const devices = await prisma.device.findMany({
                    where: { id: { in: uniqueDeviceIds } },
                    select: { id: true, name: true, loc: true }
                });
                devices.forEach((device) => {
                    deviceMap[device.id] = {
                        name: device.name || null,
                        location: device.loc || null,
                    };
                });
            }

            // Convert BigInt to string for JSON serialization
            const serializedEvents = paginatedEvents.map((event) => ({
                ...event,
                userName: userNameMap[event.userId] || null,
                deviceName: deviceMap[event.deviceId]?.name || null,
                deviceLocation: deviceMap[event.deviceId]?.location || null,
            }));

            res.json({
                success: true,
                data: serializedEvents,
                pagination: {
                    page: pageNumber,
                    pageSize: pageSizeNumber,
                    totalEvents,
                    totalPages: Math.ceil(totalEvents / pageSizeNumber)
                }
            });
        } catch (error) {
            services.logger.error('Error getting events from DB:', { error: error.message });
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Export synced events from the database.
     * GET /api/events/db/export
     */
    router.get('/db/export', asyncHandler(async (req, res) => {
        try {
            const {
                format = 'csv',
                limit = 10000,
                deviceId,
                eventType,
                exactUserId,
                userId,
                authResult,
                doorId,
                startDate,
                endDate
            } = req.query;

            const prisma = services.database.getPrisma();
            const where = buildDbEventWhere({ deviceId, eventType, exactUserId, userId, authResult, doorId, startDate, endDate }, { includeStoredEventType: true });
            const events = await prisma.event.findMany({
                where,
                orderBy: { timestamp: 'desc' }
            });
            const serializedEvents = events
                .map((event) => normalizeDbEvent(event))
                .slice(0, parseInt(limit));

            if (format === 'json') {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', `attachment; filename="synced_events_${Date.now()}.json"`);
                return res.json({
                    success: true,
                    exportedAt: new Date().toISOString(),
                    count: serializedEvents.length,
                    filters: { deviceId, eventType, userId, authResult, doorId, startDate, endDate },
                    data: serializedEvents
                });
            }

            const columns = [
                { header: 'ID', value: (row) => row.id },
                { header: 'Database Device ID', value: (row) => row.deviceId },
                { header: 'Suprema Event ID', value: (row) => row.supremaEventId },
                { header: 'Event Code', value: (row) => row.eventCode },
                { header: 'Event Type', value: (row) => row.eventType },
                { header: 'Sub Type', value: (row) => row.subType },
                { header: 'User ID', value: (row) => row.userId },
                { header: 'Door ID', value: (row) => row.doorId },
                { header: 'Description', value: (row) => row.description },
                { header: 'Auth Result', value: (row) => row.authResult },
                { header: 'Timestamp', value: (row) => row.timestamp },
                { header: 'Synced At', value: (row) => row.syncedAt }
            ];

            if (format === 'xls') {
                const workbook = toExcelTable(serializedEvents, columns, 'Synced Events');
                res.setHeader('Content-Type', 'application/vnd.ms-excel');
                res.setHeader('Content-Disposition', `attachment; filename="synced_events_${Date.now()}.xls"`);
                return res.send(workbook);
            }

            const csvData = toCsv(serializedEvents, columns);

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="synced_events_${Date.now()}.csv"`);

            audit?.log({ action: 'export-synced-events', category: 'export', details: { format, count: serializedEvents.length }, ipAddress: req.ip, requestId: req.requestId });
            res.send(csvData);
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get event logs
     * GET /api/events/logs
     */
    router.get('/logs', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get event statistics
     * GET /api/events/statistics
     */
    router.get('/statistics', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get replication health and lag status
     * GET /api/events/replication/health
     * Query: deviceId
     */
    router.get('/replication/health', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.query;
            const health = await services.eventReplication.getHealthStatus({ deviceId });

            res.json({
                success: true,
                data: health
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get supported event codes
     * GET /api/events/codes
     */
    router.get('/codes', asyncHandler(async (req, res) => {
        try {
            // Return monitoring status which includes event code info
            const status = services.event.getMonitoringStatus();
            
            // Return common event code categories
            const eventCodes = {
                authentication: { code: 0x1000, description: 'Authentication events' },
                attendance: { code: 0x1000, description: 'Authentication events with TNAKey > 0' },
                user: { code: 0x2000, description: 'User management events' },
                system: { code: 0x3000, description: 'System/device events' },
                door: { code: 0x5000, description: 'Door events' },
                zone: { code: 0x6000, description: 'Zone events' },
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
    }));

    /**
     * Export event logs
     * GET /api/events/export
     */
    router.get('/export', asyncHandler(async (req, res) => {
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
                const headers = Array.from(new Set(events.flatMap((event) => Object.keys(event))));
                const csvData = toCsv(events, headers.map((header) => ({
                    header,
                    value: (row) => row[header]
                })));

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
    }));

    /**
     * Get real-time event count
     * GET /api/events/count
     */
    router.get('/count', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get event log from device
     * GET /api/events/device-log/:deviceId
     * Query: startEventId, maxNumOfLog
     */
    router.get('/device-log/:deviceId', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get filtered event log from device
     * POST /api/events/device-log/:deviceId/filtered
     * Body: { startEventId, maxNumOfLog, filter: {...} }
     */
    router.post('/device-log/:deviceId/filtered', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get image event log from device
     * GET /api/events/image-log/:deviceId
     * Query: startEventId, maxNumOfLog
     */
    router.get('/image-log/:deviceId', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Get historical events with pagination and filters
     * GET /api/events/historical/:deviceId
     * Query: page, pageSize, startEventId, eventType, userId, doorId, startDate, endDate
     */
    router.get('/historical/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { 
                page = 1, 
                pageSize = 50, 
                startEventId = 0,
                eventType,
                userId,
                doorId,
                startDate,
                endDate,
                eventCodes
            } = req.query;

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            
            const filters = {};
            if (eventType) filters.eventType = eventType;
            if (userId) filters.userId = userId;
            if (doorId) filters.doorId = doorId;
            if (startDate) filters.startDate = startDate;
            if (endDate) filters.endDate = endDate;
            if (eventCodes) filters.eventCodes = eventCodes.split(',');

            const result = await services.event.getHistoricalEvents(supremaDeviceId, {
                page: parseInt(page),
                pageSize: parseInt(pageSize),
                startEventId: parseInt(startEventId),
                filters: Object.keys(filters).length > 0 ? filters : null
            });

            res.json({
                success: true,
                data: result.events,
                pagination: result.pagination
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get authentication events (login/access attempts)
     * GET /api/events/authentication/:deviceId
     * Query: maxEvents, authResult (success/fail)
     */
    router.get('/authentication/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { maxEvents = 100, authResult } = req.query;

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            let events = await services.event.getAuthenticationEvents(
                supremaDeviceId, 
                parseInt(maxEvents)
            );

            // Filter by auth result if specified
            if (authResult === 'success') {
                const successCodes = [0x1000, 0x1100];
                events = events.filter(e => successCodes.includes(e.eventcode));
            } else if (authResult === 'fail') {
                const failCodes = [0x1001, 0x1101];
                events = events.filter(e => failCodes.includes(e.eventcode));
            }

            res.json({
                success: true,
                data: events,
                total: events.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get door events
     * GET /api/events/door/:deviceId
     * Query: doorId, maxEvents
     */
    router.get('/door/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { doorId, maxEvents = 100 } = req.query;

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const events = await services.event.getDoorEvents(
                supremaDeviceId,
                doorId ? parseInt(doorId) : null,
                parseInt(maxEvents)
            );

            res.json({
                success: true,
                data: events,
                total: events.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get events for a specific user
     * GET /api/events/user/:deviceId/:userId
     * Query: maxEvents
     */
    router.get('/user/:deviceId/:userId', asyncHandler(async (req, res) => {
        try {
            const { deviceId, userId } = req.params;
            const { maxEvents = 500 } = req.query;

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const events = await services.event.getEventsByUser(
                supremaDeviceId,
                userId,
                parseInt(maxEvents)
            );

            res.json({
                success: true,
                data: events,
                total: events.length,
                userId: userId
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Advanced event search with multiple filters
     * POST /api/events/search/:deviceId
     * Body: { filters: {...}, pagination: {...} }
     */
    router.post('/search/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { 
                filters = {}, 
                page = 1, 
                pageSize = 50,
                startEventId = 0,
                maxEvents = 1000
            } = req.body;

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            
            const events = await services.event.getFilteredEventLogs(supremaDeviceId, {
                startEventId: parseInt(startEventId),
                maxEvents: parseInt(maxEvents),
                ...filters
            });

            // Apply pagination
            const totalEvents = events.length;
            const totalPages = Math.ceil(totalEvents / pageSize);
            const startIndex = (page - 1) * pageSize;
            const paginatedEvents = events.slice(startIndex, startIndex + pageSize);

            res.json({
                success: true,
                data: paginatedEvents,
                pagination: {
                    page,
                    pageSize,
                    totalEvents,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
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
     * Enable event monitoring on device
     * POST /api/events/monitoring/:deviceId/enable
     */
    router.post('/monitoring/:deviceId/enable', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Disable event monitoring on device
     * POST /api/events/monitoring/:deviceId/disable
     */
    router.post('/monitoring/:deviceId/disable', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Enable monitoring on multiple devices
     * POST /api/events/monitoring/enable-multi
     * Body: { deviceIds: [] }
     */
    router.post('/monitoring/enable-multi', asyncHandler(async (req, res) => {
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
    }));

    /**
     * Subscribe to real-time event stream
     * POST /api/events/stream/subscribe
     * Body: { queueSize }
     */
    router.post('/stream/subscribe', asyncHandler(async (req, res) => {
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
    }));

    /**
        * Sync events from device to database using the managed replication cursor
     * POST /api/events/sync/:deviceId
     */
    router.post('/sync/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            // fullResync (alias fromStart) re-pulls the device's entire event history
            // from event ID 0, not just events newer than the replication cursor.
            const fromStart = req.body?.fullResync === true || req.body?.fromStart === true
                || req.query?.fullResync === 'true' || req.query?.fromStart === 'true';
            const result = await services.eventReplication.syncDeviceNow(parseInt(deviceId), { source: 'manual', fromStart });

            if (!result.success) {
                const statusCode = result.error === 'Device not found' ? 404 : 409;
                return res.status(statusCode).json({
                    success: false,
                    message: result.error,
                    data: result,
                });
            }
            
            res.json({
                success: true,
                message: 'Events synced to database',
                synced: result.synced,
                lastEventId: result.lastEventId,
                deviceId: result.deviceId,
                supremaDeviceId: result.supremaId,
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
        * Sync events from all devices into the local database using the managed replication cursor
     * POST /api/events/sync-all
     */
    router.post('/sync-all', asyncHandler(async (req, res) => {
        const fromStart = req.body?.fullResync === true || req.body?.fromStart === true
            || req.query?.fullResync === 'true' || req.query?.fromStart === 'true';
        await runBackgroundEventSync({
            req,
            res,
            processType: 'event-sync-all',
            description: fromStart
                ? 'Full resync of ALL events from all devices -> database'
                : 'Sync events from all devices -> database',
            source: 'manual',
            fromStart,
        });
    }));

    /**
     * Get event replication status for device
     * GET /api/events/sync-status/:deviceId
     */
    router.get('/sync-status/:deviceId', asyncHandler(async (req, res) => {
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
                    lastReplicatedEventId: device.last_replicated_event_id,
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
    }));

    /**
     * Server-Sent Events (SSE) real-time event stream
     * GET /api/events/stream
     * 
     * Streams new events as they are persisted by the EventReplicationService.
     * Clients connect via EventSource and receive 'event' messages with JSON data.
     */
    const sseClients = new Set();

    router.get('/stream', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no',
        });
        res.write(':ok\n\n');

        const client = { res };
        sseClients.add(client);

        // Keep-alive every 30s
        const keepAlive = setInterval(() => {
            res.write(':ping\n\n');
        }, 30000);

        req.on('close', () => {
            clearInterval(keepAlive);
            sseClients.delete(client);
        });
    });

    // Hook into EventReplicationService real-time events to broadcast to SSE clients
    if (services.event && typeof services.event.on === 'function') {
        services.event.on('event:received', (rawEvent) => {
            if (sseClients.size === 0) return;
            const data = JSON.stringify({
                deviceId: rawEvent.deviceid ?? rawEvent.deviceId ?? null,
                eventType: rawEvent.eventType ?? 'other',
                userId: rawEvent.userid ?? rawEvent.userId ?? null,
                doorId: rawEvent.doorid ?? rawEvent.doorId ?? null,
                description: rawEvent.description ?? null,
                authResult: rawEvent.authResult ?? null,
                eventCode: rawEvent.eventcode ?? rawEvent.eventCode ?? 0,
                timestamp: rawEvent.timestamp ?? new Date().toISOString(),
            });
            for (const client of sseClients) {
                try {
                    client.res.write(`event: event\ndata: ${data}\n\n`);
                } catch {
                    sseClients.delete(client);
                }
            }
        });
    }

    // Also poll DB for new events and broadcast (fallback when realtime is not enabled)
    let lastBroadcastId = 0;
    const pollNewEvents = async () => {
        if (sseClients.size === 0) return;
        try {
            const prisma = services.database.getPrisma();
            const newEvents = await prisma.event.findMany({
                where: { id: { gt: lastBroadcastId } },
                orderBy: { id: 'asc' },
                take: 50,
            });
            for (const evt of newEvents) {
                const data = JSON.stringify({
                    ...evt,
                    supremaEventId: evt.supremaEventId?.toString(),
                });
                for (const client of sseClients) {
                    try {
                        client.res.write(`event: event\ndata: ${data}\n\n`);
                    } catch {
                        sseClients.delete(client);
                    }
                }
                if (evt.id > lastBroadcastId) lastBroadcastId = evt.id;
            }
        } catch {}
    };
    setInterval(pollNewEvents, 5000);

    /**
     * Get event details by ID
     * GET /api/events/:eventId
     */
    router.get('/:eventId', asyncHandler(async (req, res) => {
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
            const events = await services.event.getEventLogs(supremaDeviceId, parseInt(eventId), 1);
            const event = events.find((entry) => entry.id === parseInt(eventId) || entry.eventid === parseInt(eventId));

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
    }));

    return router;
};