'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      order_status: {
        type: Sequelize.STRING,
      },

      order_delivery_address: {
        type: Sequelize.STRING,
      },

      order_phone_number: {
        type: Sequelize.STRING,
      },

      order_total_price: {
        type: Sequelize.DOUBLE,
      },

      cust_id: {
        type: Sequelize.UUID,
        references: {
          model: 'customers',
          key: 'cust_id',
        },
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  },
};
