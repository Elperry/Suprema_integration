-- The employee cache existed only through `prisma db push`; no migration
-- created it, so `add_employee_code` failed on a fresh database.
-- IF NOT EXISTS: on gate PCs built with db push this is a no-op (and is
-- marked applied with `prisma migrate resolve --applied`).
CREATE TABLE IF NOT EXISTS `employee` (
    `id` INTEGER UNSIGNED NOT NULL,
    `fullname` VARCHAR(191) NULL,
    `firstname` VARCHAR(100) NULL,
    `lastname` VARCHAR(100) NULL,
    `displayname` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `mobile` VARCHAR(50) NULL,
    `jobtitle` VARCHAR(255) NULL,
    `company_id` INTEGER NULL,
    `suspend` VARCHAR(10) NULL,
    `ssn` VARCHAR(50) NULL,
    `card` VARCHAR(100) NULL,
    `department` VARCHAR(255) NULL,
    `extra` JSON NULL,
    `lastSyncedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `employee_company_id_idx`(`company_id`),
    INDEX `employee_suspend_idx`(`suspend`),
    INDEX `employee_fullname_idx`(`fullname`),
    INDEX `employee_ssn_idx`(`ssn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
