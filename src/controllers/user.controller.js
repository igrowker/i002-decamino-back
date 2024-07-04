import * as userServices from '../services/user.service.js'
import { generateToken } from '../utils/jwt.js';
import { userSchema } from '../schemas/user.schema.js'
import UserDto from '../utils/user.dto.js'
import CustomError from '../utils/custom.error.js';
import cloudinary from '../config/cloudinary.js'
import fs from 'fs'
import User from '../models/user.model.js';
import dictionary from '../utils/error.dictionary.js';

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

    const userData = new UserDto(user);

    const token = generateToken({ ...userData })

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

export const POSTProfileImg = async (req, res, next) => {
  const { id } = req.user

  try {
    if (!req.file) {
      return CustomError.new(dictionary.missingFile)
    }

    const result = await userServices.uploadProfileImg(id, req.file)

    const updatedUser = await userServices.updateUser(id, { profileImg: result.secure_url })

    const updatedUserData = new UserDto(updatedUser);

    const token = generateToken({ ...updatedUserData })

    fs.unlinkSync(req.file.path);  // Eliminación de la imagen en local

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
      token
    });
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