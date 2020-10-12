# Base node
FROM node:alpine AS base

WORKDIR /name-db

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "src/index.js" ]

# Prod
FROM nginx

COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=base build /usr/share/nginx/html