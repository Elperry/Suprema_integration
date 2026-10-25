/**
 * KeyedPusher
 *
 * Pushes one local table into the shared cloud database by NATURAL KEY, never
 * by local id. Several gate PCs write into one cloud schema; their local ids
 * are independent auto-increments, so a local id means nothing in the cloud.
 *
 * Rules, all enforced here so no table can opt out of them:
 *   - a local row whose key the cloud lacks is INSERTed without `id`;
 *     the cloud assigns it;
 *   - a matched row is UPDATEd only in the spec's `updatable` columns;
 *   - a matched row that differs in an `immutable` column is a conflict:
 *     reported, never rewritten;
 *   - nothing is ever deleted from the cloud.
 *
 * The cloud table is read once and remembered (key -> cloud row); later
 * cycles compare against that memory and write only differences. reset()
 * forgets it, e.g. after a connectivity failure.
 *
 * A spec is:
 *   table      cloud table name
 *   columns    cloud columns to read (must include `id`)
 *   keysOf     row -> string[]   natural keys, same function for local and cloud rows
 *   toCloud    localRow -> object|null  cloud-shaped row without id; null = skip
 *   updatable  columns a push may change on an existing cloud row
 *   immutable  columns whose difference is a conflict
 */
export class KeyedPusher {
    constructor(spec, cloudStore, logger, { batchSize = 100 } = {}) {
        this.spec = spec;
        this.cloud = cloudStore;
        this.logger = logger;
        this.batchSize = batchSize;
        this.byKey = null;
        this.maxId = 0;
    }

    reset() {
        this.byKey = null;
        this.maxId = 0;
    }

    /** Cloud id of the row a local row maps to, or null. */
    cloudIdFor(localRow) {
        const row = this._match(this.spec.keysOf(localRow));
        return row ? row.id : null;
    }

    /** Cloud row for a natural key, or null. */
    cloudRowForKey(key) {
        return this.byKey ? (this.byKey.get(key) || null) : null;
    }

    async load() {
        if (this.byKey) return;
        const rows = await this.cloud.findAll(this.spec.table, this.spec.columns);
        this.byKey = new Map();
        for (const row of rows) this._remember(row);
    }

    /**
     * @param {object[]} localRows
     * @returns {Promise<{inserted:number, updated:number, unchanged:number, skipped:number, conflicts:object[]}>}
     */
    async push(localRows) {
        await this.load();
        const stats = { inserted: 0, updated: 0, unchanged: 0, skipped: 0, conflicts: [] };
        const toInsert = [];

        for (const local of localRows) {
            const cloudShaped = this.spec.toCloud(local);
            const keys = cloudShaped ? this.spec.keysOf(cloudShaped) : [];
            if (!cloudShaped || keys.length === 0) {
                stats.skipped++;
                continue;
            }
            const existing = this._match(keys);
            if (!existing) {
                toInsert.push({ keys, row: cloudShaped });
                continue;
            }
            const conflict = this._immutableDiff(existing, cloudShaped);
            if (conflict) {
                stats.conflicts.push({ key: keys[0], cloudId: existing.id, ...conflict });
                continue;
            }
            const changes = this._updatableDiff(existing, cloudShaped);
            if (Object.keys(changes).length === 0) {
                stats.unchanged++;
                continue;
            }
            await this.cloud.updateById(this.spec.table, existing.id, changes);
            Object.assign(existing, changes);
            stats.updated++;
        }

        stats.inserted = await this._insert(toInsert);
        if (stats.conflicts.length > 0) {
            this.logger.warn(
                `[CloudSync:${this.spec.table}] ${stats.conflicts.length} conflict(s) left untouched: ` +
                JSON.stringify(stats.conflicts.slice(0, 5))
            );
        }
        return stats;
    }

    async _insert(pending) {
        // Two local rows with one key (should not happen) insert once.
        const unique = new Map();
        for (const item of pending) {
            if (!unique.has(item.keys[0])) unique.set(item.keys[0], item);
        }
        const items = [...unique.values()];
        for (let i = 0; i < items.length; i += this.batchSize) {
            const batch = items.slice(i, i + this.batchSize);
            await this.cloud.insertMany(this.spec.table, batch.map(item => item.row));
        }
        if (items.length > 0) {
            // Learn the ids the cloud assigned (one indexed read above the
            // highest id already known), so callers can translate.
            const fresh = await this.cloud.findAbove(this.spec.table, this.maxId, this.spec.columns);
            for (const row of fresh) this._remember(row);
        }
        return items.length;
    }

    _match(keys) {
        for (const key of keys) {
            const row = this.byKey.get(key);
            if (row) return row;
        }
        return null;
    }

    _remember(row) {
        for (const key of this.spec.keysOf(row)) this.byKey.set(key, row);
        this.maxId = Math.max(this.maxId, Number(row.id) || 0);
    }

    _immutableDiff(cloudRow, wanted) {
        for (const column of this.spec.immutable || []) {
            if (!(column in wanted)) continue;
            if (!sameValue(cloudRow[column], wanted[column])) {
                return { column, cloud: cloudRow[column], local: wanted[column] };
            }
        }
        return null;
    }

    _updatableDiff(cloudRow, wanted) {
        const changes = {};
        for (const column of this.spec.updatable || []) {
            if (!(column in wanted)) continue;
            if (!sameValue(cloudRow[column], wanted[column])) changes[column] = wanted[column];
        }
        return changes;
    }
}

/** Equality across the shapes MySQL hands back (Date, bigint, 0/1 booleans, numeric strings). */
export function sameValue(a, b) {
    return normalize(a) === normalize(b);
}

function normalize(value) {
    if (value === undefined || value === null) return null;
    if (value instanceof Date) return value.toISOString();
    if (typeof value === 'boolean') return value ? '1' : '0';
    return String(value);
}
