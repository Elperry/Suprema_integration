/**
 * GateEnvMigration
 *
 * Builds /etc/suprema/backend.env for a gate PC from the .env the old backend
 * ran with (deploy/README.md §1). Site settings (local database, gateway,
 * sync timings) carry over; the cut-over values are set; keys the new backend
 * must not inherit (open CORS, the old JWT secret, development mode) are
 * dropped. Relative file paths are made absolute against the old install,
 * because the new one lives elsewhere.
 *
 * Values are written single-quoted, which systemd's EnvironmentFile= and
 * `set -a; . file` both read literally. A value that cannot be quoted that way
 * is refused by key name; the value itself never appears in an error.
 */
import path from 'node:path';

const DROPPED = new Set(['CORS_ORIGIN', 'JWT_SECRET', 'JWT_EXPIRES_IN']);
const FIXED = {
    NODE_ENV: 'production',
    HOST: '127.0.0.1',
    AUTO_SCHEMA_SYNC: 'false',
    SEED_INITIAL_DEVICES: 'false',
    DB_LOG_QUERIES: 'false',
    LOG_LEVEL: 'info',
    VISITOR_QR_PROVISIONING: 'false',
};
const DEFAULTS = { PORT: '3000', DEVICE_TIMEZONE: 'Africa/Cairo' };
const PATH_KEYS = ['GATEWAY_CA_FILE'];
const KEY = /^[A-Za-z_][A-Za-z0-9_]*$/;

export class GateEnvMigration {
    /**
     * @param {object} opts
     * @param {Record<string,string>} opts.values   the old .env, as dotenv parsed it
     * @param {string[]} opts.searchDirs            where the old backend resolved relative paths
     * @param {(p: string) => boolean} opts.exists
     */
    constructor({ values, searchDirs, exists }) {
        this.old = values || {};
        this.searchDirs = searchDirs || [];
        this.exists = exists;
    }

    /** @returns {{values: Record<string,string>, warnings: string[]}} */
    build({ apiToken, eventsSince, cloudDatabaseUrl }) {
        if (!/^[0-9a-f]{64}$/.test(String(apiToken || ''))) throw new Error('API_TOKEN must be 64 hex characters');
        if (!eventsSince || Number.isNaN(new Date(eventsSince).getTime())) throw new Error('CLOUD_SYNC_EVENTS_SINCE must be an ISO time');
        if (!cloudDatabaseUrl) throw new Error('CLOUD_DATABASE_URL is required');
        if (!this.old.DATABASE_URL) throw new Error('the old .env has no DATABASE_URL');

        const values = {};
        for (const [key, value] of Object.entries(this.old)) {
            if (!DROPPED.has(key)) values[key] = value;
        }
        for (const [key, value] of Object.entries(DEFAULTS)) {
            if (!values[key]) values[key] = value;
        }
        Object.assign(values, FIXED, {
            API_TOKEN: apiToken,
            CLOUD_SYNC_EVENTS_SINCE: eventsSince,
            CLOUD_DATABASE_URL: cloudDatabaseUrl,
        });

        const warnings = [];
        for (const key of PATH_KEYS) {
            if (!values[key] || path.isAbsolute(values[key])) continue;
            const found = this.searchDirs.map(dir => path.resolve(dir, values[key])).find(p => this.exists(p));
            if (found) values[key] = found;
            else warnings.push(`${key} is relative and no file was found for it next to the old install`);
        }
        return { values, warnings };
    }

    /** @param {Record<string,string>} values */
    static render(values) {
        const lines = ['# Written by gate-cutover (deploy/README.md). Owner root, group gate, mode 0640.'];
        for (const [key, raw] of Object.entries(values)) {
            if (!KEY.test(key)) throw new Error(`refusing env key "${key}": not a plain name`);
            const value = String(raw ?? '');
            if (/['\r\n]/.test(value)) throw new Error(`refusing ${key}: its value contains a quote or a line break`);
            lines.push(`${key}='${value}'`);
        }
        return lines.join('\n') + '\n';
    }
}
