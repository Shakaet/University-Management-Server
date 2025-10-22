import dotenv from 'dotenv'

import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  mongo_uri: process.env.MONGODB_URI,
  bcryptHash: process.env.bcrypt,
  Password: process.env.default_Pass,
  JWT_Access_Secret:process.env.JWT_Access_Secret as string,
  JWT_Refresh_Secret:process.env.JWT_Refresh_Secret as string,
  JWT_Access_Expired:process.env.JWT_Access_Expired || "10d",
  JWT_Refresh_Expired:process.env.JWT_Refresh_Expired|| "365d",
  Reset_Password_UI_Link:process.env.Reset_Password_UI_Link 

}




// NODE_ENV= development
// PORT=5000

// MONGODB_URI="mongodb+srv://Mongoose1:GTmub0LEcBzUd9v4@cluster0.bnqcs.mongodb.net/first-mongoose-project?retryWrites=true&w=majority&appName=Cluster0"
// bcrypt=12
// default_Pass=1234568888

// JWT_Access_Secret=f9a84cd7d525ce1e4fde60bccce2095d5182185b872e331c8c3fbed5b82a0635

// JWT_Refresh_Secret=71d21acfbfa99f5d6357cc71abcee8798a17b72b12fe53daec4fe093cfc49cd0

// JWT_Access_Expired=10d
// JWT_Refresh_Expired=365d

// Reset_Password_UI_Link= http://localhost:3000

// process to genrated secret key by terminal

//first e terminal e 'node' lekhe ender dite hobe

// then type 
//  require('crypto').randomBytes(32).toString("hex")