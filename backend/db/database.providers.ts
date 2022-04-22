import { Sequelize } from 'sequelize-typescript';
import { admin } from 'src/models/admin';
import { product } from '../src/models/product';
import { customer } from '../src/models/customer';
import { order } from 'src/models/order';
import { cartItems } from 'src/models/cartItem';
import { category } from '../src/models/category';
import { product_category } from '../src/models/product_category';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
      );
      sequelize.addModels([
        customer,
        admin,
        product,
        order,
        cartItems,
        category,
        product_category,
      ]);

      return sequelize;
    },
  },
];
