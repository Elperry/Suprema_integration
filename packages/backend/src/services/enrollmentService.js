/**
 * Enrollment Service
 * Handles the complete workflow for enrolling employees with cards on Suprema devices
 * 
 * Workflow:
 * 1. Scan card from device
 * 2. Search and select employee from HR database
 * 3. Assign card to employee (stored in CardAssignment)
 * 4. Enroll employee+card on selected devices (stored in DeviceEnrollment)
 */

import winston from 'winston';
import { encodeDecimalToHex, normalizeToHex, validateCardData } from '../core/utils/cardUtils.js';

// PrismaClient is no longer created at module level — it is injected via
// constructor options to avoid duplicate connections.
// See bootstrap.js for the wiring.

/**
 * Helper to convert BigInt values to regular numbers/strings for JSON serialization
 * @param {any} obj - Object that may contain BigInt values
 * @returns {any} Object with BigInt converted to Number or String
 */
function serializeBigInt(obj) {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj === 'bigint') {
        // Convert to number if safe, otherwise string
        return Number(obj);
    }
    if (Array.isArray(obj)) {
        return obj.map(serializeBigInt);
    }
    if (typeof obj === 'object') {
        const result = {};
        for (const key in obj) {
            result[key] = serializeBigInt(obj[key]);
        }
        return result;
    }
    return obj;
}

