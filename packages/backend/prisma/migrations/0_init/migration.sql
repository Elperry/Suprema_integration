-- CreateTable
CREATE TABLE `locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `parentId` INTEGER NULL,
    `level` INTEGER NOT NULL DEFAULT 0,
    `locationType` VARCHAR(50) NOT NULL DEFAULT 'zone',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `locations_parentId_idx`(`parentId`),
    INDEX `locations_locationType_idx`(`locationType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `device` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `ip` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `loc` VARCHAR(191) NULL,
    `channel` TINYINT UNSIGNED NULL,
    `last_event_sync` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_user_sync` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `port` INTEGER UNSIGNED NULL DEFAULT 51211,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `status` VARCHAR(191) NULL DEFAULT 'disconnected',
    `useSSL` BOOLEAN NOT NULL DEFAULT false,
    `locationId` INTEGER NULL,
    `direction` VARCHAR(10) NOT NULL DEFAULT 'in',
    `deviceType` VARCHAR(50) NULL,
    `serialNumber` VARCHAR(100) NULL,

    INDEX `device_locationId_idx`(`locationId`),
    INDEX `device_direction_idx`(`direction`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gateevents` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `employee_id` CHAR(20) NULL,
    `door_no` INTEGER UNSIGNED NULL,
    `gate_id` INTEGER UNSIGNED NULL,
    `loc` CHAR(15) NULL,
    `dir` CHAR(5) NULL,
    `etime` DATETIME(3) NULL,
    `etime_truncated` VARCHAR(16) NULL,
    `d` DATE NULL,
    `t` TIME(0) NULL,

    INDEX `etime`(`etime`),
    INDEX `gate_id`(`gate_id`),
    INDEX `index_foreignkey_gateevents_employee`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(300) NOT NULL,
    `userpassword` VARCHAR(300) NOT NULL,
    `displayname` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tempaccess` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `solutionnname` VARCHAR(191) NULL,
    `person_name` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,
    `qrcode` DOUBLE NULL,
    `email` VARCHAR(191) NULL,
    `drive_id` VARCHAR(100) NULL,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `host` VARCHAR(5000) NULL,
    `ts` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `card_assignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` VARCHAR(50) NOT NULL,
    `employeeName` VARCHAR(255) NULL,
    `cardData` VARCHAR(255) NOT NULL,
    `cardSize` INTEGER NOT NULL DEFAULT 32,
    `cardType` VARCHAR(50) NOT NULL DEFAULT 'CSN',
    `cardFormat` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(20) NOT NULL DEFAULT 'active',
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `revokedAt` DATETIME(3) NULL,
    `notes` TEXT NULL,

    INDEX `card_assignments_employeeId_idx`(`employeeId`),
    INDEX `card_assignments_status_idx`(`status`),
    UNIQUE INDEX `card_assignments_cardData_key`(`cardData`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `device_enrollments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceId` INTEGER UNSIGNED NOT NULL,
    `cardAssignmentId` INTEGER NOT NULL,
    `deviceUserId` VARCHAR(50) NOT NULL,
    `enrolledAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastSyncAt` DATETIME(3) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'active',

    INDEX `device_enrollments_status_idx`(`status`),
    UNIQUE INDEX `device_enrollments_deviceId_cardAssignmentId_key`(`deviceId`, `cardAssignmentId`),
    UNIQUE INDEX `device_enrollments_deviceId_deviceUserId_key`(`deviceId`, `deviceUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceId` INTEGER UNSIGNED NOT NULL,
    `supremaEventId` BIGINT NOT NULL,
    `eventCode` INTEGER NOT NULL,
    `eventType` VARCHAR(50) NOT NULL,
    `subType` VARCHAR(50) NULL,
    `userId` VARCHAR(50) NULL,
    `doorId` INTEGER NULL,
    `description` VARCHAR(500) NULL,
    `authResult` VARCHAR(20) NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `syncedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rawData` JSON NULL,

    INDEX `events_deviceId_idx`(`deviceId`),
    INDEX `events_eventType_idx`(`eventType`),
    INDEX `events_userId_idx`(`userId`),
    INDEX `events_timestamp_idx`(`timestamp`),
    INDEX `events_authResult_idx`(`authResult`),
    UNIQUE INDEX `events_deviceId_supremaEventId_key`(`deviceId`, `supremaEventId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(100) NOT NULL,
    `category` VARCHAR(50) NOT NULL DEFAULT 'general',
    `targetType` VARCHAR(50) NULL,
    `targetId` VARCHAR(100) NULL,
    `details` JSON NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'success',
    `errorMessage` TEXT NULL,
    `ipAddress` VARCHAR(45) NULL,
    `requestId` VARCHAR(100) NULL,
    `duration` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_action_idx`(`action`),
    INDEX `audit_logs_category_idx`(`category`),
    INDEX `audit_logs_targetType_targetId_idx`(`targetType`, `targetId`),
    INDEX `audit_logs_createdAt_idx`(`createdAt`),
    INDEX `audit_logs_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `filter_presets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `scope` VARCHAR(50) NOT NULL,
    `filters` JSON NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `filter_presets_scope_idx`(`scope`),
    UNIQUE INDEX `filter_presets_name_scope_key`(`name`, `scope`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollment_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operation` VARCHAR(50) NOT NULL,
    `deviceId` INTEGER NULL,
    `userId` VARCHAR(50) NULL,
    `cardDataHex` VARCHAR(512) NULL,
    `cardSize` INTEGER NULL,
    `cardType` INTEGER NULL,
    `bufferLength` INTEGER NULL,
    `requestPayload` JSON NULL,
    `responsePayload` JSON NULL,
    `success` BOOLEAN NOT NULL DEFAULT false,
    `errorMessage` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `enrollment_logs_deviceId_idx`(`deviceId`),
    INDEX `enrollment_logs_operation_idx`(`operation`),
    INDEX `enrollment_logs_success_idx`(`success`),
    INDEX `enrollment_logs_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `locations` ADD CONSTRAINT `locations_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `device_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `device_enrollments` ADD CONSTRAINT `device_enrollments_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `device`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `device_enrollments` ADD CONSTRAINT `device_enrollments_cardAssignmentId_fkey` FOREIGN KEY (`cardAssignmentId`) REFERENCES `card_assignments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

