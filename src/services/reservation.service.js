


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




