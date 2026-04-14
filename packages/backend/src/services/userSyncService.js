/**
 * User Sync Service
 * 
 * Manages synchronization between database (source of truth) and Suprema devices.
 * The database is the centralized data source for all users and card assignments.
 */

// PrismaClient is injected via constructor to avoid duplicate connections.

class UserSyncService {
    /**
     * @param {Object} userService
     * @param {Object} connectionService
     * @param {Object} [logger]
     * @param {Object} [options]
     * @param {import('@prisma/client').PrismaClient} [options.prisma] - Shared PrismaClient
     */
    constructor(userService, connectionService, logger, options = {}) {
        this.userService = userService;
        this.connectionService = connectionService;
        this.logger = logger || console;
        this.prisma = options.prisma || connectionService.database?.getPrisma();

        if (!this.prisma) {
            throw new Error('UserSyncService requires a PrismaClient');
        }
    }

    /**
     * Get all users from database with their card assignments
     * This is the primary data source
     * @param {string|number|null} deviceId - Optional device filter
     * @param {Object} [options] - Pagination and search options
     * @param {number} [options.page] - Page number (1-based)
     * @param {number} [options.limit] - Items per page
     * @param {string} [options.search] - Search by name or employee ID
     * @param {string} [options.status] - Filter by card status
     * @returns {Promise<{users: Array, total: number, page: number, limit: number}>}
     */
    async getUsersFromDB(deviceId = null, options = {}) {
        try {
            const { page, limit, search, status } = options;
            const isPaginated = page && limit;

            const whereClause = {};

            // Device filter
            if (deviceId) {
                whereClause.enrollments = {
                    some: {
                        deviceId: parseInt(deviceId),
                        status: 'active'
                    }
                };
            }

            // Status filter (default: active only for backward compat)
            if (status) {
                whereClause.status = status;
            } else if (!status && !options._allStatuses) {
                whereClause.status = 'active';
            }

            // Search filter
            if (search && search.trim()) {
                whereClause.OR = [
                    { employeeId: { contains: search.trim() } },
                    { employeeName: { contains: search.trim() } }
                ];
            }

            // Get total count for pagination
            const total = await this.prisma.cardAssignment.count({ where: whereClause });

            const queryOptions = {
                where: whereClause,
                include: {
                    enrollments: {
                        include: {
                            device: true
                        }
                    }
                },
                orderBy: { assignedAt: 'desc' }
            };

            // Apply pagination
            if (isPaginated) {
                const pageNum = Math.max(1, parseInt(page));
                const limitNum = Math.min(200, Math.max(1, parseInt(limit)));
                queryOptions.skip = (pageNum - 1) * limitNum;
                queryOptions.take = limitNum;
            }

            const cardAssignments = await this.prisma.cardAssignment.findMany(queryOptions);

            // Transform to user format
            const users = cardAssignments.map(ca => ({
                userID: ca.employeeId,
                name: ca.employeeName || '',
                cardData: ca.cardData,
                cardType: ca.cardType,
                cardFormat: ca.cardFormat,
                status: ca.status,
                assignedAt: ca.assignedAt,
                enrolledDevices: ca.enrollments.map(e => ({
                    deviceId: e.deviceId,
                    deviceName: e.device?.name,
                    deviceUserId: e.deviceUserId,
                    enrolledAt: e.enrolledAt,
                    status: e.status
                }))
            }));

            if (isPaginated) {
                const pageNum = Math.max(1, parseInt(page));
                const limitNum = Math.min(200, Math.max(1, parseInt(limit)));
                return {
                    users,
                    total,
                    page: pageNum,
                    limit: limitNum,
                    totalPages: Math.ceil(total / limitNum)
                };
            }

            return users;
        } catch (error) {
            this.logger.error('Error getting users from DB:', error);
            throw error;
        }
    }

