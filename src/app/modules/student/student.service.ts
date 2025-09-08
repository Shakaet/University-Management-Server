import { path } from 'path';
// import { Student} from "./student.interface";
import { studentmodel } from './student.model'
import mongoose from 'mongoose';
import { UserModel } from '../user/user.model';
import { AppError } from '../../Errors/AppError';
import { Student } from './student.interface';

// const createStudentToDatabase=async(student:Student)=>{

//     //    console.log(student.id)

//     // for instance method
//     //    const s=new studentmodel(student)
//     //    if(await s.isUserExist(student.id)){

//     //     throw new Error("students Id already exist")

//     //    }

//        if(await studentmodel.myStaticMethod(student.id)){
//         throw new Error("students Id already existtt")

//        }

//         // const result= await Studentmodel.create(student)  // build in static method in mongoose
//         const student1=new studentmodel(student)   // create a instance

//         return await student1.save()  // build in instance method
//         // return result

// }

const getAllStudentFromDB = async () => {
  const result = await studentmodel.find().populate("addmissionSemester")

  // cause academic department abar populate kore academicFaculty ke
  .populate({
    path:"academicDepartment",
    populate:{
      path:"academicFaculty"
    }
  })
  return result
}

const getSpecificStudentsFromDb = async (id: string) => {
  // const result=await studentmodel.findOne({id})

  const result = await studentmodel.findOne({id}).populate("addmissionSemester")

  // cause academic department abar populate kore academicFaculty ke
  .populate({
    path:"academicDepartment",
    populate:{
      path:"academicFaculty"
    }
  })

  return result
}

const deletedSpecificStudentfromDb = async (id: string) => {



let isStudentExist=await studentmodel.findOne({id})
if(!isStudentExist){
  throw new AppError(404,"students not found","")
}
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // transaction 1
    const deletedStudent = await studentmodel.findOneAndUpdate(
      { id },   // custom field
      { isDeleted: true },
      { new: true, session }
    )

    if (!deletedStudent) {
      throw new AppError(400, "Student Update Failed", "")
    }

    // transaction 2
    const deletedUser = await UserModel.findOneAndUpdate(
      { id },   // custom field
      { isDeleted: true },
      { new: true, session }
    )

    if (!deletedUser) {
      throw new AppError(400, "User Update Failed", "")
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    
  }
}


const updateSpecificStudentfromDb = async (id: string, payload: Partial<Student>) => {
  const result = await studentmodel.updateOne({ id },  payload )

  return result
}

export const studentServices = {
  // createStudentToDatabase,
  getAllStudentFromDB,
  getSpecificStudentsFromDb,
  deletedSpecificStudentfromDb,
  updateSpecificStudentfromDb,
}
