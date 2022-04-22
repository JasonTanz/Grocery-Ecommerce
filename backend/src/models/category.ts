import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { product } from './product';
import { product_category } from './product_category';

@Table
export class category extends Model<category> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  category_id: string;

  @Column({
    type: DataType.STRING,
  })
  category_name: string;

  @BelongsToMany(() => product, () => product_category, 'category_id')
  products: product[];
}
