
## Як запускати проєкт?

Для запуску проєкту потрібно увійти по такому маршруту директорії: vista-git > frontend  та запустити сам проєкт прописавши в терміналі команду `npm start`

### Необхідні бібліотеки для запуску: 
npm install 
  react@19.0.0 
  react-dom@19.0.0 
  react-router-dom@7.1.5 
  react-scripts@5.0.1 
  web-vitals@4.2.4


## Варіант з докером:

Білдимо docker:
```bash
docker compose up -d --build
```

## Також при потребі налаштовуємо nginx на сервері для слухання на домені:
Створюємо конфігураційний файл:
```bash
vim /etc/nginx/sites-available/sub.domain.com.conf
```
> Змінюємо домен на свій

Вставляємо конфігурацію nginix:
```nginx
server {
    server_name myapp.example.com; 

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
> Змінюємо домен на свій. Якщо використовували інший порт тоді також його змінюємо відповідно

Активовуємо сайт:
```bash
ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
```
> Вказуємо свій домен
