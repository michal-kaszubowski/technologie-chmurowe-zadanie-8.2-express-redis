FROM node:latest

WORKDIR /opt/app

COPY ./package.json .

RUN yarn install

COPY . .

EXPOSE 6379

CMD [ "node", "index.js" ]
