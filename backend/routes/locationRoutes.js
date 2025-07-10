const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");
const { authenticate, authorizeRole } = require("../middlewares/authMiddleware");

// Public - list and get
router.get("/", locationController.getAllLocations);
router.get("/:id", locationController.getLocationById);

// Admin-only - create, update, delete
router.post("/", authenticate, authorizeRole("admin"), locationController.createLocation);
router.put("/:id", authenticate, authorizeRole("admin"), locationController.updateLocation);
router.delete("/:id", authenticate, authorizeRole("admin"), locationController.deleteLocation);

module.exports = router;
