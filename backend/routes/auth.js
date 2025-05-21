const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// ✅ Register
router.post('/register', async (req, res) => {
  console.log('📥 Register request body:', req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true, msg: 'User registered successfully' });
  } catch (error) {
    console.error('❌ Error registering user:', error);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

// ✅ Login
router.post('/login', async (req, res) => {
  console.log('📥 Login request body:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials' });
    }

    // Set session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // Save session explicitly
    req.session.save((err) => {
      if (err) {
        console.error('❌ Session save error:', err);
        return res.status(500).json({ success: false, msg: 'Session save failed' });
      }

      res.json({
        success: true,
        msg: 'Login successful',
        user: req.session.user,
      });
    });
  } catch (error) {
    console.error('❌ Error logging in:', error);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

// ✅ Get logged-in user
router.get('/me', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

// ✅ Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ msg: 'Logout failed' });

    res.clearCookie('connect.sid'); // Default cookie name
    res.json({ msg: 'Logged out successfully' });
  });
});

module.exports = router;
