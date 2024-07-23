export default class RestaurantDTO {
  constructor(restaurant) {
    this.id = restaurant.id
    this.title = restaurant.title
    this.location = [restaurant.location.long, restaurant.location.lat]
    this.photos = restaurant.photos
    this.description = restaurant.description
    this.cuisine = restaurant.cuisine
    this.schedule = restaurant.schedule
    this.reservationPrice = restaurant.reservationPrice
    this.dineIn = restaurant.dineIn
    this.takeAway = restaurant.takeAway
  }
}