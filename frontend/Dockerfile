# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci

# Копіюємо весь проєкт
COPY . .

# Білдимо проєкт
RUN npm run build

# Production stage
FROM nginx:alpine

# Копіюємо зібраний додаток до nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копіюємо конфіг nginx (опціонально)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Відкриваємо порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
