const express = require('express');
const router = express.Router();
const Gradient = require('../models/Gradient');

// Get all gradients for a user
router.get('/', async (req, res) => {
  const userId = req.session.user; // ✅ Read from session
  if (!userId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  try {
    const gradients = await Gradient.find({ user: userId }).sort({ createdAt: -1 });
    res.json({gradients});
  } catch (error) {
    console.error('❌ Error fetching gradients:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add new gradient
router.post('/', async (req, res) => {
  const userId = req.user.id; // ✅ Read from session
  const { name, color1, color2 } = req.body;

  console.log('🎨 New Gradient Data:', req.body);

  if (!userId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  if (!color1 || !color2) {
    return res.status(400).json({ msg: 'Both colors are required' });
  }

  try {
    const newGradient = new Gradient({ user: userId, name, color1, color2 });
    await newGradient.save();
    res.status(201).json({ success: true, gradient: newGradient });
  } catch (error) {
    console.error('❌ Error saving gradient:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
