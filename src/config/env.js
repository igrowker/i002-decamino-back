import dotenv from 'dotenv'
import args from './args.js'

dotenv.config({
  path: args.mode === 'dev' ? './.env' : './.env.dev',
})

export default {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
}