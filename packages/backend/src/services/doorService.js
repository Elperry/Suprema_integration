/**
 * Suprema Door and Access Control Service
 * Handles door configuration, access control, scheduling, and manual door operations
 */

const EventEmitter = require('events');
const winston = require('winston');

// Import protobuf services (these would come from the G-SDK)
const doorService = require('../../biostar/service/door_grpc_pb');
const accessService = require('../../biostar/service/access_grpc_pb');
const scheduleService = require('../../biostar/service/schedule_grpc_pb');
const zoneService = require('../../biostar/service/zone_grpc_pb');

const doorMessage = require('../../biostar/service/door_pb');
const accessMessage = require('../../biostar/service/access_pb');
const scheduleMessage = require('../../biostar/service/schedule_pb');
const zoneMessage = require('../../biostar/service/zone_pb');
const deviceMessage = require('../../biostar/service/device_pb');

class SupremaDoorService extends EventEmitter {
    constructor(connectionService) {
        super();
        this.connectionService = connectionService;
        this.doorClient = null;
        this.accessClient = null;
        this.scheduleClient = null;
        this.zoneClient = null;
        
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/door-service.log' })
            ]
        });

        this.initializeClients();
    }

    /**
     * Initialize all service clients
     */
    initializeClients() {
        const gatewayAddress = `${this.connectionService.config.gateway.ip}:${this.connectionService.config.gateway.port}`;
        const credentials = this.connectionService.sslCreds;

        this.doorClient = new doorService.DoorClient(gatewayAddress, credentials);
        this.accessClient = new accessService.AccessClient(gatewayAddress, credentials);
        this.scheduleClient = new scheduleService.ScheduleClient(gatewayAddress, credentials);
        
        // Note: zone.proto doesn't define any gRPC services, only messages
        // Zone functionality is provided through specific zone type services like:
        // - APBZoneClient (from apb_zone_grpc_pb)
        // - FireZoneClient (from fire_zone_grpc_pb)
        // - IntrusionZoneClient (from intrusion_zone_grpc_pb)
        // this.zoneClient = new zoneService.ZoneClient(gatewayAddress, credentials);

        this.logger.info('Door service clients initialized');
    }

    // ================ DOOR MANAGEMENT ================

    /**
     * Create a door configuration
     * @param {string} deviceId - Device ID
     * @param {Object} doorConfig - Door configuration
     * @returns {Promise<boolean>} Success status
     */
    async createDoor(deviceId, doorConfig) {
        try {
            // Create relay configuration
            const relay = new doorMessage.Relay();
            relay.setDeviceid(doorConfig.relay.deviceId || deviceId);
            relay.setPort(doorConfig.relay.port || 0);

            // Create sensor configuration
            const sensor = new doorMessage.Sensor();
            sensor.setDeviceid(doorConfig.sensor.deviceId || deviceId);
            sensor.setPort(doorConfig.sensor.port || 0);
            sensor.setType(doorConfig.sensor.type || deviceMessage.SwitchType.NORMALLY_OPEN);

            // Create exit button configuration (optional)
            let exitButton = null;
            if (doorConfig.exitButton) {
                exitButton = new doorMessage.ExitButton();
                exitButton.setDeviceid(doorConfig.exitButton.deviceId || deviceId);
                exitButton.setPort(doorConfig.exitButton.port || 1);
                exitButton.setType(doorConfig.exitButton.type || deviceMessage.SwitchType.NORMALLY_OPEN);
            }

            // Create door info
            const doorInfo = new doorMessage.DoorInfo();
            doorInfo.setDoorid(doorConfig.doorId);
            doorInfo.setName(doorConfig.name || `Door ${doorConfig.doorId}`);
            doorInfo.setEntrydeviceid(deviceId);
            doorInfo.setRelay(relay);
            doorInfo.setSensor(sensor);
            if (exitButton) doorInfo.setButton(exitButton);
            
            // Set door timing configurations
            doorInfo.setAutolocktimeout(doorConfig.autoLockTimeout || 3);
            doorInfo.setHeldopentimeout(doorConfig.heldOpenTimeout || 10);
            doorInfo.setUnlockduration(doorConfig.unlockDuration || 5);
            
            // Set door type and mode
            if (doorConfig.doorType) doorInfo.setDoortype(doorConfig.doorType);
            if (doorConfig.lockFlag) doorInfo.setLockflag(doorConfig.lockFlag);

            const req = new doorMessage.AddRequest();
            req.setDeviceid(deviceId);
            req.setDoorsList([doorInfo]);

            return new Promise((resolve, reject) => {
                this.doorClient.add(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to create door ${doorConfig.doorId} on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Created door ${doorConfig.doorId} on device ${deviceId}`);
                    this.emit('door:created', { deviceId, doorId: doorConfig.doorId });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error creating door:', error);
            throw error;
        }
    }

    /**
     * Get door list from device
     * @param {string} deviceId - Device ID
     * @returns {Promise<Array>} List of doors
     */
    async getDoorList(deviceId) {
        try {
            const req = new doorMessage.GetListRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.doorClient.getList(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get door list for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const doors = response.toObject().doorsList;
                    this.logger.info(`Retrieved ${doors.length} doors from device ${deviceId}`);
                    resolve(doors);
                });
            });
        } catch (error) {
            this.logger.error('Error getting door list:', error);
            throw error;
        }
    }

    /**
     * Get detailed door information
     * @param {string} deviceId - Device ID
     * @param {Array} doorIds - Array of door IDs
     * @returns {Promise<Array>} Door information array
     */
    async getDoors(deviceId, doorIds) {
        try {
            const req = new doorMessage.GetRequest();
            req.setDeviceid(deviceId);
            req.setDooridsList(doorIds);

            return new Promise((resolve, reject) => {
                this.doorClient.get(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get doors for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const doors = response.toObject().doorsList;
                    resolve(doors);
                });
            });
        } catch (error) {
            this.logger.error('Error getting doors:', error);
            throw error;
        }
    }

    /**
     * Delete doors from device
     * @param {string} deviceId - Device ID
     * @param {Array} doorIds - Array of door IDs to delete
     * @returns {Promise<boolean>} Success status
     */
    async deleteDoors(deviceId, doorIds) {
        try {
            const req = new doorMessage.DeleteRequest();
            req.setDeviceid(deviceId);
            req.setDooridsList(doorIds);

            return new Promise((resolve, reject) => {
                this.doorClient.delete(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to delete doors from device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Deleted ${doorIds.length} doors from device ${deviceId}`);
                    this.emit('doors:deleted', { deviceId, doorIds });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error deleting doors:', error);
            throw error;
        }
    }

    // ================ DOOR CONTROL ================

    /**
     * Unlock doors
     * @param {string} deviceId - Device ID
     * @param {Array} doorIds - Array of door IDs
     * @param {number} flag - Door flag (default: OPERATOR)
     * @returns {Promise<boolean>} Success status
     */
    async unlockDoors(deviceId, doorIds, flag = doorMessage.DoorFlag.OPERATOR) {
        try {
            const req = new doorMessage.UnlockRequest();
            req.setDeviceid(deviceId);
            req.setDooridsList(doorIds);
            req.setFlag(flag);

            return new Promise((resolve, reject) => {
                this.doorClient.unlock(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to unlock doors on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Unlocked ${doorIds.length} doors on device ${deviceId}`);
                    this.emit('doors:unlocked', { deviceId, doorIds, flag });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error unlocking doors:', error);
            throw error;
        }
    }

    /**
     * Lock doors
     * @param {string} deviceId - Device ID
     * @param {Array} doorIds - Array of door IDs
     * @param {number} flag - Door flag (default: OPERATOR)
     * @returns {Promise<boolean>} Success status
     */
    async lockDoors(deviceId, doorIds, flag = doorMessage.DoorFlag.OPERATOR) {
        try {
            const req = new doorMessage.LockRequest();
            req.setDeviceid(deviceId);
            req.setDooridsList(doorIds);
            req.setFlag(flag);

            return new Promise((resolve, reject) => {
                this.doorClient.lock(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to lock doors on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Locked ${doorIds.length} doors on device ${deviceId}`);
                    this.emit('doors:locked', { deviceId, doorIds, flag });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error locking doors:', error);
            throw error;
        }
    }

    /**
     * Release door flag for normal operation
     * @param {string} deviceId - Device ID
     * @param {Array} doorIds - Array of door IDs
     * @param {number} flag - Door flag to release
     * @returns {Promise<boolean>} Success status
     */
    async releaseDoors(deviceId, doorIds, flag = doorMessage.DoorFlag.OPERATOR) {
        try {
            const req = new doorMessage.ReleaseRequest();
            req.setDeviceid(deviceId);
            req.setDooridsList(doorIds);
            req.setFlag(flag);

            return new Promise((resolve, reject) => {
                this.doorClient.release(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to release doors on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Released ${doorIds.length} doors on device ${deviceId}`);
                    this.emit('doors:released', { deviceId, doorIds, flag });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error releasing doors:', error);
            throw error;
        }
    }

    /**
     * Get door status
     * @param {string} deviceId - Device ID
     * @param {Array} doorIds - Array of door IDs
     * @returns {Promise<Array>} Door status array
     */
    async getDoorStatus(deviceId, doorIds) {
        try {
            const req = new doorMessage.GetStatusRequest();
            req.setDeviceid(deviceId);
            req.setDooridsList(doorIds);

            return new Promise((resolve, reject) => {
                this.doorClient.getStatus(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get door status for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const statusList = response.toObject().statusList;
                    resolve(statusList);
                });
            });
        } catch (error) {
            this.logger.error('Error getting door status:', error);
            throw error;
        }
    }

    // ================ SCHEDULE MANAGEMENT ================

    /**
     * Create weekly schedule
     * @param {string} deviceId - Device ID
     * @param {Object} scheduleConfig - Schedule configuration
     * @returns {Promise<boolean>} Success status
     */
    async createWeeklySchedule(deviceId, scheduleConfig) {
        try {
            const weeklySchedule = new scheduleMessage.WeeklySchedule();
            weeklySchedule.setId(scheduleConfig.id);
            weeklySchedule.setName(scheduleConfig.name || `Weekly Schedule ${scheduleConfig.id}`);

            // Configure daily schedules for each day
            scheduleConfig.dailySchedules.forEach((dailyConfig, dayIndex) => {
                const dailySchedule = new scheduleMessage.DailySchedule();
                dailySchedule.setId(dailyConfig.id);
                dailySchedule.setName(dailyConfig.name || `Daily Schedule ${dailyConfig.id}`);

                // Add time periods
                dailyConfig.timePeriods.forEach((period, periodIndex) => {
                    const timePeriod = new scheduleMessage.TimePeriod();
                    timePeriod.setStarttime(period.startTime);
                    timePeriod.setEndtime(period.endTime);
                    dailySchedule.addPeriods(timePeriod, periodIndex);
                });

                weeklySchedule.addDailyschedules(dailySchedule, dayIndex);
            });

            const req = new scheduleMessage.AddRequest();
            req.setDeviceid(deviceId);
            req.setSchedulesList([weeklySchedule]);

            return new Promise((resolve, reject) => {
                this.scheduleClient.add(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to create weekly schedule on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Created weekly schedule ${scheduleConfig.id} on device ${deviceId}`);
                    this.emit('schedule:created', { deviceId, scheduleId: scheduleConfig.id });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error creating weekly schedule:', error);
            throw error;
        }
    }

    /**
     * Get schedule list from device
     * @param {string} deviceId - Device ID
     * @returns {Promise<Array>} List of schedules
     */
    async getScheduleList(deviceId) {
        try {
            const req = new scheduleMessage.GetListRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.scheduleClient.getList(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get schedule list for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const schedules = response.toObject().schedulesList;
                    this.logger.info(`Retrieved ${schedules.length} schedules from device ${deviceId}`);
                    resolve(schedules);
                });
            });
        } catch (error) {
            this.logger.error('Error getting schedule list:', error);
            throw error;
        }
    }

    /**
     * Delete schedules from device
     * @param {string} deviceId - Device ID
     * @param {Array} scheduleIds - Array of schedule IDs to delete
     * @returns {Promise<boolean>} Success status
     */
    async deleteSchedules(deviceId, scheduleIds) {
        try {
            const req = new scheduleMessage.DeleteRequest();
            req.setDeviceid(deviceId);
            req.setScheduleidsList(scheduleIds);

            return new Promise((resolve, reject) => {
                this.scheduleClient.delete(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to delete schedules from device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Deleted ${scheduleIds.length} schedules from device ${deviceId}`);
                    this.emit('schedules:deleted', { deviceId, scheduleIds });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error deleting schedules:', error);
            throw error;
        }
    }

    // ================ ACCESS LEVEL MANAGEMENT ================

    /**
     * Create access level
     * @param {string} deviceId - Device ID
     * @param {Object} accessLevelConfig - Access level configuration
     * @returns {Promise<boolean>} Success status
     */
    async createAccessLevel(deviceId, accessLevelConfig) {
        try {
            const accessLevel = new accessMessage.AccessLevel();
            accessLevel.setId(accessLevelConfig.id);
            accessLevel.setName(accessLevelConfig.name || `Access Level ${accessLevelConfig.id}`);

            // Add door schedules
            accessLevelConfig.doorSchedules.forEach((doorScheduleConfig, index) => {
                const doorSchedule = new accessMessage.DoorSchedule();
                doorSchedule.setDoorid(doorScheduleConfig.doorId);
                doorSchedule.setScheduleid(doorScheduleConfig.scheduleId);
                accessLevel.addDoorschedules(doorSchedule, index);
            });

            const req = new accessMessage.AddLevelRequest();
            req.setDeviceid(deviceId);
            req.setLevelsList([accessLevel]);

            return new Promise((resolve, reject) => {
                this.accessClient.addLevel(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to create access level on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Created access level ${accessLevelConfig.id} on device ${deviceId}`);
                    this.emit('accessLevel:created', { deviceId, accessLevelId: accessLevelConfig.id });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error creating access level:', error);
            throw error;
        }
    }

    /**
     * Get access level list from device
     * @param {string} deviceId - Device ID
     * @returns {Promise<Array>} List of access levels
     */
    async getAccessLevelList(deviceId) {
        try {
            const req = new accessMessage.GetLevelListRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.accessClient.getLevelList(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get access level list for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const accessLevels = response.toObject().levelsList;
                    this.logger.info(`Retrieved ${accessLevels.length} access levels from device ${deviceId}`);
                    resolve(accessLevels);
                });
            });
        } catch (error) {
            this.logger.error('Error getting access level list:', error);
            throw error;
        }
    }

    /**
     * Delete access levels from device
     * @param {string} deviceId - Device ID
     * @param {Array} accessLevelIds - Array of access level IDs to delete
     * @returns {Promise<boolean>} Success status
     */
    async deleteAccessLevels(deviceId, accessLevelIds) {
        try {
            const req = new accessMessage.DeleteLevelRequest();
            req.setDeviceid(deviceId);
            req.setLevelidsList(accessLevelIds);

            return new Promise((resolve, reject) => {
                this.accessClient.deleteLevel(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to delete access levels from device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Deleted ${accessLevelIds.length} access levels from device ${deviceId}`);
                    this.emit('accessLevels:deleted', { deviceId, accessLevelIds });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error deleting access levels:', error);
            throw error;
        }
    }

    // ================ ACCESS GROUP MANAGEMENT ================

    /**
     * Create access group
     * @param {string} deviceId - Device ID
     * @param {Object} accessGroupConfig - Access group configuration
     * @returns {Promise<boolean>} Success status
     */
    async createAccessGroup(deviceId, accessGroupConfig) {
        try {
            const accessGroup = new accessMessage.AccessGroup();
            accessGroup.setId(accessGroupConfig.id);
            accessGroup.setName(accessGroupConfig.name || `Access Group ${accessGroupConfig.id}`);

            // Add access level IDs
            accessGroupConfig.levelIds.forEach((levelId, index) => {
                accessGroup.addLevelids(levelId, index);
            });

            const req = new accessMessage.AddRequest();
            req.setDeviceid(deviceId);
            req.setGroupsList([accessGroup]);

            return new Promise((resolve, reject) => {
                this.accessClient.add(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to create access group on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Created access group ${accessGroupConfig.id} on device ${deviceId}`);
                    this.emit('accessGroup:created', { deviceId, accessGroupId: accessGroupConfig.id });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error creating access group:', error);
            throw error;
        }
    }

    /**
     * Get access group list from device
     * @param {string} deviceId - Device ID
     * @returns {Promise<Array>} List of access groups
     */
    async getAccessGroupList(deviceId) {
        try {
            const req = new accessMessage.GetListRequest();
            req.setDeviceid(deviceId);

            return new Promise((resolve, reject) => {
                this.accessClient.getList(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to get access group list for device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    const accessGroups = response.toObject().groupsList;
                    this.logger.info(`Retrieved ${accessGroups.length} access groups from device ${deviceId}`);
                    resolve(accessGroups);
                });
            });
        } catch (error) {
            this.logger.error('Error getting access group list:', error);
            throw error;
        }
    }

    /**
     * Delete access groups from device
     * @param {string} deviceId - Device ID
     * @param {Array} accessGroupIds - Array of access group IDs to delete
     * @returns {Promise<boolean>} Success status
     */
    async deleteAccessGroups(deviceId, accessGroupIds) {
        try {
            const req = new accessMessage.DeleteRequest();
            req.setDeviceid(deviceId);
            req.setGroupidsList(accessGroupIds);

            return new Promise((resolve, reject) => {
                this.accessClient.delete(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to delete access groups from device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Deleted ${accessGroupIds.length} access groups from device ${deviceId}`);
                    this.emit('accessGroups:deleted', { deviceId, accessGroupIds });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error deleting access groups:', error);
            throw error;
        }
    }

    // ================ ZONE MANAGEMENT ================

    /**
     * Create access zone
     * @param {string} deviceId - Device ID
     * @param {Object} zoneConfig - Zone configuration
     * @returns {Promise<boolean>} Success status
     */
    async createZone(deviceId, zoneConfig) {
        try {
            const zone = new zoneMessage.ZoneInfo();
            zone.setId(zoneConfig.id);
            zone.setName(zoneConfig.name || `Zone ${zoneConfig.id}`);
            zone.setType(zoneConfig.type || zoneMessage.Type.HARD_APB);

            // Add doors to zone
            if (zoneConfig.doors) {
                zoneConfig.doors.forEach((doorConfig, index) => {
                    const door = new zoneMessage.Door();
                    door.setDeviceid(doorConfig.deviceId);
                    door.setDoorid(doorConfig.doorId);
                    door.setType(doorConfig.type || zoneMessage.Door.Type.ENTRY);
                    zone.addDoors(door, index);
                });
            }

            // Add entrance readers
            if (zoneConfig.entranceReaders) {
                zoneConfig.entranceReaders.forEach((readerConfig, index) => {
                    const reader = new zoneMessage.Reader();
                    reader.setDeviceid(readerConfig.deviceId);
                    reader.setType(readerConfig.type);
                    zone.addEntrancereaders(reader, index);
                });
            }

            // Add exit readers
            if (zoneConfig.exitReaders) {
                zoneConfig.exitReaders.forEach((readerConfig, index) => {
                    const reader = new zoneMessage.Reader();
                    reader.setDeviceid(readerConfig.deviceId);
                    reader.setType(readerConfig.type);
                    zone.addExitreaders(reader, index);
                });
            }

            const req = new zoneMessage.AddRequest();
            req.setDeviceid(deviceId);
            req.setZonesList([zone]);

            return new Promise((resolve, reject) => {
                this.zoneClient.add(req, (err, response) => {
                    if (err) {
                        this.logger.error(`Failed to create zone on device ${deviceId}:`, err);
                        reject(err);
                        return;
                    }

                    this.logger.info(`Created zone ${zoneConfig.id} on device ${deviceId}`);
                    this.emit('zone:created', { deviceId, zoneId: zoneConfig.id });
                    resolve(true);
                });
            });
        } catch (error) {
            this.logger.error('Error creating zone:', error);
            throw error;
        }
    }

    // ================ UTILITY METHODS ================

    /**
     * Setup basic access control configuration
     * @param {string} deviceId - Device ID
     * @param {Object} config - Basic configuration
     * @returns {Promise<Object>} Created configuration IDs
     */
    async setupBasicAccessControl(deviceId, config) {
        try {
            const result = {
                scheduleId: null,
                accessLevelId: null,
                accessGroupId: null,
                doorId: null
            };

            // Create always schedule (24/7 access)
            const alwaysSchedule = {
                id: config.scheduleId || 1,
                name: 'Always',
                dailySchedules: Array(7).fill({
                    id: 1,
                    name: 'Always',
                    timePeriods: [{
                        startTime: 0,    // 00:00
                        endTime: 1439    // 23:59
                    }]
                })
            };

            await this.createWeeklySchedule(deviceId, alwaysSchedule);
            result.scheduleId = alwaysSchedule.id;

            // Create door if configuration provided
            if (config.door) {
                await this.createDoor(deviceId, config.door);
                result.doorId = config.door.doorId;
            }

            // Create access level
            const accessLevel = {
                id: config.accessLevelId || 1,
                name: 'Basic Access Level',
                doorSchedules: [{
                    doorId: config.door ? config.door.doorId : 1,
                    scheduleId: alwaysSchedule.id
                }]
            };

            await this.createAccessLevel(deviceId, accessLevel);
            result.accessLevelId = accessLevel.id;

            // Create access group
            const accessGroup = {
                id: config.accessGroupId || 1,
                name: 'Basic Access Group',
                levelIds: [accessLevel.id]
            };

            await this.createAccessGroup(deviceId, accessGroup);
            result.accessGroupId = accessGroup.id;

            this.logger.info(`Setup basic access control on device ${deviceId}`);
            this.emit('accessControl:setup', { deviceId, result });

            return result;
        } catch (error) {
            this.logger.error('Error setting up basic access control:', error);
            throw error;
        }
    }

    /**
     * Get comprehensive access control status
     * @param {string} deviceId - Device ID
     * @returns {Promise<Object>} Access control status
     */
    async getAccessControlStatus(deviceId) {
        try {
            const [doors, schedules, accessLevels, accessGroups] = await Promise.all([
                this.getDoorList(deviceId),
                this.getScheduleList(deviceId),
                this.getAccessLevelList(deviceId),
                this.getAccessGroupList(deviceId)
            ]);

            const status = {
                deviceId,
                doors: {
                    count: doors.length,
                    list: doors
                },
                schedules: {
                    count: schedules.length,
                    list: schedules
                },
                accessLevels: {
                    count: accessLevels.length,
                    list: accessLevels
                },
                accessGroups: {
                    count: accessGroups.length,
                    list: accessGroups
                },
                timestamp: new Date().toISOString()
            };

            return status;
        } catch (error) {
            this.logger.error('Error getting access control status:', error);
            throw error;
        }
    }

    /**
     * Bulk door operation (lock/unlock multiple doors)
     * @param {string} deviceId - Device ID
     * @param {Array} doorIds - Array of door IDs
     * @param {string} operation - Operation: 'lock', 'unlock', 'release'
     * @param {number} flag - Door flag
     * @returns {Promise<boolean>} Success status
     */
    async bulkDoorOperation(deviceId, doorIds, operation, flag = doorMessage.DoorFlag.OPERATOR) {
        try {
            switch (operation.toLowerCase()) {
                case 'lock':
                    return await this.lockDoors(deviceId, doorIds, flag);
                case 'unlock':
                    return await this.unlockDoors(deviceId, doorIds, flag);
                case 'release':
                    return await this.releaseDoors(deviceId, doorIds, flag);
                default:
                    throw new Error(`Invalid door operation: ${operation}`);
            }
        } catch (error) {
            this.logger.error('Error performing bulk door operation:', error);
            throw error;
        }
    }
}

module.exports = SupremaDoorService;