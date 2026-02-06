-- =========================================================
-- Database: rick_morty
-- =========================================================

CREATE DATABASE IF NOT EXISTS rick_morty
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE rick_morty;

-- =========================================================
-- Table: episodes
-- =========================================================

CREATE TABLE episodes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    api_id INT UNSIGNED NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    air_date DATE NULL,
    episode_code VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB;

CREATE INDEX idx_episodes_name ON episodes(name);
CREATE INDEX idx_episodes_air_date ON episodes(air_date);

-- =========================================================
-- Table: characters
-- =========================================================

CREATE TABLE characters (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    api_id INT UNSIGNED NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NULL,
    species VARCHAR(100) NULL,
    gender VARCHAR(50) NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB;

CREATE INDEX idx_characters_name ON characters(name);

-- =========================================================
-- Pivot Table: character_episode
-- =========================================================

CREATE TABLE character_episode (
    episode_id BIGINT UNSIGNED NOT NULL,
    character_id BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (episode_id, character_id),

    CONSTRAINT fk_character_episode_episode
        FOREIGN KEY (episode_id)
        REFERENCES episodes(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_character_episode_character
        FOREIGN KEY (character_id)
        REFERENCES characters(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;