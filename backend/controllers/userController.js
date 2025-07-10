const { User } = require("../models");
const bcrypt = require("bcryptjs");

// Get current user profile
exports.getProfile = async (req, res) => {
  const userId = req.user.userId;

  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email", "role", "created_at"]
  });

  res.json(user);
};

// Update current user profile
exports.updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { name, email } = req.body;

  await User.update({ name, email }, { where: { id: userId } });

  const updated = await User.findByPk(userId, {
    attributes: ["id", "name", "email", "role", "created_at"]
  });

  res.json(updated);
};
