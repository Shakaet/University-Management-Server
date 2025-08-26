import { object } from "joi";
import config from "../../../config";
import { Student } from "../../student/student.interface";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";




export const createStudentToDatabase=async(password:string,student:Student)=>{




  const userData:Partial<TUser>={}

  if(!password){
    userData.password=config.Password as string
  }else{
    userData.password=password
  }


  // create user role

  userData.role="student"


  userData.id="20301010001"
    

  //create users 
  let newUser=await UserModel.create(userData)



  // create students

  if(Object.keys(newUser).length){

    student.id=newUser.id
    student.user=newUser._id
  }


    

}