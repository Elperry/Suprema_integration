import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const count = await p.event.count();
const sample = await p.event.findMany({ take: 5, orderBy: { id: 'desc' }, select: { id: true, eventType: true, eventCode: true, timestamp: true } });
console.log('Total events in DB:', count);
console.log('Most recent 5:', JSON.stringify(sample, null, 2));
await p.$disconnect();
