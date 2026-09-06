import test from 'node:test';
import assert from 'node:assert/strict';
import { TableFingerprint } from './TableFingerprint.js';

const row = (row_count, max_id, crc) => [{ row_count, max_id, crc }];
const prisma = (rows) => ({ $queryRawUnsafe: async () => rows });
const failing = (error) => ({ $queryRawUnsafe: async () => { throw error; } });
const quiet = { warn() {}, info() {} };

test('buildSql aggregates count, max id and a checksum over the compared columns', () => {
  const sql = TableFingerprint.buildSql('device_enrollments', ['id', 'deviceId', 'status']);
  assert.equal(
    sql,
    "SELECT COUNT(*) AS row_count, IFNULL(MAX(`id`), 0) AS max_id, "
    + "IFNULL(SUM(CRC32(CONCAT_WS('|', IFNULL(CAST(`id` AS CHAR), '~null~'), "
    + "IFNULL(CAST(`deviceId` AS CHAR), '~null~'), IFNULL(CAST(`status` AS CHAR), '~null~')))), 0) AS crc "
    + 'FROM `device_enrollments`'
  );
});

test('buildSql refuses identifiers that could smuggle SQL', () => {
  assert.throws(() => TableFingerprint.buildSql('device_enrollments; DROP TABLE x', ['id']));
  assert.throws(() => TableFingerprint.buildSql('device_enrollments', ['id`)--']));
});

test('unchanged() reports the shared row count when both sides agree', async () => {
  const fp = new TableFingerprint({
    localPrisma: prisma(row(20844n, 31002n, '44012345678')),
    cloudPrisma: prisma(row('20844', 31002, 44012345678n)),
    logger: quiet,
    enabled: true,
  });
  assert.deepEqual(await fp.unchanged({ table: 'device_enrollments', fields: ['id', 'status'] }), { rowCount: 20844 });
});

test('unchanged() returns null on any aggregate mismatch', async () => {
  const cases = [
    row(20844n, 31002n, 1n), // checksum differs
    row(20845n, 31002n, 44012345678n), // count differs
    row(20844n, 31003n, 44012345678n), // max id differs
  ];
  for (const cloud of cases) {
    const fp = new TableFingerprint({
      localPrisma: prisma(row(20844n, 31002n, 44012345678n)),
      cloudPrisma: prisma(cloud),
      logger: quiet,
      enabled: true,
    });
    assert.equal(await fp.unchanged({ table: 'device_enrollments', fields: ['id'] }), null);
  }
});

test('unchanged() is a no-op when disabled or when there is nothing to compare', async () => {
  const fp = new TableFingerprint({ localPrisma: prisma(row(1n, 1n, 1n)), cloudPrisma: prisma(row(1n, 1n, 1n)), logger: quiet, enabled: false });
  assert.equal(await fp.unchanged({ table: 'device_enrollments', fields: ['id'] }), null);

  const on = new TableFingerprint({ localPrisma: prisma(row(1n, 1n, 1n)), cloudPrisma: prisma(row(1n, 1n, 1n)), logger: quiet, enabled: true });
  assert.equal(await on.unchanged({ table: null, fields: ['id'] }), null);
  assert.equal(await on.unchanged({ table: 'device_enrollments', fields: [] }), null);
});

test('unchanged() falls back to the full compare on a query error but rethrows connectivity failures', async () => {
  const warned = [];
  const logger = { warn: (m) => warned.push(m), info() {} };

  const schemaError = Object.assign(new Error('Unknown column'), { code: 'P2010' });
  const fp = new TableFingerprint({ localPrisma: prisma(row(1n, 1n, 1n)), cloudPrisma: failing(schemaError), logger, enabled: true });
  assert.equal(await fp.unchanged({ table: 'device_enrollments', fields: ['id'], label: 'device_enrollments' }), null);
  assert.equal(warned.length, 1);
  assert.match(warned[0], /falling back to full compare/);

  const dead = Object.assign(new Error("Can't reach database server"), { code: 'P1001' });
  const down = new TableFingerprint({ localPrisma: prisma(row(1n, 1n, 1n)), cloudPrisma: failing(dead), logger, enabled: true });
  await assert.rejects(() => down.unchanged({ table: 'device_enrollments', fields: ['id'] }), /reach database/);
});

test('enabledFromEnv defaults on and only "false" turns it off', () => {
  assert.equal(TableFingerprint.enabledFromEnv({}), true);
  assert.equal(TableFingerprint.enabledFromEnv({ CLOUD_SYNC_FINGERPRINT: 'true' }), true);
  assert.equal(TableFingerprint.enabledFromEnv({ CLOUD_SYNC_FINGERPRINT: ' FALSE ' }), false);
});
