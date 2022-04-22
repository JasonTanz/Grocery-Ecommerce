import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { customer } from './customer';
import { product } from './product';

@Table
export class cartItems extends Model<cartItems> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  cart_id: string;

  @Column({
    type: DataType.INTEGER,
  })
  item_qty: number;

  @ForeignKey(() => customer)
  @Column({
    type: DataType.UUID,
  })
  cust_id: string;

  @ForeignKey(() => product)
  @Column({
    type: DataType.UUID,
  })
  product_id: string;

  @BelongsTo(() => customer, 'cust_id')
  customer: customer;

  @BelongsTo(() => product, 'product_id')
  product: product;
}
