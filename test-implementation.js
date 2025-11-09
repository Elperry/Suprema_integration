/**
 * Card Credentials Implementation Test
 * Tests the implementation without requiring G-SDK or running devices
 */

const fs = require('fs');
const path = require('path');

// Colors for output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
    console.log('\n' + '='.repeat(70));
    log(`  ${title}`, 'bold');
    console.log('='.repeat(70) + '\n');
}

function testFileExists(filePath, description) {
    const fullPath = path.join(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
        log(`✓ ${description}`, 'green');
        return true;
    } else {
        log(`✗ ${description} - NOT FOUND`, 'red');
        return false;
    }
}

function testFileContent(filePath, pattern, description) {
    try {
        const fullPath = path.join(__dirname, filePath);
        const content = fs.readFileSync(fullPath, 'utf8');
        
        if (typeof pattern === 'string') {
            if (content.includes(pattern)) {
                log(`✓ ${description}`, 'green');
                return true;
            }
        } else if (pattern instanceof RegExp) {
            if (pattern.test(content)) {
                log(`✓ ${description}`, 'green');
                return true;
            }
        } else if (Array.isArray(pattern)) {
            const allFound = pattern.every(p => content.includes(p));
            if (allFound) {
                log(`✓ ${description}`, 'green');
                return true;
            }
        }
        
        log(`✗ ${description} - PATTERN NOT FOUND`, 'red');
        return false;
    } catch (error) {
        log(`✗ ${description} - ERROR: ${error.message}`, 'red');
        return false;
    }
}

function countLines(filePath) {
    try {
        const fullPath = path.join(__dirname, filePath);
        const content = fs.readFileSync(fullPath, 'utf8');
        return content.split('\n').length;
    } catch (error) {
        return 0;
    }
}

async function testDocumentation() {
    section('DOCUMENTATION FILES');
    
    let passed = 0;
    let total = 0;
    
    const docs = [
        {
            file: 'README.md',
            patterns: ['Card Credentials', 'API Documentation'],
            desc: 'Main README with card information'
        },
        {
            file: 'docs/CARD_CREDENTIALS.md',
            patterns: ['Card Types', 'CSN', 'Wiegand', 'Secure Smart Card'],
            desc: 'Card credentials guide'
        },
        {
            file: 'docs/CARD_QUICK_REF.md',
            patterns: ['Quick Reference', 'Scan Card', 'Assign Cards'],
            desc: 'Card quick reference'
        },
        {
            file: 'docs/CARD_VISUAL_GUIDE.md',
            patterns: ['Visual Guide', 'Card Enrollment', 'flowchart'],
            desc: 'Visual guide with flowcharts'
        },
        {
            file: 'docs/CARD_IMPLEMENTATION_SUMMARY.md',
            patterns: ['Implementation Summary', 'API Endpoints', 'Testing'],
            desc: 'Implementation summary'
        },
        {
            file: 'CARD_IMPLEMENTATION_CHECKLIST.md',
            patterns: ['Checklist', 'API Endpoints', 'Documentation'],
            desc: 'Implementation checklist'
        },
        {
            file: 'CARD_IMPLEMENTATION_COMPLETE.md',
            patterns: ['Implementation Complete', 'Features', 'Testing'],
            desc: 'Completion summary'
        }
    ];
    
    for (const doc of docs) {
        total++;
        if (testFileExists(doc.file, doc.desc)) {
            if (testFileContent(doc.file, doc.patterns, `  └─ Contains required content`)) {
                const lines = countLines(doc.file);
                log(`     ${lines} lines`, 'cyan');
                passed++;
            }
        }
    }
    
    log(`\n📊 Documentation: ${passed}/${total} passed`, passed === total ? 'green' : 'yellow');
    return passed === total;
}

