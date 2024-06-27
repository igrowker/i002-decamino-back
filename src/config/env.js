import dotenv from 'dotenv'
import args from './args.js'

dotenv.config({
  path: args.mode === 'prod' ? './.env' : './.env.dev',
})

export default {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT
}