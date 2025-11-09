/**
 * Suprema Time & Attendance (T&A) Service
 * Handles T&A configuration, log retrieval, and HR system integration
 */

const EventEmitter = require('events');
const winston = require('winston');
const moment = require('moment');

// Import protobuf services (these would come from the G-SDK)
const tnaService = require('../../biostar/service/tna_grpc_pb');
const tnaMessage = require('../../biostar/service/tna_pb');

class SupremaTNAService extends EventEmitter {
    constructor(connectionService, eventService) {
        super();
        this.connectionService = connectionService;
        this.eventService = eventService;
        this.tnaClient = null;
        
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/tna-service.log' })
            ]
        });

        this.initializeClient();
        this.setupEventListeners();
    }

    /**
     * Initialize TNA service client
     */
    initializeClient() {
        const gatewayAddress = `${this.connectionService.config.gateway.ip}:${this.connectionService.config.gateway.port}`;
        const credentials = this.connectionService.sslCreds;

        this.tnaClient = new tnaService.TNAClient(gatewayAddress, credentials);
        this.logger.info('T&A service client initialized');
    }

    /**
     * Setup event listeners for T&A events
     */
    setupEventListeners() {
        if (this.eventService) {
            this.eventService.on('attendance:event', (event) => {
                this.processAttendanceEvent(event);
            });

            this.eventService.on('event:received', (event) => {
                if (event.eventType === 'attendance') {
                    this.processAttendanceEvent(event);
                }
            });
        }
    }

    // ================ T&A CONFIGURATION ================

    /**
     * Get T&A configuration from device
     * @param {string} deviceId - Device ID
     * @returns {Promise<Object>} T&A configuration
     */
    async getTNAConfig(deviceId) {
        try {
            const req = new tnaMessage.GetConfigRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.tnaClient.getConfig(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get T&A config for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const config = response.toObject().config;
                    this.logger.info(`Retrieved T&A config from device ${deviceId}`);
                    resolve(config);
                });
            });
        } catch (error) {
            this.logger.error('Error getting T&A config:', error);
            throw error;
        }
    }

    /**
     * Set T&A configuration for device
     * @param {string} deviceId - Device ID
     * @param {Object} configData - T&A configuration
     * @returns {Promise<boolean>} Success status
     */
    async setTNAConfig(deviceId, configData) {
        try {
            const config = new tnaMessage.TNAConfig();
            
            // Set T&A mode
            config.setMode(configData.mode || tnaMessage.Mode.BY_USER);
            
            // Set labels for T&A keys
            if (configData.labels && configData.labels.length > 0) {
                config.setLabelsList(configData.labels);
            } else {
                // Default labels
                config.setLabelsList(['In', 'Out', 'Break Out', 'Break In']);
            }

            // Set required flag
            config.setIsrequired(configData.isRequired || false);

            // Set T&A key for fixed mode
            if (configData.mode === tnaMessage.Mode.FIXED && configData.key) {
                config.setKey(configData.key);
            }

            // Set schedules for BY_SCHEDULE mode
            if (configData.mode === tnaMessage.Mode.BY_SCHEDULE && configData.schedules) {
                config.setSchedulesList(configData.schedules);
            }

            const req = new tnaMessage.SetConfigRequest();
            req.setDeviceid(deviceId);
            req.setConfig(config);

            return new Promise((resolve, reject) => {
                this.tnaClient.setConfig(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to set T&A config for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Set T&A config for device ${deviceId}`);
                    this.emit('tna:configSet', { deviceId, config: configData });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error setting T&A config:', error);
            throw error;
        }
    }

    /**
     * Set T&A configuration to BY_USER mode (most flexible)
     * @param {string} deviceId - Device ID
     * @param {Array} labels - Custom labels for T&A keys
     * @param {boolean} isRequired - Whether T&A key selection is required
     * @returns {Promise<boolean>} Success status
     */
    async setByUserMode(deviceId, labels = null, isRequired = false) {
        const config = {
            mode: tnaMessage.Mode.BY_USER,
            labels: labels || ['Clock In', 'Clock Out', 'Break Start', 'Break End', 'Overtime Start', 'Overtime End'],
            isRequired: isRequired
        };

        return await this.setTNAConfig(deviceId, config);
    }

    /**
     * Set T&A configuration to FIXED mode
     * @param {string} deviceId - Device ID  
     * @param {number} key - Fixed T&A key
     * @param {Array} labels - Custom labels for T&A keys
     * @returns {Promise<boolean>} Success status
     */
    async setFixedMode(deviceId, key, labels = null) {
        const config = {
            mode: tnaMessage.Mode.FIXED,
            key: key,
            labels: labels || ['Clock In', 'Clock Out', 'Break Start', 'Break End']
        };

        return await this.setTNAConfig(deviceId, config);
    }

    /**
     * Set T&A configuration to BY_SCHEDULE mode
     * @param {string} deviceId - Device ID
     * @param {Array} schedules - Schedule configuration for each T&A key
     * @param {Array} labels - Custom labels for T&A keys
     * @returns {Promise<boolean>} Success status
     */
    async setByScheduleMode(deviceId, schedules, labels = null) {
        const config = {
            mode: tnaMessage.Mode.BY_SCHEDULE,
            schedules: schedules,
            labels: labels || ['Clock In', 'Clock Out', 'Break Start', 'Break End']
        };

        return await this.setTNAConfig(deviceId, config);
    }

    /**
     * Set T&A configuration to LAST_CHOICE mode
     * @param {string} deviceId - Device ID
     * @param {Array} labels - Custom labels for T&A keys
     * @returns {Promise<boolean>} Success status
     */
    async setLastChoiceMode(deviceId, labels = null) {
        const config = {
            mode: tnaMessage.Mode.LAST_CHOICE,
            labels: labels || ['Clock In', 'Clock Out', 'Break Start', 'Break End']
        };

        return await this.setTNAConfig(deviceId, config);
    }

    // ================ T&A LOG RETRIEVAL ================

    /**
     * Get T&A logs from device
     * @param {string} deviceId - Device ID
     * @param {number} startEventId - Starting event ID
     * @param {number} maxEvents - Maximum number of events to retrieve
     * @returns {Promise<Array>} Array of T&A events
     */
    async getTNALogs(deviceId, startEventId = 0, maxEvents = 1000) {
        try {
            const req = new tnaMessage.GetTNALogRequest();
            req.setDeviceid(deviceId);
            req.setStarteventid(startEventId);
            req.setMaxnumoflog(maxEvents);

            return new Promise((resolve, reject) => {
                this.tnaClient.getTNALog(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get T&A logs for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const events = response.toObject().eventsList;
                    const enhancedEvents = events.map(event => this.enhanceTNAEvent(event, deviceId));
                    
                    this.logger.info(`Retrieved ${enhancedEvents.length} T&A events from device ${deviceId}`);
                    resolve(enhancedEvents);
                });
            });
        } catch (error) {
            this.logger.error('Error getting T&A logs:', error);
            throw error;
        }
    }

    /**
     * Get filtered T&A logs
     * @param {string} deviceId - Device ID
     * @param {Object} filters - T&A event filters
     * @returns {Promise<Array>} Filtered T&A events
     */
    async getFilteredTNALogs(deviceId, filters = {}) {
        try {
            const events = await this.getTNALogs(deviceId, filters.startEventId, filters.maxEvents);
            
            let filteredEvents = events;

            // Filter by user IDs
            if (filters.userIds && filters.userIds.length > 0) {
                filteredEvents = filteredEvents.filter(event => 
                    filters.userIds.includes(event.userid));
            }

            // Filter by T&A keys
            if (filters.tnaKeys && filters.tnaKeys.length > 0) {
                filteredEvents = filteredEvents.filter(event => 
                    filters.tnaKeys.includes(event.tnakey));
            }

            // Filter by date range
            if (filters.startDate || filters.endDate) {
                filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.datetime * 1000);
                    if (filters.startDate && eventDate < new Date(filters.startDate)) return false;
                    if (filters.endDate && eventDate > new Date(filters.endDate)) return false;
                    return true;
                });
            }

            // Filter by work shifts
            if (filters.shifts && filters.shifts.length > 0) {
                filteredEvents = filteredEvents.filter(event => {
                    const eventHour = new Date(event.datetime * 1000).getHours();
                    return filters.shifts.some(shift => 
                        eventHour >= shift.startHour && eventHour <= shift.endHour);
                });
            }

            this.logger.info(`Filtered ${filteredEvents.length} T&A events from ${events.length} total events`);
            return filteredEvents;
        } catch (error) {
            this.logger.error('Error getting filtered T&A logs:', error);
            throw error;
        }
    }

    /**
     * Get T&A logs for specific users and date range
     * @param {string} deviceId - Device ID
     * @param {Array} userIds - Array of user IDs
     * @param {string} startDate - Start date (YYYY-MM-DD)
     * @param {string} endDate - End date (YYYY-MM-DD)
     * @returns {Promise<Array>} User-specific T&A events
     */
    async getUserTNALogs(deviceId, userIds, startDate, endDate) {
        return await this.getFilteredTNALogs(deviceId, {
            userIds: userIds,
            startDate: startDate,
            endDate: endDate,
            maxEvents: 10000
        });
    }

    // ================ T&A EVENT PROCESSING ================

    /**
     * Enhance T&A event with additional information
     * @param {Object} event - Raw T&A event
     * @param {string} deviceId - Device ID
     * @returns {Object} Enhanced T&A event
     */
    enhanceTNAEvent(event, deviceId) {
        const enhanced = { ...event };
        
        // Add readable timestamp
        enhanced.timestamp = new Date(event.datetime * 1000).toISOString();
        enhanced.dateString = moment(event.datetime * 1000).format('YYYY-MM-DD');
        enhanced.timeString = moment(event.datetime * 1000).format('HH:mm:ss');
        
        // Add T&A key label
        enhanced.tnaLabel = this.getTNAKeyLabel(event.tnakey);
        
        // Add event type classification
        enhanced.eventType = this.classifyTNAEventType(event.tnakey);
        
        // Add device ID
        enhanced.deviceId = deviceId;

        return enhanced;
    }

    /**
     * Get T&A key label
     * @param {number} tnaKey - T&A key number
     * @returns {string} T&A key label
     */
    getTNAKeyLabel(tnaKey) {
        const defaultLabels = {
            1: 'Clock In',
            2: 'Clock Out', 
            3: 'Break Start',
            4: 'Break End',
            5: 'Overtime Start',
            6: 'Overtime End'
        };

        return defaultLabels[tnaKey] || `Key ${tnaKey}`;
    }

    /**
     * Classify T&A event type
     * @param {number} tnaKey - T&A key number
     * @returns {string} Event type
     */
    classifyTNAEventType(tnaKey) {
        const eventTypes = {
            1: 'clock_in',
            2: 'clock_out',
            3: 'break_start',
            4: 'break_end',
            5: 'overtime_start',
            6: 'overtime_end'
        };

        return eventTypes[tnaKey] || 'other';
    }

    /**
     * Process real-time attendance event
     * @param {Object} event - Attendance event
     */
    processAttendanceEvent(event) {
        try {
            const enhancedEvent = this.enhanceTNAEvent(event, event.deviceid);
            
            this.logger.info('Processing T&A event:', enhancedEvent);
            this.emit('tna:eventProcessed', enhancedEvent);
            
            // Emit specific T&A event types
            this.emit(`tna:${enhancedEvent.eventType}`, enhancedEvent);
            
            // Process for HR integration
            this.processForHRIntegration(enhancedEvent);
        } catch (error) {
            this.logger.error('Error processing attendance event:', error);
        }
    }

    /**
     * Process T&A event for HR integration
     * @param {Object} event - Enhanced T&A event
     */
    processForHRIntegration(event) {
        try {
            // Create HR-friendly event format
            const hrEvent = {
                employeeId: event.userid,
                deviceId: event.deviceId,
                timestamp: event.timestamp,
                date: event.dateString,
                time: event.timeString,
                eventType: event.eventType,
                tnaKey: event.tnakey,
                tnaLabel: event.tnaLabel,
                rawEventId: event.id
            };

            this.emit('tna:hrEvent', hrEvent);
        } catch (error) {
            this.logger.error('Error processing T&A event for HR integration:', error);
        }
    }

    // ================ T&A ANALYTICS ================

    /**
     * Generate T&A statistics for users
     * @param {string} deviceId - Device ID
     * @param {Object} options - Analysis options
     * @returns {Promise<Object>} T&A statistics
     */
    async generateTNAStatistics(deviceId, options = {}) {
        try {
            const events = await this.getFilteredTNALogs(deviceId, {
                startDate: options.startDate,
                endDate: options.endDate,
                userIds: options.userIds,
                maxEvents: 10000
            });

            const stats = {
                deviceId,
                period: {
                    startDate: options.startDate,
                    endDate: options.endDate
                },
                totalEvents: events.length,
                uniqueUsers: new Set(events.map(e => e.userid)).size,
                eventsByType: {},
                eventsByUser: {},
                dailyStatistics: {},
                hourlyDistribution: Array(24).fill(0),
                generatedAt: new Date().toISOString()
            };

            // Process events for statistics
            events.forEach(event => {
                // Count by event type
                stats.eventsByType[event.eventType] = (stats.eventsByType[event.eventType] || 0) + 1;
                
                // Count by user
                if (!stats.eventsByUser[event.userid]) {
                    stats.eventsByUser[event.userid] = {
                        totalEvents: 0,
                        eventsByType: {}
                    };
                }
                stats.eventsByUser[event.userid].totalEvents++;
                stats.eventsByUser[event.userid].eventsByType[event.eventType] = 
                    (stats.eventsByUser[event.userid].eventsByType[event.eventType] || 0) + 1;

                // Daily statistics
                const dateKey = event.dateString;
                if (!stats.dailyStatistics[dateKey]) {
                    stats.dailyStatistics[dateKey] = {
                        totalEvents: 0,
                        uniqueUsers: new Set(),
                        eventsByType: {}
                    };
                }
                stats.dailyStatistics[dateKey].totalEvents++;
                stats.dailyStatistics[dateKey].uniqueUsers.add(event.userid);
                stats.dailyStatistics[dateKey].eventsByType[event.eventType] = 
                    (stats.dailyStatistics[dateKey].eventsByType[event.eventType] || 0) + 1;

                // Hourly distribution
                const hour = new Date(event.datetime * 1000).getHours();
                stats.hourlyDistribution[hour]++;
            });

            // Convert Sets to counts in daily statistics
            Object.keys(stats.dailyStatistics).forEach(date => {
                stats.dailyStatistics[date].uniqueUsers = stats.dailyStatistics[date].uniqueUsers.size;
            });

            return stats;
        } catch (error) {
            this.logger.error('Error generating T&A statistics:', error);
            throw error;
        }
    }

    /**
     * Calculate work hours for users
     * @param {string} deviceId - Device ID
     * @param {Array} userIds - User IDs
     * @param {string} startDate - Start date
     * @param {string} endDate - End date
     * @returns {Promise<Object>} Work hours calculation
     */
    async calculateWorkHours(deviceId, userIds, startDate, endDate) {
        try {
            const events = await this.getUserTNALogs(deviceId, userIds, startDate, endDate);
            
            const workHours = {};

            userIds.forEach(userId => {
                workHours[userId] = {
                    totalWorkHours: 0,
                    totalBreakHours: 0,
                    totalOvertimeHours: 0,
                    dailyHours: {},
                    sessions: []
                };
            });

            // Group events by user and date
            const eventsByUserDate = {};
            events.forEach(event => {
                const key = `${event.userid}_${event.dateString}`;
                if (!eventsByUserDate[key]) {
                    eventsByUserDate[key] = [];
                }
                eventsByUserDate[key].push(event);
            });

            // Calculate work hours for each user-date combination
            Object.keys(eventsByUserDate).forEach(key => {
                const [userId, date] = key.split('_');
                const dayEvents = eventsByUserDate[key].sort((a, b) => a.datetime - b.datetime);
                
                const dayHours = this.calculateDayWorkHours(dayEvents);
                
                workHours[userId].dailyHours[date] = dayHours;
                workHours[userId].totalWorkHours += dayHours.workHours;
                workHours[userId].totalBreakHours += dayHours.breakHours;
                workHours[userId].totalOvertimeHours += dayHours.overtimeHours;
                workHours[userId].sessions.push(...dayHours.sessions);
            });

            return workHours;
        } catch (error) {
            this.logger.error('Error calculating work hours:', error);
            throw error;
        }
    }

    /**
     * Calculate work hours for a single day
     * @param {Array} dayEvents - Events for a single day, sorted by time
     * @returns {Object} Day work hours calculation
     */
    calculateDayWorkHours(dayEvents) {
        const result = {
            workHours: 0,
            breakHours: 0,
            overtimeHours: 0,
            sessions: []
        };

        let currentSession = null;
        let breakStart = null;

        dayEvents.forEach(event => {
            const eventTime = new Date(event.datetime * 1000);

            switch (event.eventType) {
                case 'clock_in':
                    if (!currentSession) {
                        currentSession = {
                            type: 'work',
                            startTime: eventTime,
                            endTime: null,
                            duration: 0
                        };
                    }
                    break;

                case 'clock_out':
                    if (currentSession && !currentSession.endTime) {
                        currentSession.endTime = eventTime;
                        currentSession.duration = (eventTime - currentSession.startTime) / (1000 * 60 * 60); // hours
                        result.workHours += currentSession.duration;
                        result.sessions.push(currentSession);
                        currentSession = null;
                    }
                    break;

                case 'break_start':
                    breakStart = eventTime;
                    break;

                case 'break_end':
                    if (breakStart) {
                        const breakDuration = (eventTime - breakStart) / (1000 * 60 * 60); // hours
                        result.breakHours += breakDuration;
                        result.sessions.push({
                            type: 'break',
                            startTime: breakStart,
                            endTime: eventTime,
                            duration: breakDuration
                        });
                        breakStart = null;
                    }
                    break;

                case 'overtime_start':
                    currentSession = {
                        type: 'overtime',
                        startTime: eventTime,
                        endTime: null,
                        duration: 0
                    };
                    break;

                case 'overtime_end':
                    if (currentSession && currentSession.type === 'overtime' && !currentSession.endTime) {
                        currentSession.endTime = eventTime;
                        currentSession.duration = (eventTime - currentSession.startTime) / (1000 * 60 * 60); // hours
                        result.overtimeHours += currentSession.duration;
                        result.sessions.push(currentSession);
                        currentSession = null;
                    }
                    break;
            }
        });

        return result;
    }

    // ================ UTILITY METHODS ================

    /**
     * Export T&A data to CSV format
     * @param {Array} events - T&A events to export
     * @returns {string} CSV content
     */
    exportTNAToCSV(events) {
        try {
            const headers = [
                'User ID',
                'Device ID', 
                'Date',
                'Time',
                'Event Type',
                'T&A Key',
                'T&A Label',
                'Timestamp'
            ];

            const csvContent = [
                headers.join(','),
                ...events.map(event => [
                    event.userid,
                    event.deviceId,
                    event.dateString,
                    event.timeString,
                    event.eventType,
                    event.tnakey,
                    `"${event.tnaLabel}"`,
                    event.timestamp
                ].join(','))
            ].join('\n');

            return csvContent;
        } catch (error) {
            this.logger.error('Error exporting T&A data to CSV:', error);
            throw error;
        }
    }

    /**
     * Get T&A service status
     * @returns {Object} Service status
     */
    getServiceStatus() {
        return {
            clientInitialized: !!this.tnaClient,
            eventListenersSetup: !!this.eventService,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Validate T&A configuration
     * @param {Object} configData - Configuration to validate
     * @returns {Object} Validation result
     */
    validateTNAConfig(configData) {
        const result = {
            isValid: true,
            errors: [],
            warnings: []
        };

        // Validate mode
        const validModes = [
            tnaMessage.Mode.BY_USER,
            tnaMessage.Mode.LAST_CHOICE,
            tnaMessage.Mode.BY_SCHEDULE,
            tnaMessage.Mode.FIXED
        ];

        if (!validModes.includes(configData.mode)) {
            result.isValid = false;
            result.errors.push('Invalid T&A mode specified');
        }

        // Validate labels
        if (configData.labels && configData.labels.length === 0) {
            result.warnings.push('No T&A labels provided, defaults will be used');
        }

        // Validate fixed mode requirements
        if (configData.mode === tnaMessage.Mode.FIXED && !configData.key) {
            result.isValid = false;
            result.errors.push('Fixed mode requires a T&A key to be specified');
        }

        // Validate schedule mode requirements
        if (configData.mode === tnaMessage.Mode.BY_SCHEDULE && (!configData.schedules || configData.schedules.length === 0)) {
            result.isValid = false;
            result.errors.push('Schedule mode requires schedule configuration');
        }

        return result;
    }
}

module.exports = SupremaTNAService;