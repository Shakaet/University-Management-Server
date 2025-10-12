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

   let {semesterRegistration,academicFaculty,academicDepartment,course, faculty}=payload


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




     let result= await OfferedCourseModel.create({...payload,academicSemester})
    
     return result
}