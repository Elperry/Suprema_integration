-- Restructure card_assignments: link to user table (replacing raw employeeId string),
-- rename cardData -> card_data, add card_csn, drop unused metadata columns.
ALTER TABLE `card_assignments`
  DROP COLUMN `employeeId`,
  DROP COLUMN `employeeName`,
  DROP COLUMN `cardSize`,
  DROP COLUMN `cardType`,
  DROP COLUMN `cardFormat`,
  CHANGE COLUMN `cardData` `card_data` VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  ADD COLUMN  `user_id`  INT          NOT NULL DEFAULT 0 AFTER `id`,
  ADD COLUMN  `card_csn` VARCHAR(100) NOT NULL DEFAULT ''  AFTER `card_data`;

DROP INDEX `card_assignments_employeeId_idx` ON `card_assignments`;
CREATE INDEX `card_assignments_employeeId_idx` ON `card_assignments`(`user_id`);
