import { updateSchema, createSchema } from '../schemas/restaurant.schema.js';
import * as restaurantServices from '../services/restaurant.service.js'
import CustomError from '../utils/custom.error.js'

export const POSTRestaurant = async (req, res, next) => {
  const data = req.body;
  try {
    const { error, value } = createSchema.validate(data);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await restaurantServices.createRestaurant(value);

    return res.status(201).json(response);
  }
  catch (error) {
    next(error);
  }
};

export const GETRestaurants = async (req, res, next) => {
  const { cuisine, limit, page } = req.query
  try {
    const response = await restaurantServices.readRestaurants({ cuisine, limit, page });
    return res.status(200).json(response);
  }
  catch (error) {
    next(error);
  }
};
export const GETRestaurantById = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await restaurantServices.readRestaurantById(id)
    return res.status(200).json(response);

  }
  catch (error) {
    next(error)
  }
};
export const PUTRestaurant = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params
  try {
    const { error, value } = updateSchema.validate(data);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await restaurantServices.updateRestaurant(id, value);

    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};


export const DELETERestaurant = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await restaurantServices.destroyRestaurant(id)
    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};


