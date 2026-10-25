/**
 * CloudStore
 *
 * The only way the gate PC talks to the shared cloud schema. It can read,
 * insert and update by id; it deliberately has no delete, no upsert and no
 * DDL, so no caller can remove or overwrite attendance history by accident.
 * The cloud account's GRANTs should match: SELECT, INSERT, column-level
 * UPDATE, nothing else.
 *
 * Identifiers are validated as plain names and wrapped in backticks; every
 * value is a bound parameter. Schema-unqualified: the schema is the one in
 * CLOUD_DATABASE_URL.
 */
const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;

export class CloudStore {
    /** @param {{$queryRawUnsafe: Function, $executeRawUnsafe: Function}} prisma cloud client */
    constructor(prisma) {
        this.prisma = prisma;
    }

    async ping() {
        await this.prisma.$queryRawUnsafe('SELECT 1');
        return true;
    }

    async findAll(table, columns) {
        return this._select(table, columns, '', []);
    }

    async findIn(table, column, values, columns) {
        if (values.length === 0) return [];
        return this._select(table, columns, `WHERE ${id(column)} IN (${marks(values)})`, values);
    }

    async findInScoped(table, scopeColumn, scopeValue, column, values, columns) {
        if (values.length === 0) return [];
        return this._select(table, columns,
            `WHERE ${id(scopeColumn)} = ? AND ${id(column)} IN (${marks(values)})`, [scopeValue, ...values]);
    }

    async findFrom(table, column, minValue, columns) {
        return this._select(table, columns, `WHERE ${id(column)} >= ?`, [minValue]);
    }

    async findAbove(table, idFloor, columns) {
        return this._select(table, columns, 'WHERE `id` > ?', [idFloor]);
    }

    async insertMany(table, rows) {
        if (rows.length === 0) return 0;
        const columns = Object.keys(rows[0]);
        const tuple = `(${marks(columns)})`;
        const sql = `INSERT INTO ${id(table)} (${columns.map(id).join(', ')}) VALUES ${rows.map(() => tuple).join(', ')}`;
        const params = [];
        for (const row of rows) {
            for (const column of columns) params.push(toSql(row[column]));
        }
        await this.prisma.$executeRawUnsafe(sql, ...params);
        return rows.length;
    }

    async updateById(table, rowId, changes) {
        const columns = Object.keys(changes);
        if (columns.length === 0) return 0;
        const sets = columns.map(column => `${id(column)} = ?`).join(', ');
        return this.prisma.$executeRawUnsafe(
            `UPDATE ${id(table)} SET ${sets} WHERE \`id\` = ?`,
            ...columns.map(column => toSql(changes[column])), rowId,
        );
    }

    async _select(table, columns, whereSql, params) {
        const list = columns ? columns.map(id).join(', ') : '*';
        const sql = `SELECT ${list} FROM ${id(table)}${whereSql ? ' ' + whereSql : ''}`;
        const rows = await this.prisma.$queryRawUnsafe(sql, ...params);
        return rows.map(plainRow);
    }
}

function id(name) {
    if (typeof name !== 'string' || !IDENTIFIER.test(name)) {
        throw new Error(`CloudStore: invalid identifier ${JSON.stringify(name)}`);
    }
    return `\`${name}\``;
}

function marks(values) {
    return values.map(() => '?').join(', ');
}

function toSql(value) {
    if (value === undefined || value === null) return null;
    if (value instanceof Date || Buffer.isBuffer(value)) return value;
    if (typeof value === 'bigint') return value.toString();
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (typeof value === 'object') return JSON.stringify(value);
    return value;
}

/** bigint columns become numbers when safe; event ids and anything larger stay strings. */
function plainRow(row) {
    const out = {};
    for (const [key, value] of Object.entries(row)) {
        if (typeof value !== 'bigint') {
            out[key] = value;
        } else if (key !== 'supremaEventId' && Number.isSafeInteger(Number(value))) {
            out[key] = Number(value);
        } else {
            out[key] = value.toString();
        }
    }
    return out;
}
