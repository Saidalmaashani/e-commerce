import express from 'express';
import { registerMerchant, registerShopper, registerDeliveryPartner, login, refreshToken, logout, verifyOTP, sendOTP, resetPassword, sendPasswordReset } from '../controllers/authController.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Registration routes
router.post('/register/merchant', authRateLimiter, registerMerchant);
router.post('/register/shopper', authRateLimiter, registerShopper);
router.post('/register/delivery', authRateLimiter, registerDeliveryPartner);

// Login/Logout
router.post('/login', authRateLimiter, login);
router.post('/logout', verifyToken, logout);

// Token management
router.post('/refresh-token', refreshToken);

// OTP verification
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Password reset
router.post('/forgot-password', sendPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
