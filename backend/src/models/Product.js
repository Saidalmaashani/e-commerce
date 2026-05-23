import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    storeId: { type: String, required: true, ref: 'Store' },
    merchantId: { type: String, required: true, ref: 'Merchant' },
    name: { type: String, required: true },
    description: String,
    richDescription: String,
    basePrice: { type: Number, required: true },
    salePrice: { type: Number },
    images: [
      {
        url: String,
        order: Number,
        uploadedAt: Date,
      },
    ],
    category: { type: String, required: true },
    subcategory: String,
    tags: [String],
    sku: { type: String, unique: true, sparse: true },
    barcode: String,
    baseStock: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 10 },
    variants: [
      {
        id: String,
        name: String,
        options: [
          {
            name: String,
            value: String,
          },
        ],
        price: Number,
        stock: Number,
        sku: String,
      },
    ],
    isDigital: { type: Boolean, default: false },
    digitalDownloadUrl: String,
    isBundle: { type: Boolean, default: false },
    bundleProducts: [
      {
        productId: String,
        quantity: Number,
      },
    ],
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: { type: String, enum: ['cm', 'inch'] },
    },
    shippingClass: String,
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    totalSold: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    flashSale: {
      isActive: { type: Boolean, default: false },
      startDate: Date,
      endDate: Date,
      discountPercent: Number,
    },
    returnDays: { type: Number, default: 30 },
    warranty: String,
    certifications: [String],
  },
  { timestamps: true }
);

productSchema.index({ storeId: 1, isActive: 1 });
productSchema.index({ merchantId: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ sku: 1 });

export const Product = mongoose.model('Product', productSchema);
