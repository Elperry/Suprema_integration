/**
 * Biometric Management Routes
 * REST API endpoints for biometric operations and template management
 */

const express = require('express');
const router = express.Router();

module.exports = (services) => {
    /**
     * Scan fingerprint
     * POST /api/biometric/scan/fingerprint
     */
    router.post('/scan/fingerprint', async (req, res) => {
        try {
            const { deviceId, templateFormat = 'SUPREMA', quality = 'STANDARD' } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const template = await services.biometric.scanFingerprint(deviceId, {
                templateFormat: templateFormat,
                quality: quality
            });

            res.json({
                success: true,
                message: 'Fingerprint scanned successfully',
                data: template
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Scan card
     * POST /api/biometric/scan/card
     */
    router.post('/scan/card', async (req, res) => {
        try {
            const { deviceId, timeout = 30 } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const cardData = await services.biometric.scanCard(deviceId, parseInt(timeout));

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
     * Scan face
     * POST /api/biometric/scan/face
     */
    router.post('/scan/face', async (req, res) => {
        try {
            const { deviceId, templateFormat = 'SUPREMA', enrollmentCount = 3 } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const template = await services.biometric.scanFace(deviceId, {
                templateFormat: templateFormat,
                enrollmentCount: parseInt(enrollmentCount)
            });

            res.json({
                success: true,
                message: 'Face scanned successfully',
                data: template
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Verify biometric template
     * POST /api/biometric/verify
     */
    router.post('/verify', async (req, res) => {
        try {
            const { deviceId, template1, template2, biometricType } = req.body;

            if (!deviceId || !template1 || !template2 || !biometricType) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId, template1, template2, and biometricType are required'
                });
            }

            const result = await services.biometric.verifyTemplate(
                deviceId, 
                template1, 
                template2, 
                biometricType
            );

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get biometric configuration
     * GET /api/biometric/config
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

            const config = await services.biometric.getBiometricConfig(deviceId);

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
     * Set biometric configuration
     * POST /api/biometric/config
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

            await services.biometric.setBiometricConfig(deviceId, config);

            res.json({
                success: true,
                message: 'Biometric configuration updated successfully',
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
     * Get supported biometric types
     * GET /api/biometric/types
     */
    router.get('/types', async (req, res) => {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const types = await services.biometric.getSupportedBiometricTypes(deviceId);

            res.json({
                success: true,
                data: types
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Optimize biometric settings for HR integration
     * POST /api/biometric/optimize-hr
     */
    router.post('/optimize-hr', async (req, res) => {
        try {
            const { deviceId, hrRequirements = {} } = req.body;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const optimizedConfig = await services.biometric.optimizeForHRIntegration(
                deviceId, 
                hrRequirements
            );

            res.json({
                success: true,
                message: 'Biometric settings optimized for HR integration',
                data: optimizedConfig
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Get template statistics
     * GET /api/biometric/statistics
     */
    router.get('/statistics', async (req, res) => {
        try {
            const { deviceId } = req.query;

            if (!deviceId) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId is required'
                });
            }

            const stats = await services.biometric.getTemplateStatistics(deviceId);

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
     * Extract template features
     * POST /api/biometric/extract
     */
    router.post('/extract', async (req, res) => {
        try {
            const { deviceId, rawData, biometricType } = req.body;

            if (!deviceId || !rawData || !biometricType) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId, rawData, and biometricType are required'
                });
            }

            const template = await services.biometric.extractTemplate(
                deviceId, 
                rawData, 
                biometricType
            );

            res.json({
                success: true,
                message: 'Template extracted successfully',
                data: template
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Convert template format
     * POST /api/biometric/convert
     */
    router.post('/convert', async (req, res) => {
        try {
            const { 
                deviceId, 
                template, 
                fromFormat, 
                toFormat,
                biometricType 
            } = req.body;

            if (!deviceId || !template || !fromFormat || !toFormat || !biometricType) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId, template, fromFormat, toFormat, and biometricType are required'
                });
            }

            const convertedTemplate = await services.biometric.convertTemplate(
                deviceId,
                template,
                fromFormat,
                toFormat,
                biometricType
            );

            res.json({
                success: true,
                message: 'Template converted successfully',
                data: convertedTemplate
            });
        } catch (error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    });

    /**
     * Batch template operations
     * POST /api/biometric/batch
     */
    router.post('/batch', async (req, res) => {
        try {
            const { deviceId, operation, templates, options = {} } = req.body;

            if (!deviceId || !operation || !templates) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'deviceId, operation, and templates are required'
                });
            }

            const results = await services.biometric.batchTemplateOperation(
                deviceId,
                operation,
                templates,
                options
            );

            res.json({
                success: true,
                message: `Batch ${operation} completed`,
                data: results
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