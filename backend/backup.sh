#!/bin/bash

BACKUP_DIR="./backups"
RETENTION_DAYS=7

mkdir -p "$BACKUP_DIR"

BACKUP_FILE="$BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql"
echo "Creating backup: $BACKUP_FILE"

docker exec vista-mariadb mariadb-dump -u"${MYSQL_USER:-py}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATAVASE:-quests}" > "$BACKUP_FILE"

gzip "BACKUP_FILE"
echo "Backup created and compresssed: ${BACKUP_FILE}.gz"

echo "Cleaning up old backups (older than $RETENTION_DAYS days)..."
find "BACKUP_DIR" -name "backup_*.sql.gz" -mtime *$RETENTION_DAYS -delete

echo "Backup complete!"
