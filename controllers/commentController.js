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

// 댓글 삭제 (논리 삭제)
exports.deleteComment = async (req, res) => {
    try {
        const { comment_number } = req.params;

        // 유효성 검증
        if (!comment_number || isNaN(comment_number)) {
            return res.status(400).json({ error: 'Invalid comment number.' });
        }

        // 댓글 비활성화 (논리 삭제)
        const query = `
            UPDATE comments
            SET comment_state = 0, deleted_at = CURRENT_TIMESTAMP
            WHERE comment_number = $1
            RETURNING *`;
        const result = await pool.query(query, [comment_number]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Comment not found.' });
        }

        res.status(200).json({
            message: 'Comment deleted successfully.',
            comment: result.rows[0], // 삭제된 댓글 반환
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Failed to delete comment.' });
    }
};

// 특정 게시판(게시글)의 댓글 조회 (계층 구조 포함)
exports.getCommentsByPost = async (req, res) => {
    try {
        const { post_number } = req.params; // URL에서 게시글 번호 추출

        // 유효성 검증
        if (!post_number || isNaN(post_number)) {
            return res.status(400).json({ error: 'Invalid post number.' });
        }

        // 댓글 계층 데이터 쿼리 실행
        const query = `
            WITH RECURSIVE comment_hierarchy AS (
                SELECT 
                    comment_number AS id,
                    parent_comment_number AS parent_id,
                    post_number,
                    content,
                    created_at,
                    deleted_at,
                    comment_state
                FROM comments
                WHERE post_number = $1 AND comment_state = 1 -- 특정 게시글의 활성 댓글만 가져오기

                UNION ALL

                SELECT 
                    c.comment_number AS id,
                    c.parent_comment_number AS parent_id,
                    c.post_number,
                    c.content,
                    c.created_at,
                    c.deleted_at,
                    c.comment_state
                FROM comments c
                INNER JOIN comment_hierarchy ch ON c.parent_comment_number = ch.id -- 부모 댓글 ID와 현재 댓글의 상위 댓글 번호를 매칭
            )
            SELECT * FROM comment_hierarchy ORDER BY created_at; -- 댓글과 대댓글을 생성 시간 순으로 정렬
        `;

        const result = await pool.query(query, [post_number]);

        // 댓글 계층 구조로 변환
        const buildHierarchy = (comments) => {
            const map = {};
            const roots = [];

            comments.forEach((comment) => {
                map[comment.id] = { ...comment, replies: [] };
            });

            comments.forEach((comment) => {
                if (comment.parent_id) {
                    map[comment.parent_id]?.replies.push(map[comment.id]);
                } else {
                    roots.push(map[comment.id]);
                }
            });

            return roots;
        };

        const commentsHierarchy = buildHierarchy(result.rows);

        res.status(200).json({
            message: 'Comments fetched successfully.',
            comments: commentsHierarchy,
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments.' });
    }
};