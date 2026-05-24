import express from 'express';
import { Product } from '../models/Product.js';
import { Merchant } from '../models/Merchant.js';

const router = express.Router();

// GET all active products for shoppers
router.get('/products', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort, page = 1, limit = 20 } = req.query;
    
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };
    if (minPrice || maxPrice) {
      filter.basePrice = {};
      if (minPrice) filter.basePrice.$gte = Number(minPrice);
      if (maxPrice) filter.basePrice.$lte = Number(maxPrice);
    }

    const sortOptions = {
      'newest': { createdAt: -1 },
      'price-low': { basePrice: 1 },
      'price-high': { basePrice: -1 },
      'rating': { rating: -1 },
      'popular': { totalSold: -1 },
    };

    const products = await Product.find(filter)
      .sort(sortOptions[sort] || { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({ success: true, products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isActive: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const merchant = await Merchant.findById(product.merchantId).select('businessName');
    res.json({ success: true, product, merchant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category', { isActive: true });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET flash deals
router.get('/flash-deals', async (req, res) => {
  try {
    const now = new Date();
    const products = await Product.find({
      isActive: true,
      'flashSale.isActive': true,
      'flashSale.startDate': { $lte: now },
      'flashSale.endDate': { $gte: now },
    }).limit(6);
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
