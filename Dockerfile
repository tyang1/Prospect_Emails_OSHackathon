FROM node:15
ENV NPM_CONFIG_LOGLEVEL info
# WORKDIR /usr/src/app
COPY . /src
WORKDIR /src
RUN npm install
EXPOSE 8000
CMD [ "node", "server/server.js"]