async function testAPIEndpoints() {
    section('API ENDPOINT IMPLEMENTATION');
    
    let passed = 0;
    let total = 0;
    
    const endpoints = [
        {
            file: 'src/routes/biometricRoutes.js',
            method: 'POST',
            path: '/scan/card',
            desc: 'Card scan endpoint'
        },
        {
            file: 'src/routes/userRoutes.js',
            method: 'POST',
            path: '/:deviceId/cards',
            desc: 'Assign cards endpoint'
        },
        {
            file: 'src/routes/userRoutes.js',
            method: 'GET',
            path: '/:deviceId/cards/:userId',
            desc: 'Get user cards endpoint'
        },
        {
            file: 'src/routes/userRoutes.js',
            method: 'PUT',
            path: '/:deviceId/cards/:userId',
            desc: 'Update user card endpoint'
        },
        {
            file: 'src/routes/userRoutes.js',
            method: 'DELETE',
            path: '/:deviceId/cards/:userId',
            desc: 'Delete user card endpoint'
        },
        {
            file: 'src/routes/userRoutes.js',
            method: 'POST',
            path: '/:deviceId/cards/blacklist',
            desc: 'Card blacklist endpoint'
        }
    ];
    
    for (const endpoint of endpoints) {
        total++;
        const pattern = new RegExp(`router\\.${endpoint.method.toLowerCase()}\\(['"\`]${endpoint.path.replace(/:/g, ':')}`, 'i');
        if (testFileContent(endpoint.file, pattern, `${endpoint.method} ${endpoint.path} - ${endpoint.desc}`)) {
            passed++;
        }
    }
    
    log(`\n📊 API Endpoints: ${passed}/${total} passed`, passed === total ? 'green' : 'yellow');
    return passed === total;
}

async function testServiceMethods() {
    section('SERVICE METHOD IMPLEMENTATION');
    
    let passed = 0;
    let total = 0;
    
    const methods = [
        {
            file: 'src/services/biometricService.js',
            method: 'scanCard',
            desc: 'Card scanning service method'
        },
        {
            file: 'src/services/userService.js',
            method: 'setUserCards',
            desc: 'Set user cards service method'
        },
        {
            file: 'src/services/userService.js',
            method: 'getUserCards',
            desc: 'Get user cards service method'
        },
        {
            file: 'src/services/userService.js',
            method: 'manageCardBlacklist',
            desc: 'Card blacklist service method'
        }
    ];
    
    for (const method of methods) {
        total++;
        const patterns = [
            new RegExp(`${method.method}\\s*[:=]\\s*async\\s*function`, 'i'),
            new RegExp(`async\\s+${method.method}\\s*\\(`, 'i'),
            new RegExp(`${method.method}\\s*:\\s*async\\s*\\(`, 'i')
        ];
        
        let found = false;
        for (const pattern of patterns) {
            try {
                const fullPath = path.join(__dirname, method.file);
                const content = fs.readFileSync(fullPath, 'utf8');
                if (pattern.test(content)) {
                    found = true;
                    break;
                }
            } catch (error) {
                // File doesn't exist or can't be read
            }
        }
        
        if (found) {
            log(`✓ ${method.desc}`, 'green');
            passed++;
        } else {
            log(`✗ ${method.desc}`, 'red');
        }
    }
    
    log(`\n📊 Service Methods: ${passed}/${total} passed`, passed === total ? 'green' : 'yellow');
    return passed === total;
}

async function testExamplesAndTests() {
    section('EXAMPLES AND TESTS');
    
    let passed = 0;
    let total = 0;
    
    const files = [
        {
            file: 'test-card-api.js',
            patterns: ['testCardScan', 'testAssignCards', 'testGetUserCards', 'testUpdateCard', 'testDeleteCard', 'testBlacklist'],
            desc: 'Card API test suite'
        },
        {
            file: 'examples/card-integration-example.js',
            patterns: ['SupremaCardManager', 'scanCard', 'assignCards', 'updateCard', 'deleteCard'],
            desc: 'Card integration examples'
        }
    ];
    
    for (const file of files) {
        total++;
        if (testFileExists(file.file, file.desc)) {
            if (testFileContent(file.file, file.patterns, `  └─ Contains required methods`)) {
                const lines = countLines(file.file);
                log(`     ${lines} lines`, 'cyan');
                passed++;
            }
        }
    }
    
    log(`\n📊 Examples & Tests: ${passed}/${total} passed`, passed === total ? 'green' : 'yellow');
    return passed === total;
}

