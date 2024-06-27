import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import Joi from 'joi';
// const bcrypt = require('bcryptjs');
// const Joi = require('joi');

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

export const createUser = async (req, res) => {
    const request = req.body;
    const {error, value } = userSchema.validate(request);
    if(error){
        return res.status(400).json({
            error: error.details[0].message
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(request.password, 10); 
        request.password = hashedPassword;
        const response = await User.create(request);
        return res.status(201).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}