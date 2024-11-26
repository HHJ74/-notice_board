const pool = require('../database/database') // PostgreSQL 연결 모듈
const bcrypt = require('bcrypt'); // bcrypt 라이브러리 추가

// 사용자 목록 조회
exports.getUsers = async (req, res) => {
    try {
        const query = 'SELECT * FROM users'; // 사용자 목록을 가져오는 SQL 쿼리
        const result = await pool.query(query); // 데이터베이스 쿼리 실행

        res.status(200).json(result.rows); // 사용자 목록 반환
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// 새로운 사용자 생성
exports.createUser = async (req, res) => {
    try {
        const { user_id, user_pw, user_name, user_nick } = req.body; // 요청 본문에서 데이터 추출

        // 유효성 검증
        if (!user_id || !user_nick || !user_pw) {
            return res.status(400).json({ error: 'user_id, user_pw, and user_nick are required' });
        }

        // 중복 ID 확인
        const existingUser = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'User ID already exists' });
        }

        // 비밀번호 암호화
        const saltRounds = 10; // salt 횟수 (10은 일반적으로 적당함)
        const hashedPassword = await bcrypt.hash(user_pw, saltRounds);

        // 데이터베이스에 사용자 저장
        const query = `
            INSERT INTO users (user_id, user_pw, user_name, user_nick, created_date, user_state)
            VALUES ($1, $2, $3, $4, NOW(), $5)
            RETURNING *`; // 생성된 사용자 반환
        const values = [user_id, hashedPassword, user_name, user_nick, 1]; // 초기 상태 1 설정
        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'User created successfully',
            user: result.rows[0], // 생성된 사용자 데이터 반환
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};