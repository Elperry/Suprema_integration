/**
 * Date/Time Utilities
 * Common date and time manipulation functions
 */

/**
 * Format date to ISO string without milliseconds
 * 
 * @param {Date|string|number} date - Date input
 * @returns {string} Formatted date string
 */
export function formatISODate(date) {
    const d = date instanceof Date ? date : new Date(date);
    return d.toISOString().split('.')[0] + 'Z';
}

/**
 * Format date to local string
 * 
 * @param {Date|string|number} date - Date input
 * @param {string} [locale='en-US'] - Locale string
 * @returns {string} Formatted local date string
 */
export function formatLocalDate(date, locale = 'en-US') {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleString(locale);
}

/**
 * Get start of day
 * 
 * @param {Date|string|number} [date] - Date input (default: now)
 * @returns {Date}
 */
export function startOfDay(date) {
    const d = date ? new Date(date) : new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Get end of day
 * 
 * @param {Date|string|number} [date] - Date input (default: now)
 * @returns {Date}
 */
export function endOfDay(date) {
    const d = date ? new Date(date) : new Date();
    d.setHours(23, 59, 59, 999);
    return d;
}

/**
 * Get date range for today
 * 
 * @returns {Object} { start, end }
 */
export function todayRange() {
    return {
        start: startOfDay(),
        end: endOfDay()
    };
}

/**
 * Get date range for last N days
 * 
 * @param {number} days - Number of days
 * @returns {Object} { start, end }
 */
export function lastNDaysRange(days) {
    const end = endOfDay();
    const start = startOfDay();
    start.setDate(start.getDate() - days + 1);
    return { start, end };
}

/**
 * Get date range for this week
 * 
 * @returns {Object} { start, end }
 */
export function thisWeekRange() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const start = startOfDay(now);
    start.setDate(start.getDate() - dayOfWeek);
    return {
        start,
        end: endOfDay()
    };
}

/**
 * Get date range for this month
 * 
 * @returns {Object} { start, end }
 */
export function thisMonthRange() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return {
        start: startOfDay(start),
        end: endOfDay()
    };
}

/**
 * Add time to date
 * 
 * @param {Date} date - Base date
 * @param {number} amount - Amount to add
 * @param {string} unit - Unit: 'seconds', 'minutes', 'hours', 'days'
 * @returns {Date}
 */
export function addTime(date, amount, unit) {
    const d = new Date(date);
    const ms = {
        seconds: 1000,
        minutes: 60 * 1000,
        hours: 60 * 60 * 1000,
        days: 24 * 60 * 60 * 1000
    };
    d.setTime(d.getTime() + amount * (ms[unit] || 0));
    return d;
}

/**
 * Get difference between dates in specified unit
 * 
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @param {string} unit - Unit: 'seconds', 'minutes', 'hours', 'days'
 * @returns {number}
 */
export function dateDiff(date1, date2, unit) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const ms = d1.getTime() - d2.getTime();
    
    const divisors = {
        seconds: 1000,
        minutes: 60 * 1000,
        hours: 60 * 60 * 1000,
        days: 24 * 60 * 60 * 1000
    };
    
    return Math.floor(ms / (divisors[unit] || 1));
}

/**
 * Check if date is today
 * 
 * @param {Date|string|number} date - Date to check
 * @returns {boolean}
 */
export function isToday(date) {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
}

/**
 * Check if date is in the past
 * 
 * @param {Date|string|number} date - Date to check
 * @returns {boolean}
 */
export function isPast(date) {
    return new Date(date) < new Date();
}

/**
 * Check if date is in the future
 * 
 * @param {Date|string|number} date - Date to check
 * @returns {boolean}
 */
export function isFuture(date) {
    return new Date(date) > new Date();
}

/**
 * Parse relative time string (e.g., '1h', '30m', '7d')
 * 
 * @param {string} str - Relative time string
 * @returns {number} Milliseconds
 */
export function parseRelativeTime(str) {
    const match = str.match(/^(\d+)([smhd])$/);
    if (!match) return 0;
    
    const [, amount, unit] = match;
    const multipliers = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000
    };
    
    return parseInt(amount) * (multipliers[unit] || 0);
}

/**
 * Format duration in human readable format
 * 
 * @param {number} ms - Duration in milliseconds
 * @returns {string}
 */
export function formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

export default {
    formatISODate,
    formatLocalDate,
    startOfDay,
    endOfDay,
    todayRange,
    lastNDaysRange,
    thisWeekRange,
    thisMonthRange,
    addTime,
    dateDiff,
    isToday,
    isPast,
    isFuture,
    parseRelativeTime,
    formatDuration
};
