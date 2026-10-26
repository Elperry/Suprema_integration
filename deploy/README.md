# Gate PC deployment (suprema_hr)

Each school gate PC runs the BioStar `device_gateway` plus this backend. The backend:
- keeps a local MySQL;
- serves the operator UI on `127.0.0.1:3000`;
- pushes into the school's shared cloud schema.

Two PCs share one cloud schema; see `packages/backend/src/services/cloudSyncService.js`.

**Rules that never change**
- The cloud is never deleted from.
- Attendance history is never re-sent or rewritten.
- The API is never reachable off the PC without the token.

## 0. Preflight (read-only, on each PC)

```bash
systemctl list-units | grep -i -E 'suprema|gateway|node'   # how it runs today
ps -ef | grep -E 'device_gateway|node|vite' | grep -v grep
cd <current install> && git log -1 --format='%h %ad' && git status --short
grep -o '^[A-Z_]*=' packages/backend/.env                      # key NAMES only
grep '^CLOUD_DATABASE_URL' packages/backend/.env | sed -E 's#//[^@]*@#//***@#'   # host and path, no password
cd packages/backend && npx prisma migrate status
mysql -e "SELECT COUNT(*) FROM tempaccess" <local db>            # must be 0 before Phase 2
mysql -e "SELECT COUNT(*), MIN(id), MAX(id) FROM events WHERE cloudSyncedAt IS NULL" <local db>
mysql -e "SELECT JSON_EXTRACT(value,'$.eventReplication.enabled') FROM system_settings WHERE \`key\`='sync'" <local db>
```

The last line must not say `false`. If it does, the new backend honours it and stops reading swipes from the terminals (the old code force-started replication). Fix it in step 1.

On the server, confirm that only the two gate PCs use the old account, because step 1 locks it:

```sql
SELECT USER, HOST, DB FROM information_schema.processlist WHERE USER = 'suprema_hr';
```

From each PC, test TLS to the school database:

```bash
mysql --ssl-mode=VERIFY_IDENTITY -h <host> ...
```

If MySQL's auto-generated certificate fails `VERIFY_IDENTITY`, the owner picks one of two:
- a proper certificate, or
- `sslaccept=accept_invalid_certs` as an interim.

## 1. Install (one window for BOTH PCs; the terminals buffer swipes)

**Both PCs change over in the same window.** Never run old code on one PC and new code on the other. The old mirror deletes cloud rows it does not hold locally (`user`, `device`, `card_assignments`, `device_enrollments`, `tempaccess`, `locations`), using `suprema_hr`, which has DELETE. Those rows include the ones the new code inserts. The old mirror also writes rows under its own local ids, which can land on ids the cloud has since given to other rows.

1. Stop the old backend on **both** PCs:

   ```bash
   sudo systemctl stop <old backend unit or process>   # leave the gateway running unless replacing it
   ```

2. On the server, lock the old account. This is reversible with `ACCOUNT UNLOCK`. From here on, a forgotten old process or a mistaken restart cannot touch the cloud:

   ```sql
   ALTER USER 'suprema_hr'@'%' ACCOUNT LOCK;
   ```

3. Install on each PC:

```bash
tar czf ~/suprema-backup-$(date +%F).tgz <current install>
mysqldump <local db> | gzip > ~/suprema-local-$(date +%F).sql.gz

sudo mkdir -p /opt/suprema /etc/suprema
sudo rsync -a --delete --exclude node_modules <this release>/ /opt/suprema/
sudo cp -a <current install>/device_gateway/cert /opt/suprema/device_gateway/   # gateway certs stay on the PC
cd /opt/suprema && npm ci && (cd packages/backend && npx prisma generate) && npm run build:frontend
```

**Environment.** Write `/etc/suprema/backend.env` from `deploy/backend.env.example`:
- Set `API_TOKEN` (`openssl rand -hex 32`).
- Use this PC's own cloud account.
- Set `CLOUD_SYNC_EVENTS_SINCE` from the backlog report below, never to the install time.

```bash
sudo chown root:gate /etc/suprema/backend.env && sudo chmod 0640 /etc/suprema/backend.env
```

**Local schema.** These PCs were built with `db push` from whatever `schema.prisma` their tree had. First prove the schema matches this release, and only then record the migrations as applied:

```bash
cd /opt/suprema/packages/backend
set -a; . /etc/suprema/backend.env; set +a          # DATABASE_URL, CLOUD_DATABASE_URL
npx prisma migrate diff --from-url "$DATABASE_URL" --to-schema-datamodel prisma/schema.prisma --exit-code
```

- **Exit 0 (no difference):** continue.
- **Exit 2 (difference):** stop. Print the SQL with `--script` instead of `--exit-code`, then split it with `node scripts/gate-cutover.mjs plan-sql <diff.sql> <apply.sql>`.
  - The additive statements (`ADD COLUMN`, `CREATE INDEX`, `CREATE TABLE`) go to `apply.sql`. Apply them with `npx prisma db execute --file apply.sql --schema prisma/schema.prisma`.
  - Foreign-key-only lines are set aside: they are neither applied nor blocking. PCs built with `db push` can lack foreign keys, the app resolves relations in code, and adding a key can fail on old orphan rows.
  - Anything else (exit 4) is a drop, change or rename. A person reads it first.
  - Never `db push`.

`scripts/gate-cutover.mjs` also does the other scripted steps:
- `check`: read-only report on both databases;
- `rotate-cloud`: the PC changes its own cloud password;
- `write-env`: builds `backend.env` from the old `.env`.

