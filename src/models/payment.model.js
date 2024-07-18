import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  status: { type: String, default: 'pending' },
  //reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
