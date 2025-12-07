/**
 * Device Enrollment Repository
 * Data access layer for DeviceEnrollment entity
 */

import { BaseRepository } from '../../core/base/BaseRepository.js';

/**
 * @class DeviceEnrollmentRepository
 * @extends BaseRepository
 * @description Repository for DeviceEnrollment entity operations
 */
export class DeviceEnrollmentRepository extends BaseRepository {
    /**
     * @param {Object} prisma - Prisma client instance
     * @param {Object} logger - Logger instance
     */
    constructor(prisma, logger) {
        super(prisma, 'deviceEnrollment', logger);
    }

    /**
     * Find by device and card assignment
     * 
     * @param {number} deviceId - Device database ID
     * @param {number} cardAssignmentId - Card assignment ID
     * @returns {Promise<Object|null>}
     */
    async findByDeviceAndAssignment(deviceId, cardAssignmentId) {
        return this.findOne({
            deviceId_cardAssignmentId: {
                deviceId,
                cardAssignmentId
            }
        }, {
            include: { device: true, cardAssignment: true }
        });
    }

    /**
     * Find all enrollments for a device
     * 
     * @param {number} deviceId - Device database ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>}
     */
    async findByDevice(deviceId, options = {}) {
        return this.findMany({
            where: { deviceId, ...options.where },
            include: options.include || { cardAssignment: true },
            orderBy: options.orderBy || { enrolledAt: 'desc' }
        });
    }

    /**
     * Find active enrollments for a device
     * 
     * @param {number} deviceId - Device database ID
     * @returns {Promise<Array>}
     */
    async findActiveByDevice(deviceId) {
        return this.findByDevice(deviceId, {
            where: { status: 'active' }
        });
    }

    /**
     * Find all enrollments for a card assignment
     * 
     * @param {number} cardAssignmentId - Card assignment ID
     * @returns {Promise<Array>}
     */
    async findByAssignment(cardAssignmentId) {
        return this.findMany({
            where: { cardAssignmentId },
            include: { device: true },
            orderBy: { enrolledAt: 'desc' }
        });
    }

    /**
     * Find by device user ID
     * 
     * @param {number} deviceId - Device database ID
     * @param {string} deviceUserId - User ID on the device
     * @returns {Promise<Object|null>}
     */
    async findByDeviceUserId(deviceId, deviceUserId) {
        return this.findOne({
            deviceId_deviceUserId: { deviceId, deviceUserId }
        }, {
            include: { device: true, cardAssignment: true }
        });
    }

    /**
     * Mark enrollment as removed
     * 
     * @param {number} id - Enrollment ID
     * @returns {Promise<Object>}
     */
    async markRemoved(id) {
        return this.update(id, {
            status: 'removed',
            lastSyncAt: new Date()
        });
    }

    /**
     * Mark enrollment as active
     * 
     * @param {number} id - Enrollment ID
     * @returns {Promise<Object>}
     */
    async markActive(id) {
        return this.update(id, {
            status: 'active',
            lastSyncAt: new Date()
        });
    }

    /**
     * Update sync timestamp
     * 
     * @param {number} id - Enrollment ID
     * @returns {Promise<Object>}
     */
    async updateSyncTime(id) {
        return this.update(id, {
            lastSyncAt: new Date()
        });
    }

    /**
     * Create or update enrollment
     * 
     * @param {number} deviceId - Device database ID
     * @param {number} cardAssignmentId - Card assignment ID
     * @param {string} deviceUserId - User ID on device
     * @param {string} [status='active'] - Enrollment status
     * @returns {Promise<Object>}
     */
    async upsertEnrollment(deviceId, cardAssignmentId, deviceUserId, status = 'active') {
        return this.upsert(
            {
                deviceId_cardAssignmentId: { deviceId, cardAssignmentId }
            },
            {
                deviceId,
                cardAssignmentId,
                deviceUserId,
                status,
                enrolledAt: new Date()
            },
            {
                status,
                deviceUserId,
                lastSyncAt: new Date()
            },
            {
                include: { device: true, cardAssignment: true }
            }
        );
    }

    /**
     * Mark all enrollments for a device as removed
     * 
     * @param {number} deviceId - Device database ID
     * @returns {Promise<Object>}
     */
    async markAllRemovedByDevice(deviceId) {
        return this.updateMany(
            { deviceId, status: 'active' },
            { status: 'removed', lastSyncAt: new Date() }
        );
    }

    /**
     * Get enrollment statistics for a device
     * 
     * @param {number} deviceId - Device database ID
     * @returns {Promise<Object>}
     */
    async getDeviceStatistics(deviceId) {
        const [total, active, removed, pending] = await Promise.all([
            this.count({ deviceId }),
            this.count({ deviceId, status: 'active' }),
            this.count({ deviceId, status: 'removed' }),
            this.count({ deviceId, status: 'pending' })
        ]);

        return { total, active, removed, pending };
    }
}

export default DeviceEnrollmentRepository;
