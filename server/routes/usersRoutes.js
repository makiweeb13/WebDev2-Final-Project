const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticateToken = require('../middleware/authenticateToken');
const { profileSchema, validator } = require('../middleware/validator');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.put('/:id', authenticateToken, validator(profileSchema), usersController.updateUser);

module.exports = router;