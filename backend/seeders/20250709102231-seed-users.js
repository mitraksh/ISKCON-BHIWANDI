"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => {
    const hash1 = await bcrypt.hash("password1", 10);
    const hash2 = await bcrypt.hash("password2", 10);

    await queryInterface.bulkInsert("users", [
      {
        name: "Alice Admin",
        email: "alice.admin@example.com",
        password_hash: hash1,
        role: "admin",
        created_at: new Date()
      },
      {
        name: "Bob User",
        email: "bob.user@example.com",
        password_hash: hash2,
        role: "user",
        created_at: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  }
};
