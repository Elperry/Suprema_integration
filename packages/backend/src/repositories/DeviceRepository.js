/**
 * Device Repository
 * Data access layer for Device entity
 */

import { BaseRepository } from '../../core/base/BaseRepository.js';

/**
 * @class DeviceRepository
 * @extends BaseRepository
 * @description Repository for Device entity operations
 */
export class DeviceRepository extends BaseRepository {
    /**
     * @param {Object} prisma - Prisma client instance
     * @param {Object} logger - Logger instance
     */
    constructor(prisma, logger) {
        super(prisma, 'device', logger);
    }

    /**
     * Find all active devices
     * 
     * @returns {Promise<Array>}
     */
    async findActive() {
        return this.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' }
        });
    }

    /**
     * Find device by IP and port
     * 
     * @param {string} ip - Device IP address
     * @param {number} port - Device port
     * @returns {Promise<Object|null>}
     */
    async findByAddress(ip, port) {
        return this.findOne({ ip, port });
    }

    /**
     * Find device by serial number
     * 
     * @param {string} serialNumber - Device serial number
     * @returns {Promise<Object|null>}
     */
    async findBySerialNumber(serialNumber) {
        return this.findOne({ serialNumber });
    }

    /**
     * Find devices by location
     * 
     * @param {number} locationId - Location ID
     * @returns {Promise<Array>}
     */
    async findByLocation(locationId) {
        return this.findMany({
            where: { locationId },
            orderBy: { name: 'asc' }
        });
    }

    /**
     * Update device status
     * 
     * @param {number} id - Device ID
     * @param {string} status - Device status
     * @returns {Promise<Object>}
     */
    async updateStatus(id, status) {
        return this.update(id, { status });
    }

    /**
     * Update device connection info
     * 
     * @param {number} id - Device ID
     * @param {Object} connectionInfo - Connection details
     * @returns {Promise<Object>}
     */
    async updateConnectionInfo(id, connectionInfo) {
        return this.update(id, {
            status: connectionInfo.connected ? 'connected' : 'disconnected',
            ...connectionInfo
        });
    }

    /**
     * Update last user sync time
     * 
     * @param {number} id - Device ID
     * @returns {Promise<Object>}
     */
    async updateLastUserSync(id) {
        return this.update(id, { last_user_sync: new Date() });
    }

    /**
     * Update last event sync time
     * 
     * @param {number} id - Device ID
     * @returns {Promise<Object>}
     */
    async updateLastEventSync(id) {
        return this.update(id, { last_event_sync: new Date() });
    }

    /**
     * Find devices with enrollments
     * 
     * @returns {Promise<Array>}
     */
    async findWithEnrollments() {
        return this.findMany({
            where: { isActive: true },
            include: {
                enrollments: {
                    where: { status: 'active' },
                    include: { cardAssignment: true }
                }
            }
        });
    }

    /**
     * Get device with enrollment count
     * 
     * @param {number} id - Device ID
     * @returns {Promise<Object|null>}
     */
    async findWithEnrollmentCount(id) {
        return this.findById(id, {
            include: {
                _count: {
                    select: { enrollments: true }
                }
            }
        });
    }

    /**
     * Get all devices with their sync status
     * 
     * @returns {Promise<Array>}
     */
    async findWithSyncStatus() {
        return this.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
                ip: true,
                port: true,
                status: true,
                last_user_sync: true,
                last_event_sync: true,
                _count: {
                    select: { enrollments: true }
                }
            }
        });
    }
}

export default DeviceRepository;
