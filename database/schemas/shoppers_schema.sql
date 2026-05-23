-- SHOPPERS DATABASE SCHEMA

CREATE TABLE IF NOT EXISTS shoppers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  social_provider VARCHAR(50),
  social_id VARCHAR(255),
  language VARCHAR(10) DEFAULT 'en',
  currency VARCHAR(10) DEFAULT 'USD',
  notification_preferences JSONB,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT TRUE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(255),
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(15, 2) DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  last_login TIMESTAMP,
  login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_phone (phone),
  INDEX idx_email (email),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopper_id UUID NOT NULL REFERENCES shoppers(id) ON DELETE CASCADE,
  label VARCHAR(50),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  street_address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_default BOOLEAN DEFAULT FALSE,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_shopper_id (shopper_id),
  INDEX idx_is_default (is_default)
);

CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopper_id UUID NOT NULL REFERENCES shoppers(id) ON DELETE CASCADE,
  product_id VARCHAR(255) NOT NULL,
  store_id VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  variant_id VARCHAR(255),
  gift_wrap BOOLEAN DEFAULT FALSE,
  gift_message TEXT,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_shopper_id (shopper_id),
  INDEX idx_product_id (product_id)
);

CREATE TABLE IF NOT EXISTS shopper_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) NOT NULL UNIQUE,
  shopper_id UUID NOT NULL REFERENCES shoppers(id) ON DELETE RESTRICT,
  total_items INTEGER,
  subtotal DECIMAL(15, 2),
  shipping_cost DECIMAL(10, 2),
  tax_amount DECIMAL(10, 2),
  discount_amount DECIMAL(10, 2),
  total_amount DECIMAL(15, 2) NOT NULL,
  payment_method VARCHAR(50),
  payment_status VARCHAR(50),
  delivery_address_id UUID REFERENCES addresses(id),
  delivery_date DATE,
  delivery_type VARCHAR(50),
  estimated_delivery DATE,
  actual_delivery DATE,
  order_status VARCHAR(50),
  delivery_partner_id VARCHAR(255),
  notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_shopper_id (shopper_id),
  INDEX idx_order_status (order_status),
  INDEX idx_order_number (order_number)
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES shopper_orders(id) ON DELETE CASCADE,
  product_id VARCHAR(255) NOT NULL,
  store_id VARCHAR(255) NOT NULL,
  product_name VARCHAR(255),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2),
  total_price DECIMAL(15, 2),
  variant_id VARCHAR(255),
  return_requested BOOLEAN DEFAULT FALSE,
  return_reason TEXT,
  return_approved BOOLEAN DEFAULT FALSE,
  INDEX idx_order_id (order_id),
  INDEX idx_product_id (product_id)
);

CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopper_id UUID NOT NULL REFERENCES shoppers(id) ON DELETE CASCADE,
  name VARCHAR(100) DEFAULT 'My Wishlist',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_shopper_id (shopper_id)
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
  product_id VARCHAR(255) NOT NULL,
  store_id VARCHAR(255) NOT NULL,
  price_at_save DECIMAL(10, 2),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_wishlist_id (wishlist_id),
  INDEX idx_product_id (product_id)
);

CREATE TABLE IF NOT EXISTS loyalty_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopper_id UUID NOT NULL REFERENCES shoppers(id) ON DELETE CASCADE,
  points_balance INTEGER DEFAULT 0,
  lifetime_points INTEGER DEFAULT 0,
  points_tier VARCHAR(50),
  tier_expiry DATE,
  last_redeemed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_shopper_id (shopper_id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id UUID REFERENCES order_items(id),
  product_id VARCHAR(255) NOT NULL,
  store_id VARCHAR(255) NOT NULL,
  shopper_id UUID NOT NULL REFERENCES shoppers(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  review_text TEXT,
  photos_urls TEXT[],
  video_url TEXT,
  is_verified_purchase BOOLEAN DEFAULT TRUE,
  helpful_count INTEGER DEFAULT 0,
  unhelpful_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_product_id (product_id),
  INDEX idx_shopper_id (shopper_id),
  INDEX idx_rating (rating)
);

CREATE TABLE IF NOT EXISTS shopper_wallet (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopper_id UUID NOT NULL UNIQUE REFERENCES shoppers(id) ON DELETE CASCADE,
  balance DECIMAL(15, 2) DEFAULT 0,
  total_credits DECIMAL(15, 2) DEFAULT 0,
  total_cashback DECIMAL(15, 2) DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_shopper_id (shopper_id)
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES shopper_wallet(id),
  transaction_type VARCHAR(50),
  amount DECIMAL(15, 2),
  description TEXT,
  reference_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_wallet_id (wallet_id)
);
