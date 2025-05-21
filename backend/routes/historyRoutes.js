
const express = require('express');
const router = express.Router();
const Gradient = require('../models/Gradient');
const authenticate = require('../middleware/authenticate');

// GET user's gradient history
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const gradients = await Gradient.find({ userId }).sort({ createdAt: -1 });

    res.json({ gradients });
  } catch (err) {
    console.error('❌ Error fetching history:', err);
    res.status(500).json({ error: 'Server error while fetching gradient history' });
  }
});

module.exports = router;
