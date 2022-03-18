import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel({
  name: 'numbers',
})
export class NumberModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  number: string;

  @Column()
  icon: string;

  @Column()
  desc: string;
}
