import { Server } from 'http'
import app from './app'
import config from './app/config'
// require('dotenv').config()
import mongoose from 'mongoose'

// let port=3000

// console.log(config.port,config.mongo_uri)
// console.log(process.env.PORT)


let server:Server

async function main() {
  try {
    await mongoose.connect(config.mongo_uri as string)

   server= app.listen(config.port, () => {
      console.log(`Example app listening on ports ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()


process.on("unhandledRejection",()=>{

  console.log("Unhandled Rejection Shutting down....");

  if(server){
    server.close(()=>{
      
      // console.log("server closed")
      process.exit(1)

    })
  }
  process.exit(1)
  


});

// Promise.reject()

process.on("uncaughtException",()=>{

  console.log("uncaught Exception Shutting down....");

  process.exit(1)


})

// console.log(x)
