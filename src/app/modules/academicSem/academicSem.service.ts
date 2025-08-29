import { TacademicSemester } from "./academicSem.interface"
import { AcademicSemesterModel } from "./academicSem.model"



export let createAcademicSemToDb=async(payload:TacademicSemester)=>{


    let result=await AcademicSemesterModel.create(payload)

    return result


}