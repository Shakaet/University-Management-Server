import { catchAsynFunction } from "../../utils/catchAsync";
import { senResponse } from "../../utils/sendResponse";
import { createEnrolledCourseIntoDB, updateEnrolledCourseMarksServices } from "./enrollcourse.service";


export let createEnrolledCourse=catchAsynFunction(async(req,res)=>{


  const userId = req.user.userId;

//   console.log(userId)

  const result = await createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  senResponse(res,200, {
    status: true,
    message: 'Student is enrolled succesfully',
    data: result,
  });


})



export let  updateEnrolledCourseMarks=catchAsynFunction(async(req,res)=>{


  let facultyId=req.user.userId
  // console.log(user)


  let result=await updateEnrolledCourseMarksServices(facultyId,req.body)

   senResponse(res,200, {
    status: true,
    message: 'Student enrolled course mark updated succesfully',
    data: result,
  });
})