    /**
     * Get users from a specific device
     */
    async getUsersFromDevice(deviceId) {
        try {
            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
            const userHeaders = await this.userService.getUserList(supremaDeviceId);
            
            // Get cards for users who have them
            const userIdsWithCards = userHeaders
                .filter(h => h.numofcard > 0)
                .map(h => h.id);
            
            let userCards = [];
            if (userIdsWithCards.length > 0) {
                try {
                    userCards = await this.userService.getCards(supremaDeviceId, userIdsWithCards);
                } catch (cardError) {
                    this.logger.warn('Failed to fetch cards from device:', cardError.message);
                }
            }

            // Build card map
            const cardMap = new Map();
            for (const uc of userCards) {
                const userId = String(uc.userid);
                const cards = uc.cardslist || uc.cardsList || [];
                cardMap.set(userId, cards);
            }

            // Transform to standard format
            const users = userHeaders.map(header => {
                const cards = cardMap.get(String(header.id)) || [];
                return {
                    userID: header.id,
                    name: header.name || '',
                    numOfCard: header.numofcard || 0,
                    cardsList: cards,
                    hasCard: cards.length > 0,
                    cardData: cards.length > 0 ? cards[0].data : null,
                    source: 'device'
                };
            });

            return users;
        } catch (error) {
            this.logger.error('Error getting users from device:', error);
            throw error;
        }
    }

    /**
     * Sync ALL: Push database users/cards to all connected devices
     * Database is the source of truth
     */
    async syncDatabaseToAllDevices() {
        const results = [];
        
        try {
            // Get all card assignments from database
            const cardAssignments = await this.prisma.cardAssignment.findMany({
                where: { status: 'active' },
                include: { enrollments: true }
            });

            this.logger.info(`[SyncAll] Found ${cardAssignments.length} active card assignments in database`);

            // Get all connected devices
            const connectedDevices = await this.connectionService.getConnectedDevices();
            const dbDevices = await this.connectionService.getAllDevicesFromDB();
            
            if (!connectedDevices || connectedDevices.length === 0) {
                return {
                    success: true,
                    message: 'No connected devices',
                    results: []
                };
            }

            this.logger.info(`[SyncAll] Syncing to ${connectedDevices.length} connected devices`);

            for (const device of connectedDevices) {
                const deviceInfo = device.toObject ? device.toObject() : device;
                const supremaDeviceId = deviceInfo.deviceid;
                
                // Find DB device record
                const dbDevice = dbDevices.find(d => {
                    return deviceInfo.ipaddr === d.ip && deviceInfo.port === d.port;
                });
                const dbDeviceId = dbDevice?.id;

                try {
                    const syncResult = await this.syncDatabaseToDevice(
                        supremaDeviceId, 
                        dbDeviceId, 
                        cardAssignments
                    );
                    
                    results.push({
                        deviceId: supremaDeviceId,
                        dbDeviceId: dbDeviceId,
                        deviceName: dbDevice?.name,
                        success: true,
                        ...syncResult
                    });
                } catch (deviceError) {
                    this.logger.error(`[SyncAll] Failed to sync device ${supremaDeviceId}:`, deviceError.message);
                    results.push({
                        deviceId: supremaDeviceId,
                        dbDeviceId: dbDeviceId,
                        deviceName: dbDevice?.name,
                        success: false,
                        error: deviceError.message
                    });
                }
            }

            return {
                success: true,
                totalDevices: connectedDevices.length,
                totalCardAssignments: cardAssignments.length,
                results
            };
        } catch (error) {
            this.logger.error('[SyncAll] Error:', error);
            throw error;
        }
    }

