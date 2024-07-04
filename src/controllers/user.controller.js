import * as userServices from '../services/user.service.js'
import { generateToken } from '../utils/jwt.js';
import { userSchema } from '../schemas/user.schema.js'
import UserDto from '../utils/user.dto.js'
import CustomError from '../utils/custom.error.js';

export const POSTUserRegister = async (req, res, next) => {
  const data = req.body;
  try {
    const { error, value } = userSchema.validate(data);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await userServices.registerUser(value);

    return res.status(201).json(response);

  } catch (error) {
    next(error)
  }
}

export const POSTUserLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {

    const user = await userServices.loginUser(email, password)

    const token = generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
      favorites: user.favorites,
      role: user.role
    })

    return res.status(200).json({ token })

  } catch (error) {
    next(error)
  }
}

export const POST2faSetup = async (req, res) => {
  const { id } = req.user

  try {
    const response = await userServices.create2fa(id)
    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
}

export const GETUser = async (req, res) => {
  try {
    const { id } = req.user
    const user = await userServices.readUser(id)
    return res.status(200).json({ response: new UserDto(user) });
  }
  catch (error) {
    next(error)
  }
}

export const PUTUser = async (req, res, next) => {
  try {
    const { id } = req.user
    const data = req.body
    const response = await userServices.updateUser(id, data)
    return res.status(200).json({ response: new UserDto(response) });
  }
  catch (error) {
    next(error)
  }
}