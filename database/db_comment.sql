-- 댓글 테이블 생성
CREATE TABLE comments (
    comment_number SERIAL PRIMARY KEY,        -- 댓글 ID (고유 키)
    post_number INT NOT NULL,                 -- 게시글 ID (외부 테이블 posts 참조)
    parent_comment_number INT NULL,           -- 상위 댓글 ID (자기참조)
    content TEXT NOT NULL,                    -- 댓글 내용
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 생성 시간
    deleted_at TIMESTAMP NULL,                -- 삭제 시간 (논리 삭제 시 기록)
    comment_state SMALLINT DEFAULT 1 NOT NULL,      -- 댓글 상태 (1: 활성, 0: 비활성)
    CONSTRAINT fk_parent_comment
        FOREIGN KEY (parent_comment_number) REFERENCES comments (comment_number)
        ON DELETE SET NULL,                   -- 상위 댓글 삭제 시 NULL로 설정
    CONSTRAINT fk_post_comment
        FOREIGN KEY (post_number) REFERENCES posts (post_number)
        ON DELETE CASCADE                     -- 게시글 삭제 시 관련 댓글 삭제
);
