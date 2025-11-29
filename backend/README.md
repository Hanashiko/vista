# Vista Backend

Flask-based backend with MariaDB database.

## Quick Start

### First Time Deployment

#### With makefile:

```bash
make deploy
```

#### With deploy script:

```bash
chmod +x deploy.sh
./deploy.sh
```
> This script will generate secure secrets, create `.env` configuration, build and start containers, initialize database, show status and lgos

#### From Docker:

```bash
docker compose up -d mariadb
docker compose up -d flask_app --build
```

#### Withot Docker:

Install Python Dependencies:
```bash
pip install -r requirements.txt
```

Copy .env.example to .env, and fill in all available fields:
```bash
cp .env.example .env
```

Upload the database and start the server:
```bash
chmod +x entrypoint.sh
sh entrypoint.sh
```

##### Further launches:

Server startup
```bash
python run.py
```

### Deploy with Existing Backup

Using Deployment wizard
```bash
make deploy
```
> Then select option 2 and choose your backup

Manually
```bash
make up
make restore FILE=backups/backup_20251128_120000.sql.gz
```

---

## Common Operations

### Start/Stop
```bash
make up      # start all services
make down    # stop all services
make restart # restart services
make logs    # view flask logs
```

### Database Backups

Create backup
```bash
make backup
```

List backups
```bash
ls -lht backups/
```

Restore from backup
```bash
make restore FILE=backups/backup_20251128_120000.sql.gz
```

### Rebuild Application

Rebuild containers without losing data
```bash
make rebuild
```

Complete reset (deletes all data)
```bash
make reset
```

### Database Access

MySQL shell:
```bash
make db-shell
```

phpMyAdmin
Open: http://127.0.0.1:888
Or make proxy for this.

---

## Deployment Scenarios

### 1. Fresh Installation

```bash
./deploy.sh
```
> Select option 1: New deployment

### 2. Migration from Another Server

On old server
```bash
make backup
scp backups/backup_*.sql.gz user@new-server:/path/
```

On new server:
```bash
./deploy.sh
```
> Select option 2: Deploy with backup

### 3. Development to Production

Development
```bash
make backup
```

Production
```bash
git pull
./deploy.sh
```
> Select option 2 and restpre dev backup

### 4. Disaster Recovery

Stop everything
```bash
make down
```

Deploy fresh
```bash
./deploy.sh
```
> Select option 2 and use latest backup

---

## Automatic Backups

Add to crontab for daily backups:
```bash
crontab -e
```

Add this line (adjuct path)
```bash
0 3 * * * cd /path/to/backend && /path/to/backend/backup.sh >> /var/log/vista-backup.log 2>&1
```

---

## Troubleshooting

### Container won't start

```bash
make logs-all
docker compose down
make up
```

### Database issues

Check database status
```bash
make db-shell
```

Reset migrations
```bash
docker exec vista-flask rm -rf /app/migrations
make restart
```

### Lost data

Restore from latest backup
```bash
make restore FILE=backups/$(ls -t backups/ | head -1)
```

---

## Environment Variadbles

See `.env.example` for all available options:

- `MYSQL_ROOT_PASSWORD` - MariaDB roto password
- `MYSQL_DATABASE` - Database name
- `MYSQL_USER` - Database user
- `MYSQL_PASSWORD` - Database password
- `DATABASE_URI` - URI for connect to database
- `JWT_SECRET_KEY` - JWT signing key
- `SECRET_KEY` - Flask secret key
- `ADMIN_SECRET_KEY` - Key for admin actions
- `DEBUG` - Debug mode

---

## Test cli commands:

### auth commands 

#### /v1/register - register a user:

```bash
curl -X POST http://<ip_address>/v1/register \
-H "Content-Type: application/json" \
-d '{ 
    "email":"<string>@gmail.com", 
    "password":"<string>", 
    "name":"<string>" 
}'
```

#### /v1/login - log in the user:

```bash
curl -X POST http://<ip_address>/v1/login \
-H "Content-Type: application/json" \
-d '{
    "email":"<string>@gmail.com",
    "password":"<string>"
}'
```

#### /v1/logout - logout user:

```bash
curl -X POST http://<ip_address>/v1/logout \
-H "Authorization: Bearer <token>"
```

#### /v1/refresh - refresh access token:

```bash
curl -X POST http://<ip_address>/v1/refresh \ 
-H "Authorization: Bearer <refresh_token>"
```

### profile routes

#### /v1/profile - get information about the user:

