FROM node:16-bullseye-slim

COPY ./package.json /app/package.json
COPY ./build /app
COPY ./babel.config.json /app/babel.config.json

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]