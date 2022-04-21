import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class admin extends Model<admin> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  admin_id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  admin_email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  admin_username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  admin_password: string;
}
