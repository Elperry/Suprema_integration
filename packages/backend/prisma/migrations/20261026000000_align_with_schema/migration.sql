-- Brings the migration chain in line with schema.prisma (gate PCs were built
-- with db push, so they already have this: mark it applied with
-- `prisma migrate resolve --applied 20261026000000_align_with_schema`).

-- DropIndex
DROP INDEX `user_employee_id` ON `user`;

-- AlterTable
ALTER TABLE `card_assignments` ALTER COLUMN `user_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `cloudSyncedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `code` DROP DEFAULT,
    ALTER COLUMN `name` DROP DEFAULT,
    ALTER COLUMN `full_name` DROP DEFAULT,
    ALTER COLUMN `employee_id` DROP DEFAULT;

-- CreateIndex
CREATE INDEX `events_cloudSyncedAt_idx` ON `events`(`cloudSyncedAt`);

-- AddForeignKey
ALTER TABLE `card_assignments` ADD CONSTRAINT `card_assignments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `card_assignments` RENAME INDEX `card_assignments_cardData_key` TO `card_assignments_card_data_key`;

-- RenameIndex
ALTER TABLE `card_assignments` RENAME INDEX `card_assignments_employeeId_idx` TO `card_assignments_user_id_idx`;

-- RenameIndex
ALTER TABLE `employee` RENAME INDEX `employee_code` TO `employee_code_idx`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_code` TO `user_code_idx`;

