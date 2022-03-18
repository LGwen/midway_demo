import { Controller, Get, Inject, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
import { NumbersService } from '../service/number';

/**
 * @Controller
 * 装饰器标注控制器，其中装饰器有一个可选参数，
 * 用于进行路由前缀（分组），这样这个控制器下
 * 面的所有路由都会带上这个前缀。默认 /
 */
/**
 * @Get 、 @Post 、 @Put() 、 @Del() 、 @Patch() 、 @Options() 、 @Head()  和 @All()
 */
@Provide()
@Controller('/api', { middleware: ['tokenMiddleware'] })
export class DashboardController {
  @Inject()
  ctx: Context;

  @Inject()
  numbersService: NumbersService;

  @Get('/dashboard/info')
  async dashboard() {
    const datas = await this.numbersService.findAll();
    return { success: true, message: 'OK', data: datas };
  }
}
