const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, postController.createPost);
router.get('/',  postController.getAllPosts);
router.delete('/:id', authenticate, postController.deletePost);
router.get('/:id', authenticate, postController.getPostById);
router.put('/:id', authenticate, postController.updatePost);

module.exports = router;