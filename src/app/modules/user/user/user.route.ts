
import express, { NextFunction, Request } from "express"
import { createStudent } from "./user.controller"
import { ZodObject } from "zod";
import { studentZodSchema } from "../../student/validation.jod";







const router= express.Router()

let validateRequest:any=(schema:ZodObject)=>{

      return async(req:Request,res:Response,next:NextFunction)=>{
    // // console.log(req.body.student)
    // console.log(`hello hi ${hh}`)


   try{
     //validate check
   await schema.parseAsync({
    body:req.body
   })


     next()
   }catch(err){
    next(err)
   }

}

}


// will call controller function
router.post("/create-student",validateRequest(studentZodSchema),createStudent)



export const userRoutes=router


