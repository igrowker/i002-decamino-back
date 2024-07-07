import Restaurant from "../models/restaurant.model.js"
import CustomError from "../utils/custom.error.js"
import dictionary from "../utils/error.dictionary.js"
import getRating from "../utils/get.rating.js"

export const createRestaurant = async (data) => {
  try {
    const response = await Restaurant.create(data)
    return response
  }
  catch (error) {
    throw error
  }
}

export const readRestaurants = async ({ cuisine, limit, page }) => {
  try {
    const query = cuisine ? { cuisine } : {};
    const skip = limit && page ? limit * (page - 1) : 0;

    const restaurants = await Restaurant.find(query).skip(skip).limit(limit || 0);

    const response = await Promise.all(
      restaurants.map(async (restaurant) => {
        const rating = await getRating(restaurant._id);
        return { ...restaurant.toObject(), rating };
      })
    );

    return response;
  }
  catch (error) {
    throw error
  }
}

export const readRestaurantById = async (id) => {
  try {
    const restaurant = await Restaurant.findById(id)

    if (!restaurant) return CustomError.new(dictionary.restaurantNotFound)

    const rating = await getRating(restaurant._id);

    return { ...restaurant.toObject(), rating };
  }
  catch (error) {
    throw error
  }
}

export const updateRestaurant = async (id, data) => {
  try {
    const restaurant = await Restaurant.findById(id)

    if (!restaurant) return CustomError.new(dictionary.restaurantNotFound)

    const response = await Restaurant.findByIdAndUpdate(id, data, { new: true })

    return response;
  }
  catch (error) {
    throw error
  }
}

export const destroyRestaurant = async (id) => {
  try {
    const restaurant = await Restaurant.findById(id)

    if (!restaurant) return CustomError.new(dictionary.restaurantNotFound)

    const response = await Restaurant.findByIdAndDelete(id)

    return response;
  }
  catch (error) {
    throw error
  }
}