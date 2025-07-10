"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("locations", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      address: { type: Sequelize.TEXT, allowNull: false },
      city: { type: Sequelize.STRING(50), allowNull: false },
      state: { type: Sequelize.STRING(50), allowNull: false },
      country: { type: Sequelize.STRING(50), allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("locations");
  }
};
