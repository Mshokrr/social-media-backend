const posts = require(`../json-data/${process.env.NODE_ENV || 'development'}/posts`);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('posts', posts);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null);
  },
};
