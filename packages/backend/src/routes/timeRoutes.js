/**
 * Time Routes
 * API endpoints for device time and timezone management
 */

import { Router } from 'express';

export default function timeRoutes(services) {
    const router = Router();
    const { time: timeService, connection: connectionService } = services;

    /**
     * GET /api/time/status
     * Get time sync status for all connected devices
     */
    router.get('/status', async (req, res) => {
        try {
            const connectedDevices = await connectionService.getConnectedDevices();
            
            const deviceTimes = await Promise.all(
                connectedDevices.map(async (device) => {
                    const deviceId = device.toObject ? device.toObject().deviceid : device.deviceid || device.id;
                    try {
                        const timeInfo = await timeService.getDeviceTime(deviceId);
                        const configInfo = await timeService.getTimeConfig(deviceId);
                        return {
                            deviceId,
                            ...timeInfo,
                            ...configInfo,
                            status: 'success'
                        };
                    } catch (error) {
                        return {
                            deviceId,
                            status: 'error',
                            error: error.message
                        };
                    }
                })
            );

            res.json({
                success: true,
                serverTime: new Date().toISOString(),
                devices: deviceTimes
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * POST /api/time/sync
     * Manually sync time and timezone to all devices
     */
    router.post('/sync', async (req, res) => {
        try {
            const { timezoneOffset, useSystemTimezone } = req.body;

            let result;
            if (useSystemTimezone) {
                result = await timeService.syncWithSystemTimezone();
            } else {
                result = await timeService.syncAllDevices(timezoneOffset);
            }

            res.json({
                success: true,
                ...result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * GET /api/time/device/:deviceId
     * Get time and config for a specific device
     */
    router.get('/device/:deviceId', async (req, res) => {
        try {
            const deviceId = parseInt(req.params.deviceId);
            
            const [timeInfo, configInfo] = await Promise.all([
                timeService.getDeviceTime(deviceId),
                timeService.getTimeConfig(deviceId)
            ]);

            res.json({
                success: true,
                ...timeInfo,
                ...configInfo
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * POST /api/time/device/:deviceId
     * Set time for a specific device
     */
    router.post('/device/:deviceId', async (req, res) => {
        try {
            const deviceId = parseInt(req.params.deviceId);
            const { gmtTime } = req.body;

            const result = await timeService.setDeviceTime(deviceId, gmtTime);

            res.json({
                success: true,
                ...result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * POST /api/time/device/:deviceId/config
     * Set timezone config for a specific device
     */
    router.post('/device/:deviceId/config', async (req, res) => {
        try {
            const deviceId = parseInt(req.params.deviceId);
            const { timezoneOffset, syncWithServer = true } = req.body;

            if (timezoneOffset === undefined) {
                return res.status(400).json({
                    success: false,
                    error: 'timezoneOffset is required'
                });
            }

            const result = await timeService.setTimeConfig(deviceId, timezoneOffset, syncWithServer);

            res.json({
                success: true,
                ...result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * GET /api/time/info
     * Get server time information and timezone options
     */
    router.get('/info', (req, res) => {
        const systemOffset = timeService.getSystemTimezoneOffset();
        
        res.json({
            success: true,
            server: {
                time: new Date().toISOString(),
                timestamp: Math.floor(Date.now() / 1000),
                timezone: {
                    offsetSeconds: systemOffset,
                    offsetHours: systemOffset / 3600,
                    description: timeService.getTimezoneDescription(systemOffset)
                }
            },
            commonTimezones: [
                { name: 'UTC-12 (Baker Island)', offset: -43200 },
                { name: 'UTC-8 (Pacific)', offset: -28800 },
                { name: 'UTC-5 (Eastern)', offset: -18000 },
                { name: 'UTC-3 (Buenos Aires)', offset: -10800 },
                { name: 'UTC+0 (London)', offset: 0 },
                { name: 'UTC+1 (Paris)', offset: 3600 },
                { name: 'UTC+2 (Cairo)', offset: 7200 },
                { name: 'UTC+3 (Riyadh)', offset: 10800 },
                { name: 'UTC+4 (Dubai)', offset: 14400 },
                { name: 'UTC+5 (Karachi)', offset: 18000 },
                { name: 'UTC+5:30 (Mumbai)', offset: 19800 },
                { name: 'UTC+8 (Singapore)', offset: 28800 },
                { name: 'UTC+9 (Tokyo)', offset: 32400 },
                { name: 'UTC+10 (Sydney)', offset: 36000 },
                { name: 'UTC+12 (Auckland)', offset: 43200 }
            ]
        });
    });

    return router;
}
