'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_category', {
      product_id: {
        type: Sequelize.UUID,
        references: {
          model: 'products',
          key: 'product_id',
        },
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'categories',
          key: 'category_id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_category');
  },
};
