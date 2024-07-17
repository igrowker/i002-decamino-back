import Joi from 'joi';

const coordinatesValidator = (value, helpers) => {
  try {
    const coordsArray = value.split(',').map(Number);

    if (coordsArray.some(isNaN) || coordsArray.length !== 2) {
      return helpers.error('any.invalid');
    }

    return coordsArray;
  } catch (error) {
    return helpers.error('any.invalid');
  }
}

const coordinatesSchema = Joi.custom(coordinatesValidator)
  .required()
  .messages({
    'any.invalid': 'Las coordenadas deben contener dos números',
    'any.required': 'Las coordenadas son requeridas'
  });

// Esquema de validación para la consulta de rutas
export const routeSchema = Joi.object({
  start: coordinatesSchema,
  end: coordinatesSchema
});