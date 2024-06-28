import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
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

export const loginUser = async (username, password, otpToken) => {
  try {
    const user = await User.findOne({ username })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const isMatch = await user.comparePassword(password, user.password)

    if (!isMatch) {
      throw new Error('Contraseña incorrecta')
    }

    if (user.twoFactorEnabled) {
      if (!otpToken) throw new Error('Este usuario requiere código TOTP');

      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: otpToken,
        window: 1
      });

      if (!verified) throw new Error('Código TOTP inválido');
    }

    return user
  }
  catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message)
  }
}

export const create2fa = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const secret = speakeasy.generateSecret({ length: 20 });

    user.twoFactorSecret = secret.base32;
    user.twoFactorEnabled = true
    await user.save();

    const otpauth_url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: 'deCamino',
      issuer: 'deCamino'
    })
    const data_url = await qrcode.toDataURL(otpauth_url);

    return { userId: user._id, secret: secret.base32, qrCode: data_url };
  }
  catch (error) {
    throw new Error('Error al generar secreto 2FA: ' + error.message)
  }
}