import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config();
const local = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
try {
    const rows = await local.$queryRawUnsafe('SELECT * FROM events');
    console.log(JSON.stringify(rows, (k, v) => typeof v === 'bigint' ? v.toString() : v, 2));
} catch (e) {
    console.log('queryRaw failed:', e.message);
}
try {
    const cols = await local.$queryRawUnsafe(
        "SELECT column_name, data_type, column_type FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'events'"
    );
    console.log('Columns:', JSON.stringify(cols, null, 2));
} catch (e) {
    console.log('cols failed:', e.message);
}
await local.$disconnect();

