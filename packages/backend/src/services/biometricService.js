/**
 * Suprema Biometric Management Service
 * Handles fingerprint, card, and face biometric operations
 */

import { EventEmitter } from 'events';
import winston from 'winston';
import { createRequire } from 'module';

// Create require function for CommonJS modules
const require = createRequire(import.meta.url);
import fs from 'fs';
import path from 'path';

// Import protobuf services (these would come from the G-SDK)
const fingerService = require('../../biostar/service/finger_grpc_pb');
const cardService = require('../../biostar/service/card_grpc_pb');
const faceService = require('../../biostar/service/face_grpc_pb');

const fingerMessage = require('../../biostar/service/finger_pb');
const cardMessage = require('../../biostar/service/card_pb');
const faceMessage = require('../../biostar/service/face_pb');

class SupremaBiometricService extends EventEmitter {
    constructor(connectionService) {
        super();
        this.connectionService = connectionService;
        this.fingerClient = null;
        this.cardClient = null;
        this.faceClient = null;
        
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/biometric-service.log' })
            ]
        });

        this.initializeClients();
    }

    /**
     * Initialize all biometric service clients
     */
    initializeClients() {
        const gatewayAddress = `${this.connectionService.config.gateway.ip}:${this.connectionService.config.gateway.port}`;
        const credentials = this.connectionService.sslCreds;

        this.fingerClient = new fingerService.FingerClient(gatewayAddress, credentials);
        this.cardClient = new cardService.CardClient(gatewayAddress, credentials);
        this.faceClient = new faceService.FaceClient(gatewayAddress, credentials);

        this.logger.info('Biometric service clients initialized');
    }

    // ================ FINGERPRINT MANAGEMENT ================

    /**
     * Scan fingerprint from device
     * @param {string} deviceId - Device ID
     * @param {number} templateFormat - Template format (default: 1)
     * @param {number} qualityThreshold - Quality threshold (0-100, default: 50)
     * @returns {Promise<Buffer>} Fingerprint template data
     */
    async scanFingerprint(deviceId, templateFormat = 1, qualityThreshold = 50) {
        try {
            const req = new fingerMessage.ScanRequest();
            req.setDeviceid(deviceId);
            req.setTemplateformat(templateFormat);
            req.setQualitythreshold(qualityThreshold);

            return new Promise((resolve, reject) => {
                this.fingerClient.scan(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to scan fingerprint on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const templateData = response.getTemplatedata();
                    this.logger.info(`Fingerprint scanned successfully on device ${deviceId}, quality: ${qualityThreshold}`);
                    this.emit('fingerprint:scanned', { deviceId, templateData, qualityThreshold });
                    resolve(templateData);
                });
            });
        } catch (error) {
            this.logger.error('Error scanning fingerprint:', error);
            throw error;
        }
    }

    /**
     * Scan multiple fingerprint templates for enrollment
     * @param {string} deviceId - Device ID
     * @param {number} templateCount - Number of templates to scan (default: 2)
     * @param {number} templateFormat - Template format
     * @param {number} qualityThreshold - Quality threshold
     * @returns {Promise<Array>} Array of fingerprint templates
     */
    async scanMultipleFingerprints(deviceId, templateCount = 2, templateFormat = 1, qualityThreshold = 50) {
        try {
            const templates = [];
            
            for (let i = 0; i < templateCount; i++) {
                this.logger.info(`Scanning fingerprint template ${i + 1} of ${templateCount}`);
                const template = await this.scanFingerprint(deviceId, templateFormat, qualityThreshold);
                templates.push(template);
                
                // Brief pause between scans
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            this.logger.info(`Successfully scanned ${templates.length} fingerprint templates`);
            this.emit('fingerprints:multipleScanned', { deviceId, templates, count: templates.length });
            return templates;
        } catch (error) {
            this.logger.error('Error scanning multiple fingerprints:', error);
            throw error;
        }
    }

    /**
     * Get fingerprint image from device
     * @param {string} deviceId - Device ID
     * @returns {Promise<Buffer>} BMP image data
     */
    async getFingerprintImage(deviceId) {
        try {
            const req = new fingerMessage.GetImageRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.fingerClient.getImage(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get fingerprint image from device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const imageData = response.getBmpimage();
                    this.logger.info(`Retrieved fingerprint image from device ${deviceId}`);
                    resolve(imageData);
                });
            });
        } catch (error) {
            this.logger.error('Error getting fingerprint image:', error);
            throw error;
        }
    }

    /**
     * Save fingerprint image to file
     * @param {string} deviceId - Device ID
     * @param {string} outputPath - Output directory path
     * @param {string} fileName - File name (optional)
     * @returns {Promise<string>} Saved file path
     */
    async saveFingerprintImage(deviceId, outputPath, fileName = null) {
        try {
            const imageData = await this.getFingerprintImage(deviceId);
            
            if (!fileName) {
                fileName = `fingerprint_${deviceId}_${Date.now()}.bmp`;
            }
            
            const fullPath = path.join(outputPath, fileName);
            
            // Ensure directory exists
            if (!fs.existsSync(outputPath)) {
                fs.mkdirSync(outputPath, { recursive: true });
            }

            fs.writeFileSync(fullPath, imageData);
            
            this.logger.info(`Saved fingerprint image to ${fullPath}`);
            return fullPath;
        } catch (error) {
            this.logger.error('Error saving fingerprint image:', error);
            throw error;
        }
    }

    /**
     * Get fingerprint configuration
     * @param {string} deviceId - Device ID
     * @returns {Promise<Object>} Fingerprint configuration
     */
    async getFingerprintConfig(deviceId) {
        try {
            const req = new fingerMessage.GetConfigRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.fingerClient.getConfig(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get fingerprint config for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const config = response.toObject().config;
                    this.logger.info(`Retrieved fingerprint config from device ${deviceId}`);
                    resolve(config);
                });
            });
        } catch (error) {
            this.logger.error('Error getting fingerprint config:', error);
            throw error;
        }
    }

    /**
     * Set fingerprint configuration
     * @param {string} deviceId - Device ID
     * @param {Object} configData - Fingerprint configuration
     * @returns {Promise<boolean>} Success status
     */
    async setFingerprintConfig(deviceId, configData) {
        try {
            const config = new fingerMessage.FingerConfig();
            
            if (configData.securityLevel !== undefined) {
                config.setSecuritylevel(configData.securityLevel);
            }
            if (configData.fastMode !== undefined) {
                config.setFastmode(configData.fastMode);
            }
            if (configData.sensitivity !== undefined) {
                config.setSensitivity(configData.sensitivity);
            }
            if (configData.sensorMode !== undefined) {
                config.setSensormode(configData.sensorMode);
            }
            if (configData.templateFormat !== undefined) {
                config.setTemplateformat(configData.templateFormat);
            }
            if (configData.scanTimeout !== undefined) {
                config.setScantimeout(configData.scanTimeout);
            }

            const req = new fingerMessage.SetConfigRequest();
            req.setDeviceid(deviceId);
            req.setConfig(config);

            return new Promise((resolve, reject) => {
                this.fingerClient.setConfig(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to set fingerprint config for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Set fingerprint config for device ${deviceId}`);
                    this.emit('fingerprint:configSet', { deviceId, config: configData });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error setting fingerprint config:', error);
            throw error;
        }
    }

    // ================ CARD MANAGEMENT ================

    /**
     * Scan card from device
     * @param {string|number} deviceId - Device ID
     * @returns {Promise<Object>} Card data
     */
    async scanCard(deviceId) {
        try {
            // Convert deviceId to number if it's a string
            const numericDeviceId = typeof deviceId === 'string' ? parseInt(deviceId, 10) : deviceId;
            
            const req = new cardMessage.ScanRequest();
            req.setDeviceid(numericDeviceId);

            return new Promise((resolve, reject) => {
                this.cardClient.scan(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to scan card on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const responseObj = response.toObject();
                    this.logger.info(`Card scan response object:`, JSON.stringify(responseObj, (key, value) => {
                        // Handle Uint8Array/Buffer for logging
                        if (value instanceof Uint8Array) return `Uint8Array(${value.length}): ${Buffer.from(value).toString('hex')}`;
                        if (value && value.type === 'Buffer') return `Buffer: ${Buffer.from(value.data || []).toString('hex')}`;
                        return value;
                    }));

                    const cardData = responseObj.carddata;
                    this.logger.info(`Card scanned successfully on device ${deviceId}`);
                    this.emit('card:scanned', { deviceId, cardData });
                    resolve(cardData);
                });
            });
        } catch (error) {
            this.logger.error('Error scanning card:', error);
            throw error;
        }
    }

    /**
     * Write data to card
     * @param {string} deviceId - Device ID
     * @param {Object} cardData - Card data to write
     * @returns {Promise<boolean>} Success status
     */
    async writeCard(deviceId, cardData) {
        try {
            const req = new cardMessage.WriteRequest();
            req.setDeviceid(deviceId);
            
            // Set card data based on type
            if (cardData.smartCardData) {
                req.setSmartcarddata(cardData.smartCardData);
            }
            if (cardData.csnCardData) {
                req.setCsncarddata(cardData.csnCardData);
            }

            return new Promise((resolve, reject) => {
                this.cardClient.write(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to write card on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Card written successfully on device ${deviceId}`);
                    this.emit('card:written', { deviceId, cardData });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error writing card:', error);
            throw error;
        }
    }

    /**
     * Get card configuration
     * @param {string} deviceId - Device ID
     * @returns {Promise<Object>} Card configuration
     */
    async getCardConfig(deviceId) {
        try {
            const req = new cardMessage.GetConfigRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.cardClient.getConfig(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get card config for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const config = response.toObject().config;
                    this.logger.info(`Retrieved card config from device ${deviceId}`);
                    resolve(config);
                });
            });
        } catch (error) {
            this.logger.error('Error getting card config:', error);
            throw error;
        }
    }

    /**
     * Set card configuration
     * @param {string} deviceId - Device ID
     * @param {Object} configData - Card configuration
     * @returns {Promise<boolean>} Success status
     */
    async setCardConfig(deviceId, configData) {
        try {
            const config = new cardMessage.CardConfig();
            
            if (configData.dataType !== undefined) {
                config.setDatatype(configData.dataType);
            }
            if (configData.useWiegandFormat !== undefined) {
                config.setUsewiegandformat(configData.useWiegandFormat);
            }
            if (configData.useSecondaryKey !== undefined) {
                config.setUsesecondarykey(configData.useSecondaryKey);
            }
            if (configData.mifare !== undefined) {
                // Set Mifare configuration
                const mifareConfig = new cardMessage.MifareConfig();
                if (configData.mifare.primaryKey) {
                    mifareConfig.setPrimarykey(Buffer.from(configData.mifare.primaryKey, 'hex'));
                }
                if (configData.mifare.secondaryKey) {
                    mifareConfig.setSecondarykey(Buffer.from(configData.mifare.secondaryKey, 'hex'));
                }
                if (configData.mifare.startBlockIndex !== undefined) {
                    mifareConfig.setStartblockindex(configData.mifare.startBlockIndex);
                }
                config.setMifare(mifareConfig);
            }

            const req = new cardMessage.SetConfigRequest();
            req.setDeviceid(deviceId);
            req.setConfig(config);

            return new Promise((resolve, reject) => {
                this.cardClient.setConfig(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to set card config for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Set card config for device ${deviceId}`);
                    this.emit('card:configSet', { deviceId, config: configData });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error setting card config:', error);
            throw error;
        }
    }

    /**
     * Get card blacklist
     * @param {string} deviceId - Device ID
     * @returns {Promise<Array>} Blacklisted cards
     */
    async getCardBlacklist(deviceId) {
        try {
            const req = new cardMessage.GetBlacklistRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.cardClient.getBlacklist(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get card blacklist for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const blacklist = response.toObject().blacklistList;
                    this.logger.info(`Retrieved ${blacklist.length} blacklisted cards from device ${deviceId}`);
                    resolve(blacklist);
                });
            });
        } catch (error) {
            this.logger.error('Error getting card blacklist:', error);
            throw error;
        }
    }

    /**
     * Add cards to blacklist
     * @param {string} deviceId - Device ID
     * @param {Array} cardInfos - Array of card info objects
     * @returns {Promise<boolean>} Success status
     */
    async addCardToBlacklist(deviceId, cardInfos) {
        try {
            const blacklistItems = cardInfos.map(cardInfo => {
                const item = new cardMessage.BlacklistItem();
                item.setCardid(Buffer.from(cardInfo.cardId, 'utf-8'));
                item.setIssuecount(cardInfo.issueCount || 1);
                return item;
            });

            const req = new cardMessage.AddBlacklistRequest();
            req.setDeviceid(deviceId);
            req.setCardinfosList(blacklistItems);

            return new Promise((resolve, reject) => {
                this.cardClient.addBlacklist(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to add cards to blacklist on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Added ${cardInfos.length} cards to blacklist on device ${deviceId}`);
                    this.emit('card:blacklistAdded', { deviceId, cardInfos });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error adding cards to blacklist:', error);
            throw error;
        }
    }

    /**
     * Remove cards from blacklist
     * @param {string} deviceId - Device ID
     * @param {Array} cardInfos - Array of card info objects
     * @returns {Promise<boolean>} Success status
     */
    async removeCardFromBlacklist(deviceId, cardInfos) {
        try {
            const blacklistItems = cardInfos.map(cardInfo => {
                const item = new cardMessage.BlacklistItem();
                item.setCardid(Buffer.from(cardInfo.cardId, 'utf-8'));
                item.setIssuecount(cardInfo.issueCount || 1);
                return item;
            });

            const req = new cardMessage.DeleteBlacklistRequest();
            req.setDeviceid(deviceId);
            req.setCardinfosList(blacklistItems);

            return new Promise((resolve, reject) => {
                this.cardClient.deleteBlacklist(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to remove cards from blacklist on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Removed ${cardInfos.length} cards from blacklist on device ${deviceId}`);
                    this.emit('card:blacklistRemoved', { deviceId, cardInfos });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error removing cards from blacklist:', error);
            throw error;
        }
    }

    // ================ FACE MANAGEMENT ================

    /**
     * Scan face from device
     * @param {string} deviceId - Device ID
     * @param {number} enrollThreshold - Enrollment threshold (default: 4)
     * @returns {Promise<Object>} Face data
     */
    async scanFace(deviceId, enrollThreshold = 4) {
        try {
            const req = new faceMessage.ScanRequest();
            req.setDeviceid(deviceId);
            req.setEnrollthreshold(enrollThreshold);

            return new Promise((resolve, reject) => {
                this.faceClient.scan(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to scan face on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const faceData = response.toObject().facedata;
                    this.logger.info(`Face scanned successfully on device ${deviceId}, threshold: ${enrollThreshold}`);
                    this.emit('face:scanned', { deviceId, faceData, enrollThreshold });
                    resolve(faceData);
                });
            });
        } catch (error) {
            this.logger.error('Error scanning face:', error);
            throw error;
        }
    }

    /**
     * Get face configuration
     * @param {string} deviceId - Device ID
     * @returns {Promise<Object>} Face configuration
     */
    async getFaceConfig(deviceId) {
        try {
            const req = new faceMessage.GetConfigRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.faceClient.getConfig(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get face config for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const config = response.toObject().config;
                    this.logger.info(`Retrieved face config from device ${deviceId}`);
                    resolve(config);
                });
            });
        } catch (error) {
            this.logger.error('Error getting face config:', error);
            throw error;
        }
    }

    /**
     * Set face configuration
     * @param {string} deviceId - Device ID
     * @param {Object} configData - Face configuration
     * @returns {Promise<boolean>} Success status
     */
    async setFaceConfig(deviceId, configData) {
        try {
            const config = new faceMessage.FaceConfig();
            
            if (configData.securityLevel !== undefined) {
                config.setSecuritylevel(configData.securityLevel);
            }
            if (configData.lightCondition !== undefined) {
                config.setLightcondition(configData.lightCondition);
            }
            if (configData.enrollThreshold !== undefined) {
                config.setEnrollthreshold(configData.enrollThreshold);
            }
            if (configData.detectSensitivity !== undefined) {
                config.setDetectsensitivity(configData.detectSensitivity);
            }
            if (configData.lfdLevel !== undefined) {
                config.setLfdlevel(configData.lfdLevel);
            }
            if (configData.quickEnrollment !== undefined) {
                config.setQuickenrollment(configData.quickEnrollment);
            }
            if (configData.previewEnabled !== undefined) {
                config.setPreviewenabled(configData.previewEnabled);
            }

            const req = new faceMessage.SetConfigRequest();
            req.setDeviceid(deviceId);
            req.setConfig(config);

            return new Promise((resolve, reject) => {
                this.faceClient.setConfig(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to set face config for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Set face config for device ${deviceId}`);
                    this.emit('face:configSet', { deviceId, config: configData });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error setting face config:', error);
            throw error;
        }
    }

    // ================ BIOMETRIC TEMPLATE MANAGEMENT ================

    /**
     * Verify fingerprint template against device
     * @param {string} deviceId - Device ID
     * @param {Buffer} templateData - Template data to verify
     * @returns {Promise<Object>} Verification result
     */
    async verifyFingerprintTemplate(deviceId, templateData) {
        try {
            const req = new fingerMessage.VerifyRequest();
            req.setDeviceid(deviceId);
            req.setTemplatedata(templateData);

            return new Promise((resolve, reject) => {
                this.fingerClient.verify(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to verify fingerprint on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const result = response.toObject();
                    this.logger.info(`Fingerprint verification result: ${result.matched ? 'MATCH' : 'NO MATCH'}`);
                    resolve(result);
                });
            });
        } catch (error) {
            this.logger.error('Error verifying fingerprint template:', error);
            throw error;
        }
    }

    /**
     * Identify fingerprint template against device database
     * @param {string} deviceId - Device ID
     * @param {Buffer} templateData - Template data to identify
     * @returns {Promise<Object>} Identification result
     */
    async identifyFingerprintTemplate(deviceId, templateData) {
        try {
            const req = new fingerMessage.IdentifyRequest();
            req.setDeviceid(deviceId);
            req.setTemplatedata(templateData);

            return new Promise((resolve, reject) => {
                this.fingerClient.identify(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to identify fingerprint on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const result = response.toObject();
                    this.logger.info(`Fingerprint identification result: ${result.userid || 'NOT FOUND'}`);
                    resolve(result);
                });
            });
        } catch (error) {
            this.logger.error('Error identifying fingerprint template:', error);
            throw error;
        }
    }

    // ================ UTILITY METHODS ================

    /**
     * Test biometric capabilities of device
     * @param {string} deviceId - Device ID
     * @returns {Promise<Object>} Capability test results
     */
    async testBiometricCapabilities(deviceId) {
        try {
            const results = {
                deviceId,
                fingerprint: {
                    supported: false,
                    configAvailable: false,
                    error: null
                },
                card: {
                    supported: false,
                    configAvailable: false,
                    error: null
                },
                face: {
                    supported: false,
                    configAvailable: false,
                    error: null
                }
            };

            // Test fingerprint capability
            try {
                await this.getFingerprintConfig(deviceId);
                results.fingerprint.supported = true;
                results.fingerprint.configAvailable = true;
            } catch (error) {
                results.fingerprint.error = error.message;
            }

            // Test card capability
            try {
                await this.getCardConfig(deviceId);
                results.card.supported = true;
                results.card.configAvailable = true;
            } catch (error) {
                results.card.error = error.message;
            }

            // Test face capability
            try {
                await this.getFaceConfig(deviceId);
                results.face.supported = true;
                results.face.configAvailable = true;
            } catch (error) {
                results.face.error = error.message;
            }

            this.logger.info(`Biometric capability test completed for device ${deviceId}`);
            return results;
        } catch (error) {
            this.logger.error('Error testing biometric capabilities:', error);
            throw error;
        }
    }

    /**
     * Get comprehensive biometric status
     * @param {string} deviceId - Device ID
     * @returns {Promise<Object>} Biometric status
     */
    async getBiometricStatus(deviceId) {
        try {
            const [fingerprintConfig, cardConfig, faceConfig, cardBlacklist] = await Promise.allSettled([
                this.getFingerprintConfig(deviceId),
                this.getCardConfig(deviceId),
                this.getFaceConfig(deviceId),
                this.getCardBlacklist(deviceId)
            ]);

            const status = {
                deviceId,
                fingerprint: {
                    available: fingerprintConfig.status === 'fulfilled',
                    config: fingerprintConfig.status === 'fulfilled' ? fingerprintConfig.value : null,
                    error: fingerprintConfig.status === 'rejected' ? fingerprintConfig.reason.message : null
                },
                card: {
                    available: cardConfig.status === 'fulfilled',
                    config: cardConfig.status === 'fulfilled' ? cardConfig.value : null,
                    blacklistCount: cardBlacklist.status === 'fulfilled' ? cardBlacklist.value.length : 0,
                    error: cardConfig.status === 'rejected' ? cardConfig.reason.message : null
                },
                face: {
                    available: faceConfig.status === 'fulfilled',
                    config: faceConfig.status === 'fulfilled' ? faceConfig.value : null,
                    error: faceConfig.status === 'rejected' ? faceConfig.reason.message : null
                },
                timestamp: new Date().toISOString()
            };

            return status;
        } catch (error) {
            this.logger.error('Error getting biometric status:', error);
            throw error;
        }
    }

    /**
     * Optimize biometric settings for HR system integration
     * @param {string} deviceId - Device ID
     * @param {Object} options - Optimization options
     * @returns {Promise<boolean>} Success status
     */
    async optimizeForHRIntegration(deviceId, options = {}) {
        try {
            const optimizations = [];

            // Optimize fingerprint settings
            if (options.fingerprint !== false) {
                const fingerprintConfig = {
                    securityLevel: options.fingerprintSecurity || 4, // Balanced security
                    fastMode: options.fastMode !== false, // Enable for faster processing
                    sensitivity: options.sensitivity || 7, // Good balance
                    scanTimeout: options.scanTimeout || 10 // 10 seconds
                };
                
                optimizations.push(this.setFingerprintConfig(deviceId, fingerprintConfig));
            }

            // Optimize card settings
            if (options.card !== false) {
                const cardConfig = {
                    dataType: options.cardDataType || 0, // Use default card data type
                    useWiegandFormat: options.useWiegand || false
                };
                
                optimizations.push(this.setCardConfig(deviceId, cardConfig));
            }

            // Optimize face settings
            if (options.face !== false) {
                const faceConfig = {
                    securityLevel: options.faceSecurityLevel || 0, // Default security
                    enrollThreshold: options.faceEnrollThreshold || 4, // Default threshold
                    detectSensitivity: options.faceDetectSensitivity || 7, // Good sensitivity
                    quickEnrollment: options.quickFaceEnrollment !== false // Enable for speed
                };
                
                optimizations.push(this.setFaceConfig(deviceId, faceConfig));
            }

            await Promise.all(optimizations);

            this.logger.info(`Optimized biometric settings for HR integration on device ${deviceId}`);
            this.emit('biometric:optimized', { deviceId, options });
            
            return true;
        } catch (error) {
            this.logger.error('Error optimizing biometric settings:', error);
            throw error;
        }
    }

    /**
     * Get service status
     * @returns {Object} Service status
     */
    getServiceStatus() {
        return {
            fingerprintClientInitialized: !!this.fingerClient,
            cardClientInitialized: !!this.cardClient,
            faceClientInitialized: !!this.faceClient,
            timestamp: new Date().toISOString()
        };
    }
}

export default SupremaBiometricService;