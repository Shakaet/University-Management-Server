import { createFacultyIntoDB, createStudentToDatabase } from './user.service'
import { Student } from '../student/student.interface'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { senResponse } from '../../utils/sendResponse'
import { catchAsynFunction } from '../../utils/catchAsync'

// RequestHandler dile autometic req,res,next er type declard hoye jabe
export const createStudent = catchAsynFunction(async (req, res) => {
  let { password, student } = req.body

  let result = await createStudentToDatabase(password, student)

  // send response

  // res.status(200).json({
  //     status:true,
  //     message:(result as any)?.message || "student created successfully",
  //     data:result
  // })

  senResponse(res, 200, {
    status: true,
    message: (result as any)?.message || 'student created successfullyN',
    data: result,
  })
})


export const createFaculty = catchAsynFunction(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await createFacultyIntoDB(password, facultyData);

  senResponse(res, 200, {
    status: true,
    message: (result as any)?.message || 'Faculty is created succesfully',
    data: result,
  });
});