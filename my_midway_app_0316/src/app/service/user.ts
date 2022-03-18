import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { IUserOptions, OUerOptions, OUerQueryOptions } from '../../interface';
import { UserModel } from '../model/users';
import { Result } from '../result';
import * as md5 from 'md5';

// ● 1、使用 @Provide 装饰器暴露你的服务
// ● 2、在调用的代码处，使用 @Inject 装饰器注入你的服务
// ● 3、调用注入服务，执行对应的方法
// Midway 的核心 “依赖注入” 容器会自动关联你的控制器（Controller） 和服务（Service），
// 在运行过程中会自动初始化所有的代码，你无需手动初始化这些 Class。
@Provide()
export class UserService {
  @InjectEntityModel(UserModel)
  userModel: Repository<UserModel>;
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  /**
   * 分页查询
   * @param query
   * @returns
   */
  async queryUsers(query: OUerQueryOptions) {
    const { pageSize, pageNumber } = query;
    const skip = pageNumber * pageSize;
    const allUsers = await this.userModel.find();
    const total = allUsers.length;
    const users = await this.userModel
      .createQueryBuilder('users')
      .skip(skip)
      .take(pageSize)
      .getMany();
    return { users, total };
  }

  async addUser(user: OUerOptions): Promise<any> {
    const { email } = user;
    const isNewUser = await this.userModel.findOne({ email });
    if (isNewUser) {
      return Result({ code: 200, success: false, message: '该用户已存在' });
    }
    user.password = md5(user.password);
    await this.userModel.save(user);
    return Result({ code: 200, success: true, message: '添加成功' });
  }

  async updateUser(user: OUerOptions): Promise<any> {
    const { id } = user;
    try {
      const isExit = await this.userModel.findOne({ id });
      if (isExit) {
        await this.userModel.save(user);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  /**
   * 查询当前邮箱是不是存在
   * @param email
   * @returns
   */
  async findOneByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return true;
    }
    return false;
  }

  async findOneByUserName(name: string): Promise<any> {
    const user = await this.userModel.findOne({ name });
    if (user) {
      return user;
    }
    return false;
  }

  async removeUser(id: number) {
    const user = await this.userModel.findOne(id);
    if (user) {
      await this.userModel.remove(user);
      return true;
    } else {
      return false;
    }
  }
}
