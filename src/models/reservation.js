// Aca van los objetos

import mongoose, { Schema } from "mongoose"


// Definir el esquema de la reserva
const reservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada'],
        required: true
    }
},
    {
        timestamps: true
    });

// Crear el modelo de la reserva
const Reservation = mongoose.model('Reservation', reservationSchema);

// Exportar el modelo
export default Reservation;
