#!/usr/bin/env node

/**
 * ES6 Conversion Script
 * Converts CommonJS (require/module.exports) to ES6 modules (import/export)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stats = {
    total: 0,
    converted: 0,
    skipped: 0,
    errors: 0
};

function convertFile(filePath) {
    try {
        stats.total++;
        
        let content = fs.readFileSync(filePath, 'utf8');
        const original = content;
        
        // Skip if already ES6
        if (content.match(/^import .+ from/m) && content.match(/^export (default|const|class)/m)) {
            console.log(`  [SKIP] Already ES6: ${filePath}`);
            stats.skipped++;
            return;
        }
        
        // Convert require statements
        // const something = require('module');
        content = content.replace(/const\s+(\w+)\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)\s*;?/g, "import $1 from '$2';");
        
        // const { item1, item2 } = require('module');
        content = content.replace(/const\s+\{([^}]+)\}\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)\s*;?/g, "import {$1} from '$2';");
        
        // require('dotenv').config()
        content = content.replace(/require\s*\(\s*['"]dotenv['"]\s*\)\.config\(\)\s*;?/g, "import dotenv from 'dotenv';\ndotenv.config();");
        
        // Special case: EventEmitter
        content = content.replace(/const\s+EventEmitter\s*=\s*require\s*\(\s*['"]events['"]\s*\)\s*;?/g, "import { EventEmitter } from 'events';");
        
        // Add .js extensions to local imports
        content = content.replace(/from\s+['"](\.\/.+?)['"]/g, "from '$1.js'");
        content = content.replace(/from\s+['"](\.\.\/.+?)['"]/g, "from '$1.js'");
        
        // Fix double .js
        content = content.replace(/\.js\.js'/g, ".js'");
        
        // Convert module.exports
        content = content.replace(/^module\.exports\s*=\s*(\w+)\s*;?$/gm, "export default $1;");
        
        // Convert exports.something
        content = content.replace(/^exports\.(\w+)\s*=/gm, "export const $1 =");
        
        // Convert require.main === module
        content = content.replace(/if\s*\(\s*require\.main\s*===\s*module\s*\)/g, 
            "if (import.meta.url === `file:///${process.argv[1].replace(/\\\\/g, '/')}`)"
        );
        
        // Check if changed
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`  [OK] ${filePath}`);
            stats.converted++;
        } else {
            console.log(`  [NO CHANGE] ${filePath}`);
            stats.skipped++;
        }
        
    } catch (error) {
        console.error(`  [ERROR] ${filePath}: ${error.message}`);
        stats.errors++;
    }
}

function getAllJSFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getAllJSFiles(filePath, fileList);
        } else if (file.endsWith('.js') && !file.includes('node_modules')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Main execution
console.log('==================================');
console.log('ES6 Conversion Script');
console.log('==================================\n');

const dirs = [
    path.join(__dirname, 'packages', 'backend', 'src'),
    path.join(__dirname, 'example')
];

// Add root backend files
const rootBackendFiles = fs.readdirSync(path.join(__dirname, 'packages', 'backend'))
    .filter(f => f.endsWith('.js') && f !== 'convert-to-es6.js')
    .map(f => path.join(__dirname, 'packages', 'backend', f));

let allFiles = [];
dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        allFiles = allFiles.concat(getAllJSFiles(dir));
    }
});
allFiles = allFiles.concat(rootBackendFiles);

console.log(`Found ${allFiles.length} files to process\n`);
console.log('Converting files...\n');

allFiles.forEach(file => convertFile(file));

// Summary
console.log('\n==================================');
console.log('Conversion Summary');
console.log('==================================');
console.log(`Total files:     ${stats.total}`);
console.log(`Converted:       ${stats.converted}`);
console.log(`Skipped:         ${stats.skipped}`);
console.log(`Errors:          ${stats.errors}`);
console.log('==================================\n');

if (stats.errors > 0) {
    console.log('Some files had errors. Please review them manually.\n');
}

console.log('Next steps:');
console.log('1. Review converted files');
console.log('2. Fix protobuf service imports manually');
console.log('3. Test: npm run dev:backend\n');
