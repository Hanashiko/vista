#!/bin/sh

echo "=== Starting Flask Application Setup ==="

wait_for_database() {
	echo "Waiting for MariaDB to be ready..."

	max_attempts=60
	attempt=0

	while [ $attempt -lt $max_attempts ]; do
		attempt=$((attempt + 1))
		if python3 << 'PYEOF'
import pymysql
import sys
import os

try:
    conn = pymysql.connect(
        host='mariadb',
        port=3306,
        user=os.environ['MYSQL_USER'],
        password=os.environ['MYSQL_PASSWORD'],
        database=os.environ['MYSQL_DATABASE'],
        connect_timeout=3
    )
    conn.close()
    print('Database connection successful!')
    sys.exit(0)
except Exception as e:
    print(f'Database not ready: {e}')
    sys.exit(1)
PYEOF
		then
			echo "Successfully connected to database!"
			return 0
		fi

		echo "[$attempt/$max_attempts]  Database not ready yet, waiting 2 seconds..."

		sleep 2
	done

	echo "ERROR: Database did not become ready in time"
	return 1
}

if ! wait_for_database; then
	echo "Exiting due to database connection failure"
	exit 1
fi

echo ""
echo "=== Running Database Migrations ==="

if [ ! -d "/app/migrations" ]; then
	echo "Initializing Flask-Migrate..."
	flask db init
else
	echo "Flask-Migrate already initialized"
fi

export DATABASE_URI

echo "Creating migration..."
flask db migrate -m "Auto migration $(date +%Y%m%d_%H%M%S)" || echo "No changes detected or migrtion already exists"

echo "Applying migrations..."
flask db upgrade || {
	echo "ERROR: flask db upgrade failed!"
	exit 1
}

echo ""
echo "=== Starting Flask Application ==="
exec python3 run.py
