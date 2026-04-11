/**
 * User Sync Service
 * 
 * Manages synchronization between database (source of truth) and Suprema devices.
 * The database is the centralized data source for all users and card assignments.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserSyncService {
    constructor(userService, connectionService, logger) {
        this.userService = userService;
        this.connectionService = connectionService;
        this.logger = logger || console;
    }

    /**
     * Get all users from database with their card assignments
     * This is the primary data source
     */
    async getUsersFromDB(deviceId = null) {
        try {
            const whereClause = deviceId ? {
                enrollments: {
                    some: {
                        deviceId: parseInt(deviceId),
                        status: 'active'
                    }
                }
            } : {};

            const cardAssignments = await prisma.cardAssignment.findMany({
                where: {
                    status: 'active',
                    ...whereClause
                },
                include: {
                    enrollments: {
                        include: {
                            device: true
                        }
                    }
                }
            });

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
            const cardAssignments = await prisma.cardAssignment.findMany({
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
                cardAssignments = await prisma.cardAssignment.findMany({
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
            await prisma.deviceEnrollment.upsert({
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
            await prisma.deviceEnrollment.updateMany({
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
                await prisma.deviceEnrollment.updateMany({
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
            await prisma.deviceEnrollment.updateMany({
                where: { deviceUserId: userId },
                data: { status: 'removed', lastSyncAt: new Date() }
            });

            // Optionally revoke the card
            if (revokeCard) {
                await prisma.cardAssignment.updateMany({
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
                    const existingCard = await prisma.cardAssignment.findFirst({
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
                        const cardAssignment = await prisma.cardAssignment.create({
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
                            await prisma.deviceEnrollment.create({
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

    // Helper methods
    
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
}

export default UserSyncService;
