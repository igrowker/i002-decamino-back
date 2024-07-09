import mongoose, { Schema } from "mongoose";

const routeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String,
    required: true
  },
  suggestedRestaurants: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Route = mongoose.model('Route', routeSchema);

export default Route;
