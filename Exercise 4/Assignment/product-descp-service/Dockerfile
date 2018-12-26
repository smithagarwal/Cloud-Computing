FROM alpine:latest

RUN apk update && apk add nodejs && rm -rf /var/cache/apk/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

CMD ["npm", "start"]