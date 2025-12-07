/**
 * Card Utilities
 * Common functions for card data manipulation
 * Used across services for card encoding/decoding
 */

/**
 * Card types mapping
 */
export const CARD_TYPES = {
    CSN: 1,
    SECURE: 2,
    ACCESS: 3,
    WIEGAND: 256,
    QR: 512
};

/**
 * Reverse card types mapping
 */
export const CARD_TYPE_NAMES = {
    1: 'CSN',
    2: 'Secure',
    3: 'Access',
    256: 'Wiegand',
    512: 'QR'
};

/**
 * Decode card data from Base64 to decimal string
 * Uses BigInt for full precision with large card numbers
 * 
 * @param {string} base64Data - Base64 encoded card data
 * @returns {string} Decimal card number
 * 
 * @example
 * decodeBase64ToDecimal('BwBEtSQ=') // Returns '30069273892'
 */
export function decodeBase64ToDecimal(base64Data) {
    if (!base64Data) return '';
    
    try {
        // Decode Base64 to bytes
        const bytes = Buffer.from(base64Data, 'base64');
        
        // Find first non-zero byte (significant bytes)
        let startIndex = 0;
        for (let i = 0; i < bytes.length; i++) {
            if (bytes[i] !== 0) {
                startIndex = i;
                break;
            }
        }
        
        // Extract significant bytes
        const significantBytes = bytes.slice(startIndex);
        
        if (significantBytes.length === 0) {
            return '0';
        }
        
        // Convert to BigInt for full precision
        let result = BigInt(0);
        for (const byte of significantBytes) {
            result = (result << 8n) | BigInt(byte);
        }
        
        return result.toString();
    } catch (error) {
        console.error('Error decoding Base64 card data:', error);
        return base64Data; // Return original on error
    }
}

/**
 * Decode hex string to decimal string
 * Uses BigInt for full precision with large card numbers
 * 
 * @param {string} hexData - Hex encoded card data (64 chars typical)
 * @returns {string} Decimal card number
 * 
 * @example
 * decodeHexToDecimal('000000000000000000000000000000000000000000000000000000070044B524')
 * // Returns '30069273892'
 */
export function decodeHexToDecimal(hexData) {
    if (!hexData) return '';
    
    try {
        // Clean hex string
        const cleanHex = hexData.replace(/[^0-9A-Fa-f]/g, '');
        
        if (!cleanHex || cleanHex.length === 0) {
            return '0';
        }
        
        // Convert hex pairs to bytes
        const bytes = [];
        for (let i = 0; i < cleanHex.length; i += 2) {
            bytes.push(parseInt(cleanHex.substring(i, i + 2), 16));
        }
        
        // Find first non-zero byte
        let startIndex = 0;
        for (let i = 0; i < bytes.length; i++) {
            if (bytes[i] !== 0) {
                startIndex = i;
                break;
            }
        }
        
        // Extract significant bytes
        const significantBytes = bytes.slice(startIndex);
        
        if (significantBytes.length === 0) {
            return '0';
        }
        
        // Convert to BigInt for full precision
        let result = BigInt(0);
        for (const byte of significantBytes) {
            result = (result << 8n) | BigInt(byte);
        }
        
        return result.toString();
    } catch (error) {
        console.error('Error decoding hex card data:', error);
        return hexData;
    }
}

/**
 * Encode decimal card number to hex string (padded to 64 chars)
 * 
 * @param {string|number} decimal - Decimal card number
 * @returns {string} 64-character hex string
 */
export function encodeDecimalToHex(decimal) {
    try {
        const num = BigInt(decimal);
        const hex = num.toString(16).toUpperCase();
        return hex.padStart(64, '0');
    } catch (error) {
        console.error('Error encoding decimal to hex:', error);
        return '0'.repeat(64);
    }
}

/**
 * Encode decimal card number to Base64
 * 
 * @param {string|number} decimal - Decimal card number
 * @returns {string} Base64 encoded string
 */
export function encodeDecimalToBase64(decimal) {
    try {
        const hex = encodeDecimalToHex(decimal);
        const bytes = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substring(i, i + 2), 16));
        }
        return Buffer.from(bytes).toString('base64');
    } catch (error) {
        console.error('Error encoding decimal to Base64:', error);
        return '';
    }
}

/**
 * Convert hex string to Buffer for device operations
 * 
 * @param {string} hexString - Hex string
 * @returns {Buffer}
 */
export function hexToBuffer(hexString) {
    const cleanHex = hexString.replace(/[^0-9A-Fa-f]/g, '');
    const paddedHex = cleanHex.length % 2 === 1 ? '0' + cleanHex : cleanHex;
    return Buffer.from(paddedHex, 'hex');
}

/**
 * Convert Buffer to hex string
 * 
 * @param {Buffer} buffer - Buffer data
 * @returns {string} Uppercase hex string
 */
export function bufferToHex(buffer) {
    return buffer.toString('hex').toUpperCase();
}

/**
 * Get card type code from name
 * 
 * @param {string} cardType - Card type name
 * @returns {number} Card type code
 */
export function getCardTypeCode(cardType) {
    const normalized = String(cardType || 'CSN').toUpperCase();
    return CARD_TYPES[normalized] || CARD_TYPES.CSN;
}

/**
 * Get card type name from code
 * 
 * @param {number} code - Card type code
 * @returns {string} Card type name
 */
export function getCardTypeName(code) {
    return CARD_TYPE_NAMES[code] || 'Unknown';
}

/**
 * Validate card data format
 * 
 * @param {string} cardData - Card data (hex or Base64)
 * @returns {Object} Validation result
 */
export function validateCardData(cardData) {
    if (!cardData) {
        return { valid: false, error: 'Card data is required' };
    }
    
    // Check if it's hex (64 chars, only hex digits)
    const hexPattern = /^[0-9A-Fa-f]{64}$/;
    if (hexPattern.test(cardData)) {
        return { valid: true, format: 'hex' };
    }
    
    // Check if it's Base64
    try {
        const decoded = Buffer.from(cardData, 'base64');
        const reencoded = decoded.toString('base64');
        if (reencoded === cardData) {
            return { valid: true, format: 'base64' };
        }
    } catch (e) {
        // Not valid Base64
    }
    
    return { valid: false, error: 'Invalid card data format. Expected 64-char hex or Base64' };
}

/**
 * Normalize card data to hex format
 * 
 * @param {string} cardData - Card data in any format
 * @returns {string} 64-character hex string
 */
export function normalizeToHex(cardData) {
    if (!cardData) return '0'.repeat(64);
    
    // If already hex, just pad
    if (/^[0-9A-Fa-f]+$/.test(cardData)) {
        return cardData.toUpperCase().padStart(64, '0');
    }
    
    // Try Base64 decode
    try {
        const bytes = Buffer.from(cardData, 'base64');
        return bytes.toString('hex').toUpperCase().padStart(64, '0');
    } catch (e) {
        return cardData.padStart(64, '0');
    }
}

export default {
    CARD_TYPES,
    CARD_TYPE_NAMES,
    decodeBase64ToDecimal,
    decodeHexToDecimal,
    encodeDecimalToHex,
    encodeDecimalToBase64,
    hexToBuffer,
    bufferToHex,
    getCardTypeCode,
    getCardTypeName,
    validateCardData,
    normalizeToHex
};
