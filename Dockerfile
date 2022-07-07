FROM node:16

# Create app directory
WORKDIR /usr/src/cudos-stats-service

COPY . .

EXPOSE 3000

RUN npm install

RUN npm install pm2 -g

CMD ["pm2-runtime", "server.js"]