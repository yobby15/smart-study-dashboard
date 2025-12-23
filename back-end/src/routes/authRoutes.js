const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.postAuthenticationHandler)
router.put('/', authController.putAuthenticationHandler)
router.delete('/', authController.deleteAuthenticationHandler)

module.exports = router;