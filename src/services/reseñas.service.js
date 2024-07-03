import Reseñas from "../models/reseñas.js"
export const createReseñas = async (data) => {

    try {
        const response = await Reseñas.create(data);
        return response
    }
    catch (error) {
        throw error
    }
}

export const GETReseñas = async (data) => {

    try {
        const response = await Reseñas.create(data);
        return response
    }
    catch (error) {
        throw error
    }
}

export const GETReseñasById = async (data) => {

    try {
        const response = await Reseñas.create(data);
        return response
    }
    catch (error) {
        throw error
    }
}

export const updatedReseñasReseñas = async (data) => {

    try {
        const response = await Reseñas.create(data);
        return response
    }
    catch (error) {
        throw error
    }
}

export const DELETEReseñas = async (data) => {

    try {
        const response = await Reseñas.create(data);
        return response
    }
    catch (error) {
        throw error
    }
}
