const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminder.controller');

router.get('/:user_id', reminderController.findByUserID);

module.exports = router;