import Restaurant from '../models/restaurant.js';
import Joi from 'joi';

const restaurantSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'El nombre del restaurante es requerido',
    'any.required': 'El nombre del restaurante es requerido'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'La ubicación del restaurante es requerida',
    'any.required': 'La ubicación del restaurante es requerida'
  }),
  cuisine: Joi.string().required().messages({
    'string.empty': 'El tipo de cocina es requerido',
    'any.required': 'El tipo de cocina es requerido'
  }),
  rating: Joi.number().min(0).max(5).messages({
    'number.min': 'La calificación debe ser al menos {#limit}',
    'number.max': 'La calificación no puede ser mayor que {#limit}'
  }),
  reviews: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).messages({
    'array.base': 'Las reseñas deben ser una lista de IDs',
    'string.pattern.base': 'Cada ID de reseña debe ser un ObjectId válido'
  }),
  created_at: Joi.date().default(() => new Date(), 'time of creation')
});

export const createRestaurant = async (req, res) => {
  const request = req.body;
  const { error, value } = restaurantSchema.validate(request);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  try {
    const response = await Restaurant.create(value);
    return res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