```bash
curl -X GET http://<ip_address>/v1/profile \
-H "Authorization: Bearer <token>"
```

#### /v1/profile - change user data:

```bash
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "email": "<string>@gmail.com"<F5>
}'
```

```bash
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "name": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "password": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "email": "<string>@gmail.com",
    "password": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "email": "<string>@gmail.com",
    "name": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "name": "<string>",
    "password": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "email": "<string>@gmail.com",
    "name": "<string>",
    "password": "<string>"
}'
```

#### /v1/profile/avatar - update the user's avatar:

```bash
curl -X POST http://<ip_address>/v1/profile/avatar \
-H "Authorization: Bearer <token>" \
-F "avatar=@./<path_to_image>"
```

### quests routes 

#### /v1/quests - create a quest:

```bash
curl -X POST http://<ip_address>/v1/quests \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "title":"<string>",
    "description":"<string>",
    "time_limit": <int>
}'
```

#### /v2/quests - create a quest with questions right away:

```bash
curl -X POST http://<ip_address>/v2/quests \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>
}'
```

```bash
curl -X POST http://<ip_address>/v2/quests \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>,
    "tasks": [
        {
            "text": "<string>",
            "question_type": "open_ended",
            "points": <int>,
            "correct_answer": "<string>"
        }
    ]
}'
```

```bash
curl -X POST http://<ip_address>/v2/quests \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>,
    "tasks": [
        {
            "text": "<string>",
            "question_type": "multiple_choice",
            "points": <int>,
            "options": [
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>}
            ]
        },
        {
            "text": "<string>",
            "question_type": "map_interactive",
            "points": <int>,
            "map_interactive": [
                {"description": "<string>", "latitude": <int>,"longitude": <int>}
            ]
        }
    ]
}'
```

```bash
curl -X POST http://<ip_address>/v2/quests \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>,
    "tasks": [
        {
            "text": "<string>",
            "question_type": "multiple_choice",
            "points": <int>,
            "options": [
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>}
            ]
        },
        {
            "text": "<string>",
            "question_type": "open_ended",
            "points": <int>,
            "correct_answer": "<string>"
        },
        {
            "text": "<string>",
            "question_type": "multiple_choice",
            "points": <int>,
            "options": [
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>}
            ]
        },
        {
            "text": "<string>",
            "question_type": "map_interactive",
            "points": <int>,
            "map_interactive": [
                {"description": "<string>", "latitude": <int>,"longitude": <int>}
            ]
        }
    ]
}'
```

#### /v1/quests/\<quest_id\> - get information about the quest:

```bash
curl -X GET http://<ip_address>/v1/quests/<quest_id> \
-H "Authorization: Bearer <token>"
```

#### /v1/quests/\<quest_id\> - edit information about the quest:

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "time_limit": <int>
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "description": "<string>",
    "time_limit": <int>
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "description": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "time_limit": <int>
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>
}'
```

#### /v2/quests/\<quest_id\> - edit information about the quest with tasks:

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "description": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "time_limit": <int>
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "time_limit": <int>
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "description": "<string>",
    "time_limit": <int>
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id>/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>,
    "tasks": [
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "open_ended",
            "correct_answer": "<string>",
            "points": <int>
        }
    ]
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id>/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>,
    "tasks": [
         {
            "id": <int>,
            "text": "<string>",
            "question_type": "multiple_choice",
            "points": <int>,
            "options": [
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>}
            ]
        }
   ]
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id>/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>,
    "tasks": [
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "multiple_choice",
            "points": <int>,
            "options": [
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>}
            ]
        },
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "map_interactive",
            "points": <int>,
            "map_interactive": [
                {"description": "<string>", "latitude": <int>,"longitude": <int>}
            ]
        }
    ]
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id>/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>,
    "tasks": [
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "map_interactive",
            "points": <int>,
            "map_interactive": [
                {"description": "<string>", "latitude": <int>,"longitude": <int>}
            ]
        }
    ]
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id>/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>,
    "tasks": [
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "open_ended",
            "correct_answer": "<string>",
            "points": <int>
        },
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "multiple_choice",
            "points": <int>,
            "options": [
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>}
            ]
        }
    ]
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id>/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>,
    "tasks": [
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "open_ended",
            "correct_answer": "<string>",
            "points": <int>
        },
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "map_interactive",
            "points": <int>,
            "map_interactive": [
                {"description": "<string>", "latitude": <int>,"longitude": <int>}
            ]
        }
    ]
}'
```

