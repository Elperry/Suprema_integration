/**
 * Security headers for the gate PC backend.
 *
 * Helmet's defaults, except `upgrade-insecure-requests`: the gate PC serves
 * the operator UI over plain HTTP (127.0.0.1, or the school LAN), so asking
 * the browser to upgrade its requests to HTTPS would break every asset and
 * API call. The UI calls the API on its own origin, which `default-src
 * 'self'` allows.
 */
import helmet from 'helmet';

export function securityHeaders() {
    return helmet({
        contentSecurityPolicy: {
            directives: { upgradeInsecureRequests: null },
        },
    });
}
