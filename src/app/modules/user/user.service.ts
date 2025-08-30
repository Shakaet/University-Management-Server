import { TacademicSemester } from './../academicSem/academicSem.interface';
import { object } from "joi";
import config from "../../config";
import { Student } from "../student/student.interface";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { studentmodel } from "../student/student.model";
import { v4 as uuid } from "uuid";
import { AcademicSemesterModel } from "../academicSem/academicSem.model";
import { generatedStudentId } from './user.utils';





export const createStudentToDatabase=async(password:string,student:Student)=>{




  const userData:Partial<TUser>={}

  if(!password){
    userData.password=config.Password as string
  }else{
    userData.password=password
  }


  // create user role

  userData.role="student"

   
 






  // find Students academic semester

  let studentsAcademicSemester= await AcademicSemesterModel.findById(student.addmissionSemester)


   if(!studentsAcademicSemester){
    throw new Error("AcademicId is not valid")
   }





  userData.id=await generatedStudentId(studentsAcademicSemester)
  // userData.id=uuid()
    


  //create users 
   let newUser=await UserModel.create(userData)
  


  // create students

  if(Object.keys(newUser).length){

    student.id=newUser.id
    student.user=newUser._id

    let newStudent=await studentmodel.create(student)

      return newStudent
  }



  


    

}