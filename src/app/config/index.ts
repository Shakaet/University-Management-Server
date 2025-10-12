import dotenv from 'dotenv'

import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  mongo_uri: process.env.MONGODB_URI,
  bcryptHash: process.env.bcrypt,
  Password: process.env.default_Pass,
}




// NODE_ENV= development
// PORT=5000

// MONGODB_URI="mongodb+srv://Mongoose1:GTmub0LEcBzUd9v4@cluster0.bnqcs.mongodb.net/first-mongoose-project?retryWrites=true&w=majority&appName=Cluster0"
// bcrypt=12
// default_Pass=1234568888
