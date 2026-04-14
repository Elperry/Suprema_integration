/**
 * Access Control & Operational Reports Routes
 * Provides query-based report endpoints for users, cards, devices, events, and enrollments.
 */

import express from 'express';
import { toCsv, toExcelTable } from '../utils/csv.js';
import { asyncHandler } from '../core/errors/index.js';

const router = express.Router();

export default (services) => {
    const prisma = () => services.database.getPrisma();
    const audit = services.audit;

    /* ─── helpers ──────────────────────────────────────────────────────── */

    const sendReport = (res, rows, columns, title, format, req) => {
        audit?.log({ action: `export-report-${title}`, category: 'export', details: { format, count: rows.length }, ipAddress: req.ip, requestId: req.requestId });
        if (format === 'json') {
            res.setHeader('Content-Disposition', `attachment; filename="${title}_${Date.now()}.json"`);
            return res.json({ success: true, exportedAt: new Date().toISOString(), count: rows.length, data: rows });
        }
        if (format === 'xls') {
            const html = toExcelTable(rows, columns, title);
            res.setHeader('Content-Type', 'application/vnd.ms-excel');
            res.setHeader('Content-Disposition', `attachment; filename="${title}_${Date.now()}.xls"`);
            return res.send(html);
        }
        const csv = toCsv(rows, columns);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="${title}_${Date.now()}.csv"`);
        return res.send(csv);
    };

    const cols = (defs) => defs.map(([header, fn]) => ({ header, value: fn }));

    /* ─── 1. User detail report ───────────────────────────────────────── */

    router.get('/users', asyncHandler(async (req, res) => {
        try {
            const { format, deviceId } = req.query;
            const db = prisma();

            const where = {};
            if (deviceId) where.deviceId = parseInt(deviceId);

            const enrollments = await db.deviceEnrollment.findMany({
                where,
                include: { cardAssignment: true, device: true },
                orderBy: { enrolledAt: 'desc' },
            });

            const rows = enrollments.map(e => ({
                employeeId: e.cardAssignment.employeeId,
                employeeName: e.cardAssignment.employeeName,
                deviceUserId: e.deviceUserId,
                deviceName: e.device?.name || `Device ${e.deviceId}`,
                deviceIp: e.device?.ip,
                cardType: e.cardAssignment.cardType,
                cardStatus: e.cardAssignment.status,
                enrollmentStatus: e.status,
                enrolledAt: e.enrolledAt,
                lastSyncAt: e.lastSyncAt,
            }));

            if (format) {
                return sendReport(res, rows, cols([
                    ['Employee ID', r => r.employeeId],
                    ['Employee Name', r => r.employeeName],
                    ['Device User ID', r => r.deviceUserId],
                    ['Device', r => r.deviceName],
                    ['Device IP', r => r.deviceIp],
                    ['Card Type', r => r.cardType],
                    ['Card Status', r => r.cardStatus],
                    ['Enrollment Status', r => r.enrollmentStatus],
                    ['Enrolled At', r => r.enrolledAt],
                    ['Last Sync', r => r.lastSyncAt],
                ]), 'user_detail_report', format, req);
            }

            res.json({ success: true, data: rows, total: rows.length });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /* ─── 2. Users in device report ───────────────────────────────────── */

    router.get('/users-in-device', asyncHandler(async (req, res) => {
        try {
            const { deviceId, format } = req.query;
            const db = prisma();

            if (!deviceId) {
                return res.status(400).json({ error: 'Bad Request', message: 'deviceId is required' });
            }

            const enrollments = await db.deviceEnrollment.findMany({
                where: { deviceId: parseInt(deviceId), status: 'active' },
                include: { cardAssignment: true, device: true },
                orderBy: { enrolledAt: 'desc' },
            });

            const rows = enrollments.map(e => ({
                deviceUserId: e.deviceUserId,
                employeeId: e.cardAssignment.employeeId,
                employeeName: e.cardAssignment.employeeName,
                cardType: e.cardAssignment.cardType,
                cardStatus: e.cardAssignment.status,
                enrolledAt: e.enrolledAt,
                lastSyncAt: e.lastSyncAt,
            }));

            if (format) {
                return sendReport(res, rows, cols([
                    ['Device User ID', r => r.deviceUserId],
                    ['Employee ID', r => r.employeeId],
                    ['Employee Name', r => r.employeeName],
                    ['Card Type', r => r.cardType],
                    ['Card Status', r => r.cardStatus],
                    ['Enrolled At', r => r.enrolledAt],
                    ['Last Sync', r => r.lastSyncAt],
                ]), 'users_in_device', format, req);
            }

            res.json({ success: true, deviceId: parseInt(deviceId), data: rows, total: rows.length });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /* ─── 3. Users without credential report ──────────────────────────── */

    router.get('/users-without-credential', asyncHandler(async (req, res) => {
        try {
            const { format } = req.query;
            const db = prisma();

            // Card assignments with no active enrollment
            const allCards = await db.cardAssignment.findMany({
                where: { status: 'active' },
                include: { enrollments: { where: { status: 'active' } } },
            });

            const noEnrollment = allCards.filter(c => c.enrollments.length === 0);
            const rows = noEnrollment.map(c => ({
                employeeId: c.employeeId,
                employeeName: c.employeeName,
                cardType: c.cardType,
                cardStatus: c.status,
                assignedAt: c.assignedAt,
                notes: c.notes,
            }));

            if (format) {
                return sendReport(res, rows, cols([
                    ['Employee ID', r => r.employeeId],
                    ['Employee Name', r => r.employeeName],
                    ['Card Type', r => r.cardType],
                    ['Card Status', r => r.cardStatus],
                    ['Assigned At', r => r.assignedAt],
                    ['Notes', r => r.notes],
                ]), 'users_without_credential', format, req);
            }

            res.json({ success: true, data: rows, total: rows.length });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /* ─── 4. All cards report ─────────────────────────────────────────── */

    router.get('/cards', asyncHandler(async (req, res) => {
        try {
            const { status, format } = req.query;
            const db = prisma();

            const where = {};
            if (status) where.status = status;

            const cards = await db.cardAssignment.findMany({
                where,
                include: { enrollments: { include: { device: true } } },
                orderBy: { assignedAt: 'desc' },
            });

            const rows = cards.map(c => ({
                id: c.id,
                employeeId: c.employeeId,
                employeeName: c.employeeName,
                cardType: c.cardType,
                cardData: c.cardData.substring(0, 16) + '...', // truncate for display
                status: c.status,
                assignedAt: c.assignedAt,
                revokedAt: c.revokedAt,
                enrolledDevices: c.enrollments.filter(e => e.status === 'active').map(e => e.device?.name || `Device ${e.deviceId}`).join(', '),
                enrollmentCount: c.enrollments.filter(e => e.status === 'active').length,
            }));

            if (format) {
                return sendReport(res, rows, cols([
                    ['ID', r => r.id],
                    ['Employee ID', r => r.employeeId],
                    ['Employee Name', r => r.employeeName],
                    ['Card Type', r => r.cardType],
                    ['Status', r => r.status],
                    ['Assigned At', r => r.assignedAt],
                    ['Revoked At', r => r.revokedAt],
                    ['Enrolled Devices', r => r.enrolledDevices],
                    ['Active Enrollments', r => r.enrollmentCount],
                ]), 'all_cards', format, req);
            }

            res.json({ success: true, data: rows, total: rows.length });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /* ─── 5. Unassigned / revoked / blacklisted cards ─────────────────── */

    router.get('/cards/inactive', asyncHandler(async (req, res) => {
        try {
            const { format } = req.query;
            const db = prisma();

            const cards = await db.cardAssignment.findMany({
                where: { status: { not: 'active' } },
                orderBy: { revokedAt: 'desc' },
            });

            const rows = cards.map(c => ({
                id: c.id,
                employeeId: c.employeeId,
                employeeName: c.employeeName,
                cardType: c.cardType,
                status: c.status,
                assignedAt: c.assignedAt,
                revokedAt: c.revokedAt,
                notes: c.notes,
            }));

            if (format) {
                return sendReport(res, rows, cols([
                    ['ID', r => r.id],
                    ['Employee ID', r => r.employeeId],
                    ['Employee Name', r => r.employeeName],
                    ['Card Type', r => r.cardType],
                    ['Status', r => r.status],
                    ['Assigned At', r => r.assignedAt],
                    ['Revoked At', r => r.revokedAt],
                    ['Notes', r => r.notes],
                ]), 'inactive_cards', format, req);
            }

            res.json({ success: true, data: rows, total: rows.length });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /* ─── 6. Device status overview ───────────────────────────────────── */

    router.get('/devices', asyncHandler(async (req, res) => {
        try {
            const { format } = req.query;
            const db = prisma();

            const devices = await db.device.findMany({
                include: {
                    location: true,
                    _count: { select: { enrollments: true } },
                },
                orderBy: { name: 'asc' },
            });

            const rows = devices.map(d => ({
                id: d.id,
                name: d.name,
                ip: d.ip,
                port: d.port,
                status: d.status,
                direction: d.direction,
                deviceType: d.deviceType,
                serialNumber: d.serialNumber,
                location: d.location?.name || '',
                isActive: d.isActive,
                enrolledUsers: d._count.enrollments,
                lastEventSync: d.last_event_sync,
                lastUserSync: d.last_user_sync,
            }));

            if (format) {
                return sendReport(res, rows, cols([
                    ['ID', r => r.id],
                    ['Name', r => r.name],
                    ['IP', r => r.ip],
                    ['Port', r => r.port],
                    ['Status', r => r.status],
                    ['Direction', r => r.direction],
                    ['Device Type', r => r.deviceType],
                    ['Serial Number', r => r.serialNumber],
                    ['Location', r => r.location],
                    ['Active', r => r.isActive],
                    ['Enrolled Users', r => r.enrolledUsers],
                    ['Last Event Sync', r => r.lastEventSync],
                    ['Last User Sync', r => r.lastUserSync],
                ]), 'device_status', format, req);
            }

            res.json({ success: true, data: rows, total: rows.length });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /* ─── 7. Event custom report (access, alarm, door, zone) ──────────── */

    router.get('/events', asyncHandler(async (req, res) => {
        try {
            const {
                format,
                deviceId,
                eventType,
                authResult,
                userId,
                doorId,
                startDate,
                endDate,
                limit = 5000,
            } = req.query;
            const db = prisma();

            const where = {};
            if (deviceId) where.deviceId = parseInt(deviceId);
            if (eventType) where.eventType = eventType;
            if (authResult) where.authResult = authResult;
            if (userId) where.userId = { contains: userId };
            if (doorId) where.doorId = parseInt(doorId);
            if (startDate || endDate) {
                where.timestamp = {};
                if (startDate) where.timestamp.gte = new Date(startDate);
                if (endDate) where.timestamp.lte = new Date(endDate);
            }

            const events = await db.event.findMany({
                where,
                orderBy: { timestamp: 'desc' },
                take: parseInt(limit),
            });

            const rows = events.map(e => ({
                id: e.id,
                deviceId: e.deviceId,
                eventCode: `0x${(e.eventCode || 0).toString(16).toUpperCase().padStart(4, '0')}`,
                eventType: e.eventType,
                subType: e.subType,
                userId: e.userId,
                doorId: e.doorId,
                description: e.description,
                authResult: e.authResult,
                timestamp: e.timestamp,
                supremaEventId: e.supremaEventId.toString(),
            }));

            if (format) {
                return sendReport(res, rows, cols([
                    ['ID', r => r.id],
                    ['Device ID', r => r.deviceId],
                    ['Event Code', r => r.eventCode],
                    ['Type', r => r.eventType],
                    ['Sub Type', r => r.subType],
                    ['User ID', r => r.userId],
                    ['Door ID', r => r.doorId],
                    ['Description', r => r.description],
                    ['Auth Result', r => r.authResult],
                    ['Timestamp', r => r.timestamp],
                ]), 'event_custom_report', format, req);
            }

            res.json({ success: true, data: rows, total: rows.length });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /* ─── 8. Enrollment log report ────────────────────────────────────── */

    router.get('/enrollments', asyncHandler(async (req, res) => {
        try {
            const { format, deviceId, success: successFilter, operation, limit = 5000 } = req.query;
            const db = prisma();

            const where = {};
            if (deviceId) where.deviceId = parseInt(deviceId);
            if (successFilter !== undefined) where.success = successFilter === 'true';
            if (operation) where.operation = operation;

            const logs = await db.enrollmentLog.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                take: parseInt(limit),
            });

            const rows = logs.map(l => ({
                id: l.id,
                operation: l.operation,
                deviceId: l.deviceId,
                userId: l.userId,
                cardType: l.cardType,
                success: l.success,
                errorMessage: l.errorMessage,
                createdAt: l.createdAt,
            }));

            if (format) {
                return sendReport(res, rows, cols([
                    ['ID', r => r.id],
                    ['Operation', r => r.operation],
                    ['Device ID', r => r.deviceId],
                    ['User ID', r => r.userId],
                    ['Card Type', r => r.cardType],
                    ['Success', r => r.success],
                    ['Error', r => r.errorMessage],
                    ['Time', r => r.createdAt],
                ]), 'enrollment_report', format, req);
            }

            res.json({ success: true, data: rows, total: rows.length });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /* ─── 9. Replication lag report ──────────────────────────────────── */

    router.get('/replication-lag', asyncHandler(async (req, res) => {
        try {
            const { format } = req.query;
            const health = await services.eventReplication?.getHealthStatus();

            let rows;
            let serviceMeta = null;

            if (!health) {
                // Fall back to DB: return device list without live replication metrics
                const dbDevices = await db.device.findMany({
                    select: { deviceId: true, name: true, ip: true, port: true, status: true, isActive: true },
                });
                rows = dbDevices.map(d => ({
                    deviceId: d.deviceId,
                    deviceName: d.name,
                    ip: d.ip,
                    port: d.port,
                    connected: d.status === 'connected',
                    monitoringEnabled: false,
                    status: 'service-unavailable',
                    replicationLagSeconds: null,
                    lastEventSync: null,
                    lastSuccessAt: null,
                    lastErrorAt: null,
                    lastError: 'Replication service not running',
                    failureCount: 0,
                    totalPersisted: 0,
                }));
            } else {
                serviceMeta = {
                    running: health.service.running,
                    totalPersisted: health.service.totalPersisted,
                    totalSyncFailures: health.service.totalSyncFailures,
                    lastPeriodicRunAt: health.service.lastPeriodicRunAt,
                };
                rows = (health.devices || []).map(d => ({
                    deviceId: d.deviceId,
                    deviceName: d.deviceName,
                    ip: d.ip,
                    port: d.port,
                    connected: d.connected,
                    monitoringEnabled: d.monitoringEnabled,
                    status: d.status,
                    replicationLagSeconds: d.replicationLagSeconds ?? null,
                    lastEventSync: d.lastEventSync,
                    lastSuccessAt: d.lastSuccessAt,
                    lastErrorAt: d.lastErrorAt,
                    lastError: d.lastError,
                    failureCount: d.failureCount,
                    totalPersisted: d.totalPersisted,
                }));
            }

            if (format === 'csv' || format === 'xls') {
                const columns = cols([
                    ['Device ID', r => r.deviceId],
                    ['Device Name', r => r.deviceName],
                    ['IP', r => r.ip],
                    ['Port', r => r.port],
                    ['Connected', r => r.connected],
                    ['Monitoring', r => r.monitoringEnabled],
                    ['Status', r => r.status],
                    ['Lag (seconds)', r => r.replicationLagSeconds],
                    ['Last Event Sync', r => r.lastEventSync],
                    ['Last Success', r => r.lastSuccessAt],
                    ['Last Error At', r => r.lastErrorAt],
                    ['Last Error', r => r.lastError],
                    ['Failures', r => r.failureCount],
                    ['Total Persisted', r => r.totalPersisted],
                ]);
                return sendReport(res, rows, columns, 'replication_lag', format, req);
            }

            res.json({
                success: true,
                service: serviceMeta,
                devices: rows,
                generatedAt: new Date().toISOString(),
            });
        } catch (error) {
            services.logger.error('[Reports] Replication lag error:', { error: error.message });
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /* ─── 10. Report index ────────────────────────────────────────────── */

    router.get('/', (req, res) => {
        res.json({
            success: true,
            reports: {
                users: { path: '/api/reports/users', description: 'User detail report — all enrolled users across devices', params: 'deviceId?, format?' },
                usersInDevice: { path: '/api/reports/users-in-device', description: 'Users enrolled in a specific device', params: 'deviceId (required), format?' },
                usersWithoutCredential: { path: '/api/reports/users-without-credential', description: 'Card holders with no active device enrollment', params: 'format?' },
                cards: { path: '/api/reports/cards', description: 'All card assignments with enrollment details', params: 'status?, format?' },
                inactiveCards: { path: '/api/reports/cards/inactive', description: 'Revoked, lost, and expired cards', params: 'format?' },
                devices: { path: '/api/reports/devices', description: 'Device fleet status overview', params: 'format?' },
                events: { path: '/api/reports/events', description: 'Custom event report with filters', params: 'deviceId?, eventType?, authResult?, userId?, doorId?, startDate?, endDate?, limit?, format?' },
                enrollments: { path: '/api/reports/enrollments', description: 'Enrollment operation log', params: 'deviceId?, success?, operation?, limit?, format?' },
                replicationLag: { path: '/api/reports/replication-lag', description: 'Event replication lag per device', params: 'format?' },
            },
            formats: ['csv', 'xls', 'json'],
            note: 'Add ?format=csv|xls|json to any endpoint to download the report',
        });
    });

    return router;
};
