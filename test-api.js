#!/usr/bin/env node

/**
 * Suprema HR Integration API Test Script
 * Basic testing utilities for the REST API
 */

const http = require('http');
const https = require('https');

class ApiTester {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
        this.verbose = false;
    }

    setVerbose(verbose) {
        this.verbose = verbose;
    }

    log(message, data = null) {
        if (this.verbose) {
            console.log(`[TEST] ${message}`);
            if (data) {
                console.log(JSON.stringify(data, null, 2));
            }
        }
    }

    async makeRequest(method, path, data = null, headers = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(path, this.baseUrl);
            const isHttps = url.protocol === 'https:';
            const httpModule = isHttps ? https : http;

            const options = {
                hostname: url.hostname,
                port: url.port || (isHttps ? 443 : 80),
                path: url.pathname + url.search,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Suprema-API-Tester/1.0',
                    ...headers
                }
            };

            if (data) {
                const body = JSON.stringify(data);
                options.headers['Content-Length'] = Buffer.byteLength(body);
            }

            this.log(`${method} ${url.toString()}`, data);

            const req = httpModule.request(options, (res) => {
                let responseData = '';

                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    try {
                        const parsedData = responseData ? JSON.parse(responseData) : null;
                        resolve({
                            statusCode: res.statusCode,
                            headers: res.headers,
                            data: parsedData
                        });
                    } catch (error) {
                        resolve({
                            statusCode: res.statusCode,
                            headers: res.headers,
                            data: responseData
                        });
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            if (data) {
                req.write(JSON.stringify(data));
            }

            req.end();
        });
    }

    async testHealthCheck() {
        console.log('🏥 Testing Health Check...');
        try {
            const response = await this.makeRequest('GET', '/health');
            if (response.statusCode === 200) {
                console.log('✅ Health check passed');
                return response.data;
            } else {
                console.log(`❌ Health check failed: ${response.statusCode}`);
                return null;
            }
        } catch (error) {
            console.log(`❌ Health check error: ${error.message}`);
            return null;
        }
    }

    async testDeviceSearch() {
        console.log('🔍 Testing Device Search...');
        try {
            const response = await this.makeRequest('GET', '/api/devices/search?timeout=5');
            if (response.statusCode === 200) {
                console.log(`✅ Device search completed. Found ${response.data.total} devices`);
                return response.data;
            } else {
                console.log(`❌ Device search failed: ${response.statusCode}`);
                return null;
            }
        } catch (error) {
            console.log(`❌ Device search error: ${error.message}`);
            return null;
        }
    }

    async testDeviceConnection(deviceConfig) {
        console.log('🔌 Testing Device Connection...');
        try {
            const response = await this.makeRequest('POST', '/api/devices/connect', deviceConfig);
            if (response.statusCode === 200) {
                console.log(`✅ Device connected successfully. Device ID: ${response.data.deviceId}`);
                return response.data.deviceId;
            } else {
                console.log(`❌ Device connection failed: ${response.statusCode}`);
                console.log(response.data);
                return null;
            }
        } catch (error) {
            console.log(`❌ Device connection error: ${error.message}`);
            return null;
        }
    }

    async testUserEnrollment(deviceId, userData) {
        console.log('👤 Testing User Enrollment...');
        try {
            const response = await this.makeRequest('POST', '/api/users/enroll', {
                deviceId: deviceId,
                users: [userData]
            });
            if (response.statusCode === 200 || response.statusCode === 201) {
                console.log('✅ User enrollment successful');
                return response.data;
            } else {
                console.log(`❌ User enrollment failed: ${response.statusCode}`);
                console.log(response.data);
                return null;
            }
        } catch (error) {
            console.log(`❌ User enrollment error: ${error.message}`);
            return null;
        }
    }

    async testEventSubscription(deviceId) {
        console.log('📡 Testing Event Subscription...');
        try {
            const response = await this.makeRequest('POST', '/api/events/subscribe', {
                deviceId: deviceId,
                filters: ['ACCESS_SUCCESS', 'ACCESS_DENIED']
            });
            if (response.statusCode === 200) {
                console.log('✅ Event subscription successful');
                return response.data;
            } else {
                console.log(`❌ Event subscription failed: ${response.statusCode}`);
                console.log(response.data);
                return null;
            }
        } catch (error) {
            console.log(`❌ Event subscription error: ${error.message}`);
            return null;
        }
    }

    async testBiometricScan(deviceId, type = 'fingerprint') {
        console.log(`👆 Testing ${type} scan...`);
        try {
            const response = await this.makeRequest('POST', `/api/biometric/scan/${type}`, {
                deviceId: deviceId,
                templateFormat: 'SUPREMA',
                quality: 'STANDARD'
            });
            if (response.statusCode === 200) {
                console.log(`✅ ${type} scan successful`);
                return response.data;
            } else {
                console.log(`❌ ${type} scan failed: ${response.statusCode}`);
                console.log(response.data);
                return null;
            }
        } catch (error) {
            console.log(`❌ ${type} scan error: ${error.message}`);
            return null;
        }
    }

    async runBasicTests() {
        console.log('🧪 Running Basic API Tests\n');

        // Test health check
        const health = await this.testHealthCheck();
        if (!health) {
            console.log('❌ Cannot proceed without healthy API server');
            return false;
        }

        console.log('');

        // Test device search
        const devices = await this.testDeviceSearch();
        
        console.log('');

        // Test API documentation endpoint
        console.log('📚 Testing API Documentation...');
        try {
            const response = await this.makeRequest('GET', '/api');
            if (response.statusCode === 200) {
                console.log('✅ API documentation accessible');
            } else {
                console.log(`⚠️  API documentation returned: ${response.statusCode}`);
            }
        } catch (error) {
            console.log(`⚠️  API documentation error: ${error.message}`);
        }

        return true;
    }

    async runDeviceTests(deviceConfig) {
        console.log('\n🔧 Running Device Integration Tests\n');

        // Connect to device
        const deviceId = await this.testDeviceConnection(deviceConfig);
        if (!deviceId) {
            console.log('❌ Cannot proceed without device connection');
            return false;
        }

        console.log('');

        // Test device info
        console.log('ℹ️  Testing Device Info...');
        try {
            const response = await this.makeRequest('GET', `/api/devices/${deviceId}/info`);
            if (response.statusCode === 200) {
                console.log('✅ Device info retrieved successfully');
                this.log('Device Info:', response.data);
            } else {
                console.log(`❌ Device info failed: ${response.statusCode}`);
            }
        } catch (error) {
            console.log(`❌ Device info error: ${error.message}`);
        }

        console.log('');

        // Test event subscription
        await this.testEventSubscription(deviceId);

        console.log('');

        // Test user enrollment
        const testUser = {
            userID: `test_${Date.now()}`,
            name: 'Test User',
            email: 'test@example.com'
        };

        await this.testUserEnrollment(deviceId, testUser);

        return true;
    }
}

