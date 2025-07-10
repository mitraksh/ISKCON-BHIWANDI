"use strict";
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("event_registrations", [
      {
        user_id: 2,
        event_id: 1,
        status: "registered",
        registration_date: new Date()
      },
      {
        user_id: 2,
        event_id: 2,
        status: "registered",
        registration_date: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("event_registrations", null, {});
  }
};
