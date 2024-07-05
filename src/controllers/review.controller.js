///controllers/reseñasController.js

import * as reseñasServices from '../services/review.service.js'

// Crear una nueva reseña
export const POSTReview = async (req, res) => {
    try {
        const { user, restaurant,rating, comment} = req.body; // controller uso info de peticion 
        const newReseñas = await reseñasServices.createReseñas({ user, restaurant,rating,comment})

        // todo req es controladores
        res.status(201).json(newReseñas); //json nombre llave = valor 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las reseñas
export const GETReviews = async (req, res) => {
    try {
        const reseñas = await reseñasServices.readReseñas() //me trae todas las reseñas
        res.status(200).json(reseñas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una reseña por ID
export const GETReviewById = async (req, res) => {
    const id = req.params.id
    try {
        const reseñas = await reseñasServices.readReseñasById(id)
        if (!reseñas) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        res.status(200).json(reseñas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una reseña
export const PUTReview = async (req, res) => {
    try {
        const  data = req.body;
        const id = req.params.id
        const updatedReseñas = await reseñasServices.updateReseñas(id,data)
            
      
        if (!updatedReseñas) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        res.status(200).json(updatedReseñas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una reseña
export const DELETEReview = async (req, res) => {
       const id = req.params.id
    try {
        const deletedReseñas = await reseñasServices.destroyReseña(id) //busca reseña y la elimina
        if (!deletedReseñas) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        res.status(200).json({ message: 'Reseña eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};