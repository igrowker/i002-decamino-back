import mongoose, { Schema } from "mongoose";

const coordinateSchema = new Schema({
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  }
});

const routeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  start: {
    type: coordinateSchema,
    required: true
  },
  end: {
    type: coordinateSchema,
    required: true
  },
  waypoints: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }]
}, {
  timestamps: true
});

const Route = mongoose.model('Route', routeSchema);

export default Route;