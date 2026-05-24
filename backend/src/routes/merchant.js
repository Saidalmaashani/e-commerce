import express from 'express';
import { verifyToken, verifyRole } from '../middleware/auth.js';
import { Product } from '../models/Product.js';

const router = express.Router();

// GET merchant products
router.get('/products', verifyToken, verifyRole(['merchant']), async (req, res) => {
  try {
    const products = await Product.find({ merchantId: req.user.id });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create product
router.post('/products', verifyToken, verifyRole(['merchant']), async (req, res) => {
  try {
    const { name, basePrice, salePrice, baseStock, category, description, emoji, badge } = req.body;
    if (!name || !basePrice || !category) return res.status(400).json({ error: 'Name, price, and category required' });
    
    const status = baseStock === 0 ? 'Out of Stock' : baseStock <= 10 ? 'Low Stock' : 'Active';
    const product = await Product.create({
      merchantId: req.user.id,
      storeId: req.user.id,
      name, basePrice, salePrice: salePrice || null,
      baseStock: baseStock || 0,
      category, description: description || '',
      isActive: true,
      tags: badge ? [badge] : [],
    });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update product
router.put('/products/:id', verifyToken, verifyRole(['merchant']), async (req, res) => {
  try {
    const { name, basePrice, salePrice, baseStock, category, description, isActive } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, merchantId: req.user.id },
      { name, basePrice, salePrice, baseStock, category, description, isActive },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE product
router.delete('/products/:id', verifyToken, verifyRole(['merchant']), async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id, merchantId: req.user.id });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET dashboard stats
router.get('/dashboard', verifyToken, verifyRole(['merchant']), async (req, res) => {
  try {
    const products = await Product.find({ merchantId: req.user.id });
    const totalProducts = products.length;
    const totalSales = products.reduce((s, p) => s + (p.totalSold || 0), 0);
    const lowStock = products.filter(p => p.baseStock <= p.lowStockThreshold).length;
    res.json({ success: true, stats: { totalProducts, totalSales, lowStock } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
