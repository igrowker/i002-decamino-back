import mongoose, { Schema } from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pendiente',
    enum: ['pendiente', 'confirmado', 'expirado', 'fallido']
  },
  amount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
