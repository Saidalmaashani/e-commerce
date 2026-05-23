import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};

export const verifyMerchantOwnership = async (req, res, next) => {
  try {
    // Check if user is owner of the merchant account
    // This will be implemented with actual database check
    if (req.user.role !== 'merchant') {
      return res.status(403).json({ error: 'Only merchants can access this resource' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
};
