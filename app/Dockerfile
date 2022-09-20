FROM node:16 AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/client

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c",  "npm run start:production"]
