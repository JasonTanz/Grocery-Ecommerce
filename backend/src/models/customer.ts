// module.exports = (sequelize, DataTypes) => {
//   const Customer = sequelize.define('customer', {
//     cust_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     cust_email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     cust_username: {
//       type: DataTypes.STRING,
//     },

//     cust_password: {
//       type: DataTypes.STRING,
//     },
//   });

//   //   Customer.associate = function (models) {};

//   return Customer;
// };

import { Table, Column, Model, DataType } from 'sequelize-typescript';

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
}
