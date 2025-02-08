## Run server without docker

### install pytohn dependences: 
```pip install -r requirements.txt```

### cope .env.example file to .env and write fields:
```cp .env.example .env```

### first launches:

### make database and run server:
```chmod +x entrypoint.sh```
```sh enrypoint.sh```

### next launches:

### run server:
```python run.py```


## Run server with docker

### run docker containers
```sudo docker-compose up -d --build```


## Test commands:

### /register: 
```curl -X POST http://192.168.0.106:5000/register -H "Content-Type: application/json" -d '{"email":"@gmail.com","password":"","name":""}'```
### /login:
```curl -X POST http://192.168.0.106:5000/login -H "Content-Type: application/json" -d '{"email":"@gmail.com","password":""}'```
### /logout:
```curl http://192.168.0.106:5000/logout -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>"```
### /profile:
```curl -X GET http://192.168.0.106:5000/profile -H "Content-Type: application/json" -H "Authorization: Bearer <token>"```
### /profile:
```curl -X PUT http://192.168.0.106:5000/profile -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"email": "@gmail.com", "name": "", "password": ""}'```
### /profile/avatar:
```curl -X POST http://192.168.0.106:5000/profile/avatar -H "Authorization: Bearer <token>" -F "avatar=@./path_to_image"```
### /quests:
```curl -X POST http://192.168.0.106:5000/quests -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"title":"","description":"","num_tasks":,"time_limit":}'```
### /quests/<int>:
```curl -X GET -H "Content-Type: application/json" http://192.168.0.106:5000/quests/1 -H "Authorization: Bearer <token>"```
### /quests/<int>/rate:
```curl -X POST http://192.168.0.106:5000/quests/1/rate -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"stars":,"comment":""}'```