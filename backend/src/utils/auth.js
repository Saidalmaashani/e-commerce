import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.postgres.js';
import { setCache, getCache } from '../config/database.redis.js';

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      merchantId: user.merchantId,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = async (phone, otp, expiryMinutes = 10) => {
  await setCache(`otp:${phone}`, otp, expiryMinutes * 60);
};

export const verifyOTP = async (phone, otp) => {
  const storedOTP = await getCache(`otp:${phone}`);
  return storedOTP === otp;
};

export const generateResetToken = () => {
  return uuidv4();
};

export const storeResetToken = async (email, token, expiryMinutes = 30) => {
  await setCache(`reset-token:${email}`, token, expiryMinutes * 60);
};

export const verifyResetToken = async (email, token) => {
  const storedToken = await getCache(`reset-token:${email}`);
  return storedToken === token;
};
