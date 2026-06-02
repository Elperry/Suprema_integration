const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

// MySQL doesn't support `ADD COLUMN IF NOT EXISTS` — check information_schema first.
async function ensureColumn(table, column, definition) {
    const rows = await p.$queryRawUnsafe(
        'SELECT 1 AS present FROM information_schema.COLUMNS '
        + 'WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ? LIMIT 1',
        table, column,
    );
    if (Array.isArray(rows) && rows.length > 0) return;
    await p.$executeRawUnsafe(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`);
    console.log(`OK: added ${table}.${column}`);
}

async function run() {
    const columns = [
        ['card_assignments', 'cardSize',     'INT NOT NULL DEFAULT 32'],
        ['device',           'locationId',   'INT NULL'],
        ['device',           'direction',    "VARCHAR(10) NOT NULL DEFAULT 'in'"],
        ['device',           'deviceType',   'VARCHAR(50) NULL'],
        ['device',           'serialNumber', 'VARCHAR(100) NULL'],
    ];
    for (const [t, c, d] of columns) {
        try { await ensureColumn(t, c, d); }
        catch (e) { console.log('SKIP:', e.message.substring(0, 120)); }
    }
    await p.$disconnect();
    console.log('Done');
}

run().catch(e => { console.error(e.message); process.exit(1); });
