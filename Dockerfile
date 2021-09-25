# syntax=docker/dockerfile:1

FROM node:latest as base
WORKDIR /hfms-front
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

FROM base as development
CMD ["npm", "run", "start"]

FROM base as production
CMD ["npm", "run", "start-prod"]