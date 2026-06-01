/**
 * Sync Service
 * Handles synchronization between devices and database for events, users, and cards
 */

import { normalizeToHex } from '../core/utils/cardUtils.js';

// DatabaseManager instance is now injected via constructor instead of imported
// as a class (which was a bug — the import resolved to the class, not an instance).

class SyncService {
    /**
     * @param {Object} services - Domain services map
     * @param {Object} [options]
     * @param {Object} [options.database] - DatabaseManager instance
     * @param {Object} [options.logger] - Logger instance
     */
    constructor(services, options = {}) {
        this.services = services;
        this.database = options.database || services.database;
        this.logger = options.logger || console;
        this.syncIntervals = new Map();

        if (!this.database) {
            throw new Error('SyncService requires a database instance');
        }
    }

    /**
     * Sync events from device to database
     * @param {string} deviceId - Device ID
     * @param {number} fromEventId - Starting event ID (optional, overrides stored cursor)
     * @param {number} batchSize - Number of events to fetch per call
     */
    async syncEventsToDatabase(deviceId, fromEventId = null, batchSize = 1000) {
        try {
            // Get device record to read integer event-ID cursor
            const devices = await this.database.getAllDevices();
            const device = devices.find(d => d.id.toString() === deviceId.toString());

            if (!device) {
                throw new Error(`Device ${deviceId} not found in database`);
            }

            // last_synced_event_id is the integer Suprema event ID cursor.
            // last_event_sync is the DateTime of the last successful sync run.
            const startEventId = fromEventId !== null
                ? fromEventId
                : (device.last_synced_event_id ?? 0);

            // Resolve the Suprema hardware device ID (large int) from the
            // connection map.  getEventLogs() delegates to a gRPC call that
            // the BioStar gateway identifies by Suprema device ID, NOT our
            // sequential DB device ID.
            let supremaDeviceId = null;
            if (this.services.connection?.connectedDevices) {
                for (const [sid, info] of this.services.connection.connectedDevices.entries()) {
                    if (info.ip === device.ip && Number(info.port ?? 51211) === Number(device.port ?? 51211)) {
                        supremaDeviceId = sid;
                        break;
                    }
                }
            }
            if (!supremaDeviceId) {
                return { synced: 0, lastEventId: startEventId, deviceId, skipped: 'device not connected' };
            }

            // Fetch events from the Suprema device via gRPC
            const events = await this.services.event.getEventLogs(
                supremaDeviceId,
                startEventId,
                batchSize
            );

            if (!events || events.length === 0) {
                return { synced: 0, lastEventId: startEventId, deviceId };
            }

            // Build rows — validate/coerce each field, skip malformed events
            const gateEventsData = [];
            let lastEventId = startEventId;

            for (const event of events) {
                // Determine event ID for cursor tracking
                const currentEventId = event.eventID ?? event.id ?? event.eventId ?? event.eventid;
                if (currentEventId !== undefined && currentEventId !== null) {
                    lastEventId = currentEventId;
                }

                // Filter: Only process authentication events
                if (event.eventType !== 'authentication') {
                    continue;
                }

                try {
                    const etime = event.timestamp ? new Date(event.timestamp) : null;
                    // After enhanceEvent(), protobuf field names are all-lowercase.
                    // Device.direction ('in'|'out') determines whether this gate
                    // captures entry or exit events.
                    gateEventsData.push({
                        employee_id: event.userid  ? String(event.userid)  : null,
                        door_no:     event.doorid  ? parseInt(event.doorid, 10) : null,
                        gate_id:     parseInt(deviceId, 10),
                        loc:         device.loc || null,
                        dir:         device.direction || 'in',
                        etime
                    });
                } catch (mapErr) {
                    this.logger.warn(`Skipping malformed event ${currentEventId || 'unknown'}:`, mapErr.message);
                }
            }

            if (gateEventsData.length === 0 && lastEventId !== startEventId) {
                // If all events were filtered out, we MUST advance the device cursor 
                // in the database, otherwise it will get stuck re-fetching them forever.
                await this.database.prisma.device.update({
                    where: { id: device.id },
                    data: {
                        last_synced_event_id: lastEventId,
                        last_event_sync:      new Date()
                    }
                });
            }

            if (gateEventsData.length === 0) {
                return { synced: 0, lastEventId: lastEventId, deviceId };
            }

            // Atomically insert all gate events and advance the cursor so a
            // crash mid-batch cannot leave the cursor stuck behind saved rows.
            await this.database.prisma.$transaction(async (tx) => {
                await tx.gateEvent.createMany({
                    data: gateEventsData,
                    skipDuplicates: true
                });
                await tx.device.update({
                    where: { id: device.id },
                    data: {
                        last_synced_event_id: lastEventId,
                        last_event_sync:      new Date()
                    }
                });
            });

            return { synced: gateEventsData.length, lastEventId, deviceId };
        } catch (error) {
            this.logger.error(`Error syncing events from device ${deviceId}:`, error.message);
            throw error;
        }
    }

