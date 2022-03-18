import {
  ALL,
  Body,
  Headers,
  Controller,
  Inject,
  Post,
  Provide,
  Validate,
} from '@midwayjs/decorator';
// import { Context } from 'egg';
import { adminDto } from '../dto/admin';
import { LoginService } from '../service/login';
//
/**
 * @Controller
 * 装饰器标注控制器，其中装饰器有一个可选参数，
 * 用于进行路由前缀（分组），这样这个控制器下面的所有路由都会带上这个前缀。默认 /
 */
/**
 * @Get 、 @Post 、 @Put() 、 @Del() 、 @Patch() 、 @Options() 、 @Head()  和 @All()
 */
@Provide() // 暴露一个 class，让 IoC 容器能够获取元数据
@Controller('/api') // /标识为一个 Web 控制器
export class LoginController {
  // @Inject() // 注入一个 IoC 容器中的对象
  // ctx: Context;

  @Inject()
  loginService: LoginService;

  @Post('/sys/login')
  @Validate()
  async Login(@Body(ALL) adminUser: adminDto) {
    const token = await this.loginService.login(adminUser);
    return { success: true, message: 'OK', data: token };
  }

  @Post('/sys/logout')
  @Validate()
  async Logout(@Headers(ALL) header: any) {
    const { authorization } = header; // this.ctx.request.header;
    if (authorization) {
      const success = this.loginService.loginOut(authorization);
      return { success, message: 'OK', data: null };
    }
    return { success: false, message: 'OK', data: null };
  }
}
