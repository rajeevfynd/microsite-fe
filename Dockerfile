FROM node:16

RUN npm install webpack serve -g

WORKDIR /tmp
COPY package.json /tmp/
COPY package-lock.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

ENV NODE_ENV=production
ENV PORT=3000

RUN npm run build

CMD [ "npx", "serve", "-s", "dist"]

EXPOSE 3000