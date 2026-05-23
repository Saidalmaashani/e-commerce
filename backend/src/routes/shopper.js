import express from 'express';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// Shopper routes
router.get('/home', (req, res) => {
  res.json({ message: 'Shopper homepage' });
});

router.get('/products', (req, res) => {
  res.json({ message: 'Get products' });
});

router.get('/search', (req, res) => {
  res.json({ message: 'Search products' });
});

router.get('/cart', verifyToken, verifyRole(['shopper']), (req, res) => {
  res.json({ message: 'Get cart' });
});

router.post('/cart', verifyToken, verifyRole(['shopper']), (req, res) => {
  res.json({ message: 'Add to cart' });
});

router.get('/orders', verifyToken, verifyRole(['shopper']), (req, res) => {
  res.json({ message: 'Get orders' });
});

router.post('/checkout', verifyToken, verifyRole(['shopper']), (req, res) => {
  res.json({ message: 'Create order' });
});

export default router;
