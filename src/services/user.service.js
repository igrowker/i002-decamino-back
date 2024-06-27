import User from '../models/User.js';

export const registerUser = async (data) => {
  try {
    const response = User.create(data)
    return response
  }
  catch (error) {
    throw new Error('Error al registrar usuario: ' + error.message)
  }
}

export const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await user.comparePassword(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    return user
  }
  catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message)
  }

}