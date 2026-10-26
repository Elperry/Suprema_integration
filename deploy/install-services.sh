#!/bin/bash
# Creates (or updates) the systemd services of a gate PC and starts them.
#
#   sudo bash deploy/install-services.sh [options]
#
#   --app-dir DIR   the release folder (default: the folder above this script, e.g. /opt/suprema)
#   --user NAME     the account the services run as (default: gate)
#   --env FILE      backend settings (default: /etc/suprema/backend.env, from deploy/backend.env.example)
#   --disable-old   also stop and disable older units that run this app another way
#                   (npm run dev:*, nodemon, vite); the device gateway is never touched
#   --dry-run       print what would be written and done, change nothing
#
# Services:
#   suprema-backend  `node index.js` in <app-dir>/packages/backend. It serves the API and the
#                    operator UI (127.0.0.1:3000 unless HOST/PORT say otherwise) and restarts
#                    by itself.
#   device gateway   an existing unit that runs device_gateway_linux_x64 (e.g. device_gateway)
#                    is reused as it is; without one, suprema-gateway is created from
#                    <app-dir>/device_gateway.
#
# Before running it: build the release (npm ci && npm run build:frontend) and write the env file.
set -u -o pipefail

APP_DIR=$(cd "$(dirname "$0")/.." && pwd)
RUN_USER=gate
ENV_FILE=/etc/suprema/backend.env
DISABLE_OLD=no
DRY=no
UNIT_DIR=${SYSTEMD_DIR:-/etc/systemd/system}
SEARCH_DIRS=("$UNIT_DIR" /lib/systemd/system)
BACKEND_UNIT=suprema-backend.service
TS=$(date +%Y%m%d-%H%M%S)

say()  { echo; echo "===== $*"; }
warn() { echo "WARNING: $*"; }
die()  { echo; echo "STOP: $*"; exit 1; }
run()  { if [ "$DRY" = yes ]; then echo "would run: $*"; else "$@"; fi; }

while [ $# -gt 0 ]; do
  case "$1" in
    --app-dir)     APP_DIR=$(cd "$2" 2>/dev/null && pwd) || die "no such folder: $2"; shift 2 ;;
    --user)        RUN_USER=$2; shift 2 ;;
    --env)         ENV_FILE=$2; shift 2 ;;
    --disable-old) DISABLE_OLD=yes; shift ;;
    --dry-run)     DRY=yes; shift ;;
    -h|--help)     sed -n '2,21p' "$0"; exit 0 ;;
    *)             die "unknown option: $1 (see --help)" ;;
  esac
done

# Value of KEY in the env file, without surrounding quotes.
env_value() { grep -E "^$1=" "$ENV_FILE" | tail -1 | cut -d= -f2- | sed -E "s/^['\"]//; s/['\"]\$//"; }

# Writes a unit file, keeping a dated copy of a different existing one.
write_unit() {
  local name=$1 content=$2 path="$UNIT_DIR/$1"
  if [ "$DRY" = yes ]; then echo "----- $path"; printf '%s\n' "$content"; return; fi
  if [ -f "$path" ] && [ "$(cat "$path")" = "$content" ]; then echo "$name: unchanged"; return; fi
  [ -f "$path" ] && cp -p "$path" "$path.bak-$TS" && echo "$name: previous version kept as $path.bak-$TS"
  printf '%s\n' "$content" > "$path" && echo "$name: written"
}

