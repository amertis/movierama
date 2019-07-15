FROM node:10-alpine

RUN apk update && apk add bash

RUN apk add --no-cache \
      libstdc++ \
&& apk add --no-cache build-base curl gcc g++ autoconf libgcc python git automake libtool zlib-dev libpng-dev nasm netcat-openbsd \
&& apk add dos2unix --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community/ --allow-untrusted \
    && npm install --silent node-gyp -g

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install --silent && npm audit fix

RUN npm i -g mocha nyc mochawesome jsdoc apidoc

COPY . /usr/src/app

WORKDIR /usr/src/app/client

RUN npm install

RUN npm run build

WORKDIR /usr/src/app

RUN jsdoc -c jsdoc-config.json -t ./node_modules/ink-docstrap/template -R README.md

RUN apidoc -i controllers/ -o docs/apidoc

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait

CMD /wait && nyc --reporter=lcov mocha -R mochawesome --reporter-options reportDir=testreport,reportFilename=index.html --timeout 5000 --recursive test \\
 && node scripts/importDump.js && node index.js

EXPOSE 5000
