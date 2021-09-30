const users = require(`../json-data/${process.env.NODE_ENV || 'development'}/users`);

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (!users.length) return Promise.resolve();
    return queryInterface.bulkInsert(
      'users',
      users.map(u => ({
        ...u,
        password: bcrypt.hashSync('test', 10),
      })),
      {},
    );
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
