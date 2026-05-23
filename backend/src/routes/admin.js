import express from 'express';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// Admin routes
router.get('/dashboard', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

router.get('/users', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/merchants/pending', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Get pending merchants' });
});

router.post('/merchants/:id/approve', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Approve merchant' });
});

router.get('/orders', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Get all orders' });
});

router.get('/analytics', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Get analytics' });
});

router.get('/disputes', verifyToken, verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Get disputes' });
});

export default router;
