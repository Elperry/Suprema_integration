/**
 * Card Operations Routes
 * REST API endpoints for card management, scanning, blacklist, and configuration
 */

import express from 'express';
import { validate, schemas } from '../middleware/requestValidator.js';
import { asyncHandler } from '../core/errors/index.js';
import { resolveSupremaDeviceId } from '../utils/deviceResolver.js';

const router = express.Router();

export default (services) => {
    // Helper to resolve device ID
    const getSupremaDeviceId = (dbDeviceId) => resolveSupremaDeviceId(dbDeviceId, services.connection);

    /**
     * Scan card from device
     * POST /api/cards/scan
     * Body: { deviceId, format, threshold }
     */
    router.post('/scan', validate.body(schemas.cardScan), asyncHandler(async (req, res) => {
        try {
            const { deviceId, format, threshold } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const cardData = await services.card.scanCard(supremaDeviceId, format, threshold);

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
    }));

    /**
     * Get card blacklist from device
     * GET /api/cards/blacklist/:deviceId
     */
    router.get('/blacklist/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const blacklist = await services.card.getBlacklist(supremaDeviceId);

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
    }));

    /**
     * Add cards to blacklist
     * POST /api/cards/blacklist/:deviceId
     * Body: { cardInfos: [{cardID, issueCount}] }
     */
    router.post('/blacklist/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { cardInfos } = req.body;

            if (!cardInfos || !Array.isArray(cardInfos)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'cardInfos array is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            await services.card.addToBlacklist(supremaDeviceId, cardInfos);

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
    }));

    /**
     * Remove cards from blacklist
     * DELETE /api/cards/blacklist/:deviceId
     * Body: { cardInfos: [{cardID, issueCount}] }
     */
    router.delete('/blacklist/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { cardInfos } = req.body;

            if (!cardInfos || !Array.isArray(cardInfos)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'cardInfos array is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            await services.card.deleteFromBlacklist(supremaDeviceId, cardInfos);

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
    }));

    /**
     * Get card configuration from device
     * GET /api/cards/config/:deviceId
     */
    router.get('/config/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const config = await services.card.getConfig(supremaDeviceId);

            res.json({
                success: true,
                data: config
            });
        } catch (error) {
            // Handle gRPC parsing errors by returning default config
            if (error.message && error.message.includes('parsing error')) {
                return res.json({
                    success: true,
                    data: {
                        bypassCard: false,
                        useWiegandFormat: true,
                        dataType: 1, // CSN
                        useSecondaryKey: false
                    },
                    note: 'Using defaults due to device response parsing issue'
                });
            }
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }));

    /**
     * Get QR code configuration from device
     * GET /api/cards/qr-config/:deviceId
     */
    router.get('/qr-config/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const qrConfig = await services.card.getQRConfig(supremaDeviceId);

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
    }));

    /**
     * Set card configuration on device
     * PUT /api/cards/config/:deviceId
     * Body: { config: {...} }
     */
    router.put('/config/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { config } = req.body;

            if (!config) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'config object is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            await services.card.setConfig(supremaDeviceId, config);

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
    }));

    /**
     * Set QR code configuration on device
     * PUT /api/cards/qr-config/:deviceId
     * Body: { qrConfig: {...} }
     */
    router.put('/qr-config/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const { qrConfig } = req.body;

            if (!qrConfig) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'qrConfig object is required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            await services.card.setQRConfig(supremaDeviceId, qrConfig);

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
    }));

    /**
     * Verify card data
     * POST /api/cards/verify
     * Body: { deviceId, cardData }
     */
    router.post('/verify', asyncHandler(async (req, res) => {
        try {
            const { deviceId, cardData } = req.body;

            if (!deviceId || !cardData) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId and cardData are required'
                });
            }

            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const isValid = await services.card.verifyCard(supremaDeviceId, cardData);

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
    }));

    /**
     * Get card statistics
     * GET /api/cards/statistics/:deviceId
     */
    router.get('/statistics/:deviceId', asyncHandler(async (req, res) => {
        try {
            const { deviceId } = req.params;
            const supremaDeviceId = await getSupremaDeviceId(deviceId);
            const stats = await services.card.getCardStatistics(supremaDeviceId);

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

    return router;
};
