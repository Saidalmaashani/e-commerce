import express from 'express';

const router = express.Router();

// Common routes (accessible to all or public)
router.get('/categories', (req, res) => {
  res.json({ message: 'Get categories' });
});

router.get('/countries', (req, res) => {
  res.json({ message: 'Get countries' });
});

router.get('/currencies', (req, res) => {
  res.json({ message: 'Get currencies' });
});

router.get('/banners', (req, res) => {
  res.json({ message: 'Get banners' });
});

export default router;
