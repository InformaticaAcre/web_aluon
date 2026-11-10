#!/usr/bin/env bash
set -euo pipefail

# Deploys this repo to a remote Docker host and starts the stack.
#
# Defaults match your current setup:
# - Remote host: 192.168.99.14
# - Remote dir : /opt/aluon-web
# - Ports      : frontend 8010, backend 8011 (docker-compose.yml)
#
# Usage:
#   ./scripts/deploy-server.sh [dev2|pre|prod]
#   ALUON_HOST=192.168.99.14 ALUON_USER=root ./scripts/deploy-server.sh prod
#
# Optional env:
#   ALUON_HOST, ALUON_USER, ALUON_DIR
#   SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD
#   APP_DB_SCHEMA, SPRING_FLYWAY_TABLE, APP_JWT_SECRET, APP_CORS_ALLOWED_ORIGINS

HOST="${ALUON_HOST:-192.168.99.14}"
USER="${ALUON_USER:-root}"
ENV="${1:-dev2}"

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
ROOT_DIR="$(cd -- "${SCRIPT_DIR}/.." && pwd -P)"
cd "${ROOT_DIR}"

# Fail fast if run outside the repo tree
for p in backend frontend index.html package.json vite.config.ts; do
  if [[ ! -e "${p}" ]]; then
    echo "Error: no encuentro '${p}'. Ejecuta este script desde el repo (o no lo muevas fuera de 'scripts/')." >&2
    exit 1
  fi
done

# NOTE: These defaults are embedded for convenience.
# If you prefer not to store secrets in a script, export the env vars before running.
SPRING_DATASOURCE_USERNAME="${SPRING_DATASOURCE_USERNAME:-aluon}"
SPRING_DATASOURCE_PASSWORD="${SPRING_DATASOURCE_PASSWORD:-aluon}"
APP_JWT_SECRET="${APP_JWT_SECRET:-aluon_jwt_secret_change_me_please_min_32_chars_2026}"
APP_DB_SCHEMA="${APP_DB_SCHEMA:-aluon_web}"
SPRING_FLYWAY_TABLE="${SPRING_FLYWAY_TABLE:-flyway_schema_history_aluon_web}"

case "$ENV" in
  pre)
    echo "Configuring for PREPRODUCCION..."
    FRONTEND_PORT="8013"
    BACKEND_PORT="8014"
    SPRING_DATASOURCE_URL="${SPRING_DATASOURCE_URL:-jdbc:postgresql://192.168.99.14:3000/aluonbbddprod}"
    APP_CORS_ALLOWED_ORIGINS="${APP_CORS_ALLOWED_ORIGINS:-http://192.168.99.14:8013,https://aluon.iconseriespeliculas.xyz}"
    REMOTE_DIR="${ALUON_DIR:-/opt/aluon-web-pre}"
    ;;
  prod)
    echo "Configuring for PRODUCCION..."
    FRONTEND_PORT="8015"
    BACKEND_PORT="8016"
    SPRING_DATASOURCE_URL="${SPRING_DATASOURCE_URL:-jdbc:postgresql://192.168.99.14:3000/aluonbbddprod}"
    APP_CORS_ALLOWED_ORIGINS="${APP_CORS_ALLOWED_ORIGINS:-http://192.168.99.14:8015,https://aluon.iconseriespeliculas.xyz}"
    REMOTE_DIR="${ALUON_DIR:-/opt/aluon-web-prod}"
    ;;
  dev2|*)
    echo "Configuring for DEV2..."
    FRONTEND_PORT="8010"
    BACKEND_PORT="8011"
    SPRING_DATASOURCE_URL="${SPRING_DATASOURCE_URL:-jdbc:postgresql://192.168.99.14:3000/aluonbbdd}"
    APP_CORS_ALLOWED_ORIGINS="${APP_CORS_ALLOWED_ORIGINS:-http://192.168.99.14:8010,https://aluon.iconseriespeliculas.xyz}"
    REMOTE_DIR="${ALUON_DIR:-/opt/aluon-web}"
    ;;
esac

export FRONTEND_PORT BACKEND_PORT
export SPRING_DATASOURCE_URL APP_DB_SCHEMA SPRING_FLYWAY_TABLE APP_CORS_ALLOWED_ORIGINS
export SPRING_DATASOURCE_USERNAME SPRING_DATASOURCE_PASSWORD APP_JWT_SECRET

echo "Deploy -> ${USER}@${HOST}:${REMOTE_DIR}"

# Upload source (no node_modules/dist/target/.git)
export COPYFILE_DISABLE=1
tar --exclude='./node_modules' --exclude='./dist' --exclude='./backend/target' --exclude='./.git' \
  --exclude='._*' --exclude='**/._*' \
  -czf - \
  backend frontend index.html package.json package-lock.json postcss.config.js tailwind.config.ts \
  tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts Dockerfile.frontend \
  docker-compose.yml docker-compose.portainer.yml .dockerignore scripts \
  | ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "${USER}@${HOST}" \
    "rm -rf '${REMOTE_DIR}' && mkdir -p '${REMOTE_DIR}' && tar -xzf - -C '${REMOTE_DIR}'"

# Start/Update stack on remote
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "${USER}@${HOST}" bash -lc "'
  set -euo pipefail
  cd \"${REMOTE_DIR}\"
  export FRONTEND_PORT=\"${FRONTEND_PORT}\"
  export BACKEND_PORT=\"${BACKEND_PORT}\"
  export SPRING_DATASOURCE_URL=\"${SPRING_DATASOURCE_URL}\"
  export SPRING_DATASOURCE_USERNAME=\"${SPRING_DATASOURCE_USERNAME}\"
  export SPRING_DATASOURCE_PASSWORD=\"${SPRING_DATASOURCE_PASSWORD}\"
  export APP_DB_SCHEMA=\"${APP_DB_SCHEMA}\"
  export SPRING_FLYWAY_TABLE=\"${SPRING_FLYWAY_TABLE}\"
  export APP_JWT_SECRET=\"${APP_JWT_SECRET}\"
  export APP_CORS_ALLOWED_ORIGINS=\"${APP_CORS_ALLOWED_ORIGINS}\"

  docker compose up -d --build
  docker compose ps
'"

echo "OK:"
echo "  Front:  http://${HOST}:${FRONTEND_PORT}"
echo "  Back:   http://${HOST}:${BACKEND_PORT}"
