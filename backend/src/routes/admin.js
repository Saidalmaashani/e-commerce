import express from 'express';
import { verifyToken, verifyRole } from '../middleware/auth.js';
import { Merchant } from '../models/Merchant.js';
import { Product } from '../models/Product.js';

const router = express.Router();

// GET all merchants
router.get('/merchants', verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const merchants = await Merchant.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, merchants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT approve/reject merchant
router.put('/merchants/:id', verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const merchant = await Merchant.findByIdAndUpdate(
      req.params.id,
      { status, rejectionReason: rejectionReason || '', approvedAt: status === 'approved' ? new Date() : null },
      { new: true }
    );
    if (!merchant) return res.status(404).json({ error: 'Merchant not found' });
    res.json({ success: true, merchant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET platform stats
router.get('/stats', verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const totalMerchants = await Merchant.countDocuments();
    const pendingMerchants = await Merchant.countDocuments({ status: 'pending' });
    const approvedMerchants = await Merchant.countDocuments({ status: 'approved' });
    const totalProducts = await Product.countDocuments({ isActive: true });
    res.json({ success: true, stats: { totalMerchants, pendingMerchants, approvedMerchants, totalProducts } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
