const pool = require('../database/database'); // 데이터베이스 연결 모듈 가져오기

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

// 특정 게시물 조회
exports.getPostByPostNum = async (req, res) => {
    try {
        const { post_number } = req.params; // URL 파라미터에서 게시물 ID 추출

        // 유효성 검증
        if (!post_number || isNaN(post_number)) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }

        // 데이터베이스에서 게시물 조회
        const query = 'SELECT * FROM posts WHERE post_number = $1';
        const result = await pool.query(query, [post_number]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(result.rows[0]); // 게시물 반환
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
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
            INSERT INTO posts (user_number, post_title, post_content, created_date)
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

// 게시글 수정
exports.updatePost = async (req, res) => {
    try {
        const { post_number } = req.params; // URL 파라미터에서 게시글 번호 추출
        const { title, content, is_secret, post_pw } = req.body; // 요청 본문에서 데이터 추출

        // 유효성 검증
        if (!post_number || isNaN(post_number)) {
            return res.status(400).json({ error: 'Invalid post number' });
        }

        // 업데이트할 필드가 하나라도 있어야 함
        if (!title && !content && is_secret === undefined && !post_pw) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }

        // 동적 쿼리 작성
        const fields = [];  // 동적으로 추가될 쿼리 필드 저장
        const values = [];  // 각 필드에 해당하는 값 저장
        let counter = 1;    // 파라미터 순번 관리 (PostgreSQL에서 $1, $2 같은 placeholder를 사용)

        if (title) {
            fields.push(`post_title = $${counter++}`);
            values.push(title);
        }
        if (content) {
            fields.push(`post_content = $${counter++}`);
            values.push(content);
        }
        if (is_secret !== undefined) {
            fields.push(`is_secret = $${counter++}`);
            values.push(is_secret);
        }
        if (post_pw) {
            fields.push(`post_pw = $${counter++}`);
            values.push(post_pw);
        }

        // 쿼리 실행
        const query = `
            UPDATE posts
            SET ${fields.join(', ')}, edited_date = CURRENT_TIMESTAMP
            WHERE post_number = $${counter}
            RETURNING *`;
        values.push(post_number);

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({
            message: 'Post updated successfully',
            post: result.rows[0], // 수정된 게시글 반환
        });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
};
