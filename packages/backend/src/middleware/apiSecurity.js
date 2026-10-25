/**
 * API security for the gate PC backend.
 *
 *   createApiAuth   bearer-token check on every /api route (fail closed: no
 *                   API_TOKEN configured means no API at all)
 *   withoutSecrets  deep copy of a response body without password/token keys
 *   parseOrigins    CORS allow-list from CORS_ORIGIN (comma separated); never "*"
 *
 * The API can revoke cards and reconfigure sync, so it is never open: it binds
 * to 127.0.0.1 by default and every call carries the token.
 */
import { timingSafeEqual } from 'node:crypto';

const SECRET_KEYS = new Set(['password', 'userpassword', 'token', 'secret', 'apitoken', 'api_token']);
const DEFAULT_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000'];

export function createApiAuth({ token, logger }) {
    const expected = Buffer.from(String(token || ''), 'utf8');
    return function apiAuth(req, res, next) {
        if (expected.length === 0) {
            return res.status(503).json({ success: false, error: 'API_TOKEN is not configured on this gate PC' });
        }
        const given = Buffer.from(presentedToken(req), 'utf8');
        if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
            logger.warn(`API auth refused ${req.method} ${req.originalUrl} from ${req.ip}`);
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }
        return next();
    };
}

/** Bearer header, else the same-site `gate_api_token` cookie (EventSource, downloads). */
function presentedToken(req) {
    const header = String(req.headers.authorization || '');
    if (header.startsWith('Bearer ')) return header.slice(7);
    for (const part of String(req.headers.cookie || '').split(';')) {
        const [name, ...rest] = part.trim().split('=');
        if (name === 'gate_api_token') return decodeURIComponent(rest.join('='));
    }
    return '';
}

/** Wraps res.json so no response can carry a credential. */
export function redactResponses(req, res, next) {
    const json = res.json.bind(res);
    res.json = body => json(withoutSecrets(body));
    next();
}

export function withoutSecrets(value) {
    if (Array.isArray(value)) return value.map(withoutSecrets);
    if (value === null || typeof value !== 'object') return value;
    if (value instanceof Date || Buffer.isBuffer(value)) return value;
    const out = {};
    for (const [key, inner] of Object.entries(value)) {
        if (SECRET_KEYS.has(key.toLowerCase())) continue;
        out[key] = withoutSecrets(inner);
    }
    return out;
}

export function parseOrigins(raw) {
    const list = String(raw ?? '').split(',').map(s => s.trim()).filter(s => s && s !== '*');
    return list.length > 0 ? list : [...DEFAULT_ORIGINS];
}
