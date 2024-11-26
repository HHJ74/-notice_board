CREATE TABLE `users` (
	`user_number`	INT	NOT NULL,
	`user_id`	VARCHAR(50)	NOT NULL,
	`user_pw`	VARCHAR(255)	NOT NULL,
	`user_name`	VARCHAR(10)	NOT NULL,
	`user_nick`	VARCHAR(50)	NOT NULL,
	`created_date`	DEFAULT CURRENT_TIMESTAMP	NOT NULL,
	`deleted_date`	NULL	NULL,
	`user_state`	TINYINT	NOT NULL DEFAULT 1
);


ALTER TABLE `users` ADD CONSTRAINT `PK_USERS` PRIMARY KEY (
	`user_number`
);


