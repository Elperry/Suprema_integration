/**
 * Employee Routes
 * API endpoints for querying employee data from views
 */

import express from 'express';
import { asyncHandler } from '../core/errors/index.js';
const router = express.Router();

export default (services) => {
    const database = services.database;
    const logger = services.logger || console;

    /**
     * GET /api/employees
     * Get all employees with optional filters and pagination
     * Query: company_id, suspend, page, limit, search, department
     */
    router.get('/', asyncHandler(async (req, res) => {
        try {
            const filters = {};
            
            if (req.query.company_id) {
                filters.company_id = parseInt(req.query.company_id);
            }
            
            if (req.query.suspend !== undefined) {
                filters.suspend = req.query.suspend === 'true' || req.query.suspend === '1';
            }

            if (req.query.department) {
                filters.department = req.query.department;
            }

            let employees = await database.getAllEmployees(filters);

            // Server-side search filtering
            if (req.query.search) {
                const term = req.query.search.toLowerCase();
                employees = employees.filter(e =>
                    (e.name || e.full_name || e.employee_name || '').toLowerCase().includes(term) ||
                    (e.email || '').toLowerCase().includes(term) ||
                    String(e.id || e.employee_id || '').toLowerCase().includes(term)
                );
            }

            // Pagination
            const total = employees.length;
            const page = parseInt(req.query.page) || 0;
            const limit = parseInt(req.query.limit) || 0;

            if (page > 0 && limit > 0) {
                const start = (page - 1) * limit;
                employees = employees.slice(start, start + limit);
            }

            res.json({
                success: true,
                count: employees.length,
                total,
                page: page || 1,
                totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
                data: employees
            });
        } catch (error) {
            logger.error('Error fetching employees:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }));

    /**
     * GET /api/employees/:id
     * Get employee by ID
     */
    router.get('/:id', asyncHandler(async (req, res) => {
        try {
            const employee = await database.getEmployeeById(parseInt(req.params.id));

            if (!employee) {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found'
                });
            }

            res.json({
                success: true,
                data: employee
            });
        } catch (error) {
            logger.error('Error fetching employee:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }));

    /**
     * GET /api/employees/search/:term
     * Search employees by name or email
     */
    router.get('/search/:term', asyncHandler(async (req, res) => {
        try {
            const employees = await database.searchEmployees(req.params.term);

            res.json({
                success: true,
                count: employees.length,
                data: employees
            });
        } catch (error) {
            logger.error('Error searching employees:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }));

    /**
     * GET /api/employees/:id/card
     * Get employee card information
     */
    router.get('/:id/card', asyncHandler(async (req, res) => {
        try {
            const employee = await database.getEmployeeById(parseInt(req.params.id));

            if (!employee) {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found'
                });
            }

            res.json({
                success: true,
                data: {
                    employee_id: employee.id,
                    displayname: employee.displayname,
                    card: employee.card,
                    ssn: employee.ssn
                }
            });
        } catch (error) {
            logger.error('Error fetching employee card:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }));

    return router;
};
