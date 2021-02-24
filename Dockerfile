FROM node:15-alpine
ENV DOTENV_CONFIG_PORT=8080 \
DOTENV_CONFIG_HOST=localhost \
DOTENV_PROD_PORT=8080 \
DOTENV_PROD_HOST=localhost


# WORKDIR /usr/src/app
COPY . /src
WORKDIR /src

 RUN apk add --no-cache \
        sudo \
        curl \
        build-base \
        g++ \
        libpng \
        libpng-dev \
        jpeg-dev \
        pango-dev \
        cairo-dev \
        giflib-dev \
        python \
        ;

    #  add glibc and install canvas
    RUN apk --no-cache add ca-certificates wget  && \
        wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
        wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk && \
        apk add glibc-2.29-r0.apk && \
        npm install canvas@2.6.1;
    RUN npm install
        

EXPOSE 8000
CMD [ "node", "server/server.js"]