    /**
     * Sync events from all connected devices
     * @param {number} batchSize - Number of events per batch
     */
    async syncAllDevicesEvents(batchSize = 1000) {
        try {
            const devices = await this.database.getAllDevices();
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
            this.logger.error('Error syncing all devices events:', error.message);
            throw error;
        }
    }

    /**
     * Get event sync status for a device
     * @param {string} deviceId - Device ID
     */
    async getSyncStatus(deviceId) {
        try {
            const devices = await this.database.getAllDevices();
            const device = devices.find(d => d.id.toString() === deviceId.toString());
            
            if (!device) {
                throw new Error(`Device ${deviceId} not found`);
            }

            // Resolve Suprema hardware device ID
            let supremaDeviceId = null;
            if (this.services.connection?.connectedDevices) {
                for (const [sid, info] of this.services.connection.connectedDevices.entries()) {
                    if (info.ip === device.ip && Number(info.port ?? 51211) === Number(device.port ?? 51211)) {
                        supremaDeviceId = sid;
                        break;
                    }
                }
            }

            let latestEventId = 0;
            if (supremaDeviceId) {
                // Fetch a large batch and take the highest event ID to find the latest
                const latestEvents = await this.services.event.getEventLogs(supremaDeviceId, 0, 1000);
                if (latestEvents.length > 0) {
                    latestEventId = latestEvents.reduce((max, e) => {
                        const id = Number(e.id ?? e.eventid ?? e.eventId ?? 0);
                        return id > max ? id : max;
                    }, 0);
                }
            }

            const lastSyncedId = device.last_synced_event_id ?? 0;

            return {
                deviceId,
                deviceName:        device.name,
                lastSyncedEventId: lastSyncedId,
                latestEventId,
                pendingEvents:     Math.max(0, latestEventId - lastSyncedId)
            };
        } catch (error) {
            this.logger.error(`Error getting sync status for device ${deviceId}:`, error.message);
            throw error;
        }
    }

