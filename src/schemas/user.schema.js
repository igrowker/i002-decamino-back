import Joi from "joi";

export const userSchema = Joi.object({
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