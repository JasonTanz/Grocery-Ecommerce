import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { order } from './order';

@Table
export class customer extends Model<customer> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  cust_id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  cust_email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cust_username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cust_password: string;

  @Column({
    type: DataType.UUID,
  })
  @HasMany(() => order, 'cust_id')
  orders: order[];
}
