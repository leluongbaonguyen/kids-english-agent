#!/usr/bin/env bash
# ========================================================
# Production Zero-Downtime Deploy Script for Kids English Agent
# Target Path: /opt/webapp/scripts/deploy.sh
# ========================================================
set -euo pipefail

APP_DIR="/opt/webapp"
LOG_PREFIX="[DEPLOY $(date +'%Y-%m-%d %H:%M:%S')]"

echo "${LOG_PREFIX} Starting automated deployment process..."

if [ ! -d "$APP_DIR" ]; then
    echo "❌ Error: App directory $APP_DIR does not exist."
    exit 1
fi

cd "$APP_DIR"

echo "${LOG_PREFIX} Fetching latest updates from Git..."
git fetch --all --tags
git pull --ff-only

echo "${LOG_PREFIX} Installing backend dependencies..."
cd server
npm ci --production=false

echo "${LOG_PREFIX} Restarting PM2 process (web-api)..."
pm2 restart web-api --update-env || pm2 start ecosystem.config.cjs

echo "${LOG_PREFIX} Verifying backend local health check endpoint..."
sleep 3
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/health || true)

if [ "$HEALTH_STATUS" -eq 200 ]; then
    echo "${LOG_PREFIX} ✅ Deployment SUCCESSFUL! Health check returned HTTP 200."
    pm2 status web-api
else
    echo "${LOG_PREFIX} ❌ CRITICAL: Health check failed with HTTP status: $HEALTH_STATUS"
    pm2 logs web-api --lines 50
    exit 1
fi
