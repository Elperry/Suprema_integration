/**
 * One device event as a local `events` row.
 *
 * An event with no usable device time is dropped (null), never stamped with
 * the current time: a swipe stamped "now" during a backlog replay would show
 * someone arriving when the PC caught up, not when they badged.
 */
const AUTH_SUCCESS_CODES = new Set([0x1000, 0x1100, 0x1200, 0x1300, 0x1400, 0x1500, 0x1600, 0x1700]);

export function mapEventToRow(event, dbDeviceId) {
    try {
        const eventId = event.id ?? event.eventid ?? event.eventId;
        if (eventId === null || eventId === undefined) return null;
        if (!event.timestamp) return null;
        const timestamp = new Date(event.timestamp);
        if (Number.isNaN(timestamp.getTime())) return null;

        const code = event.eventcode ?? event.eventCode;
        // authResult for any underlying authentication event (0x1000-0x1FFF),
        // even when eventType was promoted to 'attendance' by a TNA key.
        const isAuthCode = typeof code === 'number' && code >= 0x1000 && code < 0x2000;
        const authResult = event.eventType === 'authentication' || isAuthCode
            ? (AUTH_SUCCESS_CODES.has(code) ? 'success' : 'fail')
            : null;

        return {
            deviceId: dbDeviceId,
            supremaEventId: BigInt(eventId),
            eventCode: code ?? 0,
            eventType: event.eventType ?? 'other',
            subType: event.subcode != null ? String(event.subcode) : null,
            userId: event.userid ?? event.userId ?? null,
            doorId: event.doorid ?? event.doorId ?? null,
            description: event.description ?? null,
            authResult,
            timestamp,
            rawData: event,
        };
    } catch {
        return null;
    }
}