class EnrollmentService {
    /**
     * @param {Object} userService
     * @param {Object} cardService
     * @param {Object} connectionService
     * @param {Object} [options]
     * @param {import('@prisma/client').PrismaClient} [options.prisma] - Shared PrismaClient
     * @param {Object} [options.logger] - Logger instance
     */
    constructor(userService, cardService, connectionService, options = {}) {
        this.userService = userService;
        this.cardService = cardService;
        this.connectionService = connectionService;
        this.prisma = options.prisma || connectionService.database?.getPrisma();

        if (!this.prisma) {
            throw new Error('EnrollmentService requires a PrismaClient (pass via options.prisma or connectionService.database)');
        }
        
        this.logger = options.logger || winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/enrollment-service.log' })
            ]
        });
    }

    // ==================== CARD SCANNING ====================

    /**
     * Scan a card from a device
     * @param {number} deviceId - Database device ID
     * @param {number} timeout - Scan timeout in seconds
     * @returns {Promise<Object>} Scanned card data
     */
    async scanCard(deviceId, timeout = 10) {
        try {
            // Get the Suprema device ID
            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
            
            // Use the biometric/card service to scan
            const cardData = await this.cardService.scanCard(supremaDeviceId);
            
            // Normalize card data structure
            const normalizedCardData = this.normalizeCardData(cardData);
            
            // Check if card is already assigned using the CSN
            const existingAssignment = await this.getCardAssignmentByCardData(normalizedCardData.csn);
            
            return {
                ...normalizedCardData,
                isAssigned: !!existingAssignment,
                existingAssignment: existingAssignment
            };
        } catch (error) {
            this.logger.error('Error scanning card:', error);
            throw error;
        }
    }

    /**
     * Normalize card data from different sources
     * @param {Object} cardData - Raw card data from device
     * @returns {Object} Normalized card data
     * 
     * G-SDK Documentation Notes:
     * - CSNCardData.size is ALWAYS 32 for CSN cards
     * - CSNCardData.data contains the full 32-byte card data
     * - The actual card serial number may be shorter (e.g., 4-8 bytes) and is typically at the end
     */
    normalizeCardData(cardData) {
        // Handle various card data formats from Suprema devices
        if (!cardData) {
            throw new Error('No card data received');
        }

        this.logger.info('normalizeCardData input:', JSON.stringify(cardData));

        let csn = '';          // Human-readable CSN (trimmed)
        let fullData = '';     // Full 32-byte data as hex for device operations
        let rawBase64 = '';    // Original base64 data from protobuf
        let type = 'CSN';
        let size = 32;         // G-SDK: Always 32 for CSN cards

        // Extract card data from various Suprema protobuf formats
        // CardData.toObject() returns: { type, csncarddata: { type, size, data (base64) }, smartcarddata: {...} }
        const csnCardData = cardData.csnCardData || cardData.csncarddata || cardData.csnCarddata;
        const smartCardData = cardData.smartCardData || cardData.smartcarddata;
        const accessCardData = cardData.accessCardData || cardData.accesscarddata;

        if (csnCardData) {
            // CSN card format - data is base64 encoded from protobuf toObject()
            type = 'CSN';
            size = csnCardData.size || 32;  // Should always be 32 per G-SDK docs
            if (csnCardData.data) {
                // The data field from protobuf is base64 encoded
                if (typeof csnCardData.data === 'string' && csnCardData.data.length > 0) {
                    rawBase64 = csnCardData.data;  // Preserve raw base64 for device operations
                    try {
                        const buffer = Buffer.from(csnCardData.data, 'base64');
                        fullData = buffer.toString('hex').toUpperCase();  // Full 32-byte hex
                        
                        // For display purposes, extract the meaningful CSN bytes (typically last 4-8 bytes)
                        // But preserve full data for device operations
                        if (size > 0 && size <= buffer.length) {
                            // The meaningful CSN is typically in the last 'size' bytes, but since size=32
                            // we need to detect trailing zeros and extract the actual card number
                            // Most CSN cards have the actual ID at the end, padded with zeros at start
                            let actualBytes = buffer;
                            // Find first non-zero byte from the start
                            let firstNonZero = 0;
                            for (let i = 0; i < buffer.length; i++) {
                                if (buffer[i] !== 0) {
                                    firstNonZero = i;
                                    break;
                                }
                            }
                            // Extract the meaningful part for display
                            const meaningfulPart = buffer.slice(firstNonZero);
                            csn = meaningfulPart.toString('hex').toUpperCase();
                            this.logger.info(`CSN extracted: ${csn} (from byte ${firstNonZero})`);
                        } else {
                            csn = fullData;
                        }
                        this.logger.info(`Full 32-byte data: ${fullData}`);
                    } catch (e) {
                        // If not valid base64, use as-is
                        csn = csnCardData.data;
                        fullData = csnCardData.data;
                        this.logger.info('CSN from raw data string:', csn);
                    }
                } else if (Buffer.isBuffer(csnCardData.data)) {
                    fullData = csnCardData.data.toString('hex').toUpperCase();
                    csn = fullData;  // For buffers, use full data
                } else if (Array.isArray(csnCardData.data) || csnCardData.data instanceof Uint8Array) {
                    const buffer = Buffer.from(csnCardData.data);
                    fullData = buffer.toString('hex').toUpperCase();
                    csn = fullData;
                }
            }
            this.logger.info('Extracted CSN card data - CSN:', csn, 'Full:', fullData, 'size:', size);
        } else if (smartCardData) {
            type = 'SmartCard';
            if (smartCardData.data) {
                if (typeof smartCardData.data === 'string' && smartCardData.data.length > 0) {
                    rawBase64 = smartCardData.data;
                    try {
                        const buffer = Buffer.from(smartCardData.data, 'base64');
                        fullData = buffer.toString('hex').toUpperCase();
                        csn = fullData;
                    } catch (e) {
                        csn = smartCardData.data;
                        fullData = csn;
                    }
                }
            }
            this.logger.info('Extracted SmartCard data:', csn);
        } else if (accessCardData) {
            type = 'Access';
            if (accessCardData.data) {
                if (typeof accessCardData.data === 'string' && accessCardData.data.length > 0) {
                    rawBase64 = accessCardData.data;
                    try {
                        const buffer = Buffer.from(accessCardData.data, 'base64');
                        fullData = buffer.toString('hex').toUpperCase();
                        csn = fullData;
                    } catch (e) {
                        csn = accessCardData.data;
                        fullData = csn;
                    }
                }
            }
            this.logger.info('Extracted Access card data:', csn);
        } else if (cardData.csn && typeof cardData.csn === 'string') {
            csn = cardData.csn;
            fullData = csn;
            this.logger.info('Using direct csn property:', csn);
        } else if (cardData.data && typeof cardData.data === 'string') {
            csn = cardData.data;
            fullData = csn;
            this.logger.info('Using direct data property:', csn);
        } else if (typeof cardData === 'string') {
            csn = cardData;
            fullData = csn;
            this.logger.info('Card data is string:', csn);
        }

        this.logger.info('Normalized card data - CSN:', csn, 'Type:', type, 'Size:', size, 'FullData length:', fullData.length);

        if (!csn) {
            this.logger.warn('Could not extract CSN from card data. Raw structure:', Object.keys(cardData));
        }

        // Get the type code from the original card data
        let typeCode = 0x01; // Default CSN
        if (csnCardData && csnCardData.type !== undefined) {
            typeCode = csnCardData.type;
        }

        this.logger.info('Normalized card - size:', size, 'typeCode:', typeCode);

        return {
            csn,           // Human-readable card number (trimmed, for display)
            fullData,      // Full 32-byte hex data (for device operations)
            rawBase64,     // Original base64 from protobuf (for direct device operations)
            type,          // Card type string (CSN, SmartCard, Access)
            typeCode,      // The numeric type code from proto enum
            size: 32,      // G-SDK: Always 32 for CSN cards
            data: csn,     // Alias for csn (backward compatibility)
            raw: cardData  // Original raw card data object
        };
    }

    // ==================== CARD ASSIGNMENTS ====================

    /**
     * Get card assignment by card data (CSN)
     * @param {string} cardData - Card CSN or data
     * @returns {Promise<Object|null>} Card assignment or null
     */
    async getCardAssignmentByCardData(cardData) {
        try {
            const assignment = await this.prisma.cardAssignment.findUnique({
                where: { card_data: cardData },
                include: {
                    user: true,
                    enrollments: {
                        include: { device: true }
                    }
                }
            });

            if (!assignment) {
                return null;
            }

            const [enrichedAssignment] = await this.enrichAssignmentsWithEmployeeNames([assignment]);
            return enrichedAssignment || assignment;
        } catch (error) {
            this.logger.error('Error getting card assignment:', error);
            return null;
        }
    }

    /**
     * Get card assignment by ID or card data
     * @param {number|string} idOrCardData - Assignment ID or card data
     * @returns {Promise<Object|null>} Card assignment or null
     */
    async getCardAssignment(idOrCardData) {
        try {
            // If numeric, treat as ID
            if (typeof idOrCardData === 'number') {
                const assignment = await this.prisma.cardAssignment.findUnique({
                    where: { id: idOrCardData },
                    include: {
                        user: true,
                        enrollments: {
                            include: { device: true }
                        }
                    }
                });

                if (!assignment) {
                    return null;
                }

                const [enrichedAssignment] = await this.enrichAssignmentsWithEmployeeNames([assignment]);
                return enrichedAssignment || assignment;
            }
            // Otherwise treat as card data
            return await this.getCardAssignmentByCardData(idOrCardData);
        } catch (error) {
            this.logger.error('Error getting card assignment:', error);
            return null;
        }
    }

    /**
     * Get all card assignments with optional filters
     * @param {Object} filters - Filter options
     * @returns {Promise<Array>} Card assignments
     */
    async getAllCardAssignments(filters = {}) {
        try {
            const where = {};

            if (filters.status) {
                where.status = filters.status;
            }
            if (filters.employeeId) {
                // Resolve employee -> user, then filter by user_id
                const user = await this.prisma.user.findFirst({
                    where: { employee_id: Number(filters.employeeId) },
                    select: { id: true },
                });
                if (user) {
                    where.user_id = user.id;
                } else {
                    return []; // No user for this employee yet
                }
            }

            const assignments = await this.prisma.cardAssignment.findMany({
                where,
                include: {
                    user: true,
                    enrollments: {
                        include: { device: true }
                    }
                },
                orderBy: { assignedAt: 'desc' }
            });

            return await this.enrichAssignmentsWithEmployeeNames(assignments);
        } catch (error) {
            this.logger.error('Error getting card assignments:', error);
            throw error;
        }
    }

    resolveEmployeeDisplayName(employee) {
        return employee?.displayname
            || employee?.fullname
            || [employee?.firstname, employee?.lastname].filter(Boolean).join(' ')
            || null;
    }

    normalizeManualCardInput({ cardData, cardNumber } = {}) {
        const rawCardNumber = String(cardNumber ?? '').trim();
        if (rawCardNumber) {
            if (!/^\d+$/.test(rawCardNumber)) {
                throw new Error('Card number must be a decimal value');
            }

            return encodeDecimalToHex(rawCardNumber);
        }

        const rawCardData = String(cardData ?? '').trim();
        if (!rawCardData) {
            return null;
        }

        const validation = validateCardData(rawCardData);
        if (!validation.valid) {
            throw new Error('Card data must be a 64-character hex or Base64 value. Use cardNumber for decimal input.');
        }

        return normalizeToHex(rawCardData);
    }

    async enrichAssignmentsWithEmployeeNames(assignments) {
        if (!assignments || assignments.length === 0) {
            return assignments;
        }

        // Collect user_ids that need hydration (user may already be included via relation)
        const missingUserIds = [...new Set(
            assignments
                .filter((a) => !a.user && a.user_id)
                .map((a) => a.user_id)
                .filter(Number.isFinite)
        )];

        let userById = new Map();
        if (missingUserIds.length > 0) {
            try {
                const users = await this.prisma.user.findMany({
                    where: { id: { in: missingUserIds } },
                    select: { id: true, name: true, full_name: true, employee_id: true },
                });
                userById = new Map(users.map((u) => [u.id, u]));
            } catch (error) {
                this.logger.warn('Failed to enrich card assignments with user data:', error.message);
            }
        }

        return assignments.map((assignment) => {
            const user = assignment.user || userById.get(assignment.user_id);
            return {
                ...assignment,
                employeeName: user?.name || null,
                employeeId:   user?.employee_id || null,
            };
        });
    }

    /**
     * Assign a card to an employee
     * @param {Object} data - Assignment data
     * @returns {Promise<Object>} Created card assignment
     */
    async assignCardToEmployee(data) {
        const { employeeId, cardData, cardNumber, notes } = data;
        const normalizedCardData = this.normalizeManualCardInput({ cardData, cardNumber });

        this.logger.info('assignCardToEmployee called with:', {
            employeeId,
            hasCardData: Boolean(cardData),
            hasCardNumber: Boolean(cardNumber)
        });

        if (!employeeId || !normalizedCardData) {
            throw new Error(`Missing required fields: employeeId=${employeeId}, cardData=${cardData}, cardNumber=${cardNumber}`);
        }

        // Resolve the local user row for this employee
        const user = await this.prisma.user.findFirst({
            where: { employee_id: Number(employeeId) },
        });
        if (!user) {
            throw new Error(`No local user found for employee ${employeeId}. Ensure a sync cycle has run.`);
        }

        try {
            // Check if card is already assigned
            const existing = await this.getCardAssignment(normalizedCardData);
            this.logger.info('Existing card assignment check:', existing ? 'found' : 'not found');

            if (existing) {
                if (existing.status === 'active') {
                    throw new Error(`Card is already assigned to employee ${existing.user?.name || existing.user_id}`);
                }
                // Reactivate revoked card for new user
                this.logger.info('Reactivating revoked card assignment');
                const updated = await this.prisma.cardAssignment.update({
                    where: { id: existing.id },
                    data: {
                        user_id:    user.id,
                        status:     'active',
                        assignedAt: new Date(),
                        revokedAt:  null,
                        notes:      notes || null
                    },
                    include: {
                        user: true,
                        enrollments: { include: { device: true } }
                    }
                });
                this.logger.info('Card assignment reactivated:', updated.id);
                return updated;
            }

            // Create new assignment
            this.logger.info('Creating new card assignment');
            const assignment = await this.prisma.cardAssignment.create({
                data: {
                    user_id:   user.id,
                    card_data: normalizedCardData,
                    card_csn:  '',
                    notes:     notes || null
                },
                include: {
                    user: true,
                    enrollments: { include: { device: true } }
                }
            });

            this.logger.info(`Card assigned successfully: ID=${assignment.id}, Employee=${employeeId}`);
            return assignment;
        } catch (error) {
            this.logger.error('Error assigning card:', error);
            throw error;
        }
    }

    /**
     * Revoke a card assignment
     * @param {number} assignmentId - Card assignment ID
     * @param {string} reason - Reason for revocation
     * @returns {Promise<Object>} Updated assignment
     */
    async revokeCardAssignment(assignmentId, reason = '') {
        try {
            const assignment = await this.prisma.cardAssignment.update({
                where: { id: assignmentId },
                data: {
                    status: 'revoked',
                    revokedAt: new Date(),
                    notes: reason ? `Revoked: ${reason}` : 'Revoked'
                },
                include: {
                    enrollments: {
                        where: { status: 'active' },
                        include: { device: true }
                    }
                }
            });

            // Remove from all devices
            const failedDevices = [];
            for (const enrollment of assignment.enrollments) {
                try {
                    await this.removeFromDevice(enrollment.deviceId, assignmentId);
                } catch (err) {
                    this.logger.warn(`Failed to remove from device ${enrollment.deviceId}:`, err.message);
                    failedDevices.push({
                        deviceId: enrollment.deviceId,
                        deviceName: enrollment.device?.name || null,
                        message: err.message
                    });
                }
            }

            if (failedDevices.length > 0) {
                const failureSummary = failedDevices
                    .map((device) => device.deviceName
                        ? `${device.deviceName} (${device.deviceId})`
                        : String(device.deviceId))
                    .join(', ');
                const cleanupError = new Error(`Card was revoked in the database but could not be removed from ${failedDevices.length} device(s): ${failureSummary}`);
                cleanupError.failedDevices = failedDevices;
                throw cleanupError;
            }

            this.logger.info(`Card assignment ${assignmentId} revoked`);
            return assignment;
        } catch (error) {
            this.logger.error('Error revoking card assignment:', error);
            throw error;
        }
    }

    /**
     * Permanently delete an inactive card assignment from the database.
     * Active or still-enrolled assignments must be revoked/removed first.
     * @param {number} assignmentId - Card assignment ID
     * @returns {Promise<Object>} Deleted assignment summary
     */
    async deleteCardAssignment(assignmentId) {
        try {
            const assignment = await this.prisma.cardAssignment.findUnique({
                where: { id: assignmentId },
                include: {
                    enrollments: {
                        include: { device: true }
                    }
                }
            });

            if (!assignment) {
                throw new Error('Card assignment not found');
            }

            if (assignment.status === 'active') {
                throw new Error('Cannot permanently delete an active card assignment. Revoke it first.');
            }

            const activeEnrollments = assignment.enrollments.filter((enrollment) => enrollment.status === 'active' || enrollment.status === 'pending');

            if (activeEnrollments.length > 0) {
                const deviceSummary = activeEnrollments
                    .map((enrollment) => enrollment.device?.name || `Device ${enrollment.deviceId}`)
                    .join(', ');
                throw new Error(`Cannot delete this card assignment while it is still enrolled on ${activeEnrollments.length} device(s): ${deviceSummary}`);
            }

            await this.prisma.cardAssignment.delete({
                where: { id: assignmentId }
            });

            this.logger.info(`Card assignment ${assignmentId} permanently deleted`);

            return {
                id: assignment.id,
                user_id: assignment.user_id,
                status: assignment.status,
                deletedEnrollments: assignment.enrollments.length,
            };
        } catch (error) {
            this.logger.error('Error deleting card assignment:', error);
            throw error;
        }
    }

    /**
     * Update card assignment status (lost, expired, etc.)
     * @param {number} assignmentId - Card assignment ID
     * @param {string} status - New status
     * @returns {Promise<Object>} Updated assignment
     */
    async updateCardStatus(assignmentId, status) {
        try {
            return await this.prisma.cardAssignment.update({
                where: { id: assignmentId },
                data: {
                    status,
                    ...(status !== 'active' ? { revokedAt: new Date() } : { revokedAt: null })
                },
                include: {
                    enrollments: {
                        include: { device: true }
                    }
                }
            });
        } catch (error) {
            this.logger.error('Error updating card status:', error);
            throw error;
        }
    }

    /**
     * Replace a card assignment with a new card.
     * 1. Revokes the old card (removes from all devices)
     * 2. Creates a new card assignment for the same employee
     * 3. Re-enrolls on the same devices the old card was on
     * @param {number} oldAssignmentId - ID of the old card assignment
     * @param {Object} newCardData - New card data { cardData, cardType, cardFormat, notes }
     * @returns {Promise<Object>} { oldAssignment, newAssignment, enrollmentResults }
     */
    async replaceCard(oldAssignmentId, newCardData) {
        const oldAssignment = await this.prisma.cardAssignment.findUnique({
            where: { id: oldAssignmentId },
            include: {
                user: true,
                enrollments: {
                    where: { status: 'active' },
                    include: { device: true }
                }
            }
        });

        if (!oldAssignment) {
            throw new Error('Card assignment not found');
        }

        // Remember enrolled devices before revoking
        const enrolledDeviceIds = oldAssignment.enrollments.map(e => e.deviceId);

        // Revoke the old card
        const revokedAssignment = await this.revokeCardAssignment(
            oldAssignmentId,
            `Replaced with new card`
        );

        // Create new card assignment for the same user
        const newAssignment = await this.assignCardToEmployee({
            employeeId: String(oldAssignment.user?.employee_id || oldAssignment.user_id),
            cardData: newCardData.cardData,
            cardNumber: newCardData.cardNumber,
            notes: newCardData.notes || `Replacement for card #${oldAssignmentId}`
        });

        // Re-enroll on the same devices
        let enrollmentResults = null;
        if (enrolledDeviceIds.length > 0) {
            try {
                enrollmentResults = await this.enrollOnMultipleDevices(enrolledDeviceIds, newAssignment.id);
            } catch (err) {
                this.logger.warn('Re-enrollment on devices partially failed:', err.message);
                enrollmentResults = { error: err.message };
            }
        }

        this.logger.info(`Card replaced: old=#${oldAssignmentId} → new=#${newAssignment.id} for user ${oldAssignment.user_id}`);
        return {
            oldAssignment: revokedAssignment,
            newAssignment,
            enrollmentResults,
            reenrolledDevices: enrolledDeviceIds.length
        };
    }

    /**
     * Get card history for an employee (all card assignments, past and present)
     * @param {string} employeeId - Employee ID
     * @returns {Promise<Array>} List of card assignments with enrollment history
     */
    async getCardHistory(employeeId) {
        // Find the user by employee_id to get their user row, then fetch card assignments
        const user = await this.prisma.user.findFirst({
            where: { employee_id: parseInt(employeeId) }
        });

        const whereClause = user
            ? { user_id: user.id }
            : { user_id: -1 }; // no match if user not found

        const assignments = await this.prisma.cardAssignment.findMany({
            where: whereClause,
            include: {
                user: true,
                enrollments: {
                    include: { device: true }
                }
            },
            orderBy: { assignedAt: 'desc' }
        });

        return assignments.map(a => ({
            id: a.id,
            employeeName: a.user?.name || null,
            card_data: a.card_data,
            status: a.status,
            assignedAt: a.assignedAt,
            revokedAt: a.revokedAt,
            notes: a.notes,
            enrollments: a.enrollments.map(e => ({
                deviceId: e.deviceId,
                deviceName: e.device?.name,
                status: e.status,
                enrolledAt: e.enrolledAt
            }))
        }));
    }

    // ==================== DEVICE ENROLLMENT ====================

    /**
     * Enroll a card assignment on a device
     * @param {number} deviceId - Database device ID
     * @param {number} assignmentId - Card assignment ID
     * @returns {Promise<Object>} Enrollment result
     */
    async enrollOnDevice(deviceId, assignmentId) {
        try {
            // Get the card assignment including user for employee_id / name
            const assignment = await this.prisma.cardAssignment.findUnique({
                where: { id: assignmentId },
                include: { user: true }
            });

            if (!assignment) {
                throw new Error('Card assignment not found');
            }

            if (assignment.status !== 'active') {
                throw new Error('Cannot enroll inactive card assignment');
            }

            // Derive the device user ID from the local user.id (primary key, used as Suprema user ID)
            const deviceUserId = String(assignment.user?.id ?? assignment.user_id);

            // Check if already enrolled on this device (by card assignment)
            const existingEnrollment = await this.prisma.deviceEnrollment.findUnique({
                where: {
                    deviceId_cardAssignmentId: {
                        deviceId,
                        cardAssignmentId: assignmentId
                    }
                }
            });

            if (existingEnrollment && existingEnrollment.status === 'active') {
                throw new Error('Already enrolled on this device');
            }

            // Also check if this user already has enrollment on this device
            const existingUserEnrollment = await this.prisma.deviceEnrollment.findFirst({
                where: {
                    deviceId,
                    deviceUserId
                }
            });

            // Get Suprema device ID
            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);

            const employeeName = assignment.user?.name || `Employee ${deviceUserId}`;
            this.logger.info(`Enrolling user ${deviceUserId} (${employeeName}) on device ${supremaDeviceId}`);

            const userData = {
                id: deviceUserId,
                name: employeeName,
                numOfCard: 0  // Start with 0 cards, add card separately
            };

            // Only create user on device if they don't already exist
            if (!existingUserEnrollment) {
                // Enroll user on device first (creates the user without cards)
                await this.userService.enrollUsers(supremaDeviceId, [userData]);
                this.logger.info(`User ${deviceUserId} created on device, now adding card...`);
            } else {
                this.logger.info(`User ${deviceUserId} already exists on device, updating card...`);
            }

            // Gather every active card this user should have on THIS device:
            // their existing active enrollments on this device plus the one being
            // enrolled now. SetCard replaces the user's whole card list, so all of
            // the user's cards must be sent together — otherwise the others vanish.
            const existingActiveEnrollments = await this.prisma.deviceEnrollment.findMany({
                where: { deviceId, deviceUserId, status: 'active' },
                include: { cardAssignment: true }
            });

            const cardAssignmentsForUser = new Map();
            for (const e of existingActiveEnrollments) {
                if (e.cardAssignment && e.cardAssignment.status === 'active') {
                    cardAssignmentsForUser.set(e.cardAssignment.id, e.cardAssignment);
                }
            }
            // Include the assignment being enrolled now.
            cardAssignmentsForUser.set(assignment.id, assignment);

            const cardData = [];
            const seenCardHex = new Set();
            for (const ca of cardAssignmentsForUser.values()) {
                let hex = String(ca.card_data || '').replace(/[^0-9A-Fa-f]/g, '');
                if (!hex) continue;
                if (hex.length % 2 === 1) hex = '0' + hex;
                hex = hex.toUpperCase();
                if (seenCardHex.has(hex)) continue;
                seenCardHex.add(hex);
                cardData.push({
                    userId: deviceUserId,
                    cardData: hex,
                    cardType: this.getCardTypeCode('CSN'),
                    // G-SDK: CSNCardData.size is ALWAYS 32 for CSN cards
                    cardSize: 32
                });
            }

            await this.userService.setUserCards(supremaDeviceId, cardData);

            this.logger.info(`Successfully enrolled user ${deviceUserId} with ${cardData.length} card(s) on device ${supremaDeviceId}`);

            // Upsert the enrollment record for THIS card assignment only. Each card
            // the user holds has its own enrollment row, so we never repoint others.
            const enrollment = existingEnrollment
                ? await this.prisma.deviceEnrollment.update({
                    where: { id: existingEnrollment.id },
                    data: {
                        deviceUserId,
                        status: 'active',
                        enrolledAt: new Date(),
                        lastSyncAt: new Date()
                    },
                    include: { device: true, cardAssignment: true }
                })
                : await this.prisma.deviceEnrollment.create({
                    data: {
                        deviceId,
                        cardAssignmentId: assignmentId,
                        deviceUserId,
                        status: 'active'
                    },
                    include: { device: true, cardAssignment: true }
                });

            this.logger.info(`Enrolled assignment ${assignmentId} on device ${deviceId}`);
            return enrollment;
        } catch (error) {
            this.logger.error('Error enrolling on device:', error);
            throw error;
        }
    }

    /**
     * Enroll a card assignment on multiple devices
     * @param {Array<number>} deviceIds - Database device IDs
     * @param {number} assignmentId - Card assignment ID
     * @returns {Promise<Object>} Enrollment results
     */
    async enrollOnMultipleDevices(deviceIds, assignmentId) {
        const results = {
            successful: [],
            failed: []
        };

        for (const rawDeviceId of deviceIds) {
            const deviceId = parseInt(rawDeviceId, 10);

            if (Number.isNaN(deviceId)) {
                results.failed.push({ deviceId: rawDeviceId, error: 'Invalid device ID' });
                continue;
            }

            try {
                const enrollment = await this.enrollOnDevice(deviceId, assignmentId);
                results.successful.push({ deviceId, enrollment });
            } catch (error) {
                results.failed.push({ deviceId, error: error.message });
            }
        }

        return results;
    }

    /**
     * Remove enrollment from a device
     * @param {number} deviceId - Database device ID
     * @param {number} assignmentId - Card assignment ID
     * @returns {Promise<Object>} Removal result
     */
    async removeFromDevice(deviceId, assignmentId) {
        try {
            // Get enrollment
            const enrollment = await this.prisma.deviceEnrollment.findUnique({
                where: {
                    deviceId_cardAssignmentId: {
                        deviceId,
                        cardAssignmentId: assignmentId
                    }
                },
                include: { cardAssignment: true }
            });

            if (!enrollment) {
                throw new Error('Enrollment not found');
            }

            // Get Suprema device ID
            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);

            const rawCardData = String(enrollment.cardAssignment?.card_data || '').trim();
            const cardValidation = validateCardData(rawCardData);
            const normalizedCardHex = cardValidation.valid
                ? normalizeToHex(rawCardData)
                : '';
            let removalResult = {
                removed: false,
                notFound: false,
                userId: String(enrollment.deviceUserId)
            };

            if (rawCardData && !cardValidation.valid) {
                this.logger.warn(`Enrollment ${enrollment.id} has invalid stored card data and cannot be normalized for device removal`);
            }

            if (normalizedCardHex) {
                removalResult = await this.userService.removeUserCard(
                    supremaDeviceId,
                    enrollment.deviceUserId,
                    normalizedCardHex
                );

                if (!removalResult.removed && removalResult.notFound) {
                    const resolvedUserId = await this.userService.findUserWithCard(supremaDeviceId, normalizedCardHex);

                    if (resolvedUserId && String(resolvedUserId) !== String(enrollment.deviceUserId)) {
                        this.logger.warn(`Enrollment ${enrollment.id} used stale device user ${enrollment.deviceUserId}; removing card from device user ${resolvedUserId} instead`);
                        removalResult = await this.userService.removeUserCard(
                            supremaDeviceId,
                            resolvedUserId,
                            normalizedCardHex
                        );
                    } else if (!resolvedUserId) {
                        this.logger.info(`Card ${normalizedCardHex} is already absent from device ${deviceId}`);
                        removalResult = {
                            removed: false,
                            notFound: false,
                            alreadyRemoved: true,
                            userId: String(enrollment.deviceUserId)
                        };
                    }
                }
            }

            if (!removalResult.removed && !removalResult.alreadyRemoved) {
                throw new Error(`Card ${assignmentId} could not be removed from device ${deviceId}`);
            }

            // Update enrollment status
            const updated = await this.prisma.deviceEnrollment.update({
                where: { id: enrollment.id },
                data: {
                    status: 'removed',
                    deviceUserId: String(removalResult.userId || enrollment.deviceUserId)
                },
                include: { device: true, cardAssignment: true }
            });

            this.logger.info(`Removed enrollment ${enrollment.id} from device ${deviceId}`);
            return updated;
        } catch (error) {
            this.logger.error('Error removing from device:', error);
            throw error;
        }
    }

    /**
     * Get all enrollments for a device
     * @param {number} deviceId - Database device ID
     * @returns {Promise<Array>} Device enrollments
     */
    async getDeviceEnrollments(deviceId) {
        try {
            return await this.prisma.deviceEnrollment.findMany({
                where: { deviceId },
                include: { cardAssignment: true },
                orderBy: { enrolledAt: 'desc' }
            });
        } catch (error) {
            this.logger.error('Error getting device enrollments:', error);
            throw error;
        }
    }

    /**
     * Get all enrollments for a card assignment
     * @param {number} assignmentId - Card assignment ID
     * @returns {Promise<Array>} Enrollments
     */
    async getAssignmentEnrollments(assignmentId) {
        try {
            return await this.prisma.deviceEnrollment.findMany({
                where: { cardAssignmentId: assignmentId },
                include: { device: true },
                orderBy: { enrolledAt: 'desc' }
            });
        } catch (error) {
            this.logger.error('Error getting assignment enrollments:', error);
            throw error;
        }
    }

    // ==================== SYNC OPERATIONS ====================

    /**
     * Sync all active enrollments to a device
     * @param {number} deviceId - Database device ID
     * @returns {Promise<Object>} Sync results
     */
    async syncToDevice(deviceId) {
        try {
            const enrollments = await this.prisma.deviceEnrollment.findMany({
                where: {
                    deviceId,
                    status: 'active'
                },
                include: { cardAssignment: { include: { user: true } } }
            });

            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
            
            // Group enrollments by device user so a user with multiple cards is
            // pushed in a single SetCard call (SetCard replaces the whole list).
            const enrollmentsByUser = new Map();
            for (const enrollment of enrollments) {
                const key = String(enrollment.deviceUserId);
                if (!enrollmentsByUser.has(key)) enrollmentsByUser.set(key, []);
                enrollmentsByUser.get(key).push(enrollment);
            }

            const results = {
                total: enrollments.length,
                synced: 0,
                failed: 0,
                errors: []
            };

            for (const [deviceUserId, userEnrollments] of enrollmentsByUser.entries()) {
                try {
                    // IMPORTANT: Set numOfCard to 0 during initial enrollment
                    // We will add the cards separately using setUserCards
                    // Setting numOfCard: 1 without providing card data causes "Invalid card data" error
                    const userData = {
                        id: deviceUserId,
                        name: userEnrollments[0].cardAssignment.user?.name || `Employee ${deviceUserId}`,
                        numOfCard: 0  // Start with 0 cards, add cards separately
                    };

                    // Enroll user first (without cards)
                    await this.userService.enrollUsers(supremaDeviceId, [userData]);

                    // Then set ALL of this user's cards in one call
                    const seenCardHex = new Set();
                    const cardData = [];
                    for (const enrollment of userEnrollments) {
                        let hex = String(enrollment.cardAssignment.card_data || '').replace(/[^0-9A-Fa-f]/g, '');
                        if (!hex) continue;
                        if (hex.length % 2 === 1) hex = '0' + hex;
                        hex = hex.toUpperCase();
                        if (seenCardHex.has(hex)) continue;
                        seenCardHex.add(hex);
                        cardData.push({
                            userId: deviceUserId,
                            cardData: hex,
                            cardType: this.getCardTypeCode('CSN'),
                            // G-SDK: CSNCardData.size is ALWAYS 32 for CSN cards
                            cardSize: 32
                        });
                    }

                    if (cardData.length > 0) {
                        await this.userService.setUserCards(supremaDeviceId, cardData);
                    }

                    await this.prisma.deviceEnrollment.updateMany({
                        where: { id: { in: userEnrollments.map(e => e.id) } },
                        data: { lastSyncAt: new Date() }
                    });

                    results.synced += userEnrollments.length;
                } catch (error) {
                    results.failed += userEnrollments.length;
                    for (const enrollment of userEnrollments) {
                        results.errors.push({
                            enrollmentId: enrollment.id,
                            error: error.message
                        });
                    }
                }
            }

            // Update device last sync time
            await this.prisma.device.update({
                where: { id: deviceId },
                data: { last_user_sync: new Date() }
            });

            this.logger.info(`Synced ${results.synced}/${results.total} enrollments to device ${deviceId}`);
            return results;
        } catch (error) {
            this.logger.error('Error syncing to device:', error);
            throw error;
        }
    }

    /**
     * Sync a card assignment to all enrolled devices
     * @param {number} assignmentId - Card assignment ID
     * @returns {Promise<Object>} Sync results
     */
    async syncAssignmentToDevices(assignmentId) {
        try {
            const enrollments = await this.prisma.deviceEnrollment.findMany({
                where: {
                    cardAssignmentId: assignmentId,
                    status: 'active'
                },
                include: { device: true }
            });

            const results = {
                total: enrollments.length,
                synced: 0,
                failed: 0,
                errors: []
            };

            for (const enrollment of enrollments) {
                try {
                    await this.enrollOnDevice(enrollment.deviceId, assignmentId);
                    results.synced++;
                } catch (error) {
                    results.failed++;
                    results.errors.push({
                        deviceId: enrollment.deviceId,
                        error: error.message
                    });
                }
            }

            return results;
        } catch (error) {
            this.logger.error('Error syncing assignment to devices:', error);
            throw error;
        }
    }

    // ==================== EMPLOYEE QUERIES ====================

    /**
     * Search employees from HR database
     * @param {string} searchTerm - Search term
     * @param {number} limit - Result limit
     * @returns {Promise<Array>} Employees
     */
    async searchEmployees(searchTerm, limit = 20) {
        try {
            const rows = await this.prisma.employee.findMany({
                where: {
                    OR: [
                        { ssn:         { contains: searchTerm } },
                        { fullname:    { contains: searchTerm } },
                        { displayname: { contains: searchTerm } },
                        { firstname:   { contains: searchTerm } },
                        { lastname:    { contains: searchTerm } },
                        { jobtitle:    { contains: searchTerm } },
                    ],
                },
                take: limit,
            });

            const employees = rows.map(emp => ({
                employee_id: emp.id,
                name: emp.displayname || emp.fullname || [emp.firstname, emp.lastname].filter(Boolean).join(' '),
                department:  emp.jobtitle,
                fullname:    emp.fullname,
                displayname: emp.displayname,
                firstname:   emp.firstname,
                lastname:    emp.lastname,
                email:       emp.email,
                mobile:      emp.mobile,
                ssn:         emp.ssn,
                card:        emp.card,
            }));

            // Enrich with card assignment status
            const enriched = await Promise.all(employees.map(async (emp) => {
                const localUser = await this.prisma.user.findFirst({
                    where: { employee_id: parseInt(emp.employee_id) },
                });
                const cards = localUser
                    ? await this.prisma.cardAssignment.findMany({
                        where: { user_id: localUser.id, status: 'active' },
                        include: { enrollments: { include: { device: true } } },
                        orderBy: { assignedAt: 'asc' },
                    })
                    : [];
                // cardAssignment kept (= first card) for backward compatibility.
                return { ...emp, hasCard: cards.length > 0, cardCount: cards.length, cards, cardAssignment: cards[0] || null };
            }));

            return enriched;
        } catch (error) {
            this.logger.error('Error searching employees:', error);
            throw error;
        }
    }

    /**
     * Get all employees with enrollment status
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Employees
     */
    async getEmployeesWithStatus(options = {}) {
        try {
            const { limit = 100, offset = 0, enrolled = null } = options;

            const rows = await this.prisma.employee.findMany({
                orderBy: { fullname: 'asc' },
                take: limit,
                skip: offset,
            });

            let employees = rows.map(emp => ({
                employee_id: emp.id,
                name: emp.displayname || emp.fullname || [emp.firstname, emp.lastname].filter(Boolean).join(' '),
                department:  emp.jobtitle,
                fullname:    emp.fullname,
                displayname: emp.displayname,
                firstname:   emp.firstname,
                lastname:    emp.lastname,
                email:       emp.email,
                mobile:      emp.mobile,
                ssn:         emp.ssn,
                card:        emp.card,
            }));

            employees = await Promise.all(employees.map(async (emp) => {
                const localUser = await this.prisma.user.findFirst({
                    where: { employee_id: parseInt(emp.employee_id) },
                });
                const cards = localUser
                    ? await this.prisma.cardAssignment.findMany({
                        where: { user_id: localUser.id, status: 'active' },
                        include: {
                            enrollments: { where: { status: 'active' }, include: { device: true } },
                        },
                        orderBy: { assignedAt: 'asc' },
                    })
                    : [];
                // Union of devices across all of the user's cards.
                const enrolledDevices = [];
                const seenDeviceIds = new Set();
                for (const card of cards) {
                    for (const e of card.enrollments || []) {
                        if (e.device && !seenDeviceIds.has(e.device.id)) {
                            seenDeviceIds.add(e.device.id);
                            enrolledDevices.push(e.device);
                        }
                    }
                }
                return {
                    ...emp,
                    hasCard: cards.length > 0,
                    cardCount: cards.length,
                    cards,
                    // cardAssignment kept (= first card) for backward compatibility.
                    cardAssignment: cards[0] || null,
                    enrolledDevices,
                };
            }));

            if (enrolled === true)  employees = employees.filter(e => e.hasCard);
            if (enrolled === false) employees = employees.filter(e => !e.hasCard);

            return employees;
        } catch (error) {
            this.logger.error('Error getting employees with status:', error);
            throw error;
        }
    }

    // ==================== HELPER METHODS ====================

    /**
     * Get Suprema device ID from database ID
     * @param {number} dbDeviceId - Database device ID
     * @returns {Promise<number>} Suprema device ID
     */
    async getSupremaDeviceId(dbDeviceId) {
        // Check if it's already a Suprema device ID (large number)
        if (parseInt(dbDeviceId) > 100000) {
            return parseInt(dbDeviceId);
        }

        const connectedDevices = await this.connectionService.getConnectedDevices();
        const devices = await this.connectionService.getAllDevicesFromDB();
        const dbDevice = devices.find(d => d.id === parseInt(dbDeviceId));

        if (!dbDevice) {
            throw new Error(`Device with ID ${dbDeviceId} not found in database`);
        }

        // Find matching connected device by IP
        for (const device of connectedDevices) {
            const info = device.toObject ? device.toObject() : device;
            if (info.ipaddr === dbDevice.ip && info.port === dbDevice.port) {
                return info.deviceid;
            }
        }

        throw new Error(`Device ${dbDevice.name} (${dbDevice.ip}) is not connected`);
    }

    /**
     * Convert card type string to Suprema card type code
     * @param {string} cardType - Card type string
     * @returns {number} Card type code
     */
    getCardTypeCode(cardType) {
        // From card.proto enum Type:
        // CARD_TYPE_UNKNOWN         = 0x00
        // CARD_TYPE_CSN             = 0x01
        // CARD_TYPE_SECURE          = 0x02
        // CARD_TYPE_ACCESS          = 0x03
        // CARD_TYPE_CSN_MOBILE      = 0x04
        // CARD_TYPE_WIEGAND_MOBILE  = 0x05
        // CARD_TYPE_QR              = 0x06
        // CARD_TYPE_SECURE_QR       = 0x07
        // CARD_TYPE_WIEGAND         = 0x0A
        // CARD_TYPE_CONFIG_CARD     = 0x0B
        // CARD_TYPE_CUSTOM_SMART    = 0x0D
        const cardTypes = {
            'UNKNOWN': 0x00,
            'CSN': 0x01,            // Card Serial Number
            'SECURE': 0x02,         // Secure credential
            'ACCESS': 0x03,         // Access credential
            'CSN_MOBILE': 0x04,     // CSN Mobile
            'WIEGAND_MOBILE': 0x05, // Wiegand Mobile
            'QR': 0x06,             // QR Code
            'SECURE_QR': 0x07,      // Secure QR
            'WIEGAND': 0x0A,        // Wiegand format
            'CONFIG_CARD': 0x0B,    // Config card
            'CUSTOM_SMART': 0x0D    // Custom smart card
        };
        return cardTypes[cardType?.toUpperCase()] ?? 0x01; // Default to CSN (1)
    }

    /**
     * Get enrollment statistics
     * @returns {Promise<Object>} Statistics
     */
    async getStatistics() {
        try {
            const [
                totalAssignments,
                activeAssignments,
                revokedAssignments,
                totalEnrollments,
                activeEnrollments
            ] = await Promise.all([
                this.prisma.cardAssignment.count(),
                this.prisma.cardAssignment.count({ where: { status: 'active' } }),
                this.prisma.cardAssignment.count({ where: { status: 'revoked' } }),
                this.prisma.deviceEnrollment.count(),
                this.prisma.deviceEnrollment.count({ where: { status: 'active' } })
            ]);

            // Get enrollments per device
            const enrollmentsPerDevice = await this.prisma.deviceEnrollment.groupBy({
                by: ['deviceId'],
                where: { status: 'active' },
                _count: { id: true }
            });

            return {
                cards: {
                    total: totalAssignments,
                    active: activeAssignments,
                    revoked: revokedAssignments
                },
                enrollments: {
                    total: totalEnrollments,
                    active: activeEnrollments
                },
                byDevice: enrollmentsPerDevice
            };
        } catch (error) {
            this.logger.error('Error getting statistics:', error);
            throw error;
        }
    }

    /**
     * Record a card assignment that already exists on a device, importing it to the database.
     * This is the single write-path for device-import operations — no gRPC call is made because
     * the data originated FROM the device.
     *
     * @param {Object} data
     * @param {number} data.userId       - Local DB user.id
     * @param {string} data.cardData     - Normalised card data (hex string)
     * @param {number|null} data.deviceDbId   - Local DB device.id (null if unknown)
     * @param {string} data.deviceUserId - Suprema user ID string on the device
     * @returns {Promise<Object>} Created card assignment
     */
    async recordCardImport({ userId, cardData, deviceDbId, deviceUserId }) {
        return await this.prisma.$transaction(async (tx) => {
            const cardAssignment = await tx.cardAssignment.create({
                data: {
                    user_id: userId,
                    card_data: cardData,
                    card_csn: '',
                    status: 'active',
                }
            });

            if (deviceDbId != null) {
                // Upsert the device enrollment record without calling gRPC.
                // Each card gets its own row keyed by (deviceId, cardAssignmentId);
                // a user may hold multiple cards on the same device.
                const dvUserId = String(deviceUserId);

                await tx.deviceEnrollment.upsert({
                    where: {
                        deviceId_cardAssignmentId: {
                            deviceId: deviceDbId,
                            cardAssignmentId: cardAssignment.id
                        }
                    },
                    create: {
                        deviceId: deviceDbId,
                        cardAssignmentId: cardAssignment.id,
                        deviceUserId: dvUserId,
                        status: 'active',
                        lastSyncAt: new Date()
                    },
                    update: {
                        status: 'active',
                        deviceUserId: dvUserId,
                        lastSyncAt: new Date()
                    }
                });
            }

            return cardAssignment;
        });
    }
}

export default EnrollmentService;
