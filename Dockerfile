FROM node:slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY tsconfig*.json /usr/src/app/

RUN yarn install

COPY . /usr/src/app
RUN yarn build
