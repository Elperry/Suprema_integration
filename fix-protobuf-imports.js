#!/usr/bin/env node

/**
 * Fix Protobuf Imports in Service Files
 * Converts incorrect named imports to default imports for CommonJS protobuf modules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesDir = path.join(__dirname, 'packages', 'backend', 'src', 'services');

function fixServiceFile(filePath) {
    console.log(`Fixing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix EventEmitter import
    if (content.includes('import EventEmitter from \'events\'')) {
        content = content.replace(/import EventEmitter from 'events';/g, "import { EventEmitter } from 'events';");
        modified = true;
    }
    
    // Fix protobuf message imports to use * as
    const messageImports = [
        'eventMessage', 'doorMessage', 'tnaMessage', 'userMessage',
        'fingerMessage', 'cardMessage', 'faceMessage', 'accessMessage',
        'connectMessage', 'deviceMessage'
    ];
    
    messageImports.forEach(msgImport => {
        const regex = new RegExp(`import ${msgImport} from`, 'g');
        if (content.match(regex)) {
            content = content.replace(regex, `import * as ${msgImport} from`);
            modified = true;
        }
    });
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✓ Fixed`);
    } else {
        console.log(`  - No changes needed`);
    }
}

// Get all service files
const serviceFiles = fs.readdirSync(servicesDir)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(servicesDir, f));

console.log('Fixing protobuf imports in service files...\n');

serviceFiles.forEach(file => fixServiceFile(file));

console.log('\nDone!');
