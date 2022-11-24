'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('categories', 'cloudinary_id', {
        type: Sequelize.DataTypes.STRING
      }),
      queryInterface.addColumn('categories', 'imagen', {
        type: Sequelize.DataTypes.STRING
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
