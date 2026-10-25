/**
 * AdditiveSql
 *
 * Decides what of a `prisma migrate diff --script` for a gate PC's local
 * database may be applied unattended (deploy/README.md §1).
 *   classify  strict: additive only when every statement adds a table, an
 *             index or columns
 *   plan      the additive statements to apply, foreign-key-only statements
 *             set aside, and everything else (drops, changes, renames)
 *             refused so a person reads it first
 */
const ADDITIVE = [
    /^CREATE TABLE `[^`]+` \(/i,
    /^CREATE (UNIQUE )?INDEX `[^`]+` ON `[^`]+`\s*\(/i,
];
const ALTER_TABLE = /^ALTER TABLE `[^`]+` (.*)$/is;
// Foreign keys only: the app never relies on them (relations are resolved in
// code, deletes are soft), and adding one can fail on old orphan rows. Such
// differences are set aside - neither applied nor blocking.
const RELATION_ONLY = [
    /^ALTER TABLE `[^`]+` ADD CONSTRAINT `[^`]+` FOREIGN KEY /i,
    /^ALTER TABLE `[^`]+` DROP FOREIGN KEY `[^`]+`$/i,
    /^DROP INDEX `[^`]+_fkey` ON `[^`]+`$/i,
];

export class AdditiveSql {
    /** @returns {{apply: string[], relationOnly: string[], offending: string[]}} */
    static plan(sqlText) {
        const plan = { apply: [], relationOnly: [], offending: [] };
        for (const statement of AdditiveSql.statements(sqlText)) {
            if (AdditiveSql.isAdditive(statement)) plan.apply.push(statement);
            else if (RELATION_ONLY.some(re => re.test(statement))) plan.relationOnly.push(statement);
            else plan.offending.push(statement);
        }
        return plan;
    }

    static script(statements) {
        return statements.map(s => `${s};\n`).join('');
    }

    /** @returns {{additive: boolean, statements: number, offending: string[]}} */
    static classify(sqlText) {
        const statements = AdditiveSql.statements(sqlText);
        const offending = statements.filter(s => !AdditiveSql.isAdditive(s));
        return { additive: offending.length === 0, statements: statements.length, offending };
    }

    static statements(sqlText) {
        const body = String(sqlText || '')
            .split('\n')
            .filter(line => !line.trim().startsWith('--'))
            .join('\n');
        return body.split(/;\s*(?:\n|$)/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
    }

    static isAdditive(statement) {
        if (ADDITIVE.some(re => re.test(statement))) return true;
        const alter = ALTER_TABLE.exec(statement);
        if (!alter) return false;
        return AdditiveSql.topLevelClauses(alter[1]).every(clause => /^ADD COLUMN `[^`]+` /i.test(clause));
    }

    /** Splits on commas outside parentheses, so DECIMAL(10, 2) stays one clause. */
    static topLevelClauses(text) {
        const clauses = [];
        let depth = 0;
        let current = '';
        for (const ch of text) {
            if (ch === '(') depth++;
            if (ch === ')') depth--;
            if (ch === ',' && depth === 0) {
                clauses.push(current.trim());
                current = '';
                continue;
            }
            current += ch;
        }
        if (current.trim()) clauses.push(current.trim());
        return clauses;
    }
}
