// backend/middleware/authenticate.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  // Tokens are usually sent in the Authorization header as "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part

  try {
    // Verify token with your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to req object so next middleware/routes can use it
    req.user = {
      id: decoded.id,   // assuming payload contains { id: user._id }
      email: decoded.email  // optional, if you sent email in the token
    };

    next();  // token is valid, proceed to next handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
