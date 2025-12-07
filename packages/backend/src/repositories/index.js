/**
 * Repositories Index
 * Central export for all repository classes
 */

import { CardAssignmentRepository } from './CardAssignmentRepository.js';
import { DeviceEnrollmentRepository } from './DeviceEnrollmentRepository.js';
import { DeviceRepository } from './DeviceRepository.js';
import { EventRepository } from './EventRepository.js';

export {
    CardAssignmentRepository,
    DeviceEnrollmentRepository,
    DeviceRepository,
    EventRepository
};

/**
 * Create all repositories with shared dependencies
 * 
 * @param {Object} prisma - Prisma client instance
 * @param {Object} logger - Logger instance
 * @returns {Object} Repository instances
 */
export function createRepositories(prisma, logger) {
    return {
        cardAssignment: new CardAssignmentRepository(prisma, logger),
        deviceEnrollment: new DeviceEnrollmentRepository(prisma, logger),
        device: new DeviceRepository(prisma, logger),
        event: new EventRepository(prisma, logger)
    };
}

export default {
    CardAssignmentRepository,
    DeviceEnrollmentRepository,
    DeviceRepository,
    EventRepository,
    createRepositories
};