    /**
     * Sync database users/cards to a specific device
     */
    async syncDatabaseToDevice(supremaDeviceId, dbDeviceId, cardAssignments = null) {
        try {
            // Get card assignments if not provided
            if (!cardAssignments) {
                cardAssignments = await this.prisma.cardAssignment.findMany({
                    where: { status: 'active' }
                });
            }

            // Get current users on device
            const deviceUsers = await this.userService.getUserList(supremaDeviceId);
            const deviceUserIds = new Set(deviceUsers.map(u => String(u.id)));

            this.logger.info(`[SyncToDevice] Device ${supremaDeviceId} has ${deviceUsers.length} users`);
            this.logger.info(`[SyncToDevice] Database has ${cardAssignments.length} card assignments`);

            const stats = {
                usersAdded: 0,
                usersUpdated: 0,
                usersRemoved: 0,
                errors: []
            };

            // Process each card assignment from database
            for (const ca of cardAssignments) {
                const userId = ca.employeeId;
                
                try {
                    if (!deviceUserIds.has(userId)) {
                        // User not on device - add them
                        await this.enrollUserWithCard(supremaDeviceId, ca);
                        stats.usersAdded++;
                        
                        // Update enrollment record
                        if (dbDeviceId) {
                            await this.updateEnrollmentRecord(dbDeviceId, ca.id, userId, 'active');
                        }
                    } else {
                        // User exists - update their card if needed
                        await this.updateUserCard(supremaDeviceId, ca);
                        stats.usersUpdated++;
                        deviceUserIds.delete(userId); // Mark as processed
                    }
                } catch (userError) {
                    this.logger.error(`[SyncToDevice] Error processing user ${userId}:`, userError.message);
                    stats.errors.push({ userId, error: userError.message });
                }
            }

            // Users on device but not in DB - optionally remove them
            // This ensures device matches database exactly
            const dbUserIds = new Set(cardAssignments.map(ca => ca.employeeId));
            for (const deviceUserId of deviceUserIds) {
                if (!dbUserIds.has(deviceUserId)) {
                    try {
                        this.logger.info(`[SyncToDevice] Removing user ${deviceUserId} not in database`);
                        await this.userService.deleteUsers(supremaDeviceId, [deviceUserId]);
                        stats.usersRemoved++;
                        
                        // Update enrollment record as removed
                        if (dbDeviceId) {
                            await this.markEnrollmentRemoved(dbDeviceId, deviceUserId);
                        }
                    } catch (deleteError) {
                        this.logger.error(`[SyncToDevice] Error removing user ${deviceUserId}:`, deleteError.message);
                        stats.errors.push({ userId: deviceUserId, error: deleteError.message });
                    }
                }
            }

            this.logger.info(`[SyncToDevice] Complete - Added: ${stats.usersAdded}, Updated: ${stats.usersUpdated}, Removed: ${stats.usersRemoved}`);
            
            return stats;
        } catch (error) {
            this.logger.error('[SyncToDevice] Error:', error);
            throw error;
        }
    }

    /**
     * Enroll a user with their card from database record
     */
    async enrollUserWithCard(deviceId, cardAssignment) {
        try {
            // First, enroll the user (create user on device)
            const userData = {
                id: cardAssignment.employeeId,
                name: cardAssignment.employeeName || ''
            };
            
            this.logger.info(`[EnrollUser] Creating user ${cardAssignment.employeeId} on device ${deviceId}`);
            await this.userService.enrollUsers(deviceId, [userData]);
            
            // Then set their card
            const cardData = cardAssignment.cardData;
            const userCardData = [{
                userId: cardAssignment.employeeId,
                cardData: cardData
            }];

            this.logger.info(`[EnrollUser] Setting card for user ${cardAssignment.employeeId}`);
            await this.userService.setUserCards(deviceId, userCardData);
            
            this.logger.info(`[EnrollUser] Enrolled user ${cardAssignment.employeeId} with card on device ${deviceId}`);
        } catch (error) {
            this.logger.error(`[EnrollUser] Error enrolling user ${cardAssignment.employeeId}:`, error);
            throw error;
        }
    }

