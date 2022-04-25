const categories = require('./seederData/category.data.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const results = [];

    categories.forEach((cat) => {
      results.push({
        category_id: cat['category_id'],
        category_name: cat['category_name'],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return queryInterface.bulkInsert('categories', results);
  },

  down: async (queryInterface, Sequelize) => {
    const removeData = [];
    categories.forEach((cat) => {
      removeData.push(cat['category_id']);
    });
    return queryInterface.bulkDelete('categories', {
      category_id: removeData,
    });
  },
};
