/**
 * TableFingerprint
 *
 * Cheap change detection for full-table cloud mirroring.
 *
 * The mirror plan used to read every row of a table from the cloud DB on
 * every cycle to diff it against local - for device_enrollments that is
 * 20k+ rows shipped over the WAN every five minutes, 5-10 s a pull, and the
 * whole of the cloud's slow-query log. Nearly every cycle finds nothing to
 * do.
 *
 * Instead, both sides compute the same three aggregates over the compared
 * columns - COUNT(*), MAX(id) and SUM(CRC32(row)) - and the full read only
 * happens when they differ. A false "changed" merely costs the old full
 * compare; a false "unchanged" would need identical count, max id and
 * checksum over identical column text on both sides.
 */

import { isConnectivityError } from '../../core/utils/circuitBreaker.js';

const IDENTIFIER = /^[A-Za-z0-9_]+$/;
const NULL_MARKER = '~null~';

export class TableFingerprint {
    /**
     * @param {object} opts
     * @param {object} opts.localPrisma
     * @param {object} opts.cloudPrisma
     * @param {object} [opts.logger]
     * @param {boolean} [opts.enabled] - defaults to CLOUD_SYNC_FINGERPRINT !== 'false'
     */
    constructor({ localPrisma, cloudPrisma, logger, enabled = TableFingerprint.enabledFromEnv() }) {
        this.localPrisma = localPrisma;
        this.cloudPrisma = cloudPrisma;
        this.logger = logger;
        this.enabled = !!enabled;
    }

    static enabledFromEnv(env = process.env) {
        return String(env.CLOUD_SYNC_FINGERPRINT ?? 'true').trim().toLowerCase() !== 'false';
    }

    /**
     * One aggregate query, identical on both databases.
     * @param {string} table
     * @param {string[]} fields - compared columns; `id` need not be included
     */
    static buildSql(table, fields) {
        if (!IDENTIFIER.test(table)) {
            throw new Error(`TableFingerprint: unsafe table name "${table}"`);
        }
        const unsafe = fields.find(f => !IDENTIFIER.test(f));
        if (unsafe !== undefined) {
            throw new Error(`TableFingerprint: unsafe column name "${unsafe}"`);
        }
        const cols = fields
            .map(f => `IFNULL(CAST(\`${f}\` AS CHAR), '${NULL_MARKER}')`)
            .join(', ');
        return `SELECT COUNT(*) AS row_count, IFNULL(MAX(\`id\`), 0) AS max_id, `
            + `IFNULL(SUM(CRC32(CONCAT_WS('|', ${cols}))), 0) AS crc FROM \`${table}\``;
    }

    /** Raw drivers return BigInt / Decimal / string depending on the column; compare as text. */
    static normalize(row) {
        const text = v => (v === null || v === undefined) ? '' : String(v);
        return {
            row_count: text(row?.row_count),
            max_id: text(row?.max_id),
            crc: text(row?.crc),
        };
    }

    static same(left, right) {
        return left.row_count !== ''
            && left.row_count === right.row_count
            && left.max_id === right.max_id
            && left.crc === right.crc;
    }

    /**
     * @param {object} target
     * @param {string|null} target.table  - physical table name
     * @param {string[]} target.fields    - compared columns
     * @param {string} [target.label]     - for log lines
     * @returns {Promise<{rowCount:number}|null>} the shared row count when both
     *   sides match; null when they differ or the fingerprint is unavailable.
     */
    async unchanged({ table, fields, label = table }) {
        if (!this.enabled || !table || !Array.isArray(fields) || fields.length === 0) {
            return null;
        }

        let sql;
        try {
            sql = TableFingerprint.buildSql(table, fields);
        } catch (error) {
            this.logger?.warn?.(`[CloudSync:${label}] ${error.message}; falling back to full compare`);
            return null;
        }

        try {
            const [localRows, cloudRows] = await Promise.all([
                this.localPrisma.$queryRawUnsafe(sql),
                this.cloudPrisma.$queryRawUnsafe(sql),
            ]);
            const left = TableFingerprint.normalize(localRows?.[0]);
            const right = TableFingerprint.normalize(cloudRows?.[0]);
            if (!TableFingerprint.same(left, right)) {
                return null;
            }
            return { rowCount: Number(left.row_count) };
        } catch (error) {
            // A dead cloud must still trip the circuit breaker upstream.
            if (isConnectivityError(error)) {
                throw error;
            }
            this.logger?.warn?.(
                `[CloudSync:${label}] fingerprint unavailable (${error.code || 'unknown'}): ${error.message}; falling back to full compare`
            );
            return null;
        }
    }
}
