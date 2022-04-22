'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'product_id', {
      type: Sequelize.UUID,
      references: {
        model: 'products',
        key: 'product_id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('orders', 'product_id');
  },
};
