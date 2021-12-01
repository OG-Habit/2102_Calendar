const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminder.controller');

router.get('/:user_id', reminderController.findByUserID);
router.get('/getAllReminders/:user_id', reminderController.getAllReminders);
router.post('/', reminderController.create);
router.post('/:rem_id', reminderController.update);
router.post('/delete/:rem_id', reminderController.delete);

module.exports = router;