import Restaurant from '../models/restaurant.model.js';
import CustomError from '../utils/custom.error.js'

export const createRestaurant = async (req, res) => {
  const request = req.body;

  try {
    const { error, value } = createSchema.validate(request);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await Restaurant.create(value);

    return res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateRestaurant = async (req, res) => {
  const { error, value } = restaurantSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }
    res.json({ message: "Restaurante eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