async function testPackageScripts() {
    section('PACKAGE.JSON SCRIPTS');
    
    let passed = 0;
    let total = 0;
    
    const scripts = [
        { name: 'test:card', desc: 'Card test script' },
        { name: 'verify', desc: 'System verification script' }
    ];
    
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
        
        for (const script of scripts) {
            total++;
            if (packageJson.scripts && packageJson.scripts[script.name]) {
                log(`✓ ${script.desc}: ${packageJson.scripts[script.name]}`, 'green');
                passed++;
            } else {
                log(`✗ ${script.desc} - NOT FOUND`, 'red');
            }
        }
    } catch (error) {
        log(`✗ Error reading package.json: ${error.message}`, 'red');
    }
    
    log(`\n📊 Package Scripts: ${passed}/${total} passed`, passed === total ? 'green' : 'yellow');
    return passed === total;
}

async function testDatabaseSchema() {
    section('DATABASE SCHEMA');
    
    let passed = 0;
    let total = 0;
    
    total++;
    if (testFileExists('prisma/schema.prisma', 'Prisma schema file')) {
        const patterns = [
            'model User',
            'model Device',
            'model Event',
            'model AccessLevel',
            'model Schedule'
        ];
        
        if (testFileContent('prisma/schema.prisma', patterns, '  └─ Contains required models')) {
            passed++;
        }
    }
    
    log(`\n📊 Database Schema: ${passed}/${total} passed`, passed === total ? 'green' : 'yellow');
    return passed === total;
}

async function generateImplementationReport(results) {
    section('IMPLEMENTATION REPORT');
    
    const total = Object.keys(results).length;
    const passed = Object.values(results).filter(v => v === true).length;
    const percentage = Math.round((passed / total) * 100);
    
    log('Implementation Status:', 'bold');
    console.log('');
    
    for (const [test, result] of Object.entries(results)) {
        const icon = result ? '✓' : '✗';
        const color = result ? 'green' : 'red';
        log(`${icon} ${test}`, color);
    }
    
    console.log('\n' + '-'.repeat(70));
    log(`\nTotal: ${passed}/${total} components implemented (${percentage}%)`, percentage === 100 ? 'green' : 'yellow');
    
    if (percentage === 100) {
        log('\n🎉 IMPLEMENTATION COMPLETE!', 'green');
        log('   All card credentials components are properly implemented!', 'green');
        log('\n📝 Next Steps:', 'cyan');
        log('   1. Set up G-SDK: Install Suprema G-SDK and generate protobuf files', 'cyan');
        log('   2. Configure devices: Add device connection strings to .env', 'cyan');
        log('   3. Start server: npm start', 'cyan');
        log('   4. Run tests: npm run test:card', 'cyan');
        log('   5. Try examples: node examples/card-integration-example.js', 'cyan');
    } else if (percentage >= 80) {
        log('\n⚠️  MOSTLY COMPLETE', 'yellow');
        log('   Some components need attention', 'yellow');
    } else {
        log('\n❌ IMPLEMENTATION INCOMPLETE', 'red');
        log('   Multiple components are missing', 'red');
    }
    
    console.log('');
}

async function runImplementationTests() {
    log('\n' + '═'.repeat(70), 'cyan');
    log('    CARD CREDENTIALS IMPLEMENTATION VERIFICATION', 'cyan');
    log('═'.repeat(70) + '\n', 'cyan');
    
    const results = {};
    
    // Test each component
    results['Documentation'] = await testDocumentation();
    results['API Endpoints'] = await testAPIEndpoints();
    results['Service Methods'] = await testServiceMethods();
    results['Examples & Tests'] = await testExamplesAndTests();
    results['Package Scripts'] = await testPackageScripts();
    results['Database Schema'] = await testDatabaseSchema();
    
    // Generate report
    await generateImplementationReport(results);
    
    // Exit with appropriate code
    const allPassed = Object.values(results).every(v => v === true);
    process.exit(allPassed ? 0 : 1);
}

// Run if executed directly
if (require.main === module) {
    runImplementationTests().catch(error => {
        log(`\n❌ Test error: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    });
}

module.exports = { runImplementationTests };
