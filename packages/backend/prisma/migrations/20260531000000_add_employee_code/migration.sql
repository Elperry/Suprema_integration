ALTER TABLE `employee` ADD COLUMN `code` VARCHAR(100) NULL;
CREATE INDEX `employee_code` ON `employee`(`code`);
