-- Deduplicate user rows with the same employee_id, keeping the lowest id
-- (the first-provisioned row, which is the one card_assignments link to).
-- All 16 duplicate rows identified have 0 card assignments so deletion is safe.
DELETE u
FROM `user` u
INNER JOIN (
  SELECT employee_id, MIN(id) AS keep_id
  FROM `user`
  GROUP BY employee_id
  HAVING COUNT(*) > 1
) dups ON u.employee_id = dups.employee_id AND u.id <> dups.keep_id;

-- Now that duplicates are removed, add the unique constraint.
ALTER TABLE `user` ADD CONSTRAINT `user_employee_id_key` UNIQUE (`employee_id`);
