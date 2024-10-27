const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const commentsController = require('../controllers/commentsController');
const { commentSchema, validator } = require('../middleware/validator');

router.get('/', commentsController.getAllComments);
router.post('/', authenticateToken, validator(commentSchema), commentsController.createComment);
router.put('/:id', authenticateToken, commentsController.updateComment);
router.delete('/:id', authenticateToken, commentsController.deleteComment);

module.exports = router;