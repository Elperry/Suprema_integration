#!/usr/bin/env node

/**
 * Fix Route Files to Use ES6 Export Default
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesDir = path.join(__dirname, 'packages', 'backend', 'src', 'routes');

function fixRouteFile(filePath) {
    console.log(`Fixing: ${path.basename(filePath)}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace module.exports = (services) => { with export default (services) => {
    content = content.replace(/^module\.exports\s*=\s*\(services\)\s*=>\s*\{/gm, 
        'export default (services) => {');
    
    // Replace module.exports = (database, logger) => { with export default (database, logger) => {
    content = content.replace(/^module\.exports\s*=\s*\(database,\s*logger\)\s*=>\s*\{/gm,
        'export default (database, logger) => {');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Fixed`);
}

// Get all route files
const routeFiles = fs.readdirSync(routesDir)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(routesDir, f));

console.log('Fixing route files...\n');

routeFiles.forEach(file => fixRouteFile(file));

console.log('\nDone!');
