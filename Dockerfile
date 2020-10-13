FROM nginx
COPY nginx.config /etc/nginx/conf.d/default.conf

FROM node:12
WORKDIR /docker-nginx
COPY package*.json .
RUN npm install
COPY src/ .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]