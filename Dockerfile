FROM node:boron

RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server
COPY ./server/package.json /usr/src/server/
COPY ./server/yarn.lock /usr/src/server/
RUN yarn --pure-lockfile
COPY ./server/ /usr/src/server/

RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client
COPY ./client/package.json /usr/src/client/
COPY ./client/yarn.lock /usr/src/client/
RUN yarn --pure-lockfile
COPY ./client/ /usr/src/client/

RUN yarn build
RUN cp build/* ../server/static -R
WORKDIR /usr/src/server

EXPOSE 8080
CMD [ "yarn", "start" ]
