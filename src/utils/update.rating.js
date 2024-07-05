

export const addReviewToRestaurant = async (restaurantId, reviewData) => {
  const review = await Review.create({ ...reviewData, restaurant: restaurantId });
  
  const reviews = await Review.find({ restaurant: restaurantId });
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length ? totalRating / reviews.length : 0;
  
  await Restaurant.findByIdAndUpdate(restaurantId, { rating: averageRating });
  
  return review;
}