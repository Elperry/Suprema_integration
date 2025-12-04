#!/usr/bin/env node

/**
 * Fix All Services to Use createRequire for Protobuf Modules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesDir = path.join(__dirname, 'packages', 'backend', 'src', 'services');

function fixServiceFile(filePath) {
    console.log(`Processing: ${path.basename(filePath)}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if file has protobuf imports
    if (!content.includes('biostar/service/')) {
        console.log(`  - No protobuf imports`);
        return;
    }
    
    // Add createRequire if not present
    if (!content.includes('createRequire')) {
        // Find position after winston import
        const winstonMatch = content.match(/(import winston from 'winston';)/);
        if (winstonMatch) {
            const insertion = `\nimport { createRequire } from 'module';\n\n// Create require function for CommonJS modules\nconst require = createRequire(import.meta.url);`;
            content = content.replace(winstonMatch[1], winstonMatch[1] + insertion);
            modified = true;
        }
    }
    
    // Convert all protobuf imports from ES6 to require
    // Pattern: import serviceName from '../../biostar/service/xxx_grpc_pb.js';
    content = content.replace(/import\s+(\w+Service)\s+from\s+['"](\.\.\/\.\.\/biostar\/service\/\w+_grpc_pb)\.js['"];/g, 
        'const $1 = require(\'$2\');'
    );
    
    // Pattern: import * as messageName from '../../biostar/service/xxx_pb.js';
    content = content.replace(/import\s+\*\s+as\s+(\w+Message)\s+from\s+['"](\.\.\/\.\.\/biostar\/service\/\w+_pb)\.js['"];/g,
        'const $1 = require(\'$2\');'
    );
    
    modified = true;
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Fixed`);
}

// Get all service files
const serviceFiles = fs.readdirSync(servicesDir)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(servicesDir, f));

console.log('Fixing services to use createRequire...\n');

serviceFiles.forEach(file => fixServiceFile(file));

console.log('\nDone!');
