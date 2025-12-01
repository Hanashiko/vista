FROM node:18-alpine as build

WORKDIR /app

ARG DISABLE_ESLINT_PLUGIN=true

COPY package*.json ./

RUN npm ci

COPY . .

ENV DISABLE_ESLINT_PLUGIN=${DISABLE_ESLINT_PLUGIN}
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
