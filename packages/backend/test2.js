const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function main() {
    console.log("Total events:", await p.event.count());
    const res = await p.event.groupBy({
        by: ['deviceId', 'supremaEventId'],
        _count: { id: true },
        having: { id: { _count: { gt: 1 } } }
    });
    console.log("Duplicates by deviceId and supremaEventId:", res.length);
    console.log(res);

    const res2 = await p.event.groupBy({
        by: ['timestamp', 'userId', 'eventCode'],
        _count: { id: true },
        having: { id: { _count: { gt: 1 } } }
    });
    console.log("Duplicates by timestamp, userId, eventCode:", res2.length);
    console.log(res2.slice(0, 5));
    
    if (res2.length > 0) {
        const dup = await p.event.findMany({
            where: { timestamp: res2[0].timestamp, userId: res2[0].userId, eventCode: res2[0].eventCode },
            take: 10
        });
        console.log("Sample duplicates:");
        console.dir(dup, { depth: null });
    }
}
main().catch(console.error).finally(() => p.$disconnect());
