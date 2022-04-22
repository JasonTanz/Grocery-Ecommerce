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
export class order extends Model<order> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  order_id: string;

  @Column({
    type: DataType.STRING,
  })
  order_status: string;

  @Column({
    type: DataType.STRING,
  })
  order_delivery_address: string;

  @Column({
    type: DataType.STRING,
  })
  order_phone_number: string;

  @Column({
    type: DataType.DOUBLE,
  })
  order_total_price: number;

  @Column({
    type: DataType.UUID,
  })
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
