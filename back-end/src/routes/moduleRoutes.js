const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

router.post('/', moduleController.postModuleHandler);
router.get('/', moduleController.getModuleHandler);
router.get('/:id', moduleController.getModuleHandlerById);
router.delete('/:id', moduleController.deleteModuleHandlerById);

module.exports = router;