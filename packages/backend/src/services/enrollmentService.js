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

import { PrismaClient } from '@prisma/client';
import winston from 'winston';

const prisma = new PrismaClient();

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
    constructor(userService, cardService, connectionService) {
        this.userService = userService;
        this.cardService = cardService;
        this.connectionService = connectionService;
        
        this.logger = winston.createLogger({
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
     */
    normalizeCardData(cardData) {
        // Handle various card data formats from Suprema devices
        if (!cardData) {
            throw new Error('No card data received');
        }

        this.logger.info('normalizeCardData input:', JSON.stringify(cardData));

        let csn = '';
        let type = 'CSN';
        let size = 0;

        // Extract card data from various Suprema protobuf formats
        // CardData.toObject() returns: { type, csncarddata: { type, size, data (base64) }, smartcarddata: {...} }
        const csnCardData = cardData.csnCardData || cardData.csncarddata || cardData.csnCarddata;
        const smartCardData = cardData.smartCardData || cardData.smartcarddata;
        const accessCardData = cardData.accessCardData || cardData.accesscarddata;

        if (csnCardData) {
            // CSN card format - data is base64 encoded from protobuf toObject()
            type = 'CSN';
            size = csnCardData.size || 0;
            if (csnCardData.data) {
                // The data field from protobuf is base64 encoded
                if (typeof csnCardData.data === 'string' && csnCardData.data.length > 0) {
                    // Convert base64 to hex for consistent storage
                    try {
                        const buffer = Buffer.from(csnCardData.data, 'base64');
                        // If size is provided, only use that many bytes from the end
                        if (size > 0 && size < buffer.length) {
                            const trimmedBuffer = buffer.slice(buffer.length - size);
                            csn = trimmedBuffer.toString('hex').toUpperCase();
                            this.logger.info(`CSN from base64 data (trimmed to size ${size}):`, csn);
                        } else {
                            csn = buffer.toString('hex').toUpperCase();
                            this.logger.info('CSN from base64 data:', csn);
                        }
                    } catch (e) {
                        // If not valid base64, use as-is
                        csn = csnCardData.data;
                        this.logger.info('CSN from raw data string:', csn);
                    }
                } else if (Buffer.isBuffer(csnCardData.data)) {
                    csn = csnCardData.data.toString('hex').toUpperCase();
                } else if (Array.isArray(csnCardData.data) || csnCardData.data instanceof Uint8Array) {
                    csn = Buffer.from(csnCardData.data).toString('hex').toUpperCase();
                }
            }
            this.logger.info('Extracted CSN card data:', csn, 'size:', size);
        } else if (smartCardData) {
            type = 'SmartCard';
            if (smartCardData.data) {
                if (typeof smartCardData.data === 'string' && smartCardData.data.length > 0) {
                    try {
                        const buffer = Buffer.from(smartCardData.data, 'base64');
                        csn = buffer.toString('hex').toUpperCase();
                    } catch (e) {
                        csn = smartCardData.data;
                    }
                }
            }
            this.logger.info('Extracted SmartCard data:', csn);
        } else if (accessCardData) {
            type = 'Access';
            if (accessCardData.data) {
                if (typeof accessCardData.data === 'string' && accessCardData.data.length > 0) {
                    try {
                        const buffer = Buffer.from(accessCardData.data, 'base64');
                        csn = buffer.toString('hex').toUpperCase();
                    } catch (e) {
                        csn = accessCardData.data;
                    }
                }
            }
            this.logger.info('Extracted Access card data:', csn);
        } else if (cardData.csn && typeof cardData.csn === 'string') {
            csn = cardData.csn;
            this.logger.info('Using direct csn property:', csn);
        } else if (cardData.data && typeof cardData.data === 'string') {
            csn = cardData.data;
            this.logger.info('Using direct data property:', csn);
        } else if (typeof cardData === 'string') {
            csn = cardData;
            this.logger.info('Card data is string:', csn);
        }

        this.logger.info('Normalized card data - CSN:', csn, 'Type:', type, 'Size:', size);

        if (!csn) {
            this.logger.warn('Could not extract CSN from card data. Raw structure:', Object.keys(cardData));
        }

        // Get the size from the original card data (important for device communication)
        let size = 0;
        if (csnCardData && csnCardData.size) {
            size = csnCardData.size;
        } else if (csn) {
            // Calculate size from hex string (2 hex chars = 1 byte)
            size = Math.floor(csn.length / 2);
        }

        // Get the type code from the original card data
        let typeCode = 0x01; // Default CSN
        if (csnCardData && csnCardData.type !== undefined) {
            typeCode = csnCardData.type;
        }

        this.logger.info('Normalized card - size:', size, 'typeCode:', typeCode);

        return {
            csn,
            type,
            typeCode,  // The numeric type code from proto enum
            size,      // The byte size of the card data
            data: csn,
            size,  // Include original size for accurate reconstruction
            raw: cardData
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
            return await prisma.cardAssignment.findUnique({
                where: { cardData },
                include: {
                    enrollments: {
                        include: { device: true }
                    }
                }
            });
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
                return await prisma.cardAssignment.findUnique({
                    where: { id: idOrCardData },
                    include: {
                        enrollments: {
                            include: { device: true }
                        }
                    }
                });
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
                where.employeeId = filters.employeeId;
            }

            return await prisma.cardAssignment.findMany({
                where,
                include: {
                    enrollments: {
                        include: { device: true }
                    }
                },
                orderBy: { assignedAt: 'desc' }
            });
        } catch (error) {
            this.logger.error('Error getting card assignments:', error);
            throw error;
        }
    }

    /**
     * Assign a card to an employee
     * @param {Object} data - Assignment data
     * @returns {Promise<Object>} Created card assignment
     */
    async assignCardToEmployee(data) {
        const { employeeId, employeeName, cardData, cardType = 'CSN', cardFormat = 0, cardSize = 0, notes } = data;

        this.logger.info('assignCardToEmployee called with:', { employeeId, employeeName, cardData, cardType, cardSize });

        if (!employeeId || !cardData) {
            throw new Error(`Missing required fields: employeeId=${employeeId}, cardData=${cardData}`);
        }

        try {
            // Check if card is already assigned
            const existing = await this.getCardAssignment(cardData);
            this.logger.info('Existing card assignment check:', existing ? 'found' : 'not found');
            
            if (existing) {
                if (existing.status === 'active') {
                    throw new Error(`Card is already assigned to employee ${existing.employeeName || existing.employeeId}`);
                }
                // Reactivate revoked card for new employee
                this.logger.info('Reactivating revoked card assignment');
                const updated = await prisma.cardAssignment.update({
                    where: { id: existing.id },
                    data: {
                        employeeId: String(employeeId),
                        employeeName: employeeName || null,
                        status: 'active',
                        assignedAt: new Date(),
                        revokedAt: null,
                        notes: notes || null
                    },
                    include: {
                        enrollments: {
                            include: { device: true }
                        }
                    }
                });
                this.logger.info('Card assignment reactivated:', updated.id);
                return updated;
            }

            // Create new assignment
            this.logger.info('Creating new card assignment');
            const assignment = await prisma.cardAssignment.create({
                data: {
                    employeeId: String(employeeId),
                    employeeName: employeeName || null,
                    cardData: String(cardData),
                    cardSize: cardSize || 0,
                    cardType: cardType || 'CSN',
                    cardFormat: cardFormat || 0,
                    notes: notes || null
                },
                include: {
                    enrollments: {
                        include: { device: true }
                    }
                }
            });

            this.logger.info(`Card assigned successfully: ID=${assignment.id}, Employee=${employeeId} (${employeeName})`);
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
            const assignment = await prisma.cardAssignment.update({
                where: { id: assignmentId },
                data: {
                    status: 'revoked',
                    revokedAt: new Date(),
                    notes: reason ? `Revoked: ${reason}` : 'Revoked'
                },
                include: {
                    enrollments: {
                        include: { device: true }
                    }
                }
            });

            // Remove from all devices
            for (const enrollment of assignment.enrollments) {
                try {
                    await this.removeFromDevice(enrollment.deviceId, assignmentId);
                } catch (err) {
                    this.logger.warn(`Failed to remove from device ${enrollment.deviceId}:`, err.message);
                }
            }

            this.logger.info(`Card assignment ${assignmentId} revoked`);
            return assignment;
        } catch (error) {
            this.logger.error('Error revoking card assignment:', error);
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
            return await prisma.cardAssignment.update({
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

    // ==================== DEVICE ENROLLMENT ====================

    /**
     * Enroll a card assignment on a device
     * @param {number} deviceId - Database device ID
     * @param {number} assignmentId - Card assignment ID
     * @returns {Promise<Object>} Enrollment result
     */
    async enrollOnDevice(deviceId, assignmentId) {
        try {
            // Get the card assignment
            const assignment = await prisma.cardAssignment.findUnique({
                where: { id: assignmentId }
            });

            if (!assignment) {
                throw new Error('Card assignment not found');
            }

            if (assignment.status !== 'active') {
                throw new Error('Cannot enroll inactive card assignment');
            }

            // Check if already enrolled on this device
            const existingEnrollment = await prisma.deviceEnrollment.findUnique({
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

            // Get Suprema device ID
            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);

            // Create user on device with card
            const deviceUserId = assignment.employeeId;
            
            this.logger.info(`Enrolling user ${deviceUserId} (${assignment.employeeName}) on device ${supremaDeviceId}`);

            // Prepare user data for device
            // IMPORTANT: Set numOfCard to 0 during initial enrollment
            // We will add the card separately using setUserCards
            // Setting numOfCard: 1 without providing card data causes "Invalid card data" error
            const userData = {
                id: deviceUserId,
                name: assignment.employeeName || `Employee ${assignment.employeeId}`,
                numOfCard: 0  // Start with 0 cards, add card separately
            };

            // Enroll user on device first (creates the user without cards)
            await this.userService.enrollUsers(supremaDeviceId, [userData]);

            this.logger.info(`User ${deviceUserId} created on device, now adding card...`);

            // Then set the card for the user
            const cardData = [{
                userId: deviceUserId,
                // Normalize stored card hex string and provide size (bytes)
                cardData: (() => {
                    let hex = String(assignment.cardData || '').replace(/[^0-9A-Fa-f]/g, '');
                    if (hex.length % 2 === 1) hex = '0' + hex; // pad to even length
                    return hex.toUpperCase();
                })(),
                cardType: this.getCardTypeCode(assignment.cardType),
                cardSize: (() => {
                    const hex = String(assignment.cardData || '').replace(/[^0-9A-Fa-f]/g, '');
                    const even = hex.length % 2 === 1 ? '0' + hex : hex;
                    return Math.floor(even.length / 2);
                })()
            }];
            
            await this.userService.setUserCards(supremaDeviceId, cardData);
            
            this.logger.info(`Successfully enrolled user ${deviceUserId} with card on device ${supremaDeviceId}`);

            // Create or update enrollment record
            const enrollment = existingEnrollment
                ? await prisma.deviceEnrollment.update({
                    where: { id: existingEnrollment.id },
                    data: {
                        status: 'active',
                        enrolledAt: new Date(),
                        lastSyncAt: new Date()
                    },
                    include: { device: true, cardAssignment: true }
                })
                : await prisma.deviceEnrollment.create({
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

        for (const deviceId of deviceIds) {
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
            const enrollment = await prisma.deviceEnrollment.findUnique({
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

            // Remove from device
            await this.userService.deleteUsers(supremaDeviceId, [enrollment.deviceUserId]);

            // Update enrollment status
            const updated = await prisma.deviceEnrollment.update({
                where: { id: enrollment.id },
                data: { status: 'removed' },
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
            return await prisma.deviceEnrollment.findMany({
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
            return await prisma.deviceEnrollment.findMany({
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
            const enrollments = await prisma.deviceEnrollment.findMany({
                where: { 
                    deviceId,
                    status: 'active'
                },
                include: { cardAssignment: true }
            });

            const supremaDeviceId = await this.getSupremaDeviceId(deviceId);
            
            const results = {
                total: enrollments.length,
                synced: 0,
                failed: 0,
                errors: []
            };

            for (const enrollment of enrollments) {
                try {
                    // IMPORTANT: Set numOfCard to 0 during initial enrollment
                    // We will add the card separately using setUserCards
                    // Setting numOfCard: 1 without providing card data causes "Invalid card data" error
                    const userData = {
                        id: enrollment.deviceUserId,
                        name: enrollment.cardAssignment.employeeName || `Employee ${enrollment.cardAssignment.employeeId}`,
                        numOfCard: 0  // Start with 0 cards, add card separately
                    };

                    // Enroll user first (without cards)
                    await this.userService.enrollUsers(supremaDeviceId, [userData]);
                    
                    // Then set the card
                    const cardData = [{
                        userId: enrollment.deviceUserId,
                        cardData: (() => {
                            let hex = String(enrollment.cardAssignment.cardData || '').replace(/[^0-9A-Fa-f]/g, '');
                            if (hex.length % 2 === 1) hex = '0' + hex;
                            return hex.toUpperCase();
                        })(),
                        cardType: this.getCardTypeCode(enrollment.cardAssignment.cardType),
                        cardSize: (() => {
                            const hex = String(enrollment.cardAssignment.cardData || '').replace(/[^0-9A-Fa-f]/g, '');
                            const even = hex.length % 2 === 1 ? '0' + hex : hex;
                            return Math.floor(even.length / 2);
                        })()
                    }];

                    await this.userService.setUserCards(supremaDeviceId, cardData);
                    
                    await prisma.deviceEnrollment.update({
                        where: { id: enrollment.id },
                        data: { lastSyncAt: new Date() }
                    });

                    results.synced++;
                } catch (error) {
                    results.failed++;
                    results.errors.push({
                        enrollmentId: enrollment.id,
                        error: error.message
                    });
                }
            }

            // Update device last sync time
            await prisma.device.update({
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
            const enrollments = await prisma.deviceEnrollment.findMany({
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
            // Query from the allemployees view
            // Using correct column names: id, fullname, displayname, jobtitle, ssn
            const employees = await prisma.$queryRaw`
                SELECT 
                    id as employee_id,
                    COALESCE(displayname, fullname, CONCAT(firstname, ' ', lastname)) as name,
                    jobtitle as department,
                    fullname,
                    displayname,
                    firstname,
                    lastname,
                    email,
                    mobile,
                    ssn,
                    card
                FROM allemployees 
                WHERE id LIKE ${`%${searchTerm}%`}
                   OR fullname LIKE ${`%${searchTerm}%`}
                   OR displayname LIKE ${`%${searchTerm}%`}
                   OR firstname LIKE ${`%${searchTerm}%`}
                   OR lastname LIKE ${`%${searchTerm}%`}
                   OR jobtitle LIKE ${`%${searchTerm}%`}
                   OR ssn LIKE ${`%${searchTerm}%`}
                LIMIT ${limit}
            `;

            // Convert BigInt values for JSON serialization
            const serializedEmployees = serializeBigInt(employees);

            // For each employee, check if they have a card assignment
            const enrichedEmployees = await Promise.all(serializedEmployees.map(async (emp) => {
                const cardAssignment = await prisma.cardAssignment.findFirst({
                    where: { 
                        employeeId: String(emp.employee_id),
                        status: 'active'
                    },
                    include: {
                        enrollments: {
                            include: { device: true }
                        }
                    }
                });

                return {
                    ...emp,
                    hasCard: !!cardAssignment,
                    cardAssignment
                };
            }));

            return enrichedEmployees;
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

            // Using correct column names from allemployees table
            let employees = await prisma.$queryRaw`
                SELECT 
                    id as employee_id,
                    COALESCE(displayname, fullname, CONCAT(firstname, ' ', lastname)) as name,
                    jobtitle as department,
                    fullname,
                    displayname,
                    firstname,
                    lastname,
                    email,
                    mobile,
                    ssn,
                    card
                FROM allemployees 
                ORDER BY fullname
                LIMIT ${limit} OFFSET ${offset}
            `;

            // Convert BigInt values for JSON serialization
            employees = serializeBigInt(employees);

            // Enrich with card assignment info
            employees = await Promise.all(employees.map(async (emp) => {
                const cardAssignment = await prisma.cardAssignment.findFirst({
                    where: {
                        employeeId: String(emp.employee_id),
                        status: 'active'
                    },
                    include: {
                        enrollments: {
                            where: { status: 'active' },
                            include: { device: true }
                        }
                    }
                });

                return {
                    ...emp,
                    hasCard: !!cardAssignment,
                    cardAssignment,
                    enrolledDevices: cardAssignment?.enrollments?.map(e => e.device) || []
                };
            }));

            // Filter by enrollment status if specified
            if (enrolled === true) {
                employees = employees.filter(e => e.hasCard);
            } else if (enrolled === false) {
                employees = employees.filter(e => !e.hasCard);
            }

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
                prisma.cardAssignment.count(),
                prisma.cardAssignment.count({ where: { status: 'active' } }),
                prisma.cardAssignment.count({ where: { status: 'revoked' } }),
                prisma.deviceEnrollment.count(),
                prisma.deviceEnrollment.count({ where: { status: 'active' } })
            ]);

            // Get enrollments per device
            const enrollmentsPerDevice = await prisma.deviceEnrollment.groupBy({
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
}

export default EnrollmentService;