// Command line interface
async function main() {
    const args = process.argv.slice(2);
    const baseUrl = args.find(arg => arg.startsWith('--url='))?.split('=')[1] || 'http://localhost:3000';
    const verbose = args.includes('--verbose') || args.includes('-v');
    const deviceTest = args.includes('--device-test');

    const tester = new ApiTester(baseUrl);
    tester.setVerbose(verbose);

    console.log(`🚀 Suprema HR Integration API Tester`);
    console.log(`Base URL: ${baseUrl}\n`);

    // Run basic tests
    const basicTestsOk = await tester.runBasicTests();

    if (deviceTest && basicTestsOk) {
        // Get device configuration from command line or use default
        const deviceConfig = {
            ip: args.find(arg => arg.startsWith('--device-ip='))?.split('=')[1] || '192.168.1.101',
            port: parseInt(args.find(arg => arg.startsWith('--device-port='))?.split('=')[1] || '51211'),
            useSSL: args.includes('--device-ssl')
        };

        console.log(`Device Config: ${JSON.stringify(deviceConfig, null, 2)}`);
        await tester.runDeviceTests(deviceConfig);
    }

    console.log('\n🎯 Testing Complete!\n');

    if (!deviceTest) {
        console.log('To run device integration tests:');
        console.log('node test-api.js --device-test --device-ip=192.168.1.101 --device-port=51211\n');
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = ApiTester;