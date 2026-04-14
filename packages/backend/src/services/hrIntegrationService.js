/**
 * HR Integration Service
 * Listens to domain events from Suprema services and forwards them to the HR system.
 * Extracted from the monolithic index.js to follow Single Responsibility Principle.
 */

import { extractUserIdFromEvent } from '../utils/deviceResolver.js';

class HRIntegrationService {
    /**
     * @param {Object} services - Map of domain services (tna, event, user)
     * @param {Object} logger - Logger instance
     */
    constructor(services, logger) {
        this.services = services;
        this.logger = logger;
    }

    /**
     * Wire up event listeners on domain services.
     */
    start() {
        this.setupTNAEventListeners();
        this.setupAuthEventListeners();
        this.setupUserEventListeners();
        this.logger.info('HR integration event listeners active');
    }

    /** @private */
    setupTNAEventListeners() {
        this.services.tna.on('tna:hrEvent', (hrEvent) => {
            this.logger.info('HR T&A Event:', hrEvent);
            this.sendToHRSystem('attendance', hrEvent);
        });
    }

    /** @private */
    setupAuthEventListeners() {
        this.services.event.on('auth:success', (event) => {
            this.sendToHRSystem('access', {
                type: 'access_granted',
                userId: extractUserIdFromEvent(event),
                deviceId: event.deviceid,
                timestamp: event.timestamp,
                eventId: event.id
            });
        });

        this.services.event.on('auth:failure', (event) => {
            this.sendToHRSystem('access', {
                type: 'access_denied',
                userId: extractUserIdFromEvent(event) || 'unknown',
                deviceId: event.deviceid,
                timestamp: event.timestamp,
                eventId: event.id,
                reason: 'authentication_failed'
            });
        });
    }

    /** @private */
    setupUserEventListeners() {
        this.services.user.on('users:enrolled', (data) => {
            this.sendToHRSystem('user_management', {
                type: 'users_enrolled',
                deviceId: data.deviceId,
                userIds: data.users,
                timestamp: new Date().toISOString()
            });
        });

        this.services.user.on('users:deleted', (data) => {
            this.sendToHRSystem('user_management', {
                type: 'users_deleted',
                deviceId: data.deviceId,
                userIds: data.userIds,
                timestamp: new Date().toISOString()
            });
        });
    }

    /**
     * Forward an event to the external HR system.
     * 
     * @param {string} category - Event category
     * @param {Object} data - Event payload
     */
    async sendToHRSystem(category, data) {
        try {
            if (!process.env.HR_API_BASE_URL) {
                return;
            }

            const hrPayload = {
                category,
                data,
                source: 'suprema_integration',
                timestamp: new Date().toISOString()
            };

            this.logger.info('Sending to HR system:', hrPayload);

            // TODO: Implement actual HTTP call when HR_API_BASE_URL is configured
            // const response = await axios.post(
            //     `${process.env.HR_API_BASE_URL}/webhook/suprema`,
            //     hrPayload,
            //     { headers: { 'Authorization': `Bearer ${process.env.HR_API_TOKEN}` } }
            // );
        } catch (error) {
            this.logger.error('Failed to send event to HR system:', error);
        }
    }

    /**
     * Dispose resources.
     */
    async dispose() {
        // Event listeners are cleaned up when services are disposed
    }
}

export default HRIntegrationService;
