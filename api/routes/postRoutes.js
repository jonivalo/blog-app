const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, postController.createPost);
router.get('/', authenticate, postController.getAllPosts);
router.delete('/:id', authenticate, postController.deletePost);
router.get('/:id', authenticate, postController.getPostById);

module.exports = router;