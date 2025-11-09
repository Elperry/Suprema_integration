/**
 * Sync Service
 * Handles synchronization between devices and database for events, users, and cards
 */

const database = require('../models/database');

class SyncService {
    constructor(services) {
        this.services = services;
        this.syncIntervals = new Map();
    }

    /**
     * Sync events from device to database
     * @param {string} deviceId - Device ID
     * @param {number} fromEventId - Starting event ID (optional)
     * @param {number} batchSize - Number of events to sync per batch
     */
    async syncEventsToDatabase(deviceId, fromEventId = null, batchSize = 1000) {
        try {
            // Get device from database to get last synced event ID
            const devices = await database.getAllDevices();
            const device = devices.find(d => d.id.toString() === deviceId.toString());
            
            if (!device) {
                throw new Error(`Device ${deviceId} not found in database`);
            }

            // Use last_event_sync or provided fromEventId
            const startEventId = fromEventId !== null ? fromEventId : (device.last_event_sync || 0);

            // Get events from device
            const events = await this.services.event.getDeviceLog(
                deviceId,
                startEventId,
                batchSize
            );

            let syncedCount = 0;
            let lastEventId = startEventId;

            // Process and save each event to database
            for (const event of events) {
                try {
                    // Map event to gate event format
                    const gateEvent = {
                        employee_id: event.userID || null,
                        door_no: event.doorID || null,
                        gate_id: deviceId,
                        loc: device.loc || null,
                        dir: event.eventTypeCode === 4096 ? 'in' : 'out', // 4096 = entry
                        etime: new Date(event.timestamp)
                    };

                    await database.addGateEvent(gateEvent);
                    syncedCount++;
                    lastEventId = event.eventID || lastEventId;
                } catch (err) {
                    console.error(`Error syncing event ${event.eventID}:`, err.message);
                }
            }

            // Update last_event_sync in device table
            if (syncedCount > 0) {
                await database.updateDevice(device.id, {
                    last_event_sync: lastEventId
                });
            }

            return {
                synced: syncedCount,
                lastEventId: lastEventId,
                deviceId: deviceId
            };
        } catch (error) {
            console.error(`Error syncing events from device ${deviceId}:`, error.message);
            throw error;
        }
    }

    /**
     * Sync events from all connected devices
     * @param {number} batchSize - Number of events per batch
     */
    async syncAllDevicesEvents(batchSize = 1000) {
        try {
            const devices = await database.getAllDevices();
            const results = [];

            for (const device of devices) {
                try {
                    const result = await this.syncEventsToDatabase(
                        device.id.toString(),
                        null,
                        batchSize
                    );
                    results.push({
                        deviceId: device.id,
                        deviceName: device.name,
                        success: true,
                        ...result
                    });
                } catch (err) {
                    results.push({
                        deviceId: device.id,
                        deviceName: device.name,
                        success: false,
                        error: err.message
                    });
                }
            }

            return results;
        } catch (error) {
            console.error('Error syncing all devices events:', error.message);
            throw error;
        }
    }

    /**
     * Get event sync status for a device
     * @param {string} deviceId - Device ID
     */
    async getSyncStatus(deviceId) {
        try {
            const devices = await database.getAllDevices();
            const device = devices.find(d => d.id.toString() === deviceId.toString());
            
            if (!device) {
                throw new Error(`Device ${deviceId} not found`);
            }

            // Get latest event from device
            const latestEvents = await this.services.event.getDeviceLog(deviceId, 0, 1);
            const latestEventId = latestEvents.length > 0 ? latestEvents[0].eventID : 0;

            return {
                deviceId: deviceId,
                deviceName: device.name,
                lastSyncedEventId: device.last_event_sync || 0,
                latestEventId: latestEventId,
                pendingEvents: Math.max(0, latestEventId - (device.last_event_sync || 0))
            };
        } catch (error) {
            console.error(`Error getting sync status for device ${deviceId}:`, error.message);
            throw error;
        }
    }

