const express = require("express");
const router = express.Router();
const { Event } = require("../models");
const { authenticate, authorizeRole } = require("../middlewares/authMiddleware");
const { getEvents, getFilterOptions, updateEvent, deleteEvent, createEvent } = require('../controllers/eventController');

// GET all events (public)
router.get("/", getEvents);

//GET all categories and locations
router.get("/filters", getFilterOptions);

// GET events by id (public)
router.get("/:id", async (req, res) => {
  const events = await Event.findByPk(req.params.id);
  res.json(events);
});

// POST create event (admin only)
router.post("/", authenticate, authorizeRole("admin"), createEvent);

// PUT update event (admin only)
router.put("/:id", authenticate, authorizeRole("admin"), updateEvent);

// DELETE event (admin only)
router.delete("/:id", authenticate, authorizeRole("admin"),  deleteEvent);

module.exports = router;
