import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/[A-Z]/).pattern(/[0-9]/).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  role: Joi.string().valid('merchant', 'shopper', 'delivery').required(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const merchantRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/[A-Z]/).pattern(/[0-9]/).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  storeName: Joi.string().required(),
  businessName: Joi.string().required(),
  businessCategory: Joi.string().required(),
  businessEmail: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  businessLicense: Joi.string().required(),
  nationalId: Joi.string().required(),
  bankAccountNumber: Joi.string().required(),
  bankRoutingNumber: Joi.string().required(),
  bankHolderName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
});

export const shopperRegistrationSchema = Joi.object({
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  password: Joi.string().min(8).pattern(/[A-Z]/).pattern(/[0-9]/).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  socialProvider: Joi.string().valid('google', 'apple', 'facebook'),
  socialId: Joi.string(),
});

export const deliveryPartnerRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/[A-Z]/).pattern(/[0-9]/).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  vehicleType: Joi.string().valid('bike', 'car', 'van', 'truck').required(),
  vehicleRegistration: Joi.string().required(),
  licenseNumber: Joi.string().required(),
  nationalId: Joi.string().required(),
  licensePhoto: Joi.string().required(),
  vehiclePhoto: Joi.string().required(),
  nationalIdPhoto: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const verifyOtpSchema = Joi.object({
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  otp: Joi.string().length(6).required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(8).pattern(/[A-Z]/).pattern(/[0-9]/).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
  resetToken: Joi.string().required(),
});