    /**
     * Sync users from device to database
     * @param {string} deviceId - Device ID
     */
    async syncUsersToDatabase(deviceId) {
        try {
            // Get all users from device
            const userHeaders = await this.services.user.getUserList(deviceId);
            
            if (!userHeaders || userHeaders.length === 0) {
                return { synced: 0, deviceId: deviceId };
            }

            // Get detailed user information
            const userIds = userHeaders.map(h => h.id);
            const users = await this.services.user.getUsers(deviceId, userIds);

            let syncedCount = 0;

            // Save users to database
            for (const user of users) {
                try {
                    // Check if user exists in database
                    const existingUsers = await database.getAllUsers();
                    const existingUser = existingUsers.find(
                        u => u.username === user.userID
                    );

                    if (!existingUser) {
                        // Add new user
                        await database.addUser({
                            username: user.userID,
                            displayname: user.name || user.userID,
                            userpassword: '' // Password not synced for security
                        });
                        syncedCount++;
                    }
                } catch (err) {
                    console.error(`Error syncing user ${user.userID}:`, err.message);
                }
            }

            // Update last_user_sync timestamp
            const devices = await database.getAllDevices();
            const device = devices.find(d => d.id.toString() === deviceId.toString());
            
            if (device) {
                await database.updateDevice(device.id, {
                    last_user_sync: new Date()
                });
            }

            return {
                synced: syncedCount,
                total: users.length,
                deviceId: deviceId
            };
        } catch (error) {
            console.error(`Error syncing users from device ${deviceId}:`, error.message);
            throw error;
        }
    }

    /**
     * Sync users from all connected devices
     */
    async syncAllDevicesUsers() {
        try {
            const devices = await database.getAllDevices();
            const results = [];

            for (const device of devices) {
                try {
                    const result = await this.syncUsersToDatabase(device.id.toString());
                    results.push({
                        deviceId: device.id,
                        deviceName: device.name,
                        success: true,
                        ...result
                    });
                } catch (err) {
                    results.push({
                        deviceId: device.id,
                        deviceName: device.name,
                        success: false,
                        error: err.message
                    });
                }
            }

            return results;
        } catch (error) {
            console.error('Error syncing all devices users:', error.message);
            throw error;
        }
    }

    /**
     * Start automatic event syncing for a device
     * @param {string} deviceId - Device ID
     * @param {number} interval - Sync interval in milliseconds (default: 60000 = 1 minute)
     */
    startAutoSync(deviceId, interval = 60000) {
        // Clear existing interval if any
        this.stopAutoSync(deviceId);

        // Create new interval
        const syncInterval = setInterval(async () => {
            try {
                await this.syncEventsToDatabase(deviceId);
                console.log(`Auto-synced events from device ${deviceId}`);
            } catch (error) {
                console.error(`Auto-sync failed for device ${deviceId}:`, error.message);
            }
        }, interval);

        this.syncIntervals.set(deviceId, syncInterval);
        console.log(`Auto-sync started for device ${deviceId} with interval ${interval}ms`);
    }

    /**
     * Stop automatic syncing for a device
     * @param {string} deviceId - Device ID
     */
    stopAutoSync(deviceId) {
        const syncInterval = this.syncIntervals.get(deviceId);
        if (syncInterval) {
            clearInterval(syncInterval);
            this.syncIntervals.delete(deviceId);
            console.log(`Auto-sync stopped for device ${deviceId}`);
        }
    }

    /**
     * Start automatic syncing for all devices
     * @param {number} interval - Sync interval in milliseconds
     */
    async startAutoSyncAll(interval = 60000) {
        try {
            const devices = await database.getAllDevices();
            
            for (const device of devices) {
                this.startAutoSync(device.id.toString(), interval);
            }

            return {
                message: `Auto-sync started for ${devices.length} devices`,
                interval: interval
            };
        } catch (error) {
            console.error('Error starting auto-sync for all devices:', error.message);
            throw error;
        }
    }

    /**
     * Stop automatic syncing for all devices
     */
    stopAutoSyncAll() {
        for (const deviceId of this.syncIntervals.keys()) {
            this.stopAutoSync(deviceId);
        }
        return {
            message: 'Auto-sync stopped for all devices'
        };
    }

    /**
     * Get auto-sync status
     */
    getAutoSyncStatus() {
        const status = [];
        
        for (const [deviceId, interval] of this.syncIntervals.entries()) {
            status.push({
                deviceId: deviceId,
                active: true,
                interval: interval
            });
        }

        return {
            activeDevices: status.length,
            devices: status
        };
    }
}

module.exports = SyncService;
