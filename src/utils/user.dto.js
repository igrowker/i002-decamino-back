export default class userDto {
  constructor(user) {
    this.id = user.id
    this.username = user.username
    this.email = user.email
    this.twoFactorEnabled = user.twoFactorEnabled
    this.role = user.role
    this.profileImg = user.profileImg
    this.history = user.history
    this.role === 'traveler' ? this.favorites = user.favorites : null
    this.role === 'merchant' ? this.restaurant = user.restaurant : null
  }
}