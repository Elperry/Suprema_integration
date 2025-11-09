/**
 * Card Credentials Integration Example
 * Demonstrates how to integrate card management into your HR system
 */

const axios = require('axios');

class SupremaCardManager {
    constructor(baseUrl, deviceId) {
        this.baseUrl = baseUrl || 'http://localhost:3000';
        this.deviceId = deviceId;
        this.client = axios.create({
            baseURL: this.baseUrl,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Scan a card from the device
     * @param {number} timeout - Scan timeout in seconds
     * @returns {Promise<Object>} Card data
     */
    async scanCard(timeout = 30) {
        try {
            const response = await this.client.post('/api/biometric/scan/card', {
                deviceId: this.deviceId,
                timeout
            });
            return response.data.data;
        } catch (error) {
            throw this.handleError(error, 'Card scan failed');
        }
    }

    /**
     * Assign a card to a user
     * @param {string} userId - User ID
     * @param {Object} cardData - Card data from scan or manual entry
     * @param {number} cardIndex - Card slot index (0-7)
     * @returns {Promise<Object>} Success response
     */
    async assignCard(userId, cardData, cardIndex = 0) {
        try {
            const response = await this.client.post(`/api/users/${this.deviceId}/cards`, {
                userCardData: [{
                    userId,
                    cardData,
                    cardIndex
                }]
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Card assignment failed');
        }
    }

    /**
     * Assign cards to multiple users at once
     * @param {Array} userCards - Array of {userId, cardData, cardIndex}
     * @returns {Promise<Object>} Success response
     */
    async assignBulkCards(userCards) {
        try {
            const response = await this.client.post(`/api/users/${this.deviceId}/cards`, {
                userCardData: userCards
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Bulk card assignment failed');
        }
    }

    /**
     * Get a user's card information
     * @param {string} userId - User ID
     * @returns {Promise<Object>} User's card data
     */
    async getUserCards(userId) {
        try {
            const response = await this.client.get(`/api/users/${this.deviceId}/cards/${userId}`);
            return response.data.data;
        } catch (error) {
            throw this.handleError(error, 'Failed to get user cards');
        }
    }

    /**
     * Update a user's card
     * @param {string} userId - User ID
     * @param {Object} cardData - New card data
     * @param {number} cardIndex - Card slot index
     * @returns {Promise<Object>} Success response
     */
    async updateCard(userId, cardData, cardIndex = 0) {
        try {
            const response = await this.client.put(`/api/users/${this.deviceId}/cards/${userId}`, {
                cardData,
                cardIndex
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Card update failed');
        }
    }

    /**
     * Delete a user's card
     * @param {string} userId - User ID
     * @param {number} cardIndex - Card slot index
     * @returns {Promise<Object>} Success response
     */
    async deleteCard(userId, cardIndex = 0) {
        try {
            const response = await this.client.delete(
                `/api/users/${this.deviceId}/cards/${userId}?cardIndex=${cardIndex}`
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Card deletion failed');
        }
    }

    /**
     * Add cards to blacklist
     * @param {Array} cardIds - Array of card IDs to blacklist
     * @returns {Promise<Object>} Success response
     */
    async blacklistCards(cardIds) {
        try {
            const cardInfos = cardIds.map(id => ({
                cardId: id,
                issueCount: 1
            }));

            const response = await this.client.post(`/api/users/${this.deviceId}/cards/blacklist`, {
                action: 'add',
                cardInfos
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Failed to blacklist cards');
        }
    }

    /**
     * Remove cards from blacklist
     * @param {Array} cardIds - Array of card IDs to unblock
     * @returns {Promise<Object>} Success response
     */
    async unblacklistCards(cardIds) {
        try {
            const cardInfos = cardIds.map(id => ({
                cardId: id,
                issueCount: 1
            }));

            const response = await this.client.post(`/api/users/${this.deviceId}/cards/blacklist`, {
                action: 'delete',
                cardInfos
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error, 'Failed to unblacklist cards');
        }
    }

    /**
     * Handle API errors
     * @private
     */
    handleError(error, message) {
        if (error.response) {
            return new Error(`${message}: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            return new Error(`${message}: No response from server`);
        } else {
            return new Error(`${message}: ${error.message}`);
        }
    }
}

// ============= USAGE EXAMPLES =============

async function example1_enrollNewEmployeeWithCard() {
    console.log('\n📝 Example 1: Enroll new employee with card\n');
    
    const manager = new SupremaCardManager('http://localhost:3000', 'device123');
    
    try {
        // Step 1: Create user (assuming user service is available)
        console.log('1. Creating user...');
        // await createUser('emp001', 'John Doe');
        
        // Step 2: Scan card
        console.log('2. Please present the card to the reader...');
        const cardData = await manager.scanCard(30);
        console.log('   Card scanned:', cardData);
        
        // Step 3: Assign card to user
        console.log('3. Assigning card to user...');
        await manager.assignCard('emp001', cardData, 0);
        console.log('   Card assigned successfully!');
        
        // Step 4: Verify
        const userCards = await manager.getUserCards('emp001');
        console.log('4. Verification:', userCards);
        
        console.log('\n✅ Employee enrolled successfully with card!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function example2_replaceLostCard() {
    console.log('\n🔄 Example 2: Replace lost card\n');
    
    const manager = new SupremaCardManager('http://localhost:3000', 'device123');
    
    try {
        const userId = 'emp001';
        
        // Step 1: Get old card info
        console.log('1. Getting old card information...');
        const oldCards = await manager.getUserCards(userId);
        const oldCardId = oldCards.cardNumber;
        console.log('   Old card:', oldCardId);
        
        // Step 2: Block old card immediately
        console.log('2. Blocking old card...');
        await manager.blacklistCards([oldCardId]);
        console.log('   Old card blocked!');
        
        // Step 3: Scan new card
        console.log('3. Please present the new card...');
        const newCardData = await manager.scanCard(30);
        console.log('   New card scanned:', newCardData);
        
        // Step 4: Update user with new card
        console.log('4. Updating user with new card...');
        await manager.updateCard(userId, newCardData, 0);
        console.log('   Card replaced successfully!');
        
        // Step 5: Verify
        const updatedCards = await manager.getUserCards(userId);
        console.log('5. Verification:', updatedCards);
        
        console.log('\n✅ Card replaced successfully!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function example3_bulkEnrollment() {
    console.log('\n📦 Example 3: Bulk card enrollment\n');
    
    const manager = new SupremaCardManager('http://localhost:3000', 'device123');
    
    try {
        // Prepare bulk data
        const employees = [
            { userId: 'emp001', cardData: { type: 'CSN', data: '1111111111111111' } },
            { userId: 'emp002', cardData: { type: 'CSN', data: '2222222222222222' } },
            { userId: 'emp003', cardData: { type: 'WIEGAND', data: '3333333333333333' } },
            { userId: 'emp004', cardData: { type: 'CSN', data: '4444444444444444' } },
            { userId: 'emp005', cardData: { type: 'CSN', data: '5555555555555555' } }
        ];
        
        console.log(`Enrolling ${employees.length} employees...`);
        
        // Assign all cards at once
        const result = await manager.assignBulkCards(employees);
        console.log('Result:', result);
        
        console.log('\n✅ Bulk enrollment completed!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function example4_employeeTermination() {
    console.log('\n🚪 Example 4: Employee termination\n');
    
    const manager = new SupremaCardManager('http://localhost:3000', 'device123');
    
    try {
        const userId = 'emp001';
        
        // Step 1: Get user's card
        console.log('1. Getting employee card information...');
        const userCards = await manager.getUserCards(userId);
        console.log('   Employee cards:', userCards);
        
        // Step 2: Blacklist all cards
        if (userCards.cardNumber) {
            console.log('2. Blacklisting employee cards...');
            await manager.blacklistCards([userCards.cardNumber]);
            console.log('   Cards blacklisted!');
        }
        
        // Step 3: Delete card credentials
        console.log('3. Deleting card credentials...');
        await manager.deleteCard(userId, 0);
        console.log('   Card credentials deleted!');
        
        // Step 4: Delete user (optional)
        console.log('4. User access revoked!');
        // await deleteUser(userId);
        
        console.log('\n✅ Employee access terminated successfully!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function example5_multipleCardsPerUser() {
    console.log('\n🎴 Example 5: Multiple cards per user\n');
    
    const manager = new SupremaCardManager('http://localhost:3000', 'device123');
    
    try {
        const userId = 'emp001';
        
        // Assign building access card
        console.log('1. Assigning building access card...');
        await manager.assignCard(userId, 
            { type: 'CSN', data: '1111111111111111' }, 
            0
        );
        
        // Assign parking card
        console.log('2. Assigning parking card...');
        await manager.assignCard(userId,
            { type: 'WIEGAND', data: '2222222222222222' },
            1
        );
        
        // Assign cafeteria card
        console.log('3. Assigning cafeteria card...');
        await manager.assignCard(userId,
            { type: 'CSN', data: '3333333333333333' },
            2
        );
        
        // Verify all cards
        const allCards = await manager.getUserCards(userId);
        console.log('4. All cards assigned:', allCards);
        
        console.log('\n✅ Multiple cards assigned successfully!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function example6_cardManagement() {
    console.log('\n🔧 Example 6: Card management operations\n');
    
    const manager = new SupremaCardManager('http://localhost:3000', 'device123');
    
    try {
        const userId = 'emp001';
        
        // 1. Check current cards
        console.log('1. Checking current cards...');
        let cards = await manager.getUserCards(userId);
        console.log('   Current cards:', cards);
        
        // 2. Update a card
        console.log('2. Updating card at index 0...');
        await manager.updateCard(userId, 
            { type: 'CSN', data: 'AAAA111111111111' },
            0
        );
        console.log('   Card updated!');
        
        // 3. Verify update
        cards = await manager.getUserCards(userId);
        console.log('3. After update:', cards);
        
        // 4. Delete specific card
        console.log('4. Deleting card at index 1...');
        await manager.deleteCard(userId, 1);
        console.log('   Card deleted!');
        
        // 5. Final verification
        cards = await manager.getUserCards(userId);
        console.log('5. Final state:', cards);
        
        console.log('\n✅ Card management operations completed!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// ============= CLI INTERFACE =============

if (require.main === module) {
    const args = process.argv.slice(2);
    const exampleNum = args[0] || '1';
    
    console.log('\n' + '='.repeat(60));
    console.log('    SUPREMA CARD CREDENTIALS INTEGRATION EXAMPLES');
    console.log('='.repeat(60));
    
    const examples = {
        '1': example1_enrollNewEmployeeWithCard,
        '2': example2_replaceLostCard,
        '3': example3_bulkEnrollment,
        '4': example4_employeeTermination,
        '5': example5_multipleCardsPerUser,
        '6': example6_cardManagement,
        'all': async () => {
            await example1_enrollNewEmployeeWithCard();
            await example2_replaceLostCard();
            await example3_bulkEnrollment();
            await example4_employeeTermination();
            await example5_multipleCardsPerUser();
            await example6_cardManagement();
        }
    };
    
    const example = examples[exampleNum];
    
    if (example) {
        example().catch(error => {
            console.error('\n❌ Example failed:', error);
            process.exit(1);
        });
    } else {
        console.log('\nUsage: node examples/card-integration-example.js [example_number]');
        console.log('\nAvailable examples:');
        console.log('  1 - Enroll new employee with card');
        console.log('  2 - Replace lost card');
        console.log('  3 - Bulk card enrollment');
        console.log('  4 - Employee termination');
        console.log('  5 - Multiple cards per user');
        console.log('  6 - Card management operations');
        console.log('  all - Run all examples');
        console.log('\nExample: node examples/card-integration-example.js 1\n');
    }
}

module.exports = SupremaCardManager;