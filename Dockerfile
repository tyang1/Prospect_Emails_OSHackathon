FROM node:15
ENV NPM_CONFIG_LOGLEVEL info
WORKDIR /usr/src/app
COPY . .
RUN yarn
EXPOSE 8000
CMD [ "node", "server/server.js" ]
