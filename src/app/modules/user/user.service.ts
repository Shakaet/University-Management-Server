import { Student } from './../student/student.interface';
import { TacademicSemester } from './../academicSem/academicSem.interface'
import { object } from 'joi'
import config from '../../config'
import { Student } from '../student/student.interface'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import { studentmodel } from '../student/student.model'
import { v4 as uuid } from 'uuid'
import { AcademicSemesterModel } from '../academicSem/academicSem.model'
import { generatedStudentId } from './user.utils'
import { AppError } from '../../Errors/AppError'
import mongoose from 'mongoose'

export const createStudentToDatabase = async (
  password: string,
  student: Student,
) => {
  const userData: Partial<TUser> = {}

  if (!password) {
    userData.password = config.Password as string
  } else {
    userData.password = password
  }

  // create user role

  userData.role = 'student'

  // find Students academic semester

  let studentsAcademicSemester = await AcademicSemesterModel.findById(
    student.addmissionSemester,
  )

  if (!studentsAcademicSemester) {
    throw new AppError(404,'AcademicId is not valid',"")
  }
  let email=student.email
  let isstudent=await studentmodel.findOne({email})

  if(isstudent){
    throw new AppError(404,"student already exists","")
  }


  let session=await mongoose.startSession()


  try{

     session.startTransaction()

      userData.id = await generatedStudentId(studentsAcademicSemester)
  // userData.id=uuid()
   
  // transaction 1
  //create users
  let newUser = await UserModel.create([userData],{session})

  // create students

  if (!newUser.length) {
    throw new AppError(404,"user not created","")
   
  }
   student.id = newUser[0].id
    student.user = newUser[0]._id
    
    // transaction 2
    let newStudent = await studentmodel.create([student],{session})

    if(!newStudent.length){
      throw new AppError(404,"student not created","")
    }

     await session.commitTransaction()
    await session.endSession()


    return newStudent

   
  }catch(err){
    await session.abortTransaction()
    await session.endSession()
    throw new Error("failed to Create Students")

  }


}
