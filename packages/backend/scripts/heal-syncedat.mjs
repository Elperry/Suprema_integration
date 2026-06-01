import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config();
const local = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

console.log('Before:', await local.$queryRawUnsafe(
    "SELECT id, CAST(syncedAt AS CHAR) AS sa FROM events WHERE id = 1600"
));

const n = await local.$executeRawUnsafe("UPDATE events SET syncedAt = NULL WHERE id = 1600");
console.log('Update rows:', n);

console.log('After:', await local.$queryRawUnsafe(
    "SELECT id, CAST(syncedAt AS CHAR) AS sa FROM events WHERE id = 1600"
));

await local.$disconnect();
