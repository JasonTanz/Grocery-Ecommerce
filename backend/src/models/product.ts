import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { category } from './category';
import { product_category } from './product_category';

@Table
export class product extends Model<product> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  product_id: string;

  @Column({
    type: DataType.STRING,
  })
  product_name: string;

  @Column({
    type: DataType.STRING,
  })
  product_brief_intro: string;

  @Column({
    type: DataType.TEXT('long'),
  })
  product_description: string;

  @Column({
    type: DataType.TEXT('long'),
  })
  product_img: string;

  @Column({
    type: DataType.NUMBER,
  })
  product_price: number;

  @Column({
    type: DataType.NUMBER,
  })
  product_qty: number;

  @BelongsToMany(() => category, () => product_category, 'product_id')
  categories: category[];
}
