FROM cypress/base:10.18.0

ENV HTTP_PROXY="http://wall.lit.hamburg.de:80/"
ENV HTTPS_PROXY="http://wall.lit.hamburg.de:80/"

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install curl

RUN curl -L https://github.com/docker/compose/releases/download/1.20.0-rc2/docker-compose-`uname -s`-`uname -m` -o ./docker-compose

RUN npm start

RUN npm install