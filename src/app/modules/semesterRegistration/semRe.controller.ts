import { Request, RequestHandler, Response } from "express"
import { catchAsynFunction } from "../../utils/catchAsync"
import { createSemesterRegistrationServices, getAllSemesterRegistrationservices, singleSemesterRegistrationservices } from "./semRe.service"




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


export let getAllSemesterRegistration=catchAsynFunction(async(req,res)=>{



  let result=await getAllSemesterRegistrationservices(req.query)




   /// httpStatus.OK
     res.status(200).json({
      status: true,
      messsage: 'Semester Registration Find Data successfully',
      data: result,
    })


    

})



export let singleSemesterRegistration=catchAsynFunction(async(req,res)=>{




  let id=req.params.id

  let result =await singleSemesterRegistrationservices(id)











  /// httpStatus.OK
     res.status(200).json({
      status: true,
      messsage: 'Semester Registration Find Single Data successfully',
      data: result,
    })


  


    

})


export let updateSemesterRegistrationToDB=async()=>{


    

}