import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const local = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
const cloud = new PrismaClient({ datasourceUrl: process.env.CLOUD_DATABASE_URL });

const bi = (k, v) => typeof v === 'bigint' ? v.toString() : v;

try {
    const localTotal = await local.event.count();
    const localPending = await local.event.count({ where: { cloudSyncedAt: null } });
    const localSynced = await local.event.count({ where: { cloudSyncedAt: { not: null } } });
    const localMinMax = await local.$queryRawUnsafe('SELECT MIN(id) as minId, MAX(id) as maxId FROM events');
    console.log('LOCAL  total=%d pending=%d synced=%d range=%s', localTotal, localPending, localSynced, JSON.stringify(localMinMax, bi));

    const cloudTotal = await cloud.$queryRawUnsafe('SELECT COUNT(*) as c FROM events');
    console.log('CLOUD  total=%s', JSON.stringify(cloudTotal, bi));

    const dupCheck = await cloud.$queryRawUnsafe(
        'SELECT deviceId, supremaEventId, COUNT(*) as c FROM events GROUP BY deviceId, supremaEventId HAVING c > 1 LIMIT 5'
    );
    console.log('CLOUD duplicate (deviceId,supremaEventId) groups:', JSON.stringify(dupCheck, bi));

    const sample = await local.event.findMany({ where: { cloudSyncedAt: { not: null } }, orderBy: { id: 'desc' }, take: 3 });
    for (const row of sample) {
        const match = await cloud.$queryRawUnsafe('SELECT id, deviceId, supremaEventId, eventCode FROM events WHERE id = ?', row.id);
        console.log('local id', row.id, 'deviceId', row.deviceId, 'supremaEventId', row.supremaEventId.toString(), '-> cloud match:', JSON.stringify(match, bi));
    }

    const mismatch = await local.$queryRawUnsafe(
        `SELECT e.id, e.deviceId as localDeviceId, e.supremaEventId as localSupremaEventId
         FROM events e WHERE e.cloudSyncedAt IS NOT NULL LIMIT 20000`
    );
    let mismatchCount = 0;
    const idsToCheck = mismatch.map(r => Number(r.id));
    if (idsToCheck.length) {
        const cloudRows = await cloud.$queryRawUnsafe(
            `SELECT id, deviceId, supremaEventId FROM events WHERE id IN (${idsToCheck.join(',')})`
        );
        const cloudById = new Map(cloudRows.map(r => [Number(r.id), r]));
        for (const r of mismatch) {
            const c = cloudById.get(Number(r.id));
            if (c && (Number(c.deviceId) !== Number(r.localDeviceId) || c.supremaEventId.toString() !== r.localSupremaEventId.toString())) {
                mismatchCount++;
                if (mismatchCount <= 5) console.log('MISMATCH id', r.id, 'local', r.localDeviceId, r.localSupremaEventId.toString(), 'cloud', c.deviceId, c.supremaEventId.toString());
            }
        }
    }
    console.log('mismatchCount (id collision with different event):', mismatchCount);
} catch (e) {
    console.error('ERR', e.message, e.stack);
} finally {
    await local.$disconnect();
    await cloud.$disconnect();
}
