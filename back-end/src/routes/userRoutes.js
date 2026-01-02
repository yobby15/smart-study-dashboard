const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', userController.postUserHandler);
router.get('/', userController.getUserHandler);
router.get('/me', authMiddleware,userController.getUserLoggedHandler);

router.get('/:id', userController.getUserHandlerById);
router.delete('/:id', authMiddleware, userController.deleteUserHandlerById);

module.exports = router;