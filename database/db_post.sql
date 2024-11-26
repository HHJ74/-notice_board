CREATE TABLE posts (
    post_number   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- 사용자 고유 번호, 자동 증가
    user_number   INT             NOT NULL,                -- 게시글 작성자의 사용자 번호 (users 테이블 참조)
    post_title    VARCHAR(50)     NOT NULL,                -- 게시글 제목, 최대 50자
    post_content  TEXT            NOT NULL,                -- 게시글 내용, 길이 제한 없음
    created_date  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP NOT NULL, -- 게시글 생성 날짜
    edited_date   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP, -- 게시글 수정 날짜 (최초 생성 시 시간)
    deleted_date  TIMESTAMP       NULL,                    -- 게시글 삭제 날짜 (논리적 삭제용)
    post_state    SMALLINT        NOT NULL DEFAULT 1,       -- 게시글 상태 (1: 활성, 0: 비활성 등)
    is_secret     SMALLINT        NOT NULL DEFAULT 1,       -- 게시글 비공개 여부 (1: 비공개, 0: 공개)
    post_pw       VARCHAR(255)    NULL,                    -- 비공개 게시글 비밀번호 (공개 게시글은 NULL)
    CONSTRAINT FK_users_TO_posts FOREIGN KEY (user_number)  -- 외래 키 설정
        REFERENCES users (user_number) ON DELETE CASCADE   -- users 테이블의 user_number와 참조 관계
);

-- 수정날짜 갱신 트리거
CREATE OR REPLACE FUNCTION update_edited_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.edited_date = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_edited_date
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_edited_date();




-- CREATE TABLE `posts` (
-- 	`post_number`	INT	NOT NULL,
-- 	`user_number`	INT	NOT NULL,
-- 	`post_title`	VARCHAR(50)	NOT NULL,
-- 	`post_content`	text	NOT NULL,
-- 	`created_date`	DEFAULT CURRENT_TIMESTAMP	NOT NULL,
-- 	`edited_date`	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP	NULL,
-- 	`deleted_date`	NULL	NULL,
-- 	`post_state`	TINYINT	NOT NULL DEFAULT 1,
-- 	`is_secret`	TINYINT	NOT NULL DEFAULT 1,
-- 	`post_pw`	VARCHAR(255)	NULL
-- );

-- ALTER TABLE `posts` ADD CONSTRAINT `PK_POSTS` PRIMARY KEY (
-- 	`post_number`,
-- 	`user_number`
-- );

-- ALTER TABLE `posts` ADD CONSTRAINT `FK_users_TO_posts_1` FOREIGN KEY (
-- 	`user_number`
-- )
-- REFERENCES `users` (
-- 	`user_number`
-- );

