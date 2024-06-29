import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import User from '../models/User.js';
import CustomError from '../utils/custom.error.js';
import dictionary from '../utils/error.dictionary.js'

export const registerUser = async (data) => {
  try {
    const response = User.create(data)

    return response
  }
  catch (error) {
    throw (error)
  }
}

export const loginUser = async (username, password, otpToken) => {
  try {
    const user = await User.findOne({ username })

    if (!user) {
      return CustomError.new(dictionary.userNotFound)
    }

    const isMatch = await user.comparePassword(password, user.password)

    if (!isMatch) {
      return CustomError.new(dictionary.userOrPassword)
    }

    if (user.twoFactorEnabled) {
      if (!otpToken) return CustomError.new(dictionary.requiresTOTP)

      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: otpToken,
        window: 1
      });

      if (!verified) return CustomError.new(dictionary.invalidTOTP)
    }

    return user
  }
  catch (error) {
    throw error
  }
}

export const create2fa = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return CustomError.new(dictionary.userNotFound)
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
    throw (error)
  }
}