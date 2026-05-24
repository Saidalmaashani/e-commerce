import express from 'express';
import { verifyToken, verifyRole } from '../middleware/auth.js';
import { connectMongoDB } from '../config/database.mongo.js';
import mongoose from 'mongoose';

const router = express.Router();

// Product Schema
const productSchema = new mongoose.Schema({
  merchantId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, default: null },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, default: 'General' },
  description: { type: String, default: '' },
  emoji: { type: String, default: '📦' },
  badge: { type: String, default: null },
  status: { type: String, enum: ['Active', 'Out of Stock', 'Low Stock'], default: 'Active' },
  sales: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// GET all products for merchant
router.get('/products', verifyToken, verifyRole(['merchant']), async (req: any, res) => {
  try {
    const products = await Product.find({ merchantId: req.user.id });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

// POST create product
router.post('/products', verifyToken, verifyRole(['merchant']), async (req: any, res) => {
  try {
    const { name, price, oldPrice, stock, category, description, emoji, badge } = req.body;
    const status = stock === 0 ? 'Out of Stock' : stock <= 10 ? 'Low Stock' : 'Active';
    const product = await Product.create({
      merchantId: req.user.id,
      name, price, oldPrice, stock, category, description,
      emoji: emoji || '📦',
      badge: badge || null,
      status,
    });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create product' });
  }
});

// PUT update product
router.put('/products/:id', verifyToken, verifyRole(['merchant']), async (req: any, res) => {
  try {
    const { name, price, oldPrice, stock, category, description, emoji, badge } = req.body;
    const status = stock === 0 ? 'Out of Stock' : stock <= 10 ? 'Low Stock' : 'Active';
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, merchantId: req.user.id },
      { name, price, oldPrice, stock, category, description, emoji, badge, status },
      { new: true }
    );
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update product' });
  }
});

// DELETE product
router.delete('/products/:id', verifyToken, verifyRole(['merchant']), async (req: any, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id, merchantId: req.user.id });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
});

// GET dashboard
router.get('/dashboard', verifyToken, verifyRole(['merchant']), async (req: any, res) => {
  try {
    const products = await Product.find({ merchantId: req.user.id });
    const totalProducts = products.length;
    const totalSales = products.reduce((s, p) => s + p.sales, 0);
    res.json({ success: true, stats: { totalProducts, totalSales } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch dashboard' });
  }
});

export default router;
