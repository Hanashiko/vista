# Start the server from the docker

### container docker launching:
```sudo docker-compose up -d --build```


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
```curl -X POST http://100.26.99.106:5000/register -H "Content-Type: application/json" -d '{"email":"@gmail.com","password":"","name":""}'```
### /login - log in the user:
```curl -X POST http://100.26.99.106:5000/login -H "Content-Type: application/json" -d '{"email":"@gmail.com","password":""}'```
### /logout - logout user:
```curl http://100.26.99.106:5000/logout -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>"```
### /profile - get information about the user:
```curl -X GET http://100.26.99.106:5000/profile -H "Content-Type: application/json" -H "Authorization: Bearer <token>"```
### /profile - change user data:
```curl -X PUT http://100.26.99.106:5000/profile -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"email": "@gmail.com", "name": "", "password": ""}'```
### /profile/avatar - update the user's avatar:
```curl -X POST http://100.26.99.106:5000/profile/avatar -H "Authorization: Bearer <token>" -F "avatar=@./path_to_image"```
### /quests - create a quest:
```curl -X POST http://100.26.99.106:5000/quests -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"title":"","description":"","num_tasks":,"time_limit":}'```
### /quests/<id:int> - get information about the quest:
```curl -X GET http://100.26.99.106:5000/quests/1 -H "Content-Type: application/json"  -H "Authorization: Bearer <token>"```
### /quests/<id:int>/rate - leave a review about the quest:
```curl -X POST http://100.26.99.106:5000/quests/1/rate -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"stars":,"comment":""}'```
### /quests/<int>/tasks - add task with multiple_choise type:
```curl -X POST http://100.26.99.106:5000/quests/1/tasks -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"text": "", "question_type": "multiple_choice", "options": [{"text": "", "is_correct": true}, {"text": "", "is_correct": false}, {"text": "", "is_correct": false}]}'```
### /quests/<int>/tasks - add task with open_ended type:
```curl -X POST http://100.26.99.106:5000/quests/1/tasks -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"text":"","question_type":"open_ended","correct_answer":""}'```
### /quests/<int>/tasks - add task with map_interactive type:
```curl -X POST http://100.26.99.106:5000/quests/1/tasks -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"text":"","question_type":"map_interactive","map_interactive":[{"description":"","latitude":,"longitude":}]}'```
