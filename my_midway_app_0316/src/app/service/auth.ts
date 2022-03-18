import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
// eslint-disable-next-line node/no-extraneous-import
import { Repository } from 'typeorm';
import { AdminModel } from '../model/admin';

/**
 * 1、使用 @Provide 装饰器暴露你的服务
 * 2、在调用的代码处，使用 @Inject 装饰器注入你的服务
 * 3、调用注入服务，执行对应的方法
 */
@Provide()
export class AuthService {
  @InjectEntityModel(AdminModel)
  adminUserModel: Repository<AdminModel>;
  async getAdminUserByName(username: string): Promise<AdminModel> {
    const user = this.adminUserModel.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  async getAdminUser(username: string): Promise<AdminModel> {
    return this.getAdminUserByName(username);
  }
}
