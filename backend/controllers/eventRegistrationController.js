const { EventRegistration, Event } = require("../models");

exports.registerForEvent = async (req, res) => {
  const userId = req.user.userId;
  const eventId = req.params.id;

  const existing = await EventRegistration.findOne({
    where: { user_id: userId, event_id: eventId }
  });
  if (existing) {
    return res.status(400).json({ message: "Already registered for this event" });
  }

  await EventRegistration.create({
    user_id: userId,
    event_id: eventId,
    status: "registered"
  });

  res.status(201).json({ message: "Registered successfully" });
};

exports.getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("user:  "+userId);
    const registrations = await EventRegistration.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Event,
          attributes: ["id", "title", "date", "category"]
        }
      ],
      order: [["registration_date", "DESC"]]
    });
    res.json(registrations);
  } catch (err) {
    console.error("Error fetching registrations:", err);
    res.status(500).json({ error: "Server error" });
  }
};