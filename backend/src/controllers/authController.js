import { Merchant } from '../models/Merchant.js';
import { hashPassword, generateAccessToken, generateRefreshToken, comparePassword, generateOTP, storeOTP, verifyOTP as verifyOTPUtil, generateResetToken, storeResetToken, verifyResetToken } from '../utils/auth.js';
import { registerSchema, loginSchema, merchantRegistrationSchema, shopperRegistrationSchema, deliveryPartnerRegistrationSchema } from '../validators/authValidator.js';

export const registerMerchant = async (req, res) => {
  try {
    const { error, value } = merchantRegistrationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({ field: d.path.join('.'), message: d.message })),
      });
    }

    // Check if merchant already exists
    const existingMerchant = await Merchant.findOne({ email: value.email });
    if (existingMerchant) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hashPassword(value.password);

    // Create merchant
    const merchant = await Merchant.create({
      email: value.email,
      password: hashedPassword,
      phone: value.phone,
      businessName: value.businessName,
      businessCategory: value.businessCategory,
      businessEmail: value.businessEmail,
      kycDocuments: {
        businessLicense: { url: value.businessLicense },
        nationalId: { url: value.nationalId },
        bankDetails: {
          accountNumber: value.bankAccountNumber,
          routingNumber: value.bankRoutingNumber,
          holderName: value.bankHolderName,
        },
        address: {
          street: value.address,
          city: value.city,
          state: value.state,
          postalCode: value.postalCode,
          country: value.country,
        },
      },
      status: 'pending',
    });

    // Send verification email (implement with SendGrid)
    // await sendVerificationEmail(merchant.email);

    res.status(201).json({
      message: 'Merchant registered successfully. Pending admin approval.',
      merchant: {
        id: merchant._id,
        email: merchant.email,
        status: merchant.status,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerShopper = async (req, res) => {
  try {
    const { error, value } = shopperRegistrationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({ field: d.path.join('.'), message: d.message })),
      });
    }

    // Send OTP to phone
    const otp = generateOTP();
    await storeOTP(value.phone, otp);

    // Send OTP via Twilio (implement)
    // await sendOTP(value.phone, otp);

    res.status(200).json({
      message: 'OTP sent to your phone. Please verify to complete registration.',
      phone: value.phone,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerDeliveryPartner = async (req, res) => {
  try {
    const { error, value } = deliveryPartnerRegistrationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({ field: d.path.join('.'), message: d.message })),
      });
    }

    // Similar to merchant registration - pending admin approval
    res.status(201).json({
      message: 'Delivery partner registration submitted. Pending admin approval.',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({ field: d.path.join('.'), message: d.message })),
      });
    }

    // Find user by email (check all user types)
    const merchant = await Merchant.findOne({ email: value.email });

    if (!merchant) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await comparePassword(value.password, merchant.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if merchant is approved
    if (merchant.status !== 'approved' && merchant.role === 'merchant') {
      return res.status(403).json({
        error: 'Your account is not yet approved. Please wait for admin approval.',
        status: merchant.status,
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(merchant);
    const refreshToken = generateRefreshToken(merchant);

    // Update last login
    merchant.lastLogin = new Date();
    merchant.loginAttempts = 0;
    await merchant.save();

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: merchant._id,
        email: merchant.email,
        role: 'merchant',
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    // Verify and decode token (implementation)
    const newAccessToken = generateAccessToken({ id: 'user-id' });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export const logout = async (req, res) => {
  try {
    // Blacklist token in Redis
    // Implementation pending

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP required' });
    }

    const isValid = await verifyOTPUtil(phone, otp);

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Phone number required' });
    }

    const otp = generateOTP();
    await storeOTP(phone, otp);

    // Send via Twilio (implement)
    // await sendOTPViaTwilio(phone, otp);

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword, resetToken } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const isValidToken = await verifyResetToken(email, resetToken);

    if (!isValidToken) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const hashedPassword = await hashPassword(newPassword);

    // Update merchant password
    await Merchant.updateOne({ email }, { password: hashedPassword });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const merchant = await Merchant.findOne({ email });

    if (!merchant) {
      // Don't reveal if email exists for security
      return res.json({ message: 'If an account exists, you will receive a password reset link.' });
    }

    const token = generateResetToken();
    await storeResetToken(email, token);

    // Send reset link via SendGrid (implement)
    // const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;
    // await sendResetEmail(email, resetLink);

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
