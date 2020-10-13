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

# this part throws an error when building container image
COPY --from=base src/public/index.html /usr/share/nginx/html