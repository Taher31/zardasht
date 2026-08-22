-- Admin panel schema.
-- Run once via phpMyAdmin (or `mysql -u ... -p dbname < schema.sql`) to create all tables.
-- Safe to re-run: every statement uses IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS news_posts (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(191) NOT NULL UNIQUE,
  post_date DATE NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  title_en VARCHAR(255) NOT NULL,
  title_fa VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255) NOT NULL,
  title_ru VARCHAR(255) NOT NULL,
  excerpt_en TEXT NOT NULL,
  excerpt_fa TEXT NOT NULL,
  excerpt_ar TEXT NOT NULL,
  excerpt_ru TEXT NOT NULL,
  body_en JSON NOT NULL,
  body_fa JSON NOT NULL,
  body_ar JSON NOT NULL,
  body_ru JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_contact (
  id TINYINT UNSIGNED PRIMARY KEY,
  address_en VARCHAR(500) NOT NULL,
  address_fa VARCHAR(500) NOT NULL,
  address_ar VARCHAR(500) NOT NULL,
  address_ru VARCHAR(500) NOT NULL,
  address_label_en VARCHAR(64) NOT NULL,
  address_label_fa VARCHAR(64) NOT NULL,
  address_label_ar VARCHAR(64) NOT NULL,
  address_label_ru VARCHAR(64) NOT NULL,
  phone_en VARCHAR(64) NOT NULL,
  phone_fa VARCHAR(64) NOT NULL,
  phone_ar VARCHAR(64) NOT NULL,
  phone_ru VARCHAR(64) NOT NULL,
  email_en VARCHAR(191) NOT NULL,
  email_fa VARCHAR(191) NOT NULL,
  email_ar VARCHAR(191) NOT NULL,
  email_ru VARCHAR(191) NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_site_contact_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_sections (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  section_key VARCHAR(64) NOT NULL UNIQUE,
  badge VARCHAR(16) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  title_en VARCHAR(255) NOT NULL,
  title_fa VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255) NOT NULL,
  title_ru VARCHAR(255) NOT NULL,
  description_en TEXT NOT NULL,
  description_fa TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_items (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  section_id INT UNSIGNED NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  name_en VARCHAR(255) NOT NULL,
  name_fa VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  name_ru VARCHAR(255) NOT NULL,
  description_en TEXT NOT NULL,
  description_fa TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  tag_en VARCHAR(64) NOT NULL,
  tag_fa VARCHAR(64) NOT NULL,
  tag_ar VARCHAR(64) NOT NULL,
  tag_ru VARCHAR(64) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_product_items_section FOREIGN KEY (section_id) REFERENCES product_sections(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trade_countries (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  country_code VARCHAR(2) NOT NULL,
  country_name VARCHAR(128) NOT NULL,
  capital VARCHAR(128) NOT NULL,
  currency VARCHAR(128) NOT NULL,
  status TINYINT(1) NOT NULL DEFAULT 0,
  notes TEXT NOT NULL,
  main_exports JSON NOT NULL,
  main_imports JSON NOT NULL,
  compliance_notes TEXT NOT NULL,
  page_slug VARCHAR(64) NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trade_country_names (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  country_id INT UNSIGNED NOT NULL,
  lang ENUM('fa','ar','ru') NOT NULL,
  name VARCHAR(128) NOT NULL,
  UNIQUE KEY uniq_country_lang (country_id, lang),
  CONSTRAINT fk_trade_country_names_country FOREIGN KEY (country_id) REFERENCES trade_countries(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trade_country_notes (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  country_id INT UNSIGNED NOT NULL,
  lang ENUM('fa','ar','ru') NOT NULL,
  note TEXT NOT NULL,
  UNIQUE KEY uniq_country_lang (country_id, lang),
  CONSTRAINT fk_trade_country_notes_country FOREIGN KEY (country_id) REFERENCES trade_countries(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trade_translation_terms (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  term_type ENUM('item','compliance') NOT NULL,
  source_en VARCHAR(500) NOT NULL,
  translation_fa VARCHAR(500) NOT NULL DEFAULT '',
  translation_ar VARCHAR(500) NOT NULL DEFAULT '',
  translation_ru VARCHAR(500) NOT NULL DEFAULT '',
  UNIQUE KEY uniq_term (term_type, source_en(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
