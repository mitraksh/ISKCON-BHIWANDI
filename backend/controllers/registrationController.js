const Registration = require('../models/eventRegistration');
const Event = require('../models/event');

exports.registerForEvent = async (req, res) => {
  const { id: eventId } = req.params;
  await req.user.addEvent(eventId);
  res.json({ message: 'Registered successfully' });
};

exports.getRegistrations = async (req, res) => {
  const events = await req.user.getEvents();
  res.json(events);
};