```bash
curl -X PUT http://<ip_address>/v2/quests/<quest_id>/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>,
    "tasks": [
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "open_ended",
            "correct_answer": "<string>",
            "points": <int>
        },
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "multiple_choice",
            "points": <int>,
            "options": [
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>}
            ]
        },
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "multiple_choice",
            "points": <int>,
            "options": [
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>},
                {"text": "<string>", "is_correct": <bool>}
            ]
        },
        {
            "id": <int>,
            "text": "<string>",
            "question_type": "map_interactive",
            "points": <int>,
            "map_interactive": [
                {"description": "<string>", "latitude": <int>,"longitude": <int>}
            ]
        }
    ]
}'
```

#### /v1/quests/\<quest_id\> - delete quest:

```bash
curl -X DELETE http://<ip_address>/v1/quests/<quest_id> \
-H "Authorization: Bearer <token>"
```

#### /v1/quests/user - get all quests of user:

```bash
curl -X GET http://<ip_address>/v1/quests/user \
-H "Authorization: Bearer <token>"
```

```bash
curl -X GET http://<ip_address>/v1/quests/user\?limit\=<int> \
-H "Authorization: Bearer <token>"
```

#### /v1/quests/user/\<user_id\> - get all quests of user by id:

```bash
curl -X GET http://<ip_address>/v1/quests/user/<user_id> \
-H "Authorization: Bearer <token>"
```

```bash
curl -X GET http://<ip_address>/v1/quests/user/<user_id>\?limit\=<int> \
-H "Authorization: Bearer <token>"
```

#### /v1/quests/recent - get last added quests:

```bash
curl -X GET "http://<ip_address>/v1/quests/recent"
```

```bash
curl -X GET "http://<ip_address>/v1/quests/recent\?limit\=<int>"
```

#### /v1/quests/all - get all quests:

```bash
curl -X GET http://<ip_address>/v1/quests/all \
-H "Authorization: Bearer <token>"
```

```bash
curl -X GET http://<ip_address>/v1/quests/all\?limit\=<int> \
-H "Authorization: Bearer <token>"
```

#### /v1/quests/\<quest_id\>/image - set image for quest:

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/image \
-H "Authorization: Bearer <token>" \
-F "image=@./<path_to_image>"
```

### quest_progress routes

#### /v1/quests/\<quest_id\>/start - start the process of completing the quest:

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/start \
-H "Authorization: Bearer <token>" 
```

#### /v1/quests/\<quest_id\>/tasks/\<task_id\>/answer - save your answer:

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id>/answer \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" 
-d '{
    "answer": ["<string>","<string>"]
}'
```

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id>/answer \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" 
-d '{
    "answer": ["<string>"]
}'
```

#### /v1/quests/\<quest_id\>/complete - complete the process of completing the quest:

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/complete \
-H "Authorization: Bearer <token>" 
```

### rating routes

#### /v1/quests/\<quest_id\>/rate - leave a review about the quest:

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/rate \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "stars": <int>,
    "comment": "<string>"
}'
```

#### /v1/quests/\<quest_id\>/ratings - get ratings of quest:

```bash
curl -X GET http://<ip_address>/v1/quests/<quest_id>/ratings \
-H "Authorization: Bearer <token>"
```

```bash
curl -X GET http://<ip_address>/v1/quests/<quest_id>/ratings\?limit\=<int> \
-H "Authorization: Bearer <token>"
```

#### /v1/ratings/user/\<user_id\> - get ratings that write user:

```bash
curl -X GET http://<ip_address>/v1/ratings/user/<user_id> \
-H "Authorization: Bearer <token>"
```

```bash
curl -X GET http://<ip_address>/v1/ratings/user/<user_id>\?limit\=<int> \
-H "Authorization: Bearer <token>"
```

### stats routes

#### /v1/top_reviewers - get top reviewers from all database:

```bash
curl -X GET http://<ip_address>/v1/top_reviewers
```

```bash
curl -X GET http://<ip_address>/v1/top_reviewers\?limit\=<int>
```

### task routes

