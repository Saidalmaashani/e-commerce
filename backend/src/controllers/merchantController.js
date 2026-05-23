import express from 'express';
import mongoose from 'mongoose';
import { Merchant } from '../models/Merchant.js';

const router = express.Router();

// Get merchant dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const merchantId = req.user.merchantId;

    const merchant = await Merchant.findById(merchantId);

    const stats = {
      totalRevenue: merchant.totalRevenue,
      totalOrders: merchant.totalOrders,
      averageRating: merchant.averageRating,
      returnRate: merchant.returnRate,
      conversionRate: merchant.conversionRate,
      stores: merchant.stores.length,
    };

    res.json({
      message: 'Dashboard data retrieved',
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get merchant analytics
router.get('/analytics', async (req, res) => {
  try {
    const merchantId = req.user.merchantId;
    const period = req.query.period || '30days'; // 7days, 30days, 90days, 365days

    // Calculate date range
    let days = 30;
    if (period === '7days') days = 7;
    if (period === '90days') days = 90;
    if (period === '365days') days = 365;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Mock analytics data
    const analytics = {
      period,
      totalRevenue: 15000,
      totalOrders: 350,
      averageOrderValue: 42.86,
      conversionRate: 3.24,
      returnRate: 2.1,
      revenueChart: [
        { date: 'Jan 1', revenue: 500 },
        { date: 'Jan 2', revenue: 600 },
        { date: 'Jan 3', revenue: 550 },
      ],
      topProducts: [
        { productId: '1', name: 'Wireless Headphones', sales: 120, revenue: 7200 },
        { productId: '2', name: 'USB Cable', sales: 300, revenue: 3900 },
      ],
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get merchant wallet
router.get('/wallet', async (req, res) => {
  try {
    const merchantId = req.user.merchantId;

    const wallet = {
      balance: 5234.50,
      pending: 1200.00,
      available: 4034.50,
      withdrawn: 25000.00,
      recentTransactions: [
        { id: 1, type: 'credit', amount: 500, date: '2024-01-15' },
        { id: 2, type: 'withdrawal', amount: 1000, date: '2024-01-14' },
      ],
    };

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
