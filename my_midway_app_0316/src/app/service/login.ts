import { Provide, Inject, Config } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { AdminModel } from '../model/admin';
import * as jwt from 'jsonwebtoken';
import * as md5 from 'md5';
import { CoolConfig, CoolCommException } from 'midwayjs-cool-core';
import { adminDto } from '../dto/admin';
import { AuthService } from './auth';
import { UserService } from './user';
import { CacheManager } from '@midwayjs/cache';
// import {}

/**
 * 1、使用 @Provide 装饰器暴露你的服务
 * 2、在调用的代码处，使用 @Inject 装饰器注入你的服务
 * 3、调用注入服务，执行对应的方法
 */
@Provide()
export class LoginService {
  // @Inject('cool:cache')
  // coolCache: ICoolCache;
  @Inject(`cache:cacheManager`)
  cache: CacheManager; //依赖注入CacheManager

  @Inject()
  authService: AuthService;
  @Inject()
  userService: UserService;



  @Config('cool')
  coolConfig: CoolConfig;

  @InjectEntityModel(AdminModel)
  adminUserModel: Repository<AdminModel>;

  async login(adminUser: adminDto): Promise<any> {
    const { username, pwd } = adminUser;
    // 更改为userService
    const user = await this.userService.findOneByUserName(username);
    console.log('user:', user);
    if (user) {
      if(user.password !== md5(pwd)){
        throw new CoolCommException('账户或密码不正确~');
      }
      const { expire, refreshExpire } = this.coolConfig.jwt.token;
      // 验证token
      const token = await this.generateToken(user, expire, refreshExpire);
      await this.cache.set(`admin:authorizationKey:${user.id}`, token, {
        ttl: expire,
      });
      return token;
    } else {
      throw new CoolCommException('帐号或密码错误');
    }
  }

  async loginOut(authorization: any): Promise<any> {

    const userId = (<{ [key: string]: any }>(
      jwt.verify(authorization, this.coolConfig.jwt.secret)
    )).userId;
    try {
      await this.cache.del(`admin:authorizationKey:${userId}`);
      return true;
    } catch (error) {
      return false;
    }
  }
  // del

  /**
   * 生成token
   * @param user 用户对象
   * @param expire 过期
   * @param isRefresh 是否是刷新
   */
  async generateToken(user, expire, isRefresh?) {
    const tokenInfo = {
      isRefresh: false,
      username: user.username,
      userId: user.id,
      passwordVersion: user.password,
    };
    if (isRefresh) {
      tokenInfo.isRefresh = true;
    }
    return jwt.sign(tokenInfo, this.coolConfig.jwt.secret, {
      expiresIn: expire,
    });
  }
}
