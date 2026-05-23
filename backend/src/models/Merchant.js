import mongoose from 'mongoose';

const merchantSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    businessName: { type: String, required: true },
    businessCategory: { type: String, required: true },
    businessEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'suspended', 'rejected'],
      default: 'pending',
    },
    tier: {
      type: String,
      enum: ['standard', 'verified', 'premium'],
      default: 'standard',
    },
    kycDocuments: {
      businessLicense: { url: String, uploadedAt: Date },
      nationalId: { url: String, uploadedAt: Date },
      bankDetails: {
        accountNumber: String,
        routingNumber: String,
        holderName: String,
        bankName: String,
      },
      address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
    },
    stores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }],
    totalRevenue: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    returnRate: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: String,
    lastLogin: Date,
    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
    approvedAt: Date,
    approvedBy: String,
    rejectionReason: String,
    commissionRate: { type: Number, default: 10 },
    platformFeePercentage: { type: Number, default: 2.9 },
    bankPayoutFrequency: { type: String, enum: ['weekly', 'biweekly', 'monthly'], default: 'weekly' },
  },
  { timestamps: true }
);

// Compound index for email and phone
merchantSchema.index({ email: 1, phone: 1 });

// Index for status for quick queries
merchantSchema.index({ status: 1 });

// Index for tier for performance-based queries
merchantSchema.index({ tier: 1 });

export const Merchant = mongoose.model('Merchant', merchantSchema);
