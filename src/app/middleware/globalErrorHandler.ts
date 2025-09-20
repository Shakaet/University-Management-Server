import { path } from 'path';
// import express, { NextFunction, Request, Response } from 'express'

import { ErrorRequestHandler } from "express"
import { ZodError, ZodIssue } from 'zod';
import { TerrorSource } from '../interface/error';
import config from '../config';
import { handlerZod } from '../Errors/zodEoor';
import { handleMongooseValidationError } from '../Errors/handleMongooseValidationError';
import { handleCastError } from '../Errors/handleCastError';

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


 
  let errorSource:TerrorSource=[
    {
      path:"",
      message:"Something Went Wrong"
    }
  ]


  if(err instanceof ZodError){
    // statusCode=200,
    // message="ami zod"


    

    let simplifyZod=handlerZod(err)
    // console.log(simplifyZod)
      statusCode=simplifyZod?.statusCode
      message=simplifyZod?.message
      errorSource=simplifyZod?.errorSource

  }else if(err.name=="ValidationError"){
    // console.log("ami mongoose Error")
    let simplifymongoose=handleMongooseValidationError(err)
    // console.log(simplifyZod)
      statusCode=simplifymongoose?.statusCode
      message=simplifymongoose?.message
      errorSource=simplifymongoose?.errorSource

  }else if(err.name==="CastError"){

    let simplifyCastError=handleCastError(err)
       statusCode=simplifyCastError?.statusCode
      message=simplifyCastError?.message
      errorSource=simplifyCastError?.errorSource


  }



  return res.status(statusCode).json({
    status: false,
    message,
    errorSource,
    // err,
    stack: config.NODE_ENV==="development" ? err?.stack:null
    // error: err.issues[0].path,

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
