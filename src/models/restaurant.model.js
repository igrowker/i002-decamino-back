import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: {
      lat: {
        type: Number,
        required: true
      },
      long: {
        type: Number,
        required: true
      }
    },
    required: true
  },
  photos: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  cuisine: [{
    type: String
  }],
  schedule: {
    type: Map,
    of: String
  },
  dineIn: {
    type: Boolean,
    default: true
  },
  takeAway: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;