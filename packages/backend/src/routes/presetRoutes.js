/**
 * Filter Preset Routes
 * CRUD for saved filter presets (events, gate-events, audit, attendance, reconciliation).
 */

import express from 'express';
import { validate, schemas } from '../middleware/requestValidator.js';
import { asyncHandler } from '../core/errors/index.js';
const router = express.Router();

export default (services) => {
    const prisma = services.database.getPrisma();

    /**
     * GET /api/presets
     * List all presets, optionally filtered by scope.
     */
    router.get('/', asyncHandler(async (req, res) => {
        try {
            const { scope } = req.query;
            const where = scope ? { scope } : {};

            const presets = await prisma.filterPreset.findMany({
                where,
                orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
            });

            res.json({ success: true, data: presets });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /**
     * POST /api/presets
     * Create a new preset.
     */
    router.post('/', validate.body(schemas.presetCreate), asyncHandler(async (req, res) => {
        try {
            const { name, scope, filters, isDefault } = req.body;

            if (!filters) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'filters object is required',
                });
            }

            // If this is the new default, clear existing default for the same scope
            if (isDefault) {
                await prisma.filterPreset.updateMany({
                    where: { scope, isDefault: true },
                    data: { isDefault: false },
                });
            }

            const preset = await prisma.filterPreset.create({
                data: {
                    name: name.slice(0, 100),
                    scope,
                    filters,
                    isDefault: !!isDefault,
                },
            });

            res.status(201).json({ success: true, data: preset });
        } catch (error) {
            // Unique constraint violation
            if (error.code === 'P2002') {
                return res.status(409).json({
                    error: 'Conflict',
                    message: `A preset named "${req.body.name}" already exists for scope "${req.body.scope}"`,
                });
            }
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /**
     * PUT /api/presets/:id
     * Update an existing preset.
     */
    router.put('/:id', asyncHandler(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { name, filters, isDefault } = req.body;

            const existing = await prisma.filterPreset.findUnique({ where: { id } });
            if (!existing) {
                return res.status(404).json({ error: 'Not Found', message: 'Preset not found' });
            }

            if (isDefault) {
                await prisma.filterPreset.updateMany({
                    where: { scope: existing.scope, isDefault: true, id: { not: id } },
                    data: { isDefault: false },
                });
            }

            const updated = await prisma.filterPreset.update({
                where: { id },
                data: {
                    ...(name ? { name: name.slice(0, 100) } : {}),
                    ...(filters ? { filters } : {}),
                    ...(isDefault !== undefined ? { isDefault: !!isDefault } : {}),
                },
            });

            res.json({ success: true, data: updated });
        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({
                    error: 'Conflict',
                    message: 'A preset with that name already exists for this scope',
                });
            }
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    /**
     * DELETE /api/presets/:id
     */
    router.delete('/:id', asyncHandler(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await prisma.filterPreset.delete({ where: { id } });
            res.json({ success: true, message: 'Preset deleted' });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Not Found', message: 'Preset not found' });
            }
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }));

    return router;
};
