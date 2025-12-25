const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.post('/', classController.postClassHandler);
router.get('/', classController.getClassHandler);
router.get('/:id',classController.getClassHandlerById);
router.delete('/:id', classController.deleteClassHandlerById);

module.exports = router;