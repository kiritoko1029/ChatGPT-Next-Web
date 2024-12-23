FROM node:18-alpine

WORKDIR /app

RUN yarn install
COPY . /app/

EXPOSE 13001

CMD ["node", "server.js"]