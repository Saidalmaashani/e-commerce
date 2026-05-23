import express from 'express';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// Merchant routes
router.get('/dashboard', verifyToken, verifyRole(['merchant']), (req, res) => {
  res.json({ message: 'Merchant dashboard endpoint' });
});

router.get('/orders', verifyToken, verifyRole(['merchant']), (req, res) => {
  res.json({ message: 'Get merchant orders' });
});

router.get('/products', verifyToken, verifyRole(['merchant']), (req, res) => {
  res.json({ message: 'Get merchant products' });
});

router.post('/products', verifyToken, verifyRole(['merchant']), (req, res) => {
  res.json({ message: 'Create product' });
});

router.get('/analytics', verifyToken, verifyRole(['merchant']), (req, res) => {
  res.json({ message: 'Get analytics' });
});

router.get('/wallet', verifyToken, verifyRole(['merchant']), (req, res) => {
  res.json({ message: 'Get wallet details' });
});

export default router;
