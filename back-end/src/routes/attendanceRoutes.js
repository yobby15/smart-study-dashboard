const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/', attendanceController.postAttendanceHandler);
router.get('/', attendanceController.getAttendancesHandler);
router.get('/:id', attendanceController.getAttendanceByIdHandler);
router.delete('/:id', attendanceController.deleteAttendanceByIdHandler);

module.exports = router;