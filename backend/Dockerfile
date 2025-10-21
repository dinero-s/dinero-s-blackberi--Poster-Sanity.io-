FROM node:20-alpine

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
EXPOSE 3000

COPY package.json yarn.lock ./
RUN touch .env

RUN mkdir data
RUN set -x && yarn --frozen-lockfile
RUN yarn global add @nestjs/cli

COPY . .
CMD [ "npm", "run", "start:dev" ]
