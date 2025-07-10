"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("event_registrations", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "events", key: "id" }
      },
      registration_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      status: {
        type: Sequelize.ENUM("registered", "cancelled"),
        defaultValue: "registered",
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("event_registrations");
  }
};
