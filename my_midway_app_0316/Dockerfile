FROM node:12-alpine

WORKDIR /midway
COPY package.json ./
COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY .editorconfig ./
COPY src ./src
COPY test ./test
COPY typings ./typings
COPY run ./run
COPY logs ./logs
RUN npm i --silent --no-cache --registry=https://registry.npm.taobao.org
EXPOSE 7002
CMD ["npm","run","dev","--","--port","7002"]
