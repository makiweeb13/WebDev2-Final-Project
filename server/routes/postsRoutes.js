const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPost);
router.post('/', authenticateToken, postsController.createPost);
router.put('/:id', authenticateToken, postsController.updatePost); 
router.delete('/:id', authenticateToken, postsController.deletePost);

module.exports = router;