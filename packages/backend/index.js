/**
 * Application Entry Point
 * Thin startup — all wiring lives in bootstrap.js, Express setup in app.js.
 */

import dotenv from 'dotenv';
dotenv.config();

import { bootstrap } from './src/bootstrap.js';
import { createApp } from './src/app.js';

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
    const container = await bootstrap();
    const logger = container.resolve('logger');
    const config = container.resolve('config');

    // Create Express application
    const app = createApp(container);

    // Start HTTP server
    const port = config.server.port;
    const server = app.listen(port, () => {
        logger.info(`Suprema HR Integration Server running on port ${port}`);
        logger.info(`API documentation available at http://localhost:${port}/api`);
        logger.info(`Health check available at http://localhost:${port}/health`);
    });

    // Post-startup tasks (non-blocking)
    await runPostStartupTasks(container);

    // Graceful shutdown
    const shutdown = createShutdownHandler(server, container, logger);
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}

// ─── Post-Startup Tasks ──────────────────────────────────────────────────────

async function runPostStartupTasks(container) {
    const logger = container.resolve('logger');

    // 1. Connect to devices in the background (non-blocking)
    connectDevices(container).catch(err =>
        logger.error('Background device connection failed:', err.message)
    );

    // 2. Sync time to all connected devices
    await syncDeviceTime(container);

    // 3. HR event integration
    const hrIntegration = container.resolve('hrIntegrationService');
    hrIntegration.start();

    // 4. Device monitoring / auto-reconnection
    const deviceMonitoring = container.resolve('deviceMonitoringService');
    deviceMonitoring.start();

    // 5. Event replication (background sync + reconnect catch-up)
    const eventReplication = container.resolve('eventReplicationService');
    eventReplication.start();
}

async function connectDevices(container) {
    const logger = container.resolve('logger');
    const connectionService = container.resolve('connectionService');

    logger.info('Starting background device connections...');
    const results = await connectionService.loadAndConnectDevices();
    const ok = results.filter(c => c.success).length;
    const fail = results.length - ok;
    logger.info(`Device connections complete: ${ok} connected, ${fail} failed out of ${results.length}`);
}

async function syncDeviceTime(container) {
    const logger = container.resolve('logger');

    try {
        const timeService = container.resolve('timeService');
        const enableTimeSync = process.env.ENABLE_DEVICE_TIME_SYNC !== 'false';

        if (!enableTimeSync) {
            logger.info('Device time sync is disabled via ENABLE_DEVICE_TIME_SYNC=false');
            return;
        }

        const useSystemTimezone = process.env.USE_SYSTEM_TIMEZONE === 'true';

        logger.info('═══════════════════════════════════════════════════════════');
        logger.info('           DEVICE TIME SYNCHRONIZATION                     ');
        logger.info('═══════════════════════════════════════════════════════════');

        let result;
        if (useSystemTimezone) {
            logger.info('Using system timezone for device sync');
            result = await timeService.syncWithSystemTimezone();
        } else {
            const timezoneOffset = parseInt(process.env.DEVICE_TIMEZONE_OFFSET) || 0;
            logger.info(`Using configured timezone offset: ${timezoneOffset}s (${timezoneOffset / 3600}h)`);
            result = await timeService.syncAllDevices(timezoneOffset);
        }

        if (result.success) {
            logger.info(`✓ Time sync completed: ${result.devicesCount} devices synchronized`);
            logger.info(`  Server time: ${result.serverTime}`);
            logger.info(`  Timezone: ${result.timezone.description}`);
        } else {
            logger.warn('Time sync completed with some errors:', result);
        }

        logger.info('═══════════════════════════════════════════════════════════');
    } catch (error) {
        logger.error('Failed to sync device time (non-fatal):', error.message);
    }
}

// ─── Shutdown ────────────────────────────────────────────────────────────────

function createShutdownHandler(server, container, logger) {
    return async () => {
        logger.info('Shutting down application...');

        try {
            // Stop infrastructure services
            const deviceMonitoring = container.resolve('deviceMonitoringService');
            deviceMonitoring.stop();

            const eventReplication = container.resolve('eventReplicationService');
            await eventReplication.stop();

            // Stop event monitoring
            try {
                const eventService = container.resolve('eventService');
                await eventService.stopMonitoring();
            } catch (_) { /* may not be running */ }

            // Close HTTP server
            server.close();

            // Disconnect devices
            const connectionService = container.resolve('connectionService');
            await connectionService.shutdown();

            // Close database
            const database = container.resolve('database');
            await database.close();

            // Dispose container
            await container.dispose();

            logger.info('Application shutdown complete');
            process.exit(0);
        } catch (error) {
            logger.error('Error during shutdown:', error);
            process.exit(1);
        }
    };
}

// ─── Start ───────────────────────────────────────────────────────────────────

main().catch(err => {
    console.error('Fatal: Failed to start application:', err);
    process.exit(1);
});