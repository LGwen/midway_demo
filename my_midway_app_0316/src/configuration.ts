import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import * as orm from '@midwayjs/orm';
import * as cache from '@midwayjs/cache';
// import * as redis from 'midwayjs-cool-redis';
// import * as cool from 'midwayjs-cool-core';

@Configuration({
  imports: [
    orm, // 加载 orm 组件
    // 必须，不可移除， cool-admin 官方组件 https://www.cool-js.com
    // cool,
    // 将缓存替换成redis
    // redis,
    // 内存Cache
    cache,
  ],
  // importsConfig: [
  //   join(__dirname, './config'), // 加载配置文件（eggjs 下不需要）
  // ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}

// configuration.ts
