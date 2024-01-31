const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getTags);
router.get('/:tag', postController.getPostsByTag);

module.exports = router;