# Unit files (other than ours) whose ExecStart matches a pattern.
units_running() {
  local d f
  for d in "${SEARCH_DIRS[@]}"; do
    for f in "$d"/*.service; do
      [ -f "$f" ] || continue
      case "$(basename "$f")" in "$BACKEND_UNIT") continue ;; esac
      grep -qE "^ExecStart=.*($1)" "$f" && basename "$f"
    done
  done | sort -u
}

say "checks"
[ "$DRY" = yes ] || [ "$(id -u)" = 0 ] || die "run it with sudo"
[ -f "$APP_DIR/packages/backend/index.js" ] || die "$APP_DIR is not a release folder (no packages/backend/index.js)"
NODE=$(command -v node) || die "node is not installed"
EXEC_NODE=$NODE; case "$NODE" in *' '*) EXEC_NODE="\"$NODE\"" ;; esac   # systemd needs a spaced path quoted
id "$RUN_USER" >/dev/null 2>&1 || { [ "$DRY" = yes ] && warn "user $RUN_USER does not exist here"; } || die "user $RUN_USER does not exist"
[ -f "$ENV_FILE" ] || die "$ENV_FILE is missing - write it from deploy/backend.env.example first"
[ -n "$(env_value DATABASE_URL)" ] || die "DATABASE_URL is empty in $ENV_FILE"
[ -n "$(env_value API_TOKEN)" ] || die "API_TOKEN is empty in $ENV_FILE (openssl rand -hex 32): the API refuses every call without it"
[ -d "$APP_DIR/node_modules" ] || die "dependencies are not installed: run npm ci in $APP_DIR"
[ -f "$APP_DIR/packages/frontend/dist/index.html" ] || warn "the operator UI is not built (npm run build:frontend); the API still runs"
PORT=$(env_value PORT); PORT=${PORT:-3000}
echo "release:  $APP_DIR ($(cat "$APP_DIR/RELEASE" 2>/dev/null || echo 'no RELEASE file'))"
echo "node:     $NODE ($("$NODE" --version))"
echo "settings: $ENV_FILE"
run chown "root:$RUN_USER" "$ENV_FILE"
run chmod 0640 "$ENV_FILE"

say "device gateway"
GW_UNIT=$(units_running 'device_gateway' | head -1)
if [ -n "$GW_UNIT" ]; then
  echo "reusing the existing unit $GW_UNIT"
elif [ -f "$APP_DIR/device_gateway/device_gateway_linux_x64" ]; then
  GW_UNIT=suprema-gateway.service
  write_unit "$GW_UNIT" "[Unit]
Description=Suprema BioStar device gateway (G-SDK)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=$RUN_USER
WorkingDirectory=$APP_DIR/device_gateway
ExecStart=$APP_DIR/device_gateway/device_gateway_linux_x64
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target"
else
  warn "no gateway unit and no $APP_DIR/device_gateway/device_gateway_linux_x64 - the backend starts without one"
fi

say "older ways of running this app"
OLD_UNITS=$(units_running 'npm run (dev|start)|nodemon|vite' | while read -r u; do
  for d in "${SEARCH_DIRS[@]}"; do grep -qiE 'suprema' "$d/$u" 2>/dev/null && { echo "$u"; break; }; done
done)
if [ -z "$OLD_UNITS" ]; then
  echo "none"
elif [ "$DISABLE_OLD" = yes ]; then
  for u in $OLD_UNITS; do echo "disabling $u"; run systemctl disable --now "$u"; done
else
  for u in $OLD_UNITS; do warn "$u also runs this app - it would fight the new service for port $PORT"; done
  die "run again with --disable-old to stop and disable them"
fi

say "backend service"
write_unit "$BACKEND_UNIT" "[Unit]
Description=Suprema gate backend: API and operator UI (see deploy/README.md)
After=network-online.target mysql.service${GW_UNIT:+ $GW_UNIT}
Wants=network-online.target${GW_UNIT:+ $GW_UNIT}

[Service]
Type=simple
User=$RUN_USER
WorkingDirectory=$APP_DIR/packages/backend
EnvironmentFile=$ENV_FILE
ExecStart=$EXEC_NODE index.js
Restart=always
RestartSec=10
# Swipes stay on the terminals while the backend restarts.
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target"

say "start"
run systemctl daemon-reload
[ -n "$GW_UNIT" ] && run systemctl enable --now "$GW_UNIT"
run systemctl enable "$BACKEND_UNIT"
run systemctl restart "$BACKEND_UNIT"
[ "$DRY" = yes ] && { echo; echo "dry run: nothing was changed"; exit 0; }

say "checks (up to 3 minutes: startup connects every terminal first)"
ok=no
for i in $(seq 90); do
  sleep 2
  systemctl is-active --quiet "$BACKEND_UNIT" || continue
  [ "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/health")" = 200 ] && { ok=yes; break; }
done
for u in $GW_UNIT $BACKEND_UNIT; do echo "$u: $(systemctl is-active "$u")"; done
if [ "$ok" != yes ]; then
  journalctl -u "$BACKEND_UNIT" -n 30 --no-pager
  die "the backend did not answer on port $PORT"
fi
echo "health: 200"
echo "API without token: $(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/api/devices") (expect 401)"
echo "UI: $(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/") (expect 200)"
echo
echo "Done. Logs: sudo journalctl -u ${BACKEND_UNIT%.service} -f"
echo "Operator UI: http://127.0.0.1:$PORT (asks once for API_TOKEN from $ENV_FILE)"
