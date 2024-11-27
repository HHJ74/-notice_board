const pool = require('../database/database'); // 데이터베이스 연결 설정

// 댓글 생성
exports.createComment = async (req, res) => {
    try {
        const { post_number, parent_comment_number, content } = req.body;

        // 유효성 검증
        if (!post_number || !content) {
            return res.status(400).json({ error: 'Post number and content are required.' });
        }

        // 댓글 삽입
        const query = `
            INSERT INTO comments (post_number, parent_comment_number, content)
            VALUES ($1, $2, $3)
            RETURNING *`;
        const values = [post_number, parent_comment_number || null, content];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Comment created successfully.',
            comment: result.rows[0], // 새로 생성된 댓글 반환
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment.' });
    }
};