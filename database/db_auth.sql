CREATE TABLE `users` (
    `user_number`   INT             NOT NULL AUTO_INCREMENT, -- 사용자 고유 번호, 자동 증가
    `user_id`       VARCHAR(50)     NOT NULL,                -- 사용자 ID, 최대 50자
    `user_pw`       VARCHAR(255)    NOT NULL,                -- 암호화된 사용자 비밀번호, 최대 255자
    `user_name`     VARCHAR(10)     NOT NULL,                -- 사용자 이름, 최대 10자
    `user_nick`     VARCHAR(50)     NOT NULL,                -- 사용자 닉네임, 최대 50자
    `created_date`  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP NOT NULL, -- 계정 생성 날짜 (현재 시간 자동 입력)
    `deleted_date`  TIMESTAMP       NULL,                    -- 계정 삭제 날짜 (논리적 삭제용)
    `user_state`    TINYINT         NOT NULL DEFAULT 1,       -- 계정 상태 (1: 활성, 0: 비활성 등)
    PRIMARY KEY (`user_number`)                             -- `user_number`를 기본 키로 설정
);

-- CREATE TABLE `users` (
-- 	`user_number`	INT	NOT NULL,
-- 	`user_id`	VARCHAR(50)	NOT NULL,
-- 	`user_pw`	VARCHAR(255)	NOT NULL,
-- 	`user_name`	VARCHAR(10)	NOT NULL,
-- 	`user_nick`	VARCHAR(50)	NOT NULL,
-- 	`created_date`	DEFAULT CURRENT_TIMESTAMP	NOT NULL,
-- 	`deleted_date`	NULL	NULL,
-- 	`user_state`	TINYINT	NOT NULL DEFAULT 1
-- );


-- ALTER TABLE `users` ADD CONSTRAINT `PK_USERS` PRIMARY KEY (
-- 	`user_number`
-- );

