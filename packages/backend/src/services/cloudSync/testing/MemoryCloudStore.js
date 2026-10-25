/**
 * In-memory stand-in for CloudStore, for unit tests only.
 *
 * Tables are arrays of plain rows. Inserts assign ids from a per-table
 * auto-increment, like MySQL. Every call is recorded in `calls` so a test can
 * prove that no DELETE (or other forbidden statement) was ever issued.
 */
export class MemoryCloudStore {
    constructor(tables = {}, autoIncrement = {}) {
        this.tables = {};
        this.nextId = {};
        this.calls = [];
        for (const [name, rows] of Object.entries(tables)) {
            this.tables[name] = rows.map(row => ({ ...row }));
            const maxId = rows.reduce((max, row) => Math.max(max, Number(row.id) || 0), 0);
            this.nextId[name] = Math.max(maxId + 1, autoIncrement[name] || 1);
        }
    }

    _table(name) {
        if (!this.tables[name]) {
            this.tables[name] = [];
            this.nextId[name] = 1;
        }
        return this.tables[name];
    }

    async ping() {
        return true;
    }

    async findAll(table, columns) {
        this.calls.push({ op: 'findAll', table, columns });
        return this._table(table).map(row => pick(row, columns));
    }

    async findIn(table, column, values, columns) {
        this.calls.push({ op: 'findIn', table, column, values: [...values] });
        const wanted = new Set(values.map(String));
        return this._table(table)
            .filter(row => wanted.has(String(row[column])))
            .map(row => pick(row, columns));
    }

    async findInScoped(table, scopeColumn, scopeValue, column, values, columns) {
        this.calls.push({ op: 'findInScoped', table, scopeColumn, scopeValue, column, values: [...values] });
        const wanted = new Set(values.map(String));
        return this._table(table)
            .filter(row => String(row[scopeColumn]) === String(scopeValue) && wanted.has(String(row[column])))
            .map(row => pick(row, columns));
    }

    async findFrom(table, column, minValue, columns) {
        this.calls.push({ op: 'findFrom', table, column, minValue });
        return this._table(table).filter(row => String(row[column]) >= String(minValue)).map(row => pick(row, columns));
    }

    async findAbove(table, idFloor, columns) {
        this.calls.push({ op: 'findAbove', table, idFloor });
        return this._table(table).filter(row => Number(row.id) > idFloor).map(row => pick(row, columns));
    }

    async findWhere(table, predicate, columns) {
        this.calls.push({ op: 'findWhere', table });
        return this._table(table).filter(predicate).map(row => pick(row, columns));
    }

    async insertMany(table, rows) {
        this.calls.push({ op: 'insertMany', table, rows: rows.map(r => ({ ...r })) });
        const target = this._table(table);
        for (const row of rows) {
            target.push({ ...row, id: this.nextId[table]++ });
        }
        return rows.length;
    }

    async updateById(table, id, changes) {
        this.calls.push({ op: 'updateById', table, id, changes: { ...changes } });
        const row = this._table(table).find(r => String(r.id) === String(id));
        if (!row) return 0;
        Object.assign(row, changes);
        return 1;
    }

    /** Every recorded operation of one kind, e.g. ops('delete'). */
    ops(kind) {
        return this.calls.filter(call => call.op === kind);
    }
}

function pick(row, columns) {
    if (!columns) return { ...row };
    const out = {};
    for (const column of columns) out[column] = row[column];
    return out;
}
