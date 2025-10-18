import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { studentRoutes } from './app/modules/student/student.route'
import { userRoutes } from './app/modules/user/user.route'
import { globarError } from './app/middleware/globalErrorHandler'
import { notFound } from './app/middleware/notfound'
import router from './app/routes'
import { promise } from 'zod'
  import cookieParser  from 'cookie-parser';

// const port = 3000

//parser

app.use(express.json())
app.use(cors({
  origin:["http://localhost:5173"]
}))
 app.use(cookieParser());

// application routes

// app.use("/api/v1/students",studentRoutes)
app.use('/api/v1', router)

// app.use("/api/v1/users",userRoutes)

app.get('/', (req: Request, res: Response) => {

  // Promise.reject()
  res.send('Hello World!')
})

// // catch all error
app.use(notFound)

// /// global error handler

app.use(globarError)

export default app
