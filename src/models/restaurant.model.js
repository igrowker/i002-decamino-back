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
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    default: 1
  }
},
  {
    timestamps: true
  });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;