import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})
export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
  NODE_ENV: process.env.NODE_ENV
}
