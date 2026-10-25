import test from 'node:test';
import assert from 'node:assert/strict';
import { AdditiveSql } from './AdditiveSql.js';

test('an empty diff is additive and has nothing to apply', () => {
    assert.deepEqual(AdditiveSql.classify('-- This is an empty migration.\n'), { additive: true, statements: 0, offending: [] });
});

test('new columns, indexes and tables are additive', () => {
    const sql = [
        '-- AlterTable',
        'ALTER TABLE `events` ADD COLUMN `cloudSyncedAt` DATETIME(3) NULL,',
        '    ADD COLUMN `amount` DECIMAL(10, 2) NULL;',
        '',
        '-- CreateIndex',
        'CREATE INDEX `events_cloudSyncedAt_idx` ON `events`(`cloudSyncedAt`);',
        'CREATE UNIQUE INDEX `x_key` ON `t`(`a`, `b`);',
        '',
        '-- CreateTable',
        'CREATE TABLE `filter_presets` (',
        '    `id` INTEGER NOT NULL AUTO_INCREMENT,',
        '    PRIMARY KEY (`id`)',
        ') DEFAULT CHARACTER SET utf8mb4;',
    ].join('\n');
    assert.deepEqual(AdditiveSql.classify(sql), { additive: true, statements: 4, offending: [] });
});

test('anything that drops, changes or renames is not additive', () => {
    for (const statement of [
        'DROP INDEX `user_employee_id` ON `user`;',
        'ALTER TABLE `user` ALTER COLUMN `code` DROP DEFAULT;',
        'ALTER TABLE `events` MODIFY `timestamp` DATETIME(3) NOT NULL;',
        'ALTER TABLE `card_assignments` RENAME INDEX `a` TO `b`;',
        'ALTER TABLE `events` ADD COLUMN `a` INT NULL, DROP COLUMN `b`;',
        'ALTER TABLE `c` ADD CONSTRAINT `fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);',
        'DROP TABLE `events`;',
        'DELETE FROM `events`;',
    ]) {
        const result = AdditiveSql.classify(statement);
        assert.equal(result.additive, false, statement);
        assert.equal(result.offending.length, 1, statement);
    }
});

test('one bad statement among good ones makes the whole diff non-additive', () => {
    const sql = 'CREATE INDEX `i` ON `t`(`a`);\n\nDROP TABLE `t`;\n';
    const result = AdditiveSql.classify(sql);
    assert.equal(result.additive, false);
    assert.deepEqual(result.offending, ['DROP TABLE `t`']);
});

test('foreign-key-only differences are set aside, not applied and not blocking', () => {
    const sql = [
        '-- DropIndex',
        'DROP INDEX `device_enrollments_cardAssignmentId_fkey` ON `device_enrollments`;',
        '',
        '-- AddForeignKey',
        'ALTER TABLE `device` ADD CONSTRAINT `device_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;',
        'ALTER TABLE `x` DROP FOREIGN KEY `x_fkey`;',
        '',
        'ALTER TABLE `events` ADD COLUMN `cloudSyncedAt` DATETIME(3) NULL;',
    ].join('\n');
    const plan = AdditiveSql.plan(sql);
    assert.deepEqual(plan.apply, ['ALTER TABLE `events` ADD COLUMN `cloudSyncedAt` DATETIME(3) NULL']);
    assert.equal(plan.relationOnly.length, 3);
    assert.deepEqual(plan.offending, []);
});

test('a dropped index that does not back a foreign key still blocks', () => {
    const plan = AdditiveSql.plan('DROP INDEX `user_employee_id` ON `user`;');
    assert.deepEqual(plan.offending, ['DROP INDEX `user_employee_id` ON `user`']);
    assert.deepEqual(plan.relationOnly, []);
});

test('the apply script is the additive statements, each terminated', () => {
    const plan = AdditiveSql.plan('CREATE INDEX `i` ON `t`(`a`);\nALTER TABLE `d` ADD CONSTRAINT `d_fkey` FOREIGN KEY (`a`) REFERENCES `t`(`id`);\n');
    assert.equal(AdditiveSql.script(plan.apply), 'CREATE INDEX `i` ON `t`(`a`);\n');
    assert.equal(AdditiveSql.script([]), '');
});
