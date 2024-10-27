const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const commentsController = require('../controllers/commentsController');

router.get('/', commentsController.getAllComments);
router.post('/', authenticateToken, commentsController.createComment);
router.put('/:id', authenticateToken, commentsController.updateComment);
router.delete('/:id', authenticateToken, commentsController.deleteComment);

module.exports = router;