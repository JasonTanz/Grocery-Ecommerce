'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      product_brief_intro: {
        type: Sequelize.STRING,
      },
      product_description: {
        type: Sequelize.TEXT('long'),
      },
      product_img: {
        type: Sequelize.TEXT('long'),
      },
      product_price: {
        type: Sequelize.DOUBLE,
      },
      product_qty: {
        type: Sequelize.INTEGER,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  },
};
