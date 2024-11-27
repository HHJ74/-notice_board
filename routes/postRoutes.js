const express = require('express');
const router = express.Router();

// 게시글 관련 컨트롤러 가져오기
const postController = require('../controllers/postController');
// 게시글 엔드포인트
// GET /api/users/:userId/posts - 특정 사용자의 게시글 조회
router.get('/users/:user_number/posts', postController.getUserPosts);

// GET /api/users/:userId/posts - 특정 게시물 조회
router.get('/posts/:post_id', postController.getPostByPostNum);

// POST /api/users/:userId/posts - 특정 사용자의 게시글 생성
router.post('/users/:user_number/posts', postController.createUserPosts);



module.exports = router;