    /**
     * Sync users from device to database.
     *
     * Writes to the `cardAssignment` table (the canonical card-holder model)
     * rather than the `user` table (which is reserved for web-app auth accounts).
     * Only users that carry a card are imported — card data is required for a
     * unique cardAssignment record.
     *
     * @param {string} deviceId - Device ID
     */
    async syncUsersToDatabase(deviceId) {
        try {
            const devices = await this.database.getAllDevices();
            const device = devices.find(d => d.id.toString() === deviceId.toString());

            if (!device) {
                throw new Error(`Device ${deviceId} not found in database`);
            }

            // --- 1. Get user headers (all users on device) ---
            const userHeaders = await this.services.user.getUserList(deviceId);

            if (!userHeaders || userHeaders.length === 0) {
                return { synced: 0, total: 0, deviceId };
            }

            // --- 2. Fetch card data for users that have cards (one batched call) ---
            const userIdsWithCards = userHeaders
                .filter(h => h.numofcard > 0)
                .map(h => h.id);

            const cardDataMap = new Map(); // userID → first card hex string
            if (userIdsWithCards.length > 0) {
                try {
                    const cardResponses = await this.services.user.getCards(deviceId, userIdsWithCards);
                    for (const cr of cardResponses) {
                        const uid = String(cr.userid);
                        const cards = cr.cardslist || cr.cardsList || [];
                        if (cards.length > 0 && cards[0].data) {
                            const cardData = this.normalizeCardForStorage(cards[0].data);
                            if (cardData) {
                                cardDataMap.set(uid, cardData);
                            }
                        }
                    }
                } catch (cardErr) {
                    this.logger.warn(`Could not fetch cards for device ${deviceId}:`, cardErr.message);
                }
            }

            // --- 3. Get detailed user info (batched 50 at a time) ---
            const userIds = userHeaders.map(h => h.id);
            const users = await this.services.user.getUsers(deviceId, userIds);

            // --- 4. Load existing data to avoid duplicates ---
            const employeeIds = users.map(u => parseInt(u.userID)).filter(Boolean);
            const cardDataValues = [...cardDataMap.values()].filter(Boolean);

            const existingLocalUsers = employeeIds.length > 0
                ? await this.database.prisma.user.findMany({
                    where: { employee_id: { in: employeeIds } },
                    select: { id: true, employee_id: true }
                })
                : [];
            const userByEmployeeId = new Map(existingLocalUsers.map(u => [String(u.employee_id), u]));

            const existingCardAssignments = cardDataValues.length > 0
                ? await this.database.prisma.cardAssignment.findMany({
                    where: { card_data: { in: cardDataValues } },
                    select: { card_data: true, user_id: true }
                })
                : [];
            const existingByCardData = new Set(existingCardAssignments.map(a => a.card_data));

            // --- 5. Create cardAssignment for new users that carry a card ---
            let syncedCount = 0;

            for (const user of users) {
                const uid      = String(user.userID);
                const cardData = cardDataMap.get(uid);

                const localUser = userByEmployeeId.get(uid);
                if (!localUser) continue; // no local user row yet — skip until cloud sync provisions it
                if (existingByCardData.has(cardData)) continue; // already tracked in DB
                if (!cardData) continue; // no card — cannot create unique record

                try {
                    await this.database.prisma.cardAssignment.create({
                        data: {
                            user_id:  localUser.id,
                            card_data: cardData,
                            card_csn: '',
                            status:   'active'
                        }
                    });
                    existingByCardData.add(cardData);
                    syncedCount++;
                } catch (err) {
                    // Unique constraint violation means another sync beat us — safe to ignore
                    if (err.code !== 'P2002') {
                        this.logger.error(`Error syncing user ${uid}:`, err.message);
                    }
                }
            }

            // --- 6. Advance last_user_sync timestamp ---
            await this.database.updateDevice(device.id, { last_user_sync: new Date() });

            return { synced: syncedCount, total: users.length, deviceId };
        } catch (error) {
            this.logger.error(`Error syncing users from device ${deviceId}:`, error.message);
            throw error;
        }
    }

    /**
     * Sync users from all connected devices
     */
    async syncAllDevicesUsers() {
        try {
            const devices = await this.database.getAllDevices();
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
            this.logger.error('Error syncing all devices users:', error.message);
            throw error;
        }
    }

    normalizeCardForStorage(cardData) {
        if (cardData === null || cardData === undefined || cardData === '') {
            return null;
        }

        if (Buffer.isBuffer(cardData)) {
            return normalizeToHex(cardData.toString('hex'));
        }

        if (Array.isArray(cardData) || cardData instanceof Uint8Array) {
            return normalizeToHex(Buffer.from(cardData).toString('hex'));
        }

        if (typeof cardData === 'object') {
            if (cardData.data !== undefined) {
                return this.normalizeCardForStorage(cardData.data);
            }
            return null;
        }

        const value = String(cardData).trim();
        if (!value) return null;

        if (/^[0-9A-Fa-f]+$/.test(value)) {
            return normalizeToHex(value);
        }

        const base64Pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        if (value.length % 4 === 0 && base64Pattern.test(value)) {
            const decoded = Buffer.from(value, 'base64');
            if (decoded.length > 0) {
                return normalizeToHex(decoded.toString('hex'));
            }
        }

        return null;
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
                this.logger.info(`Auto-synced events from device ${deviceId}`);
            } catch (error) {
                this.logger.error(`Auto-sync failed for device ${deviceId}:`, error.message);
            }
        }, interval);

        this.syncIntervals.set(deviceId, syncInterval);
        this.logger.info(`Auto-sync started for device ${deviceId} with interval ${interval}ms`);
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
            this.logger.info(`Auto-sync stopped for device ${deviceId}`);
        }
    }

    /**
     * Start automatic syncing for all devices
     * @param {number} interval - Sync interval in milliseconds
     */
    async startAutoSyncAll(interval = 60000) {
        try {
            const devices = await this.database.getAllDevices();
            
            for (const device of devices) {
                this.startAutoSync(device.id.toString(), interval);
            }

            return {
                message: `Auto-sync started for ${devices.length} devices`,
                interval: interval
            };
        } catch (error) {
            this.logger.error('Error starting auto-sync for all devices:', error.message);
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

export default SyncService;
