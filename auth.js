const jwt = require('jsonwebtoken');

// simple JWT verification middleware
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded; // contains userId and role
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// role check helper
exports.requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};