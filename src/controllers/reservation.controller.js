//Aca van los controladores

// /controllers/reservationController.js

import * as reservationServices from '../services/reservation.service.js'

// Crear una nueva reserva 
export const POSTReservation = async (req, res) => {
  try {
    const { user, restaurant, date, status } = req.body; // controller uso info de peticion 
    const newReservation =  await reservationServices.createReservation({user, restaurant, date, status}) // llamo a b.datos crea va a servicios
   
    // todo req es controladores
    res.status(201).json(newReservation); //json nombre  llave = valor
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las reservas
export const GETReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una reserva por ID
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una reserva
exports.updateReservation = async (req, res) => {
  try {
    const { user, restaurant, date, status } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { user, restaurant, date, status },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
