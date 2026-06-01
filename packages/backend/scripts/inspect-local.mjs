import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config();

const local = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
const tables = await local.$queryRawUnsafe(
    "SELECT table_name AS t, table_rows AS r FROM information_schema.tables WHERE table_schema = DATABASE() ORDER BY table_name"
);
console.log('--- tables in local DB ---');
for (const x of tables) {
    const real = await local.$queryRawUnsafe(`SELECT COUNT(*) AS c FROM \`${x.t}\``);
    const cnt = typeof real[0].c === 'bigint' ? Number(real[0].c) : real[0].c;
    console.log(String(x.t).padEnd(40), 'info_schema=', x.r, 'real=', cnt);
}
await local.$disconnect();
