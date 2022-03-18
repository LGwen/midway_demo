# midway_demo
midway demo
# 

# 前端

`react.js` `antd` `react-router` `umijs`

React/dva/router/webpack ...  等常用技术栈的一个集合

### <img src="https://img.alicdn.com/tfs/TB1hE8ywrr1gK0jSZFDXXb9yVXa-1227-620.png" alt="umijs.org_zh-CN_docs_how-umi-works" style="zoom:150%;" />

```
mkdir midway_web && cd midway_web
yarn create @umijs/umi-app
yarn && yarn start
```

# 后端

`node.js` `midway.js` `egg.js` `mysql` `typescript`

# typeorm

https://github.com/typeorm/typeorm/blob/master/docs/zh_CN/select-query-builder.md#%E5%88%86%E9%A1%B5

https://typeorm.biunav.com/zh/#%E5%AE%89%E8%A3%85

https://www.yuque.com/midwayjs/midway_v2/orm

# node-jsonwebtoken

https://github.com/auth0/node-jsonwebtoken#readme

https://www.npmjs.com/package/node-jsonwebtoken

# umijs

 https://umijs.org/zh-CN

# midway.js

https://www.yuque.com/midwayjs/midway_v2/introduction

# 常用装饰器

https://www.yuque.com/midwayjs/midway_v2/decorator_index

# mysql
https://search.bilibili.com/all?keyword=mysql&from_source=webtop_search&spm_id_from=333.1007

```dockerfile
docker pull mysql:5.7
```

## 启动

- –name：容器名，此处命名为`mysql`
- -e：配置信息，此处配置mysql的root用户的登陆密码
- -p：端口映射，此处映射 主机3306端口 到 容器的3306端口
- -d：后台运行容器，保证在退出终端后容器继续运行

```dockerfile
docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```
# mysql 初始化文件
my_midway_app_0316/database/init.sql

