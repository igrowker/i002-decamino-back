import { v2 as cloudinary } from 'cloudinary';
import env from './env.js'

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET
});

export default cloudinary