    /**
     * Update user's card on device
     */
    async updateUserCard(deviceId, cardAssignment) {
        try {
            const userCardData = [{
                userId: cardAssignment.employeeId,
                cardData: cardAssignment.cardData
            }];

            this.logger.info(`[UpdateCard] Updating card for user ${cardAssignment.employeeId} on device ${deviceId}`);
            await this.userService.setUserCards(deviceId, userCardData);
            this.logger.info(`[UpdateCard] Card updated for user ${cardAssignment.employeeId}`);
        } catch (error) {
            // If user doesn't exist, enroll them with card
            if (error.message && (error.message.includes('NOT_FOUND') || error.message.includes('not found'))) {
                this.logger.info(`[UpdateCard] User ${cardAssignment.employeeId} not found, enrolling...`);
                await this.enrollUserWithCard(deviceId, cardAssignment);
            } else if (error.code === 5) {
                this.logger.info(`[UpdateCard] User ${cardAssignment.employeeId} not found (code 5), enrolling...`);
                await this.enrollUserWithCard(deviceId, cardAssignment);
            } else {
                throw error;
            }
        }
    }

    /**
     * Update enrollment record in database
     */
    async updateEnrollmentRecord(dbDeviceId, cardAssignmentId, deviceUserId, status) {
        try {
            await this.prisma.deviceEnrollment.upsert({
                where: {
                    deviceId_cardAssignmentId: {
                        deviceId: dbDeviceId,
                        cardAssignmentId: cardAssignmentId
                    }
                },
                update: {
                    status: status,
                    lastSyncAt: new Date()
                },
                create: {
                    deviceId: dbDeviceId,
                    cardAssignmentId: cardAssignmentId,
                    deviceUserId: deviceUserId,
                    status: status,
                    enrolledAt: new Date()
                }
            });
        } catch (error) {
            this.logger.error('[UpdateEnrollment] Error:', error);
        }
    }

    /**
     * Mark enrollment as removed
     */
    async markEnrollmentRemoved(dbDeviceId, deviceUserId) {
        try {
            await this.prisma.deviceEnrollment.updateMany({
                where: {
                    deviceId: dbDeviceId,
                    deviceUserId: deviceUserId
                },
                data: {
                    status: 'removed',
                    lastSyncAt: new Date()
                }
            });
        } catch (error) {
            this.logger.error('[MarkEnrollmentRemoved] Error:', error);
        }
    }

    /**
     * Delete user from device and update database
     */
    async deleteUserFromDevice(deviceId, userId) {
        try {
            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
            
            // Delete from device
            await this.userService.deleteUsers(supremaDeviceId, [userId]);
            
            // Update database - mark enrollment as removed
            const dbDevice = await this.getDbDevice(deviceId);
            if (dbDevice) {
                await this.prisma.deviceEnrollment.updateMany({
                    where: {
                        deviceId: dbDevice.id,
                        deviceUserId: userId
                    },
                    data: {
                        status: 'removed',
                        lastSyncAt: new Date()
                    }
                });
            }

            this.logger.info(`[DeleteUser] Deleted user ${userId} from device ${deviceId} and updated DB`);
            
            return { success: true, userId, deviceId };
        } catch (error) {
            this.logger.error('[DeleteUser] Error:', error);
            throw error;
        }
    }

    /**
     * Delete user from ALL devices and revoke card in database
     */
    async deleteUserFromAllDevices(userId, revokeCard = false) {
        try {
            const results = [];
            
            // Get all connected devices
            const connectedDevices = await this.connectionService.getConnectedDevices();
            
            for (const device of connectedDevices) {
                const deviceInfo = device.toObject ? device.toObject() : device;
                try {
                    await this.userService.deleteUsers(deviceInfo.deviceid, [userId]);
                    results.push({ deviceId: deviceInfo.deviceid, success: true });
                } catch (deviceError) {
                    results.push({ deviceId: deviceInfo.deviceid, success: false, error: deviceError.message });
                }
            }

            // Update database
            await this.prisma.deviceEnrollment.updateMany({
                where: { deviceUserId: userId },
                data: { status: 'removed', lastSyncAt: new Date() }
            });

            // Optionally revoke the card
            if (revokeCard) {
                await this.prisma.cardAssignment.updateMany({
                    where: { employeeId: userId },
                    data: { status: 'revoked', revokedAt: new Date() }
                });
            }

            this.logger.info(`[DeleteUserAll] Deleted user ${userId} from ${results.length} devices`);
            
            return { success: true, userId, results };
        } catch (error) {
            this.logger.error('[DeleteUserAll] Error:', error);
            throw error;
        }
    }

