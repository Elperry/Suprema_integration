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
 * cycles compare against that memory and write only differences. Another PC
 * writes into the same table, so a key the memory lacks is looked up in the
 * cloud before it is inserted, and a duplicate-key refusal (the other PC won
 * the race) is absorbed by learning that row. When one key has several cloud
 * rows (old duplicates) the lowest id wins, so every PC picks the same one.
 * reset() forgets everything, e.g. after a failed push.
 *
 * A spec is:
 *   table      cloud table name
 *   columns    cloud columns to read (must include `id`)
 *   keysOf     row -> string[]   natural keys, same function for local and cloud rows
 *   toCloud    localRow -> object|null  cloud-shaped row without id; null = skip
 *   updatable  columns a push may change on an existing cloud row
 *   immutable  columns whose difference is a conflict
 *   equal      { column: (cloudValue, wanted) -> bool }  optional comparison for an immutable column
 *   lookup     { column, scope? }  how to find rows by natural key in the cloud
 *              (WHERE column IN (...), grouped by `scope` when the key has two parts)
 */
export class KeyedPusher {
    constructor(spec, cloudStore, logger, { batchSize = 100 } = {}) {
        this.spec = spec;
        this.cloud = cloudStore;
        this.logger = logger;
        this.batchSize = batchSize;
        this.byKey = null;
        this.byId = new Map();
    }

    reset() {
        this.byKey = null;
        this.byId = new Map();
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

    /** Any cloud row this pusher has seen, by cloud id, or null. */
    cloudRowById(id) {
        return this.byId.get(String(id)) || null;
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
        const pending = [];

        for (const local of localRows) {
            const cloudShaped = this.spec.toCloud(local);
            const keys = cloudShaped ? this.spec.keysOf(cloudShaped) : [];
            if (!cloudShaped || keys.length === 0) {
                stats.skipped++;
                continue;
            }
            const existing = this._match(keys);
            if (existing) await this._reconcile(existing, cloudShaped, keys, stats);
            else pending.push({ keys, row: cloudShaped });
        }

        if (pending.length > 0) {
            // Another PC may have inserted some of these since our first read.
            await this._learn(pending);
            const toInsert = [];
            for (const item of pending) {
                const existing = this._match(item.keys);
                if (existing) await this._reconcile(existing, item.row, item.keys, stats);
                else toInsert.push(item);
            }
            stats.inserted = await this._insert(toInsert);
        }

        if (stats.conflicts.length > 0) {
            this.logger.warn(
                `[CloudSync:${this.spec.table}] ${stats.conflicts.length} conflict(s) left untouched: ` +
                JSON.stringify(stats.conflicts.slice(0, 5))
            );
        }
        return stats;
    }

    async _reconcile(existing, wanted, keys, stats) {
        const conflict = this._immutableDiff(existing, wanted);
        if (conflict) {
            stats.conflicts.push({ key: keys[0], cloudId: existing.id, ...conflict });
            return;
        }
        const changes = this._updatableDiff(existing, wanted);
        if (Object.keys(changes).length === 0) {
            stats.unchanged++;
            return;
        }
        await this.cloud.updateById(this.spec.table, existing.id, changes);
        Object.assign(existing, changes);
        stats.updated++;
    }

    async _insert(pending) {
        // Two local rows with one key (should not happen) insert once.
        const unique = new Map();
        for (const item of pending) {
            if (!unique.has(item.keys[0])) unique.set(item.keys[0], item);
        }
        const items = [...unique.values()];
        let inserted = 0;
        for (let i = 0; i < items.length; i += this.batchSize) {
            const batch = items.slice(i, i + this.batchSize);
            try {
                inserted += await this.cloud.insertMany(this.spec.table, batch.map(item => item.row));
            } catch (error) {
                if (!isDuplicateKeyError(error)) throw error;
                inserted += await this._insertOneByOne(batch);
            }
        }
        // Learn the ids the cloud assigned (and the rows another PC won), so callers can translate.
        if (items.length > 0) await this._learn(items);
        return inserted;
    }

    async _insertOneByOne(batch) {
        let inserted = 0;
        for (const item of batch) {
            try {
                inserted += await this.cloud.insertMany(this.spec.table, [item.row]);
            } catch (error) {
                if (!isDuplicateKeyError(error)) throw error;
            }
        }
        return inserted;
    }

    /** Reads the cloud rows for these items' natural keys and remembers them. */
    async _learn(items) {
        const { column, scope } = this.spec.lookup;
        const { table, columns } = this.spec;
        const rows = [];
        if (!scope) {
            rows.push(...await this.cloud.findIn(table, column, distinct(items.map(item => item.row[column])), columns));
        } else {
            const byScope = new Map();
            for (const item of items) {
                const scopeValue = item.row[scope];
                if (!byScope.has(scopeValue)) byScope.set(scopeValue, []);
                byScope.get(scopeValue).push(item.row[column]);
            }
            for (const [scopeValue, values] of byScope) {
                rows.push(...await this.cloud.findInScoped(table, scope, scopeValue, column, distinct(values), columns));
            }
        }
        for (const row of rows) this._remember(row);
    }

    _match(keys) {
        for (const key of keys) {
            const row = this.byKey.get(key);
            if (row) return row;
        }
        return null;
    }

    _remember(row) {
        this.byId.set(String(row.id), row);
        for (const key of this.spec.keysOf(row)) {
            const current = this.byKey.get(key);
            if (!current || Number(row.id) <= Number(current.id)) this.byKey.set(key, row);
        }
    }

    _immutableDiff(cloudRow, wanted) {
        for (const column of this.spec.immutable || []) {
            if (!(column in wanted)) continue;
            const equal = this.spec.equal?.[column] ?? sameValue;
            if (!equal(cloudRow[column], wanted[column])) {
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

/** MySQL 1062 as Prisma raw queries report it (P2010 + meta.code), or a P2002. */
export function isDuplicateKeyError(error) {
    if (!error) return false;
    return error.code === 'P2002' || String(error.meta?.code) === '1062' || error.errno === 1062
        || /Duplicate entry/i.test(String(error.message || ''));
}

function distinct(values) {
    return [...new Set(values.filter(value => value !== null && value !== undefined).map(String))];
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
