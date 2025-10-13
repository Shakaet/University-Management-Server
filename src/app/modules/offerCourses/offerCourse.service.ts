import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../Errors/AppError";
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { academicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { CourseModel } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistrationModel } from "../semesterRegistration/semRe.model";
import { TOfferedCourse } from "./offerCourse.interface";
import { OfferedCourseModel } from "./offerCourse.model";



export let createOfferedCoursesIntoDb=async(payload:Partial<TOfferedCourse>)=>{


   //check if the semester registration id is exist!
//   console.log(payload)

   let {semesterRegistration,academicFaculty,academicDepartment,course, faculty,section}=payload


   let isSemesterRegistrationExist=await SemesterRegistrationModel.findById(semesterRegistration)


   if(!isSemesterRegistrationExist){
    throw new AppError(404,"Semester Registration Not Found","")
   }


   let academicSemester=await isSemesterRegistrationExist.academicSemester

     let isacademicFacultyExist=await academicFacultyModel.findById(academicFaculty)


   if(!isacademicFacultyExist){
    throw new AppError(404,"Academic Faculty Not Found","")
   }

    let isacademicDepartmentExist=await academicDepartmentModel.findById(academicDepartment)


   if(!isacademicDepartmentExist){
    throw new AppError(404,"Academic Department Not Found","")
   }

   let isCoursesExist=await CourseModel.findById(course)


   if(!isCoursesExist){
    throw new AppError(404,"Courses Not Found","")
   }

    let isFacultyExist=await Faculty.findById(faculty)


   if(!isFacultyExist){
    throw new AppError(404,"Faculty Not Found","")
   }



   // check if the department is belong to the faculty

   let isDepartmentBelongToFaculty=await academicDepartmentModel.findOne({
    _id:academicDepartment,
    academicFaculty,
    
   })


   if(!isDepartmentBelongToFaculty){
     throw new AppError(404,`the ${isacademicDepartmentExist.name} is not belong to this ${isacademicFacultyExist.name}`,"")
   }



   // check if the same offered course same section in same registered semister exist



   let isSameOfferCourseExistsWithSameRegisteredSemesterWithSameSection=await
   OfferedCourseModel.findOne({
    semesterRegistration,
    course,
    section
   })

   if(isSameOfferCourseExistsWithSameRegisteredSemesterWithSameSection){
    throw new AppError(400,`Offered Course with same section is already exist!`,"")
   }


  




     let result= await OfferedCourseModel.create({...payload,academicSemester})
    
     return result
}




export const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  
//    let {searchTerm,email,sortField,sortOrder,limit,page,field}=query

// let andConditions = [];

// if (searchTerm) {
//   andConditions.push({
//     $or: ["email", "name.firstName", "presentAddress"].map(field => ({
//       [field]: { $regex: searchTerm, $options: "i" }
//     }))
//   });
// }

// if (email) {
//   andConditions.push({ email: email });
// }


// const querys = andConditions.length > 0 ? { $and: andConditions } : {};

// // Default sort
// const sort :Record<string, 1 | -1> = {};
// if (sortField) {
//   sort[sortField as string] = sortOrder === "desc" ? -1 : 1; // 1 = asc, -1 = desc
// }

// // Pagination
// const limitNum = parseInt(limit as string) || 20; // default 20
// const pageNum = parseInt(page as string) || 1; // default 1
// const skipNum = (pageNum - 1) * limitNum;

//  // 🎯 Field limiting (projection)
//   let projection: string = '-__v';
//   if (field) {
//     projection = (field as string)
//       .split(",")
//       .map(f => f.trim())
//       .join(" ");
//   }
  

//   const result = await Faculty.find(
//     querys
//   ).sort(sort).select(projection).skip(skipNum).limit(limitNum).populate("academicDepartment")

 
//   return result


// use Query builder

const queryBuilder = new QueryBuilder(OfferedCourseModel.find(), query)
    // .search(["email", "name.firstName", "presentAddress"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await queryBuilder.modelQuery.populate({
    path:"semesterRegistration",
    populate:{
        path:"academicSemester"
    }
    
  });
  return result;
};