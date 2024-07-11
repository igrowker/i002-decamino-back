import * as reservationServices from '../services/reservation.service.js'
import { createSchema, updateSchema } from '../schemas/reservation.schema.js';
import CustomError from '../utils/custom.error.js';

export const POSTReservation = async (req, res, next) => {
  const data = req.body
  const restaurantId = req.params.id
  try {
    const { error, value } = createSchema.validate({ ...data, restaurant: restaurantId });

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await reservationServices.createReservation({ ...value, user: req.user.id });

    return res.status(201).json(response);
  }
  catch (error) {
    next(error)
  }
};

export const PUTReservationCancel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await reservationServices.updateReservation(id, { status: 'cancelada' });
    return res.status(200).json(response);
  }
  catch (error) {
    next(error);
  }
};

export const GETUserReservations = async (req, res, next) => {
  try {
    const response = await reservationServices.readReservationsByUser(req.user.id);
    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};

export const GETRestaurantReservations = async (req, res, next) => {
  try {
    const response = await reservationServices.readReservationsByRestaurant(req.user.restaurant);
    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};

export const PUTReservationStatus = async (req, res, next) => {
  const { id } = req.params
  try {
    const { error, value } = updateSchema.validate(req.body);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await reservationServices.updateReservation(id, { status: value.status });

    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};