'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('users', 'id_costumer', {
        type: Sequelize.DataTypes.STRING
      }),
      queryInterface.addColumn('users', 'image', {
        type: Sequelize.DataTypes.STRING
      }),
      queryInterface.addColumn('users', 'is_available', {
        type: Sequelize.DataTypes.STRING
      }),
      queryInterface.addColumn('users', 'session_token', {
        type: Sequelize.DataTypes.STRING
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'role')
  }
};
