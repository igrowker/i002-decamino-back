import Reservation from "../models/reservation.js"

export const createReservation = async (data) => {
  try {
    const response = await Reservation.create(data);
    return response
  }
  catch (error) {
    throw error
  }
}

export const GETReservations = async (data) => {

  try {
    const response = await Reservation.create(data);
    return response
  }
  catch (error) {
    throw error
  }
}

export const GETReservationById = async (data) => {

  try {
    const response = await Reservation.create(data);
    return response
  }
  catch (error) {
    throw error
  }
}

export const updatedReservationReservation = async (data) => {

  try {
    const response = await Reservation.create(data);
    return response
  }
  catch (error) {
    throw error
  }
}

export const DELETEReservation = async (data) => {

  try {
    const response = await Reservation.create(data);
    return response
  }
  catch (error) {
    throw error
  }
}
