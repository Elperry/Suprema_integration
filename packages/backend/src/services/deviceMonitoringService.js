/**
 * Device Monitoring Service
 * Handles periodic device status synchronization and auto-reconnection.
 * Extracted from the monolithic index.js to follow Single Responsibility Principle.
 */

class DeviceMonitoringService {
    /**
     * @param {Object} connectionService - Connection service instance
     * @param {Object} logger - Logger instance
     */
    constructor(connectionService, logger) {
        this.connectionService = connectionService;
        this.logger = logger;
        this.syncTimer = null;
        this.reconnectTimer = null;
    }

    /**
     * Start periodic device monitoring.
     * Intervals are configurable via environment variables.
     */
    start() {
        const syncInterval = parseInt(process.env.DEVICE_SYNC_INTERVAL) || 300000; // 5 min
        this.syncTimer = setInterval(async () => {
            try {
                await this.connectionService.syncDeviceStatus();
            } catch (error) {
                this.logger.error('Device status sync failed:', error);
            }
        }, syncInterval);

        const reconnectInterval = parseInt(process.env.DEVICE_RECONNECT_INTERVAL) || 600000; // 10 min
        this.reconnectTimer = setInterval(async () => {
            try {
                await this.connectionService.autoReconnectDevices();
            } catch (error) {
                this.logger.error('Device auto-reconnect failed:', error);
            }
        }, reconnectInterval);

        this.logger.info('Device monitoring and auto-reconnection enabled', {
            syncIntervalMs: syncInterval,
            reconnectIntervalMs: reconnectInterval
        });
    }

    /**
     * Stop all monitoring timers.
     */
    stop() {
        if (this.syncTimer) {
            clearInterval(this.syncTimer);
            this.syncTimer = null;
        }
        if (this.reconnectTimer) {
            clearInterval(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.logger.info('Device monitoring stopped');
    }

    /**
     * Dispose resources.
     */
    async dispose() {
        this.stop();
    }
}

export default DeviceMonitoringService;
