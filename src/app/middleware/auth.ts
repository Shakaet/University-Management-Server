import { NextFunction, Request, Response } from "express"
import { AppError } from "../Errors/AppError"





export let auth=()=>{

   return async function(req:Request,res:Response,next:NextFunction){

    let token= req.headers.authorization

    if(!token){
        throw new AppError(401,`You are not Authorized`,"")
    }

    next()



    }

}