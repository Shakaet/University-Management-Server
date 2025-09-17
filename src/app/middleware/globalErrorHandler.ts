import { path } from 'path';
// import express, { NextFunction, Request, Response } from 'express'

import { ErrorRequestHandler } from "express"
import { ZodError, ZodIssue } from 'zod';
import { TerrorSource } from '../interface/error';
import config from '../config';

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

let handlerZod = (err: ZodError) => {
  let statusCode = 400;

  let errorSource:TerrorSource=err.issues.map((issue:ZodIssue)=>{
      return{
        path:issue.path[issue.path.length-1],
        message:issue.message,
      }

    })

  return {
    statusCode,
    message:"Zod Validation Error",
    errorSource
  };
};

  if(err instanceof ZodError){
    // statusCode=200,
    // message="ami zod"


    

    let simplifyZod=handlerZod(err)
    // console.log(simplifyZod)
      statusCode=simplifyZod?.statusCode
      message=simplifyZod?.message
      errorSource=simplifyZod?.errorSource

  }



  return res.status(statusCode).json({
    status: false,
    message,
    errorSource,
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
