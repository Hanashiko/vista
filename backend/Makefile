.PHONY: help deploy up down restart logs clean rebuild reset backup restore db-shell flask-shell

help:
	@echo "Available commands:"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy      - Interactive deployment wizard"
	@echo "  make up          - Start containers"
	@echo "  make down        - Stop containers"
	@echo "  make restart     - Restart containers"
	@echo "  make rebuild     - Rebuild without losing data"
	@echo ""
	@echo "Database:"
	@echo "  make backup      - Create database backup"
	@echo "  make restore     - Restore from backup (FILE=path)"
	@echo "  make db-shell    - Open MySQL shell"
	@echo ""
	@echo "Maintence:"
	@echo "  make logs        - Show Flask logs"
	@echo "  make logs-all    - Show all logs"
	@echo "  make clean       - Stop containers (keeps volumes)"
	@echo "  make reset       - Complete reste (DELETES ALL DATA)"
	@echo "  make flask-shell - Open Flask container shell"
	@echo "  make volumes     - Show volume information"

deploy:
	@chmod +x deploy.sh
	@./deploy.sh

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f flask_app

logs-all:
	docker compose logs -f

rebuild:
	@echo "Rebuilding application (data will be preserved)..."
	docker compose down
	docker compose build --no-cache
	docker compose up -d
	@echo "Rebuild complete! Data preserved."

clean:
	@echo "Stopping containers (volumes will be preserved)..."
	docker compose down
	@echo "Containers stopped. Data is safe is volumes."

reset:
	@echo "WARNING: This will DELETE ALL DATA including:"
	@echo " - Database content"
	@echo " - Migrations"
	@echo " - Uploaded files"
	@read -p "Are you sure? Type 'yes' to confirm: " confirm; \
		if [ "$$confirm" = "yes" ]; then
			docker compose down -v;
			echo "All data deleted. Run 'make deploy' or 'make up' to start fresh."; \
		else \
			echo "Reset cancelled.";\
		fi

backup:
	@chmod +x backup.sh
	@./backup.sh

restore:
	@if [ -z "$(FILE)" ]; then \
		echo "Usage: make restore FILE=backups/backup_20251128_120000.sql"; \
		echo ""; \
		echo "Available backups:"; \
		ls -lht backups/*.sql* 2>/dev/null | head -10 || echo "No backups found"; \
		exit 1; \
	fi; \
	if [ -f .env ]; then \
		source .env; \
		FILE_TO_RESTORE="$(FILE)";\
		if [[ $FILE_TO_RESTORE == *.gz ]]; then \
			echo "Decompressing backup..."; \
			gunzip -k "$$FILE_TO_RESTORE"; \
			FILE_TO_RESTORE="$${FILE_TO_RESTORE%.gz}"; \
		fi; \
		echo "Restoring from: $$FILE_TO_RESTORE"; \
		docker exec -i vista-mariadb mariadb -u$$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE < "$$FILE_TO_RESTORE"; \
		if [[ $(FILE) == *.gz ]]; then \
			rm -f "$$FILE_TO_RESTORE"; \
		fi; \
		echo "Database restored from $(FILE)";
	else \
		echo "Error: .env file not found"; \
		exit 1;
	fi

db-shell:
	@if [ -f .env ]; then \
		source .env
		docker exec -it vista-mariadb mariadb -u$$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE; \
	fi

flask-shell:
	docker exec -it vista-flask bash

volumes:
	@echo "Docker volumes:"
	@docker volume ls | grep -E "vista|backend" || echo "No volumes found"
	@echo ""
	@echo "Volume usage:"
	@docker system df -v | grep -A 20 "Local Volumes"

clean-cache:
	docker builder prune -f

status:
	@echo "Container status:"
	@docker compose ps
	@echo ""
	@echo "Services:"
	@echo "  Flask API:   http://127.0.0.1:5000"
	@echo "  phpMyAdmin   http://127.0.0.1:888"
