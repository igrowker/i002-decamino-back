import { verifyToken } from '../utils/jwt.js'
import User from '../models/user.model.js'
import CustomError from '../utils/custom.error.js'
import dictionary from '../utils/error.dictionary.js'

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
  try {
    if (!req.user) {
      return CustomError.new(dictionary.authentication)
    }
    next();
  }
  catch (error) {
    next(error)
  }
};

export const validateUser = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user || req.user.id !== id) {
      return CustomError.new(dictionary.authorization)
    }

    next();
  }
  catch (error) {
    next(error)
  }
}