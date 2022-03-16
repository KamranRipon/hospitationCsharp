FROM cypress/base:10.18.0

ENV HTTP_PROXY="http://wall.lit.hamburg.de:80/"
ENV HTTPS_PROXY="http://wall.lit.hamburg.de:80/"

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN apt-get update -y \
    && apt-get upgrade -y \
    && apt-get install curl -y \
    && apt-get install docker-compose -y \
    && apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb
RUN apt-get install -y docker

RUN curl -L https://github.com/docker/compose/releases/download/1.20.0-rc2/docker-compose-`uname -s`-`uname -m` -o ./docker-compose

#RUN npm start

RUN npm install