FROM node:15
ENV NPM_CONFIG_LOGLEVEL info
# WORKDIR /usr/src/my_app
COPY . /src
WORKDIR /src
RUN npm install
EXPOSE 8080
CMD [ "node", "NODE_ENV=development nodemon -r dotenv/config server/server.js"]
