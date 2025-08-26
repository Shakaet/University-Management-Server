import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { studentRoutes } from './app/modules/student/student.route'
import { userRoutes } from './app/modules/user/user/user.route'

// const port = 3000

//parser

app.use(express.json())
app.use(cors())



// application routes

app.use("/api/v1/students",studentRoutes)

app.use("/api/v1/users",userRoutes)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})




// // catch all error
// app.use((req:Request, res:Response) => {
//   res.status(404).json({
//     status: false,
//     message: "not found"
//   });
// });

// /// global error handler

// app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
//   if(err){
//     // console.log(err)

//     res.status(400).json({
//       status:false,
//       message:"soththing went wrong"
//     })
//   }
// })

export default app
