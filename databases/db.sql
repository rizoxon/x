\! clear
\! echo "--------------- X ---------------";
\W

DROP DATABASE IF EXISTS x;
CREATE DATABASE IF NOT EXISTS x CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE x;

SET NAMES utf8mb4;


-- -----------------------------------------------------------
-- -----------------------------------------------------------
-- ----------------------------------------------------------- X
-- -----------------------------------------------------------
-- -----------------------------------------------------------

-- -------------------------- genders
CREATE TABLE IF NOT EXISTS `genders` (
  `id` INT NOT NULL UNIQUE auto_increment,
  `name` VARCHAR(10) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);
INSERT INTO genders (name)
  VALUES
    ("unknown"),
    ("male"),
    ("female")
;

-- -------------------------- user_authenticity_status
CREATE TABLE IF NOT EXISTS `user_authenticity_statuses` (
  `id` INT NOT NULL UNIQUE auto_increment,
  `name` VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);
INSERT INTO user_authenticity_statuses (name)
  VALUES
    ("unauthenticated"),
    ("unauthorized"),
    ("authorized")
;

-- -------------------------- user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` INT NOT NULL UNIQUE auto_increment,
  `name` VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);
INSERT INTO user_roles (name)
  VALUES
    ("root"),
    ("dev"),
    ("admin")
;

-- -------------------------- user_states
CREATE TABLE IF NOT EXISTS `user_states` (
  `id` INT NOT NULL UNIQUE auto_increment,
  `name` VARCHAR(10) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);
INSERT INTO user_states (name)
  VALUES
    ("active"),
    ("inactive"),
    ("deleted"),
    ("suspended")
;

-- -------------------------- user_plans
CREATE TABLE IF NOT EXISTS `user_plans` (
  `id` INT NOT NULL UNIQUE auto_increment,
  `name` VARCHAR(10) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);
INSERT INTO user_plans (name)
  VALUES
    ("free"),
    ("pro"),
    ("business")
;

-- -------------------------- currencies
-- https://en.wikipedia.org/wiki/List_of_circulating_currencies
-- decimal_digits is The number of digits after the decimal separator (By wikipedia)
-- UZS https://en.wikipedia.org/wiki/Uzbekistani_so%CA%BBm
-- RUB https://en.wikipedia.org/wiki/Russian_ruble

CREATE TABLE IF NOT EXISTS `currencies` (
  `id` INT NOT NULL UNIQUE auto_increment,
  `code` VARCHAR(3) NOT NULL UNIQUE,
  `decimal_digits` INT NULL,
  `fractional_unit` VARCHAR(10) NULL,
  `symbol` VARCHAR(3) NULL,
  `native_name` VARCHAR(30) NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO currencies (code, decimal_digits, fractional_unit, symbol, native_name)
  VALUES
    ("UZS", 2, "Tiyin", NULL, "Oʻzbek soʻmi"),
    ("USD", 2, "Cent", "$", "United States dollar"),
    ("RUB", 2, "Копейка", "₽", "Российский рубль")
;

-- -------------------------- languages
CREATE TABLE IF NOT EXISTS `languages` (
  `id` INT NOT NULL UNIQUE auto_increment,
  `code` VARCHAR(3) NOT NULL UNIQUE,
  `native_name` VARCHAR(50) NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO languages (code, native_name)
  VALUES
    ("en", "English"),
    ("uz", "Uzbek, Ўзбек, أۇزبېك‎"),
    ("ru", "Русский язык"),
    ("ja", "日本語 (にほんご／にっぽんご)")
;

-- -------------------------- app_color_mode
-- 1 Is For Dark Mode
-- 2 Is For Light Mode

CREATE TABLE IF NOT EXISTS `app_color_modes` (
  `id` INT NOT NULL UNIQUE auto_increment,
  `name` VARCHAR(10) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);
INSERT INTO app_color_modes (name)
  VALUES
    ("dark"),
    ("light")
;

-- -------------------------- users
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL UNIQUE auto_increment,
  `username` VARCHAR(100) NULL UNIQUE,
  `password` VARCHAR(100) NOT NULL UNIQUE,
  `password_salt` VARCHAR(100),

  `eMail` VARCHAR(100) NOT NULL UNIQUE,
  `eMail_verified` TINYINT NOT NULL DEFAULT 0,
  `eMail_verification_code` INT NULL,
  `eMail_verification_attempts_count` INT NOT NULL DEFAULT 0,

  `phone_number` VARCHAR(15) NULL UNIQUE,
  `phone_number_verified` TINYINT NOT NULL DEFAULT 0,
  `phone_number_verification_code` INT NULL,
  `phone_number_verification_attempt` INT NOT NULL DEFAULT 0,

  `firstname` VARCHAR(100),
  `lastname` VARCHAR(100),
  `birth_date` DATE NULL,
  `gender` INT NULL,

  `profile_picture` VARCHAR(100) NULL,
  `cover_picture` VARCHAR(100) NULL,
  `background_picture` VARCHAR(100) NULL,

  `authenticity_status` INT NULL,
  `state` INT NULL,
  `plan` INT NULL,

  `currency` INT NULL,
  `app_language` INT NULL,
  `app_color_mode` INT NULL DEFAULT 1,

  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (gender) REFERENCES genders(id) ON DELETE SET NULL,

  FOREIGN KEY (authenticity_status) REFERENCES user_authenticity_statuses(id) ON DELETE SET NULL,
  FOREIGN KEY (state) REFERENCES user_states(id) ON DELETE SET NULL,
  FOREIGN KEY (plan) REFERENCES user_plans(id) ON DELETE SET NULL,

  FOREIGN KEY (currency) REFERENCES currencies(id) ON DELETE SET NULL,
  FOREIGN KEY (app_language) REFERENCES languages(id) ON DELETE SET NULL,
  FOREIGN KEY (app_color_mode) REFERENCES app_color_modes(id) ON DELETE SET NULL,

  PRIMARY KEY (`id`)
);

-- -------------------------- users_roles
CREATE TABLE IF NOT EXISTS `users_roles` (
  `id` INT NOT NULL UNIQUE auto_increment,
  `user` INT NOT NULL,
  `role` INT NOT NULL,

  FOREIGN KEY (`user`) REFERENCES users(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`role`) REFERENCES user_roles(`id`) ON DELETE CASCADE,

  CONSTRAINT `unique_users_roles` UNIQUE (`user`, `role`),

  PRIMARY KEY (`id`)
);
