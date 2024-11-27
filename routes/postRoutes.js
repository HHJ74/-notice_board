const express = require('express');
const router = express.Router();

// 게시글 관련 컨트롤러 가져오기
const postController = require('../controllers/postController');
// 게시글 엔드포인트
// GET /users/:user_number/posts - 특정 사용자의 게시글 조회
router.get('/users/:user_number/posts', postController.getUserPosts);

// GET /posts/:post_id - 특정 게시물 조회
router.get('/posts/:post_number', postController.getPostByPostNum);

// POST /users/:user_number/posts - 특정 사용자의 게시글 생성
router.post('/users/:user_number/posts', postController.createUserPosts);

// POST /posts/:post_number - 게시글 수정
router.patch('/posts/:post_number', postController.updatePost);

// 게시글 삭제
router.delete('/posts/:post_number', postController.deletePost);


module.exports = router;
