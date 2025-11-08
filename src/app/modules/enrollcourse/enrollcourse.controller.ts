import { catchAsynFunction } from "../../utils/catchAsync";
import { senResponse } from "../../utils/sendResponse";
import { createEnrolledCourseIntoDB } from "./enrollcourse.service";


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