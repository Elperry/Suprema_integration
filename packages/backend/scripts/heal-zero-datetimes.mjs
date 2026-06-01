import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config();
const local = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

const bad = await local.$queryRawUnsafe(
    "SELECT id, CAST(timestamp AS CHAR) AS ts, CAST(syncedAt AS CHAR) AS sa, CAST(cloudSyncedAt AS CHAR) AS ca FROM events WHERE timestamp = '0000-00-00 00:00:00' OR syncedAt = '0000-00-00 00:00:00' OR cloudSyncedAt = '0000-00-00 00:00:00'"
);
console.log('Bad rows:', JSON.stringify(bad, (k, v) => typeof v === 'bigint' ? v.toString() : v, 2));

const r1 = await local.$executeRawUnsafe(
    "UPDATE events SET timestamp = NOW(3) WHERE timestamp = '0000-00-00 00:00:00'"
);
const r2 = await local.$executeRawUnsafe(
    "UPDATE events SET syncedAt = NULL WHERE syncedAt = '0000-00-00 00:00:00'"
);
const r3 = await local.$executeRawUnsafe(
    "UPDATE events SET cloudSyncedAt = NULL WHERE cloudSyncedAt = '0000-00-00 00:00:00'"
);
console.log(`Updated timestamp=${r1}, syncedAt=${r2}, cloudSyncedAt=${r3}`);

await local.$disconnect();
