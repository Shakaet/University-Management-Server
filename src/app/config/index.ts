import dotenv from 'dotenv'

import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGODB_URI,
  bcryptHash: process.env.bcrypt,
  Password: process.env.default_Pass,
}