    /**
     * Import users from device to database
     * Used for initial setup or when device has users not in DB
     */
    async importUsersFromDevice(deviceId) {
        try {
            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
            const dbDevice = await this.getDbDevice(deviceId);
            
            // Get all users with cards from device
            const deviceUsers = await this.getUsersFromDevice(deviceId);
            
            const stats = { imported: 0, skipped: 0, errors: [] };

            for (const user of deviceUsers) {
                if (!user.hasCard || !user.cardData) {
                    stats.skipped++;
                    continue;
                }

                try {
                    // Check if card already exists in database
                    const existingCard = await this.prisma.cardAssignment.findFirst({
                        where: { cardData: user.cardData }
                    });

                    if (existingCard) {
                        // Update enrollment record
                        if (dbDevice) {
                            await this.updateEnrollmentRecord(
                                dbDevice.id, 
                                existingCard.id, 
                                user.userID, 
                                'active'
                            );
                        }
                        stats.skipped++;
                    } else {
                        // Create new card assignment
                        const cardAssignment = await this.prisma.cardAssignment.create({
                            data: {
                                employeeId: user.userID,
                                employeeName: user.name || null,
                                cardData: user.cardData,
                                cardType: 'CSN',
                                cardFormat: 1,
                                status: 'active'
                            }
                        });

                        // Create enrollment record
                        if (dbDevice) {
                            await this.prisma.deviceEnrollment.create({
                                data: {
                                    deviceId: dbDevice.id,
                                    cardAssignmentId: cardAssignment.id,
                                    deviceUserId: user.userID,
                                    status: 'active'
                                }
                            });
                        }

                        stats.imported++;
                    }
                } catch (userError) {
                    stats.errors.push({ userId: user.userID, error: userError.message });
                }
            }

            this.logger.info(`[ImportUsers] Imported ${stats.imported} users from device ${deviceId}`);
            
            return stats;
        } catch (error) {
            this.logger.error('[ImportUsers] Error:', error);
            throw error;
        }
    }

    /**
     * Compare database assignments with the current state of a device.
     */
    async compareDeviceToDatabase(deviceId) {
        const dbDevice = await this.getDbDevice(deviceId);

        if (!dbDevice) {
            throw new Error(`Device ${deviceId} is not registered in the database`);
        }

        const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
        const [dbUsers, deviceUsers, enrollmentCounts] = await Promise.all([
            this.getUsersFromDB(dbDevice.id),
            this.getUsersFromDevice(deviceId),
            this.prisma.deviceEnrollment.groupBy({
                by: ['status'],
                where: { deviceId: dbDevice.id },
                _count: { status: true }
            })
        ]);

        const dbUsersById = new Map(dbUsers.map((user) => [String(user.userID), {
            ...user,
            normalizedCardData: this.normalizeCardData(user.cardData)
        }]));
        const deviceUsersById = new Map(deviceUsers.map((user) => [String(user.userID), {
            ...user,
            normalizedCardData: this.normalizeCardData(user.cardData)
        }]));

        const missingOnDevice = [];
        const missingInDatabase = [];
        const cardMismatches = [];
        let matched = 0;

        for (const [userId, dbUser] of dbUsersById.entries()) {
            const deviceUser = deviceUsersById.get(userId);

            if (!deviceUser) {
                missingOnDevice.push({
                    userId,
                    employeeName: dbUser.name,
                    cardData: dbUser.cardData,
                    enrolledDevices: dbUser.enrolledDevices
                });
                continue;
            }

            if (dbUser.normalizedCardData !== deviceUser.normalizedCardData) {
                cardMismatches.push({
                    userId,
                    employeeName: dbUser.name || deviceUser.name || null,
                    databaseCardData: dbUser.cardData,
                    deviceCardData: deviceUser.cardData,
                    dbHasCard: !!dbUser.normalizedCardData,
                    deviceHasCard: !!deviceUser.normalizedCardData
                });
                continue;
            }

            matched += 1;
        }

        for (const [userId, deviceUser] of deviceUsersById.entries()) {
            if (!dbUsersById.has(userId)) {
                missingInDatabase.push({
                    userId,
                    employeeName: deviceUser.name || null,
                    cardData: deviceUser.cardData,
                    hasCard: deviceUser.hasCard
                });
            }
        }

        const enrollmentStatus = enrollmentCounts.reduce((acc, entry) => {
            acc[entry.status] = entry._count.status;
            return acc;
        }, {});

        return {
            device: {
                databaseDeviceId: dbDevice.id,
                supremaDeviceId,
                name: dbDevice.name,
                ip: dbDevice.ip,
                port: dbDevice.port,
                status: dbDevice.status,
                lastUserSync: dbDevice.last_user_sync,
                lastEventSync: dbDevice.last_event_sync
            },
            summary: {
                databaseUsers: dbUsers.length,
                deviceUsers: deviceUsers.length,
                matched,
                missingOnDevice: missingOnDevice.length,
                missingInDatabase: missingInDatabase.length,
                cardMismatches: cardMismatches.length,
                activeEnrollments: enrollmentStatus.active || 0,
                pendingEnrollments: enrollmentStatus.pending || 0,
                removedEnrollments: enrollmentStatus.removed || 0
            },
            differences: {
                missingOnDevice,
                missingInDatabase,
                cardMismatches
            }
        };
    }

