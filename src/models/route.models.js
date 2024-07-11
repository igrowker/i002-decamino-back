import mongoose, { Schema } from "mongoose";

const routeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  waypoints: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }]
}, {
  timestamps: true
}
);

const Route = mongoose.model('Route', routeSchema);

export default Route;
