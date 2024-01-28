const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, postController.getTags);

module.exports = router;