    /**
     * Build a cross-device reconciliation overview.
     */
    async getReconciliationOverview() {
        const dbDevices = await this.connectionService.getAllDevicesFromDB();
        const connectedDevices = await this.connectionService.getConnectedDevices();
        const connectedKeys = new Set(
            connectedDevices.map((device) => {
                const info = device.toObject ? device.toObject() : device;
                return `${info.ipaddr}:${info.port}`;
            })
        );

        const devices = [];
        const summary = {
            totalDevices: dbDevices.length,
            connectedDevices: 0,
            disconnectedDevices: 0,
            matchedUsers: 0,
            missingOnDevice: 0,
            missingInDatabase: 0,
            cardMismatches: 0,
            devicesWithIssues: 0
        };

        for (const dbDevice of dbDevices) {
            const isConnected = connectedKeys.has(`${dbDevice.ip}:${dbDevice.port}`);

            if (!isConnected) {
                const enrollmentCounts = await this.prisma.deviceEnrollment.groupBy({
                    by: ['status'],
                    where: { deviceId: dbDevice.id },
                    _count: { status: true }
                });
                const enrollmentStatus = enrollmentCounts.reduce((acc, entry) => {
                    acc[entry.status] = entry._count.status;
                    return acc;
                }, {});

                summary.disconnectedDevices += 1;
                summary.devicesWithIssues += 1;
                summary.missingOnDevice += enrollmentStatus.active || 0;

                devices.push({
                    device: {
                        databaseDeviceId: dbDevice.id,
                        name: dbDevice.name,
                        ip: dbDevice.ip,
                        port: dbDevice.port,
                        status: dbDevice.status,
                        connected: false,
                        lastUserSync: dbDevice.last_user_sync,
                        lastEventSync: dbDevice.last_event_sync
                    },
                    summary: {
                        databaseUsers: enrollmentStatus.active || 0,
                        deviceUsers: null,
                        matched: 0,
                        missingOnDevice: enrollmentStatus.active || 0,
                        missingInDatabase: 0,
                        cardMismatches: 0,
                        activeEnrollments: enrollmentStatus.active || 0,
                        pendingEnrollments: enrollmentStatus.pending || 0,
                        removedEnrollments: enrollmentStatus.removed || 0
                    },
                    differences: {
                        missingOnDevice: [],
                        missingInDatabase: [],
                        cardMismatches: []
                    },
                    warning: 'Device is not currently connected'
                });
                continue;
            }

            try {
                const comparison = await this.compareDeviceToDatabase(dbDevice.id);

                summary.connectedDevices += 1;
                summary.matchedUsers += comparison.summary.matched;
                summary.missingOnDevice += comparison.summary.missingOnDevice;
                summary.missingInDatabase += comparison.summary.missingInDatabase;
                summary.cardMismatches += comparison.summary.cardMismatches;

                if (
                    comparison.summary.missingOnDevice > 0 ||
                    comparison.summary.missingInDatabase > 0 ||
                    comparison.summary.cardMismatches > 0
                ) {
                    summary.devicesWithIssues += 1;
                }

                devices.push({
                    ...comparison,
                    device: {
                        ...comparison.device,
                        connected: true
                    }
                });
            } catch (error) {
                summary.connectedDevices += 1;
                summary.devicesWithIssues += 1;

                devices.push({
                    device: {
                        databaseDeviceId: dbDevice.id,
                        name: dbDevice.name,
                        ip: dbDevice.ip,
                        port: dbDevice.port,
                        status: dbDevice.status,
                        connected: true,
                        lastUserSync: dbDevice.last_user_sync,
                        lastEventSync: dbDevice.last_event_sync
                    },
                    summary: {
                        databaseUsers: 0,
                        deviceUsers: null,
                        matched: 0,
                        missingOnDevice: 0,
                        missingInDatabase: 0,
                        cardMismatches: 0,
                        activeEnrollments: 0,
                        pendingEnrollments: 0,
                        removedEnrollments: 0
                    },
                    differences: {
                        missingOnDevice: [],
                        missingInDatabase: [],
                        cardMismatches: []
                    },
                    error: error.message
                });
            }
        }

        return {
            summary,
            devices
        };
    }

