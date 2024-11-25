const express = require('express');
const router = express.Router();

// 사용자 관련 컨트롤러 가져오기
const authController = require('../controllers/authController');

// 사용자 엔드포인트
// GET /api/users - 사용자 목록 조회
router.get('/users', authController.getUsers);

// POST /api/users - 사용자 생성
router.post('/users', authController.createUser);

module.exports = router;