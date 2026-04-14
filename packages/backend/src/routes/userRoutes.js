/**
 * User Management Routes
 * REST API endpoints for user operations
 * 
 * DATABASE IS THE SOURCE OF TRUTH
 * - GET endpoints return data from database by default
 * - Use ?source=device to fetch directly from device
 * - Sync pushes database state to devices
 */

import express from 'express';
import UserSyncService from '../services/userSyncService.js';
import { resolveSupremaDeviceId } from '../utils/deviceResolver.js';
import { toCsv, toExcelTable, parseCsv } from '../utils/csv.js';
import { validate, schemas } from '../middleware/requestValidator.js';
import { asyncHandler } from '../core/errors/index.js';

// PrismaClient is no longer created here — it flows from the DI container
// through services.database.getPrisma().

const router = express.Router();

export default (services) => {
    const prisma = services.database.getPrisma();
    const audit = services.audit;

    // Initialize sync service with shared prisma
    const syncService = new UserSyncService(
        services.user,
        services.connection,
        services.logger || console,
        { prisma }
    );

    /**
     * Helper function to get Suprema device ID from database ID
     */
    const getSupremaDeviceId = (dbDeviceId) => resolveSupremaDeviceId(dbDeviceId, services.connection);

    // ==================== STATIC ROUTES (must come before /:deviceId) ====================

    /**
     * Sync database to ALL connected devices
     * POST /api/users/sync-all
     * 
     * Pushes all card assignments from database to all connected devices.
     * This makes devices match the database state exactly.
     */
    router.post('/sync-all', asyncHandler(async (req, res) => {
        try {
            services.logger.info('[API] POST /api/users/sync-all - Syncing database to all devices');
            const results = await audit.wrap(
                { action: 'sync-all', category: 'sync', ipAddress: req.ip, requestId: req.requestId },
                () => syncService.syncDatabaseToAllDevices()
            );

            res.json({
                success: true,
                message: 'Database synchronized to all devices',
                ...results
            });
        } catch (error) {
            services.logger.error('[API] Sync all error:', { error: error.message });
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get all users from database (centralized view)
     * GET /api/users/all
     * Query: page, limit, search, status
     */
    router.get('/all', asyncHandler(async (req, res) => {
        try {
            const { page, limit, search, status } = req.query;
            const isPaginated = page && limit;

            if (isPaginated) {
                const result = await syncService.getUsersFromDB(null, {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    search,
                    status,
                    _allStatuses: true
                });
                return res.json({
                    success: true,
                    source: 'database',
                    data: result.users,
                    total: result.total,
                    page: result.page,
                    limit: result.limit,
                    totalPages: result.totalPages
                });
            }

            const users = await syncService.getUsersFromDB();
            
            res.json({
                success: true,
                source: 'database',
                data: users,
                total: users.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Bulk import users from CSV data.
     * POST /api/users/import-csv
     *
     * Expected CSV columns: employee_id, employee_name, card_data
     * Optional columns: card_type, notes
     *
     * Body: { csvData: string, dryRun?: boolean }
     *
     * Returns per-row results with created / skipped / error counts.
     */
    router.post('/import-csv', validate.body(schemas.bulkImport), asyncHandler(async (req, res) => {
        try {
            const { csvData, dryRun = false } = req.body;
            const { headers, rows } = parseCsv(csvData);

            // Validate required columns
            const requiredCols = ['employee_id', 'employee_name', 'card_data'];
            const missing = requiredCols.filter((c) => !headers.includes(c));
            if (missing.length > 0) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: `CSV is missing required columns: ${missing.join(', ')}`,
                    expected: requiredCols,
                    received: headers,
                });
            }

            if (rows.length === 0) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'CSV contains no data rows',
                });
            }

            // Per-row validation
            const results = [];
            let created = 0;
            let skipped = 0;
            let errors = 0;

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const rowNum = i + 2; // 1-indexed, header is row 1

                const employeeId = (row.employee_id || '').trim();
                const employeeName = (row.employee_name || '').trim();
                const cardData = (row.card_data || '').trim();
                const cardType = (row.card_type || 'CSN').trim();
                const notes = (row.notes || '').trim();

                // Validate fields
                if (!employeeId || !employeeName || !cardData) {
                    results.push({ row: rowNum, status: 'error', message: 'Missing required field(s)' });
                    errors++;
                    continue;
                }

                // Validate card data looks like hex (even-length hex string)
                if (!/^[0-9a-fA-F]+$/.test(cardData) || cardData.length % 2 !== 0) {
                    results.push({ row: rowNum, status: 'error', message: 'card_data must be an even-length hex string' });
                    errors++;
                    continue;
                }

                if (dryRun) {
                    results.push({ row: rowNum, status: 'valid', employeeId, employeeName });
                    created++;
                    continue;
                }

                try {
                    // Check for duplicate card
                    const existing = await prisma.cardAssignment.findFirst({
                        where: { cardData },
                    });

                    if (existing) {
                        results.push({ row: rowNum, status: 'skipped', message: `Card already assigned to ${existing.employeeName}` });
                        skipped++;
                        continue;
                    }

                    // Create card assignment
                    await prisma.cardAssignment.create({
                        data: {
                            employeeId,
                            employeeName,
                            cardData,
                            cardType,
                            notes: notes || `Bulk import`,
                            status: 'active',
                        },
                    });

                    results.push({ row: rowNum, status: 'created', employeeId, employeeName });
                    created++;
                } catch (rowError) {
                    results.push({ row: rowNum, status: 'error', message: rowError.message });
                    errors++;
                }
            }

            if (!dryRun) {
                audit?.log({
                    action: 'bulk-import-csv',
                    category: 'import',
                    details: { totalRows: rows.length, created, skipped, errors },
                    ipAddress: req.ip,
                    requestId: req.requestId,
                });
            }

            res.json({
                success: true,
                dryRun,
                summary: { total: rows.length, created, skipped, errors },
                results,
            });
        } catch (error) {
            services.logger.error('[API] Bulk CSV import error:', { error: error.message });
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message,
            });
        }
    }));

    /**
     * Get sync status summary across all registered devices.
     * GET /api/users/sync-status
     */
    router.get('/sync-status', asyncHandler(async (req, res) => {
        try {
            const overview = await syncService.getReconciliationOverview();

            res.json({
                success: true,
                data: overview.summary,
                devices: overview.devices.map((device) => ({
                    device: device.device,
                    summary: device.summary,
                    warning: device.warning,
                    error: device.error
                }))
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get reconciliation report for all devices.
     * GET /api/users/reconciliation
     */
    router.get('/reconciliation', asyncHandler(async (req, res) => {
        try {
            const { format = 'json' } = req.query;
            const overview = await syncService.getReconciliationOverview();

            if (format === 'csv' || format === 'xls') {
                const rows = overview.devices.map((entry) => ({
                    databaseDeviceId: entry.device.databaseDeviceId,
                    name: entry.device.name,
                    ip: entry.device.ip,
                    port: entry.device.port,
                    connected: entry.device.connected,
                    databaseUsers: entry.summary.databaseUsers,
                    deviceUsers: entry.summary.deviceUsers,
                    matched: entry.summary.matched,
                    missingOnDevice: entry.summary.missingOnDevice,
                    missingInDatabase: entry.summary.missingInDatabase,
                    cardMismatches: entry.summary.cardMismatches,
                    warning: entry.warning || null,
                    error: entry.error || null
                }));

                const columns = [
                    { header: 'Database Device ID', value: (row) => row.databaseDeviceId },
                    { header: 'Device Name', value: (row) => row.name },
                    { header: 'IP', value: (row) => row.ip },
                    { header: 'Port', value: (row) => row.port },
                    { header: 'Connected', value: (row) => row.connected },
                    { header: 'Database Users', value: (row) => row.databaseUsers },
                    { header: 'Device Users', value: (row) => row.deviceUsers },
                    { header: 'Matched', value: (row) => row.matched },
                    { header: 'Missing On Device', value: (row) => row.missingOnDevice },
                    { header: 'Missing In Database', value: (row) => row.missingInDatabase },
                    { header: 'Card Mismatches', value: (row) => row.cardMismatches },
                    { header: 'Warning', value: (row) => row.warning },
                    { header: 'Error', value: (row) => row.error }
                ];

                if (format === 'xls') {
                    const workbook = toExcelTable(rows, columns, 'User Reconciliation');
                    res.setHeader('Content-Type', 'application/vnd.ms-excel');
                    res.setHeader('Content-Disposition', `attachment; filename="user_reconciliation_${Date.now()}.xls"`);
                    audit?.log({ action: 'export-reconciliation', category: 'export', details: { format, count: rows.length }, ipAddress: req.ip, requestId: req.requestId });
                    return res.send(workbook);
                }

                const csvData = toCsv(rows, columns);

                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename="user_reconciliation_${Date.now()}.csv"`);
                audit?.log({ action: 'export-reconciliation', category: 'export', details: { format, count: rows.length }, ipAddress: req.ip, requestId: req.requestId });
                return res.send(csvData);
            }

            res.json({
                success: true,
                data: overview
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get reconciliation report for a specific device.
     * GET /api/users/reconciliation/:deviceId
     */
    router.get('/reconciliation/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const report = await syncService.compareDeviceToDatabase(deviceId);

            res.json({
                success: true,
                data: report
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Repair one device to match database assignments.
     * POST /api/users/reconciliation/:deviceId/repair
     */
    router.post('/reconciliation/:deviceId/repair', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const result = await audit.wrap(
                { action: 'repair-device', category: 'sync', targetType: 'device', targetId: deviceId, ipAddress: req.ip, requestId: req.requestId },
                () => syncService.repairDeviceFromDatabase(deviceId)
            );

            res.json({
                success: true,
                message: 'Device repaired from database state',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Repair or remove a specific user on a device based on database state.
     * POST /api/users/reconciliation/:deviceId/repair-user/:userId
     */
    router.post('/reconciliation/:deviceId/repair-user/:userId', asyncHandler(async (req, res) => {
        try {
            const { deviceId, userId } = req.params;
            const result = await audit.wrap(
                { action: 'repair-user', category: 'sync', targetType: 'user', targetId: `${deviceId}/${userId}`, ipAddress: req.ip, requestId: req.requestId },
                () => syncService.repairUserOnDevice(deviceId, userId)
            );

            res.json({
                success: true,
                message: 'User remediation completed',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Batch repair ALL connected devices with drift.
     * POST /api/users/reconciliation/repair-all
     */
    router.post('/reconciliation/repair-all', asyncHandler(async (req, res) => {
        try {
            const result = await audit.wrap(
                { action: 'repair-all-devices', category: 'sync', ipAddress: req.ip, requestId: req.requestId },
                () => syncService.repairAllDevices()
            );

            res.json({
                success: true,
                message: 'Batch device repair completed',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Import users from device to database
     * POST /api/users/import/:deviceId
     */
    router.post('/import/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            services.logger.info(`[API] POST /api/users/import/${deviceId} - Importing users from device to DB`);
            
            const result = await audit.wrap(
                { action: 'import-users', category: 'sync', targetType: 'device', targetId: deviceId, ipAddress: req.ip, requestId: req.requestId },
                () => syncService.importUsersFromDevice(deviceId)
            );
            
            res.json({
                success: true,
                message: 'Users imported from device to database',
                ...result
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Delete user from all devices
     * DELETE /api/users/delete-all/:userId
     */
    router.delete('/delete-all/:userId', asyncHandler(async (req, res) => {
        try {
            const { userId } = req.params;
            const { revokeCard } = req.query;
            
            services.logger.info(`[API] DELETE /api/users/delete-all/${userId} - Deleting from all devices`);
            
            const result = await syncService.deleteUserFromAllDevices(
                userId, 
                revokeCard === 'true'
            );
            
            res.json({
                success: true,
                message: `User ${userId} deleted from all devices`,
                ...result
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    // ==================== DEVICE-SPECIFIC ROUTES ====================

    /**
     * Get users for a device
     * GET /api/users/:deviceId
     * 
     * Query params:
     *   - source=device : Fetch directly from device (default: database)
     *   - detailed=true : Include card data
     */
    router.get('/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const source = req.query.source || 'database';
            
            if (source === 'device') {
                // Fetch from device directly
                const users = await syncService.getUsersFromDevice(deviceId);
                return res.json({
                    success: true,
                    source: 'device',
                    data: users,
                    total: users.length
                });
            }
            
            // Default: Fetch from database
            const dbDeviceId = parseInt(deviceId) < 100000 ? parseInt(deviceId) : null;
            const users = await syncService.getUsersFromDB(dbDeviceId);
            
            res.json({
                success: true,
                source: 'database',
                data: users,
                total: users.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Enroll users to device
     * POST /api/users/:deviceId
     */
    router.post('/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const { users } = req.body;

            if (!users || !Array.isArray(users)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'users array is required'
                });
            }

            await services.user.enrollUsers(supremaDeviceId, users);

            res.json({
                success: true,
                message: `Successfully enrolled ${users.length} users`,
                enrolledUsers: users.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Delete users from device and update database
     * DELETE /api/users/:deviceId
     * 
     * Deletes users from the device and marks their enrollment as 'removed' in database
     */
    router.delete('/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { userIds } = req.body;

            if (!userIds || !Array.isArray(userIds)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'userIds array is required'
                });
            }

            const results = [];
            for (const userId of userIds) {
                try {
                    await syncService.deleteUserFromDevice(deviceId, userId);
                    results.push({ userId, success: true });
                } catch (error) {
                    results.push({ userId, success: false, error: error.message });
                }
            }

            const successCount = results.filter(r => r.success).length;

            res.json({
                success: true,
                message: `Deleted ${successCount}/${userIds.length} users from device and updated database`,
                deletedUsers: successCount,
                results
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Set fingerprints for users
     * POST /api/users/:deviceId/fingerprints
     */
    router.post('/:deviceId/fingerprints', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const { userFingerData } = req.body;

            await services.user.setUserFingerprints(supremaDeviceId, userFingerData);

            res.json({
                success: true,
                message: `Set fingerprints for ${userFingerData.length} users`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Set cards for users
     * POST /api/users/:deviceId/cards
     */
    router.post('/:deviceId/cards', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const { userCardData } = req.body;

            await services.user.setUserCards(supremaDeviceId, userCardData);

            res.json({
                success: true,
                message: `Set cards for ${userCardData.length} users`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get card credentials for a specific user
     * GET /api/users/:deviceId/cards/:userId
     */
    router.get('/:deviceId/cards/:userId', asyncHandler(async (req, res) => {
        try {
            const { deviceId, userId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            
            // Get user details including card information
            const users = await services.user.getUsers(supremaDeviceId, [userId]);
            
            if (!users || users.length === 0) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'User not found'
                });
            }

            const user = users[0];
            const cardData = {
                userId: user.userID,
                cards: user.cards || [],
                cardNumber: user.cardNumber || null
            };

            res.json({
                success: true,
                data: cardData
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Update card credentials for a specific user
     * PUT /api/users/:deviceId/cards/:userId
     */
    router.put('/:deviceId/cards/:userId', asyncHandler(async (req, res) => {
        try {
            const { deviceId, userId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const { cardData, cardIndex } = req.body;

            if (!cardData) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'cardData is required'
                });
            }

            // Update card for single user
            await services.user.setUserCards(supremaDeviceId, [{
                userId: userId,
                cardData: cardData,
                cardIndex: cardIndex || 0
            }]);

            res.json({
                success: true,
                message: `Card credentials updated for user ${userId}`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Delete card credentials for a specific user
     * DELETE /api/users/:deviceId/cards/:userId
     */
    router.delete('/:deviceId/cards/:userId', asyncHandler(async (req, res) => {
        try {
            const { deviceId, userId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const { cardIndex } = req.query;

            // Set empty card data to remove the card
            await services.user.setUserCards(supremaDeviceId, [{
                userId: userId,
                cardData: null,
                cardIndex: parseInt(cardIndex) || 0
            }]);

            res.json({
                success: true,
                message: `Card credentials deleted for user ${userId}`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Manage card blacklist (add or remove cards)
     * POST /api/users/:deviceId/cards/blacklist
     */
    router.post('/:deviceId/cards/blacklist', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const { action, cardInfos } = req.body;

            if (!action || !['add', 'delete'].includes(action)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'action must be "add" or "delete"'
                });
            }

            if (!cardInfos || !Array.isArray(cardInfos)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'cardInfos array is required'
                });
            }

            await services.user.manageCardBlacklist(supremaDeviceId, cardInfos, action);

            res.json({
                success: true,
                message: `${action === 'add' ? 'Added' : 'Removed'} ${cardInfos.length} cards ${action === 'add' ? 'to' : 'from'} blacklist`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Set faces for users
     * POST /api/users/:deviceId/faces
     */
    router.post('/:deviceId/faces', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const { userFaceData } = req.body;

            await services.user.setUserFaces(supremaDeviceId, userFaceData);

            res.json({
                success: true,
                message: `Set faces for ${userFaceData.length} users`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get user statistics
     * GET /api/users/:deviceId/statistics
     */
    router.get('/:deviceId/statistics', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const stats = await services.user.getUserStatistics(supremaDeviceId);

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
     * Get access groups for users
     * GET /api/users/:deviceId/access-groups
     * Query: userIds (comma-separated)
     */
    router.get('/:deviceId/access-groups', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const { userIds } = req.query;

            if (!userIds) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'userIds query parameter is required'
                });
            }

            const userIdArray = userIds.split(',');
            const accessGroups = await services.user.getAccessGroups(supremaDeviceId, userIdArray);

            res.json({
                success: true,
                data: accessGroups
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Set access groups for users
     * POST /api/users/:deviceId/access-groups
     * Body: { userAccessGroups: [{userID, accessGroupIDs}] }
     */
    router.post('/:deviceId/access-groups', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const { userAccessGroups } = req.body;

            if (!userAccessGroups || !Array.isArray(userAccessGroups)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'userAccessGroups array is required'
                });
            }

            await services.user.setAccessGroups(supremaDeviceId, userAccessGroups);

            res.json({
                success: true,
                message: `Set access groups for ${userAccessGroups.length} users`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Enroll users to multiple devices
     * POST /api/users/enroll-multi
     * Body: { deviceIds: [], users: [] }
     */
    router.post('/enroll-multi', asyncHandler(async (req, res) => {
        try {
            const { deviceIds, users } = req.body;

            if (!deviceIds || !Array.isArray(deviceIds)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceIds array is required'
                });
            }

            if (!users || !Array.isArray(users)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'users array is required'
                });
            }

            await services.user.enrollUsersMulti(deviceIds, users);

            res.json({
                success: true,
                message: `Enrolled ${users.length} users to ${deviceIds.length} devices`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Update users on multiple devices
     * PUT /api/users/update-multi
     * Body: { deviceIds: [], users: [] }
     */
    router.put('/update-multi', asyncHandler(async (req, res) => {
        try {
            const { deviceIds, users } = req.body;

            if (!deviceIds || !Array.isArray(deviceIds)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceIds array is required'
                });
            }

            if (!users || !Array.isArray(users)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'users array is required'
                });
            }

            await services.user.updateUsersMulti(deviceIds, users);

            res.json({
                success: true,
                message: `Updated ${users.length} users on ${deviceIds.length} devices`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Delete users from multiple devices
     * DELETE /api/users/delete-multi
     * Body: { deviceIds: [], userIds: [] }
     */
    router.delete('/delete-multi', asyncHandler(async (req, res) => {
        try {
            const { deviceIds, userIds } = req.body;

            if (!deviceIds || !Array.isArray(deviceIds)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceIds array is required'
                });
            }

            if (!userIds || !Array.isArray(userIds)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'userIds array is required'
                });
            }

            await services.user.deleteUsersMulti(deviceIds, userIds);

            res.json({
                success: true,
                message: `Deleted ${userIds.length} users from ${deviceIds.length} devices`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Update user information on device
     * PUT /api/users/:deviceId/:userId
     * Body: { userInfo: {...} }
     */
    router.put('/:deviceId/:userId', asyncHandler(async (req, res) => {
        try {
            const { deviceId, userId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const { userInfo } = req.body;

            if (!userInfo) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'userInfo object is required'
                });
            }

            await services.user.updateUser(supremaDeviceId, { ...userInfo, userID: userId });

            res.json({
                success: true,
                message: `User ${userId} updated successfully`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get specific user details from device
     * GET /api/users/:deviceId/user/:userId
     */
    router.get('/:deviceId/user/:userId', asyncHandler(async (req, res) => {
        try {
            const { deviceId, userId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const users = await services.user.getUsers(supremaDeviceId, [userId]);

            if (!users || users.length === 0) {
                return res.status(404).json({
                    error: 'Not Found',
                    message: 'User not found'
                });
            }

            res.json({
                success: true,
                data: users[0]
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Sync users from device to database
     * POST /api/users/:deviceId/sync
     */
    router.post('/:deviceId/sync', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const result = await syncService.importUsersFromDevice(supremaDeviceId);

            res.json({
                success: true,
                message: 'Users synchronized to database',
                synced: result.imported,
                deviceId: deviceId
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