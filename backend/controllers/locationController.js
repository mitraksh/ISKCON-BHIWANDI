const { Location } = require("../models");

// Get all locations
exports.getAllLocations = async (req, res) => {
  const locations = await Location.findAll();
  res.json(locations);
};

// Get one location by ID
exports.getLocationById = async (req, res) => {
  const location = await Location.findByPk(req.params.id);
  if (!location) {
    return res.status(404).json({ message: "Location not found" });
  }
  res.json(location);
};

// Create a location
exports.createLocation = async (req, res) => {
  const location = await Location.create(req.body);
  res.status(201).json(location);
};

// Update a location
exports.updateLocation = async (req, res) => {
  const id = req.params.id;
  const [updated] = await Location.update(req.body, { where: { id } });
  if (!updated) {
    return res.status(404).json({ message: "Location not found" });
  }
  const updatedLocation = await Location.findByPk(id);
  res.json(updatedLocation);
};

// Delete a location
exports.deleteLocation = async (req, res) => {
  const id = req.params.id;
  const deleted = await Location.destroy({ where: { id } });
  if (!deleted) {
    return res.status(404).json({ message: "Location not found" });
  }
  res.json({ message: "Location deleted successfully" });
};
