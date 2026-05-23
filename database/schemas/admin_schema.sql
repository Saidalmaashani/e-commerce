-- ADMIN DATABASE SCHEMA

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50),
  permissions TEXT[],
  is_super_admin BOOLEAN DEFAULT FALSE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(255),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

CREATE TABLE IF NOT EXISTS merchant_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id VARCHAR(255) NOT NULL,
  status VARCHAR(50),
  submitted_at TIMESTAMP,
  reviewed_by UUID REFERENCES admins(id),
  reviewed_at TIMESTAMP,
  feedback TEXT,
  additional_documents_requested BOOLEAN DEFAULT FALSE,
  request_details TEXT,
  approved_tier VARCHAR(50),
  INDEX idx_merchant_id (merchant_id),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS delivery_partner_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_partner_id UUID NOT NULL,
  status VARCHAR(50),
  submitted_at TIMESTAMP,
  reviewed_by UUID REFERENCES admins(id),
  reviewed_at TIMESTAMP,
  feedback TEXT,
  additional_documents_requested BOOLEAN DEFAULT FALSE,
  request_details TEXT,
  INDEX idx_delivery_partner_id (delivery_partner_id),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS audit_trail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admins(id),
  action VARCHAR(255),
  entity_type VARCHAR(100),
  entity_id VARCHAR(255),
  old_value JSONB,
  new_value JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_admin_id (admin_id),
  INDEX idx_entity_type (entity_type),
  INDEX idx_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id VARCHAR(255) NOT NULL,
  complainant_id VARCHAR(255) NOT NULL,
  complainant_type VARCHAR(50),
  complaint_type VARCHAR(100),
  title VARCHAR(255),
  description TEXT,
  supporting_documents TEXT[],
  status VARCHAR(50),
  resolution TEXT,
  resolved_by UUID REFERENCES admins(id),
  resolved_at TIMESTAMP,
  refund_amount DECIMAL(15, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_order_id (order_id),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS flagged_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR(255) NOT NULL,
  merchant_id VARCHAR(255) NOT NULL,
  reason VARCHAR(255),
  ai_confidence DECIMAL(5, 2),
  status VARCHAR(50),
  reviewed_by UUID REFERENCES admins(id),
  decision VARCHAR(50),
  decision_reason TEXT,
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_product_id (product_id),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS platform_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key VARCHAR(255) NOT NULL UNIQUE,
  config_value TEXT,
  value_type VARCHAR(50),
  description TEXT,
  updated_by UUID REFERENCES admins(id),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_config_key (config_key)
);

CREATE TABLE IF NOT EXISTS platform_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  total_users INTEGER,
  active_users INTEGER,
  new_merchants INTEGER,
  new_shoppers INTEGER,
  new_delivery_partners INTEGER,
  total_orders INTEGER,
  total_revenue DECIMAL(15, 2),
  platform_commission DECIMAL(15, 2),
  average_order_value DECIMAL(10, 2),
  return_rate DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_date (date)
);

CREATE TABLE IF NOT EXISTS financial_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_start DATE,
  period_end DATE,
  gross_revenue DECIMAL(15, 2),
  platform_commission DECIMAL(15, 2),
  merchant_payouts DECIMAL(15, 2),
  delivery_payouts DECIMAL(15, 2),
  payment_processing_fees DECIMAL(15, 2),
  refunds DECIMAL(15, 2),
  net_revenue DECIMAL(15, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_period (period_start, period_end)
);

CREATE TABLE IF NOT EXISTS notifications_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id VARCHAR(255),
  recipient_type VARCHAR(50),
  notification_type VARCHAR(100),
  title VARCHAR(255),
  body TEXT,
  delivery_channel VARCHAR(50),
  status VARCHAR(50),
  sent_at TIMESTAMP,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_recipient_id (recipient_id),
  INDEX idx_sent_at (sent_at)
);
