export default class userDto {
  constructor(user) {
    this.username = user.username
    this.emai = user.email
    this.role = user.role
    this.favorites = user.favorites
  }
}