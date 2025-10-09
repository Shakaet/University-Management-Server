import { Request, RequestHandler, Response } from "express"
import { catchAsynFunction } from "../../utils/catchAsync"
import { createSemesterRegistrationServices } from "./semRe.service"




export let createSemesterRegistrationToDB=catchAsynFunction(async(req:Request,res:Response)=>{

   let payload=req.body
  //  console.log(payload)
    let result=await createSemesterRegistrationServices(payload)

      /// httpStatus.OK
     res.status(200).json({
      status: true,
      messsage: 'Semester Registration Created successfully',
      data: result,
    })




})


export let getAllSemesterRegistration=async()=>{


    

}



export let singleSemesterRegistration=async()=>{


    

}


export let updateSemesterRegistrationToDB=async()=>{


    

}