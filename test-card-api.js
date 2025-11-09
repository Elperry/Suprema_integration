/**
 * Card Credentials Test Script
 * Tests all card management endpoints
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
const DEVICE_ID = 1; // Using numeric device ID (protobuf requires uint32)
const TEST_USER_ID = 'test_emp001';

// Color console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testCardScan() {
    log('\n🔍 Testing Card Scan...', 'blue');
    try {
        const response = await axios.post(`${BASE_URL}/api/biometric/scan/card`, {
            deviceId: DEVICE_ID,
            timeout: 30
        });
        
        log('✓ Card scan endpoint working', 'green');
        log(`Response: ${JSON.stringify(response.data, null, 2)}`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            log(`✗ Card scan failed: ${error.response.data.message}`, 'red');
        } else {
            log(`✗ Card scan error: ${error.message}`, 'red');
        }
        return null;
    }
}

async function testCardAssignment() {
    log('\n📝 Testing Card Assignment...', 'blue');
    try {
        const cardData = {
            type: 'CSN',
            data: '1234567890ABCDEF'
        };

        const response = await axios.post(`${BASE_URL}/api/users/${DEVICE_ID}/cards`, {
            userCardData: [{
                userId: TEST_USER_ID,
                cardData: cardData,
                cardIndex: 0
            }]
        });
        
        log('✓ Card assignment endpoint working', 'green');
        log(`Response: ${JSON.stringify(response.data, null, 2)}`);
        return true;
    } catch (error) {
        if (error.response) {
            log(`✗ Card assignment failed: ${error.response.data.message}`, 'red');
        } else {
            log(`✗ Card assignment error: ${error.message}`, 'red');
        }
        return false;
    }
}

async function testGetUserCards() {
    log('\n📋 Testing Get User Cards...', 'blue');
    try {
        const response = await axios.get(`${BASE_URL}/api/users/${DEVICE_ID}/cards/${TEST_USER_ID}`);
        
        log('✓ Get user cards endpoint working', 'green');
        log(`Response: ${JSON.stringify(response.data, null, 2)}`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            log(`✗ Get user cards failed: ${error.response.data.message}`, 'red');
        } else {
            log(`✗ Get user cards error: ${error.message}`, 'red');
        }
        return null;
    }
}

async function testUpdateCard() {
    log('\n✏️  Testing Update Card...', 'blue');
    try {
        const newCardData = {
            type: 'CSN',
            data: 'FEDCBA0987654321'
        };

        const response = await axios.put(`${BASE_URL}/api/users/${DEVICE_ID}/cards/${TEST_USER_ID}`, {
            cardData: newCardData,
            cardIndex: 0
        });
        
        log('✓ Update card endpoint working', 'green');
        log(`Response: ${JSON.stringify(response.data, null, 2)}`);
        return true;
    } catch (error) {
        if (error.response) {
            log(`✗ Update card failed: ${error.response.data.message}`, 'red');
        } else {
            log(`✗ Update card error: ${error.message}`, 'red');
        }
        return false;
    }
}

async function testCardBlacklist() {
    log('\n🚫 Testing Card Blacklist...', 'blue');
    try {
        // Add to blacklist
        const addResponse = await axios.post(`${BASE_URL}/api/users/${DEVICE_ID}/cards/blacklist`, {
            action: 'add',
            cardInfos: [{
                cardId: '1234567890ABCDEF',
                issueCount: 1
            }]
        });
        
        log('✓ Add to blacklist endpoint working', 'green');
        log(`Response: ${JSON.stringify(addResponse.data, null, 2)}`);

        // Remove from blacklist
        const removeResponse = await axios.post(`${BASE_URL}/api/users/${DEVICE_ID}/cards/blacklist`, {
            action: 'delete',
            cardInfos: [{
                cardId: '1234567890ABCDEF',
                issueCount: 1
            }]
        });
        
        log('✓ Remove from blacklist endpoint working', 'green');
        log(`Response: ${JSON.stringify(removeResponse.data, null, 2)}`);
        return true;
    } catch (error) {
        if (error.response) {
            log(`✗ Blacklist management failed: ${error.response.data.message}`, 'red');
        } else {
            log(`✗ Blacklist management error: ${error.message}`, 'red');
        }
        return false;
    }
}

async function testDeleteCard() {
    log('\n🗑️  Testing Delete Card...', 'blue');
    try {
        const response = await axios.delete(`${BASE_URL}/api/users/${DEVICE_ID}/cards/${TEST_USER_ID}?cardIndex=0`);
        
        log('✓ Delete card endpoint working', 'green');
        log(`Response: ${JSON.stringify(response.data, null, 2)}`);
        return true;
    } catch (error) {
        if (error.response) {
            log(`✗ Delete card failed: ${error.response.data.message}`, 'red');
        } else {
            log(`✗ Delete card error: ${error.message}`, 'red');
        }
        return false;
    }
}

async function testBulkCardAssignment() {
    log('\n📦 Testing Bulk Card Assignment...', 'blue');
    try {
        const response = await axios.post(`${BASE_URL}/api/users/${DEVICE_ID}/cards`, {
            userCardData: [
                {
                    userId: 'emp001',
                    cardData: { type: 'CSN', data: '1111111111111111' },
                    cardIndex: 0
                },
                {
                    userId: 'emp002',
                    cardData: { type: 'WIEGAND', data: '2222222222222222' },
                    cardIndex: 0
                },
                {
                    userId: 'emp003',
                    cardData: { type: 'CSN', data: '3333333333333333' },
                    cardIndex: 0
                }
            ]
        });
        
        log('✓ Bulk card assignment endpoint working', 'green');
        log(`Response: ${JSON.stringify(response.data, null, 2)}`);
        return true;
    } catch (error) {
        if (error.response) {
            log(`✗ Bulk card assignment failed: ${error.response.data.message}`, 'red');
        } else {
            log(`✗ Bulk card assignment error: ${error.message}`, 'red');
        }
        return false;
    }
}

async function testHealthCheck() {
    log('\n🏥 Testing Server Health...', 'blue');
    try {
        const response = await axios.get(`${BASE_URL}/health`);
        log('✓ Server is running', 'green');
        log(`Response: ${JSON.stringify(response.data, null, 2)}`);
        return true;
    } catch (error) {
        log(`✗ Server health check failed: ${error.message}`, 'red');
        return false;
    }
}

async function runAllTests() {
    log('\n' + '='.repeat(60), 'yellow');
    log('         CARD CREDENTIALS API TEST SUITE', 'yellow');
    log('='.repeat(60) + '\n', 'yellow');

    const results = {
        passed: 0,
        failed: 0,
        tests: []
    };

    // Test server health first
    const healthOk = await testHealthCheck();
    if (!healthOk) {
        log('\n❌ Server is not running. Please start the server first.', 'red');
        log('Run: npm start', 'yellow');
        return;
    }

    // Run all tests
    const tests = [
        { name: 'Card Assignment', fn: testCardAssignment },
        { name: 'Get User Cards', fn: testGetUserCards },
        { name: 'Update Card', fn: testUpdateCard },
        { name: 'Bulk Card Assignment', fn: testBulkCardAssignment },
        { name: 'Card Blacklist', fn: testCardBlacklist },
        { name: 'Delete Card', fn: testDeleteCard },
        { name: 'Card Scan', fn: testCardScan }
    ];

    for (const test of tests) {
        const result = await test.fn();
        if (result !== false && result !== null) {
            results.passed++;
            results.tests.push({ name: test.name, status: 'PASSED' });
        } else {
            results.failed++;
            results.tests.push({ name: test.name, status: 'FAILED' });
        }
        
        // Wait a bit between tests
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Print summary
    log('\n' + '='.repeat(60), 'yellow');
    log('                    TEST SUMMARY', 'yellow');
    log('='.repeat(60), 'yellow');
    
    results.tests.forEach(test => {
        const color = test.status === 'PASSED' ? 'green' : 'red';
        const icon = test.status === 'PASSED' ? '✓' : '✗';
        log(`${icon} ${test.name}: ${test.status}`, color);
    });

    log('\n' + '-'.repeat(60), 'yellow');
    log(`Total Tests: ${results.passed + results.failed}`, 'blue');
    log(`Passed: ${results.passed}`, 'green');
    log(`Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
    log('-'.repeat(60) + '\n', 'yellow');

    if (results.failed === 0) {
        log('🎉 All tests passed!', 'green');
    } else {
        log('⚠️  Some tests failed. Check the output above for details.', 'yellow');
    }
}

// Run tests if executed directly
if (require.main === module) {
    log('\n📌 NOTE: Update DEVICE_ID variable with your actual device ID', 'yellow');
    log('📌 Make sure the server is running (npm start)', 'yellow');
    log('📌 Some tests may fail if device is not connected\n', 'yellow');
    
    runAllTests().catch(error => {
        log(`\n❌ Test suite error: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    });
}

module.exports = {
    testCardScan,
    testCardAssignment,
    testGetUserCards,
    testUpdateCard,
    testCardBlacklist,
    testDeleteCard,
    testBulkCardAssignment,
    runAllTests
};