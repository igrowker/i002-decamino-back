import jwt from 'jsonwebtoken'
import env from '../config/env.js'

const SECRET = env.JWT_SECRET

export const generateToken = object => jwt.sign(object, SECRET, { expiresIn: '1h' })

