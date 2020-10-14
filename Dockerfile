FROM nginx
COPY brianlongmore.co /etc/nginx/sites-available/

RUN apt update -y

RUN ufw enable
RUN ufw allow 80
RUN ufw allow 443

ENV DEBIAN_FRONTEND noninteractive
RUN add-apt-repository ppa:certbot/certbot
RUN apt install python-certbot-nginx
RUN certbot --nginx -d brianlongmore.co -d www.brianlongmore.co

FROM node:12
WORKDIR /docker-nginx
COPY package*.json .
RUN npm install
COPY src/ .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]