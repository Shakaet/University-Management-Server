import { TacademicSemester } from "../academicSem/academicSem.interface"
import { UserModel } from "./user.model"



let findStudentLastId=async()=>{
    let findlastStudentIdx=await UserModel.findOne({
        role:"student"
    },{id:1,_id:0}).sort({createdAt:-1}).lean()

    if(findlastStudentIdx){
        return findlastStudentIdx?.id?.substring(6)
    }
    else{
        return undefined
    }
    
}

 //  id format hobe year+code+00+01+02
  export let generatedStudentId=async(payload:TacademicSemester|null)=>{


    //  console.log(await findStudentLastId())
   
     let currentId=await findStudentLastId()|| (0).toString()

     let increment=(Number(currentId)+1).toString().padStart(4,"0")

     let increamentId=`${payload?.year}${payload?.code}${increment}`

     return increamentId



  }
