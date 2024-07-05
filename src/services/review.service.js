import Reseñas from "../models/review.model.js"
export const createReseñas = async (data) => {

    try {
        const response = await Reseñas.create(data);
        return response
    }
    catch (error) {
        throw error
    }
}

export const readReseñasByRestaurant = async (id) => { // metodo que trae a todas las reseñas de un mismo restaurant

    try {
        const response = await Reseñas.find({restaurant: id}); 
        return response
    }
    catch (error) {
        throw error
    }
}

export const readReseñas = async () => {

    try {
        const response = await Reseñas.find(); // metodo que trae todas las reseñas
        return response
    }
    catch (error) {
        throw error
    }
}

export const readReseñasById = async (id) => {  //metodo que trae una sola reseña

    try {
        const response = await Reseñas.findById(id); //recibe un id devolviendo reseña que coincida con id
        return response
    }
    catch (error) {
        throw error
    }
}

export const updateReseñas = async (id,data) => {

    try {
        const response = await Reseñas.findByIdAndUpdate(id,data,{ new: true }) //me devuelve una resp con el obj ya modificado
        return response
    }
    catch (error) {
        throw error
    }
}

export const destroyReseña = async (id) => {

    try {
        const response = await Reseñas.findByIdAndDelete(id); // buscar por id y eliminar
        return response
    }
    catch (error) {
        throw error
    }
}
