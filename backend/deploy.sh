#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' 

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo ""
    echo -e "${GREEN}================================${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${GREEN}================================${NC}"
    echo ""
}

check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker не встановлено!"
        exit 1
    fi

    if ! docker ps &> /dev/null; then
        print_error "Docker не запущено або немає прав. Спробуйте: sudo usermod -aG docker $USER"
        exit 1
    fi
}

genererate_secrets() {
    print_info "Генерацыя секретних ключів..."

    JWT_SECRET=$(python3 -c "import uuid; print(uuid.uuid4())")
    SECRET_KEY=$(python3 -c "import uuid; print(uuid.uuid4())")
    ADMIN_SECRET_KEY=$(python3 -c "import uuid; print(uuid.uuid4())")

    DB_ROOT_PASS=$(python3 -c "import secrets; import string; print(''.join(secrets.choice(string.ascii_letters + string.digits) for i in range(18)))")
    DB_USER_PASS=$(python3 -c "import secrets; import string; print(''.join(secrets.choice(string.ascii_letters + string.digits) for i in range(18)))")

    print_success "Секретні ключі згенеровано"
}

create_env_file() {
    print_info "Створення .env файлу..."

    if [ -f .env ]; then
        print_warning ".env файл вже існує"
        read -p "Перезаписати? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Використовуємо існуючий .env"
            return
        fi
    fi

    cat > .env << EOF
# Database Configuration
MYSQL_ROOT_PASSWORD=${DB_ROOT_PASS}
MYSQL_DATABASE=quests
MYSQL_USER=py
MYSQL_PASSWORD=${DB_USER_PASS}
DATABASE_URI=mysql+pymysql://py:${DB_USER_PASS}@mariadb:3306/quests

# Flask Configuration
JWT_SECRET_KEY=${JWT_SECRET}
SECRET_KEY=${SECRET_KEY}
ADMIN_SECRET_KEY=${ADMIN_SECRET_KEY}
Debug=False
EOF
    print_success ".env файл створено"
}

create_directories() {
    print_info "Створення необхідних директорій..."
    mkdir -p backups
    mkdir -p logs
    print_success "Директорії створено"
}

start_containers() {
    print_info "Запуск Docker контейнерів..."
    docker compose down 2>/dev/null || true
    docker compose up -d --build

    print_info "Очікування готовності БД..."
    sleep 20

    if docker ps | grep -q vista-mariadb && docker ps | grep -q vista-flask; then
        print_success "Контейнери успішно запущено"
    else
        print_error "Помилка запуску контейнерів"
        docker compose logs
        exit 1
    fi
}

restore_from_backup() {
    local backup_file=$1

    if [ ! -f "$backup_file" ]; then
        print_error "Файл бекапу не знайдено: $backup_file"
        exit 1
    fi 
    
    print_info "Відновлення БД з бекапу: $backup_file"

    if [[ $backup_file == *.gz ]]; then
        print_info "Рохпаковування бекапу..."
        gunzip -k "$backup_file"
        backup_file="${backup_file%.gz}"
    fi

    if [ -f .env ]; then
        source .env
    fi

    print_info "Очікування готовності бази даних..."
    for i in {1..30}; do
        if docker exec vista-mariadb mariadb-admin ping -h localhost -u"${MYSQL_USER:-py}" -p"${MYSQL_PASSWORD}" &> /dev/null; then
            print_success "База даниз готова"
            break
        fi
        if [ $i -eq 30 ]; then
            print_error "База даних не відповідає"
            exit 1
        fi
        sleep 2
    done

    print_info "Імпорт даних..."
    docker exec -i vista-mariadb mariadb -u"${MYSQL_USER:-py}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE:-quests}" < "$backup_file"  
    print_success "Бекап відновлено"

    if [[ $1 == *.gz ]]; then
        rm -f "$backup_file"
    fi
}

check_status() {
    print_info "Перевірка стану системи..."
    echo ""
    
    docker compose ps
    
    echo ""
    print_info "Сервіси доступні за адресами:"
    echo "  Flask API:    http://127.0.0.1:5000"
    echo "  phpMyAdmin:   http://127.0.0.1:888"
    echo ""
}

show_logs() {
    print_info "Останні логи Flask додатку:"
    docker compose logs --tail=50 flask_app
}

show_menu() {
    print_header "Vista Backend Deployment Script"
    
    echo "Оберіть режим розгортання:"
    echo ""
    echo "  1) Нове розгортання (без даних)"
    echo "  2) Розгортання з відновленням з бекапу"
    echo "  3) Тільки перезапуск контейнерів"
    echo "  4) Створити бекап поточної БД"
    echo "  5) Показати статус"
    echo "  6) Вийти"
    echo ""
}

list_backups() {
    print_info "Доступні бекапи:"
    echo ""
    
    if [ -d backups ] && [ "$(ls -A backups)" ]; then
        ls -lh backups/*.sql* 2>/dev/null | awk '{print "  " NR ". " $9 " (" $5 ")"}'
        echo ""
        return 0
    else
        print_warning "Бекапи не знайдено в папці backups/"
        return 1
    fi
}

create_backup() {
    print_info "Створення бекапу..."
    
    if [ -f .env ]; then
        source .env
    fi
    
    mkdir -p backups
    BACKUP_FILE="backups/backup_$(date +%Y%m%d_%H%M%S).sql"
    
    docker exec vista-mariadb mariadb-dump -u"${MYSQL_USER:-py}" -p"${MYSQL_PASSWORD}" "${MYSQL_DATABASE:-quests}" > "$BACKUP_FILE"
    
    gzip "$BACKUP_FILE"
    print_success "Бекап створено: ${BACKUP_FILE}.gz"
}

main() {
    clear
    check_docker

    while true; do
        show_menu
        read -p "Ваш вибір [1-6]:" choice

        case $choice in
            1)
                print_header "Нове розгортання"
                genererate_secrets
                create_env_file
                create_directories
                start_containers
                sleep 20
                check_status
                show_logs
                print_success "Розгортання завершено!"
                break
                ;;
            2)
                print_header "Розгортання з бекапу"

                if ! list_backups; then
                    read -p "Введіть повний шлях до файлу бекапу: " backup_path
                else
                    read -p "Введіть номер бекапу або повних шлях: " backup_choice

                    if [[ $backup_choice =~ ^[0-9]+$ ]]; then
                        backup_path=$(ls backups/*.sql* 2>/dev/null | sed -n "${backup_choice}p")
                        if [ -z "$backup_path" ]; then 
                            print_error "Невірний номер бекапу"
                            continue
                        fi
                    else
                        backup_path=$backup_choice
                    fi
                fi

                genererate_secrets
                create_env_file
                create_directories
                start_containers
                restore_from_backup "$backup_path"
                check_status
                print_success "Розгортання з бекапу завершено!"
                break
                ;;
            3)
                print_header "Перрезапуск контейнерів"
                start_containers
                check_status
                print_success "Контейнери перезапущено!"
                break
                ;;
            4)
                print_header "Створення бекапу"
                create_backup
                break
                ;;
            5)
                print_header "Статус системи"
                check_status
                show_logs
                break
                ;;
            6)
                print_info "Вихід"
                exit 0
                ;;
            *)
                print_error "Невірний вибір. Спробуйте ще раз."
                sleep 2
                clear
                ;;
        esac
    done

    echo ""
    print_info "Для перегляду логів: docker compose logs -f flask_app"
    print_info "Для зупинки: docker compose down"
    print_info "Для створення бекапу: make backup або ./backup.sh"

}

main