    async repairDeviceFromDatabase(deviceId) {
        const dbDevice = await this.getDbDevice(deviceId);

        if (!dbDevice) {
            throw new Error(`Device ${deviceId} is not registered in the database`);
        }

        const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
        const cardAssignments = await this.prisma.cardAssignment.findMany({
            where: {
                status: 'active',
                enrollments: {
                    some: {
                        deviceId: dbDevice.id,
                        status: 'active'
                    }
                }
            },
            include: {
                enrollments: true
            }
        });

        const syncStats = await this.syncDatabaseToDevice(supremaDeviceId, dbDevice.id, cardAssignments);
        const reconciliation = await this.compareDeviceToDatabase(dbDevice.id);

        return {
            action: 'db-to-device',
            deviceId: dbDevice.id,
            supremaDeviceId,
            syncStats,
            reconciliation
        };
    }

    async repairUserOnDevice(deviceId, userId) {
        const dbDevice = await this.getDbDevice(deviceId);

        if (!dbDevice) {
            throw new Error(`Device ${deviceId} is not registered in the database`);
        }

        const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
        const normalizedUserId = String(userId);
        const assignment = await this.prisma.cardAssignment.findFirst({
            where: {
                employeeId: normalizedUserId,
                status: 'active',
                enrollments: {
                    some: {
                        deviceId: dbDevice.id,
                        status: 'active'
                    }
                }
            }
        });

        if (!assignment) {
            const deleteResult = await this.deleteUserFromDevice(dbDevice.id, normalizedUserId);
            return {
                action: 'remove-device-user',
                userId: normalizedUserId,
                deviceId: dbDevice.id,
                result: deleteResult
            };
        }

        const deviceUsers = await this.getUsersFromDevice(dbDevice.id);
        const deviceUser = deviceUsers.find((user) => String(user.userID) === normalizedUserId);

        if (!deviceUser) {
            await this.enrollUserWithCard(supremaDeviceId, assignment);
        } else {
            await this.updateUserCard(supremaDeviceId, assignment);
        }

        await this.updateEnrollmentRecord(dbDevice.id, assignment.id, normalizedUserId, 'active');

        return {
            action: deviceUser ? 'update-user-card' : 'enroll-user',
            userId: normalizedUserId,
            deviceId: dbDevice.id,
            assignmentId: assignment.id,
            reconciliation: await this.compareDeviceToDatabase(dbDevice.id)
        };
    }

    // Helper methods

