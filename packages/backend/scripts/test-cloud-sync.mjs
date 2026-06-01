import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import CloudSyncService from '../src/services/cloudSyncService.js';

dotenv.config();
const local = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
const cloud = new PrismaClient({ datasourceUrl: process.env.CLOUD_DATABASE_URL });

// Show the one event we have
const ev = await local.event.findMany();
console.log('Local events:', JSON.stringify(ev, (k, v) => typeof v === 'bigint' ? v.toString() : v, 2));

// Try to find this id on cloud
if (ev[0]) {
    const cloudHit = await cloud.$queryRawUnsafe(
        `SELECT id FROM events WHERE id = ${Number(ev[0].id)}`
    );
    console.log('Cloud already has it?', cloudHit.length > 0);
}

const svc = new CloudSyncService({
    localPrisma: local,
    cloudPrisma: cloud,
    logger: console,
    trigger: 'startup',
});

console.log('--- running cycle ---');
await svc._cycle();

if (ev[0]) {
    const cloudHit = await cloud.$queryRawUnsafe(
        `SELECT id FROM events WHERE id = ${Number(ev[0].id)}`
    );
    console.log('Cloud has it after sync?', cloudHit.length > 0);
}
await local.$disconnect();
await cloud.$disconnect();
