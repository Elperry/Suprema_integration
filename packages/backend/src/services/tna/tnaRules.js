/**
 * Time-and-attendance rules that must not depend on the gate PC's own clock
 * settings: school days are Africa/Cairo days (DST-aware), and what a TNA key
 * means is configured per site (TNA_KEY_MAP), not guessed.
 */
export const SCHOOL_TIMEZONE = 'Africa/Cairo';
const ACTIONS = new Set(['clock_in', 'clock_out', 'break_start', 'break_end', 'overtime_start', 'overtime_end']);
const DEFAULT_TNA_KEY_MAP = '1=clock_in,2=clock_out';

/** Today's date at the school, 'YYYY-MM-DD' (DST-aware). */
export function schoolToday(now = new Date(), timeZone = SCHOOL_TIMEZONE) {
    return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** Offset of `timeZone` from UTC at `instant`, in minutes. */
export function offsetMinutes(instant, timeZone = SCHOOL_TIMEZONE) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
        timeZone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).formatToParts(instant).map(p => [p.type, p.value]));
    const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
    return Math.round((asUtc - Math.floor(instant.getTime() / 1000) * 1000) / 60000);
}

/** The UTC instant of local midnight starting `day` ('YYYY-MM-DD'). */
function localMidnight(day, timeZone) {
    const [y, m, d] = day.split('-').map(Number);
    const wall = Date.UTC(y, m - 1, d);
    let guess = new Date(wall - offsetMinutes(new Date(wall), timeZone) * 60000);
    guess = new Date(wall - offsetMinutes(guess, timeZone) * 60000);
    return guess;
}

/** [start, end] of a school day as UTC instants. */
export function cairoDayRange(day, timeZone = SCHOOL_TIMEZONE) {
    const start = localMidnight(day, timeZone);
    const [y, m, d] = day.split('-').map(Number);
    const next = new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
    return { start, end: new Date(localMidnight(next, timeZone).getTime() - 1) };
}

/** "1=clock_in,2=clock_out" -> Map(1 -> 'clock_in', ...); unknown actions are ignored. */
export function parseTnaKeyMap(raw) {
    const map = new Map();
    for (const pair of String(raw || DEFAULT_TNA_KEY_MAP).split(',')) {
        const [key, action] = pair.split('=').map(s => (s || '').trim());
        if (/^\d+$/.test(key) && ACTIONS.has(action)) map.set(Number(key), action);
    }
    return map;
}

/** The attendance action of an event type ('tna_key_N' or an explicit action), or null. */
export function tnaAction(eventType, keyMap) {
    if (ACTIONS.has(eventType)) return eventType;
    const match = /^tna_key_(\d+)$/.exec(String(eventType || ''));
    return match ? (keyMap.get(Number(match[1])) ?? null) : null;
}
