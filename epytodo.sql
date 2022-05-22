CREATE SCHEMA IF NOT EXISTS epytodo;
USE epytodo;

CREATE TABLE `epytodo`.`user` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `epytodo`.`todo` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `due_time` datetime NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT "not started" COMMENT 'not started by default / todo / in progress / done',
  `user_id` int unsigned NOT NULL
);

ALTER TABLE `todo` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);