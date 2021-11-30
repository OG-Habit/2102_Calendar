const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminder.controller');

router.get('/:user_id', reminderController.findByUserID);
router.post('/', reminderController.create);
router.put('/:rem_id', reminderController.update);
router.patch('/:rem_id', reminderController.delete);

module.exports = router;