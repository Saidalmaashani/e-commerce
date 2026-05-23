import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    merchantId: { type: String, required: true, ref: 'Merchant' },
    storeName: { type: String, required: true },
    storeSlug: { type: String, required: true, unique: true, lowercase: true },
    logo: String,
    banner: String,
    bio: String,
    description: String,
    businessCategories: [String],
    businessTags: [String],
    workingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    returnPolicy: String,
    isActive: { type: Boolean, default: true },
    followers: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    verificationStatus: {
      type: String,
      enum: ['verified', 'unverified', 'pending'],
      default: 'pending',
    },
    promotions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' }],
    customDomain: String,
    socialLinks: {
      instagram: String,
      facebook: String,
      twitter: String,
      website: String,
    },
    contactEmail: String,
    contactPhone: String,
  },
  { timestamps: true }
);

storeSchema.index({ storeSlug: 1 });
storeSchema.index({ merchantId: 1 });
storeSchema.index({ isActive: 1 });

export const Store = mongoose.model('Store', storeSchema);
