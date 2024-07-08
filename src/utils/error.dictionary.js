const dictionary = {
  missingFile: {
    status: 400,
    message: "No se ha subido ningún archivo"
  },
  emailExists: {
    status: 400,
    message: "Correo electrónico ya registrado"
  },
  userOrPassword: {
    status: 400,
    message: "Usuario o contraseña incorrecta"
  },
  userNotFound: {
    status: 404,
    message: "El usuario no existe"
  },
  hasRestaurant: {
    status: 400,
    message: "El usuario ya tiene un restaurante a su nombre"
  },
  noRestaurant: {
    status: 404,
    message: "El usuario no tiene un restaurante a su nombre"
  },
  restaurantNotFound: {
    status: 404,
    message: "El restaurante no existe"
  },
  reviewNotFound: {
    status: 404,
    message: "La reseña no existe"
  },
  alreadyReviewed: {
    status: 400,
    message: "Este usuario ya hizo una reseña de este restaurant"
  },
  requiresTOTP: {
    status: 400,
    message: "Este usuario requiere código TOTP"
  },
  invalidTOTP: {
    status: 400,
    message: "Código TOTP incorrecto"
  },
  authentication: {
    status: 401,
    message: "No autenticado"
  },
  authorization: {
    status: 403,
    message: "No autorizado"
  }
}

export default dictionary