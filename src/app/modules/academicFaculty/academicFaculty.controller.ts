
import { NextFunction, Request, Response } from "express"
import { catchAsynFunction } from "../../utils/catchAsync"
import { createAcademicFacultyToDb, findAllAcademicFaculty, findOneAcademicFaculty, updateAcademicFaculty } from "./academicFaculty.service"





// RequestHandler dile autometic req,res,next er type declard hoye jabe
export const createAcademicFacultyController =catchAsynFunction(async(req,res)=>{



    
    let payload=req.body


    let result=  await createAcademicFacultyToDb(payload)



    
     // send response
      
    res.status(201).json({
        status:true,
        message:(result as any)?.message || "Academic Faculty created successfully",
        data:result
    })


    // senResponse(res,200,{
    //     status:true,
    //     message:(result as any)?.message || "student created successfullyN",
    //      data:result
    // })

   

})



export let findAllAcademicFacultyController=async(req:Request,res:Response,next:NextFunction)=>{


    let result=await findAllAcademicFaculty()

    res.send(result)

}

export let findOneAcademicFacultyController=async(req:Request,res:Response,next:NextFunction)=>{

    let id=req.params.semesterId
    let result=await findOneAcademicFaculty(id)

    res.send(result)

}
export let updateAcademicFacultyController=async(req:Request,res:Response,next:NextFunction)=>{

    let id=req.params.semesterId
    let data=req.body
    let result=await updateAcademicFaculty(id,data)

    // res.send(result)

     res.status(200).json({
        status:true,
        message:(result as any)?.message || "Academic Semester updated successfully",
        data:result
    })

}

