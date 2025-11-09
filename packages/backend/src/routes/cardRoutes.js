/**
 * Card Operations Routes
 * REST API endpoints for card management, scanning, blacklist, and configuration
 */

import express from 'express';
const router = express.Router();

export default (services) => {
    /**
     * Scan card from device
     * POST /api/cards/scan
     * Body: { deviceId, format, threshold }
     */
    router.post('/scan', async (req, res) => {
        try {
            const { deviceId, format, threshold } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const cardData = await services.card.scanCard(deviceId, format, threshold);

            res.json({
                success: true,
                message: 'Card scanned successfully',
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
     * Get card blacklist from device
     * GET /api/cards/blacklist/:deviceId
     */
    router.get('/blacklist/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const blacklist = await services.card.getBlacklist(deviceId);

            res.json({
                success: true,
                data: blacklist,
                total: blacklist ? blacklist.length : 0
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Add cards to blacklist
     * POST /api/cards/blacklist/:deviceId
     * Body: { cardInfos: [{cardID, issueCount}] }
     */
    router.post('/blacklist/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { cardInfos } = req.body;

            if (!cardInfos || !Array.isArray(cardInfos)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'cardInfos array is required'
                });
            }

            await services.card.addToBlacklist(deviceId, cardInfos);

            res.json({
                success: true,
                message: `Added ${cardInfos.length} cards to blacklist`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Remove cards from blacklist
     * DELETE /api/cards/blacklist/:deviceId
     * Body: { cardInfos: [{cardID, issueCount}] }
     */
    router.delete('/blacklist/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { cardInfos } = req.body;

            if (!cardInfos || !Array.isArray(cardInfos)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'cardInfos array is required'
                });
            }

            await services.card.deleteFromBlacklist(deviceId, cardInfos);

            res.json({
                success: true,
                message: `Removed ${cardInfos.length} cards from blacklist`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get card configuration from device
     * GET /api/cards/config/:deviceId
     */
    router.get('/config/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const config = await services.card.getConfig(deviceId);

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
     * Get QR code configuration from device
     * GET /api/cards/qr-config/:deviceId
     */
    router.get('/qr-config/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const qrConfig = await services.card.getQRConfig(deviceId);

            res.json({
                success: true,
                data: qrConfig
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Set card configuration on device
     * PUT /api/cards/config/:deviceId
     * Body: { config: {...} }
     */
    router.put('/config/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { config } = req.body;

            if (!config) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'config object is required'
                });
            }

            await services.card.setConfig(deviceId, config);

            res.json({
                success: true,
                message: 'Card configuration updated successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Set QR code configuration on device
     * PUT /api/cards/qr-config/:deviceId
     * Body: { qrConfig: {...} }
     */
    router.put('/qr-config/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { qrConfig } = req.body;

            if (!qrConfig) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'qrConfig object is required'
                });
            }

            await services.card.setQRConfig(deviceId, qrConfig);

            res.json({
                success: true,
                message: 'QR code configuration updated successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Verify card data
     * POST /api/cards/verify
     * Body: { deviceId, cardData }
     */
    router.post('/verify', async (req, res) => {
        try {
            const { deviceId, cardData } = req.body;

            if (!deviceId || !cardData) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and cardData are required'
                });
            }

            const isValid = await services.card.verifyCard(deviceId, cardData);

            res.json({
                success: true,
                valid: isValid,
                message: isValid ? 'Card is valid' : 'Card is invalid or blacklisted'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get card statistics
     * GET /api/cards/statistics/:deviceId
     */
    router.get('/statistics/:deviceId', async (req, res) => {
        try {
            const { deviceId } = req.params;
            const stats = await services.card.getCardStatistics(deviceId);

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
