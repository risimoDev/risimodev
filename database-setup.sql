-- Create database
CREATE DATABASE IF NOT EXISTS app_marketplace;
USE app_marketplace;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create site_texts table
CREATE TABLE IF NOT EXISTS site_texts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default site texts
INSERT IGNORE INTO site_texts (`key`, value) VALUES 
('site_title', 'App & Website Marketplace'),
('site_description', 'We create amazing mobile apps and custom websites for businesses of all sizes.'),
('hero_title', 'Professional Mobile Apps & Custom Websites'),
('hero_subtitle', 'Transform your ideas into reality with our expert development team'),
('portfolio_title', 'Our Portfolio'),
('services_title', 'Our Services'),
('contact_title', 'Get In Touch'),
('contact_subtitle', 'Have a project in mind? Reach out to us and let''s build something amazing together.');