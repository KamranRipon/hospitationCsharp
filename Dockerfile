FROM cypress/base:10.18.0

ENV http_proxy="http://wall.lit.hamburg.de:80/"
ENV https_proxy="http://wall.lit.hamburg.de:80/"

RUN mkdir /app

WORKDIR /app

COPY . /app

# RUN apt-get update -y \
#     && apt-get install curl -y \
#     && apt-get install -y \
#     libgtk2.0-0 \
#     libgtk-3-0 \
#     libgbm-dev \
#     libnotify-dev \
#     libgconf-2-4 \
#     libnss3 \
#     libxss1 \
#     libasound2 \
#     libxtst6 \
#     xauth \
#     xvfb

RUN curl -L https://github.com/docker/compose/releases/download/1.20.0-rc2/docker-compose-`uname -s`-`uname -m` -o ./docker-compose
RUN curl -L --fail https://github.com/docker/compose/releases/download/1.24.0/run.sh -o /usr/local/bin/docker-compose

RUN chmod +x /usr/local/bin/docker-compose
RUN chmod +x ~/. docker-compose.yml

#RUN docker-compose up -d
#RUN npm start

CMD ["./runCytest.sh"]
RUN npm install
RUN npm install curl
#RUN $(npm bin)/cypress verify
#RUN npm run CyTest