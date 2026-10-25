/**
 * Two gate PCs, one cloud schema, real MySQL and real Prisma.
 *
 *   E2E_MYSQL=mysql://root@127.0.0.1:3306 node test-e2e/twoGatePcs.e2e.mjs
 *
 * Creates (and drops) three throwaway schemas suprema_e2e_gate1, suprema_e2e_gate2, suprema_e2e_cloud,
 * builds each with `prisma migrate deploy`, seeds two PCs whose local ids
 * collide, runs three sync cycles and checks: no cloud deletes, one cloud
 * user per employee, every swipe exactly once with translated ids, history
 * untouched. Needs InnoDB as the default engine. Not part of `npm test`.
 */
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import CloudSyncService from '../src/services/cloudSyncService.js';

const base = process.env.E2E_MYSQL;
if (!base) throw new Error('Set E2E_MYSQL, e.g. mysql://root@127.0.0.1:3306');
const url = db => `${base}/${db}`;
const silent = { info() {}, warn: (...a) => console.log('WARN', ...a), error: (...a) => console.log('ERROR', ...a), debug() {} };
const admin = new PrismaClient({ datasourceUrl: url('mysql') });

async function fresh(db) {
    await admin.$executeRawUnsafe(`DROP DATABASE IF EXISTS \`${db}\``);
    await admin.$executeRawUnsafe(`CREATE DATABASE \`${db}\``);
    execSync('npx prisma migrate deploy', { env: { ...process.env, DATABASE_URL: url(db) }, stdio: 'ignore' });
    return new PrismaClient({ datasourceUrl: url(db) });
}

const T = iso => new Date(iso);
const since = T('2026-10-26T00:00:00Z');

// The cloud `employee` is a view over HR in production, with HR's column names
// and its secrets (userpassword, bank, salary). Recreate that shape here.
async function seedCloud(cloud) {
    // Live cloud `user` has no unique key on employee_id (only the gate PCs' own schema does).
    await cloud.$executeRawUnsafe('ALTER TABLE `user` DROP INDEX `user_employee_id_key`');
    await cloud.$executeRawUnsafe('DROP TABLE `employee`');
    await cloud.$executeRawUnsafe(`CREATE TABLE \`employee\` (
        id INT UNSIGNED PRIMARY KEY, displayname VARCHAR(255), code VARCHAR(100), ssn VARCHAR(50),
        username VARCHAR(255), officialemail VARCHAR(255), jobtitle VARCHAR(255), company_id INT,
        departmentid INT, suspend VARCHAR(10), userpassword VARCHAR(255), bankaccount VARCHAR(64))`);
    await addEmployee(cloud, 1001, 'Mona Ali', 'C1');
    await addEmployee(cloud, 1002, 'Omar Said', 'C2');
    await cloud.user.create({ data: { id: 900, code: 'C1', name: 'Mona', full_name: 'Mona Ali', employee_id: 1001 } });
    await cloud.device.create({ data: { id: 40, name: 'Gate 1', ip: '10.10.2.113', serialNumber: '546084682', direction: 'in' } });
    await cloud.$executeRawUnsafe('ALTER TABLE `user` AUTO_INCREMENT = 31828');
    await cloud.event.create({ data: {
        id: 500, deviceId: 40, supremaEventId: 1n, eventCode: 4867, eventType: 'attendance',
        userId: '900', timestamp: T('2026-10-20T06:00:00Z'),
    } });
}

function addEmployee(cloud, id, name, code) {
    return cloud.$executeRawUnsafe(
        'INSERT INTO `employee` (id, displayname, code, username, suspend, userpassword, bankaccount) VALUES (?, ?, ?, ?, ?, ?, ?)',
        id, name, code, `e${id}@school.test`, 'no', 'plain-secret', 'EG00123',
    );
}

async function seedPc(pc, { users, device, cards, events }) {
    for (const u of users) await pc.user.create({ data: u });
    await pc.device.create({ data: device });
    for (const c of cards) await pc.cardAssignment.create({ data: c });
    for (const c of cards) {
        await pc.deviceEnrollment.create({ data: { deviceId: device.id, cardAssignmentId: c.id, deviceUserId: String(c.user_id) } });
    }
    for (const e of events) await pc.event.create({ data: e });
    // the employee cache the puller would fill
}

