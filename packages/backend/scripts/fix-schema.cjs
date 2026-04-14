const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  const migrations = [
    "ALTER TABLE card_assignments ADD COLUMN IF NOT EXISTS cardSize INT NOT NULL DEFAULT 32",
    "ALTER TABLE device ADD COLUMN IF NOT EXISTS locationId INT NULL",
    "ALTER TABLE device ADD COLUMN IF NOT EXISTS direction VARCHAR(10) NOT NULL DEFAULT 'in'",
    "ALTER TABLE device ADD COLUMN IF NOT EXISTS deviceType VARCHAR(50) NULL",
    "ALTER TABLE device ADD COLUMN IF NOT EXISTS serialNumber VARCHAR(100) NULL",
  ];
  for (const sql of migrations) {
    try {
      await p.$executeRawUnsafe(sql);
      // console.log('OK:', sql.substring(0, 80));
    } catch (e) {
      console.log('SKIP:', e.message.substring(0, 120));
    }
  }
  await p.$disconnect();
  console.log('Done');
}

run().catch(e => { console.error(e.message); process.exit(1); });
