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

### /register - register a user:
```
curl -X POST http://100.26.99.106:5000/register \
-H "Content-Type: application/json"\
-d '{
    "email":"@gmail.com",
    "password":"",
    "name":""
}'
```
### /login - log in the user:
```
curl -X POST http://100.26.99.106:5000/login \
-H "Content-Type: application/json"\
-d '{
    "email":"@gmail.com",
    "password":""
}'
```
### /logout - logout user:
```
curl -X POST http://100.26.99.106:5000/logout \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"
```
### /profile - get information about the user:
```
curl -X GET http://100.26.99.106:5000/profile \
-H "Content-Type: application/json"\
-H "Authorization: Bearer <token>"
```
### /profile - change user data:
```
curl -X PUT http://100.26.99.106:5000/profile \
-H "Content-Type: application/json"\
-H "Authorization: Bearer <token>" 
-d '{
    "email": "@gmail.com",
    "name": "",
    "password": ""
}'
```
### /profile/avatar - update the user's avatar:
```
curl -X POST http://100.26.99.106:5000/profile/avatar \
-H "Authorization: Bearer <token>" \
-F "avatar=@./<path_to_image>"
```
### /quests - create a quest:
```
curl -X POST http://100.26.99.106:5000/quests \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "title":"",
    "description":"",
    "time_limit":
}'
```
### /quests/\<quest_id\> - get information about the quest:
```
curl -X GET http://100.26.99.106:5000/quests/<quest_id> \
-H "Content-Type: application/json"
-H "Authorization: Bearer <token>"
```
### /quests/\<quest_id\>/tasks - get list of tasks:
```
curl -X GET http://100.26.99.106:5000/quests/<quest_id>/tasks \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" 
```
### /quests/\<quest_id\>/rate - leave a review about the quest:
```
curl -X POST http://100.26.99.106:5000/quests/<quest_id>/rate \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "stars":,
    "comment":""
}'
```
### /quests/\<quest_id\>/tasks - add task with multiple_choise type with one correct answer:
```
curl -X POST http://100.26.99.106:5000/quests/<quest_id>/tasks \
-H "Content-Type: application/json"\
-H "Authorization: Bearer <token>" \
-d '{
    "text": "", 
    "question_type": "multiple_choice", 
    "points":,
    "options": [
        {"text": "", "is_correct": true}, 
        {"text": "", "is_correct": false}, 
        {"text": "", "is_correct": false}
    ]
}'
```
### /quests/\<quest_id\>/tasks - add task with multiple_choise type with several correct answers:
```
curl -X POST http://100.26.99.106:5000/quests/<quest_id>/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text": "", 
    "question_type": "multiple_choice", 
    "points":, 
    "options": [
        {"text": "", "is_correct": true}, 
        {"text": "", "is_correct": true}, 
        {"text": "", "is_correct": false}, 
        {"text": "", "is_correct":false}, 
        {"text": "", "is_correct":true}
    ]
}'
```
### /quests/\<quest_id\>/tasks - add task with open_ended type:
```
curl -X POST http://100.26.99.106:5000/quests/<quest_id>/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>"\
-d '{
    "text":"",
    "question_type":"open_ended",
    "points":,
    "correct_answer":""
}'
```
### /quests/\<quest_id\>/tasks - add task with map_interactive type:
```
curl -X POST http://100.26.99.106:5000/quests/<quest_id>/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{
    "text":"",
    "question_type":"map_interactive",
    "points":,
    "map_interactive":[
        {"description":"","latitude":,"longitude":}
    ]
}'
```
### /quests/\<quest_id\>/start - start the process of completing the quest:
```
curl -X POST http://100.26.99.106:5000/quests/<quest_id>/start \
-H "Content-Type: application/json"
-H "Authorization: Bearer <token>" \
```
### /quests/\<quest_id\>/tasks/\<task_id\>/answer - save your answer:
```
curl -X POST http://100.26.99.106:5000/quests/<quest_id>/tasks/<task_id>/answer \
-H "Content-Type: application/json"
-H "Authorization: Bearer <token>" \
-d '{
    "answer": ["Paris"]
}'
```
### /quests/\<quest_id\>/complete - complete the process of completing the quest:
```
curl -X POST http://100.26.99.106:5000/quests/<quest_id>/complete \
-H "Content-Type: application/json"
-H "Authorization: Bearer <token>" \
```
