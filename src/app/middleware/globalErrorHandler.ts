import { path } from 'path';
// import express, { NextFunction, Request, Response } from 'express'

import { ErrorRequestHandler } from "express"
import { ZodError } from 'zod';

// export let globarError = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const statusCode = err.StatusCode || 500
//   const message = err.message || 'Something Went Wrong'

//   return res.status(statusCode).json({
//     status: false,
//     message,
//     error: err,
//   })
// }





export let globarError:ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {


  // default error
  let statusCode = err.StatusCode || 500
  let message = err.message || 'Something Went Wrong'


  type TerrorSource={
    path:string|number,
    message:string
  }[]

  let errorSource:TerrorSource=[
    {
      path:"",
      message:"Something Went Wrong"
    }
  ]

  if(err instanceof ZodError){
    statusCode=200,
    message="ami zod"

  }



  return res.status(statusCode).json({
    status: false,
    message,
    errorSource,
    error: err.issues[0].path,
  })
}


/// Error Pattern

/*
success,
message,
errorSource:[
path:"",
message:""

],
stack

*/
