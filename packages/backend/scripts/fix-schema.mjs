import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// MySQL doesn't support `ADD COLUMN IF NOT EXISTS` — check information_schema first.
async function ensureColumn(table, column, definition) {
    const rows = await prisma.$queryRawUnsafe(
        'SELECT 1 AS present FROM information_schema.COLUMNS '
        + 'WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ? LIMIT 1',
        table, column,
    );
    if (Array.isArray(rows) && rows.length > 0) {
        console.log(`SKIP: ${table}.${column} already exists`);
        return;
    }
    await prisma.$executeRawUnsafe(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`);
    console.log(`OK:   added ${table}.${column}`);
}

try {
    const columns = [
        ['card_assignments', 'cardSize',     'INT NOT NULL DEFAULT 32'],
        ['device',           'locationId',   'INT NULL'],
        ['device',           'direction',    "VARCHAR(10) NOT NULL DEFAULT 'in'"],
        ['device',           'deviceType',   'VARCHAR(50) NULL'],
        ['device',           'serialNumber', 'VARCHAR(100) NULL'],
    ];
    for (const [t, c, d] of columns) {
        try { await ensureColumn(t, c, d); }
        catch (e) { console.log('ERR:', e.message.substring(0, 120)); }
    }
    console.log('Migration complete');
} catch (e) {
    console.error('Fatal error:', e.message);
} finally {
    await prisma.$disconnect();
}

