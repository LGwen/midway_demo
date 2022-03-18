/* eslint-disable node/no-extraneous-import */
import { EntityModel } from '@midwayjs/orm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';
// EntityModel 定义一个数据库实体对象
// https://typeorm.biunav.com/zh/decorator-reference.html#%E5%AE%9E%E4%BD%93%E8%A3%85%E9%A5%B0%E5%99%A8
@EntityModel({
  name: 'users',
})
// https://typeorm.biunav.com/zh/decorator-reference.html#%E5%88%97%E8%A3%85%E9%A5%B0%E5%99%A8
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'password',
    name: 'password',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '记住token',
    name: 'remember_token',
  })
  rememberToken: string;
}