The Imperial window script that drives it lives in the school's runbook.

```bash
for m in 0_init 20260518130000_add_system_settings 20260530000000_create_employee \
         20260531000000_add_employee_code 20260531000001_restructure_user_table \
         20260531000002_restructure_card_assignments 20260531000003_user_employee_id_unique \
         20260622000000_allow_multiple_cards_per_user 20261026000000_align_with_schema; do
  out=$(npx prisma migrate resolve --applied "$m" 2>&1) || echo "$out" | grep -q P3008 || { echo "$out"; break; }
done                         # P3008 = already recorded; any other error stops the loop
npx prisma migrate status    # must say: Database schema is up to date
```

**Event collection.** If preflight showed `false`, turn it on (a local settings row, not attendance):

```bash
mysql -e "UPDATE system_settings SET value = JSON_SET(value, '$.eventReplication.enabled', true) WHERE \`key\`='sync'" <local db>
```

**Where events start (`CLOUD_SYNC_EVENTS_SINCE`).** With the old backend stopped, ask which local swipes the cloud lacks. Use two weeks before the stop time:

```bash
node scripts/cloud-event-backlog.mjs --since=<stop time − 14 days, ISO UTC>
```

- Set `CLOUD_SYNC_EVENTS_SINCE` to the report's `earliestMissing`. If that is `null`, use the old backend's **stop time**, not the install time: swipes made during the window come off the terminals with times before the install.
- Read `devices`. A device with `cloudId: null` has no cloud row under its serial, so all its swipes count as missing.
  - If the P-3 census shows its old swipes are already in the cloud under another device id, pushing them would duplicate them.
  - In that case stop and ask the owner.

**Start.**

```bash
cd /opt/suprema
sudo bash deploy/install-services.sh --dry-run        # shows the units and every action, changes nothing
sudo bash deploy/install-services.sh --disable-old
journalctl -u suprema-backend -f
```

`deploy/install-services.sh` is the only source of the unit files.
- It writes `suprema-backend.service` from the release folder, `/etc/suprema/backend.env` and the PC's `node`.
- It reuses an existing gateway unit (any unit that runs `device_gateway_linux_x64`, such as `device_gateway.service`). It creates `suprema-gateway.service` only when there is none.
- It refuses to start without `DATABASE_URL`, `API_TOKEN` or `node_modules`.
- `--disable-old` stops and disables units that run this app the old way (`npm run dev:*`, nodemon, vite; for example `backend-dev` and `frontend-dev`). Without the flag it lists them and stops, because they would fight the service for the port.
- It is safe to re-run after an update: changed units are rewritten, the old file is kept as `.bak-<time>`, and the backend restarts. It waits until `/health` answers 200.

## 2. Verify

- **Logs:** `journalctl -u suprema-backend` shows two clean `CloudSync` cycles: employees, users, devices, cards, enrollments, then `[CloudSync:events] inserted=…`.
  - It also shows that event replication started, not `Event replication service disabled by persisted sync settings`.
- **Backlog:** re-run `node scripts/cloud-event-backlog.mjs --since=<the SINCE you set>`. `missing` must fall to 0 within a few cycles.
- **Test swipe:** it appears locally, then in cloud `events`, then in `ice_employees.gevents`, then on the HR screen. Local `cloudSyncedAt IS NULL` drops back to 0.
- **Cloud row counts only grow.** Run `SELECT COUNT(*)` per table before and after.
- **No deletes:** `performance_schema` shows no DELETE from this account.
- **API is locked:** `curl -s localhost:3000/api/devices` returns 401; with `-H "Authorization: Bearer $API_TOKEN"` it returns JSON with no `password`.
- **UI:** `http://127.0.0.1:3000/` opens the UI and asks for the token once.
- **Terminal clocks:** the log shows `Clock: devices set to Africa/Cairo (UTC+2)` after 29 Oct (UTC+3 in summer).

## 3. Rollback

**Never restart the old cloud mirror once the new code has written to the cloud.**
- It deletes the rows the new code inserted.
- Its explicit-id writes can land on ids the cloud has since given to other rows.

`suprema_hr` stays locked. A rollback keeps the terminals collecting into the local database only:

```bash
sudo systemctl disable --now suprema-backend   # (and suprema-gateway if it was replaced)
tar xzf ~/suprema-backup-<date>.tgz -C /        # restore the old tree and .env
sed -i 's/^CLOUD_DATABASE_URL=/#CLOUD_DATABASE_URL=/' <old tree>/packages/backend/.env   # old code: no URL = no cloud sync
<start the old process the way it ran before>
```

Swipes buffer locally. Fix forward and reinstall the new code. When it starts, it pushes everything from its `CLOUD_SYNC_EVENTS_SINCE` by natural key.

## 4. Rename window (`hikv_person_ac` → `ice_hikv`)

On both PCs, stop the backend. Once the server side is done (doc 07, H-21 to H-25), change only the path in `CLOUD_DATABASE_URL`, then start:

```bash
sudo sed -i 's#/hikv_person_ac?#/ice_hikv?#' /etc/suprema/backend.env && sudo systemctl start suprema-backend
```

## 5. Visitor QR trial (after Phase 3 has soaked)

1. Set `VISITOR_QR_PROVISIONING=true` on one PC only, then restart.
2. Register a test visitor in staffportal for today.
3. The log shows `Visitor <code> provisioned on N terminal(s)`.
4. Scan the QR at one terminal. It must open, and the swipe must arrive with `userId` NULL.
5. Scan again after 23:59 that day. It must be refused.

Then enable it on the other PC.
