import { Student } from './../student/student.interface';
import { AppError } from "../../Errors/AppError";
import { OfferedCourseModel } from "../offerCourses/offerCourse.model";
import { TEnrolledCourse } from "./enrollcourse.interface";
import EnrolledCourse from "./enrollcourse.model";
import { studentmodel } from '../student/student.model';
import mongoose from 'mongoose';
import { SemesterRegistrationModel } from '../semesterRegistration/semRe.model';
import { CourseModel } from '../course/course.model';


export let createEnrolledCourseIntoDB=async(userId:string,payload:TEnrolledCourse)=>{


    // validation : step 1: check the offeredCourse is exist
    // step2: check if the student is already enrolled
    // step3: check if the max credit exceed
    // step 4: create an enrolled course

    let {offeredCourse}=payload

    let isOfferedCourseExist=await OfferedCourseModel.findById(offeredCourse)

    if(!isOfferedCourseExist){
        throw new AppError(404,"offer course not found !","")
    }

  

    

    if(isOfferedCourseExist.maxCapacity<=0){
        throw new AppError(404,"Room is full","")
    }

    // 2 tai same
    // let student=await studentmodel.findOne({id:userId}).select("_id")
    // field filtering
    let student=await studentmodel.findOne({id:userId},{_id:1})

     if(!student){
        throw new AppError(404,"student not found !","")
    }

    let isStudentAlreadyEnrolled= await EnrolledCourse.findOne({
        semesterRegistration: isOfferedCourseExist?.semesterRegistration,
        offeredCourse:offeredCourse,
        student:student?._id
    })


    if(isStudentAlreadyEnrolled){
        throw new AppError(404,"student already enrolled","")
    }

    // check total credit exceed maxcredit
    let semesterRegistration=await SemesterRegistrationModel.findById(isOfferedCourseExist.semesterRegistration).select("maxCredit")


    //check total enroll credit+new enroll credit > maxCredit then do throw error


   let enrollCourses=await EnrolledCourse.aggregate([
    {$match:{
     semesterRegistration:isOfferedCourseExist.semesterRegistration,
     student:student._id
}},
{
    $lookup:{
        from:"courses",
        localField:"course",
        foreignField:"_id",
         as:"enrolledCourseData"

    }
},
{
    $unwind:"$enrolledCourseData"
},
{
    $group:{_id:null,totalEnrolledCredit:{$sum:"$enrolledCourseData.credit"}}
},
{
        $project:{_id:0,totalEnrolledCredit:1}
    }

   ])

//    console.log(enrollCourses[0].totalEnrolledCredit)  

let totalCredits=enrollCourses.length>0 ?enrollCourses[0].totalEnrolledCredit:0
 
// console.log(totalCredits)

 //check total enroll credit+new enroll credit > maxCredit then do throw error
   let course=await CourseModel.findById(isOfferedCourseExist.course)

if(totalCredits && semesterRegistration?.maxCredit && totalCredits+course?.credit >semesterRegistration?.maxCredit){

    throw new AppError(404,"you have exceeded max number of credit","")
}

    let session=await mongoose.startSession()


  try{

     session.startTransaction()

     

    let result= await EnrolledCourse.create([{
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
          academicSemester: isOfferedCourseExist.academicSemester,
          academicFaculty: isOfferedCourseExist.academicFaculty,
          academicDepartment: isOfferedCourseExist.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExist.course,
          student: student._id,
          faculty:isOfferedCourseExist.faculty,
          isEnrolled:true

        // bakigulo auto mongodb boshabe
        //   isEnrolled: 
        //   courseMarks: 
        //   grade: TGrade;
        //   gradePoints:
        //   isCompleted: 
    }],{session})

    if(!result){
        throw new AppError(404,"Failed to enrolled in this course","")
    }


    let maxcapacity= isOfferedCourseExist.maxCapacity
    await OfferedCourseModel.findByIdAndUpdate(
        offeredCourse,
        {
            maxCapacity:maxcapacity-1,
        },
        {session}
    )

     await session.commitTransaction()
    await session.endSession()

    return result



  }catch(err){
    await session.abortTransaction()
    await session.endSession()
    throw new Error("failed to Create Students")

  }
}