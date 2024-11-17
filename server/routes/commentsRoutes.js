const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const commentsController = require('../controllers/commentsController');
const { commentSchema, validator } = require('../middleware/validator');

router.get('/', commentsController.getAllCommentsController);
router.post('/', authenticateToken, validator(commentSchema), commentsController.createCommentController);
router.post('/action', authenticateToken, commentsController.createCommentLikeController);
router.put('/:id', authenticateToken, commentsController.updateCommentController);
router.delete('/:id', authenticateToken, commentsController.deleteCommentController);

module.exports = router;