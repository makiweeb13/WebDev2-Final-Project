const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authenticateToken = require('../middleware/authenticateToken');
const { postSchema, validator } = require('../middleware/validator');

router.get('/', postsController.getAllPostsController);
router.get('/:id', postsController.getPostController);
router.post('/', authenticateToken, validator(postSchema), postsController.createPostController);
router.post('/action', authenticateToken, postsController.createPostLikeController);
router.put('/:id', authenticateToken, postsController.updatePostController); 
router.delete('/:id', authenticateToken, postsController.deletePostController);

module.exports = router;