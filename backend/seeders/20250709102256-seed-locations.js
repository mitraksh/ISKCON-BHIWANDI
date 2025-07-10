"use strict";
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("locations", [
      {
        name: "Tech Park",
        address: "123 Main St",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        created_at: new Date()
      },
      {
        name: "Convention Center",
        address: "456 Elm St",
        city: "New York",
        state: "NY",
        country: "USA",
        created_at: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("locations", null, {});
  }
};
