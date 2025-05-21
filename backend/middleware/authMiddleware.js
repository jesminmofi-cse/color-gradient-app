const User = require('../models/User');

const protect = async (req, res, next) => {
  if (!req.session || !req.session.user|| !req.session.user.id) {
    return res.status(401).json({ msg: 'Not authorized, no session' });
  }

  try {
    const user = await User.findById(req.session.user.id).select('-password');
    if (!user) {
      return res.status(401).json({ msg: 'Not authorized, user not found' });
    }

    req.user = user; // Attach user to request for downstream use
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Not authorized' });
  }
};

module.exports = { protect };
