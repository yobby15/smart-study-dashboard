const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.postUserHandler);
router.get('/', userController.getUserHandler);
router.get('/:id', userController.getUserHandlerById);
router.delete('/:id', userController.deleteUserHandlerById)

module.exports = router;