FROM node:12-alpine as builder
WORKDIR /
COPY package.json ./
COPY yarn.lock ./
COPY src ./
COPY config ./
RUN npm i  --registry=https://registry.npm.taobao.org
RUN npm run build

FROM nginx:alpine
# 复制源码到容器的/home目录
COPY --from=builder dist /home/www
COPY --from=builder dist /home/www/admin
# COPY dist /home/www
# COPY dist /home/www/admin
# 复制nginx.conf
COPY ./docker/nginx /etc/nginx

# 指定执行的工作目录
WORKDIR /home/www

EXPOSE 8080

#CMD 运行以下命令
CMD ["nginx", "-g", "daemon off;"]
