-- Restructure user table: remove legacy auth fields, add employee-linked fields.
-- Source of truth for this table is the local DB.
-- Rows are auto-provisioned from the employee table during each cloud sync cycle.
ALTER TABLE `user`
  DROP COLUMN `username`,
  DROP COLUMN `userpassword`,
  DROP COLUMN `displayname`,
  ADD COLUMN `code`        VARCHAR(15)  NOT NULL DEFAULT '',
  ADD COLUMN `name`        VARCHAR(200) NOT NULL DEFAULT '',
  ADD COLUMN `full_name`   VARCHAR(200) NOT NULL DEFAULT '',
  ADD COLUMN `employee_id` INT          NOT NULL DEFAULT 0;

CREATE INDEX `user_employee_id` ON `user`(`employee_id`);
CREATE INDEX `user_code`        ON `user`(`code`);
