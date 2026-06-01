/**
 * Process Routes
 * REST API for managing background processes (enrollment, sync, etc.)
 * and resolving card-assignment conflicts.
 *
 * POST /api/processes/:id/conflicts/:conflictId/resolve
 *   body: { action: "override" | "cancel" }
 *   override → clears card from conflicting user on device, re-assigns to target
 *   cancel   → marks conflict as cancelled (no device operation)
 */

import express from 'express';
import { asyncHandler } from '../core/errors/index.js';

const router = express.Router();

export default (services) => {
    const ps = services.processService;
    const userService = services.user;
    const userSync = services.userSync;

    if (!ps) {
        // Graceful degradation: return empty router if processService not yet wired
        router.use((req, res) => res.status(503).json({ error: 'ProcessService not available' }));
        return router;
    }

    // ── List all processes ──────────────────────────────────────────────────
    router.get('/', asyncHandler(async (req, res) => {
        res.json({ success: true, data: ps.getAll() });
    }));

    // ── Get single process ──────────────────────────────────────────────────
    router.get('/:id', asyncHandler(async (req, res) => {
        const proc = ps.get(req.params.id);
        if (!proc) return res.status(404).json({ error: 'Not Found', message: 'Process not found' });
        res.json({ success: true, data: proc });
    }));

    // ── Cancel a running/pending process ────────────────────────────────────
    router.post('/:id/cancel', asyncHandler(async (req, res) => {
        const proc = ps.cancel(req.params.id);
        if (!proc) return res.status(404).json({ error: 'Not Found', message: 'Process not found' });
        res.json({ success: true, data: proc });
    }));

    // ── Resolve a single conflict ───────────────────────────────────────────
    router.post('/:id/conflicts/:conflictId/resolve', asyncHandler(async (req, res) => {
        const { action } = req.body;
        if (!['override', 'cancel'].includes(action)) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'action must be "override" or "cancel"',
            });
        }

        const proc = ps.get(req.params.id);
        if (!proc) return res.status(404).json({ error: 'Not Found', message: 'Process not found' });

        const conflict = proc.conflicts.find(c => c.id === req.params.conflictId);
        if (!conflict) return res.status(404).json({ error: 'Not Found', message: 'Conflict not found' });
        if (conflict.status !== 'pending') {
            return res.status(409).json({
                error: 'Conflict',
                message: `Conflict is already ${conflict.status}`,
            });
        }

        // Cancel — no device operation needed
        if (action === 'cancel') {
            ps.resolveConflict(proc.id, conflict.id, 'cancelled');
            ps.log(proc.id, `Conflict cancelled for user ${conflict.employeeName || conflict.userId} on ${conflict.deviceName}`, 'info');
            return res.json({ success: true, message: 'Conflict cancelled' });
        }

        // Override: clear card from conflicting user, re-enroll target user
        try {
            services.logger.info(`[ProcessRoute] Overriding conflict ${conflict.id}: clearing card from user ${conflict.conflictingUserId} on device ${conflict.supremaDeviceId}`);
            ps.log(proc.id, `Overriding: clearing card from ${conflict.conflictingEmployeeName || conflict.conflictingUserId || 'unknown user'} on ${conflict.deviceName}`, 'info');

            // 1. Clear card from the conflicting user on the device
            if (conflict.conflictingUserId) {
                await userService.clearUserCards(
                    conflict.supremaDeviceId,
                    String(conflict.conflictingUserId),
                );
            }

            // 2. Set the card on the target user (skip duplicate scan — we just cleared it)
            await userService.setUserCards(
                conflict.supremaDeviceId,
                [{ userId: conflict.userId, cardData: conflict.cardData }],
                { skipDuplicateCheck: true },
            );

            // 3. Update DB enrollment record
            await userSync.updateEnrollmentRecord(
                conflict.deviceDbId,
                conflict.cardAssignmentId,
                conflict.userId,
                'active',
            );

            ps.log(proc.id, `Card reassigned to ${conflict.employeeName || conflict.userId} on ${conflict.deviceName}`, 'info');
            ps.resolveConflict(proc.id, conflict.id, 'overridden');

            res.json({ success: true, message: 'Conflict resolved — card reassigned' });
        } catch (err) {
            services.logger.error('[ProcessRoute] Override conflict error:', err.message);
            ps.log(proc.id, `Override failed for conflict ${conflict.id}: ${err.message}`, 'error');
            res.status(500).json({ error: 'Internal Server Error', message: err.message });
        }
    }));

    // ── Override ALL pending conflicts ──────────────────────────────────────
    router.post('/:id/override-all', asyncHandler(async (req, res) => {
        const proc = ps.get(req.params.id);
        if (!proc) return res.status(404).json({ error: 'Not Found', message: 'Process not found' });

        const pending = proc.conflicts.filter(c => c.status === 'pending');
        if (pending.length === 0) {
            return res.json({ success: true, message: 'No pending conflicts', results: [] });
        }

        const results = [];
        for (const conflict of pending) {
            try {
                if (conflict.conflictingUserId) {
                    await userService.clearUserCards(
                        conflict.supremaDeviceId,
                        String(conflict.conflictingUserId),
                    );
                }
                await userService.setUserCards(
                    conflict.supremaDeviceId,
                    [{ userId: conflict.userId, cardData: conflict.cardData }],
                    { skipDuplicateCheck: true },
                );
                await userSync.updateEnrollmentRecord(
                    conflict.deviceDbId,
                    conflict.cardAssignmentId,
                    conflict.userId,
                    'active',
                );
                ps.resolveConflict(proc.id, conflict.id, 'overridden');
                ps.log(proc.id, `Override-all: card reassigned to ${conflict.employeeName || conflict.userId}`, 'info');
                results.push({ conflictId: conflict.id, success: true });
            } catch (err) {
                ps.log(proc.id, `Override-all failed for conflict ${conflict.id}: ${err.message}`, 'error');
                results.push({ conflictId: conflict.id, success: false, error: err.message });
            }
        }

        const ok = results.filter(r => r.success).length;
        res.json({
            success: true,
            message: `Overrode ${ok}/${pending.length} conflicts`,
            results,
        });
    }));

    // ── Cancel ALL pending conflicts ────────────────────────────────────────
    router.post('/:id/cancel-all-conflicts', asyncHandler(async (req, res) => {
        const proc = ps.get(req.params.id);
        if (!proc) return res.status(404).json({ error: 'Not Found', message: 'Process not found' });

        const pending = proc.conflicts.filter(c => c.status === 'pending');
        pending.forEach(c => {
            ps.resolveConflict(proc.id, c.id, 'cancelled');
        });
        ps.log(proc.id, `Cancelled ${pending.length} pending conflicts`, 'info');

        res.json({ success: true, message: `Cancelled ${pending.length} conflicts` });
    }));

    return router;
};
