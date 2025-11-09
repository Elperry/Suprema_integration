/**
 * Employee Routes
 * API endpoints for querying employee data from views
 */

import express from 'express';
const router = express.Router();

export default (database, logger) => {
    /**
     * GET /api/employees
     * Get all employees with optional filters
     */
    router.get('/', async (req, res) => {
        try {
            const filters = {};
            
            if (req.query.company_id) {
                filters.company_id = parseInt(req.query.company_id);
            }
            
            if (req.query.suspend !== undefined) {
                filters.suspend = req.query.suspend === 'true';
            }

            const employees = await database.getAllEmployees(filters);

            res.json({
                success: true,
                count: employees.length,
                data: employees
            });
        } catch (error) {
            logger.error('Error fetching employees:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * GET /api/employees/:id
     * Get employee by ID
     */
    router.get('/:id', async (req, res) => {
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
    });

    /**
     * GET /api/employees/search/:term
     * Search employees by name or email
     */
    router.get('/search/:term', async (req, res) => {
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
    });

    /**
     * GET /api/employees/:id/card
     * Get employee card information
     */
    router.get('/:id/card', async (req, res) => {
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
    });

    return router;
};
