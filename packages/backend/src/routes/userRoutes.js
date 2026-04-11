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
import { PrismaClient } from '@prisma/client';
import UserSyncService from '../services/userSyncService.js';

const router = express.Router();
const prisma = new PrismaClient();

export default (services) => {
    // Initialize sync service
    const syncService = new UserSyncService(
        services.user,
        services.connection,
        console
    );

    /**
     * Helper function to get Suprema device ID from database ID
     */
    const getSupremaDeviceId = async (dbDeviceId) => {
        // Check if it's already a Suprema device ID (large number)
        if (parseInt(dbDeviceId) > 100000) {
            return parseInt(dbDeviceId);
        }
        
        // Look up the connected device by database ID
        const connectedDevices = await services.connection.getConnectedDevices();
        const devices = await services.connection.getAllDevicesFromDB();
        const dbDevice = devices.find(d => d.id === parseInt(dbDeviceId));
        
        if (!dbDevice) {
            throw new Error(`Device with ID ${dbDeviceId} not found in database`);
        }
        
        // Find matching connected device by IP
        for (const device of connectedDevices) {
            const info = device.toObject ? device.toObject() : device;
            if (info.ipaddr === dbDevice.ip && info.port === dbDevice.port) {
                return info.deviceid;
            }
        }
        
        throw new Error(`Device ${dbDevice.name} (${dbDevice.ip}) is not connected. Please connect the device first.`);
    };

    // ==================== STATIC ROUTES (must come before /:deviceId) ====================

    /**
     * Sync database to ALL connected devices
     * POST /api/users/sync-all
     * 
     * Pushes all card assignments from database to all connected devices.
     * This makes devices match the database state exactly.
     */
    router.post('/sync-all', async (req, res) => {
        try {
            console.log('[API] POST /api/users/sync-all - Syncing database to all devices');
            const results = await syncService.syncDatabaseToAllDevices();

            res.json({
                success: true,
                message: 'Database synchronized to all devices',
                ...results
            });
        } catch (error) {
            console.error('[API] Sync all error:', error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get all users from database (centralized view)
     * GET /api/users/all
     */
    router.get('/all', async (req, res) => {
        try {
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
    });

    /**
     * Import users from device to database
     * POST /api/users/import/:deviceId
     */
    router.post('/import/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            console.log(`[API] POST /api/users/import/${deviceId} - Importing users from device to DB`);
            
            const result = await syncService.importUsersFromDevice(deviceId);
            
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
    });

    /**
     * Delete user from all devices
     * DELETE /api/users/delete-all/:userId
     */
    router.delete('/delete-all/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const { revokeCard } = req.query;
            
            console.log(`[API] DELETE /api/users/delete-all/${userId} - Deleting from all devices`);
            
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
    });

    // ==================== DEVICE-SPECIFIC ROUTES ====================

    /**
     * Get users for a device
     * GET /api/users/:deviceId
     * 
     * Query params:
     *   - source=device : Fetch directly from device (default: database)
     *   - detailed=true : Include card data
     */
    router.get('/:deviceId', async (req, res) => {
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
    });

    /**
     * Enroll users to device
     * POST /api/users/:deviceId
     */
    router.post('/:deviceId', async (req, res) => {
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
    });

    /**
     * Delete users from device and update database
     * DELETE /api/users/:deviceId
     * 
     * Deletes users from the device and marks their enrollment as 'removed' in database
     */
    router.delete('/:deviceId', async (req, res) => {
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
    });

    /**
     * Set fingerprints for users
     * POST /api/users/:deviceId/fingerprints
     */
    router.post('/:deviceId/fingerprints', async (req, res) => {
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
    });

    /**
     * Set cards for users
     * POST /api/users/:deviceId/cards
     */
    router.post('/:deviceId/cards', async (req, res) => {
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
    });

    /**
     * Get card credentials for a specific user
     * GET /api/users/:deviceId/cards/:userId
     */
    router.get('/:deviceId/cards/:userId', async (req, res) => {
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
    });

    /**
     * Update card credentials for a specific user
     * PUT /api/users/:deviceId/cards/:userId
     */
    router.put('/:deviceId/cards/:userId', async (req, res) => {
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
    });

    /**
     * Delete card credentials for a specific user
     * DELETE /api/users/:deviceId/cards/:userId
     */
    router.delete('/:deviceId/cards/:userId', async (req, res) => {
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
    });

    /**
     * Manage card blacklist (add or remove cards)
     * POST /api/users/:deviceId/cards/blacklist
     */
    router.post('/:deviceId/cards/blacklist', async (req, res) => {
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
    });

    /**
     * Set faces for users
     * POST /api/users/:deviceId/faces
     */
    router.post('/:deviceId/faces', async (req, res) => {
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
    });

    /**
     * Get user statistics
     * GET /api/users/:deviceId/statistics
     */
    router.get('/:deviceId/statistics', async (req, res) => {
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
    });

    /**
     * Get access groups for users
     * GET /api/users/:deviceId/access-groups
     * Query: userIds (comma-separated)
     */
    router.get('/:deviceId/access-groups', async (req, res) => {
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
    });

    /**
     * Set access groups for users
     * POST /api/users/:deviceId/access-groups
     * Body: { userAccessGroups: [{userID, accessGroupIDs}] }
     */
    router.post('/:deviceId/access-groups', async (req, res) => {
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
    });

    /**
     * Enroll users to multiple devices
     * POST /api/users/enroll-multi
     * Body: { deviceIds: [], users: [] }
     */
    router.post('/enroll-multi', async (req, res) => {
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
    });

    /**
     * Update users on multiple devices
     * PUT /api/users/update-multi
     * Body: { deviceIds: [], users: [] }
     */
    router.put('/update-multi', async (req, res) => {
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
    });

    /**
     * Delete users from multiple devices
     * DELETE /api/users/delete-multi
     * Body: { deviceIds: [], userIds: [] }
     */
    router.delete('/delete-multi', async (req, res) => {
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
    });

    /**
     * Update user information on device
     * PUT /api/users/:deviceId/:userId
     * Body: { userInfo: {...} }
     */
    router.put('/:deviceId/:userId', async (req, res) => {
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
    });

    /**
     * Get specific user details from device
     * GET /api/users/:deviceId/user/:userId
     */
    router.get('/:deviceId/user/:userId', async (req, res) => {
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
    });

    /**
     * Sync users from device to database
     * POST /api/users/:deviceId/sync
     */
    router.post('/:deviceId/sync', async (req, res) => {
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
    });

    return router;
};