import { NextFunction, Request, RequestHandler, Response } from "express"
import { studentServices } from "./student.service"
import { catchAsynFunction } from "../../utils/catchAsync"






// eta request,response handle kore just,database e ki ache ta janena,ota service er kaj

// export const createStudent =async(req:Request,res:Response)=>{


//    try{



//      const student:Student=req.body.students
      
//      // data validation using joi
//     //  const { error, value } = studentJoiSchema.validate(student);


//     //  console.log(error,value)
//     //  if(error){
//     //      return res.status(500).json({
//     //     status:false,
//     //     message:"something Wrongg",
//     //     data:error
//     // })

//     //  }
//      // when using joi
//     // const result=await studentServices.createStudentToDatabase(value)



//       // validation with zod


//     const zodParseData= studentZodSchema.parse(student)
//     const result=await studentServices.createStudentToDatabase(zodParseData)





  

//      // send response
      
//     res.status(200).json({
//         status:true,
//         message:"student created successfully",
//         data:result
//     })


//    }catch(err:any){
//     // console.log(err)
//     // next(err)
//     res.status(500).json({
//         status:false,
//         message:` ${err.message} ||something Wrong`,
//         data:err
//     })

    

//    }
   
    

// }



export const getAllStudents:RequestHandler=catchAsynFunction(async(req,res,next)=>{


  
        const result= await studentServices.getAllStudentFromDB()

    res.status(201).json({
        success:true,
        message:"all students data find",
        data:result
    })

    

    

    

})

export const getSpecificStudent:RequestHandler=catchAsynFunction(async(req,res,next)=>{

  
     const id=req.params.id
     console.log(id)

    const result=await studentServices.getSpecificStudentsFromDb(id)

    res.status(200).json({
        status:true,
        messsage:"data find",
        data:result
    })

  

}
)

export const deletedSpecificStudent:RequestHandler=catchAsynFunction(async(req,res,next)=>{



   
        const id= req.params.id

    const result= await studentServices.deletedSpecificStudentfromDb(id)
    
    res.status(200).json({
        status:true,
        messsage:"data find",
        data:result
    })

   
    
    }
)

export const updateStudent:RequestHandler=async(req,res,next)=>{



    try{
        const id= req.params.id

        const email=req.body.email

    const result= await studentServices.updateSpecificStudentfromDb(id,email)
    
    res.status(200).json({
        status:true,
        messsage:"data updated",
        data:result
    })

   }catch(err:any){
    //  res.status(500).json({
    //     status:false,
    //     message:` ${err.message} ||something Wrong`,
    //     data:err
    // })

    // console.log("errroer",err)
     next(err)
   }
    
    }

    


