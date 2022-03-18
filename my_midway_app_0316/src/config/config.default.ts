/* eslint-disable node/no-extraneous-import */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ConnectionOptions } from 'typeorm';
import { CoolConfig } from 'midwayjs-cool-core';
export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612343095377_5746';

  // add your config here
  // 中间件 'tokenMiddleware'
  config.middleware = [];

  config.admin = {
    username: 'admin',
    password: 'admin',
  };

  // 解决错误 missing csrf token
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // cool-admin特有的配置
  config.cool = {
    // 是否初始化模块数据库
    initDB: true,
    // 全局路由前缀
    router: {
      prefix: '',
    },
    // 单点登录
    sso: false,
    // jwt 生成解密token的
    jwt: {
      // 注意： 最好重新修改，防止破解
      secret: 'FOAPOFALOEQIPNNLQ',
      // token
      token: {
        // 2小时过期，需要用刷新token
        expire: 2 * 3600,
        // 15天内，如果没操作过就需要重新登录
        refreshExpire: 24 * 3600 * 15,
      },
    },
    // 分页配置
    page: {
      // 分页查询每页条数
      size: 15,
    },
    // 文件上传
    file: {
      // 文件路径前缀 本地上传模式下 有效
      domain: 'https://admin.cool-js.cool',
    },
  } as CoolConfig;

  // 数据库配置
  config.orm = {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '0.0.0.0',
    port: process.env.MYSQL_HOST || 3307,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '123456',
    database: process.env.MYSQL_DATABASE || 'midway',
    synchronize: false,
    logging: true,
    timezone: '+08:00',
  } as ConnectionOptions;

  return config;
};