#### /v1/quests/\<quest_id\>/tasks - add task:

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text": "<string>", 
    "question_type": "multiple_choice", 
    "points": <int>,
    "options": [
        {"text": "<string>", "is_correct": <bool>}, 
        {"text": "<string>", "is_correct": <bool>}, 
        {"text": "<string>", "is_correct": <bool>}
    ]
}'
```

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text": "<string>", 
    "question_type": "multiple_choice", 
    "points": <int>, 
    "options": [
        {"text": "<string>", "is_correct": <bool>}, 
        {"text": "<string>", "is_correct": <bool>}, 
        {"text": "<string>", "is_correct": <bool>}, 
        {"text": "<string>", "is_correct": <bool>}, 
        {"text": "<string>", "is_correct": <bool>}
    ]
}'
```

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text":"<string>",
    "question_type":"open_ended",
    "points": <int>,
    "correct_answer": "<string>"
}'
```

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text":"<string>",
    "question_type":"map_interactive",
    "points": <int>,
    "map_interactive":[
        {"description":"<string>","latitude": <int>,"longitude": <int>}
    ]
}'
```

#### /v1/quests/\<quest_id\>/tasks/\<task_id\> - delete task:

```bash
curl -X DELETE http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id> \
-H "Authorization: Bearer <token>"
```

#### /v1/quests/\<quest_id\>/tasks/\<task_id\>/image - set image for task:

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id>/image \
-H "Authorization: Bearer <token>" \
-F "image=@./<path_to_image>"
```

#### /v1/quests/\<quest_id\>/tasks/\<task_id\>/video - set video for task:

```bash
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id>/video \
-H "Authorization: Bearer <token>" \
-F "video=@./<path_to_image>"
```

#### /v1/quests/\<quest_id\>/tasks/\<task_id\> - edit information about the task:

```bash
curl -X PUT http://<ip_address>/v1?quests/<quest_id>/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text":"<string>",
    "question_type": "multiple_choice",
    "points": <int>,
    "options": [
        {"text":"<string>", "is_correct":"<bool>"},
        {"text":"<string>", "is_correct":"<bool>"},
        {"text":"<string>", "is_correct":"<bool>"}
    ]
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text": "<string>", 
    "question_type": "multiple_choice", 
    "points": <int>, 
    "options": [
        {"text": "<string>", "is_correct": <bool>}, 
        {"text": "<string>", "is_correct": <bool>}, 
        {"text": "<string>", "is_correct": <bool>}, 
        {"text": "<string>", "is_correct": <bool>}, 
        {"text": "<string>", "is_correct": <bool>}
    ]
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text":"<string>",
    "question_type":"open_ended",
    "points": <int>,
    "correct_answer": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text":"<string>",
    "question_type":"map_interactive",
    "points": <int>,
    "map_interactive":[
        {"description":"<string>","latitude": <int>,"longitude": <int>}
    ]
}'
```

```bash
curl -X PUT http://<ip_address>/v1?quests/<quest_id>/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text":"<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "points": <int>
}'
```

```bash
curl -X PUT http://<ip_address>/v1?quests/<quest_id>/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "question_type": "multiple_choice",
    "options": [
        {"text":"<string>", "is_correct":"<bool>"},
        {"text":"<string>", "is_correct":"<bool>"},
        {"text":"<string>", "is_correct":"<bool>"}
    ]
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "question_type":"open_ended",
    "correct_answer": "<string>"
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "question_type":"map_interactive",
    "map_interactive":[
        {"description":"<string>","latitude": <int>,"longitude": <int>}
    ]
}'
```

```bash
curl -X PUT http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text": "<string>", 
    "points": <int>
}'
```

### user routes

#### /v1/user/\<user_id\> - get information about user by id:

```bash
curl -X GET http://<ip_address>/v1/user/<user_id> \
-H "Authorization: Bearer <token>"
```

#### /v1/users - get all users:

```bash
curl -X GET http://<ip_address>/v1/users \ 
-H "Authorization: Bearer <token>"
```

```bash
curl -X GET http://<ip_address>/v1/users\?limit\=<int> \ 
-H "Authorization: Bearer <token>"
```

### backups routes

#### /v1/backup/images - generate backups for uploads directory:

```bash
curl -X GET http://<ip_address>/v1/backup/images \
-H "X-Secret-Key: <key>" \ 
-o backup_images.zip
```

```bash
curl -X GET http://<ip_address>/v1/backup/images\?secret_key\=<key> \
-o backup_images.zip
```

#### /v1/backup/images/restore - restore uploads directory from backup:

```bash
curl -X POST http://<ip_address>/v1/backup/images/restore \
-H "X-Secret-Key: <key>" \ 
-F "backup_file=@./backup_images.zip"
```

```bash
curl -X POST http://<ip_address>/v1/backup/images/restore\?secret_key\=<key> \
-F "backup_file=@./backup_images.zip"
```
