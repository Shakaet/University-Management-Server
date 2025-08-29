
import { catchAsynFunction } from "../../utils/catchAsync"
import { senResponse } from "../../utils/sendResponse"
import { createAcademicSemToDb } from "./academicSem.service"





// RequestHandler dile autometic req,res,next er type declard hoye jabe
export const createAcademicSemester =catchAsynFunction(async(req,res)=>{



    
    let payload=req.body


    let result=  await createAcademicSemToDb(payload)



    
     // send response
      
    res.status(201).json({
        status:true,
        message:(result as any)?.message || "Academic Semester created successfully",
        data:result
    })


    // senResponse(res,200,{
    //     status:true,
    //     message:(result as any)?.message || "student created successfullyN",
    //      data:result
    // })

   

})
