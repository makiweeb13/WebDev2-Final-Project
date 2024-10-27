const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.put('/:id', authenticateToken, usersController.updateUser);

module.exports = router;