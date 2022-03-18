import {
  // Aspect,
  IMethodAspect,
  JoinPoint,
  // Provide,
  Inject,
  Config,
} from '@midwayjs/decorator';
// import { APIController } from '../controller/api';
// import { DashboardController } from '../controller/dashboard';
import * as jwt from 'jsonwebtoken';
import { CacheManager } from '@midwayjs/cache';
import { CoolConfig, BaseException } from 'midwayjs-cool-core';
// CoolCommException,

// @Provide()
// @Aspect([APIController, DashboardController])
export class ReportInfo implements IMethodAspect {
  @Inject(`cache:cacheManager`)
  cache: CacheManager; //依赖注入CacheManager

  @Config('cool')
  coolConfig: CoolConfig;
  // 验证token是否失效
  async before(point: JoinPoint) {
    const { authorization } = point.target.ctx.request.header;
    if (authorization) {
      const userId = (<{ [key: string]: any }>(
        jwt.verify(authorization, this.coolConfig.jwt.secret)
      )).userId;
      const cache = await this.cache.get(`admin:authorizationKey:${userId}`);
      if (!cache) throw new BaseException('登陆失效', 200, 'BaseException');
    } else {
      throw new BaseException('登陆失效', 200, 'BaseException');
    }
  }
}
