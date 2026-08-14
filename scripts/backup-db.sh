#!/usr/bin/env bash
# ========================================================
# Automated PostgreSQL Backup Script with Retention & Error Handling
# Target Path: /opt/webapp/scripts/backup-db.sh
# Cron Schedule: 30 2 * * * (Every day at 02:30 AM)
# ========================================================
set -euo pipefail

BACKUP_DIR="/opt/backups/postgres"
STAMP="$(date +%Y%m%d_%H%M%S)"
TARGET_FILE="${BACKUP_DIR}/app_db_${STAMP}.dump"
LOG_FILE="/var/log/app-backup.log"

mkdir -p "$BACKUP_DIR"

echo "[$(date +'%Y-%m-%d %H:%M:%S')] Starting PostgreSQL dump for app_db..." | tee -a "$LOG_FILE"

# Execute pg_dump using local connection
if pg_dump -h 127.0.0.1 -U app_user -Fc app_db > "$TARGET_FILE"; then
    FILE_SIZE=$(du -h "$TARGET_FILE" | cut -f1)
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ✅ Backup successful: $TARGET_FILE (Size: $FILE_SIZE)" | tee -a "$LOG_FILE"
else
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ❌ Backup FAILED!" | tee -a "$LOG_FILE"
    exit 1
fi

# Retention policy: remove backups older than 14 days
echo "[$(date +'%Y-%m-%d %H:%M:%S')] Cleaning up backups older than 14 days..." | tee -a "$LOG_FILE"
find "$BACKUP_DIR" -type f -name "*.dump" -mtime +14 -exec rm -vf {} \; | tee -a "$LOG_FILE"

echo "[$(date +'%Y-%m-%d %H:%M:%S')] Backup job complete." | tee -a "$LOG_FILE"
