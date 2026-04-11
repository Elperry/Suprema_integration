/**
 * Suprema Time Sync Service
 * Handles time and timezone synchronization for connected devices
 */

import { EventEmitter } from 'events';
import winston from 'winston';
import { createRequire } from 'module';

// Create require function for CommonJS modules
const require = createRequire(import.meta.url);

// Import protobuf services for time management
const timeService = require('../../biostar/service/time_grpc_pb');
const timeMessage = require('../../biostar/service/time_pb');

class SupremaTimeService extends EventEmitter {
    constructor(connectionService, database) {
        super();
        this.connectionService = connectionService;
        this.database = database;
        this.timeClient = null;
        
        // Default timezone offset in seconds
        // Egypt timezone: UTC+2 = 7200 seconds
        // Can be overridden via DEVICE_TIMEZONE_OFFSET environment variable
        this.defaultTimezoneOffset = parseInt(process.env.DEVICE_TIMEZONE_OFFSET) || 7200; // Egypt UTC+2
        
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/time-service.log' })
            ]
        });
        
        this.initializeClient();
    }

    /**
     * Initialize the time service gRPC client
     */
    initializeClient() {
        try {
            const gatewayAddress = `${this.connectionService.config.gateway.ip}:${this.connectionService.config.gateway.port}`;
            const credentials = this.connectionService.sslCreds;
            
            this.timeClient = new timeService.TimeClient(gatewayAddress, credentials);
            this.logger.info('Time service client initialized');
        } catch (error) {
            this.logger.error('Failed to initialize time service client:', error);
        }
    }

    /**
     * Get current time from a device
     * @param {number} deviceId - Device ID
     * @returns {Promise<Object>} Time information
     */
    async getDeviceTime(deviceId) {
        return new Promise((resolve, reject) => {
            if (!this.timeClient) {
                return reject(new Error('Time client not initialized'));
            }

            const request = new timeMessage.GetRequest();
            request.setDeviceid(deviceId);

            this.timeClient.get(request, (error, response) => {
                if (error) {
                    this.logger.error(`Failed to get time for device ${deviceId}:`, error);
                    return reject(error);
                }

                const gmtTime = response.getGmttime();
                const deviceDate = new Date(Number(gmtTime) * 1000);
                
                resolve({
                    deviceId,
                    gmtTime: gmtTime.toString(),
                    deviceDateTime: deviceDate.toISOString(),
                    serverDateTime: new Date().toISOString()
                });
            });
        });
    }

    /**
     * Set time on a single device
     * @param {number} deviceId - Device ID
     * @param {number} gmtTime - GMT time in seconds (optional, defaults to current time)
     * @returns {Promise<Object>} Result
     */
    async setDeviceTime(deviceId, gmtTime = null) {
        return new Promise((resolve, reject) => {
            if (!this.timeClient) {
                return reject(new Error('Time client not initialized'));
            }

            const request = new timeMessage.SetRequest();
            request.setDeviceid(deviceId);
            
            // Use current time if not specified
            const timeToSet = gmtTime || Math.floor(Date.now() / 1000);
            request.setGmttime(timeToSet);

            this.timeClient.set(request, (error, response) => {
                if (error) {
                    this.logger.error(`Failed to set time for device ${deviceId}:`, error);
                    return reject(error);
                }

                this.logger.info(`Time synchronized for device ${deviceId}`);
                resolve({
                    deviceId,
                    success: true,
                    setTime: new Date(timeToSet * 1000).toISOString()
                });
            });
        });
    }

    /**
     * Set time on multiple devices simultaneously
     * @param {number[]} deviceIds - Array of device IDs
     * @param {number} gmtTime - GMT time in seconds (optional, defaults to current time)
     * @returns {Promise<Object>} Results
     */
    async setTimeMulti(deviceIds, gmtTime = null) {
        return new Promise((resolve, reject) => {
            if (!this.timeClient) {
                return reject(new Error('Time client not initialized'));
            }

            const request = new timeMessage.SetMultiRequest();
            deviceIds.forEach(id => request.addDeviceids(id));
            
            // Use current UTC time if not specified
            const timeToSet = gmtTime || Math.floor(Date.now() / 1000);
            request.setGmttime(timeToSet);
            
            // Log the exact time being sent
            const dateToSet = new Date(timeToSet * 1000);
            this.logger.info(`Setting device time to UTC: ${dateToSet.toISOString()} (timestamp: ${timeToSet})`);

            this.timeClient.setMulti(request, (error, response) => {
                if (error) {
                    this.logger.error('Failed to set time for multiple devices:', error);
                    return reject(error);
                }

                const errors = response.getDeviceerrorsList();
                const results = {
                    success: errors.length === 0,
                    totalDevices: deviceIds.length,
                    setTime: new Date(timeToSet * 1000).toISOString(),
                    errors: errors.map(err => ({
                        deviceId: err.getDeviceid(),
                        code: err.getCode(),
                        message: err.getMsg ? err.getMsg() : 'Unknown error'
                    }))
                };

                this.logger.info(`Time synchronized for ${deviceIds.length - errors.length}/${deviceIds.length} devices`);
                resolve(results);
            });
        });
    }

    /**
     * Get timezone configuration for a device
     * @param {number} deviceId - Device ID
     * @returns {Promise<Object>} Timezone configuration
     */
    async getTimeConfig(deviceId) {
        return new Promise((resolve, reject) => {
            if (!this.timeClient) {
                return reject(new Error('Time client not initialized'));
            }

            const request = new timeMessage.GetConfigRequest();
            request.setDeviceid(deviceId);

            this.timeClient.getConfig(request, (error, response) => {
                if (error) {
                    this.logger.error(`Failed to get time config for device ${deviceId}:`, error);
                    return reject(error);
                }

                const config = response.getConfig();
                resolve({
                    deviceId,
                    timezone: config.getTimezone(),
                    timezoneOffsetHours: config.getTimezone() / 3600,
                    syncWithServer: config.getSyncwithserver()
                });
            });
        });
    }

    /**
     * Set timezone configuration for a device
     * @param {number} deviceId - Device ID
     * @param {number} timezoneOffset - Timezone offset in seconds
     * @param {boolean} syncWithServer - Whether to sync with server time
     * @returns {Promise<Object>} Result
     */
    async setTimeConfig(deviceId, timezoneOffset, syncWithServer = true) {
        return new Promise((resolve, reject) => {
            if (!this.timeClient) {
                return reject(new Error('Time client not initialized'));
            }

            const config = new timeMessage.TimeConfig();
            config.setTimezone(timezoneOffset);
            config.setSyncwithserver(syncWithServer);

            const request = new timeMessage.SetConfigRequest();
            request.setDeviceid(deviceId);
            request.setConfig(config);

            this.timeClient.setConfig(request, (error, response) => {
                if (error) {
                    this.logger.error(`Failed to set time config for device ${deviceId}:`, error);
                    return reject(error);
                }

                this.logger.info(`Timezone configured for device ${deviceId}: offset=${timezoneOffset}s, syncWithServer=${syncWithServer}`);
                resolve({
                    deviceId,
                    success: true,
                    timezone: timezoneOffset,
                    timezoneOffsetHours: timezoneOffset / 3600,
                    syncWithServer
                });
            });
        });
    }

    /**
     * Set timezone configuration for multiple devices
     * @param {number[]} deviceIds - Array of device IDs
     * @param {number} timezoneOffset - Timezone offset in seconds
     * @param {boolean} syncWithServer - Whether to sync with server time
     * @returns {Promise<Object>} Results
     */
    async setTimeConfigMulti(deviceIds, timezoneOffset, syncWithServer = true) {
        return new Promise((resolve, reject) => {
            if (!this.timeClient) {
                return reject(new Error('Time client not initialized'));
            }

            const config = new timeMessage.TimeConfig();
            config.setTimezone(timezoneOffset);
            config.setSyncwithserver(syncWithServer);

            const request = new timeMessage.SetConfigMultiRequest();
            deviceIds.forEach(id => request.addDeviceids(id));
            request.setConfig(config);

            this.timeClient.setConfigMulti(request, (error, response) => {
                if (error) {
                    this.logger.error('Failed to set time config for multiple devices:', error);
                    return reject(error);
                }

                const errors = response.getDeviceerrorsList();
                const results = {
                    success: errors.length === 0,
                    totalDevices: deviceIds.length,
                    timezone: timezoneOffset,
                    timezoneOffsetHours: timezoneOffset / 3600,
                    syncWithServer,
                    errors: errors.map(err => ({
                        deviceId: err.getDeviceid(),
                        code: err.getCode(),
                        message: err.getMsg ? err.getMsg() : 'Unknown error'
                    }))
                };

                this.logger.info(`Timezone configured for ${deviceIds.length - errors.length}/${deviceIds.length} devices`);
                resolve(results);
            });
        });
    }

    /**
     * Sync time and timezone for all connected devices
     * This is the main method called on backend startup
     * @param {number} timezoneOffset - Timezone offset in seconds (optional, uses env default)
     * @returns {Promise<Object>} Sync results
     */
    async syncAllDevices(timezoneOffset = null) {
        try {
            const tz = timezoneOffset ?? this.defaultTimezoneOffset;
            const connectedDevices = await this.connectionService.getConnectedDevices();
            
            if (!connectedDevices || connectedDevices.length === 0) {
                this.logger.warn('No connected devices found for time sync');
                return {
                    success: true,
                    message: 'No devices to sync',
                    devicesCount: 0
                };
            }

            // Extract device IDs
            const deviceIds = connectedDevices.map(device => {
                if (device.toObject) {
                    return device.toObject().deviceid;
                }
                return device.deviceid || device.id;
            }).filter(id => id);

            if (deviceIds.length === 0) {
                this.logger.warn('No valid device IDs found for time sync');
                return {
                    success: true,
                    message: 'No valid device IDs',
                    devicesCount: 0
                };
            }

            this.logger.info(`Starting time sync for ${deviceIds.length} devices...`);
            this.logger.info(`Timezone offset: ${tz} seconds (UTC${tz >= 0 ? '+' : ''}${tz / 3600} hours) - Egypt`);
            
            // Get current time for logging
            const currentTimeSeconds = Math.floor(Date.now() / 1000);
            const currentDate = new Date();
            this.logger.info(`Current UTC time: ${currentDate.toISOString()}`);
            this.logger.info(`Current timestamp (seconds): ${currentTimeSeconds}`);
            this.logger.info(`Device will display: UTC${tz >= 0 ? '+' : ''}${tz / 3600} time`);

            // Step 1: Set timezone configuration for all devices
            let configResult = { success: true, errors: [] };
            try {
                configResult = await this.setTimeConfigMulti(deviceIds, tz, true);
            } catch (error) {
                this.logger.error('Failed to set timezone config:', error);
                configResult = { success: false, errors: [{ message: error.message }] };
            }

            // Step 2: Sync time for all devices
            let timeResult = { success: true, errors: [] };
            try {
                timeResult = await this.setTimeMulti(deviceIds);
            } catch (error) {
                this.logger.error('Failed to sync time:', error);
                timeResult = { success: false, errors: [{ message: error.message }] };
            }

            const overallSuccess = configResult.success && timeResult.success;
            const result = {
                success: overallSuccess,
                devicesCount: deviceIds.length,
                deviceIds,
                serverTime: new Date().toISOString(),
                timezone: {
                    offsetSeconds: tz,
                    offsetHours: tz / 3600,
                    description: this.getTimezoneDescription(tz)
                },
                configSync: {
                    success: configResult.success,
                    errors: configResult.errors || []
                },
                timeSync: {
                    success: timeResult.success,
                    setTime: timeResult.setTime,
                    errors: timeResult.errors || []
                }
            };

            if (overallSuccess) {
                this.logger.info(`✓ Time sync completed successfully for ${deviceIds.length} devices`);
            } else {
                this.logger.warn(`Time sync completed with errors for some devices`);
            }

            this.emit('time:synced', result);
            return result;

        } catch (error) {
            this.logger.error('Failed to sync all devices:', error);
            throw error;
        }
    }

    /**
     * Get human-readable timezone description
     * @param {number} offsetSeconds - Timezone offset in seconds
     * @returns {string} Description
     */
    getTimezoneDescription(offsetSeconds) {
        const hours = Math.abs(offsetSeconds) / 3600;
        const sign = offsetSeconds >= 0 ? '+' : '-';
        return `UTC${sign}${hours}`;
    }

    /**
     * Get system timezone offset in seconds
     * @returns {number} Timezone offset in seconds
     */
    getSystemTimezoneOffset() {
        // JavaScript getTimezoneOffset returns minutes, and is inverted (positive for west of UTC)
        const offsetMinutes = new Date().getTimezoneOffset();
        return -offsetMinutes * 60; // Convert to seconds and correct sign
    }

    /**
     * Sync devices with system timezone
     * Uses the server's local timezone
     * @returns {Promise<Object>} Sync results
     */
    async syncWithSystemTimezone() {
        const systemOffset = this.getSystemTimezoneOffset();
        this.logger.info(`Using system timezone: ${this.getTimezoneDescription(systemOffset)}`);
        return this.syncAllDevices(systemOffset);
    }
}

export default SupremaTimeService;
