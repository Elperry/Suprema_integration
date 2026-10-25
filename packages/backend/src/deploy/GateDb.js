/**
 * Database steps of a gate PC cut-over (deploy/README.md §1).
 *
 *   GateDbProbe            read-only report on the local and cloud databases
 *   CloudPasswordRotation  the gate PC changes its own cloud password, so the
 *                          new one never leaves the PC and the old code's .env
 *                          stops working
 *   withPassword           the same URL with another password
 *
 * `connect(url)` returns a Prisma-like client ($queryRawUnsafe,
 * $executeRawUnsafe, $disconnect). Nothing here prints a password: error text
 * is masked before it is returned.
 */
const LOCAL_TABLES = ['user', 'card_assignments', 'device_enrollments', 'employee', 'tempaccess', 'device'];

export function withPassword(url, password) {
    const u = new URL(url);
    u.password = password;
    return u.toString();
}

function mask(message, url) {
    let text = String(message || '').replace(/(:\/\/[^:/@\s]*):[^@\s]*@/g, '$1:***@');
    try {
        const pw = decodeURIComponent(new URL(url).password || '');
        if (pw) text = text.split(pw).join('***');
    } catch { /* not a URL: nothing more to mask */ }
    return text;
}

/** First row of a result, or the {error} object an optional query returned. */
function first(rows) {
    return Array.isArray(rows) ? rows[0] ?? null : rows;
}

function plain(value) {
    if (typeof value === 'bigint') return Number(value);
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) return value.map(plain);
    if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, plain(v)]));
    }
    return value;
}

export class GateDbProbe {
    constructor({ connect }) {
        this.connect = connect;
    }

    async local(url) {
        return this._withClient(url, async ask => {
            const report = { ...(await ask('SELECT DATABASE() AS db, VERSION() AS version'))[0] };
            report.events = first(await this._try(ask, 'SELECT MAX(timestamp) AS newest, COUNT(*) AS n FROM events'));
            report.unsyncedEvents = first(await this._try(ask, 'SELECT COUNT(*) AS n FROM events WHERE cloudSyncedAt IS NULL'));
            report.counts = {};
            for (const table of LOCAL_TABLES) {
                const row = first(await this._try(ask, `SELECT COUNT(*) AS n FROM \`${table}\``));
                report.counts[table] = row && 'n' in row ? row.n : row;
            }
            report.devices = await this._try(ask, 'SELECT id, serialNumber, name, isActive FROM device ORDER BY id');
            const flag = await this._try(ask, "SELECT JSON_UNQUOTE(JSON_EXTRACT(value, '$.eventReplication.enabled')) AS v FROM system_settings WHERE `key` = 'sync'");
            const v = Array.isArray(flag) ? String(flag[0]?.v ?? '') : '';
            report.eventReplicationEnabled = v === 'false' ? false : v === 'true' ? true : null;
            report.prismaMigrations = await this._try(ask, 'SELECT migration_name AS name FROM _prisma_migrations WHERE finished_at IS NOT NULL ORDER BY started_at');
            return report;
        });
    }

    async cloud(url) {
        return this._withClient(url, async ask => {
            const report = { ...(await ask('SELECT CURRENT_USER() AS user, DATABASE() AS db'))[0] };
            report.sslCipher = first(await this._try(ask, "SHOW SESSION STATUS LIKE 'Ssl_cipher'"))?.Value ?? null;
            report.events = first(await this._try(ask, 'SELECT MAX(id) AS maxId, MAX(timestamp) AS newest, COUNT(*) AS n FROM events'));
            return report;
        });
    }

    async _withClient(url, body) {
        const client = this.connect(url);
        const ask = async sql => plain(await client.$queryRawUnsafe(sql));
        this._url = url;
        try {
            return { ...(await body(ask)), ok: true };
        } catch (error) {
            return { ok: false, error: mask(error.message, url) };
        } finally {
            await client.$disconnect().catch(() => {});
        }
    }

    /** One optional query: its rows, or {error} when it fails (a missing table is a finding, not a stop). */
    async _try(ask, sql) {
        try {
            return await ask(sql);
        } catch (error) {
            return { error: mask(error.message, this._url) };
        }
    }
}

export class CloudPasswordRotation {
    /** @param {{connect: Function, randomHex: () => string}} deps */
    constructor({ connect, randomHex }) {
        this.connect = connect;
        this.randomHex = randomHex;
    }

    /** @returns {Promise<{url: string, verified: boolean}>} */
    async rotate(currentUrl) {
        const password = this.randomHex();
        if (!/^[0-9a-f]{32,}$/.test(String(password))) throw new Error('the generated password must be plain hex');
        const next = withPassword(currentUrl, password);

        const current = this.connect(currentUrl);
        try {
            await current.$executeRawUnsafe(`ALTER USER USER() IDENTIFIED BY '${password}'`);
        } catch (error) {
            throw new Error(`the cloud password was not changed: ${mask(error.message, currentUrl)}`);
        } finally {
            await current.$disconnect().catch(() => {});
        }

        const check = this.connect(next);
        try {
            await check.$queryRawUnsafe('SELECT 1');
            return { url: next, verified: true };
        } catch {
            return { url: next, verified: false };
        } finally {
            await check.$disconnect().catch(() => {});
        }
    }
}
