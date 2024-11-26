CREATE TABLE `posts` (
    `post_number`   INT             NOT NULL AUTO_INCREMENT, -- 게시글 고유 번호, 자동 증가
    `user_number`   INT             NOT NULL,                -- 게시글 작성자의 사용자 번호 (users 테이블 참조)
    `post_title`    VARCHAR(50)     NOT NULL,                -- 게시글 제목, 최대 50자
    `post_content`  TEXT            NOT NULL,                -- 게시글 내용, 길이 제한 없음
    `created_date`  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP NOT NULL, -- 게시글 생성 날짜 (현재 시간 자동 입력)
    `edited_date`   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL, -- 게시글 수정 날짜 (수정 시 자동 갱신)
    `deleted_date`  TIMESTAMP       NULL,                    -- 게시글 삭제 날짜 (논리적 삭제용)
    `post_state`    TINYINT         NOT NULL DEFAULT 1,       -- 게시글 상태 (1: 활성, 0: 비활성 등)
    `is_secret`     TINYINT         NOT NULL DEFAULT 1,       -- 게시글 비공개 여부 (1: 비공개, 0: 공개)
    `post_pw`       VARCHAR(255)    NULL,                    -- 비공개 게시글 비밀번호 (공개 게시글은 NULL)
    PRIMARY KEY (`post_number`, `user_number`),              -- 복합 기본 키 (게시글 번호 + 사용자 번호)
    CONSTRAINT `FK_users_TO_posts_1` FOREIGN KEY (`user_number`) -- 외래 키 설정 (users 테이블 참조)
        REFERENCES `users` (`user_number`)                   -- users 테이블의 user_number와 참조 관계
);




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

