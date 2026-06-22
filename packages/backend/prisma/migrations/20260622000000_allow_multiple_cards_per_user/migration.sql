-- Allow each user to hold multiple cards: a user may now have several
-- enrollment rows for the same device (one per card). Drop the
-- (deviceId, deviceUserId) unique constraint and keep it as a plain index.

-- DropIndex
DROP INDEX `device_enrollments_deviceId_deviceUserId_key` ON `device_enrollments`;

-- CreateIndex
CREATE INDEX `device_enrollments_deviceId_deviceUserId_idx` ON `device_enrollments`(`deviceId`, `deviceUserId`);
