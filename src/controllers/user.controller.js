import Joi from 'joi';
import { generateToken } from '../utils/jwt.js';
import * as userServices from '../services/user.service.js'

const userSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'El nombre de usuario es requerido',
    'any.required': 'El nombre de usuario es requerido'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Debe proporcionar un correo electrónico válido',
    'string.empty': 'El correo electrónico es requerido',
    'any.required': 'El correo electrónico es requerido'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
    'string.empty': 'La contraseña es requerida',
    'any.required': 'La contraseña es requerida'
  }),
  role: Joi.string().valid('user', 'admin').default('user').messages({
    'any.only': 'El rol debe ser uno de los siguientes valores: user, admin'
  })
});

export const POSTUserRegister = async (req, res) => {
  const data = req.body;
  const { error, value } = userSchema.validate(data);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  try {
    const response = await userServices.registerUser(data);
    return res.status(201).json(response);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const POSTUserLogin = async (req, res) => {
  const { username, password } = req.body;

  try {

    const user = userServices.loginUser(username, password)

    const token = generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
      favorites: user.favorites,
      role: user.role
    })

    return res.status(200).json({ token })

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}