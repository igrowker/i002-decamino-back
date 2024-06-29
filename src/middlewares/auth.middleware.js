import { verifyToken } from '../utils/jwt.js'
import User from '../models/User.js'

export const injectUser = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const data = verifyToken(token, process.env.JWT_SECRET);

    const user = await User.findById(data.id);

    if (!user) {
      req.user = null;
    } else {
      req.user = data;
    }
  } catch (err) {
    req.user = null;
  }

  next();
};

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  next();
};