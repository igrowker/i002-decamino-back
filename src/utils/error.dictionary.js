const dictionary = {
  userOrPassword: {
    status: 400,
    message: "Usuario o contraseña incorrecta"
  },
  userNotFound: {
    status: 400,
    message: "El usuario no existe"
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
    message: "Invalid credentials"
  },
  authorization: {
    status: 403,
    message: "Not allowed"
  }
}

export default dictionary