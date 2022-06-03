FROM node:lts-alpine

WORKDIR /home/node/

COPY . .
COPY package*.json ./

RUN npm install -g pm2
RUN npm install

USER node
EXPOSE $PORT

CMD ["npm", "run", "start-dev"]