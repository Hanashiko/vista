.PHONY: help deploy up down restart logs clean rebuild reset

help:
	@echo "Available commands:"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy      - Deploy application"
	@echo "  make up          - Start containers"
	@echo "  make down        - Stop containers"
	@echo "  make restart     - Restart containers"
	@echo "  make rebuild     - Rebuild without losing data"
	@echo ""
	@echo "Development:"
	@echo "  make dev         - Start development server"
	@echo "  make build       - Build production bundle"
	@echo "  make test        - Run tests"
	@echo "  make lint        - Run linter"
	@echo ""
	@echo "Maintenance:"
	@echo "  make logs        - Show container logs"
	@echo "  make clean       - Stop containers"
	@echo "  make reset       - Complete reset"
	@echo "  make shell       - Open container shell"

deploy:
	docker compose up -d --build

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f react-app

rebuild:
	@echo "Rebuilding application..."
	docker compose down
	docker compose build --no-cache
	docker compose up -d
	@echo "Rebuild complete!"

clean:
	@echo "Stopping containers..."
	docker compose down
	@echo "Containers stopped."

reset:
	@echo "WARNING: This will DELETE ALL containers and images"
	@read -p "Are you sure? Type 'yes' to confirm: " confirm; \
		if [ "$$confirm" = "yes" ]; then \
			docker compose down; \
			docker rmi my-react-app 2>/dev/null || true; \
			echo "Reset complete. Run 'make deploy' to start fresh."; \
		else \
			echo "Reset cancelled."; \
		fi

shell:
	docker exec -it my-react-app sh

dev:
	npm start

build:
	npm run build

test:
	npm test

lint:
	@if grep -q "lint" package.json; then \
		npm run lint; \
	else \
		echo "No lint script found in package.json"; \
	fi

install:
	npm install

status:
	@echo "Container status:"
	@docker compose ps
	@echo ""
	@echo "Services:"
	@echo "  Frontend:  http://127.0.0.1:3003"
