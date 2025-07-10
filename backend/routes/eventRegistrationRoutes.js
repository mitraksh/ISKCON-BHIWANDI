const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const {registerForEvent, getMyRegistrations } = require("../controllers/eventRegistrationController");

// POST /events/:id/register
router.post("/:id/register", authenticate, registerForEvent);

// GET /events/registrations
router.get("/registrations", authenticate, getMyRegistrations);

module.exports = router;
