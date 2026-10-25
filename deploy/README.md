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
```

From each PC, test TLS to the school database:

```bash
mysql --ssl-mode=VERIFY_IDENTITY -h <host> ...
```

If MySQL's auto-generated certificate fails `VERIFY_IDENTITY`, the owner picks one of two:
- a proper certificate, or
- `sslaccept=accept_invalid_certs` as an interim.

## 1. Install (window, per PC; the terminals buffer swipes)

```bash
sudo systemctl stop <old backend unit or process>   # leave the gateway running unless replacing it
tar czf ~/suprema-backup-$(date +%F).tgz <current install>
mysqldump <local db> | gzip > ~/suprema-local-$(date +%F).sql.gz

sudo mkdir -p /opt/suprema /etc/suprema
sudo rsync -a --delete --exclude node_modules <this release>/ /opt/suprema/
sudo cp -a <current install>/device_gateway/cert /opt/suprema/device_gateway/   # gateway certs stay on the PC
cd /opt/suprema && npm ci && (cd packages/backend && npx prisma generate) && npm run build:frontend
```

**Local schema.** These PCs were built with `db push`, so record the existing migrations as applied, then apply only what is new:

```bash
cd /opt/suprema/packages/backend
for m in 0_init 20260518130000_add_system_settings 20260530000000_create_employee \
         20260531000000_add_employee_code 20260531000001_restructure_user_table \
         20260531000002_restructure_card_assignments 20260531000003_user_employee_id_unique \
         20260622000000_allow_multiple_cards_per_user 20261026000000_align_with_schema; do
  npx prisma migrate resolve --applied "$m" || true
done
npx prisma migrate status    # must say: Database schema is up to date
```

**Environment.** Write `/etc/suprema/backend.env` from `deploy/backend.env.example`:
- Set `API_TOKEN` (`openssl rand -hex 32`).
- Use this PC's own cloud account.
- Set `CLOUD_SYNC_EVENTS_SINCE` to this install time, in UTC.

```bash
sudo chown root:gate /etc/suprema/backend.env && sudo chmod 0640 /etc/suprema/backend.env

sudo cp deploy/systemd/*.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now suprema-gateway suprema-backend
journalctl -u suprema-backend -f
```

## 2. Verify

- **Logs:** `journalctl -u suprema-backend` shows two clean `CloudSync` cycles: employees, users, devices, cards, enrollments, then `[CloudSync:events] inserted=…`.
- **Test swipe:** it appears locally, then in cloud `events`, then in `ice_employees.gevents`, then on the HR screen. Local `cloudSyncedAt IS NULL` drops back to 0.
- **Cloud row counts only grow.** Run `SELECT COUNT(*)` per table before and after.
- **No deletes:** `performance_schema` shows no DELETE from this account.
- **API is locked:** `curl -s localhost:3000/api/devices` returns 401; with `-H "Authorization: Bearer $API_TOKEN"` it returns JSON with no `password`.
- **UI:** `http://127.0.0.1:3000/` opens the UI and asks for the token once.
- **Terminal clocks:** the log shows `Clock: devices set to Africa/Cairo (UTC+2)` after 29 Oct (UTC+3 in summer).

## 3. Rollback

```bash
sudo systemctl disable --now suprema-backend   # (and suprema-gateway if it was replaced)
tar xzf ~/suprema-backup-<date>.tgz -C /        # restore the old tree and .env
<start the old process the way it ran before>
```

The old code only pushes event ids above the cloud's `MAX(id)`, so it is safe to start again after the new code ran.

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
