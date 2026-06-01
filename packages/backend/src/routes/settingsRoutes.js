import express from 'express';
import { asyncHandler } from '../core/errors/index.js';

const router = express.Router();

export default (services) => {
    const syncSettings = services.syncSettings;
    const audit = services.audit;

    const runtimeServices = {
        userSync: services.userSync,
        eventReplication: services.eventReplication,
        cloudSync: services.cloudSync,
    };

    router.get('/sync', asyncHandler(async (req, res) => {
        const settings = await syncSettings.getSyncSettings({ initialize: true });
        res.json({
            success: true,
            data: {
                settings,
                status: syncSettings.getRuntimeStatus(runtimeServices),
            },
        });
    }));

    router.put('/sync', asyncHandler(async (req, res) => {
        const { settings: settingsPatch, applyImmediately = true } = req.body || {};
        const patch = settingsPatch && typeof settingsPatch === 'object'
            ? settingsPatch
            : req.body;

        const settings = await syncSettings.updateSyncSettings(patch || {});
        const applied = applyImmediately
            ? await syncSettings.applyToRuntime(settings, runtimeServices)
            : null;

        audit?.log({
            action: 'update-sync-settings',
            category: 'settings',
            details: { settings, applied: !!applied },
            ipAddress: req.ip,
            requestId: req.requestId,
        });

        res.json({
            success: true,
            data: {
                settings,
                applied,
                status: syncSettings.getRuntimeStatus(runtimeServices),
            },
        });
    }));

    router.post('/sync/reset', asyncHandler(async (req, res) => {
        const { applyImmediately = true } = req.body || {};
        const settings = await syncSettings.resetSyncSettings();
        const applied = applyImmediately
            ? await syncSettings.applyToRuntime(settings, runtimeServices)
            : null;

        audit?.log({
            action: 'reset-sync-settings',
            category: 'settings',
            details: { settings, applied: !!applied },
            ipAddress: req.ip,
            requestId: req.requestId,
        });

        res.json({
            success: true,
            data: {
                settings,
                applied,
                status: syncSettings.getRuntimeStatus(runtimeServices),
            },
        });
    }));

    return router;
};
