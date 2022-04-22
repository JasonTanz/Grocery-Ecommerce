import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { category } from './category';
import { product } from './product';

@Table
export class product_category extends Model<product_category> {
  @ForeignKey(() => product)
  @Column({
    type: DataType.UUID,
  })
  product_id: string;

  @ForeignKey(() => category)
  @Column({
    type: DataType.UUID,
  })
  category_id: string;
}
