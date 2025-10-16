import { NextFunction, Request, Response } from "express"
import { AppError } from "../Errors/AppError"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"



// // interface emn use korle shob khane Request er jaygay CustomRequest use korte hobe
// interface CustomRequest extends Request{
//     user:JwtPayload
// }



declare global{
    namespace Express{
        interface Request{
            user:JwtPayload
        }
    }
}


export let auth=()=>{

   return async function(req:Request,res:Response,next:NextFunction){

    let token= req.headers.authorization

    // if the token is sent from the client
    if(!token){
        throw new AppError(401,`You are not Authorized`,"")
    }

    // check if the token is valid


    // verify a token symmetric
        jwt.verify(token, config.JWT_Access_Secret as string, function(err, decoded) {

            if(err){

                throw new AppError(401,`You are not Authorized`,"")
            }

            // let {userId,role}= decoded

            // console.log(userId,role)

            req.user=decoded as JwtPayload
            
             next()

    
        });



   



    }

}