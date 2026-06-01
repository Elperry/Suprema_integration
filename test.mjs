import { PrismaClient } from './packages/backend/node_modules/@prisma/client/index.js';
const p = new PrismaClient();
const res = await p.event.groupBy({
    by: ['deviceId', 'supremaEventId'],
    _count: { id: true },
    having: { id: { _count: { gt: 1 } } }
});
console.log("Duplicates by deviceId and supremaEventId:", res.length);
console.log(res);

const total = await p.event.count();
console.log("Total events:", total);

const res2 = await p.event.groupBy({
    by: ['timestamp', 'userId', 'eventCode'],
    _count: { id: true },
    having: { id: { _count: { gt: 1 } } }
});
console.log("Duplicates by timestamp, userId, eventCode:", res2.length);
console.log(res2.slice(0, 5));
await p.$disconnect();
