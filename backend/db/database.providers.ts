import { Sequelize } from 'sequelize-typescript';
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
      sequelize.addModels([customer]);

      return sequelize;
    },
  },
];
