FROM node:16 AS Production
ENV DOTENV_CONFIG_PORT=8080 \
DOTENV_CONFIG_HOST=0.0.0.0 \
DOTENV_PROD_PORT=8080 \
DOTENV_PROD_HOST=0.0.0.0 

ENV NODE_ENV=production

WORKDIR /usr/src/api

COPY package*.json .

RUN npm install

#  RUN apk add --no-cache \
#         sudo \
#         curl \
#         build-base \
#         g++ \
#         libpng \
#         libpng-dev \
#         jpeg-dev \
#         pango-dev \
#         cairo-dev \
#         giflib-dev \
#         python \
#         ;

    #  add glibc and install canvas
    # RUN apk --no-cache add ca-certificates wget  && \
    #     wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    #     wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk && \
    #     apk add glibc-2.29-r0.apk && \
    #     npm install canvas@2.6.1;

    # RUN apk add --update nodejs nodejs-npm;
    
    # RUN apk --update add imagemagick

    # Install fonts
    # RUN apk --no-cache add msttcorefonts-installer fontconfig && \
    # update-ms-fonts && \
    # fc-cache -f

COPY . .

RUN npm run build

# EXPOSE 8080
CMD ["sh", "-c",  "npm run start:production"]
