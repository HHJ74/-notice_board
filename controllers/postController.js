const pool = require('../config/database'); // 데이터베이스 연결 모듈 가져오기

// 사용자별 게시글 조회
exports.getUserPosts = async (req, res) => {
    try {
        const { user_number } = req.params; // URL 파라미터에서 사용자 ID 추출

        // 유효성 검증
        if (!user_number || isNaN(user_number)) {
            return res.status(400).json({ error: 'Invalid user number' });
        }

        // 데이터베이스에서 게시글 조회
        const query = 'SELECT * FROM posts WHERE user_number = $1';
        const result = await pool.query(query, [user_number]);

        res.status(200).json(result.rows); // 게시글 목록 반환
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};


// 새로운 게시글 생성
exports.createUserPosts = async (req, res) => {
    try {
        const { user_number } = req.params; // URL 파라미터에서 user_number 추출
        const { title, content } = req.body; // 요청 본문에서 데이터 추출

        // 유효성 검증
        if (!user_number || isNaN(user_number)) {
            return res.status(400).json({ error: 'Invalid user number' });
        }
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        // 데이터베이스에 게시글 저장
        const query = `
            INSERT INTO posts (user_number, title, content, created_at)
            VALUES ($1, $2, $3, NOW())
            RETURNING *`;
        const values = [user_number, title, content];
        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Post created successfully',
            post: result.rows[0], // 새로 생성된 게시글 반환
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
};
