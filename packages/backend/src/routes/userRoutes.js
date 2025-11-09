/**
 * User Management Routes
 * REST API endpoints for user operations
 */

const express = require('express');
const router = express.Router();

module.exports = (services) => {
    /**
     * Get all users from device
     * GET /api/users/:deviceId
     */
    router.get('/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const userHeaders = await services.user.getUserList(deviceId);
            
            if (req.query.detailed === 'true' && userHeaders.length > 0) {
                const userIds = userHeaders.map(header => header.id);
                const detailedUsers = await services.user.getUsers(deviceId, userIds);
                return res.json({
                    success: true,
                    data: detailedUsers,
                    total: detailedUsers.length
                });
            }

            res.json({
                success: true,
                data: userHeaders,
                total: userHeaders.length
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
            const { users } = req.body;

            if (!users || !Array.isArray(users)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'users array is required'
                });
            }

            await services.user.enrollUsers(deviceId, users);

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
     * Delete users from device
     * DELETE /api/users/:deviceId
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

            await services.user.deleteUsers(deviceId, userIds);

            res.json({
                success: true,
                message: `Successfully deleted ${userIds.length} users`,
                deletedUsers: userIds.length
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
            const { userFingerData } = req.body;

            await services.user.setUserFingerprints(deviceId, userFingerData);

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
            const { userCardData } = req.body;

            await services.user.setUserCards(deviceId, userCardData);

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
            
            // Get user details including card information
            const users = await services.user.getUsers(deviceId, [userId]);
            
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
            const { cardData, cardIndex } = req.body;

            if (!cardData) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'cardData is required'
                });
            }

            // Update card for single user
            await services.user.setUserCards(deviceId, [{
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
            const { cardIndex } = req.query;

            // Set empty card data to remove the card
            await services.user.setUserCards(deviceId, [{
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

            await services.user.manageCardBlacklist(deviceId, cardInfos, action);

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
            const { userFaceData } = req.body;

            await services.user.setUserFaces(deviceId, userFaceData);

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
            const stats = await services.user.getUserStatistics(deviceId);

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

    return router;
};