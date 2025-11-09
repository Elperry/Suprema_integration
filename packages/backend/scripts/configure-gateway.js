/**
 * Gateway Configuration Script
 * Store or update gateway configuration in database
 * 
 * Usage:
 *   node scripts/configure-gateway.js <ip> <port> [caFile]
 *   node scripts/configure-gateway.js 192.168.1.100 4000
 *   node scripts/configure-gateway.js 192.168.1.100 4000 ./cert/gateway/ca.crt
 */

require('dotenv').config();
const DatabaseManager = require('../src/models/database');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [new winston.transports.Console()]
});

async function configureGateway() {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log(`
========================================
Gateway Configuration Tool
========================================

Usage: node scripts/configure-gateway.js <ip> <port> [caFile]

Examples:
  node scripts/configure-gateway.js 192.168.1.100 4000
  node scripts/configure-gateway.js 192.168.1.100 4000 ./cert/gateway/ca.crt

Actions:
  - Store gateway configuration in database
  - Override environment variables
  - Use this for multi-tenant or dynamic gateway setups

Current Configuration Priority:
  1. Database (system_config table)
  2. Environment variables (.env)
  3. Defaults (127.0.0.1:4000)
        `);
        process.exit(1);
    }

    const ip = args[0];
    const port = parseInt(args[1]);
    const caFile = args[2] || null;

    if (!ip || isNaN(port)) {
        logger.error('Invalid IP or port provided');
        process.exit(1);
    }

    logger.info('Connecting to database...');
    const database = new DatabaseManager(logger);
    
    try {
        await database.initialize();
        
        logger.info(`Saving gateway configuration: ${ip}:${port}`);
        await database.saveGatewayConfig(ip, port, caFile);
        
        logger.info('✓ Gateway configuration saved successfully!');
        logger.info('');
        logger.info('Next steps:');
        logger.info('  1. Restart your application: npm start');
        logger.info('  2. The gateway configuration will be loaded from database');
        logger.info('  3. Environment variables will be ignored');
        logger.info('');
        logger.info('To remove database configuration and use .env:');
        logger.info('  DELETE FROM system_config WHERE category = "gateway";');
        
    } catch (error) {
        logger.error('Failed to save gateway configuration:', error);
        process.exit(1);
    } finally {
        await database.close();
    }
}

configureGateway();
