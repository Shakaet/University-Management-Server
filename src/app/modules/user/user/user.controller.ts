import { createStudentToDatabase } from "./user.service"
import { Student } from "../../student/student.interface"
import { Request, Response } from "express"






export const createStudent =async(req:Request,res:Response)=>{


try{
    
    let {password,students}=req.body


    let result=  await createStudentToDatabase(password,students)



    
     // send response
      
    res.status(200).json({
        status:true,
        message:"student created successfully",
        data:result
    })

   }catch(err:any){
    // console.log(err)
    // next(err)
    res.status(500).json({
        status:false,
        message:` ${err.message} ||something Wrong`,
        data:err
    })


    

   }

}
