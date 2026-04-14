import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
try {
  // Add missing columns that schema defines but DB may not have yet
  const migrations = [
    `ALTER TABLE card_assignments ADD COLUMN IF NOT EXISTS cardSize INT NOT NULL DEFAULT 32`,
    `ALTER TABLE device ADD COLUMN IF NOT EXISTS locationId INT NULL`,
    `ALTER TABLE device ADD COLUMN IF NOT EXISTS direction VARCHAR(10) NOT NULL DEFAULT 'in'`,
    `ALTER TABLE device ADD COLUMN IF NOT EXISTS deviceType VARCHAR(50) NULL`,
    `ALTER TABLE device ADD COLUMN IF NOT EXISTS serialNumber VARCHAR(100) NULL`,
  ];
  for (const sql of migrations) {
    try {
      await prisma.$executeRawUnsafe(sql);
      console.log('OK:', sql.substring(0, 80));
    } catch (e) {
      console.log('SKIP (already exists or unsupported):', e.message.substring(0, 100));
    }
  }
  console.log('Migration complete');
} catch(e) {
  console.error('Fatal error:', e.message);
} finally {
  await prisma.$disconnect();
}
