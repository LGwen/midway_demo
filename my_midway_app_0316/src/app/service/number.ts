import { Config, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { CoolConfig } from 'midwayjs-cool-core';
import { Repository } from 'typeorm';
import { NumberModel } from '../model/number';

/**
 * 1、使用 @Provide 装饰器暴露你的服务
 * 2、在调用的代码处，使用 @Inject 装饰器注入你的服务
 * 3、调用注入服务，执行对应的方法
 */
@Provide()
export class NumbersService {
  @Config('cool')
  coolConfig: CoolConfig;

  @InjectEntityModel(NumberModel)
  NumberModel: Repository<NumberModel>;

  async findAll(): Promise<any> {
    const allNumbers =  await this.NumberModel.find();
    return allNumbers;
  }
}
