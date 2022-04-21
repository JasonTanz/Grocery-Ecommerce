import { Sequelize } from 'sequelize-typescript';
import { admin } from 'src/models/admin';
import { product } from 'src/models/product';
import { customer } from '../src/models/customer';
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
      sequelize.addModels([customer, admin, product]);

      return sequelize;
    },
  },
];
