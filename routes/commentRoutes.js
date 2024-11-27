const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// 댓글 생성
router.post('/comments', commentController.createComment);

module.exports = router;