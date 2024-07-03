import Payment from '../models/Payment.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const findOne = async (data) => {
    try {
        const payment = Payment.findOne(data);
        return payment;
    } catch (error) {
        throw (error);
    }
}

export const createCheckoutSession = async ({ reservationId, description, pricePerPerson, numberOfPeople }) => {
    try {
        // Todo: esperar a que modelen los datos de la reserva y creen el servicio
        // const reservation = await Reservation.findById(reservationId);

        // if (!reservation) {
        //     throw new Error('Reservation not found');
        // }

        // Calcular el total
        const totalPrice = pricePerPerson * numberOfPeople;

        // Crear la sesión de pago en Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: description,
                    },
                    unit_amount: pricePerPerson,
                },
                quantity: numberOfPeople,
            }],
            mode: 'payment',
            //URL de respuestas => tarea del front
            success_url: 'https://tu-sitio.com/success',
            cancel_url: 'https://tu-sitio.com/cancel',
        });

        // Guardar el pago en la base de datos
        const payment = new Payment({
            sessionId: session.id,
            status: 'pending',
            // reservation: reservation._id,
            amount: totalPrice
        });

        await Payment.create(payment);

        return { url: session.url };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const handlePaymentIntentSucceeded = async (paymentIntent) => {
    try {
        const payment = await Payment.findOne({ sessionId: paymentIntent.id });

        if (!payment) {
            console.error(`Payment with sessionId ${paymentIntent.id} not found.`);
            return;
        }

        payment.status = 'confirmed';
        await payment.save();

        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

        // Actualiza la reserva si es necesario
        // await Reservation.findByIdAndUpdate(payment.reservation, { status: 'confirmed' });
    } catch (error) {
        console.error(`Error handling payment intent: ${error.message}`);
    }
};

export const handleCheckoutSessionCompleted = async (session) => {
    try {
        const payment = await Payment.findOne({ sessionId: session.id });

        if (!payment) {
            console.error(`Payment with sessionId ${session.id} not found.`);
            return;
        }

        payment.status = 'confirmed';
        await payment.save();

        // Actualiza la reserva si es necesario
        // await Reservation.findByIdAndUpdate(payment.reservation, { status: 'confirmed' });

        console.log(`Payment for reservation ${payment.reservation} was successful!`);
    } catch (error) {
        console.error(`Error handling session completion: ${error.message}`);
    }
};

export const handleCheckoutSessionExpired = async (session) => {
    try {
        const payment = await Payment.findOne({ sessionId: session.id });

        if (!payment) {
            console.error(`Payment with sessionId ${session.id} not found.`);
            return;
        }

        payment.status = 'expired';
        await payment.save();

        //await Reservation.findByIdAndUpdate(payment.reservation, { status: 'canceled' });

       //console.log(`Payment for reservation ${payment.reservation} was canceled.`);
    } catch (error) {
        console.error(`Error handling session expiration: ${error.message}`);
    }
}
