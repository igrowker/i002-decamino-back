import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
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
  role: Joi.string().valid('merchant', 'traveler').required().messages({
    'string.empty': 'El rol es requerido',
    'any.required': 'El rol es requerido',
    'any.only': 'El rol debe ser uno de los siguientes valores: merchant, traveler'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Debe proporcionar un correo electrónico válido',
    'string.empty': 'El correo electrónico es requerido',
    'any.required': 'El correo electrónico es requerido'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'La contraseña es requerida',
    'any.required': 'La contraseña es requerida'
  })
});

export const updateSchema = Joi.object({
  username: Joi.string().min(3).optional().messages({
    'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Debe proporcionar un correo electrónico válido',
  }),
  role: Joi.string().valid('merchant', 'traveler').optional().messages({
    'any.only': 'El rol debe ser uno de los siguientes valores: merchant, traveler'
  })
}).min(1).messages({
  'object.min': 'Debe haber al menos un campo para actualizar'
})