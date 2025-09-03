import { path } from 'path';
// import { Student} from "./student.interface";
import { studentmodel } from './student.model'

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

  const result = await studentmodel.findById({_id:id}).populate("addmissionSemester")

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
  const result = await studentmodel.updateOne({ id }, { isDeleted: true })

  return result
}

const updateSpecificStudentfromDb = async (id: string, email: string) => {
  const result = await studentmodel.updateOne({ id }, { $set: { email } })

  return result
}

export const studentServices = {
  // createStudentToDatabase,
  getAllStudentFromDB,
  getSpecificStudentsFromDb,
  deletedSpecificStudentfromDb,
  updateSpecificStudentfromDb,
}
