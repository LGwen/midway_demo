import { CacheManager } from '@midwayjs/cache';
import { Config, Inject, Provide } from '@midwayjs/decorator';
import { IMidwayWebNext, IWebMiddleware } from '@midwayjs/web';
import { Context } from 'egg';
import * as jwt from 'jsonwebtoken';
import { RESCODE, CoolConfig } from 'midwayjs-cool-core';

@Provide()
export class TokenMiddleware implements IWebMiddleware {
  @Config('cool')
  coolConfig: CoolConfig;
  @Inject('cache:cacheManager')
  cache: CacheManager; //依赖注入CacheManager

  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      // 执行下一个 Web 中间件，最后执行到控制器

      const { originalUrl } = ctx.request;
      const { authorization } = ctx.request.header;
      if (originalUrl.startsWith('/api/sys/login')) {
        await next();
        return true;
      }
      if (authorization) {
        const userId = (<{ [key: string]: any }>(
          jwt.verify(authorization, this.coolConfig.jwt.secret)
        )).userId;
        const cache = await this.cache.get(`admin:authorizationKey:${userId}`);
        if (!cache) {
          ctx.status = 401;
          ctx.body = {
            code: RESCODE.COMMFAIL,
            message: '登录失效~',
            success: false,
          };
        } else {
          await next();
        }
      } else {
        ctx.status = 401;
        ctx.body = {
          code: RESCODE.COMMFAIL,
          message: '登录失效~',
          success: false,
        };
      }
    };
  }
}
