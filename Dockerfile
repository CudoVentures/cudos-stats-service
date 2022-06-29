FROM node:16

# Create app directory
WORKDIR /usr/src/cudos-stats-service

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]