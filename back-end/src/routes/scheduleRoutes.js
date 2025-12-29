const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/', scheduleController.postScheduleHandler);
router.get('/', scheduleController.getSchedulesHandler);
router.get('/:id',scheduleController.getScheduleByIdHandler);
router.delete('/:id', scheduleController.deleteScheduleByIdHandler);

module.exports = router;