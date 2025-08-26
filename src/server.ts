import app from './app'
import config from './app/config'
// require('dotenv').config()
import mongoose from 'mongoose'

// let port=3000

// console.log(config.port,config.mongo_uri)
// console.log(process.env.PORT)

async function main() {
  try {
    await mongoose.connect(config.mongo_uri as string)

    app.listen(config.port, () => {
      console.log(`Example app listening on ports ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
