-- SHARED DATABASE SCHEMA

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_url TEXT,
  parent_id UUID REFERENCES categories(id),
  level INTEGER,
  sort_order INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_parent_id (parent_id),
  INDEX idx_level (level)
);

CREATE TABLE IF NOT EXISTS platform_coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  discount_type VARCHAR(50),
  discount_value DECIMAL(10, 2),
  discount_percent DECIMAL(5, 2),
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  min_order_value DECIMAL(10, 2),
  max_discount_amount DECIMAL(10, 2),
  applicable_categories TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_code (code),
  INDEX idx_valid_until (valid_until)
);

CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  banner_type VARCHAR(50),
  placement VARCHAR(50),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_placement (placement),
  INDEX idx_end_date (end_date)
);

CREATE TABLE IF NOT EXISTS countries (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(3),
  phone_code VARCHAR(5),
  currency VARCHAR(3),
  timezone VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  INDEX idx_code (code)
);

CREATE TABLE IF NOT EXISTS currencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(3) NOT NULL UNIQUE,
  name VARCHAR(100),
  symbol VARCHAR(5),
  exchange_rate DECIMAL(10, 6),
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_code (code)
);

CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  provider VARCHAR(50),
  is_enabled BOOLEAN DEFAULT TRUE,
  configuration JSONB,
  commission_percent DECIMAL(5, 2),
  min_transaction DECIMAL(10, 2),
  max_transaction DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_provider (provider)
);

INSERT INTO categories (name, slug, description, level) VALUES
('Electronics', 'electronics', 'Electronic devices and gadgets', 1),
('Clothing', 'clothing', 'Apparel and fashion items', 1),
('Home & Kitchen', 'home-kitchen', 'Furniture and kitchen items', 1),
('Books', 'books', 'Books and digital content', 1),
('Sports', 'sports', 'Sports and outdoor equipment', 1);

INSERT INTO countries (id, name, code, phone_code, currency, timezone) VALUES
(1, 'United States', 'US', '+1', 'USD', 'America/New_York'),
(2, 'United Kingdom', 'GB', '+44', 'GBP', 'Europe/London'),
(3, 'Pakistan', 'PK', '+92', 'PKR', 'Asia/Karachi'),
(4, 'Saudi Arabia', 'SA', '+966', 'SAR', 'Asia/Riyadh'),
(5, 'United Arab Emirates', 'AE', '+971', 'AED', 'Asia/Dubai');

INSERT INTO currencies (code, name, symbol, exchange_rate) VALUES
('USD', 'US Dollar', '$', 1.0),
('GBP', 'British Pound', '£', 0.79),
('PKR', 'Pakistani Rupee', '₨', 278.5),
('SAR', 'Saudi Riyal', '﷼', 3.75),
('AED', 'UAE Dirham', 'د.إ', 3.67);
