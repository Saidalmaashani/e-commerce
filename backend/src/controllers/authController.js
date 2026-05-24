import mongoose from 'mongoose';
import { Merchant } from '../models/Merchant.js';
import { hashPassword, generateAccessToken, generateRefreshToken, comparePassword } from '../utils/auth.js';

const shopperSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, default: 'shopper' },
  status: { type: String, default: 'active' },
  lastLogin: Date,
}, { timestamps: true });

const Shopper = mongoose.models.Shopper || mongoose.model('Shopper', shopperSchema);

const deliverySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleType: { type: String, required: true },
  role: { type: String, default: 'delivery' },
  status: { type: String, default: 'pending' },
  lastLogin: Date,
}, { timestamps: true });

const DeliveryPartner = mongoose.models.DeliveryPartner || mongoose.model('DeliveryPartner', deliverySchema);

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' },
  lastLogin: Date,
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export const registerMerchant = async (req, res) => {
  try {
    const { email, password, businessName, businessCategory, businessEmail, phone, storeName } = req.body;
    if (!email || !password || !businessName || !phone) {
      return res.status(400).json({ error: 'Required fields missing' });
    }
    const existing = await Merchant.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const hashedPassword = await hashPassword(password);
    const merchant = await Merchant.create({
      email, password: hashedPassword, phone,
      businessName: businessName || storeName,
      businessCategory: businessCategory || 'General',
      businessEmail: businessEmail || email,
      status: 'pending',
    });
    res.status(201).json({
      success: true,
      message: 'Merchant registered. Pending admin approval.',
      merchant: { id: merchant._id, email: merchant.email, status: merchant.status },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerShopper = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({ error: 'Required fields missing' });
    }
    const existing = await Shopper.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const hashedPassword = await hashPassword(password);
    const shopper = await Shopper.create({ email, password: hashedPassword, firstName, lastName, phone });
    const accessToken = generateAccessToken({ id: shopper._id, email: shopper.email, role: 'shopper' });
    const refreshToken = generateRefreshToken({ id: shopper._id, email: shopper.email, role: 'shopper' });
    res.status(201).json({
      success: true,
      message: 'Shopper registered successfully',
      accessToken, refreshToken,
      user: { id: shopper._id, email: shopper.email, role: 'shopper', firstName, lastName },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerDeliveryPartner = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, vehicleType } = req.body;
    if (!email || !password || !firstName || !lastName || !phone || !vehicleType) {
      return res.status(400).json({ error: 'Required fields missing' });
    }
    const existing = await DeliveryPartner.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const hashedPassword = await hashPassword(password);
    await DeliveryPartner.create({ email, password: hashedPassword, firstName, lastName, phone, vehicleType });
    res.status(201).json({ success: true, message: 'Delivery partner registered. Pending admin approval.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    let user = null;
    let userRole = role || 'shopper';

    if (role === 'admin') {
      user = await Admin.findOne({ email });
      if (user) userRole = 'admin';
    } else if (role === 'merchant') {
      user = await Merchant.findOne({ email });
      if (user) userRole = 'merchant';
    } else if (role === 'delivery') {
      user = await DeliveryPartner.findOne({ email });
      if (user) userRole = 'delivery';
    } else {
      user = await Shopper.findOne({ email });
      if (user) userRole = 'shopper';
    }

    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid email or password' });

    if ((userRole === 'merchant' || userRole === 'delivery') && user.status === 'pending') {
      return res.status(403).json({ error: 'Account pending admin approval', status: 'pending' });
    }

    user.lastLogin = new Date();
    await user.save();

    const accessToken = generateAccessToken({ id: user._id, email: user.email, role: userRole });
    const refreshToken = generateRefreshToken({ id: user._id, email: user.email, role: userRole });

    res.json({
      success: true,
      accessToken, refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: userRole,
        name: user.businessName || user.firstName || user.name || email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  res.json({ success: true });
};

export const logout = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};

export const verifyOTP = async (req, res) => {
  res.json({ success: true, message: 'OTP verified' });
};

export const sendOTP = async (req, res) => {
  res.json({ success: true, message: 'OTP sent' });
};

export const resetPassword = async (req, res) => {
  res.json({ success: true, message: 'Password reset successfully' });
};

export const sendPasswordReset = async (req, res) => {
  res.json({ success: true, message: 'Reset link sent' });
};

export const createDefaultAdmin = async () => {
  try {
    const existing = await Admin.findOne({ email: 'admin@shophub.com' });
    if (!existing) {
      const hashedPassword = await hashPassword('Admin@123456');
      await Admin.create({ email: 'admin@shophub.com', password: hashedPassword, name: 'Super Admin', role: 'admin' });
      console.log('✓ Default admin created: admin@shophub.com / Admin@123456');
    }
  } catch (error) {
    console.error('Failed to create default admin:', error);
  }
};
