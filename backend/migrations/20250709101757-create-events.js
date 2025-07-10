"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("events", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING(100), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      date: { type: Sequelize.DATEONLY, allowNull: false },
      category: { type: Sequelize.STRING(50), allowNull: false },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "locations", key: "id" }
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }
      },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("events");
  }
};
