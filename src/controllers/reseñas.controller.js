///controllers/reseñasController.js

import * as reseñasServices from '../services/reseñas.service.js'

// Crear una nueva reseña
export const POSTReseñas = async (req, res) => {
    try {
        const { user, restaurant, date, status } = req.body; // controller uso info de peticion 
        const newReseñas = await reseñasServices.createReseñas({ user, restaurant, date, status })

        // todo req es controladores
        res.status(201).json(newReseñas); //json nombre llave = valor
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las reseñas
export const GETReseñas = async (req, res) => {
    try {
        const reseñas = await Reseñas.find();
        res.status(200).json(reseñas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una reseña por ID
export const GETReseñasById = async (req, res) => {
    try {
        const reseñas = await Reseñas.findById(req.params.id);
        if (!reseñas) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        res.status(200).json(reseñas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una reseña
export const updatedReseñasReseñas = async (req, res) => {
    try {
        const { user, restaurant, date, status } = req.body;
        const updatedReseñas = await Reseñas.findByIdAndUpdate(
            req.params.id,
            { user, restaurant, date, status },
            { new: true }
        );
        if (!updatedReseñas) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        res.status(200).json(updatedReseñas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una reseña
export const DELETEReseñas = async (req, res) => {
    try {
        const deletedReseñas = await Reseñas.findByIdAndDelete(req.params.id);
        if (!deletedReseñas) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        res.status(200).json({ message: 'Reseña eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};