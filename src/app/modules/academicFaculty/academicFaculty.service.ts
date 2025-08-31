import { TacademicFaculty } from "./academicFaculty.interface"
import { academicFacultyModel } from "./academicFaculty.model"



export let createAcademicFacultyToDb=async(payload:TacademicFaculty)=>{



  




    let result=await academicFacultyModel.create(payload)

    return result


}



export let findAllAcademicFaculty=async()=>{

    let result=await academicFacultyModel.find()

    return result
}

export let findOneAcademicFaculty=async(id:string)=>{

    let result=await academicFacultyModel.findOne({_id:id})

    return result
}

export let updateAcademicFaculty=async(id:string,data:TacademicFaculty)=>{

   


    
    let result=await academicFacultyModel.updateOne(

         {_id:id},
        {$set:{
            name:data.name,

        }}

       
)

    return result
}