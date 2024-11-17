const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticateToken = require('../middleware/authenticateToken');
const { loginSchema, signupSchema, profileSchema, validator } = require('../middleware/validator');

router.post('/signup', validator(signupSchema), usersController.signupController);
router.post('/login', validator(loginSchema), usersController.loginController);
router.post('/logout', usersController.logout);
router.get('/check-auth', usersController.checkAuth);
router.get('/', usersController.getAllUsersController);
router.get('/:id', usersController.getUserController);
router.put('/:id', authenticateToken, validator(profileSchema), usersController.updateUserController);

module.exports = router;