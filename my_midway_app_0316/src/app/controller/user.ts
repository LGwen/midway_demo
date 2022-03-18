import {
  ALL,
  Body,
  Controller,
  Get,
  // Headers,
  Inject,
  Post,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { OUerOptions, OUerQueryOptions } from '../../interface';
import { AuthService } from '../service/auth';
import { UserService } from '../service/user';
/**
 * @Controller
 * 装饰器标注控制器，其中装饰器有一个可选参数，
 * 用于进行路由前缀（分组），这样这个控制器下
 * 面的所有路由都会带上这个前缀。默认 /
 */
/**
 * @Get 、 @Post 、 @Put() 、 @Del() 、 @Patch() 、 @Options() 、 @Head()  和 @All()
 */
@Provide() // 暴露一个 class，让 IoC 容器能够获取元数据
// @Controller('/api') // /标识为一个 Web 控制器
@Controller('/api', { middleware: ['tokenMiddleware'] })
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  authService: AuthService;

  @Post('/getUser')
  async getUser(@Query() username) {
    const user = await this.authService.getAdminUser(username);
    return { success: true, message: 'OK', data: user };
  }

  @Get('/user')
  async getUser2(@Query() uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
  @Post('/user/add')
  async addUser(@Body(ALL) user: OUerOptions) {
    const res = await this.userService.addUser(user);
    if (res) {
      return { success: true, message: 'OK' };
    }
    return { success: false, message: 'OK' };
  }

  @Post('/user/list')
  async queryUsers(@Body(ALL) query: OUerQueryOptions) {
    const { users, total } = await this.userService.queryUsers(query);
    return {
      success: true,
      message: 'OK',
      data: users,
      ...query,
      total: total,
    };
  }

  @Post('/user/update')
  async updateUser(@Body(ALL) user: OUerOptions) {
    const res = await this.userService.updateUser(user);
    if (res) {
      return { success: true, message: 'OK' };
    }
    return { success: false, message: 'OK' };
  }

  @Post('/user/delete')
  async deleteUser(@Body() id: number) {
    const res = await this.userService.removeUser(id);
    if (res) {
      return { success: true, message: 'OK', data: null };
    }
    return {
      success: false,
      message: '帐号不存在/服务器开小差了！！！',
      data: null,
    };
  }

  @Post('/user/verify/email')
  async findOneByEmail(@Body() email: string) {
    const user = await this.userService.findOneByEmail(email);
    return { success: true, message: 'OK', data: user };
  }
}
