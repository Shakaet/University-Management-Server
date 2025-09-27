import { path } from 'path';
// import { Student} from "./student.interface";
import { studentmodel } from './student.model'
import mongoose from 'mongoose';
import { UserModel } from '../user/user.model';
import { AppError } from '../../Errors/AppError';
import { Student } from './student.interface';
import { fi } from 'zod/v4/locales/index.cjs';

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

const getAllStudentFromDB = async (query:Record<string,unknown>) => {



   let {searchTerm,email,sortField,sortOrder,limit,page,field}=query


   
 // {email:{$regex:query.searchTerm,$options:"i"}}

//  console.log(sortField,sortOrder,limit)


//  let searchTerm=""
//  if(query.searchTerm){

//   searchTerm=query.searchTerm as string
//  }


 // evabeo kora jay

// {
//   $or: [
//     { email: { $regex: "john", $options: "i" } },
//     { "name.firstName": { $regex: "john", $options: "i" } },
//     { presentAddress: { $regex: "john", $options: "i" } }
//   ]
// }


let andConditions = [];

if (searchTerm) {
  andConditions.push({
    $or: ["email", "name.firstName", "presentAddress"].map(field => ({
      [field]: { $regex: searchTerm, $options: "i" }
    }))
  });
}

if (email) {
  andConditions.push({ email: email });
}



const querys = andConditions.length > 0 ? { $and: andConditions } : {};

// Default sort
const sort :Record<string, 1 | -1> = {};
if (sortField) {
  sort[sortField as string] = sortOrder === "desc" ? -1 : 1; // 1 = asc, -1 = desc
}

// Pagination
const limitNum = parseInt(limit as string) || 20; // default 20
const pageNum = parseInt(page as string) || 1; // default 1
const skipNum = (pageNum - 1) * limitNum;

 // 🎯 Field limiting (projection)
  let projection: string = '-__v';
  if (field) {
    projection = (field as string)
      .split(",")
      .map(f => f.trim())
      .join(" ");
  }
  

  const result = await studentmodel.find(
    querys
  ).sort(sort).select(projection).skip(skipNum).limit(limitNum).populate("addmissionSemester")

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

  const result = await studentmodel.findById(id).populate("addmissionSemester")

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



let isStudentExist=await studentmodel.findById(id)
if(!isStudentExist){
  throw new AppError(404,"students not found","")
}
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // transaction 1
    const deletedStudent = await studentmodel.findByIdAndUpdate(
       id ,   
      { isDeleted: true },
      { new: true, session }
    )

    if (!deletedStudent) {
      throw new AppError(400, "Student Update Failed", "")
    }


    let userId=deletedStudent.user

    // transaction 2
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,   
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
    throw new Error("failed to Delete Students")
    
  }
}


const updateSpecificStudentfromDb = async (id: string, payload: Partial<Student>) => {


  let {name,guardian,localGuardian,...remainingStudentData}=payload

  // client theke pathabo

  /*
  guardian:{

  "fatherOccupation":"Teacher"
  }

  eta mutate hoye jabe tai etak evabe transform korte hobe

  "guardian.fatherOccupation:"Teacher"

  */


  let modifiedData:Record<string,unknown>={...remainingStudentData}


  if(name && Object.keys(name).length){

    for(let[key,value] of Object.entries(name) ){
      modifiedData[`name.${key}`]=value
    }
  }

  if(guardian && Object.keys(guardian).length){

    for(let[key,value] of Object.entries(guardian) ){
      modifiedData[`guardian.${key}`]=value
    }
  }

  if(localGuardian && Object.keys(localGuardian).length){

    for(let[key,value] of Object.entries(localGuardian) ){
      modifiedData[`localGuardian.${key}`]=value
    }
  }

  const result = await studentmodel.findByIdAndUpdate( id ,  modifiedData,{
    runValidators:true
  } )

  return result
}

export const studentServices = {
  // createStudentToDatabase,
  getAllStudentFromDB,
  getSpecificStudentsFromDb,
  deletedSpecificStudentfromDb,
  updateSpecificStudentfromDb,
}