const ev = (id, deviceId, userId, sup) => ({
    id, deviceId, supremaEventId: BigInt(sup), eventCode: 4867, eventType: 'attendance',
    userId, authResult: 'success', timestamp: T('2026-10-26T06:00:00Z'),
});

const [cloud, gate1, gate2] = [await fresh('suprema_e2e_cloud'), await fresh('suprema_e2e_gate1'), await fresh('suprema_e2e_gate2')];
try {
    await seedCloud(cloud);
    await seedPc(gate1, {
        users: [{ id: 3, code: 'C1', name: 'Mona', full_name: 'Mona Ali', employee_id: 1001 },
            { id: 4, code: 'C2', name: 'Omar', full_name: 'Omar Said', employee_id: 1002 }],
        device: { id: 2, name: 'Gate 1', ip: '10.10.2.113', serialNumber: '546084682', direction: 'in' },
        cards: [{ id: 11, user_id: 3, card_data: 'AA' }, { id: 12, user_id: 4, card_data: 'BB' }],
        events: [ev(1, 2, '3', 1001), ev(2, 2, '4', 1002)],
    });
    await seedPc(gate2, {
        users: [{ id: 1, code: 'C1', name: 'Mona', full_name: 'Mona Ali', employee_id: 1001 },
            { id: 2, code: 'C2', name: 'Omar', full_name: 'Omar Said', employee_id: 1002 }],
        device: { id: 2, name: 'Campus B gate', ip: '10.20.0.5', serialNumber: '777000111', direction: 'in' },
        cards: [{ id: 11, user_id: 2, card_data: 'BB' }],
        events: [ev(1, 2, '2', 1001)],
    });

    const sync = pc => new CloudSyncService({
        localPrisma: pc, cloudPrisma: cloud, logger: silent, trigger: 'interval', eventsSince: since,
        employeeMinPrunePct: 0,
    });
    // One long-lived process per PC, as on the gate PCs: their memories go stale.
    const [pc1, pc2] = [sync(gate1), sync(gate2)];
    await pc1._cycle();
    await pc2._cycle();
    await addEmployee(cloud, 1003, 'Hana Adel', 'C3');   // a new hire, seen by both PCs
    await pc1._cycle();
    await pc2._cycle();

    const users = await cloud.user.findMany({ orderBy: { employee_id: 'asc' } });
    assert.deepEqual(users.map(u => u.employee_id), [1001, 1002, 1003], 'one cloud user per employee, new hire once');
    assert.equal(users[0].id, 900, 'existing cloud user kept');
    const omar = users[1].id;
    assert.ok(omar >= 31828, 'new user id assigned by the cloud');

    const devices = await cloud.device.findMany();
    assert.deepEqual(devices.map(d => d.serialNumber).sort(), ['546084682', '777000111']);
    assert.equal(devices.every(d => d.password === null), true, 'no device password in the cloud');
    const campusB = devices.find(d => d.serialNumber === '777000111').id;

    const events = await cloud.event.findMany({ orderBy: { id: 'asc' } });
    assert.equal(events[0].id, 500, 'history untouched');
    const pushed = events.slice(1).map(e => [e.deviceId, e.userId]).sort();
    assert.deepEqual(pushed, [[40, '900'], [40, String(omar)], [campusB, String(omar)]].sort(), 'every swipe once, translated');

    assert.equal(await cloud.cardAssignment.count(), 2, 'card BB stored once');
    assert.equal(await cloud.deviceEnrollment.count(), 3);
    for (const pc of [gate1, gate2]) {
        assert.equal(await pc.event.count({ where: { cloudSyncedAt: null } }), 0, 'local backlog drained');
        const cached = await pc.employee.findMany();
        assert.equal(cached.length, 3, 'employee cache filled from the view');
        assert.equal(JSON.stringify(cached).includes('plain-secret'), false, 'no password reached the gate PC');
        assert.equal(JSON.stringify(cached).includes('EG00123'), false, 'no bank account reached the gate PC');
    }
    console.log('E2E PASS: two gate PCs, one cloud, no deletes, translated ids, history intact');
} finally {
    for (const c of [cloud, gate1, gate2]) await c.$disconnect();
    for (const db of ['suprema_e2e_cloud', 'suprema_e2e_gate1', 'suprema_e2e_gate2']) await admin.$executeRawUnsafe(`DROP DATABASE IF EXISTS \`${db}\``);
    await admin.$disconnect();
}
