const { Event, Location, User } = require("../models");
const { Op } = require('sequelize');

exports.getEvents = async (req, res) => {
  try {
    const { date, category, location } = req.query;

    const where = {};
    if (date) where.date = date;
    if (category) where.category = category;

    const include = [];

    if (location && location.trim() !== "") {
      include.push({
        model: Location,
        as: "location",
        attributes: ["name"],
        where: { name: location.trim() },
      });
    }else {
      include.push({
        model: Location,
        as: "location",
        attributes: ["name"],
      });
    }

    const events = await Event.findAll({
      where,
      include,
    });

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getFilterOptions = async (req, res) => {
  try {
    const categories = await Event.findAll({
      attributes: [
        [Event.sequelize.fn("DISTINCT", Event.sequelize.col("category")), "category"]
      ],
      raw: true,
    });

    const locations = await Location.findAll({
      attributes: ["name"],
      raw: true,
    });

    res.json({
      categories: categories.map(c => c.category),
      locations: locations.map(l => l.name),
    });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, date, category, location, description, userId } = req.body;

    const foundLocation = await Location.findOne({ where: { name: location } });
    if (!foundLocation) {
      return res.status(400).json({ error: "Invalid location" });
    }

    console.log(req.body);
    console.log(userId);

    const newEvent = await Event.create({
      title,
      date,
      category,
      description,
      location_id: foundLocation.id,
      created_by: userId
    });

    res.json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  await Event.update(req.body, { where: { id } });
  const updated = await Event.findByPk(id);
  res.json(updated);
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  await Event.destroy({ where: { id } });
  res.json({ message: 'Deleted' });
};
