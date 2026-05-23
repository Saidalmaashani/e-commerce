import express from 'express';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// Delivery Partner routes
router.get('/dashboard', verifyToken, verifyRole(['delivery']), (req, res) => {
  res.json({ message: 'Delivery dashboard' });
});

router.get('/available-orders', verifyToken, verifyRole(['delivery']), (req, res) => {
  res.json({ message: 'Get available orders' });
});

router.post('/accept-order', verifyToken, verifyRole(['delivery']), (req, res) => {
  res.json({ message: 'Accept order' });
});

router.put('/delivery/:orderId/location', verifyToken, verifyRole(['delivery']), (req, res) => {
  res.json({ message: 'Update delivery location' });
});

router.put('/delivery/:orderId/complete', verifyToken, verifyRole(['delivery']), (req, res) => {
  res.json({ message: 'Complete delivery' });
});

router.get('/earnings', verifyToken, verifyRole(['delivery']), (req, res) => {
  res.json({ message: 'Get earnings' });
});

export default router;