    normalizeCardData(cardData) {
        if (cardData === null || cardData === undefined || cardData === '') {
            return null;
        }

        if (Buffer.isBuffer(cardData)) {
            return cardData.toString('hex').toUpperCase();
        }

        if (Array.isArray(cardData)) {
            return JSON.stringify(cardData);
        }

        if (typeof cardData === 'object') {
            if (cardData.data !== undefined) {
                return this.normalizeCardData(cardData.data);
            }

            return JSON.stringify(cardData);
        }

        return String(cardData).trim().toUpperCase();
    }
    
    getCardTypeNumber(cardType) {
        const types = { 'CSN': 1, 'Secure': 2, 'Wiegand': 256, 'QR': 512 };
        return types[cardType] || 1;
    }

    async getSupremaDeviceId(dbDeviceId) {
        if (parseInt(dbDeviceId) > 100000) {
            return parseInt(dbDeviceId);
        }
        
        const connectedDevices = await this.connectionService.getConnectedDevices();
        const dbDevices = await this.connectionService.getAllDevicesFromDB();
        const dbDevice = dbDevices.find(d => d.id === parseInt(dbDeviceId));
        
        if (!dbDevice) {
            throw new Error(`Device with ID ${dbDeviceId} not found in database`);
        }
        
        for (const device of connectedDevices) {
            const info = device.toObject ? device.toObject() : device;
            if (info.ipaddr === dbDevice.ip && info.port === dbDevice.port) {
                return info.deviceid;
            }
        }
        
        throw new Error(`Device ${dbDevice.name} is not connected`);
    }

    async getDbDevice(deviceIdOrSupremaId) {
        const dbDevices = await this.connectionService.getAllDevicesFromDB();
        
        // If it looks like a DB ID
        if (parseInt(deviceIdOrSupremaId) < 100000) {
            return dbDevices.find(d => d.id === parseInt(deviceIdOrSupremaId));
        }
        
        // Otherwise it's a Suprema ID - find by connected device info
        const connectedDevices = await this.connectionService.getConnectedDevices();
        for (const device of connectedDevices) {
            const info = device.toObject ? device.toObject() : device;
            if (info.deviceid === parseInt(deviceIdOrSupremaId)) {
                return dbDevices.find(d => d.ip === info.ipaddr && d.port === info.port);
            }
        }
        
        return null;
    }

    /**
     * Repair ALL connected devices in sequence.
     * Returns per-device results including successes and failures.
     */
    async repairAllDevices() {
        const overview = await this.getReconciliationOverview();
        const results = [];
        let successCount = 0;
        let failureCount = 0;
        let skippedCount = 0;

        for (const entry of overview.devices) {
            if (!entry.device.connected) {
                skippedCount++;
                results.push({
                    deviceId: entry.device.databaseDeviceId,
                    name: entry.device.name,
                    status: 'skipped',
                    reason: 'Device not connected',
                });
                continue;
            }

            const hasDrift = entry.summary.missingOnDevice > 0
                || entry.summary.missingInDatabase > 0
                || entry.summary.cardMismatches > 0;

            if (!hasDrift) {
                skippedCount++;
                results.push({
                    deviceId: entry.device.databaseDeviceId,
                    name: entry.device.name,
                    status: 'skipped',
                    reason: 'No drift detected',
                });
                continue;
            }

            try {
                const repairResult = await this.repairDeviceFromDatabase(entry.device.databaseDeviceId);
                successCount++;
                results.push({
                    deviceId: entry.device.databaseDeviceId,
                    name: entry.device.name,
                    status: 'success',
                    syncStats: repairResult.syncStats,
                    reconciliation: repairResult.reconciliation?.summary || null,
                });
            } catch (error) {
                failureCount++;
                results.push({
                    deviceId: entry.device.databaseDeviceId,
                    name: entry.device.name,
                    status: 'failure',
                    error: error.message,
                });
            }
        }

        return {
            summary: {
                total: overview.devices.length,
                repaired: successCount,
                failed: failureCount,
                skipped: skippedCount,
            },
            devices: results,
        };
    }
}

export default UserSyncService;
