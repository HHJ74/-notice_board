const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// 댓글 생성
router.post('/comments', commentController.createComment);

// 댓글 삭제 (논리 삭제)
router.delete('/comments/:comment_number', commentController.deleteComment);

// 게시판(게시글) 댓글 조회
router.get('/posts/:post_number/comments', commentController.getCommentsByPost);

module.exports = router;