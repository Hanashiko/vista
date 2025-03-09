# Start the server from the docker

### container docker launching:
```sudo docker-compose up -d mariadb```

```sudo docker-compose up -d flask_app --build```


# Run the server without a docker

## first launch:

### install python dependencies: 
```pip install -r requirements.txt```

### copy .env.example to .env, and fill in all available fields:
```cp .env.example .env```

### upload the database and start the server:
```chmod +x entrypoint.sh```
```sh enrypoint.sh```

## further launches:

### server startup:
```python run.py```


# Test cli commands:

## auth commands 

### /v1/register - register a user:
```
curl -X POST http://<ip_address>/v1/register \
-H "Content-Type: application/json" \
-d '{ 
    "email":"<string>@gmail.com", 
    "password":"<string>", 
    "name":"<string>" 
}'
```
### /v1/login - log in the user:
```
curl -X POST http://<ip_address>/v1/login \
-H "Content-Type: application/json" \
-d '{
    "email":"<string>@gmail.com",
    "password":"<string>"
}'
```
### /v1/logout - logout user:
```
curl -X POST http://<ip_address>/v1/logout \
-H "Authorization: Bearer <token>"
```
### /v1/refresh - refresh access token:
```
curl -X POST http://<ip_address>/v1/refresh \ 
-H "Authorization: Bearer <refresh_token>"
```

## profile routes

### /v1/profile - get information about the user:
```
curl -X GET http://<ip_address>/v1/profile \
-H "Authorization: Bearer <token>"
```
### /v1/profile - change user data:
```
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "email": "<string>@gmail.com"<F5>
}'
```
```
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "name": "<string>"
}'
```
```
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "password": "<string>"
}'
```
```
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "email": "<string>@gmail.com",
    "password": "<string>"
}'
```
```
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "email": "<string>@gmail.com",
    "name": "<string>"
}'
```
```
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "name": "<string>",
    "password": "<string>"
}'
```
```
curl -X PUT http://<ip_address>/v1/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "email": "<string>@gmail.com",
    "name": "<string>",
    "password": "<string>"
}'
```
### /v1/profile/avatar - update the user's avatar:
```
curl -X POST http://<ip_address>/v1/profile/avatar \
-H "Authorization: Bearer <token>" \
-F "avatar=@./<path_to_image>"
```

## quests routes 

### /v1/quests - create a quest:
```
curl -X POST http://<ip_address>/v1/quests \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "title":"<string>",
    "description":"<string>",
    "time_limit": <int>
}'
```
### /v2/quests - create a quest with questions right away:
```
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
### /v1/quests/\<quest_id\> - get information about the quest:
```
curl -X GET http://<ip_address>/v1/quests/<quest_id> \
-H "Authorization: Bearer <token>"
```
### /v1/quests/\<quest_id\> - edit information about the quest:
```
curl -X PUT http://<ip_address>/v1/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>"
}'
```
```
curl -X PUT http://<ip_address>/v1/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>
}'
```
### /v2/quests/\<quest_id\> - edit information about the quest with tasks:
```
curl -X PUT http://<ip_address>/v2/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "description": "<string>"
}'
```
```
curl -X PUT http://<ip_address>/v2/quests/<quest_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer " \
-d '{
    "title": "<string>",
    "description": "<string>",
    "time_limit": <int>
}'
```
```
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
### /v1/quests/\<quest_id\> - delete quest:
```
curl -X DELETE http://<ip_address>/v1/quests/<quest_id> \
-H "Authorization: Bearer <token>"
```
### /v1/quests/user - get all quests of user:
```
curl -X GET http://<ip_address>/v1/quests/user?limit=<int> \
-H "Authorization: Bearer <token>"
```
### /v1/quests/user/\<user_id\> - get all quests of user by id:
```
curl -X GET http://<ip_address>/v1/quests/user/<user_id>?limit=<int> \
-H "Authorization: Bearer <token>"
```
### /v1/quests/recent - get last added quests:
```
curl -X GET "http://<ip_address>/v1/quests/recent?limit=<int>"
```
### /v1/quests/all - get all quests:
```
curl -X GET http://<ip_address>/v1/quests/all\?limit\=<int> \
-H "Authorization: Bearer <token>"
```
### /v1/quests/\<quest_id\>/image - set image for quest:
```
curl -X POST http://<ip_address>/v1/quests/<quest_id>/image \
-H "Authorization: Bearer <token>" \
-F "image=@./<path_to_image>"
```

## quest_progress routes

### /v1/quests/\<quest_id\>/start - start the process of completing the quest:
```
curl -X POST http://<ip_address>/v1/quests/<quest_id>/start \
-H "Authorization: Bearer <token>" 
```
### /v1/quests/\<quest_id\>/tasks/\<task_id\>/answer - save your answer:
```
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id>/answer \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" 
-d '{
    "answer": ["<string>"]
}'
```
### /v1/quests/\<quest_id\>/complete - complete the process of completing the quest:
```
curl -X POST http://<ip_address>/v1/quests/<quest_id>/complete \
-H "Authorization: Bearer <token>" 
```

## rating routes

### /v1/quests/\<quest_id\>/rate - leave a review about the quest:
```
curl -X POST http://<ip_address>/v1/quests/<quest_id>/rate \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "stars": <int>,
    "comment": "<string>"
}'
```
### /v1/quests/\<quest_id\>/ratings - get ratings of quest:
```
curl -X GET http://<ip_address>/v1/quests/<quest_id>/ratings\?limit\=<int> \
-H "Authorization: Bearer <token>"
```
### /v1/ratings/user/\<user_id\> - get ratings that write user:
```
curl -X GET http://<ip_address>/v1/ratings/user/<user_id>\?limit\=<int> \
-H "Authorization: Bearer <token>"
```

## stats routes

### /v1/top_reviewers - get top reviewers from all database:
```
curl -X GET http://<ip_address>/v1/top_reviewers\?limit\=<int>
```

## task routes

### /v1/quests/\<quest_id\>/tasks - add task:
```
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
```
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
```
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
```
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
### /v1/quests/\<quest_id\>/tasks/\<task_id\> - delete task:
```
curl -X DELETE http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id> \
-H "Authorization: Bearer <token>"
```
### /v1/quests/\<quest_id\>/tasks/\<task_id\>/image - set image for task:
```
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id>/image \
-H "Authorization: Bearer <token>" \
-F "image=@./<path_to_image>"
```
### /v1/quests/\<quest_id\>/tasks/\<task_id\>/video - set video for task:
```
curl -X POST http://<ip_address>/v1/quests/<quest_id>/tasks/<task_id>/video \
-H "Authorization: Bearer <token>" \
-F "video=@./<path_to_image>"
```

## user routes

### /v1/user/\<user_id\> - get information about user by id:
```
curl -X GET http://<ip_address>/v1/user/<user_id> \
-H "Authorization: Bearer <token>"
```
### /v1/users - get all users:
```
curl -X GET http://<ip_address>/v1/users\?limit\=<int> \ 
-H "Authorization: Bearer <token>"
```
