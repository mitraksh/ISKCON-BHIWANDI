const router = require('express').Router();
const regController = require('../controllers/registrationController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/:id/register', authenticate, regController.registerForEvent);
router.get('/registrations', authenticate, regController.getRegistrations);

module.exports = router;
