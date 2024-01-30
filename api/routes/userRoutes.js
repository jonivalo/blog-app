const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//const authenticate = require('../middleware/authenticate');

router.post('/register', userController.register);
router.post('/login', userController.login);
//router.get('/me', authenticate, userController.getCurrentUser);

module.exports = router;