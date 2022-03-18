import { EntityModel } from '@midwayjs/orm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@EntityModel({
  // 定义一个数据库实体对象
  name: 'admin_users',
})
export class AdminModel {
  // 将实体中的属性标记为表生成的主列。 它创建的列是主列，值自动生成
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '记住token',
    name: 'remember_token',
  })
  rememberToken: string;
}
