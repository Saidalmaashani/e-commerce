import mongoose from 'mongoose';
import { Merchant } from '../models/Merchant.js';
import { Store } from '../models/Store.js';
import { Product } from '../models/Product.js';

export const seedMerchants = async () => {
  try {
    await Merchant.deleteMany({});

    const merchants = [
      {
        email: 'seller1@example.com',
        password: 'HashedPassword123',
        phone: '+1234567890',
        businessName: 'Tech Store Co.',
        businessCategory: 'Electronics',
        businessEmail: 'business@techstore.com',
        status: 'approved',
        tier: 'premium',
        kycDocuments: {
          businessLicense: { url: 'https://example.com/license.pdf' },
          nationalId: { url: 'https://example.com/id.pdf' },
          bankDetails: {
            accountNumber: '123456789',
            routingNumber: '101202123',
            holderName: 'Tech Store Co.',
            bankName: 'National Bank',
          },
          address: {
            street: '123 Business St',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            country: 'United States',
          },
        },
      },
      {
        email: 'seller2@example.com',
        password: 'HashedPassword123',
        phone: '+1234567891',
        businessName: 'Fashion Hub',
        businessCategory: 'Clothing',
        businessEmail: 'business@fashionhub.com',
        status: 'approved',
        tier: 'verified',
        kycDocuments: {
          businessLicense: { url: 'https://example.com/license2.pdf' },
          nationalId: { url: 'https://example.com/id2.pdf' },
          bankDetails: {
            accountNumber: '987654321',
            routingNumber: '101202124',
            holderName: 'Fashion Hub LLC',
            bankName: 'Commercial Bank',
          },
          address: {
            street: '456 Fashion Ave',
            city: 'Los Angeles',
            state: 'CA',
            postalCode: '90001',
            country: 'United States',
          },
        },
      },
    ];

    const createdMerchants = await Merchant.insertMany(merchants);
    console.log('✓ Merchants seeded:', createdMerchants.length);

    return createdMerchants;
  } catch (error) {
    console.error('Error seeding merchants:', error);
    throw error;
  }
};

export const seedStores = async (merchants) => {
  try {
    await Store.deleteMany({});

    const stores = [
      {
        merchantId: merchants[0]._id,
        storeName: 'Tech Store - Premium Electronics',
        storeSlug: 'tech-store-premium',
        bio: 'Your trusted source for quality electronics and gadgets',
        businessCategories: ['Electronics', 'Computers', 'Mobile'],
        businessTags: ['authentic', 'warranty', 'fast-delivery'],
        isActive: true,
        followers: 5234,
        rating: 4.8,
        totalReviews: 450,
        totalProducts: 250,
        totalOrders: 1200,
      },
      {
        merchantId: merchants[1]._id,
        storeName: 'Fashion Hub - Trendy Apparel',
        storeSlug: 'fashion-hub-trendy',
        bio: 'Latest fashion trends at affordable prices',
        businessCategories: ['Clothing', 'Accessories', 'Footwear'],
        businessTags: ['trendy', 'affordable', 'seasonal'],
        isActive: true,
        followers: 3421,
        rating: 4.6,
        totalReviews: 328,
        totalProducts: 500,
        totalOrders: 800,
      },
    ];

    const createdStores = await Store.insertMany(stores);
    console.log('✓ Stores seeded:', createdStores.length);

    return createdStores;
  } catch (error) {
    console.error('Error seeding stores:', error);
    throw error;
  }
};

export const seedProducts = async (stores) => {
  try {
    await Product.deleteMany({});

    const products = [
      {
        storeId: stores[0]._id,
        merchantId: stores[0].merchantId,
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
        basePrice: 79.99,
        salePrice: 59.99,
        category: 'Electronics',
        tags: ['audio', 'wireless', 'noise-cancelling'],
        baseStock: 150,
        lowStockThreshold: 20,
        rating: 4.7,
        totalReviews: 234,
        totalSold: 1200,
        isActive: true,
      },
      {
        storeId: stores[0]._id,
        merchantId: stores[0].merchantId,
        name: 'USB-C Fast Charging Cable',
        description: 'Durable 2m USB-C cable with 5A fast charging support',
        basePrice: 12.99,
        category: 'Electronics',
        tags: ['cable', 'charging', 'durable'],
        baseStock: 500,
        lowStockThreshold: 50,
        rating: 4.5,
        totalReviews: 120,
        totalSold: 3500,
        isActive: true,
      },
      {
        storeId: stores[1]._id,
        merchantId: stores[1].merchantId,
        name: 'Classic Cotton T-Shirt',
        description: 'Comfortable 100% organic cotton t-shirt in multiple colors',
        basePrice: 24.99,
        category: 'Clothing',
        tags: ['casual', 'comfortable', 'organic'],
        baseStock: 300,
        lowStockThreshold: 30,
        rating: 4.6,
        totalReviews: 156,
        totalSold: 2100,
        isActive: true,
        variants: [
          { id: 'v1', name: 'Size', options: [{ name: 'Size', value: 'M' }, { name: 'Color', value: 'Blue' }], price: 24.99, stock: 100 },
          { id: 'v2', name: 'Size', options: [{ name: 'Size', value: 'L' }, { name: 'Color', value: 'Red' }], price: 24.99, stock: 100 },
        ],
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log('✓ Products seeded:', createdProducts.length);

    return createdProducts;
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

export const runSeeds = async (mongoDb) => {
  try {
    console.log('Starting database seeding...');
    const merchants = await seedMerchants();
    const stores = await seedStores(merchants);
    await seedProducts(stores);
    console.log('✓ Database seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  }
};
