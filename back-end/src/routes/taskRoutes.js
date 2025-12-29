const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/', taskController.postTaskHandler);
router.get('/', taskController.getTasksHandler);
router.get('/:id',taskController.getTaskByIdHandler);
router.delete('/:id', taskController.deleteTaskByIdHandler);

module.exports = router;