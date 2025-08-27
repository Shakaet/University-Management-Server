



import express, {  NextFunction, Request, Response } from 'express'


export let notFound= (req:Request,res:Response,next:NextFunction)=>{


  

  return res.status().json({

    status:false,
    message:"API not Found",
    error:""
    
  })
  
}