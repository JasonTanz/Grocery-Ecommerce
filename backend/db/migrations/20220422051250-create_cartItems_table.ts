'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('cartItems', {
      cart_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      item_qty: {
        type: Sequelize.INTEGER,
      },
      cust_id: {
        type: Sequelize.UUID,
        references: {
          model: 'customers',
          key: 'cust_id',
        },
      },
      product_id: {
        type: Sequelize.UUID,
        references: {
          model: 'products',
          key: 'product_id',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cartItems');
  },
};
