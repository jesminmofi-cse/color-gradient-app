const express = require('express');
const router = express.Router();
const Gradient = require('../models/Gradient');
const { protect } = require('../middleware/authMiddleware');


// Get all gradients for a user
router.get('/', protect, async (req, res) => {
  const userId = req.user.id;
  try {
    const gradients = await Gradient.find({ userId }).sort({ createdAt: -1 });
    res.json(gradients);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add new gradient
router.post('/', protect, async (req, res) => {
  const userId = req.user.id;
  const { name, color1,color2 } = req.body;
  console.log('🎨 New Gradient Data:', req.body); // Add this

  if (!color1 || !color2) {
    return res.status(400).json({ msg: 'Both colors are required' });
  }

  try {
    const newGradient = new Gradient({ userId, name, color1, color2 });
    await newGradient.save();
    res.status(201).json({ success: true, gradient: newGradient });
  } catch (error) {
    console.error('❌ Error saving gradient:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
