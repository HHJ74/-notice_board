CREATE TABLE `posts` (
	`post_number`	INT	NOT NULL,
	`user_number`	INT	NOT NULL,
	`post_title`	VARCHAR(50)	NOT NULL,
	`post_content`	text	NOT NULL,
	`created_date`	DEFAULT CURRENT_TIMESTAMP	NOT NULL,
	`edite_date`	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP	NULL,
	`deleted_date`	NULL	NULL,
	`post_state`	TINYINT	NOT NULL	DEFAULT DEFAULT 1,
	`is_secret`	TINYINT	NOT NULL	DEFAULT DEFAULT 1,
	`post_pw`	VARCHAR(255)	NULL
);

ALTER TABLE `posts` ADD CONSTRAINT `PK_POSTS` PRIMARY KEY (
	`post_number`,
	`user_number`
);

ALTER TABLE `posts` ADD CONSTRAINT `FK_users_TO_posts_1` FOREIGN KEY (
	`user_number`
)
REFERENCES `users` (
	`user_number`
);

